'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import debounce from 'lodash/debounce';

interface DonationsHeaderProps {
  count: number;
}

export default function DonationsHeader({ count }: DonationsHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = debounce((term: string) => {
    startTransition(() => {
      const queryString = createQueryString('search', term);
      router.push(`${pathname}?${queryString}`);
    });
  }, 300);

  const handleStatusChange = (value: string) => {
    startTransition(() => {
      const queryString = createQueryString('status', value);
      router.push(`${pathname}?${queryString}`);
    });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    startTransition(() => {
      let queryString = createQueryString('sortBy', sortBy);
      const params = new URLSearchParams(queryString);
      params.set('sortOrder', sortOrder);
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const currentSort = `${searchParams.get('sortBy') || 'created_at'}-${
    searchParams.get('sortOrder') || 'desc'
  }`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Donations ({count})</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search by donor name..."
          className="max-w-sm"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('search') || ''}
        />

        <Select
          defaultValue={searchParams.get('status') || 'all'}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="created_at-desc">Latest First</SelectItem>
            <SelectItem value="created_at-asc">Oldest First</SelectItem>
            <SelectItem value="amount-desc">Highest Amount</SelectItem>
            <SelectItem value="amount-asc">Lowest Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
