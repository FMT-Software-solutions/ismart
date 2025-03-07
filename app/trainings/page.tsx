'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  BookOpen,
  Award,
  Clock,
} from 'lucide-react';
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

export default function trainingsPage() {
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
                Events & Trainings
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Equipping individuals, couples, and professionals with knowledge
                and skills for healthy sexuality, strong marriages, and thriving
                families.
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

      {/* Departments Section */}
      {/* <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Our Academic Departments
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Explore our specialized departments offering comprehensive
              training and education
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="card-hover"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Department of Sexuality Studies</CardTitle>
                  <CardDescription>
                    Comprehensive education on human sexuality from biological,
                    psychological, social, and cultural perspectives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our Sexuality Studies department offers courses that explore
                    human sexuality through multiple lenses, providing a
                    holistic understanding of this fundamental aspect of human
                    experience.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      <span>
                        For individuals, educators, and health professionals
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Courses ranging from 1 day to 12 weeks</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/trainings/sexuality">
                      Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="card-hover"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">
                    <Users className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle>Department of Marriage & Relationships</CardTitle>
                  <CardDescription>
                    Building stronger, healthier relationships through
                    evidence-based approaches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our Marriage & Relationships department provides training in
                    relationship skills, conflict resolution, and communication
                    techniques that strengthen marriages and partnerships.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      <span>
                        For couples, counselors, and religious leaders
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        Programs from weekend workshops to 8-week courses
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/trainings/marriage">
                      Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="card-hover"
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">
                    <Award className="h-10 w-10 text-secondary" />
                  </div>
                  <CardTitle>Department of Parenting & Family Life</CardTitle>
                  <CardDescription>
                    Supporting families with research-backed strategies for
                    nurturing the next generation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our Parenting & Family Life department offers training in
                    effective parenting strategies, child development, and
                    family dynamics to help create nurturing home environments.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <Users className="mr-2 h-4 w-4" />
                      <span>
                        For parents, caregivers, and family service providers
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        Flexible formats from single sessions to ongoing support
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/trainings/family">
                      Explore Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section> */}

      {/* Featured Courses Section */}
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
              Featured Trainings
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Our most popular and impactful training programs
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="sexuality" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="sexuality">Sexuality</TabsTrigger>
                <TabsTrigger value="marriage">Marriage</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>

              <TabsContent value="sexuality" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Understanding Human Sexuality',
                      description:
                        'A comprehensive introduction to human sexuality from biological, psychological, social, and cultural perspectives.',
                      duration: '8 weeks',
                      format: 'In-person or Online',
                      image:
                        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    },
                    {
                      title: 'Sexual Health and Wellness',
                      description:
                        'Explore the components of sexual health and strategies for maintaining sexual wellness throughout the lifespan.',
                      duration: '6 weeks',
                      format: 'Online',
                      image:
                        'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    },
                    {
                      title: 'Sexuality Education for Parents',
                      description:
                        'Equipping parents with knowledge and skills to provide age-appropriate sexuality education to their children.',
                      duration: '4 weeks',
                      format: 'Hybrid',
                      image:
                        'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    },
                  ].map((course, index) => (
                    <Card key={index} className="overflow-hidden h-full">
                      <div className="relative h-48">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          {course.description}
                        </p>

                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="mr-2 h-4 w-4" />
                          <span>{course.format}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild>
                          <Link href="/trainings/register">Register Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="marriage" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Premarital Counseling Certification',
                      description:
                        'Training for religious leaders, counselors, and mentors to provide effective premarital counseling.',
                      duration: '12 weeks',
                      format: 'In-person',
                      image:
                        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    },
                    {
                      title: 'Marriage Enrichment Program',
                      description:
                        'Helping couples strengthen their relationship through improved communication, conflict resolution, and intimacy.',
                      duration: '8 weeks',
                      format: 'Hybrid',
                      image:
                        'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                    },
                    {
                      title: 'Communication Skills for Couples',
                      description:
                        'Practical training in effective communication techniques to enhance understanding and connection in relationships.',
                      duration: '6 weeks',
                      format: 'Online',
                      image:
                        'https://images.unsplash.com/photo-1516058575735-399a011dca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
                    },
                  ].map((course, index) => (
                    <Card key={index} className="overflow-hidden h-full">
                      <div className="relative h-48">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          {course.description}
                        </p>

                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="mr-2 h-4 w-4" />
                          <span>{course.format}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild>
                          <Link href="/trainings/register">Register Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="family" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: 'Effective Parenting Strategies',
                      description:
                        'Evidence-based approaches to parenting that promote healthy child development and strong parent-child relationships.',
                      duration: '8 weeks',
                      format: 'In-person or Online',
                      image:
                        'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
                    },
                    {
                      title: 'Family Systems Therapy',
                      description:
                        'Training for counselors and therapists in family systems theory and therapeutic approaches.',
                      duration: '12 weeks',
                      format: 'Hybrid',
                      image:
                        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
                    },
                    {
                      title: 'Child Development and Nurturing',
                      description:
                        'Understanding the stages of child development and creating nurturing environments for children to thrive.',
                      duration: '6 weeks',
                      format: 'Online',
                      image:
                        'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
                    },
                  ].map((course, index) => (
                    <Card key={index} className="overflow-hidden h-full">
                      <div className="relative h-48">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <CardHeader>
                        <CardTitle>{course.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground">
                          {course.description}
                        </p>

                        <div className="flex items-center text-muted-foreground text-sm">
                          <Clock className="mr-2 h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex items-center text-muted-foreground text-sm">
                          <Users className="mr-2 h-4 w-4" />
                          <span>{course.format}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild>
                          <Link href="/trainings/register">Register Now</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
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
              Upcoming Events
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Join us for these transformative learning opportunities
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-muted/30 rounded-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-48 md:h-auto">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6 md:col-span-2">
                    <h3 className="heading-4 mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {event.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <Link href="/trainings/register">Register Now</Link>
                    </Button>
                  </div>
                </div>
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
              Testimonials
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Hear from those who have participated in our training programs
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
                quote:
                  'The Marriage Enrichment Program transformed our relationship. We learned practical skills that have helped us communicate better and resolve conflicts in a healthy way.',
                name: 'John & Mary Adu',
                role: 'Participants, Marriage Enrichment Program',
                image:
                  'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                quote:
                  'As a teacher, the Sexuality Education course equipped me with the knowledge and confidence to address these important topics with my students in an age-appropriate way.',
                name: 'Grace Mensah',
                role: 'Secondary School Teacher',
                image:
                  'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                quote:
                  "The Effective Parenting Strategies course gave me practical tools to better understand and connect with my children. I've seen a significant improvement in our relationship.",
                name: 'Kwame Asante',
                role: 'Father of three',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-background p-8 rounded-lg shadow-sm"
              >
                <div className="relative h-16 w-16 rounded-full overflow-hidden mb-6 mx-auto">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className="italic text-center mb-6">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div className="text-center">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
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
              Ready to Transform Your Life?
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Register for one of our training programs and gain the knowledge
              and skills to build healthier relationships and stronger families.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/trainings/register">Register Now</Link>
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
