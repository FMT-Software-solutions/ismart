import type { DocHighlight, DocSection } from '@/components/document/types';
import * as sexualIntelligence from './sexual-intelligence';

export interface CampaignTier {
  title: string;
  ages: string;
  text: string;
}

export interface Campaign {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  status: string;
  period: string;
  audience: string;
  focus: string[];
  highlights: DocHighlight[];
  tiers?: CampaignTier[];
  sections: DocSection[];
}

// Active campaigns, newest first. Each campaign's full content lives in its
// own file; add a new file and an entry here to publish another campaign.
export const campaigns: Campaign[] = [
  {
    slug: 'sexual-intelligence-healthy-relationships',
    title: 'Sexual Intelligence and Healthy Relationships Campaign',
    tagline:
      'A schools and campus roadshow for age-appropriate sexual health education, risk-behaviour prevention and healthy relationships.',
    summary:
      'A school and campus-based roadshow delivering age-appropriate sexual health education, risky sexual behaviour prevention and healthy relationship formation to primary, secondary and tertiary learners across Ghana.',
    status: 'Seeking partners',
    period: '2026 / 2027 academic cycle',
    audience: 'Primary, secondary and tertiary institutions, Ghana',
    focus: [
      'Body literacy & boundaries',
      'Consent',
      'STI & HIV prevention',
      'Dating violence',
      'Digital safety',
    ],
    highlights: sexualIntelligence.highlights,
    tiers: sexualIntelligence.audienceTiers,
    sections: sexualIntelligence.sections,
  },
];

export const getCampaign = (slug: string) =>
  campaigns.find((campaign) => campaign.slug === slug);
