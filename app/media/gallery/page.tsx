import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'Picture Gallery | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="Picture Gallery"
      subheading="Moments from iSMART trainings, events, and campaigns."
      title="Gallery coming soon"
      description="Our picture gallery will be published here soon."
      action={{ label: 'Back to Home', href: '/' }}
    />
  );
}
