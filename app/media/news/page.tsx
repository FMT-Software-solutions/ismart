import { ComingSoonPage } from '@/components/coming-soon';

export const metadata = {
  title: 'News | iSMART',
};

export default function Page() {
  return (
    <ComingSoonPage
      heading="News"
      subheading="The latest updates and announcements from iSMART."
      title="News coming soon"
      description="News and announcements will be published here soon."
      action={{ label: 'Back to Home', href: '/' }}
    />
  );
}
