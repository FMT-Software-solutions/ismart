import { getUpcomingEvents } from '@/app/admin/events/services/events-data';
import { UpcomingEventsSection } from '@/app/components/UpcomingEventsSection';
import { ComingSoonNotice } from '@/components/coming-soon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { programAreas } from '@/const/programs';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Programs | iSMART',
  description:
    'Training and education programs in sexuality, marriage, and family life.',
};

export default async function ProgramsPage() {
  const { events } = await getUpcomingEvents(3);

  return (
    <div>
      <section className="relative">
        <div className="hero-gradient text-white">
          <div className="container-custom py-20">
            <div className="max-w-3xl">
              <h1 className="heading-1 mb-6">Training and Education</h1>
              <p className="text-xl mb-8 text-white/90">
                Accredited professional programs, trainings, and webinars on
                sexuality, marriage, and family life.
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-background"
          style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }}
        ></div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="heading-2 mb-4">Our Programs</h2>
            <p className="paragraph text-muted-foreground">
              Every program is grounded in rigorous, culturally relevant
              research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {programAreas.map((program) => (
              <Card key={program.title} className="h-full">
                <CardHeader>
                  <program.icon
                    className={`mb-4 h-10 w-10 ${program.iconClassName}`}
                  />
                  <CardTitle>{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{program.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <ComingSoonNotice
            title="Full course catalogue coming soon"
            description="Detailed course outlines, durations, and certification paths for each program will be published here soon. In the meantime, browse our upcoming trainings and events."
            action={{ label: 'Browse Events', href: '/events' }}
          />
        </div>
      </section>

      <div className="bg-muted/30">
        <UpcomingEventsSection events={events} />
      </div>
    </div>
  );
}
