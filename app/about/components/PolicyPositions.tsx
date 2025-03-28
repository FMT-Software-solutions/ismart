'use client';

import { motion } from 'framer-motion';
import { BookOpen, Heart, Users } from 'lucide-react';

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

export function PolicyPositions() {
  return (
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
              commitment to promoting human dignity and flourishing. Our policy
              positions are designed to inform public discourse, shape
              educational practices, and influence legislative decisions.
            </p>
            <p className="paragraph">
              We engage with policymakers, community leaders, religious
              institutions, and other stakeholders to advocate for policies that
              support healthy sexuality, strong marriages, and thriving
              families.
            </p>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h3 className="heading-3 mb-6">Key Policy Areas</h3>
            <ul className="space-y-4">
              <li className="flex items-start list-none">
                <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Comprehensive Sexuality Education
                  </h4>
                  <p className="text-muted-foreground">
                    Advocating for age-appropriate, culturally sensitive
                    sexuality education that promotes healthy relationships and
                    responsible decision-making.
                  </p>
                </div>
              </li>
              <li className="flex items-start list-none">
                <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                  <Users className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Marriage and Family Support
                  </h4>
                  <p className="text-muted-foreground">
                    Supporting policies that strengthen marriages and families,
                    including pre-marital education, family leave policies, and
                    accessible counseling services.
                  </p>
                </div>
              </li>
              <li className="flex items-start list-none">
                <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">
                    Research and Education Funding
                  </h4>
                  <p className="text-muted-foreground">
                    Advocating for increased funding for research and education
                    in sexuality, marriage, and family life.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
