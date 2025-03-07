'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Heart,
  MapPin,
  Target,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function CampaignsPage() {
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
                Campaigns & Advocacy
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Join us in our mission to transform society&apos;s understanding
                and practice of sexuality, marriage, and family life through our
                advocacy initiatives and campaigns.
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

      {/* Current Campaigns Section */}
      <section id="current" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Current Campaigns
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Our ongoing initiatives to create positive change in society
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <motion.div
              variants={fadeIn}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1529390079861-591de354faf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Healthy Relationships Campaign"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="heading-3 mb-4">Healthy Relationships Campaign</h3>
              <p className="paragraph mb-6">
                Our flagship campaign focuses on promoting healthy, respectful
                relationships among young people. Through workshops, media
                outreach, and community engagement, we&apos;re working to reduce
                relationship violence and promote positive relationship models.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Campaign Progress
                    </span>
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="flex items-center text-muted-foreground text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>January 2025 - December 2025</span>
                </div>

                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>Greater Accra Region, Ghana</span>
                </div>

                <div className="flex items-center text-muted-foreground text-sm">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Target: 10,000 young people</span>
                </div>
              </div>

              <Button asChild>
                <Link href="/campaigns/healthy-relationships">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
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
                title: 'Family First Initiative',
                description:
                  'Advocating for policies that support and strengthen families in Ghana.',
                progress: 60,
                timeframe: 'March 2025 - March 2026',
                image:
                  'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Comprehensive Sexuality Education',
                description:
                  'Promoting age-appropriate, culturally sensitive sexuality education in schools.',
                progress: 45,
                timeframe: 'September 2024 - August 2025',
                image:
                  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Marriage Preparation Program',
                description:
                  'Equipping couples with skills and knowledge for successful marriages.',
                progress: 80,
                timeframe: 'Ongoing',
                image:
                  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
            ].map((campaign, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{campaign.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {campaign.description}
                    </p>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">
                          {campaign.progress}%
                        </span>
                      </div>
                      <Progress value={campaign.progress} className="h-2" />
                    </div>

                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{campaign.timeframe}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link
                        href={`/campaigns/${campaign.title
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        View Details
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Past Initiatives Section */}
      <section id="past" className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Past Initiatives
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Successful campaigns that have made a lasting impact
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="2024" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="2024">2024</TabsTrigger>
                <TabsTrigger value="2023">2023</TabsTrigger>
                <TabsTrigger value="2022">2022</TabsTrigger>
              </TabsList>

              <TabsContent value="2024" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1529390079861-591de354faf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Youth Empowerment Summit"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="heading-4 mb-2">Youth Empowerment Summit</h3>
                    <p className="paragraph mb-4">
                      A three-day summit that brought together 500 young people
                      from across Ghana to discuss issues related to sexuality,
                      relationships, and personal development.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                        500 Participants
                      </div>
                      <div className="bg-secondary/10 text-secondary text-sm py-1 px-3 rounded-full">
                        3 Days
                      </div>
                      <div className="bg-accent/10 text-accent text-sm py-1 px-3 rounded-full">
                        Accra, Ghana
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Trained 50 peer educators</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Developed a youth-led action plan</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Established partnerships with 10 schools</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Family Policy Forum"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="heading-4 mb-2">Family Policy Forum</h3>
                    <p className="paragraph mb-4">
                      A collaborative initiative with policymakers to develop
                      family-friendly policies that support work-life balance
                      and strengthen family bonds.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                        Policy Development
                      </div>
                      <div className="bg-secondary/10 text-secondary text-sm py-1 px-3 rounded-full">
                        Multi-stakeholder
                      </div>
                      <div className="bg-accent/10 text-accent text-sm py-1 px-3 rounded-full">
                        National Impact
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Engaged 25 policymakers</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Produced a comprehensive policy brief</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>
                          Influenced draft legislation on family leave
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="2023" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Healthy Relationships Campaign"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="heading-4 mb-2">
                      Healthy Relationships Campaign
                    </h3>
                    <p className="paragraph mb-4">
                      A nationwide campaign to promote healthy, respectful
                      relationships among young people through media, school
                      programs, and community events.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                        Nationwide
                      </div>
                      <div className="bg-secondary/10 text-secondary text-sm py-1 px-3 rounded-full">
                        Youth Focus
                      </div>
                      <div className="bg-accent/10 text-accent text-sm py-1 px-3 rounded-full">
                        Multi-channel
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Reached over 50,000 young people</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Implemented in 100 schools</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>
                          Reduced reported relationship violence by 15%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="2022" className="space-y-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                      alt="Family Strengthening Initiative"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="heading-4 mb-2">
                      Family Strengthening Initiative
                    </h3>
                    <p className="paragraph mb-4">
                      A community-based program that provided resources,
                      training, and support to families in underserved
                      communities.
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="bg-primary/10 text-primary text-sm py-1 px-3 rounded-full">
                        Community-based
                      </div>
                      <div className="bg-secondary/10 text-secondary text-sm py-1 px-3 rounded-full">
                        Resource Provision
                      </div>
                      <div className="bg-accent/10 text-accent text-sm py-1 px-3 rounded-full">
                        Capacity Building
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Supported 500 families</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Trained 50 community facilitators</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                        <span>Established 10 community resource centers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="involved" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Get Involved
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Join us in our mission to transform society&apos;s understanding
              and practice of sexuality, marriage, and family life
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
                title: 'Volunteer',
                description:
                  'Share your time and talents to support our campaigns and events.',
                icon: <Users className="h-10 w-10 text-primary" />,
                link: '/contact',
              },
              {
                title: 'Donate',
                description:
                  'Support our work financially to help us reach more people and communities.',
                icon: <Heart className="h-10 w-10 text-accent" />,
                link: '/donate',
              },
              {
                title: 'Partner With Us',
                description:
                  'Explore organizational partnerships and collaborative opportunities.',
                icon: <Target className="h-10 w-10 text-secondary" />,
                link: '/contact',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4">{item.icon}</div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href={item.link}>
                        Get Started <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Impact Stories
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Hear from those who have been impacted by our campaigns
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={fadeIn}
              className="bg-background p-8 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Testimonial"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Kwame Asante</h3>
                  <p className="text-sm text-muted-foreground">
                    Teacher, Accra
                  </p>
                </div>
              </div>
              <p className="italic">
                &quot;The Healthy Relationships Campaign has transformed how I
                teach and talk about relationships with my students. The
                resources and training provided by iSMART have equipped me to
                address these important topics with confidence and
                sensitivity.&quot;
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-background p-8 rounded-lg shadow-sm"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Testimonial"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Ama Mensah</h3>
                  <p className="text-sm text-muted-foreground">
                    Community Leader, Kumasi
                  </p>
                </div>
              </div>
              <p className="italic">
                &quot;The Family Strengthening Initiative brought much-needed
                resources and support to our community. We&apos;ve seen a
                significant improvement in family relationships and a reduction
                in domestic conflicts. iSMART&apos;s approach is culturally
                sensitive and highly effective.&quot;
              </p>
            </motion.div>
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
              Join Our Advocacy Network
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Stay informed about our campaigns and advocacy efforts, and learn
              how you can get involved in creating positive change.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Join Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                asChild
              >
                <Link href="/donate">Support Our Work</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
