'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ManualPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (transactionId: string, accountName: string) => void;
  isProcessing: boolean;
}

export function ManualPaymentModal({
  isOpen,
  onClose,
  onConfirm,
  isProcessing,
}: ManualPaymentModalProps) {
  const [transactionId, setTransactionId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // Validate fields
    if (!transactionId.trim()) {
      setError('Transaction ID is required');
      return;
    }

    if (!accountName.trim()) {
      setError('Account Name is required');
      return;
    }

    // Clear any previous errors
    setError(null);

    // Submit the manual payment details
    onConfirm(transactionId, accountName);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Mobile Money Payment</DialogTitle>
          <DialogDescription className="pt-2">
            Enter your MoMo transaction details to complete registration
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-3 rounded-md text-sm mb-2">
          <p className="font-medium mb-1">Payment was made to:</p>
          <p>
            MTN MoMo: <span className="font-medium">0592185098</span>
          </p>
          <p>
            Name: <span className="font-medium">ESTHER BOATENG</span> or{' '}
            <span className="font-medium">HE REIGNS ESTI-NASH ENT</span>
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="transactionId" className="text-sm font-medium">
              Transaction ID
            </Label>
            <Input
              id="transactionId"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="Enter MoMo transaction ID"
              className="w-full"
              disabled={isProcessing}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountName" className="text-sm font-medium">
              MoMo Account Name
            </Label>
            <Input
              id="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter sender's MoMo account name"
              className="w-full"
              disabled={isProcessing}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="w-full sm:w-auto"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Confirm Payment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
