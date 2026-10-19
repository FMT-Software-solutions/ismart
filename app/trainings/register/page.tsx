import { redirect } from 'next/navigation';

// Registration happens per event; send visitors to the events listing.
export default function Page() {
  redirect('/events');
}
