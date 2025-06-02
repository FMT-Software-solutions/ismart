import { getDonations } from '@/lib/db/donations';
import DonationsTable from './components/DonationsTable';
import DonationsHeader from './components/DonationsHeader';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    sortBy?: 'created_at' | 'amount';
    sortOrder?: 'asc' | 'desc';
  }>;
}

export default async function DonationsPage({ searchParams }: PageProps) {
  const { status, search, sortBy, sortOrder } = await searchParams;

  const { data: donations, count } = await getDonations({
    status,
    search,
    sortBy,
    sortOrder,
  });

  return (
    <div className="p-6 space-y-6">
      <DonationsHeader count={count || 0} />

      <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
        <DonationsTable donations={donations || []} />
      </Suspense>
    </div>
  );
}
