'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import type { PaystackPaymentProps } from './PaystackPaymentClient';

// Export utility function separately to avoid importing from the client component
export const getDonationId = () => {
  return `DON_${new Date().getTime()}`;
};

// Create a placeholder component that will be shown during loading
const LoadingButton = ({
  isProcessing = false,
}: {
  isProcessing?: boolean;
}) => (
  <Button className="w-full" size="lg" disabled>
    {isProcessing ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Processing Payment...
      </>
    ) : (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading Payment...
      </>
    )}
  </Button>
);

// Dynamically import the PaystackPaymentClient component
const PaystackPaymentClientComponent = dynamic(
  () =>
    import('./PaystackPaymentClient').then((mod) => mod.PaystackPaymentClient),
  {
    ssr: false,
    loading: () => <LoadingButton />,
  }
);

// Wrapper component that maintains backward compatibility
export function PaystackPayment(props: PaystackPaymentProps) {
  return <PaystackPaymentClientComponent {...props} />;
}
