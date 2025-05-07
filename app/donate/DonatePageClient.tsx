'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { BookOpen, Check, Heart, Users } from 'lucide-react';
import Image from 'next/image';
import { DonationForm } from './DonationForm';

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

export default function DonatePageClient() {
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
                Support Our Mission
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Your donation helps us continue our vital work in research,
                education, and advocacy for healthy sexuality, strong marriages,
                and thriving families.
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

      {/* Donation Impact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Your Impact
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Here's how your donation makes a difference in our work
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Research',
                description:
                  'Fund groundbreaking research on sexuality, marriage, and family life that informs policy and practice.',
                icon: <BookOpen className="h-10 w-10 text-primary" />,
                amount: 'GHS 500',
                impact: 'Supports 10 hours of research work',
              },
              {
                title: 'Education',
                description:
                  'Support training programs that equip individuals and couples with knowledge and skills for healthy relationships.',
                icon: <Users className="h-10 w-10 text-secondary" />,
                amount: 'GHS 1,000',
                impact: 'Provides scholarships for 5 participants',
              },
              {
                title: 'Community Outreach',
                description:
                  'Help us reach underserved communities with vital information and resources.',
                icon: <Heart className="h-10 w-10 text-accent" />,
                amount: 'GHS 2,500',
                impact: 'Funds a community workshop for 50 people',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card>
                  <CardHeader>
                    <div className="mb-4">{item.icon}</div>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="font-medium">{item.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.impact}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section id="donation-form" className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeIn}>
              <h2 className="heading-2 mb-6">Make a Donation</h2>
              <p className="paragraph mb-8">
                Your support enables us to continue our mission of transforming
                lives through research, education, and advocacy.
              </p>

              <div className="bg-primary/10 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-accent" /> Why Your
                  Support Matters
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start list-none">
                    <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                    <span>
                      Fund critical research on sexuality, marriage, and family
                      life
                    </span>
                  </li>
                  <li className="flex items-start list-none">
                    <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                    <span>
                      Support educational programs for individuals, couples, and
                      families
                    </span>
                  </li>
                  <li className="flex items-start list-none">
                    <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                    <span>
                      Help us advocate for policies that strengthen families
                    </span>
                  </li>
                  <li className="flex items-start list-none">
                    <Check className="mr-2 h-5 w-5 text-primary mt-1" />
                    <span>Extend our reach to underserved communities</span>
                  </li>
                </ul>
              </div>

              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="Community impact"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </motion.div>

            <motion.div variants={fadeIn}>
              <DonationForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Other Ways to Support Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Other Ways to Support
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Beyond financial contributions, there are many ways to support our
              mission
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} className="text-center">
              <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Volunteer</h3>
              <p className="text-muted-foreground mb-4">
                Share your time and talents to support our programs and events.
              </p>
              <Button variant="outline" asChild>
                <a href="/contact">Learn More</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center">
              <div className="bg-secondary/10 rounded-full p-6 inline-flex mb-4">
                <BookOpen className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Partner With Us</h3>
              <p className="text-muted-foreground mb-4">
                Explore organizational partnerships and collaborative
                opportunities.
              </p>
              <Button variant="outline" asChild>
                <a href="/contact">Contact Us</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center">
              <div className="bg-accent/10 rounded-full p-6 inline-flex mb-4">
                <Heart className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Spread the Word</h3>
              <p className="text-muted-foreground mb-4">
                Share our mission with your network and help us reach more
                people.
              </p>
              <Button variant="outline" asChild>
                <a href="/media">Share Resources</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Common questions about donations and support
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="receipt">Receipt Information</TabsTrigger>
                <TabsTrigger value="other">Other Ways to Give</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">
                    How is my donation used?
                  </h3>
                  <p className="text-muted-foreground">
                    Your donation supports our research initiatives, educational
                    programs, advocacy efforts, and operational costs. We strive
                    to maximize the impact of every donation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Can I make a recurring donation?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, you can set up monthly, quarterly, or annual recurring
                    donations. This provides us with sustainable support for our
                    ongoing programs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Is there a minimum donation amount?
                  </h3>
                  <p className="text-muted-foreground">
                    No, we appreciate donations of any size. Every contribution
                    helps us advance our mission.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="receipt" className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">
                    Will I receive a receipt for my donation?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, you will receive an official receipt for your donation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    How do I get a copy of your annual report?
                  </h3>
                  <p className="text-muted-foreground">
                    Our annual reports are available on our website or by
                    request. They provide detailed information about our
                    programs, impact, and financial stewardship.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="other" className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">
                    Can I donate in memory or honor of someone?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, you can make a tribute gift in memory or honor of
                    someone special. We can send a notification of your gift to
                    the person you designate.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Do you accept in-kind donations?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, we accept in-kind donations that support our programs
                    and operations. Please contact us to discuss your potential
                    donation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Can my company match my donation?
                  </h3>
                  <p className="text-muted-foreground">
                    Many companies offer matching gift programs that can double
                    or even triple your donation. Check with your employer's HR
                    department to see if they offer this benefit.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">
              Donor Stories
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Hear from those who support our mission
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={fadeIn}
              className="bg-muted/30 p-8 rounded-lg"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Donor"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Grace Amoah</h3>
                  <p className="text-sm text-muted-foreground">Monthly Donor</p>
                </div>
              </div>
              <p className="italic">
                "Supporting iSMART has been incredibly rewarding. Their work in
                strengthening marriages has had a direct impact on my community,
                and I'm proud to be a part of their mission."
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn}
              className="bg-muted/30 p-8 rounded-lg"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Donor"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold">Kwame Asante</h3>
                  <p className="text-sm text-muted-foreground">
                    Corporate Partner
                  </p>
                </div>
              </div>
              <p className="italic">
                "As a business leader, I believe in investing in organizations
                that make a real difference. iSMART's research and education
                programs are transforming lives and strengthening families
                across Ghana."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
              Ready to Make a Difference?
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Your support today helps build stronger families and communities
              for tomorrow.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <a href="#donation-form">Donate Now</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                asChild
              >
                <a href="/contact">Contact Us</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
