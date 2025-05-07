import { Metadata } from 'next';
import DonatePageClient from './DonatePageClient';

export const metadata: Metadata = {
  title: 'Donate | iSMART NGO',
  description:
    'Support our mission with a donation. Your contribution helps us continue our work in research, education, and advocacy.',
};

export default function DonatePage() {
  return <DonatePageClient />;
}
