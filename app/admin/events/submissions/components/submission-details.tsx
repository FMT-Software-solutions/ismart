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
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, FileIcon } from 'lucide-react';
import NextImage from 'next/image';

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

    // Handle other values
    return (
      <p className="text-sm break-words">
        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
      </p>
    );
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
                {submission.event?.title || 'Unknown Event'}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Event
                  </p>
                  <p className="mt-1">
                    {submission.event?.title || 'Unknown Event'}
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

              <div>
                <h3 className="text-lg font-medium mb-4">Form Responses</h3>
                {Object.keys(submission.responses || {}).length === 0 ? (
                  <p className="text-muted-foreground">
                    No responses available
                  </p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(submission.responses || {}).map(
                      ([key, value]) => (
                        <div key={key} className="grid grid-cols-2 gap-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            {key}
                          </p>
                          {renderValue(key, value)}
                        </div>
                      )
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
