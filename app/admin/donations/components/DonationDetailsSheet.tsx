'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { useState } from 'react';
import { Copy, Loader2 } from 'lucide-react';
import { DonationRecord } from '@/lib/db/donations';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

interface DonationDetailsSheetProps {
  donation: DonationRecord;
  isOpen: boolean;
  onClose?: () => void;
}

export default function DonationDetailsSheet({
  donation,
  isOpen,
  onClose,
}: DonationDetailsSheetProps) {
  const [email, setEmail] = useState(donation.email);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleConfirmAndSendEmail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-donation-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationId: donation.id,
          donationReference: donation.donation_reference,
          firstName: donation.first_name,
          lastName: donation.last_name,
          email: email,
          amount: donation.amount,
          paymentMethod: donation.payment_method,
          status: 'confirmed',
          type: 'confirm',
          date: format(new Date(donation.created_at), 'PPP'),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to confirm donation');
      }

      toast({
        title: 'Donation confirmed and email sent',
        description:
          'The donation has been confirmed and the email has been sent',
      });
      onClose?.();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/send-donation-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          donationId: donation.id,
          donationReference: donation.donation_reference,
          firstName: donation.first_name,
          lastName: donation.last_name,
          email: email,
          amount: donation.amount,
          paymentMethod: donation.payment_method,
          status: 'confirmed',
          type: 'confirm',
          date: format(new Date(donation.created_at), 'PPP'),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to resend confirmation email');
      }

      toast({
        title: 'Confirmation email resent',
        description: 'The confirmation email has been resent',
      });
      onClose?.();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px] overflow-y-auto">
        <SheetHeader className="space-y-4">
          <SheetTitle>Donation Details</SheetTitle>
          <SheetDescription>
            View donation details and manage confirmation
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status Badge */}
          <div>
            <Badge
              variant={
                donation.payment_status === 'confirmed'
                  ? 'default'
                  : 'secondary'
              }
              className={
                donation.payment_status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : ''
              }
            >
              {donation.payment_status}
            </Badge>
          </div>

          {/* Donor Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Donor Information
            </h3>
            <div className="grid gap-2">
              <div>
                <div className="text-sm font-medium">Name</div>
                <div>
                  {donation.first_name} {donation.last_name}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Email</div>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Payment Information
            </h3>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Amount:</div>
                <div className="font-medium">
                  {formatCurrency(donation.amount)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Payment Method:</div>
                <div className="text-sm">{donation.payment_method}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Reference:</div>
                <div className="font-mono text-sm flex items-center gap-2">
                  {donation.donation_reference}{' '}
                  <Copy
                    className="w-4 h-4 cursor-pointer active:text-green-500 transition-all duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        donation.donation_reference
                      );
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium">Date</div>
                <div>{format(new Date(donation.created_at), 'PPP')}</div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          {donation.payment_details && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">
                Payment Details
              </h3>
              <Card className="pt-4 bg-muted">
                <CardContent className="space-y-2">
                  {donation.payment_details.transaction_id && (
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Transaction ID:</div>
                      <div className="font-mono text-sm">
                        {donation.payment_details.transaction_id}
                      </div>
                    </div>
                  )}
                  {donation.payment_details.account_name && (
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">Account Name:</div>
                      <div className="text-sm">
                        {donation.payment_details.account_name}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {donation.payment_status === 'pending' ? (
              <Button
                className="w-full"
                onClick={handleConfirmAndSendEmail}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Confirm and Send Email
              </Button>
            ) : (
              <Button
                className="w-full"
                variant="secondary"
                onClick={handleResendEmail}
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Resend Confirmation Email
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
