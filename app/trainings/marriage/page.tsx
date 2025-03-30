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
  Heart,
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

export default function MarriagePage() {
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
                Marriage & Relationships
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Building stronger, healthier relationships through
                evidence-based approaches and practical skills.
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
                The Department of Marriage & Relationships at iSMART is
                dedicated to strengthening marriages and partnerships through
                evidence-based education and training. We offer a range of
                courses designed to equip individuals and couples with the
                knowledge and skills needed to build and maintain healthy,
                fulfilling relationships.
              </p>
              <p className="paragraph mb-6">
                Our faculty includes experienced marriage counselors,
                relationship therapists, and researchers who bring both academic
                expertise and practical wisdom to their teaching. Whether you're
                preparing for marriage, seeking to enrich your current
                relationship, or training to help others, our courses provide
                valuable insights and practical tools.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Practical Skills Training
                    </h4>
                    <p className="text-muted-foreground">
                      Develop concrete skills for relationship success
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Evidence-Based Approaches
                    </h4>
                    <p className="text-muted-foreground">
                      Programs grounded in research and best practices
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-accent" />
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
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Marriage & Relationships"
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
              Explore our comprehensive range of relationship and marriage
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
                title: 'Premarital Counseling Certification',
                description:
                  'Training for religious leaders, counselors, and mentors to provide effective premarital counseling.',
                duration: '12 weeks',
                format: 'In-person',
                level: 'Advanced',
                image:
                  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Marriage Enrichment Program',
                description:
                  'Helping couples strengthen their relationship through improved communication, conflict resolution, and intimacy.',
                duration: '8 weeks',
                format: 'Hybrid',
                level: 'Intermediate',
                image:
                  'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Communication Skills for Couples',
                description:
                  'Practical training in effective communication techniques to enhance understanding and connection in relationships.',
                duration: '6 weeks',
                format: 'Online',
                level: 'Beginner',
                image:
                  'https://images.unsplash.com/photo-1516058575735-399a011dca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
              },
              {
                title: 'Conflict Resolution in Relationships',
                description:
                  'Learn effective strategies for managing and resolving conflicts in ways that strengthen rather than damage relationships.',
                duration: '6 weeks',
                format: 'In-person or Online',
                level: 'Intermediate',
                image:
                  'https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Building Emotional Intimacy',
                description:
                  'Explore the foundations of emotional connection and learn practical ways to deepen intimacy in your relationship.',
                duration: '8 weeks',
                format: 'Hybrid',
                level: 'Intermediate',
                image:
                  'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Marriage Counseling Techniques',
                description:
                  'Professional training for counselors, therapists, and pastoral care providers in evidence-based marriage counseling approaches.',
                duration: '16 weeks',
                format: 'In-person',
                level: 'Advanced',
                image:
                  'https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80',
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
                    {/* TODO: enable this back */}
                    {/* <Button asChild>
                      <Link href="/trainings/register">Register Now</Link>
                    </Button> */}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Relationship Skills Section */}
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
              Key Relationship Skills
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Essential skills for building and maintaining healthy
              relationships
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="communication" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="conflict">Conflict Resolution</TabsTrigger>
                <TabsTrigger value="intimacy">Intimacy</TabsTrigger>
              </TabsList>

              <TabsContent value="communication" className="mt-6">
                <motion.div
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1516058575735-399a011dca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                      alt="Communication Skills"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Effective Communication</h3>
                    <p className="paragraph mb-6">
                      Communication is the foundation of any healthy
                      relationship. Our courses teach practical skills for
                      expressing yourself clearly, listening actively, and
                      understanding your partner's perspective.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Active Listening
                          </h4>
                          <p className="text-muted-foreground">
                            Fully focusing on and understanding your partner
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Clear Expression
                          </h4>
                          <p className="text-muted-foreground">
                            Articulating thoughts and feelings effectively
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Empathetic Response
                          </h4>
                          <p className="text-muted-foreground">
                            Responding with understanding and validation
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="conflict" className="mt-6">
                <motion.div
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  <div className="order-2 md:order-1">
                    <h3 className="heading-3 mb-4">Conflict Resolution</h3>
                    <p className="paragraph mb-6">
                      Conflict is inevitable in any relationship, but it doesn't
                      have to be destructive. Our courses teach strategies for
                      managing disagreements in ways that lead to greater
                      understanding and connection.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Fair Fighting Rules
                          </h4>
                          <p className="text-muted-foreground">
                            Guidelines for respectful disagreement
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Problem-Solving Approach
                          </h4>
                          <p className="text-muted-foreground">
                            Working together to find mutually satisfying
                            solutions
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Emotional Regulation
                          </h4>
                          <p className="text-muted-foreground">
                            Managing emotions during difficult conversations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                    <Image
                      src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Conflict Resolution"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="intimacy" className="mt-6">
                <motion.div
                  variants={fadeIn}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                      alt="Building Intimacy"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Building Intimacy</h3>
                    <p className="paragraph mb-6">
                      Intimacy is about deep connection—emotional, physical,
                      intellectual, and spiritual. Our courses explore ways to
                      develop and maintain intimacy in all these dimensions.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Emotional Connection
                          </h4>
                          <p className="text-muted-foreground">
                            Sharing feelings and vulnerabilities
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">
                            Physical Intimacy
                          </h4>
                          <p className="text-muted-foreground">
                            Understanding and communicating about physical needs
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Shared Meaning</h4>
                          <p className="text-muted-foreground">
                            Creating a sense of purpose and values together
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
              Learn from experienced relationship experts and counselors
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
                name: 'Dr. Grace Addo',
                role: 'Department Chair',
                bio: 'Dr. Addo specializes in marriage counseling and relationship education with over 20 years of experience working with couples.',
                image:
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
              },
              {
                name: 'Rev. John Agyekum',
                role: 'Senior Lecturer',
                bio: 'Rev. Agyekum brings a unique blend of pastoral counseling and academic expertise to his teaching on marriage and family life.',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                name: 'Mrs. Abena Owusu',
                role: 'Lecturer',
                bio: 'Mrs. Owusu is a certified relationship coach specializing in premarital counseling and conflict resolution.',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
              },
            ].map((faculty, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden h-full">
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
    </div>
  );
}
