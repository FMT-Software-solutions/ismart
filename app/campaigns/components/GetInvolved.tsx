'use client';

import { motion } from 'framer-motion';
import { GetInvolvedCard } from './GetInvolvedCard';
import { type involvementOptions } from '../data';

interface GetInvolvedProps {
  title: string;
  description: string;
  options: typeof involvementOptions;
  fadeIn: any;
  staggerContainer: any;
}

export function GetInvolved({
  title,
  description,
  options,
  fadeIn,
  staggerContainer,
}: GetInvolvedProps) {
  return (
    <div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <motion.h2 variants={fadeIn} className="heading-2 mb-4">
          {title}
        </motion.h2>
        <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
          {description}
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {options.map((option, index) => (
          <GetInvolvedCard
            key={index}
            title={option.title}
            description={option.description}
            icon={option.icon}
            link={option.link}
            fadeIn={fadeIn}
          />
        ))}
      </motion.div>
    </div>
  );
}
