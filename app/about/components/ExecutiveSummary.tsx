'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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

export function ExecutiveSummary() {
  return (
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
              Educational Research Institute based in Ghana. We aim to become a
              leading centre for research and education in sexuality, marriage,
              and family life, generating high-quality, culturally sensitive
              research and training that informs policy, education, and social
              development across the African continent and beyond.
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
  );
}
