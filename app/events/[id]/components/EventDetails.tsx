'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CalendarClock,
  Video,
  ReceiptCent,
} from 'lucide-react';
import { EventTable } from '@/app/admin/events/models/event-schema';
import { getVideoEmbedUrl } from '@/lib/utils';
import ImagePreviewModal from '@/app/admin/events/components/ImagePreviewModal';

interface EventDetailsProps {
  event: EventTable;
}

export function EventDetails({ event }: EventDetailsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), 'h:mm a');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Banner Image */}
      <div className="relative h-[400px] w-full rounded-lg overflow-hidden mb-8">
        <Image
          src={event.banner_image_url || '/placeholder-event.jpg'}
          alt={event.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              {event.theme && (
                <p className="text-xl text-muted-foreground">{event.theme}</p>
              )}
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                {event.gallery_images && event.gallery_images.length > 0 && (
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                )}
                {event.video_url && (
                  <TabsTrigger value="video">Video</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                {event.gallery_images && event.gallery_images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {event.gallery_images.map((image, index) => (
                      <div
                        key={index}
                        className="relative h-48 rounded-lg overflow-hidden cursor-pointer"
                        onClick={() => setPreviewImage(image)}
                      >
                        <Image
                          src={image}
                          alt={`${event.title} gallery image ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="video" className="mt-6">
                {event.video_url && (
                  <div className="relative aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getVideoEmbedUrl(event.video_url)}
                      title="Event video"
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-muted-foreground">
                      {formatDate(event.start_date)} -{' '}
                      {formatDate(event.end_date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-muted-foreground">
                      {event.capacity
                        ? `${event.registrations_count} / ${event.capacity} registered`
                        : 'Unlimited'}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center">
                  <ReceiptCent className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Registration Fee</p>
                    <div className="flex items-center gap-2">
                      {event.is_free ? (
                        <Badge>Free</Badge>
                      ) : (
                        <>
                          <p className="text-muted-foreground">
                            GHS{event.price.toFixed(2)}
                          </p>
                          {event.has_early_bird && event.early_bird_price && (
                            <Badge variant="secondary">
                              Early Bird: ${event.early_bird_price.toFixed(2)}
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarClock className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Registration Deadline</p>
                    <p className="text-muted-foreground">
                      {formatDate(event.registration_deadline)}
                    </p>
                    {event.has_early_bird && event.early_bird_deadline && (
                      <p className="text-sm text-muted-foreground">
                        Early Bird Deadline:{' '}
                        {formatDate(event.early_bird_deadline)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              {/* <div className="space-y-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => router.push(`/events/${event.id}/register`)}
                >
                  Register Now
                </Button>

                {event.require_approval && (
                  <p className="text-sm text-muted-foreground text-center">
                    * Registration requires approval
                  </p>
                )}
              </div> */}

              <p className="text-sm text-muted-foreground text-center">
                * Registration will be opened soon
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage || ''}
      />
    </div>
  );
}
