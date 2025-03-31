'use client';

import { Event } from '@/app/admin/events/models/event-schema';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface EventsGridProps {
  initialEvents: Event[];
}

type SortOption = 'date-asc' | 'date-desc' | 'title-asc' | 'title-desc';

export function EventsGrid({ initialEvents }: EventsGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [eventType, setEventType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  // Format date for display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Date not available';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return 'Date not available';
    }
  };

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = [...initialEvents];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.location?.toLowerCase().includes(query)
      );
    }

    // Event type filter
    if (eventType !== 'all') {
      filtered = filtered.filter((event) => event.eventType === eventType);
    }

    // Price filter
    if (priceFilter !== 'all') {
      filtered = filtered.filter((event) => {
        if (priceFilter === 'free') return event.isFree;
        if (priceFilter === 'paid') return !event.isFree;
        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return (
            new Date(a.startDate || '').getTime() -
            new Date(b.startDate || '').getTime()
          );
        case 'date-desc':
          return (
            new Date(b.startDate || '').getTime() -
            new Date(a.startDate || '').getTime()
          );
        case 'title-asc':
          return (a.title || '').localeCompare(b.title || '');
        case 'title-desc':
          return (b.title || '').localeCompare(a.title || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialEvents, searchQuery, eventType, sortBy, priceFilter]);

  return (
    <div>
      <div className="grid gap-4 md:gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <Input
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />

        {/* Event Type Filter */}
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger>
            <SelectValue placeholder="Event Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="physical">Physical</SelectItem>
            <SelectItem value="online">Online</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>

        {/* Price Filter */}
        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="title-asc">Title A-Z</SelectItem>
            <SelectItem value="title-desc">Title Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No events found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <Link href={`/events/${event.id}`}>
                <div className="relative h-48">
                  <Image
                    src={event.bannerImageUrl || '/placeholder-event.jpg'}
                    alt={event.title || ''}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {event.status === 'draft' && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      Coming Soon
                    </Badge>
                  )}
                </div>
              </Link>
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <Link href={`/events/${event.id}`}>{event.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {event.theme || event.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="outline">{event.eventType}</Badge>
                  {event.isFree ? (
                    <Badge variant="secondary">Free</Badge>
                  ) : (
                    <Badge variant="default">Paid</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
