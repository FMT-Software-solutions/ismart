'use client';

import { usePaystackPayment } from 'react-paystack';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { HookConfig } from 'react-paystack/dist/types';
import { useEffect, useState } from 'react';

interface PaystackPaymentProps {
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
  onSuccess: () => void;
  onClose: () => void;
  isProcessing?: boolean;
  reference?: string;
  buttonText?: string;
}

const getOrderId = () => {
  return `EVT_${new Date().getTime()}`;
};

const getDonationId = () => {
  return `DON_${new Date().getTime()}`;
};

export function PaystackPayment({
  email,
  amount,
  metadata,
  onSuccess,
  onClose,
  isProcessing = false,
  reference,
  buttonText,
}: PaystackPaymentProps) {
  const [publicKey, setPublicKey] = useState<string>('');

  useEffect(() => {
    const isProduction = process.env.NODE_ENV === 'production';
    const isMainDomain = window.location.hostname === 'theismart.org';

    // Use live key only on production and main domain
    if (isProduction && isMainDomain) {
      setPublicKey(process.env.NEXT_PUBLIC_PAYSTACK_LIVE_PUBLIC_KEY || '');
    } else {
      // Use test key for development or non-main domains
      setPublicKey(process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY || '');
    }
  }, []);

  const config: HookConfig = {
    reference: reference || getOrderId(), // Use provided reference or generate default
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
      onSuccess: (_reference) => {
        onSuccess();
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

// Export the utility function for generating donation IDs
export { getDonationId };
