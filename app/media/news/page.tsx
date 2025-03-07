'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, FileText, ImageIcon, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

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

// Sample news data
const newsArticles = [
  {
    id: 1,
    title:
      'iSMART hosts first-ever sex therapy training in Ghana to tackle stigma (Citi Newsroom)',
    excerpt:
      'The Institute of Sexuality, Marriage, and Family Life Research and Training (iSMART) has successfully organised its first-ever Sex Therapy Specialisation Training Programme.The two-week event, held from January 27 to February 9, 2025, brought together over 250 professionals from Ghana and beyond to engage in Sexual Attitude Reassessment (SAR) and practical sex therapy workshop.',
    date: ' February 11, 2025',
    category: 'events',
    image:
      'https://citinewsroom.com/wp-content/uploads/2025/02/ISmart-min-750x375.png',
    featured: true,
    link: 'https://citinewsroom.com/2025/02/1142336/',
  },

  {
    id: 2,
    title:
      'iSMART hosts first-ever sex therapy training to tackle stigma, promote open dialogue',
    excerpt:
      'The Institute of Sexuality, Marriage, and Family Life Research and Training (iSMART) has successfully organised its first-ever Sex Therapy Specialization Training Programme.',
    date: '11 February 2025',
    category: 'events',
    image:
      'https://citinewsroom.com/wp-content/uploads/2025/02/ISmart-min-750x375.png',
    featured: true,
    link: 'https://www.myjoyonline.com/ismart-hosts-first-ever-sex-therapy-training-to-tackle-stigma-promote-open-dialogue/',
  },
];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter news articles based on search term and category
  const filteredArticles = newsArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeCategory === 'all' || article.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  // Get featured article
  const featuredArticle = newsArticles.find((article) => article.featured);

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
                News & Updates
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Stay informed about our latest research, events, and
                initiatives.
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

      {/* Featured Article Section */}
      {featuredArticle && (
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
                Featured News
              </motion.h2>
              <motion.p
                variants={fadeIn}
                className="paragraph text-muted-foreground"
              >
                Our latest major announcement
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeIn}
              className="mb-16"
            >
              <div className="bg-muted/30 rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{featuredArticle.date}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">
                        {featuredArticle.category}
                      </span>
                    </div>
                    <h3 className="heading-3 mb-4">{featuredArticle.title}</h3>
                    <p className="paragraph mb-6">{featuredArticle.excerpt}</p>
                    <Button asChild>
                      <a
                        href={
                          featuredArticle.link ||
                          `/media/news/${featuredArticle.id}`
                        }
                      >
                        Read Full Article{' '}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* News Articles Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto mb-16"
          >
            <motion.div
              variants={fadeIn}
              className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
            >
              <div>
                <h2 className="heading-2 mb-2">Latest News</h2>
                <p className="text-muted-foreground">
                  Stay updated with our recent activities and announcements
                </p>
              </div>
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search news..."
                  className="pl-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-8">
              <Tabs
                defaultValue="all"
                value={activeCategory}
                onValueChange={setActiveCategory}
              >
                <TabsList className="grid w-full grid-cols-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="research">Research</TabsTrigger>
                  <TabsTrigger value="training">Training</TabsTrigger>
                  <TabsTrigger value="events">Events</TabsTrigger>
                  <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
                  <TabsTrigger value="funding">Funding</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <div key={article.id} className="card-hover">
                    <Card className="overflow-hidden h-full">
                      <div className="relative h-48">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <CardHeader>
                        <CardDescription className="flex items-center text-sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>{article.date}</span>
                          <span className="mx-2">•</span>
                          <span className="capitalize">{article.category}</span>
                        </CardDescription>
                        <CardTitle className="line-clamp-2">
                          {article.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-3">
                          {article.excerpt}
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" asChild>
                          <a href={article.link || `/media/news/${article.id}`}>
                            Read More <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">
                    No news articles found matching your search criteria.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="bg-muted/30 p-8 md:p-12 rounded-lg max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-8">
              <h2 className="heading-2 mb-4">Subscribe to Our Newsletter</h2>
              <p className="paragraph text-muted-foreground max-w-2xl mx-auto">
                Stay informed about our latest research, upcoming events, and
                training opportunities by subscribing to our monthly newsletter.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input placeholder="Your email address" className="flex-grow" />
              <Button>Subscribe</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Press Kit Section */}
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
              Press Resources
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Resources for media professionals covering our work
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
                title: 'Press Kit',
                description:
                  'Download our comprehensive press kit, including organizational background, mission statement, and key facts.',
                icon: <FileText className="h-10 w-10 text-primary" />,
                link: '#',
              },
              {
                title: 'Media Contacts',
                description:
                  'Contact information for media inquiries and interview requests.',
                icon: <Mail className="h-10 w-10 text-secondary" />,
                link: '/contact',
              },
              {
                title: 'Brand Assets',
                description:
                  'Access our logo, images, and other brand assets for use in publications.',
                icon: <ImageIcon className="h-10 w-10 text-accent" />,
                link: '#',
              },
            ].map((resource, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4">{resource.icon}</div>
                    <CardTitle>{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {resource.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <a href={resource.link}>
                        Access Resource <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
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
              Get Involved
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Join us in our mission to transform society&apos;s understanding
              and practice of sexuality, marriage, and family life.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">Support Our Work</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
