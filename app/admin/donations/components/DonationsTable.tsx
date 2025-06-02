'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { format } from 'date-fns';
import { useState } from 'react';
import DonationDetailsSheet from './DonationDetailsSheet';
import { Eye } from 'lucide-react';
import { DonationRecord } from '@/lib/db/donations';

interface DonationsTableProps {
  donations: DonationRecord[];
}

export default function DonationsTable({ donations }: DonationsTableProps) {
  const [selectedDonation, setSelectedDonation] =
    useState<DonationRecord | null>(null);

  if (!donations.length) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No donations found</p>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>
                  {format(new Date(donation.created_at), 'MMM d, yyyy')}
                </TableCell>
                <TableCell>
                  <div>
                    {donation.first_name} {donation.last_name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {donation.email}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(donation.amount)}
                </TableCell>
                <TableCell>{donation.payment_method}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      donation.payment_status === 'confirmed'
                        ? 'default'
                        : 'secondary'
                    }
                    className={
                      donation.payment_status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : ''
                    }
                  >
                    {donation.payment_status}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {donation.donation_reference}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setSelectedDonation(donation as DonationRecord)
                    }
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedDonation && (
        <DonationDetailsSheet
          donation={selectedDonation}
          isOpen={!!selectedDonation}
          onClose={() => setSelectedDonation(null)}
        />
      )}
    </>
  );
}
