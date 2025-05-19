'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFiltersStore } from '../store/filters-store';
import { DateRangeFilter } from './date-range-filter';

interface SubmissionFiltersProps {
  onExport: () => void;
}

export function SubmissionFilters({ onExport }: SubmissionFiltersProps) {
  const [isExporting, setIsExporting] = useState(false);
  const { status, search, setStatus, setSearch, setDatePreset } =
    useFiltersStore();

  useEffect(() => {
    // Initialize with last3days preset
    setDatePreset('last3days');
  }, [setDatePreset]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      await onExport();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status" className="w-[180px]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search submissions..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-[200px]"
            />
          </div>

          <DateRangeFilter />
        </div>

        <Button
          variant="outline"
          onClick={handleExport}
          disabled={isExporting}
          className="w-full md:w-auto"
        >
          <Download className="mr-2 h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export to Excel'}
        </Button>
      </div>
    </div>
  );
}
