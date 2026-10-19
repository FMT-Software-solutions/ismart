'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComingSoonNotice } from '@/components/coming-soon';
import { Team } from '@/components/team/Team';
import { researchTeamMembers } from '@/components/team/team-data';
import { researchProgrammes } from '@/const/research';
import { researchProjects } from '@/const/research-projects';
import { cn } from '@/lib/utils';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ResearchPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="hero-gradient text-white">
          <div className="container-custom py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-3xl"
            >
              <motion.h1 variants={fadeIn} className="heading-1 mb-6">
                Research & Publications
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Exploring the complexities of sexuality, marriage, and family
                life through rigorous, culturally sensitive research.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-background"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        ></div>
      </section>
      {/* Research Focus Areas Section */}
      <section id="focus-areas" className="section-padding scroll-mt-20">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Our Research Focus Areas
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Our upcoming research work is organised into seven research
              programmes
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {researchProgrammes.map((programme, index) => (
              <motion.div
                key={programme.number}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className={cn(
                  'card-hover',
                  // Centre a lone card on the last row of the 3 column grid
                  index === researchProgrammes.length - 1 &&
                    researchProgrammes.length % 3 === 1 &&
                    'lg:col-start-2'
                )}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <programme.icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Research Programme {programme.number}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-snug">
                      {programme.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {programme.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Current Research Projects Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Current Research Projects
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Our ongoing investigations into sexuality, marriage, and family
              life
            </motion.p>
          </motion.div>
          {researchProjects.length > 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={staggerContainer}
              className="mx-auto max-w-5xl space-y-6"
            >
              {researchProjects.map((project) => (
                <motion.article
                  key={project.slug}
                  variants={fadeIn}
                  className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg md:p-8"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold">
                      {project.status}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Research Programme {project.programme}
                    </span>
                  </div>
                  <h3 className="heading-3 mb-1">{project.title}</h3>
                  <p className="mb-4 text-lg text-muted-foreground">
                    {project.subtitle}
                  </p>
                  <p className="mb-6 leading-relaxed">{project.summary}</p>
                  <dl className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                    {project.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          {fact.label}
                        </dt>
                        <dd className="text-sm font-medium">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <Button asChild>
                    <Link href={`/research/projects/${project.slug}`}>
                      Read the proposal <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <ComingSoonNotice
              title="Projects will be published soon"
              description="Details of our current research projects and publications are being prepared and will be shared here soon."
            />
          )}
        </div>
      </section>
      {/* Research Team Section */}
      <Team
        teamMembers={researchTeamMembers}
        title="Our Research Team"
        description="Meet the dedicated professionals behind iSMART's research efforts"
      />

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-6">
              Support Our Research
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Your contribution helps us continue our vital research on
              sexuality, marriage, and family life.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                asChild
              >
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
