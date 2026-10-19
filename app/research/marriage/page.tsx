import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'Dating & Marriage Research | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="Dating & Marriage Research"
      subheading="Investigating relationship dynamics, marriage patterns, and what makes relationships thrive."
      title="Research findings coming soon"
      description="Our work in this area will be published here soon. Please check back later."
      action={{ label: 'Back to Research', href: '/research' }}
    />
  );
}
