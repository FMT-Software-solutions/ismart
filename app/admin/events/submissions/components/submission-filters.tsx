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
import { Download, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFiltersStore } from '../store/filters-store';
import { DateRangeFilter } from './date-range-filter';
import { SendEmailSheet } from './send-email-sheet';
import { useSearchParams } from 'next/navigation';
import { EventTable } from '../../models/event-schema';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SubmissionFiltersProps {
  onExport: () => void;
  events: EventTable[];
}

export function SubmissionFilters({
  onExport,
  events,
}: SubmissionFiltersProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isEmailSheetOpen, setIsEmailSheetOpen] = useState(false);
  const searchParams = useSearchParams();
  const { status, search, setStatus, setSearch, setDatePreset } =
    useFiltersStore();

  // Get the current selected event
  const selectedEventId = searchParams.get('eventId');
  const selectedEvent = events.find((e) => e.id === selectedEventId);
  const isAllEventsSelected =
    selectedEventId === 'all-events' || !selectedEventId;

  // Check if event is valid for sending emails
  const isEventValid =
    selectedEvent &&
    selectedEvent.status === 'published' &&
    new Date(selectedEvent.end_date) > new Date();

  const getEmailButtonTooltip = () => {
    if (isAllEventsSelected)
      return 'Please select a specific event to send emails';
    if (!selectedEvent) return 'No event selected';
    if (selectedEvent.status !== 'published')
      return 'Selected Event is not published or has ended';
    if (new Date(selectedEvent.end_date) <= new Date())
      return 'Selected Event has ended';
    return 'Send event email';
  };

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
    <>
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

          <div className="flex gap-2">
            <div title={getEmailButtonTooltip()}>
              <Button
                variant="outline"
                onClick={() => setIsEmailSheetOpen(true)}
                className="w-full md:w-auto"
                disabled={isAllEventsSelected || !isEventValid}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Event Email
              </Button>
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
      </div>

      <SendEmailSheet
        open={isEmailSheetOpen}
        onOpenChange={setIsEmailSheetOpen}
        submission={
          selectedEvent
            ? {
                id: 'global-email',
                event_id: selectedEvent.id,
                form_schema_id: '',
                user_id: '',
                responses: {},
                status: 'approved',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                event: selectedEvent,
              }
            : undefined
        }
      />
    </>
  );
}
