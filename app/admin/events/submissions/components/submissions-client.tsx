'use client';

import { FormSubmissionTable } from '../../models/form-submission-schema';
import { useState } from 'react';
import { EventSelector } from './event-selector';
import { SubmissionFilters } from './submission-filters';
import { DataTable } from './data-table';
import { columns, SubmissionContext } from './columns';
import { exportToExcel } from '../../services/form-submission-service';
import { useFiltersStore, datePresetMap } from '../store/filters-store';
import type { DatePreset } from '../store/filters-store';
import { SubmissionDetails } from './submission-details';
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';

interface SubmissionsClientProps {
  submissions: FormSubmissionTable[];
  events: {
    id: string;
    title: string;
  }[];
}

const formatResultsMessage = ({
  count,
  status,
  datePreset,
  dateRange,
  eventTitle,
  search,
}: {
  count: number;
  status: string;
  datePreset: string;
  dateRange: { from: Date | undefined; to: Date | undefined };
  eventTitle: string;
  search: string;
}) => {
  const registrationText = `registration${count !== 1 ? 's' : ''}`;
  const statusText = status !== 'all' ? `${status} ` : '';
  const searchText = search ? `matching "${search}" ` : '';
  const eventText =
    eventTitle.toLowerCase() === 'all events' ? 'all events' : eventTitle;

  if (datePreset === 'all') {
    return `Showing all ${count} ${statusText}${registrationText} ${searchText}for ${eventText}`;
  }

  const timeText =
    datePreset === 'custom' && dateRange.from && dateRange.to
      ? `from ${dateRange.from.toLocaleDateString()} to ${dateRange.to.toLocaleDateString()}`
      : `for ${datePresetMap[datePreset as DatePreset].toLowerCase()}`;

  return `Showing ${count} ${statusText}${registrationText} ${searchText}${timeText} for ${eventText}`;
};

export function SubmissionsClient({
  submissions,
  events,
}: SubmissionsClientProps) {
  const { status, search, dateRange, datePreset } = useFiltersStore();

  // Submission details state
  const [selectedSubmission, setSelectedSubmission] =
    useState<FormSubmissionTable | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState('All Events');

  // Apply client-side filters
  const filteredSubmissions = submissions.filter((submission) => {
    // Status filter
    if (status !== 'all' && submission.status !== status) {
      return false;
    }

    // Date range filter
    if (dateRange.from && dateRange.to) {
      const submissionDate = new Date(submission.created_at);
      const isInRange = isWithinInterval(submissionDate, {
        start: startOfDay(dateRange.from),
        end: endOfDay(dateRange.to),
      });
      if (!isInRange) {
        return false;
      }
    }

    // Search filter
    if (search) {
      const searchLower = search.toLowerCase();
      const responses = submission.responses || {};

      // Search in responses
      const matchesResponses = Object.values(responses).some((value) =>
        String(value).toLowerCase().includes(searchLower)
      );

      // Search in event title
      const matchesEvent = submission.event?.title
        .toLowerCase()
        .includes(searchLower);

      // Search in form title
      const matchesForm = submission.form_schema?.title
        .toLowerCase()
        .includes(searchLower);

      if (!matchesResponses && !matchesEvent && !matchesForm) {
        return false;
      }
    }

    return true;
  });

  const handleExport = () => {
    try {
      exportToExcel(filteredSubmissions);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      // Could add toast notification here for better UX
    }
  };

  // Create context value for passing to data table
  const submissionContextValue = {
    selectedSubmission,
    setSelectedSubmission,
    isDetailsOpen,
    setIsDetailsOpen,
  };

  return (
    <SubmissionContext.Provider value={submissionContextValue}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold">
            Event Registrations{' '}
            {submissions.length > 0 ? `(${submissions.length})` : ''}
          </h1>
          <EventSelector
            events={events}
            setSelectedEventTitle={setSelectedEventTitle}
          />
        </div>

        <SubmissionFilters onExport={handleExport} />

        {filteredSubmissions.length === 0 ? (
          <div className="text-center p-4 border rounded-md">
            No submissions found matching the current filters
          </div>
        ) : (
          <>
            <div className="py-2 px-4 border rounded-md">
              <p className="text-sm">
                {formatResultsMessage({
                  count: filteredSubmissions.length,
                  status,
                  datePreset,
                  dateRange,
                  eventTitle: selectedEventTitle,
                  search,
                })}
              </p>
            </div>
            <DataTable
              columns={columns}
              data={filteredSubmissions}
              pageSize={10}
            />
          </>
        )}

        <SubmissionDetails
          submission={selectedSubmission}
          open={isDetailsOpen}
          onOpenChange={setIsDetailsOpen}
        />
      </div>
    </SubmissionContext.Provider>
  );
}
