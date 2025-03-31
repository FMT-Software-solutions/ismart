'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Event } from '@/app/admin/events/models/event-schema';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface UpcomingEventsSectionProps {
  events: Event[];
}

export function UpcomingEventsSection({ events }: UpcomingEventsSectionProps) {
  // Format date for display
  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return 'Date not available';
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return 'Date not available';
    }
  };

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeIn}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          >
            <div>
              <h2 className="heading-2 mb-2">Upcoming Events & Trainings</h2>
              <p className="text-muted-foreground">
                Join us for these transformative opportunities
              </p>
            </div>
            <Button className="mt-4 md:mt-0" asChild>
              <Link href="/trainings">View All Events</Link>
            </Button>
          </motion.div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No upcoming events at the moment
              </p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  variants={fadeIn}
                  whileHover={{ y: -5 }}
                  className="card-hover"
                >
                  <Card className="overflow-hidden">
                    <Link href={`/events/${event.id}`}>
                      <div className="relative h-48">
                        <Image
                          src={event.bannerImageUrl || '/placeholder-event.jpg'}
                          alt={event.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    </Link>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">
                        <Link href={`/events/${event.id}`}>{event.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {event.theme}
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
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
