import { redirect } from 'next/navigation';

// Training content now lives on the Programs page.
export default function Page() {
  redirect('/programs');
}
