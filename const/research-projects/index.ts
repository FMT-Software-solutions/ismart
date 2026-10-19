import type { DocSection } from '@/components/document/types';
import * as genZSexuality from './gen-z-sexuality';

export interface ResearchProject {
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  status: string;
  /** Number of the related programme in const/research.ts */
  programme: number;
  facts: { label: string; value: string }[];
  sections: DocSection[];
}

// Current research projects. Each project's full content lives in its own
// file; add a new file and an entry here to publish another project.
export const researchProjects: ResearchProject[] = [
  {
    slug: 'sexual-mind-of-generation-z',
    title: 'The Sexual Mind of Generation Z',
    subtitle:
      'A qualitative exploration of sexual beliefs, values, meanings, and decision-making',
    summary:
      'How do Gen Z university students understand sexuality, where do their beliefs and values come from, and how do these shape the decisions they make? This study is the first to examine all four together, through in-depth interviews with undergraduates at the University of Cape Coast.',
    status: 'Proposal stage',
    programme: 1,
    facts: [
      { label: 'Design', value: 'Qualitative, in-depth interviews' },
      { label: 'Site', value: 'University of Cape Coast, Ghana' },
      { label: 'Participants', value: '25–35 students aged 18–27' },
      { label: 'Duration', value: '9 months' },
    ],
    sections: genZSexuality.sections,
  },
];

export const getResearchProject = (slug: string) =>
  researchProjects.find((project) => project.slug === slug);
