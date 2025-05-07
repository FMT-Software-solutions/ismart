'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CampaignCardProps {
  title: string;
  description: string;
  progress: number;
  timeframe: string;
  image: string;
  fadeIn: any;
}

export function CampaignCard({
  title,
  description,
  progress,
  timeframe,
  image,
  fadeIn,
}: CampaignCardProps) {
  return (
    <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="card-hover">
      <Card className="overflow-hidden h-full">
        <div className="relative h-48">
          <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
        </div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{description}</p>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <Clock className="mr-2 h-4 w-4" />
            <span>{timeframe}</span>
          </div>
        </CardContent>
        <CardFooter>
          {/* <Button variant="outline" className="w-full" asChild>
            <Link
              href={`/campaigns/${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              View Details
            </Link>
          </Button> */}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
