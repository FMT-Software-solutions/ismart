import Link from 'next/link';
import { ArrowRight, CalendarDays, MapPin, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Campaign } from '@/const/campaigns';

export function ActiveCampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="hero-gradient flex flex-col justify-between gap-8 p-8 text-white lg:col-span-2">
          <div>
            <span className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              {campaign.status}
            </span>
            <h3 className="text-2xl font-bold leading-tight md:text-3xl">
              {campaign.title}
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {campaign.highlights.slice(0, 2).map((item) => (
              <div key={item.label} className="rounded-lg bg-white/10 p-3">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 p-8 lg:col-span-3">
          <div className="flex items-start gap-3">
            <Megaphone className="mt-1 h-5 w-5 shrink-0 text-primary dark:text-blue-300" />
            <p className="leading-relaxed text-foreground/90">
              {campaign.summary}
            </p>
          </div>

          <ul className="flex list-none flex-wrap gap-2">
            {campaign.focus.map((topic) => (
              <li
                key={topic}
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium"
              >
                {topic}
              </li>
            ))}
          </ul>

          <dl className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0" />
              <dt className="sr-only">Period</dt>
              <dd>{campaign.period}</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <dt className="sr-only">Audience</dt>
              <dd>{campaign.audience}</dd>
            </div>
          </dl>

          <div className="mt-auto flex flex-wrap gap-3">
            <Button asChild>
              <Link href={`/campaigns/${campaign.slug}`}>
                Read the campaign <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Partner with us</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
