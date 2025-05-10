import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* SVG illustration that works with both light/dark mode */}
        <div className="flex justify-center mb-8">
          <svg
            className="w-32 h-32 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15h8" />
            <path d="M9 9h.01" />
            <path d="M15 9h.01" />
          </svg>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-base font-semibold text-primary">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved, deleted, or never existed.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
