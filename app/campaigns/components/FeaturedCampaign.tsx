'use client';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedCampaignProps {
  title: string;
  description: string;
  image: string;
  progress: number;
  timeframe: string;
  location: string;
  target: string;
  link: string;
  fadeIn: any;
  staggerContainer: any;
}

export function FeaturedCampaign({
  title,
  description,
  image,
  progress,
  timeframe,
  location,
  target,
  link,
  fadeIn,
  staggerContainer,
}: FeaturedCampaignProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={staggerContainer}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
    >
      <motion.div
        variants={fadeIn}
        className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
      >
        <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
      </motion.div>

      <motion.div variants={fadeIn}>
        <h3 className="heading-3 mb-4">{title}</h3>
        <p className="paragraph mb-6">{description}</p>

        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Campaign Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{timeframe}</span>
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{location}</span>
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <Users className="mr-2 h-4 w-4" />
            <span>Target: {target}</span>
          </div>
        </div>

        {/* <Button asChild>
          <Link href={link}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button> */}
      </motion.div>
    </motion.div>
  );
}
