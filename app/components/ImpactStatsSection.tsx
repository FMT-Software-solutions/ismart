'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useInView } from 'framer-motion';
import {
  BookOpen,
  Globe2,
  GraduationCap,
  MapPin,
  Presentation,
  type LucideIcon,
} from 'lucide-react';
import {
  continentsReached,
  countriesReached,
  getFlagUrl,
  type SiteStats,
} from '@/const/site-stats';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  suffix?: string;
}

export function ImpactStatsSection({ stats }: { stats: SiteStats }) {
  const items: StatItem[] = [
    {
      label: 'Students Enrolled',
      value: stats.studentsEnrolled,
      icon: GraduationCap,
      suffix: '+',
    },
    { label: 'Courses Offered', value: stats.coursesOffered, icon: BookOpen },
    {
      label: 'Trainings & Webinars',
      value: stats.trainingsAndWebinars,
      icon: Presentation,
      suffix: '+',
    },
    { label: 'Countries', value: stats.countries, icon: MapPin },
    { label: 'Continents', value: stats.continents, icon: Globe2 },
  ];

  return (
    <section className="section-padding hero-gradient text-white">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.h2 variants={fadeIn} className="heading-2 mb-4">
            Our Impact
          </motion.h2>
          <motion.p variants={fadeIn} className="paragraph text-white/90">
            Equipping individuals, couples, families, and professionals across
            the globe.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              variants={fadeIn}
              className={`rounded-xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm ${
                index === items.length - 1 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <item.icon className="mx-auto mb-3 h-8 w-8 text-white/80" />
              <p className="text-3xl md:text-4xl font-bold">
                <CountUp value={item.value} />
                {item.suffix && item.value > 0 ? item.suffix : ''}
              </p>
              <p className="mt-1 text-sm text-white/80">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.div
            variants={fadeIn}
            className="lg:col-span-2 rounded-xl border border-white/20 bg-white/5 p-6"
          >
            <h3 className="mb-4 font-semibold text-white/90">
              Countries we have reached
            </h3>
            <ul className="flex list-none flex-wrap gap-2">
              {countriesReached.map((country) => (
                <li
                  key={country.code}
                  className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm"
                >
                  <Image
                    src={getFlagUrl(country.code)}
                    alt=""
                    width={20}
                    height={15}
                    className="h-[15px] w-5 rounded-sm object-cover"
                  />
                  {country.name}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            variants={fadeIn}
            className="rounded-xl border border-white/20 bg-white/5 p-6"
          >
            <h3 className="mb-4 font-semibold text-white/90">Continents</h3>
            <ul className="flex list-none flex-wrap gap-2">
              {continentsReached.map((continent) => (
                <li
                  key={continent}
                  className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-sm"
                >
                  <Globe2 className="h-4 w-4" aria-hidden />
                  {continent}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
