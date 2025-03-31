'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface EventOption {
  id: string;
  title: string;
}

export function EventSelector({ events }: { events: EventOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<EventOption | null>(null);

  useEffect(() => {
    const eventId = searchParams.get('eventId');
    if (eventId && eventId !== 'all-events' && events && events.length > 0) {
      const event = events.find((e) => e.id === eventId);
      if (event) {
        setSelectedEvent(event);
      }
    } else {
      setSelectedEvent(null);
    }
  }, [searchParams, events]);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === 'all-events') {
      params.set('eventId', 'all-events');
      setSelectedEvent(null);
    } else if (value === '') {
      params.delete('eventId');
      setSelectedEvent(null);
    } else {
      const event = events.find((e) => e.id === value);
      if (event) {
        params.set('eventId', event.id);
        setSelectedEvent(event);
      }
    }

    router.push(`/admin/events/submissions?${params.toString()}`);
  };

  return (
    <div className="w-[300px]">
      <Select
        value={selectedEvent?.id || searchParams.get('eventId') || ''}
        onValueChange={handleSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an event..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all-events">All Events</SelectItem>
          {events && events.length > 0 ? (
            events.map((event) => (
              <SelectItem key={event.id} value={event.id}>
                {event.title}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="none" disabled>
              No events available
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
