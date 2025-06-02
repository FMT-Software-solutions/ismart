'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Mail, MoreHorizontal, Trash } from 'lucide-react';
import { createContext, useContext } from 'react';
import { EventTable } from '../../models/event-schema';
import { FormSubmissionTable } from '../../models/form-submission-schema';

// Create a context for managing the selected submission
type SubmissionContextType = {
  selectedSubmission: FormSubmissionTable | null;
  setSelectedSubmission: (submission: FormSubmissionTable | null) => void;
  isDetailsOpen: boolean;
  setIsDetailsOpen: (open: boolean) => void;
};

export const SubmissionContext = createContext<SubmissionContextType>({
  selectedSubmission: null,
  setSelectedSubmission: () => {},
  isDetailsOpen: false,
  setIsDetailsOpen: () => {},
});

// Create a separate component for the actions cell to ensure consistent hook usage
function ActionCell({
  row,
  onSendEmail,
  onDelete,
}: {
  row: FormSubmissionTable;
  onSendEmail: () => void;
  onDelete: () => void;
}) {
  const { setSelectedSubmission, setIsDetailsOpen } =
    useContext(SubmissionContext);

  const handleViewDetails = () => {
    setSelectedSubmission(row);
    setIsDetailsOpen(true);
  };

  // Check if event is valid for sending emails
  const isEventValid =
    row.status !== 'pending' &&
    row.event &&
    'status' in row.event &&
    'end_date' in row.event &&
    (row.event as EventTable).status === 'published' &&
    new Date((row.event as EventTable).end_date) > new Date();

  const getEmailTooltip = () => {
    if (!row.event) return 'No event information available';
    if ((row.event as EventTable).status !== 'published')
      return 'Event is not published';
    if (new Date((row.event as EventTable).end_date) <= new Date())
      return 'Event has ended';
    return 'Send event email';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onSendEmail}
          disabled={!isEventValid}
          title={getEmailTooltip()}
        >
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem
          className="text-red-600 focus:bg-red-100 dark:focus:bg-red-800 focus:text-red-600 dark:focus:text-red-100"
          onClick={onDelete}
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete Submission
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns = [
  {
    header: 'Event',
    accessorKey: 'event',
    width: '20%',
    className: 'max-w-[200px]',
    cell: (row: FormSubmissionTable) => (
      <div className="truncate" title={row.event?.title || 'Unknown Event'}>
        {row.event?.title || 'Unknown Event'}
      </div>
    ),
  },
  {
    header: 'Form',
    accessorKey: 'form_schema',
    width: '15%',
    className: 'max-w-[150px]',
    cell: (row: FormSubmissionTable) => (
      <div className="truncate" title={row.form_schema?.title || 'No Form'}>
        {row.form_schema?.title || 'No Form'}
      </div>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'status',
    width: '10%',
    className: 'whitespace-nowrap',
    cell: (row: FormSubmissionTable) => (
      <Badge
        variant={
          row.status === 'approved'
            ? 'default'
            : row.status === 'rejected'
              ? 'destructive'
              : 'outline'
        }
      >
        {row.status}
      </Badge>
    ),
  },
  {
    header: 'Name',
    width: '15%',
    className: 'max-w-[150px]',
    cell: (row: FormSubmissionTable) => {
      const responses = row.responses || {};

      // Try to find a field that looks like a name
      const nameField =
        responses['Name'] ||
        responses['Full Name'] ||
        responses['First Name'] ||
        responses['full_name'] ||
        responses['name'] ||
        'Unknown';

      const name = String(nameField);

      return (
        <div className="truncate" title={name}>
          {name}
        </div>
      );
    },
  },
  {
    header: 'Contact',
    width: '20%',
    className: 'max-w-[200px]',
    cell: (row: FormSubmissionTable) => {
      const responses = row.responses || {};

      // Try to find a field that looks like contact info
      const contactField =
        responses['Email'] ||
        responses['Phone'] ||
        responses['Contact'] ||
        responses['email'] ||
        responses['phone'] ||
        responses['contact'] ||
        responses['Mobile'] ||
        responses['mobile'] ||
        responses['Phone Number'] ||
        'N/A';

      const contact = String(contactField);

      return (
        <div className="truncate" title={contact}>
          {contact}
        </div>
      );
    },
  },
  {
    header: 'Submitted',
    accessorKey: 'created_at',
    width: '15%',
    className: 'whitespace-nowrap',
    cell: (row: FormSubmissionTable) =>
      formatDistanceToNow(new Date(row.created_at), { addSuffix: true }),
  },
  {
    header: '',
    width: '5%',
    className: 'w-[50px]',
    cell: (
      row: FormSubmissionTable & { event: EventTable },
      {
        onSendEmail,
        onDelete,
      }: { onSendEmail: () => void; onDelete: () => void }
    ) => <ActionCell row={row} onSendEmail={onSendEmail} onDelete={onDelete} />,
  },
];
