'use client';

import { motion } from 'framer-motion';

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

export function HeroSection() {
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
              About iSMART
            </motion.h1>
            <motion.p variants={fadeIn} className="text-xl mb-8 text-white/90">
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
  );
}
