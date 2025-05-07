'use client';

import { HeroSection } from './components/HeroSection';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { MissionVision } from './components/MissionVision';
import { Pillars } from './components/Pillars';
import { Team } from '../../components/team/Team';
import { PolicyPositions } from './components/PolicyPositions';
import { CTASection } from './components/CTASection';
import { teamMembers } from '@/components/team/team-data';

export default function AboutPage() {
  return (
    <div>
      <HeroSection />
      <ExecutiveSummary />
      <MissionVision />
      <Pillars />
      <Team
        title="Our Team"
        description="Meet the dedicated professionals behind iSMART"
        teamMembers={teamMembers}
      />
      <PolicyPositions />
      <CTASection />
    </div>
  );
}
