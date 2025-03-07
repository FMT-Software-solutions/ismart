'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';

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

// Sample gallery data
const galleryImages = {
  events: [
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305551/IMG_0185_nhdber.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305552/IMG_0014_w6nybn.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305550/IMG_0192_ybwxox.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305540/IMG_0119_xh8nn4.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305523/IMG_0047_evmy8b.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305518/IMG_0036_alegl8.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305499/IMG_0243_rt23kk.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305538/IMG_0227_pmyfc2.jpg',
  ],
  workshops: [
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305501/IMG_0311_aupk9b.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741302105/IMG_6565_1_oyofkt.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305516/IMG_0349_qtpoig.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741301132/IMG_0351_1_www1pq.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305524/IMG_0052_kcav2l.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305533/IMG_0226_m9tlub.jpg',
  ],
  community: [
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305517/IMG_0423_c9vmr1.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741294497/IMG_6581_1_c3xvlj.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741294272/IMG_6571_q8f8po.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741302020/IMG_6594_1_rf1kfa.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305518/IMG_6588_rll81v.jpg',
    'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305560/IMG_0351_c3bxfy.jpg',
  ],
};

export default function GalleryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="hero-gradient text-white">
          <div className="container-custom py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.h1 variants={fadeIn} className="heading-1 mb-6">
                Photo Gallery
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Images from our events, workshops, and community activities.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-background"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        ></div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Browse Our Gallery
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Explore photos from our various activities and programs
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="workshops">Workshops</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>

              <TabsContent value="events" className="space-y-8">
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.events.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={image}
                          alt={`Event photo ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" /> View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="workshops" className="space-y-8">
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.workshops.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={image}
                          alt={`Workshop photo ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" /> View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="community" className="space-y-8">
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {galleryImages.community.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group"
                      >
                        <Image
                          src={image}
                          alt={`Community photo ${index + 1}`}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" /> View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                            >
                              <Download className="h-4 w-4 mr-2" /> Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Featured Albums Section */}
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
              Featured Albums
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Curated collections from our major events and programs
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Youth Empowerment Summit 2024',
                count: '32 photos',
                date: 'March 15-17, 2024',
                cover:
                  'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305560/IMG_0351_c3bxfy.jpg',
              },
              {
                title: 'Marriage Enrichment Retreat',
                count: '45 photos',
                date: 'February 8-10, 2024',
                cover:
                  'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305551/IMG_6565_ls7h6y.jpg',
              },
              {
                title: 'Parenting Workshop Series',
                count: '28 photos',
                date: 'January 22, 2024',
                cover:
                  'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305552/IMG_0014_w6nybn.jpg',
              },
              {
                title: 'Sexuality Education Conference',
                count: '50 photos',
                date: 'November 10-12, 2023',
                cover:
                  'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305533/IMG_0226_m9tlub.jpg',
              },
              {
                title: 'Community Outreach Program',
                count: '36 photos',
                date: 'October 5, 2023',
                cover:
                  'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305517/IMG_0423_c9vmr1.jpg',
              },
              {
                title: 'Research Symposium',
                count: '24 photos',
                date: 'September 18, 2023',
                cover:
                  'https://res.cloudinary.com/deptmmxdn/image/upload/v1741305550/IMG_0192_ybwxox.jpg',
              },
            ].map((album, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <div className="bg-background rounded-lg overflow-hidden shadow-sm">
                  <div className="relative aspect-video">
                    <Image
                      src={album.cover}
                      alt={album.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-semibold text-lg">{album.title}</h3>
                        <div className="flex justify-between text-sm text-white/80">
                          <span>{album.count}</span>
                          <span>{album.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Button variant="outline" className="w-full" asChild>
                      <a href="#">View Album</a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-6">
              Join Our Next Event
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Participate in our upcoming events and be part of our growing
              community.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/trainings">View Upcoming Events</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                asChild
              >
                <Link href="/media">Browse All Media</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
