'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TransactionMessageExample } from './TransactionMessageExample';
import { cn } from '@/lib/utils';

export interface ManualPaymentDetails {
  transactionId: string;
  accountName: string;
}

interface ManualPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (details: ManualPaymentDetails) => void;
  isProcessing: boolean;
  title?: string;
  description?: string;
  amount?: string | number;
  paymentInfo?: {
    momoNumber: string;
    recipientName: string;
    alternateRecipientName?: string;
  };
}

type Step = 'payment' | 'transaction' | 'confirmation';

export function ManualPaymentModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
  title = 'Confirm Mobile Money Payment',
  description = 'Follow these steps to complete your payment',
  amount = '0.00',
  paymentInfo = {
    momoNumber: '0592185098',
    recipientName: 'ESTHER BOATENG',
    alternateRecipientName: 'HE REIGNS ESTI-NASH ENT',
  },
}: ManualPaymentModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('payment');
  const [transactionId, setTransactionId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => {
    setError(null);
    if (currentStep === 'payment') {
      setCurrentStep('transaction');
    } else if (currentStep === 'transaction') {
      if (!transactionId.trim()) {
        setError('Please enter the Transaction ID from your payment message');
        return;
      }
      setCurrentStep('confirmation');
    } else {
      if (!accountName.trim()) {
        setError('Please enter your MoMo account name');
        return;
      }
      onConfirm({ transactionId, accountName });
      setCurrentStep('payment');
      setTransactionId('');
      setAccountName('');
    }
  };

  const handleBack = () => {
    setError(null);
    if (currentStep === 'transaction') {
      setCurrentStep('payment');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('transaction');
    }
  };

  const steps = [
    { id: 'payment', title: 'Make Payment' },
    { id: 'transaction', title: 'Transaction ID' },
    { id: 'confirmation', title: 'Confirm Details' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="relative mb-8">
          <div className="absolute top-4 w-full h-0.5 bg-muted" />
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;
              return (
                <div
                  key={step.id}
                  className={cn(
                    'flex flex-col items-center gap-2',
                    (isActive || isCompleted) && 'text-primary',
                    !isActive && !isCompleted && 'text-muted-foreground'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center border-2 bg-background',
                      (isActive || isCompleted) && 'border-primary',
                      !isActive && !isCompleted && 'border-muted'
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <span className="text-xs font-medium">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentStep === 'payment' && (
          <div className="space-y-6">
            <div className="rounded-lg p-6 text-center space-y-2">
              <div className="text-sm">Send payment to</div>
              <div className="bg-yellow-500 rounded-lg  py-2 px-4">
                <div className="text-4xl font-black">
                  {paymentInfo.momoNumber}
                </div>
                <div className="text-md font-medium">
                  {paymentInfo.recipientName}
                  {paymentInfo.alternateRecipientName && (
                    <>
                      {' '}
                      or <br />
                      {paymentInfo.alternateRecipientName}
                    </>
                  )}
                </div>
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 mt-2">
                Amount to send: GHS {amount}
              </div>
            </div>

            <Button onClick={handleNext} className="w-full" size="lg">
              I Have Made The Payment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {currentStep === 'transaction' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                Find your Transaction ID in the payment message. It looks like
                this:
              </div>
              <TransactionMessageExample
                amount={amount}
                momoNumber={paymentInfo.momoNumber}
                recipientName={paymentInfo.recipientName}
              />
              <div className="text-xs text-muted-foreground">
                <span className="font-bold">Note:</span> Above is an example of
                a payment message. Yours will be different.
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transactionId">Enter Transaction ID</Label>
              <Input
                id="transactionId"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="e.g., 53770543727"
                className="w-full"
                disabled={isProcessing}
              />
              {transactionId.trim().length < 11 && (
                <div className="text-xs text-muted-foreground">
                  You need to enter a valid transaction ID to continue.
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isProcessing}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isProcessing || transactionId.trim().length < 11}
                className="flex-1"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="text-sm text-gray-500">
              <span className="font-bold">Note:</span> Please make sure the
              transaction ID is correct as it will be used to verify and approve
              your payment.
            </div>
          </div>
        )}

        {currentStep === 'confirmation' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accountName">Enter your MoMo Account Name</Label>
              <div className="text-sm text-muted-foreground">
                This is the name registered to the mobile money account you used
                to make the payment
              </div>
              <Input
                id="accountName"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter the name on your MoMo account"
                className="w-full"
                disabled={isProcessing}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={isProcessing}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isProcessing || !accountName.trim()}
                className="flex-1"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  'Submit Payment'
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
