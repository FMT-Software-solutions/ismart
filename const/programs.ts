import { BookOpen, Heart, Users, type LucideIcon } from 'lucide-react';

export interface ProgramArea {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
}

// Core program areas shared by the home page and the Programs page.
// Detailed course listings are pending content (see PENDING_CONTENT.md).
export const programAreas: ProgramArea[] = [
  {
    title: 'Sexuality Studies',
    description:
      'Comprehensive research and education on human sexuality from a holistic perspective.',
    icon: BookOpen,
    iconClassName: 'text-primary',
  },
  {
    title: 'Marriage & Relationships',
    description:
      'Building stronger, healthier relationships through evidence-based approaches.',
    icon: Heart,
    iconClassName: 'text-accent',
  },
  {
    title: 'Family Life & Parenting',
    description:
      'Supporting families with research-backed strategies for nurturing the next generation.',
    icon: Users,
    iconClassName: 'text-secondary',
  },
];
