'use client';

import Link from 'next/link';
import { Calendar, Edit, Trash, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Event = {
  id: string;
  title: string;
  theme: string;
  startDate: string;
  endDate: string;
  location: string;
  price: number;
  earlyBirdPrice?: number;
  earlyBirdDeadline?: string;
  registrationDeadline: string;
  status: string;
  registrations: number;
};

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Event</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price (GHc)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Registrations</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className="font-medium">
                <div className="max-w-[300px]">
                  <div className="font-semibold truncate">{event.title}</div>
                  <div className="text-sm text-muted-foreground truncate">
                    {event.theme}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {formatDate(event.startDate)}
                {event.endDate !== event.startDate &&
                  ` - ${formatDate(event.endDate)}`}
              </TableCell>
              <TableCell>{event.location}</TableCell>
              <TableCell>
                {event.earlyBirdPrice && (
                  <div className="space-y-1">
                    <div className="text-sm">
                      <span className="font-medium">
                        {event.earlyBirdPrice}
                      </span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        Early Bird
                      </Badge>
                    </div>
                    <div className="text-sm">
                      {event.price}{' '}
                      <span className="text-xs text-muted-foreground">
                        (Regular)
                      </span>
                    </div>
                  </div>
                )}
                {!event.earlyBirdPrice && event.price}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    event.status === 'upcoming'
                      ? 'default'
                      : event.status === 'active'
                      ? 'outline'
                      : 'secondary'
                  }
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <Link
                  href={`/admin/events/${event.id}/registrations`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {event.registrations}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <ChevronDown className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={`/admin/events/${event.id}`}>
                      <DropdownMenuItem>
                        <Calendar className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/admin/events/${event.id}/edit`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Event
                      </DropdownMenuItem>
                    </Link>
                    <Link href={`/admin/events/${event.id}/form`}>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Registration Form
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      Delete Event
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
