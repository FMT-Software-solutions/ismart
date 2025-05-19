'use client';

import { FormSubmissionTable } from '../../models/form-submission-schema';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileIcon, Loader2 } from 'lucide-react';
import NextImage from 'next/image';
import { PaymentDetailsSection } from './payment-details-section';
import { ApprovalSection } from './approval-section';
import { createClient } from '@/lib/supabase/client';

interface SubmissionDetailsProps {
  submission: FormSubmissionTable | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const isImageFile = (url: string) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

export function SubmissionDetails({
  submission,
  open,
  onOpenChange,
}: SubmissionDetailsProps) {
  const [event, setEvent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

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

  // Fetch full event details if we have a submission with event_id
  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!submission || !submission.event_id) return;

      try {
        setIsLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', submission.event_id)
          .single();

        if (error) {
          throw error;
        }

        setEvent(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [submission, refreshKey]);

  // Handle approval completion
  const handleApprovalComplete = () => {
    // Refresh the component to show updated status
    setRefreshKey((prev) => prev + 1);
  };

  const renderValue = (key: string, value: any) => {
    // Handle file attachments
    if (
      (key === 'Attachments' || key === 'Attachment') &&
      Array.isArray(value)
    ) {
      return (
        <div className="space-y-4">
          {value.map((url, index) => {
            const isImage = isImageFile(url);
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-3 border rounded-lg"
              >
                {isImage ? (
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <NextImage
                      src={url}
                      alt={`Attachment ${index + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 flex-shrink-0 bg-muted rounded-md flex items-center justify-center">
                    <FileIcon className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {url.split('/').pop()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => window.open(url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {isImage ? 'Preview' : 'Open'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = url.split('/').pop() || 'download';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Hide payment details keys as they will be displayed in the payment section
    if (key === 'Transaction ID' || key === 'MoMo Account Name') {
      return null;
    }

    // Handle other values
    return (
      <p className="text-sm break-words">
        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
      </p>
    );
  };

  // Extract payment_method from responses
  const getPaymentMethod = () => {
    if (!submission || !submission.responses) return undefined;

    // Look for payment_method in responses
    const method = submission.payment_method;
    if (method && (method === 'manual' || method === 'online')) {
      return method;
    }

    return undefined;
  };

  // Get payment details for manual payments
  const getPaymentDetails = () => {
    if (!submission || !submission.payment_details) return undefined;

    const details: Record<string, any> = {};

    if (submission.payment_details['transaction_id']) {
      details['transaction_id'] = submission.payment_details['transaction_id'];
    }

    if (submission.payment_details['account_name']) {
      details['account_name'] = submission.payment_details['account_name'];
    }

    return Object.keys(details).length > 0 ? details : undefined;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md md:max-w-xl overflow-y-auto"
      >
        {submission ? (
          <>
            <SheetHeader className="mb-6">
              <SheetTitle className="text-2xl">Submission Details</SheetTitle>
              <SheetDescription>
                Viewing details for submission from{' '}
                {submission.event?.title || event?.title || 'Unknown Event'}
              </SheetDescription>
            </SheetHeader>

            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="ml-2">Loading event details...</span>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Event
                  </p>
                  <p className="mt-1">
                    {submission.event?.title || event?.title || 'Unknown Event'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Form
                  </p>
                  <p className="mt-1">
                    {submission.form_schema?.title || 'No Form'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge
                    className="mt-1"
                    variant={
                      submission.status === 'approved'
                        ? 'default'
                        : submission.status === 'rejected'
                          ? 'destructive'
                          : 'outline'
                    }
                  >
                    {submission.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Submitted
                  </p>
                  <p className="mt-1">
                    {format(new Date(submission.created_at), 'PPpp')}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Payment Details Section */}
              <PaymentDetailsSection
                paymentMethod={getPaymentMethod()}
                paymentDetails={getPaymentDetails()}
                status={submission.status}
              />

              {/* Approval Section - only shown for pending submissions */}
              {event && (
                <ApprovalSection
                  submission={submission}
                  event={event}
                  onApprovalComplete={handleApprovalComplete}
                />
              )}

              {/* Main Form Responses */}
              <div>
                <h3 className="text-lg font-medium mb-4">Form Responses</h3>
                {Object.keys(submission.responses || {}).length === 0 ? (
                  <p className="text-muted-foreground">
                    No responses available
                  </p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(submission.responses || {}).map(
                      ([key, value]) => {
                        // Skip payment_method as it's already displayed in the payment section
                        if (key === 'payment_method') return null;

                        const renderedValue = renderValue(key, value);
                        if (renderedValue === null) return null;

                        return (
                          <div key={key} className="grid grid-cols-2 gap-2">
                            <p className="text-sm font-medium text-muted-foreground">
                              {key}
                            </p>
                            {renderedValue}
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No submission selected</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
