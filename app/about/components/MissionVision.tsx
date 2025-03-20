'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export function MissionVision() {
  return (
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
                  &quot;To conduct rigorous and culturally relevant research and
                  training on sexuality, marriage and family life in Africa and
                  beyond, contributing to improved sexual and reproductive
                  health outcomes, stronger marriages and families, and building
                  a more just and equitable society.&quot;
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
                  related to sexuality, marriage, and family life in Africa and
                  beyond.&quot;
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
                  &quot;A Transformed World where sexuality, marriage and family
                  life is understood, practiced and embodied according to
                  God&apos;s standards and principles.&quot;
                </p>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
