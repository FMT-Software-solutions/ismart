import {
  Brain,
  Church,
  Globe2,
  HeartHandshake,
  HeartPulse,
  MessagesSquare,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface ResearchProgramme {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

// iSMART research programmes (upcoming research work)
export const researchProgrammes: ResearchProgramme[] = [
  {
    number: 1,
    title: 'Sexuality, Sexual Health & Sexual Culture',
    description:
      'Examining sexual knowledge, attitudes, behaviours and health outcomes, and the social and cultural norms that shape how sexuality is understood and lived.',
    icon: HeartPulse,
  },
  {
    number: 2,
    title: 'Marriage, Couple Relationships & Intimacy',
    description:
      'Investigating what helps marriages and couple relationships thrive, from communication and conflict to emotional and sexual intimacy.',
    icon: HeartHandshake,
  },
  {
    number: 3,
    title: 'Family Life, Parenting & Intergenerational Relationships',
    description:
      'Studying family dynamics, parenting practices and the relationships between generations, and their impact on child development and family wellbeing.',
    icon: Users,
  },
  {
    number: 4,
    title: 'Religion, Theology & Sexuality',
    description:
      'Exploring how faith, religious teaching and theological reflection inform beliefs and practices around sexuality, marriage and family life.',
    icon: Church,
  },
  {
    number: 5,
    title: 'Sexuality, Mental Health & Wellbeing',
    description:
      'Understanding the links between sexuality, mental health and overall wellbeing, including the effects of stress, trauma and stigma.',
    icon: Brain,
  },
  {
    number: 6,
    title: 'Sex Therapy, Counselling & Psychosexual Practice',
    description:
      'Building the evidence base for effective sex therapy, counselling and psychosexual interventions, and strengthening professional practice.',
    icon: MessagesSquare,
  },
  {
    number: 7,
    title: 'Sexuality in Ghanaian and African Cultural Contexts',
    description:
      'Researching sexuality through the lens of Ghanaian and wider African traditions, values and lived experience to produce culturally grounded knowledge.',
    icon: Globe2,
  },
];
