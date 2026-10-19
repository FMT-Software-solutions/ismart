import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'Videos | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="Videos"
      subheading="Watch recordings and highlights from iSMART events."
      title="Videos coming soon"
      description="Our video library will be published here soon."
      action={{ label: 'Back to Home', href: '/' }}
    />
  );
}
