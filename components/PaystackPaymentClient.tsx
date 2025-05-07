'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { usePaystackPayment } from 'react-paystack';
import { HookConfig } from 'react-paystack/dist/types';

export interface PaystackPaymentProps {
  email: string;
  amount: number;
  metadata: {
    name: string;
    phone: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  onSuccess: (reference: any) => void;
  onClose: () => void;
  isProcessing?: boolean;
  reference?: string;
  buttonText?: string;
}

export const getOrderId = () => {
  return `EVT_${new Date().getTime()}`;
};

export const getDonationId = () => {
  return `DON_${new Date().getTime()}`;
};

export function PaystackPaymentClient({
  email,
  amount,
  metadata,
  onSuccess,
  onClose,
  isProcessing = false,
  reference,
  buttonText,
}: PaystackPaymentProps) {
  // Use live key only on production and main domain
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

  const config: HookConfig = {
    reference: reference || getOrderId(),
    email,
    amount: amount * 100, // Convert to GHS to pesewas
    publicKey,
    currency: 'GHS',
    label: metadata.name,
    phone: metadata.phone,
    firstname: metadata.name.split(' ')[0] || '',
    lastname: metadata.name.split(' ')[1] || '',
    metadata: {
      ...metadata,
      custom_fields: [
        {
          display_name: 'Name',
          variable_name: 'name',
          value: metadata.name,
        },
        {
          display_name: 'Phone',
          variable_name: 'phone',
          value: metadata.phone,
        },
      ],
    },
    channels: ['mobile_money', 'card'], // Allow both mobile money and card payments
  };

  const initializePayment = usePaystackPayment(config);

  const handlePayment = () => {
    if (!publicKey) {
      console.error('Paystack public key not initialized');
      return;
    }

    return initializePayment({
      onSuccess: (reference) => {
        onSuccess(reference);
      },
      onClose: () => {
        onClose();
      },
    });
  };

  return (
    <Button
      onClick={handlePayment}
      className="w-full"
      size="lg"
      disabled={isProcessing || !publicKey}
    >
      {isProcessing ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing Payment...
        </>
      ) : (
        buttonText || `Pay GHS ${amount.toFixed(2)}`
      )}
    </Button>
  );
}
