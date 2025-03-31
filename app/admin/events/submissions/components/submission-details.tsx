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

interface SubmissionDetailsProps {
  submission: FormSubmissionTable | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

  // Early return if no submission, but still render Sheet to handle open state
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
                          <p className="text-sm break-words">
                            {typeof value === 'object'
                              ? JSON.stringify(value)
                              : String(value)}
                          </p>
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
