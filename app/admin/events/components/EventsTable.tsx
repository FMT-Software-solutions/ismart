'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Event } from '../models/event-schema';
import {
  deleteEvent,
  getEventById,
  updateEventStatus,
} from '../services/event-service';
import { format } from 'date-fns';
import Link from 'next/link';
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Calendar,
  X,
  ChevronRight,
  MapPin,
  Clock,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock9,
  MoreHorizontal,
  Image as ImageIcon,
  Video as VideoIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePathname, useRouter } from 'next/navigation';
import ImagePreviewModal from './ImagePreviewModal';
import { getVideoEmbedUrl } from '@/lib/utils';

interface EventsTableProps {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}

// Event status type
type EventStatus = 'draft' | 'published' | 'cancelled' | 'archived';

export default function EventsTable({
  events,
  isLoading,
  error,
}: EventsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState<Event[]>(events);
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewLoading, setViewLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Update local events when prop changes
  useEffect(() => {
    if (JSON.stringify(events) !== JSON.stringify(localEvents) && !isLoading) {
      setLocalEvents(events);
    }
  }, [events, isLoading, localEvents]);

  // Handle event deletion
  const handleDeleteEvent = async () => {
    if (!eventToDelete) return;

    try {
      const result = await deleteEvent(eventToDelete);

      if (result.success) {
        // Remove from local state
        setLocalEvents(
          localEvents.filter((event) => event.id !== eventToDelete)
        );
        toast({
          title: 'Event deleted',
          description: 'The event has been successfully deleted',
        });
      } else {
        throw new Error(result.error || 'Failed to delete event');
      }
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete event',
        variant: 'destructive',
      });
    } finally {
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (
    eventId: string,
    newStatus: EventStatus
  ) => {
    setUpdatingStatus(eventId);
    try {
      const result = await updateEventStatus(eventId, newStatus);

      if (result.success) {
        // Update local state
        setLocalEvents(
          localEvents.map((event) =>
            event.id === eventId
              ? {
                  ...event,
                  status: newStatus,
                  is_active: newStatus === 'published' || newStatus === 'draft',
                }
              : event
          )
        );
        toast({
          title: 'Status updated',
          description: `Event status changed to ${newStatus}`,
        });
        // Refresh the page to get updated data
        router.refresh();
      } else {
        throw new Error(result.error || 'Failed to update event status');
      }
    } catch (error: any) {
      console.error('Error updating event status:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update event status',
        variant: 'destructive',
      });
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Confirm delete dialog
  const confirmDelete = (eventId: string) => {
    setEventToDelete(eventId);
    setDeleteDialogOpen(true);
  };

  // View event details
  const viewEventDetails = async (eventId: string) => {
    setViewLoading(true);
    try {
      const { event, error } = await getEventById(eventId);
      if (error || !event) {
        throw new Error(error || 'Failed to load event details');
      }
      // Convert gallery_images from null to undefined if needed
      const processedEvent = {
        ...event,
        gallery_images: event.gallery_images || undefined,
      };
      setViewEvent(processedEvent);
      setViewModalOpen(true);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to load event details',
        variant: 'destructive',
      });
    } finally {
      setViewLoading(false);
    }
  };

  // Close view modal
  const closeViewModal = () => {
    setViewModalOpen(false);
    setViewEvent(null);
  };

  // Filter events based on search term
  const filteredEvents = localEvents.filter(
    (event) =>
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.theme?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  // Get status badge
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'published':
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            Published
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-400">
            <Clock9 className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-red-400">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'archived':
        return (
          <Badge
            variant="outline"
            className="text-gray-600 hover:bg-gray-200 border-gray-400"
          >
            <AlertCircle className="h-3 w-3 mr-1" />
            Archived
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Get event type badge
  const getEventTypeBadge = (eventType: string | null | undefined) => {
    if (!eventType) return <Badge variant="outline">Unknown</Badge>;

    switch (eventType) {
      case 'physical':
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Physical
          </Badge>
        );
      case 'virtual':
      case 'online':
        return (
          <Badge
            variant="outline"
            className="bg-purple-50 text-purple-700 border-purple-200"
          >
            Virtual
          </Badge>
        );
      case 'hybrid':
        return (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            Hybrid
          </Badge>
        );
      default:
        return <Badge variant="outline">{eventType}</Badge>;
    }
  };

  // Status dropdown menu
  const StatusDropdown = ({ event }: { event: Event }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={updatingStatus === event.id}
          className={
            updatingStatus === event.id
              ? 'animate-pulse'
              : 'hover:bg-transparent'
          }
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Change Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleStatusUpdate(event.id, 'published')}
          disabled={event.status === 'published'}
          className={
            event.status === 'published'
              ? 'bg-green-50 text-green-800 cursor-not-allowed'
              : 'hover:focus:bg-green-100 hover:focus:text-green-800 dark:hover:focus:bg-green-900 dark:hover:focus:text-green-200'
          }
        >
          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
          Publish
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusUpdate(event.id, 'draft')}
          disabled={event.status === 'draft'}
          className={
            event.status === 'draft'
              ? 'bg-amber-50 text-amber-800 cursor-not-allowed'
              : 'hover:focus:bg-amber-100 hover:focus:text-amber-800 dark:hover:focus:bg-amber-900 dark:hover:focus:text-amber-200'
          }
        >
          <Clock9 className="h-4 w-4 mr-2 text-amber-600" />
          Set as Draft
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusUpdate(event.id, 'cancelled')}
          disabled={event.status === 'cancelled'}
          className={
            event.status === 'cancelled'
              ? 'bg-red-50 text-red-800 cursor-not-allowed'
              : 'hover:focus:bg-red-100 hover:focus:text-red-800 dark:hover:focus:bg-red-900 dark:hover:focus:text-red-200'
          }
        >
          <XCircle className="h-4 w-4 mr-2 text-red-600" />
          Cancel Event
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleStatusUpdate(event.id, 'archived')}
          disabled={event.status === 'archived'}
          className={
            event.status === 'archived'
              ? 'bg-gray-50 text-gray-800 cursor-not-allowed'
              : 'hover:focus:bg-gray-100 hover:focus:text-gray-800 dark:hover:focus:bg-gray-700 dark:hover:focus:text-gray-200'
          }
        >
          <AlertCircle className="h-4 w-4 mr-2 text-gray-600" />
          Archive
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Render event action buttons
  const renderEventActions = (event: Event) => (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => viewEventDetails(event.id)}
        disabled={viewLoading}
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Link href={`/admin/events/edit/${event.id}`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => confirmDelete(event.id)}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>All Events</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-full h-12" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-6 text-red-500">
              <p>{error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No events found</h2>
              <p className="text-gray-500 max-w-md">
                {searchTerm
                  ? 'No events match your search. Try different keywords.'
                  : 'You have not created any events yet.'}
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchTerm('')}
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Card view for mobile devices */}
              <div className="md:hidden grid grid-cols-1 gap-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="truncate text-lg">
                        {event.title}
                      </CardTitle>
                      <CardDescription>{event.theme}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-0">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>
                            {formatDate(event.startDate || event.start_date)}
                          </span>
                          {(event.endDate || event.end_date) &&
                            (event.startDate || event.start_date) !==
                              (event.endDate || event.end_date) && (
                              <span className="text-muted-foreground">
                                - {formatDate(event.endDate || event.end_date)}
                              </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>
                            {event.location || 'Location not specified'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 py-2">
                          {getEventTypeBadge(
                            event.eventType || event.event_type
                          )}
                          <div className="flex items-center gap-1">
                            {getStatusBadge(event.status)}
                            <StatusDropdown event={event} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end py-4">
                      {renderEventActions(event)}
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Table view for larger screens */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-[250px]">
                              {event.theme}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>
                              {formatDate(event.startDate || event.start_date)}
                            </p>
                            {(event.endDate || event.end_date) &&
                              (event.startDate || event.start_date) !==
                                (event.endDate || event.end_date) && (
                                <p className="text-xs text-muted-foreground">
                                  to{' '}
                                  {formatDate(event.endDate || event.end_date)}
                                </p>
                              )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {getEventTypeBadge(
                            event.eventType || event.event_type
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getStatusBadge(event.status)}
                            <StatusDropdown event={event} />
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {renderEventActions(event)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteEvent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event View Modal */}
      <Dialog open={viewModalOpen} onOpenChange={closeViewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {viewEvent && (
            <>
              <DialogHeader className="space-y-2">
                {/* Banner Image */}
                {(viewEvent.bannerImageUrl || viewEvent.banner_image_url) && (
                  <div
                    className="relative w-full h-48 md:h-64 -mx-6 -mt-6 mb-6 cursor-pointer overflow-hidden"
                    onClick={() =>
                      setPreviewImage(
                        viewEvent.bannerImageUrl ||
                          viewEvent.banner_image_url ||
                          ''
                      )
                    }
                  >
                    <img
                      src={
                        viewEvent.bannerImageUrl || viewEvent.banner_image_url
                      }
                      alt="Event banner"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://placehold.co/600x400?text=Banner+preview';
                        (e.target as HTMLImageElement).classList.add(
                          'opacity-50'
                        );
                      }}
                    />
                  </div>
                )}

                <DialogTitle className="text-xl md:text-2xl text-left">
                  {viewEvent.title}
                </DialogTitle>

                <div className="flex flex-wrap gap-2 p-4">
                  {getEventTypeBadge(
                    viewEvent.eventType || viewEvent.event_type
                  )}
                  {getStatusBadge(viewEvent.status)}
                </div>
                {viewEvent.theme && (
                  <p className="text-left text-base md:text-lg text-muted-foreground font-medium">
                    {viewEvent.theme}
                  </p>
                )}
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Event Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Date</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(
                              viewEvent.startDate || viewEvent.start_date
                            )}
                            {(viewEvent.endDate || viewEvent.end_date) &&
                              (viewEvent.startDate || viewEvent.start_date) !==
                                (viewEvent.endDate || viewEvent.end_date) &&
                              ` - ${formatDate(
                                viewEvent.endDate || viewEvent.end_date
                              )}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Time</p>
                          <p className="text-sm text-muted-foreground">N/A</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-muted-foreground">
                            {viewEvent.location || 'N/A'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Capacity</p>
                          <p className="text-sm text-muted-foreground">
                            {viewEvent.capacity
                              ? `${viewEvent.capacity} attendees`
                              : 'Unlimited'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Registration Deadline</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(
                              viewEvent.registrationDeadline ||
                                viewEvent.registration_deadline
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="font-medium">Pricing</p>
                          <p className="text-sm text-muted-foreground">
                            {viewEvent.isFree || viewEvent.is_free
                              ? 'Free Event'
                              : `GHS ${viewEvent.price} per person`}
                          </p>
                          {(viewEvent.hasEarlyBird ||
                            viewEvent.has_early_bird) && (
                            <p className="text-sm text-muted-foreground">
                              Early Bird: GHS{' '}
                              {viewEvent.earlyBirdPrice ||
                                viewEvent.early_bird_price}{' '}
                              (until{' '}
                              {formatDate(
                                viewEvent.earlyBirdDeadline ||
                                  viewEvent.early_bird_deadline
                              )}
                              )
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html:
                        viewEvent.description || 'No description provided',
                    }}
                  />
                </div>

                {/* Video Section */}
                {(viewEvent.videoUrl || viewEvent.video_url) && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <VideoIcon className="h-5 w-5 mr-2" />
                      Event Video
                    </h3>
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                      <iframe
                        src={getVideoEmbedUrl(
                          viewEvent.videoUrl || viewEvent.video_url || ''
                        )}
                        title="Event video"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Gallery Images */}
                {(viewEvent.galleryImages || viewEvent.gallery_images) &&
                  ((viewEvent.galleryImages?.length || 0) > 0 ||
                    (viewEvent.gallery_images?.length || 0) > 0) && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <ImageIcon className="h-5 w-5 mr-2" />
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(
                          viewEvent.galleryImages ||
                          viewEvent.gallery_images ||
                          []
                        ).map((imageUrl, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-md overflow-hidden cursor-pointer border bg-gray-50"
                            onClick={() => setPreviewImage(imageUrl)}
                          >
                            <img
                              src={imageUrl}
                              alt={`Gallery image ${index + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  'https://placehold.co/600x400?text=Image+preview';
                                (e.target as HTMLImageElement).classList.add(
                                  'opacity-50'
                                );
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>

              <DialogFooter className="justify-between gap-2 sm:gap-0">
                <div className="flex space-x-2">
                  <Link
                    href={`/admin/events/submissions?eventId=${viewEvent.id}`}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      View Submissions
                    </Button>
                  </Link>
                  <Link href={`/admin/events/edit/${viewEvent.id}`}>
                    <Button size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Event
                    </Button>
                  </Link>
                </div>
                <div>
                  {viewEvent.status !== 'published' && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-50 hover:bg-green-200 text-green-700 hover:text-green-900"
                      onClick={() => {
                        handleStatusUpdate(viewEvent.id, 'published');
                        closeViewModal();
                      }}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Publish Event
                    </Button>
                  )}
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage || ''}
      />
    </>
  );
}
