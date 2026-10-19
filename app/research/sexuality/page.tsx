import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'Sex & Sexuality Research | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="Sex & Sexuality Research"
      subheading="Exploring human sexuality through biological, psychological, social, and cultural lenses."
      title="Research findings coming soon"
      description="Our work in this area will be published here soon. Please check back later."
      action={{ label: 'Back to Research', href: '/research' }}
    />
  );
}
