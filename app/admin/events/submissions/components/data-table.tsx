'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TablePagination } from './table-pagination';
import { FormSubmissionTable } from '../../models/form-submission-schema';
import { SendEmailSheet } from './send-email-sheet';
import { DeleteConfirmationDialog } from './delete-confirmation-dialog';
import { useRouter } from 'next/navigation';
import { EventTable } from '../../models/event-schema';

interface DataTableProps {
  columns: any[];
  data: (FormSubmissionTable & { event: Partial<EventTable> })[];
  pageSize?: number;
}

export function DataTable({ columns, data, pageSize = 10 }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isEmailSheetOpen, setIsEmailSheetOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<FormSubmissionTable | null>(
    null
  );
  const router = useRouter();

  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handleDeleteComplete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedRow(null);
    router.refresh();
  };

  // Shared handlers for dialogs
  const handleSendEmail = (row: FormSubmissionTable) => {
    setSelectedRow(row);
    setIsEmailSheetOpen(true);
  };

  const handleDelete = (row: FormSubmissionTable) => {
    setSelectedRow(row);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead
                  key={index}
                  className={column.className}
                  style={{ width: column.width }}
                >
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column, index) => (
                  <TableCell key={index} className={column.className}>
                    {column.cell(row, {
                      onSendEmail: () => handleSendEmail(row),
                      onDelete: () => handleDelete(row),
                    })}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <SendEmailSheet
        open={isEmailSheetOpen}
        onOpenChange={setIsEmailSheetOpen}
        submission={selectedRow as FormSubmissionTable & { event?: EventTable }}
      />

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setSelectedRow(null);
        }}
        submissionId={selectedRow?.id || ''}
        onDeleted={handleDeleteComplete}
      />
    </div>
  );
}
