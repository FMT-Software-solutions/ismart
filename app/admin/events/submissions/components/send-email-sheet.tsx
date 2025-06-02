import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { FormSubmissionTable } from '../../models/form-submission-schema';
import { EventTable } from '../../models/event-schema';

interface SendEmailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission?: FormSubmissionTable & {
    event?: EventTable;
  };
}

export function SendEmailSheet({
  open,
  onOpenChange,
  submission,
}: SendEmailSheetProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(
    submission?.responses?.['Email Address'] || ''
  );
  const [recipientName, setRecipientName] = useState(
    submission?.responses?.['Full Name'] || ''
  );

  useEffect(() => {
    setEmail(submission?.responses?.['Email Address'] || '');
    setRecipientName(submission?.responses?.['Full Name'] || '');
  }, [submission]);

  // Cleanup pointer-events style when component unmounts or sheet closes
  useEffect(() => {
    if (!open) {
      // Remove pointer-events style from body when sheet is closed
      document.body.style.removeProperty('pointer-events');
    }
    return () => {
      // Cleanup on unmount
      document.body.style.removeProperty('pointer-events');
    };
  }, [open]);

  const handleSendEmail = async () => {
    if (!email || !recipientName) {
      toast({
        title: 'Missing Fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!submission?.event) {
      toast({
        title: 'Error',
        description: 'No event selected. Please select a specific event first.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/send-confirmation-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventTitle: submission.event?.title,
          eventTheme: submission.event?.theme,
          eventStartDate: submission.event?.start_date,
          eventEndDate: submission.event?.end_date,
          eventType: submission.event?.event_type,
          eventLocation: submission.event?.location,
          eventLink: submission.event?.event_link,
          recipientEmail: email,
          recipientName: recipientName,
          whatsappGroupUrl: submission.event?.whatsapp_group_url,
          requireApproval: submission.event?.require_approval,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: 'Success',
        description: 'Event confirmation email sent successfully.',
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Error',
        description: 'Failed to send event confirmation email.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Send Event Confirmation Email</SheetTitle>
          <SheetDescription>
            Send or resend event confirmation email to the participant.
          </SheetDescription>
        </SheetHeader>

        {submission?.event && (
          <div className="text-sm text-muted-foreground space-y-4 py-10">
            <p>Event: {submission.event.title}</p>
            <p>Type: {submission.event.event_type}</p>
            <p>
              Date: {new Date(submission.event.start_date).toLocaleDateString()}
            </p>
          </div>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="participant@example.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="recipientName">Recipient Name</Label>
            <Input
              id="recipientName"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleSendEmail} disabled={loading}>
            {loading ? 'Sending...' : 'Send Email'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
