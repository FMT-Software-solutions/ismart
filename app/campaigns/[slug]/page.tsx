import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  Handshake,
  MapPin,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentBody } from '@/components/document/DocumentBody';
import { campaigns, getCampaign } from '@/const/campaigns';

export function generateStaticParams() {
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const campaign = getCampaign((await params).slug);
  if (!campaign) return {};
  return {
    title: `${campaign.title} | iSMART`,
    description: campaign.summary,
  };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const campaign = getCampaign((await params).slug);
  if (!campaign) notFound();

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="hero-gradient text-white">
          <div className="container-custom pt-10 pb-24">
            <Link
              href="/campaigns"
              className="mb-8 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              All campaigns
            </Link>
            <div className="max-w-3xl">
              <span className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                {campaign.status}
              </span>
              <h1 className="heading-1 mb-6">{campaign.title}</h1>
              <p className="text-xl text-white/90">{campaign.tagline}</p>
              <dl className="mt-8 grid gap-3 text-sm text-white/90 sm:grid-cols-2">
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
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-background"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        ></div>
      </section>

      {/* Key figures */}
      <section className="container-custom -mt-4 mb-16">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {campaign.highlights.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <p className="text-3xl font-bold text-primary dark:text-blue-300">
                {item.value}
              </p>
              <p className="mt-1 text-sm text-foreground/80">{item.label}</p>
              {item.source && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.source}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Who it reaches */}
      {campaign.tiers && (
        <section className="bg-muted/30 py-16">
          <div className="container-custom">
            <h2 className="heading-2 mb-2 text-center">
              Who the roadshow reaches
            </h2>
            <p className="paragraph mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
              Three tiers, each with its own age-appropriate content and
              delivery format.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {campaign.tiers.map((tier) => (
                <div
                  key={tier.title}
                  className="rounded-xl border bg-card p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <Users className="h-6 w-6 text-primary dark:text-blue-300" />
                    <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold">
                      {tier.ages}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{tier.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {tier.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full concept note */}
      <section className="section-padding">
        <div className="container-custom">
          <DocumentBody sections={campaign.sections} />
        </div>
      </section>

      {/* Call to action */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <Handshake className="mx-auto mb-4 h-10 w-10" />
          <h2 className="heading-2 mb-4">Partner with us</h2>
          <p className="paragraph mx-auto mb-8 max-w-2xl text-primary-foreground/90">
            Together, we can help keep girls in school, help young men and women
            build respectful and safe relationships, and protect a generation
            from preventable pregnancy, infection and violence. We warmly invite
            your organisation to partner with iSMART in delivering this
            campaign.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Discuss a partnership</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20"
              asChild
            >
              <Link href="/donate">Support the campaign</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
