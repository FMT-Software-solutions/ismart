'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
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

export function CTASection() {
  return (
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
            There are many ways to get involved with iSMART and support our work
            in research, education, and advocacy.
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
  );
}
