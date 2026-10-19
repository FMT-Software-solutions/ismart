import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'Family Life & Parenting Research | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="Family Life & Parenting Research"
      subheading="Studying family dynamics, parenting practices, and their impact on family well-being."
      title="Research findings coming soon"
      description="Our work in this area will be published here soon. Please check back later."
      action={{ label: 'Back to Research', href: '/research' }}
    />
  );
}
