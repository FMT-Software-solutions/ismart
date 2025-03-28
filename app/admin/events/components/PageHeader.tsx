import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">Events Management</h1>
        <p className="text-gray-500">
          Create and manage events with customizable registration forms
        </p>
      </div>
      <Link href="/admin/events/create">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </Link>
    </div>
  );
}
