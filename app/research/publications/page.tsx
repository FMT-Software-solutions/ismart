import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'Publications | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="Publications"
      subheading="Journal articles, reports, and policy briefs from the iSMART research team."
      title="Publications will be available soon"
      description="We are preparing our publications for release. They will be listed here once published."
      action={{ label: 'Back to Research', href: '/research' }}
    />
  );
}
