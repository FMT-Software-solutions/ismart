'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { InitiativeItem } from './InitiativeItem';
import { type pastInitiatives } from '../data';

interface InitiativeTabsProps {
  initiatives: typeof pastInitiatives;
  fadeIn: any;
  staggerContainer: any;
}

export function InitiativeTabs({
  initiatives,
  fadeIn,
  staggerContainer,
}: InitiativeTabsProps) {
  // Calculate grid columns based on number of years, max of 3
  const gridCols = Math.min(initiatives.length, 3);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
    >
      <Tabs defaultValue={initiatives[0]?.year} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-1 sm:grid-cols-3 mb-8">
          {initiatives.map((yearData) => (
            <TabsTrigger key={yearData.year} value={yearData.year}>
              {yearData.year}
            </TabsTrigger>
          ))}
        </TabsList>

        {initiatives.map((yearData) => (
          <TabsContent
            key={yearData.year}
            value={yearData.year}
            className="space-y-8"
          >
            {yearData.initiatives.map((initiative, idx) => (
              <motion.div key={idx} variants={fadeIn}>
                <InitiativeItem
                  title={initiative.title}
                  description={initiative.description}
                  image={initiative.image}
                  badges={initiative.badges}
                  achievements={initiative.achievements}
                />
              </motion.div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  );
}
