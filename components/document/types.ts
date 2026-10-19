// Content model for long-form documents (campaign concept notes, research
// proposals) rendered as web pages. New documents are added as data files.

export type DocBlock =
  | { type: 'paragraph'; text: string }
  | {
      type: 'list';
      ordered?: boolean;
      items: { title?: string; text: string }[];
    }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'source'; text: string }
  | { type: 'callout'; title?: string; text: string }
  | { type: 'table'; head: string[]; rows: string[][] }
  | { type: 'steps'; items: { title: string; text: string }[] };

export interface DocSection {
  id: string;
  title: string;
  blocks: DocBlock[];
  subsections?: DocSection[];
}

export interface DocHighlight {
  value: string;
  label: string;
  source?: string;
}
