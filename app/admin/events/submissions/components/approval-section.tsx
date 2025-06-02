'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { updateFormSubmissionStatus } from '../../services/form-submission-service';
import { FormSubmissionTable } from '../../models/form-submission-schema';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EventTable } from '../../models/event-schema';
import { useRouter } from 'next/navigation';
import { FormSubmission } from '../../models/form-schema';
interface ApprovalSectionProps {
  submission: FormSubmissionTable;
  event: EventTable | undefined;
  onApprovalComplete: () => void;
}

export function ApprovalSection({
  submission,
  event,
  onApprovalComplete,
}: ApprovalSectionProps) {
  const [email, setEmail] = useState<string>(
    (submission.responses && submission.responses['Email Address']) || ''
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      if (submission.status === 'pending') {
        // 1. Update submission status to approved
        await updateFormSubmissionStatus(submission.id, 'approved');
      }

      // 2. Send confirmation email
      const emailResponse = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventTitle: event?.title || 'Event',
          eventTheme: event?.theme || '',
          eventStartDate: event?.start_date || '',
          eventEndDate: event?.end_date || '',
          eventType: event?.event_type || 'In-Person',
          eventLocation: event?.location || '',
          eventLink: event?.event_link || '',
          whatsappGroupUrl: event?.whatsapp_group_url || '',
          recipientEmail: email,
          recipientName:
            (submission.responses && submission.responses['Full Name']) ||
            'Participant',
          requireApproval: false,
        }),
      });

      if (!emailResponse.ok) {
        throw new Error('Failed to send confirmation email');
      }

      setSuccess(true);
      setTimeout(() => {
        onApprovalComplete();
        router.refresh();
      }, 2000);
    } catch (err) {
      const errorMessage =
        (err as Error).message || 'An unknown error occurred';
      setError(`Error: ${errorMessage}`);
      console.error('Approval error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Only show approval section for pending submissions
  if (submission.status !== 'pending' && submission.status !== 'approved') {
    return null;
  }

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h3 className="text-lg font-medium">
        {submission.status === 'pending'
          ? 'Approve Registration'
          : 'Resend Confirmation Email'}
      </h3>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription>
            {submission.status === 'pending'
              ? 'Registration approved and confirmation email sent successfully!'
              : `Confirmation email sent to ${email} successfully!`}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">
          Confirmation Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isProcessing || success}
        />
        <p className="text-xs text-muted-foreground">
          A confirmation email with event details will be sent to this address
        </p>
      </div>

      <Button
        onClick={handleApprove}
        disabled={isProcessing || success}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : success ? (
          <>
            <CheckCircle className="mr-2 h-4 w-4" />
            {submission.status === 'pending'
              ? 'Approved'
              : 'Resent Confirmation Email'}
          </>
        ) : (
          <>
            {submission.status === 'pending'
              ? 'Approve & Send Confirmation Email'
              : 'Resend Confirmation Email'}
          </>
        )}
      </Button>
    </div>
  );
}
