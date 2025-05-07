'use client';

import { motion } from 'framer-motion';
import { CampaignCard } from './CampaignCard';
import { type currentCampaigns } from '../data';

interface CurrentCampaignsProps {
  title: string;
  description: string;
  campaigns: typeof currentCampaigns;
  fadeIn: any;
  staggerContainer: any;
}

export function CurrentCampaigns({
  title,
  description,
  campaigns,
  fadeIn,
  staggerContainer,
}: CurrentCampaignsProps) {
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
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            title={campaign.title}
            description={campaign.description}
            progress={campaign.progress}
            timeframe={campaign.timeframe}
            image={campaign.image}
            fadeIn={fadeIn}
          />
        ))}
      </motion.div>
    </div>
  );
}
