'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UpcomingEventsSection } from './UpcomingEventsSection';
import { AccreditationSection } from './AccreditationSection';
import { ImpactStatsSection } from './ImpactStatsSection';
import { Event } from '@/app/admin/events/models/event-schema';
import { programAreas } from '@/const/programs';
import type { SiteStats } from '@/const/site-stats';

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

interface HomeContentProps {
  upcomingEvents: Event[];
  stats: SiteStats;
}

export function HomeContent({ upcomingEvents, stats }: HomeContentProps) {
  const [activeTab, setActiveTab] = useState('mission');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="hero-gradient text-white grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center py-20 md:py-32">
          <div className="container-custom">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="pl-8"
            >
              <motion.h1 variants={fadeIn} className="heading-1 mb-6">
                Transforming Lives Through Research & Education
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl md:text-2xl mb-8 text-white/90"
              >
                The Institute of Sexuality, Marriage and Family Life Research &
                Training (iSMART) is an independent, premier NGO based in Ghana.
              </motion.p>
              <motion.div variants={fadeIn} className="flex flex-wrap gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/programs">Explore Our Programs</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div className="container-custom w-full min-w-0 max-w-xl">
            <AccreditationSection />
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-background"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        ></div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="heading-2 mb-6">About iSMART</h2>

              <Tabs
                defaultValue="mission"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mission">Mission</TabsTrigger>
                  <TabsTrigger value="vision">Vision</TabsTrigger>
                  <TabsTrigger value="goal">Goal</TabsTrigger>
                </TabsList>
                <TabsContent value="mission" className="mt-6">
                  <p className="paragraph">
                    &quot;To conduct rigorous and culturally relevant research
                    and training on sexuality, marriage and family life in
                    Africa and beyond, contributing to improved sexual and
                    reproductive health outcomes, stronger marriages and
                    families, and building a more just and equitable
                    society.&quot;
                  </p>
                </TabsContent>
                <TabsContent value="vision" className="mt-6">
                  <p className="paragraph">
                    &quot;To be a trusted and influential voice in shaping and
                    revolutionising public understanding, practice and policy
                    related to sexuality, marriage, and family life in Africa
                    and beyond.&quot;
                  </p>
                </TabsContent>
                <TabsContent value="goal" className="mt-6">
                  <p className="paragraph">
                    &quot;A Transformed World where sexuality, marriage and
                    family life is understood, practiced and embodied according
                    to God&apos;s standards and principles.&quot;
                  </p>
                </TabsContent>
              </Tabs>

              <div className="mt-8">
                <Button asChild>
                  <Link href="/about">
                    Read More About Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="https://res.cloudinary.com/deptmmxdn/image/upload/v1741294497/IMG_6581_1_c3xvlj.jpg"
                alt="iSmart Team"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <ImpactStatsSection stats={stats} />

      {/* Key Areas Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Our Key Focus Areas
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              We are dedicated to transforming lives through research,
              education, and advocacy in these critical areas.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {programAreas.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4">
                      <item.icon
                        className={`h-10 w-10 ${item.iconClassName}`}
                      />
                    </div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Button asChild>
              <Link href="/programs">
                Explore Our Programs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <UpcomingEventsSection events={upcomingEvents} />

      {/* Accreditation Section */}
      <div className="container-custom -mb-20 border border-gray-100 dark:border-gray-800 p-0 rounded-lg shadow-xl">
        <AccreditationSection />
      </div>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground py-48">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-6">
              Support Our Mission
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Your contribution helps us continue our vital work in research,
              education, and advocacy for healthy sexuality, strong marriages,
              and thriving families.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                asChild
              >
                <Link href="/contact">Get Involved</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
