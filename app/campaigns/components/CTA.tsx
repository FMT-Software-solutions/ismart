'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CTAProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  fadeIn: any;
  staggerContainer: any;
}

export function CTA({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  fadeIn,
  staggerContainer,
}: CTAProps) {
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
            {title}
          </motion.h2>
          <motion.p variants={fadeIn} className="paragraph mb-8">
            {description}
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" variant="secondary" asChild>
              <Link href={primaryButtonLink}>{primaryButtonText}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
              asChild
            >
              <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
