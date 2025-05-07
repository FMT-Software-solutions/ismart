'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  description: string;
  fadeIn: any;
  staggerContainer: any;
}

export function HeroSection({
  title,
  description,
  fadeIn,
  staggerContainer,
}: HeroSectionProps) {
  return (
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
              {title}
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl mb-8 text-white/90">
              {description}
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
  );
}
