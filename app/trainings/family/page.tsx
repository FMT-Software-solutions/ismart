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
  Check,
} from 'lucide-react';

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

export default function FamilyPage() {
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
                Parenting & Family Life
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Supporting families with research-backed strategies for
                nurturing the next generation and creating thriving home
                environments.
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

      {/* Department Overview Section */}
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
              <h2 className="heading-2 mb-6">Department Overview</h2>
              <p className="paragraph mb-6">
                The Department of Parenting & Family Life at iSMART is dedicated
                to strengthening families through evidence-based education and
                training. We offer a range of courses designed to equip parents,
                caregivers, and family service providers with the knowledge and
                skills needed to create nurturing environments where children
                and families can thrive.
              </p>
              <p className="paragraph mb-6">
                Our faculty includes experienced family therapists, child
                development specialists, and parenting educators who bring both
                academic expertise and practical wisdom to their teaching.
                Whether you're a new parent, an experienced caregiver, or a
                professional working with families, our courses provide valuable
                insights and practical tools.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Evidence-Based Approaches
                    </h4>
                    <p className="text-muted-foreground">
                      Parenting strategies grounded in research
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Practical Skills Training
                    </h4>
                    <p className="text-muted-foreground">
                      Develop concrete skills for family success
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Culturally Relevant</h4>
                    <p className="text-muted-foreground">
                      Content tailored to African contexts and values
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                alt="Parenting & Family Life"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
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
              Our Courses
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Explore our comprehensive range of parenting and family life
              courses
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
                title: 'Effective Parenting Strategies',
                description:
                  'Evidence-based approaches to parenting that promote healthy child development and strong parent-child relationships.',
                duration: '8 weeks',
                format: 'In-person or Online',
                level: 'Beginner to Intermediate',
                image:
                  'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
              },
              {
                title: 'Family Systems Therapy',
                description:
                  'Training for counselors and therapists in family systems theory and therapeutic approaches.',
                duration: '12 weeks',
                format: 'Hybrid',
                level: 'Advanced',
                image:
                  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
              },
              {
                title: 'Child Development and Nurturing',
                description:
                  'Understanding the stages of child development and creating nurturing environments for children to thrive.',
                duration: '6 weeks',
                format: 'Online',
                level: 'Beginner',
                image:
                  'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
              },
              {
                title: 'Positive Discipline Techniques',
                description:
                  'Learn effective, non-punitive approaches to discipline that teach children responsibility and self-regulation.',
                duration: '6 weeks',
                format: 'In-person or Online',
                level: 'Intermediate',
                image:
                  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Parenting in the Digital Age',
                description:
                  'Navigate the challenges of raising children in a technology-saturated world with strategies for healthy media use.',
                duration: '4 weeks',
                format: 'Online',
                level: 'Beginner to Intermediate',
                image:
                  'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Family Life Education',
                description:
                  'Professional training for educators and community workers in delivering family life education programs.',
                duration: '16 weeks',
                format: 'Hybrid',
                level: 'Advanced',
                image:
                  'https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
            ].map((course, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden h-full">
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

                    <div className="space-y-2">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Clock className="mr-2 h-4 w-4" />
                        <span>Duration: {course.duration}</span>
                      </div>

                      <div className="flex items-center text-muted-foreground text-sm">
                        <Users className="mr-2 h-4 w-4" />
                        <span>Format: {course.format}</span>
                      </div>

                      <div className="flex items-center text-muted-foreground text-sm">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Level: {course.level}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/trainings/register">Register Now</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Parenting Approaches Section */}
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
              Parenting Approaches
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Explore different evidence-based parenting styles and approaches
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="positive" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="positive">Positive Parenting</TabsTrigger>
                <TabsTrigger value="authoritative">Authoritative</TabsTrigger>
                <TabsTrigger value="attachment">Attachment</TabsTrigger>
              </TabsList>

              <TabsContent value="positive" className="mt-6">
                <motion.div
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                      alt="Positive Parenting"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Positive Parenting</h3>
                    <p className="paragraph mb-6">
                      Positive parenting focuses on developing a strong, deeply
                      committed relationship between parent and child based on
                      communication and mutual respect. This approach emphasizes
                      positive reinforcement, natural consequences, and
                      non-punitive discipline.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Encouragement</h4>
                          <p className="text-muted-foreground">
                            Focusing on strengths and positive behaviors
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Clear Communication
                          </h4>
                          <p className="text-muted-foreground">
                            Setting clear expectations and boundaries
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Problem-Solving
                          </h4>
                          <p className="text-muted-foreground">
                            Teaching children to find solutions to challenges
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="authoritative" className="mt-6">
                <motion.div
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  <div className="order-2 md:order-1">
                    <h3 className="heading-3 mb-4">Authoritative Parenting</h3>
                    <p className="paragraph mb-6">
                      Authoritative parenting balances clear expectations and
                      consequences with warmth, responsiveness, and respect for
                      children's independence. This approach is associated with
                      positive outcomes in children's development, including
                      higher self-esteem and better academic performance.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            High Expectations
                          </h4>
                          <p className="text-muted-foreground">
                            Setting appropriate standards for behavior
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Warmth and Responsiveness
                          </h4>
                          <p className="text-muted-foreground">
                            Showing love and responding to children's needs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Autonomy Support
                          </h4>
                          <p className="text-muted-foreground">
                            Encouraging independence and decision-making
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                    <Image
                      src="https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Authoritative Parenting"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="attachment" className="mt-6">
                <motion.div
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
                      alt="Attachment Parenting"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Attachment Parenting</h3>
                    <p className="paragraph mb-6">
                      Attachment parenting emphasizes the importance of building
                      a strong emotional bond between parent and child. This
                      approach focuses on responsiveness to children's needs,
                      physical closeness, and emotional attunement.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Responsiveness</h4>
                          <p className="text-muted-foreground">
                            Promptly responding to children's needs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Physical Closeness
                          </h4>
                          <p className="text-muted-foreground">
                            Maintaining close physical contact, especially in
                            early years
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Emotional Attunement
                          </h4>
                          <p className="text-muted-foreground">
                            Being aware of and responsive to children's
                            emotional states
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Faculty Section */}
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
              Meet Our Faculty
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Learn from experienced family specialists and parenting experts
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
                name: 'Dr. Emmanuel Boateng',
                role: 'Department Chair',
                bio: 'Dr. Boateng specializes in child development and family systems with over 15 years of experience working with families across Ghana.',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                name: 'Mrs. Abena Owusu',
                role: 'Senior Lecturer',
                bio: 'Mrs. Owusu is a family therapist with expertise in positive parenting approaches and supporting families through transitions.',
                image:
                  'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                name: 'Mr. Daniel Kwame',
                role: 'Lecturer',
                bio: 'Mr. Kwame focuses on fatherhood and male involvement in parenting, with a background in community-based family support programs.',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
            ].map((faculty, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={faculty.image}
                      alt={faculty.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{faculty.name}</CardTitle>
                    <CardDescription>{faculty.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faculty.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Testimonials
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Hear from parents and professionals who have benefited from our
              programs
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
                  "The Effective Parenting Strategies course gave me practical tools to better understand and connect with my children. I've seen a significant improvement in our relationship.",
                name: 'Kwame Asante',
                role: 'Father of three',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                quote:
                  'As a social worker, the Family Systems Therapy course has transformed how I work with families in crisis. The culturally relevant approach has been particularly valuable in my practice.',
                name: 'Grace Mensah',
                role: 'Social Worker',
                image:
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
              },
              {
                quote:
                  "The Positive Discipline Techniques course helped me move away from punitive approaches to more effective, respectful ways of guiding my children's behavior. It's made our home much more peaceful.",
                name: 'Ama Owusu',
                role: 'Mother of two',
                image:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-muted/30 p-8 rounded-lg shadow-sm"
              >
                <div className="relative h-16 w-16 rounded-full overflow-hidden mb-6 mx-auto">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className="italic text-center mb-6">"{testimonial.quote}"</p>
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
              Strengthen Your Family
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Register for one of our parenting and family life courses and gain
              the knowledge and skills to create a nurturing, supportive home
              environment.
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
