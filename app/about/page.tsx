'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Award, BookOpen, Heart, Target, Users } from 'lucide-react';
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

export default function AboutPage() {
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
                About iSMART
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                The Institute of Sexuality, Marriage and Family Life Research &
                Training (iSMART) is an independent, premier Non-Governmental
                Educational Research Institute based in Ghana.
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

      {/* Executive Summary Section */}
      <section id="executive-summary" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="heading-2 mb-6">Executive Summary</h2>
              <p className="paragraph mb-6">
                The Institute of Sexuality, Marriage and Family Life Research &
                Training (iSMART) is an independent, premier Non-Governmental
                Educational Research Institute based in Ghana. We aim to become
                a leading centre for research and education in sexuality,
                marriage, and family life, generating high-quality, culturally
                sensitive research and training that informs policy, education,
                and social development across the African continent and beyond.
              </p>
              <p className="paragraph">
                Our work spans across multiple disciplines, bringing together
                experts in psychology, sociology, theology, medicine, and
                education to address the complex challenges facing individuals,
                couples, and families in today&apos;s rapidly changing world.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="https://res.cloudinary.com/deptmmxdn/image/upload/v1741294497/IMG_6581_1_c3xvlj.jpg"
                alt="Team meeting"
                fill
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Goal Section */}
      <section id="mission-vision" className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Our Foundation
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              The core principles that guide our work and shape our impact
            </motion.p>
          </motion.div>

          <Tabs defaultValue="mission" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mission">Mission</TabsTrigger>
              <TabsTrigger value="vision">Vision</TabsTrigger>
              <TabsTrigger value="goal">Overall Goal</TabsTrigger>
            </TabsList>

            <TabsContent value="mission" className="mt-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <motion.div
                  variants={fadeIn}
                  className="relative h-[300px] rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src="https://res.cloudinary.com/deptmmxdn/image/upload/v1741294272/IMG_6571_q8f8po.jpg"
                    alt="Mission"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <h3 className="heading-3 mb-4">Our Mission</h3>
                  <p className="paragraph">
                    &quot;To conduct rigorous and culturally relevant research
                    and training on sexuality, marriage and family life in
                    Africa and beyond, contributing to improved sexual and
                    reproductive health outcomes, stronger marriages and
                    families, and building a more just and equitable
                    society.&quot;
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="vision" className="mt-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <motion.div
                  variants={fadeIn}
                  className="order-1 md:order-2 relative h-[300px] rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src="https://res.cloudinary.com/deptmmxdn/image/upload/v1741302020/IMG_6594_1_rf1kfa.jpg"
                    alt="Vision"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
                <motion.div variants={fadeIn} className="order-2 md:order-1">
                  <h3 className="heading-3 mb-4">Our Vision</h3>
                  <p className="paragraph">
                    &quot;To be a trusted and influential voice in shaping and
                    revolutionising public understanding, practice and policy
                    related to sexuality, marriage, and family life in Africa
                    and beyond.&quot;
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="goal" className="mt-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <motion.div
                  variants={fadeIn}
                  className="relative h-[300px] rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src="https://res.cloudinary.com/deptmmxdn/image/upload/v1741302105/IMG_6565_1_oyofkt.jpg"
                    alt="Goal"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </motion.div>
                <motion.div variants={fadeIn}>
                  <h3 className="heading-3 mb-4">Our Overall Goal</h3>
                  <p className="paragraph">
                    &quot;A Transformed World where sexuality, marriage and
                    family life is understood, practiced and embodied according
                    to God&apos;s standards and principles.&quot;
                  </p>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pillars" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Our Pillars
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              The core areas that form the foundation of our work
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                title: 'Research',
                description:
                  'Conducting rigorous, culturally-sensitive research on sexuality, marriage, and family life.',
                icon: <BookOpen className="h-10 w-10 text-primary" />,
              },
              {
                title: 'Education',
                description:
                  'Providing high-quality training and educational programs for individuals, couples, and professionals.',
                icon: <Award className="h-10 w-10 text-secondary" />,
              },
              {
                title: 'Advocacy',
                description:
                  'Advocating for policies and practices that promote healthy sexuality, strong marriages, and thriving families.',
                icon: <Target className="h-10 w-10 text-accent" />,
              },
              {
                title: 'Community',
                description:
                  'Building supportive communities that foster growth, healing, and transformation.',
                icon: <Users className="h-10 w-10 text-primary" />,
              },
            ].map((pillar, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4">{pillar.icon}</div>
                    <CardTitle>{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Our Team
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Meet the dedicated professionals behind iSMART
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
                role: 'Executive Director',
                bio: 'Dr. Mensah has over 15 years of experience in sexuality education and research.',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
              },
              {
                name: 'Prof. James Osei',
                role: 'Research Director',
                bio: 'Prof. Osei leads our research initiatives with expertise in family dynamics and cultural studies.',
                image:
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                name: 'Dr. Grace Addo',
                role: 'Director of Training',
                bio: 'Dr. Addo specializes in marriage counseling and relationship education.',
                image:
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
              },
              {
                name: 'Mr. Joshua Yeboah',
                role: 'Advocacy Coordinator',
                bio: 'Mr. Joshua brings extensive experience in policy development and community engagement.',
                image:
                  'https://res.cloudinary.com/deptmmxdn/image/upload/v1741301010/IMG_0494_1_k7xh5d.jpg',
              },
              {
                name: 'Mrs. Abena Owusu',
                role: 'Communications Director',
                bio: 'Mrs. Owusu manages our media relations and public engagement strategies.',
                image:
                  'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                name: 'Dr. Emmanuel Boateng',
                role: 'Curriculum Developer',
                bio: 'Dr. Boateng designs our educational programs with a focus on cultural relevance.',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Policy Positions Section */}
      <section id="policy" className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Policy Positions
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Our stance on key issues affecting sexuality, marriage, and family
              life
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeIn}>
              <h3 className="heading-3 mb-6">Our Approach</h3>
              <p className="paragraph mb-6">
                At iSMART, we develop evidence-based policy positions that are
                informed by rigorous research, cultural sensitivity, and a
                commitment to promoting human dignity and flourishing. Our
                policy positions are designed to inform public discourse, shape
                educational practices, and influence legislative decisions.
              </p>
              <p className="paragraph">
                We engage with policymakers, community leaders, religious
                institutions, and other stakeholders to advocate for policies
                that support healthy sexuality, strong marriages, and thriving
                families.
              </p>
            </motion.div>

            <motion.div variants={fadeIn}>
              <h3 className="heading-3 mb-6">Key Policy Areas</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Comprehensive Sexuality Education
                    </h4>
                    <p className="text-muted-foreground">
                      Advocating for age-appropriate, culturally sensitive
                      sexuality education that promotes healthy relationships
                      and responsible decision-making.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Marriage and Family Support
                    </h4>
                    <p className="text-muted-foreground">
                      Supporting policies that strengthen marriages and
                      families, including pre-marital education, family leave
                      policies, and accessible counseling services.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">
                      Research and Education Funding
                    </h4>
                    <p className="text-muted-foreground">
                      Advocating for increased funding for research and
                      education in sexuality, marriage, and family life.
                    </p>
                  </div>
                </li>
              </ul>
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
              Join Our Mission
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              There are many ways to get involved with iSMART and support our
              work in research, education, and advocacy.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">Make a Donation</Link>
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
