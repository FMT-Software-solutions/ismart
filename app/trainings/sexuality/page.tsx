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

export default function SexualityPage() {
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
                Sexuality Studies
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Comprehensive education on human sexuality from biological,
                psychological, social, and cultural perspectives.
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
                The Department of Sexuality Studies at iSMART offers
                comprehensive education on human sexuality, exploring this
                fundamental aspect of human experience through multiple lenses.
                Our courses are designed to provide a holistic understanding of
                sexuality that integrates biological, psychological, social, and
                cultural perspectives.
              </p>
              <p className="paragraph mb-6">
                Our faculty includes experts in sexual health, psychology,
                sociology, and education who bring diverse perspectives and
                extensive experience to their teaching. Whether you're a
                healthcare professional, educator, counselor, or simply seeking
                to deepen your understanding of human sexuality, our courses
                provide evidence-based knowledge and practical skills.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Comprehensive Curriculum
                    </h4>
                    <p className="text-muted-foreground">
                      Courses covering all aspects of human sexuality
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expert Faculty</h4>
                    <p className="text-muted-foreground">
                      Learn from specialists in sexual health and education
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Flexible Learning Options
                    </h4>
                    <p className="text-muted-foreground">
                      In-person, online, and hybrid course formats
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
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Sexuality Studies"
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
              Explore our comprehensive range of sexuality education courses
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
                title: 'Understanding Human Sexuality',
                description:
                  'A comprehensive introduction to human sexuality from biological, psychological, social, and cultural perspectives.',
                duration: '8 weeks',
                format: 'In-person or Online',
                level: 'Introductory',
                image:
                  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Sexual Health and Wellness',
                description:
                  'Explore the components of sexual health and strategies for maintaining sexual wellness throughout the lifespan.',
                duration: '6 weeks',
                format: 'Online',
                level: 'Intermediate',
                image:
                  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Sexuality Education for Parents',
                description:
                  'Equipping parents with knowledge and skills to provide age-appropriate sexuality education to their children.',
                duration: '4 weeks',
                format: 'Hybrid',
                level: 'Intermediate',
                image:
                  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Gender and Sexuality Studies',
                description:
                  'Examining the social construction of gender and sexuality and their intersection with other aspects of identity.',
                duration: '10 weeks',
                format: 'In-person',
                level: 'Advanced',
                image:
                  'https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Sexuality Across the Lifespan',
                description:
                  'Understanding how sexuality develops and changes throughout the human lifespan, from childhood to older adulthood.',
                duration: '8 weeks',
                format: 'Online',
                level: 'Intermediate',
                image:
                  'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
              },
              {
                title: 'Sexuality Education Facilitation',
                description:
                  'Training for educators, counselors, and health professionals in facilitating sexuality education programs.',
                duration: '12 weeks',
                format: 'Hybrid',
                level: 'Advanced',
                image:
                  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
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

      {/* Faculty Section */}
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
              Meet Our Faculty
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Learn from experts in sexuality education and research
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
                name: 'Dr. Sarah Mensah',
                role: 'Department Chair',
                bio: 'Dr. Mensah has over 15 years of experience in sexuality education and research, with a focus on cultural influences on sexuality.',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
              },
              {
                name: 'Prof. James Osei',
                role: 'Senior Lecturer',
                bio: 'Prof. Osei specializes in sexual health education and has developed sexuality education curricula for schools across Ghana.',
                image:
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                name: 'Dr. Grace Addo',
                role: 'Lecturer',
                bio: "Dr. Addo's research focuses on gender and sexuality, with particular emphasis on women's sexual health and empowerment.",
                image:
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
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
              Student Testimonials
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Hear from those who have completed our sexuality studies courses
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
                  'The Understanding Human Sexuality course provided me with a comprehensive foundation that has been invaluable in my work as a healthcare provider.',
                name: 'Dr. Kwame Asante',
                role: 'Healthcare Professional',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
                  "The course on Sexuality Across the Lifespan transformed my understanding of how sexuality develops and changes throughout life. It's been incredibly helpful in my counseling practice.",
                name: 'Ama Owusu',
                role: 'Counselor',
                image:
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
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
              Ready to Enroll?
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Register for one of our sexuality studies courses and gain the
              knowledge and skills to make a difference in your personal and
              professional life.
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
