'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { type testimonials } from '../data';

interface TestimonialsProps {
  title: string;
  description: string;
  testimonials: typeof testimonials;
  fadeIn: any;
  staggerContainer: any;
}

export function Testimonials({
  title,
  description,
  testimonials,
  fadeIn,
  staggerContainer,
}: TestimonialsProps) {
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
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={fadeIn}
            className="bg-background p-8 rounded-lg shadow-sm"
          >
            <div className="flex items-center mb-6">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
            <p className="italic">&quot;{testimonial.quote}&quot;</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
