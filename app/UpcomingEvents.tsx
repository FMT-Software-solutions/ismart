import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { upcomingEvents } from '@/consts';

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

export const UpcomingEvents = () => {
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

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">
                      {event.title}
                    </CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </CardContent>
                  {/* <CardFooter>
                    <Button asChild>
                      <Link href="/trainings/register">Register Now</Link>
                    </Button>
                  </CardFooter> */}
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
