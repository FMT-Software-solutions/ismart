import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DocumentBody } from '@/components/document/DocumentBody';
import {
  getResearchProject,
  researchProjects,
} from '@/const/research-projects';
import { researchProgrammes } from '@/const/research';

export function generateStaticParams() {
  return researchProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getResearchProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} | iSMART Research`,
    description: project.summary,
  };
}

export default async function ResearchProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getResearchProject((await params).slug);
  if (!project) notFound();

  const programme = researchProgrammes.find(
    (item) => item.number === project.programme
  );

  return (
    <div>
      <section className="relative">
        <div className="hero-gradient text-white">
          <div className="container-custom pt-10 pb-24">
            <Link
              href="/research"
              className="mb-8 inline-flex items-center gap-1 text-sm text-white/80 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Research
            </Link>
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  {project.status}
                </span>
                {programme && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs">
                    Research Programme {programme.number}: {programme.title}
                  </span>
                )}
              </div>
              <h1 className="heading-1 mb-6">{project.title}</h1>
              <p className="text-xl text-white/90">{project.subtitle}</p>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-background"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        ></div>
      </section>

      {/* At a glance */}
      <section className="container-custom -mt-4 mb-16">
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {project.facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {fact.label}
              </dt>
              <dd className="mt-1 font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section-padding pt-0">
        <div className="container-custom">
          <DocumentBody sections={project.sections} />
        </div>
      </section>

      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom text-center">
          <FlaskConical className="mx-auto mb-4 h-10 w-10" />
          <h2 className="heading-2 mb-4">Support this research</h2>
          <p className="paragraph mx-auto mb-8 max-w-2xl text-primary-foreground/90">
            Interested in collaborating, funding, or learning more about this
            study? We would love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20"
              asChild
            >
              <Link href="/donate">Fund our research</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
