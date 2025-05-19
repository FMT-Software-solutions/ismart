'use client';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Banknote } from 'lucide-react';

interface PaymentDetailsProps {
  paymentMethod?: 'manual' | 'online';
  paymentDetails?: Record<string, any>;
  status: string;
}

export function PaymentDetailsSection({
  paymentMethod,
  paymentDetails,
  status,
}: PaymentDetailsProps) {
  if (!paymentMethod) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Payment Information</h3>
        <div className="flex items-center gap-2">
          <Badge
            variant={paymentMethod === 'online' ? 'default' : 'outline'}
            className={paymentMethod === 'online' ? 'bg-green-500' : ''}
          >
            {paymentMethod === 'online' ? (
              <CreditCard className="mr-1 h-3 w-3" />
            ) : (
              <Banknote className="mr-1 h-3 w-3" />
            )}
            {paymentMethod === 'online' ? 'Online Payment' : 'Manual Payment'}
          </Badge>

          <Badge
            variant={
              status === 'approved'
                ? 'default'
                : status === 'rejected'
                  ? 'destructive'
                  : 'secondary'
            }
          >
            {status === 'approved'
              ? 'Approved'
              : status === 'rejected'
                ? 'Rejected'
                : 'Pending Approval'}
          </Badge>
        </div>
      </div>

      {paymentMethod === 'manual' && paymentDetails && (
        <div className="bg-muted p-3 rounded-md">
          <h4 className="text-sm font-medium mb-2">Manual Payment Details</h4>
          <div className="grid gap-2">
            {paymentDetails['transaction_id'] && (
              <div className="grid grid-cols-2 gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Transaction ID:
                </span>
                <span className="text-sm font-medium">
                  {paymentDetails['transaction_id']}
                </span>
              </div>
            )}
            {paymentDetails['account_name'] && (
              <div className="grid grid-cols-2 gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Account Name:
                </span>
                <span className="text-sm">
                  {paymentDetails['account_name']}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {paymentMethod === 'online' && (
        <div className="bg-green-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-green-800 mb-1">
            Online Payment Successfully Processed
          </h4>
          <p className="text-xs text-green-700">
            Payment was automatically verified and approved via Paystack.
          </p>
        </div>
      )}

      <Separator />
    </div>
  );
}
