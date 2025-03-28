import { useState } from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FormSubmissionTable } from '../models/form-schema';
import { Eye, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { updateFormSubmissionStatus } from '../services/form-submission-service';

interface SubmissionTableProps {
  submissions: FormSubmissionTable[];
  onStatusChange?: () => void;
}

export default function SubmissionTable({
  submissions,
  onStatusChange,
}: SubmissionTableProps) {
  const { toast } = useToast();
  const [viewSubmission, setViewSubmission] =
    useState<FormSubmissionTable | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (
    id: string,
    status: 'approved' | 'rejected'
  ) => {
    try {
      setIsUpdating(true);
      await updateFormSubmissionStatus(id, status);

      toast({
        title: 'Success',
        description: `Submission ${
          status === 'approved' ? 'approved' : 'rejected'
        } successfully.`,
      });

      if (onStatusChange) {
        onStatusChange();
      }
    } catch (error) {
      console.error('Error updating submission status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update submission status',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const downloadSubmissionAsCsv = (submission: FormSubmissionTable) => {
    // Format responses into CSV
    const rows = Object.entries(submission.responses).map(([key, value]) => {
      const fieldName = key.replace('field_', '');
      return `"${fieldName}","${value}"`;
    });

    const csvContent = `"Field","Value"\n${rows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `submission-${submission.id}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDateTime = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy h:mm a');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'pending':
      default:
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        );
    }
  };

  const emailFromResponses = (responses: Record<string, any>) => {
    // Try to find an email field in the responses
    for (const [key, value] of Object.entries(responses)) {
      if (
        key.toLowerCase().includes('email') ||
        (typeof value === 'string' && value.includes('@'))
      ) {
        return value;
      }
    }
    return 'N/A';
  };

  const nameFromResponses = (responses: Record<string, any>) => {
    // Try to find a name field in the responses
    for (const [key, value] of Object.entries(responses)) {
      if (
        key.toLowerCase().includes('name') ||
        key.toLowerCase().includes('full')
      ) {
        return value;
      }
    }
    return 'Anonymous';
  };

  if (submissions.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md">
        <p className="text-gray-500">No submissions yet</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableCaption>List of form submissions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Submitted On</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell className="font-medium">
                {nameFromResponses(submission.responses)}
              </TableCell>
              <TableCell>{emailFromResponses(submission.responses)}</TableCell>
              <TableCell>{formatDateTime(submission.created_at)}</TableCell>
              <TableCell>{getStatusBadge(submission.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewSubmission(submission)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => downloadSubmissionAsCsv(submission)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>

                  {submission.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        onClick={() =>
                          handleStatusChange(submission.id, 'approved')
                        }
                        disabled={isUpdating}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() =>
                          handleStatusChange(submission.id, 'rejected')
                        }
                        disabled={isUpdating}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Submission Details Dialog */}
      <Dialog
        open={!!viewSubmission}
        onOpenChange={(isOpen: boolean) => !isOpen && setViewSubmission(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on{' '}
              {viewSubmission && formatDateTime(viewSubmission.created_at)}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Status</h3>
              {viewSubmission && getStatusBadge(viewSubmission.status)}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-4">Responses</h3>
              <div className="space-y-4">
                {viewSubmission &&
                  Object.entries(viewSubmission.responses).map(
                    ([key, value]) => {
                      // Remove the field_ prefix and format field name
                      const fieldName = key
                        .replace('field_', '')
                        .replace(/([A-Z])/g, ' $1');
                      const formattedName =
                        fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

                      return (
                        <div key={key} className="grid grid-cols-3 gap-4">
                          <div className="text-sm font-medium">
                            {formattedName}
                          </div>
                          <div className="col-span-2 text-sm break-words">
                            {typeof value === 'boolean'
                              ? value
                                ? 'Yes'
                                : 'No'
                              : String(value) || 'Not provided'}
                          </div>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>

            {viewSubmission && viewSubmission.status === 'pending' && (
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleStatusChange(viewSubmission.id, 'approved')
                  }
                  disabled={isUpdating}
                  className="border-green-200 text-green-600 hover:bg-green-50"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>

                <Button
                  variant="outline"
                  onClick={() =>
                    handleStatusChange(viewSubmission.id, 'rejected')
                  }
                  disabled={isUpdating}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
