'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  PaymentOptions,
  PaystackPayment,
  ManualPaymentModal,
  PaymentMethod,
  getDonationId,
  ManualPaymentDetails,
} from '@/components/payment';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, PhoneCall, Loader2 } from 'lucide-react';

const donationFormSchema = z.object({
  amount: z.string().min(1, { message: 'Please enter a donation amount.' }),
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationFormSchema>;

export const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState('100');
  const [customAmount, setCustomAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [donationData, setDonationData] = useState<DonationFormValues | null>(
    null
  );
  const [donationReference, setDonationReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('manual');
  const [isManualPaymentModalOpen, setIsManualPaymentModalOpen] =
    useState(false);

  const predefinedAmounts = ['50', '100', '250', '500', '1000'];

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      amount: '100',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const handleAmountSelect = (amount: string) => {
    setSelectedAmount(amount);
    setCustomAmount(false);
    form.setValue('amount', amount);
  };

  const handleCustomAmount = () => {
    setSelectedAmount('');
    setCustomAmount(true);
    form.setValue('amount', '');
  };

  const onSubmit = (data: DonationFormValues) => {
    // Generate a unique donation reference ID
    const reference = getDonationId();
    setDonationReference(reference);
    setDonationData(data);
    setShowPaymentOptions(true);
  };

  const handlePaymentSuccess = async (reference?: any) => {
    setIsProcessing(true);

    try {
      if (!donationData) return;

      // Format date for the receipt
      const formattedDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      // Send confirmation email
      const response = await fetch('/api/send-donation-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: donationData.firstName,
          lastName: donationData.lastName,
          email: donationData.email,
          amount: donationData.amount,
          donationReference: donationReference,
          date: formattedDate,
          paymentMethod,
          message: donationData.message,
          status: paymentMethod === 'online' ? 'confirmed' : 'pending',
          type: paymentMethod === 'online' ? 'confirm' : 'submit',
          paymentDetails: {
            transaction_id: reference.transactionId,
            account_name: reference.accountName,
            amount: donationData.amount,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send confirmation email');
      }

      toast({
        title:
          paymentMethod === 'online'
            ? 'Donation Successful!'
            : 'Donation Submitted!',
        description:
          paymentMethod === 'online'
            ? 'Thank you for your generous support. A confirmation receipt has been sent to your email.'
            : 'Your donation details have been submitted. We will verify your payment and send you a confirmation email.',
      });

      // Reset form and state
      form.reset();
      setSelectedAmount('100');
      setCustomAmount(false);
      setShowPaymentOptions(false);
      setDonationData(null);
      setIsManualPaymentModalOpen(false);
    } catch (error) {
      console.error('Error processing donation:', error);
      toast({
        title: 'Error',
        description:
          'There was a problem processing your donation confirmation.',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentClose = () => {
    toast({
      title: 'Payment Cancelled',
      description: 'Your donation payment was cancelled.',
    });
    setIsProcessing(false);
  };

  const handleManualPayment = () => {
    setIsManualPaymentModalOpen(true);
  };

  const handleManualPaymentConfirm = async (details: ManualPaymentDetails) => {
    await handlePaymentSuccess({
      transactionId: details.transactionId,
      accountName: details.accountName,
      amount: donationData?.amount,
      method: 'manual',
    });
  };

  useEffect(() => {
    setShowPaymentOptions(false);
  }, [selectedAmount, customAmount]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Form</CardTitle>
        <CardDescription>
          Please fill out the form below to make your donation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Select Donation Amount (GHS)</h3>
              <div className="grid grid-cols-3 gap-2">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    type="button"
                    variant={selectedAmount === amount ? 'default' : 'outline'}
                    onClick={() => handleAmountSelect(amount)}
                    className="h-12"
                  >
                    {amount}
                  </Button>
                ))}
                <Button
                  type="button"
                  variant={customAmount ? 'default' : 'outline'}
                  onClick={handleCustomAmount}
                  className="h-12"
                >
                  Custom
                </Button>
              </div>

              {customAmount && (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom Amount (GHS)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+233 XX XXX XXXX" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Alert>
              <AlertDescription className="flex flex-col gap-2">
                <div className="text-sm font-medium mb-2">
                  Available Payment Methods:
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Credit/Debit Card
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" /> Mobile Money
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  You'll select your preferred payment method on the payment
                  page.
                </div>
              </AlertDescription>
            </Alert>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share why you're supporting our mission"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your message may be shared in our donor recognition
                    materials.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!showPaymentOptions ? (
              <Button type="submit" className="w-full">
                Proceed to Donate
              </Button>
            ) : (
              <div className="space-y-6">
                <PaymentOptions
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                  disabled={isProcessing}
                />

                {paymentMethod === 'manual' ? (
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h3 className="font-medium mb-2">
                        Mobile Money Payment Instructions
                      </h3>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                        <li>
                          Send payment to MTN MoMo number:{' '}
                          <span className="font-medium">0592185098</span>
                        </li>
                        <li>
                          The recipient name will appear as either{' '}
                          <span className="font-medium">ESTHER BOATENG</span> or{' '}
                          <span className="font-medium">
                            HE REIGNS ESTI-NASH ENT
                          </span>
                        </li>
                        <li>
                          Make sure to save your Transaction ID from the MoMo
                          message
                        </li>
                        <li>
                          Enter the Transaction ID and your MoMo registered name
                          below
                        </li>
                      </ol>
                    </div>
                    <Button
                      onClick={handleManualPayment}
                      disabled={isProcessing}
                      className="w-full py-6"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Enter Payment Details'
                      )}
                    </Button>
                  </div>
                ) : (
                  <PaystackPayment
                    email={donationData?.email || ''}
                    amount={Number(donationData?.amount) || 0}
                    metadata={{
                      name: `${donationData?.firstName} ${donationData?.lastName}`,
                      phone: donationData?.phone || '',
                      custom_fields: [
                        {
                          display_name: 'Donation ID',
                          variable_name: 'donation_id',
                          value: donationReference,
                        },
                      ],
                    }}
                    onSuccess={handlePaymentSuccess}
                    onClose={handlePaymentClose}
                    isProcessing={isProcessing}
                  />
                )}
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-6">
        <p className="text-sm text-muted-foreground">
          For assistance with your donation, please contact us at{' '}
          <a href="mailto:ismflrt.official@gmail.com" className="text-primary">
            ismflrt.official@gmail.com
          </a>
        </p>
      </CardFooter>

      <ManualPaymentModal
        isOpen={isManualPaymentModalOpen}
        onClose={() => setIsManualPaymentModalOpen(false)}
        onConfirm={handleManualPaymentConfirm}
        isProcessing={isProcessing}
        title="Confirm Donation Payment"
        description="Enter your MoMo transaction details to complete your donation"
        amount={donationData?.amount}
      />
    </Card>
  );
};
