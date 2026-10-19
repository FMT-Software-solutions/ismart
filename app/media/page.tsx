import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'Media | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="Media"
      subheading="Videos, pictures, and news from iSMART."
      title="Media coming soon"
      description="Our videos, picture gallery, and news will be published here soon."
      action={{ label: 'Back to Home', href: '/' }}
    />
  );
}
