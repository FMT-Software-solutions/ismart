import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ComingSoonNoticeProps {
  title?: string;
  description?: string;
  className?: string;
  action?: { label: string; href: string };
}

/**
 * Inline notice used in place of sections whose real content
 * has not been published yet.
 */
export function ComingSoonNotice({
  title = 'Coming soon',
  description = 'This content is being prepared and will be published soon. Please check back later.',
  className,
  action,
}: ComingSoonNoticeProps) {
  return (
    <div
      className={cn(
        'mx-auto max-w-2xl rounded-xl border border-dashed bg-muted/30 p-8 text-center',
        className
      )}
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Clock className="h-6 w-6 text-primary" />
      </div>
      <h3 className="heading-4 mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      {action && (
        <Button asChild variant="outline" className="mt-6">
          <Link href={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
}

interface ComingSoonPageProps extends ComingSoonNoticeProps {
  heading: string;
  subheading?: string;
}

/**
 * Full page placeholder: hero banner plus a coming soon notice.
 */
export function ComingSoonPage({
  heading,
  subheading,
  action = { label: 'Back to Home', href: '/' },
  ...notice
}: ComingSoonPageProps) {
  return (
    <div>
      <section className="relative">
        <div className="hero-gradient text-white">
          <div className="container-custom py-20">
            <div className="max-w-3xl">
              <h1 className="heading-1 mb-6">{heading}</h1>
              {subheading && (
                <p className="text-xl mb-8 text-white/90">{subheading}</p>
              )}
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
          <ComingSoonNotice action={action} {...notice} />
        </div>
      </section>
    </div>
  );
}
