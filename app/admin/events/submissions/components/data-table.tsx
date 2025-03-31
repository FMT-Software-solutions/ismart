'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FormSubmissionTable } from '../../models/form-submission-schema';

interface DataTableProps {
  data: FormSubmissionTable[];
  columns: {
    header: string;
    accessorKey?: string;
    cell?: (row: FormSubmissionTable) => React.ReactNode;
    className?: string;
    width?: string;
  }[];
}

export function DataTable({ data, columns }: DataTableProps) {
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.header}
                className={column.className}
                style={column.width ? { width: column.width } : undefined}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell
                  key={`${row.id}-${column.header}`}
                  className={column.className}
                >
                  <div className="truncate max-w-[300px]">
                    {column.cell
                      ? column.cell(row)
                      : column.accessorKey
                      ? typeof row[
                          column.accessorKey as keyof FormSubmissionTable
                        ] === 'object'
                        ? JSON.stringify(
                            row[column.accessorKey as keyof FormSubmissionTable]
                          )
                        : String(
                            row[column.accessorKey as keyof FormSubmissionTable]
                          )
                      : null}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
