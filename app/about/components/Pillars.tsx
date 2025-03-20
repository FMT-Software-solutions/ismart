'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, Heart, Target, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export function Pillars() {
  return (
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
                  <p className="text-muted-foreground">{pillar.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
