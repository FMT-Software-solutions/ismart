'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Target, Users } from 'lucide-react';
import Link from 'next/link';

interface GetInvolvedCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
  fadeIn: any;
}

export function GetInvolvedCard({
  title,
  description,
  icon,
  link,
  fadeIn,
}: GetInvolvedCardProps) {
  // Map icon string to the corresponding Lucide icon component
  const IconComponent = () => {
    switch (icon) {
      case 'Users':
        return <Users className="h-10 w-10 text-primary" />;
      case 'Heart':
        return <Heart className="h-10 w-10 text-accent" />;
      case 'Target':
        return <Target className="h-10 w-10 text-secondary" />;
      default:
        return <Users className="h-10 w-10 text-primary" />;
    }
  };

  return (
    <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="card-hover">
      <Card className="h-full">
        <CardHeader>
          <div className="mb-4">
            <IconComponent />
          </div>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={link}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
