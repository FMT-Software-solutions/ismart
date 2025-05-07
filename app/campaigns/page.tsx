'use client';

import { motion } from 'framer-motion';
import {
  currentCampaigns,
  featuredCampaign,
  involvementOptions,
  pastInitiatives,
  testimonials,
} from './data';
import { HeroSection } from './components/HeroSection';
import { FeaturedCampaign } from './components/FeaturedCampaign';
import { CurrentCampaigns } from './components/CurrentCampaigns';
import { InitiativeTabs } from './components/InitiativeTabs';
import { GetInvolved } from './components/GetInvolved';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';

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

export default function CampaignsPage() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Campaigns & Advocacy"
        description="Join us in our mission to transform society's understanding and practice of sexuality, marriage, and family life through our advocacy initiatives and campaigns."
        fadeIn={fadeIn}
        staggerContainer={staggerContainer}
      />

      {/* Current Campaigns Section */}
      <section id="current" className="section-padding">
        <div className="container-custom">
          {/* Featured Campaign */}
          <FeaturedCampaign
            title={featuredCampaign.title}
            description={featuredCampaign.description}
            image={featuredCampaign.image}
            progress={featuredCampaign.progress}
            timeframe={featuredCampaign.timeframe}
            location={featuredCampaign.location}
            target={featuredCampaign.target}
            link={featuredCampaign.link}
            fadeIn={fadeIn}
            staggerContainer={staggerContainer}
          />

          {/* Other Current Campaigns */}
          <CurrentCampaigns
            title="Current Campaigns"
            description="Our ongoing initiatives to create positive change in society"
            campaigns={currentCampaigns}
            fadeIn={fadeIn}
            staggerContainer={staggerContainer}
          />
        </div>
      </section>

      {/* Past Initiatives Section */}
      <section id="past" className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Past Initiatives
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Successful campaigns that have made a lasting impact
            </motion.p>
          </motion.div>

          <InitiativeTabs
            initiatives={pastInitiatives}
            fadeIn={fadeIn}
            staggerContainer={staggerContainer}
          />
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="involved" className="section-padding">
        <div className="container-custom">
          <GetInvolved
            title="Get Involved"
            description="Join us in our mission to transform society's understanding and practice of sexuality, marriage, and family life"
            options={involvementOptions}
            fadeIn={fadeIn}
            staggerContainer={staggerContainer}
          />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <Testimonials
            title="Impact Stories"
            description="Hear from those who have been impacted by our campaigns"
            testimonials={testimonials}
            fadeIn={fadeIn}
            staggerContainer={staggerContainer}
          />
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        title="Join Our Advocacy Network"
        description="Stay informed about our campaigns and advocacy efforts, and learn how you can get involved in creating positive change."
        primaryButtonText="Join Now"
        primaryButtonLink="/contact"
        secondaryButtonText="Support Our Work"
        secondaryButtonLink="/donate"
        fadeIn={fadeIn}
        staggerContainer={staggerContainer}
      />
    </div>
  );
}
