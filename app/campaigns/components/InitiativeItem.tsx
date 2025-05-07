'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Badge {
  text: string;
  className: string;
}

interface InitiativeItemProps {
  title: string;
  description: string;
  image: string;
  badges: Badge[];
  achievements: string[];
}

export function InitiativeItem({
  title,
  description,
  image,
  badges,
  achievements,
}: InitiativeItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="relative w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
        <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="md:w-2/3">
        <h3 className="heading-4 mb-2">{title}</h3>
        <p className="paragraph mb-4">{description}</p>
        <div className="flex flex-wrap gap-4 mb-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className={`${badge.className} text-sm py-1 px-3 rounded-full`}
            >
              {badge.text}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {achievements.map((achievement, idx) => (
            <div key={idx} className="flex items-start">
              <Check className="mr-2 h-5 w-5 text-primary mt-1" />
              <span>{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
