'use client';

import { HeroSection } from './components/HeroSection';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { MissionVision } from './components/MissionVision';
import { Pillars } from './components/Pillars';
import { Team } from './components/Team';
import { PolicyPositions } from './components/PolicyPositions';
import { CTASection } from './components/CTASection';

export default function AboutPage() {
  return (
    <div>
      <HeroSection />
      <ExecutiveSummary />
      <MissionVision />
      <Pillars />
      <Team />
      <PolicyPositions />
      <CTASection />
    </div>
  );
}
