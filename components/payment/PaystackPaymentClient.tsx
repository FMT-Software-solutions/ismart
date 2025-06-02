'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import { PaystackProps } from 'react-paystack/dist/types';

export interface PaystackPaymentProps {
  email: string;
  amount: number;
  metadata?: {
    name?: string;
    phone?: string;
    custom_fields?: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  onSuccess: (reference: any) => void;
  onClose: () => void;
  isProcessing?: boolean;
}

export function PaystackPaymentClient({
  email,
  amount,
  metadata,
  onSuccess,
  onClose,
  isProcessing = false,
}: PaystackPaymentProps) {
  const config: PaystackProps = {
    reference: new Date().getTime().toString(),
    email,
    amount: Math.round(amount * 100), // Convert to pesewas
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
    metadata: metadata as any, // Type assertion since we know our metadata structure is compatible
  };

  const initializePayment = usePaystackPayment(config);

  // Handle successful payment
  const handlePayment = () => {
    initializePayment({
      onSuccess: () => {
        onSuccess({ reference: config.reference });
      },
      onClose,
    });
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full py-6"
      size="lg"
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        'Pay Now'
      )}
    </Button>
  );
}
