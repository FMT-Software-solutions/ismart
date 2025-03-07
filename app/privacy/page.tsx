'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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

export default function PrivacyPage() {
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
                Privacy Policy
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                How we collect, use, and protect your personal information.
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

      {/* Privacy Policy Content */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                The Institute of Sexuality, Marriage and Family Life Research &
                Training (iSMART) is committed to protecting your privacy. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you visit our website,
                participate in our programs, or interact with us in any way.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree
                with the terms of this privacy policy, please do not access the
                site or provide us with your personal information.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We may collect information about you in a variety of ways. The
                information we may collect includes:
              </p>

              <h3>Personal Data</h3>
              <p>
                Personally identifiable information, such as your name, email
                address, telephone number, and demographic information that you
                voluntarily give to us when you register for events, sign up for
                our newsletter, or participate in our research studies. You are
                under no obligation to provide us with personal information of
                any kind, however, your refusal to do so may prevent you from
                using certain features of the site or participating in certain
                programs.
              </p>

              <h3>Derivative Data</h3>
              <p>
                Information our servers automatically collect when you access
                the site, such as your IP address, browser type, operating
                system, access times, and the pages you have viewed directly
                before and after accessing the site.
              </p>

              <h3>Financial Data</h3>
              <p>
                Financial information, such as data related to your payment
                method (e.g., valid credit card number, card brand, expiration
                date) that we may collect when you purchase, order, return,
                exchange, or request information about our services. We store
                only very limited, if any, financial information that we
                collect. Otherwise, all financial information is stored by our
                payment processor and you are encouraged to review their privacy
                policy and contact them directly for responses to your
                questions.
              </p>

              <h2>Use of Your Information</h2>
              <p>
                Having accurate information about you permits us to provide you
                with a smooth, efficient, and customized experience.
                Specifically, we may use information collected about you via the
                site to:
              </p>
              <ul>
                <li>Create and manage your account</li>
                <li>Process your donations and transactions</li>
                <li>Email you regarding your account or order</li>
                <li>Send you a newsletter</li>
                <li>
                  Fulfill and manage purchases, orders, payments, and other
                  transactions related to the site
                </li>
                <li>Administer sweepstakes, promotions, and contests</li>
                <li>
                  Compile anonymous statistical data and analysis for use
                  internally or with third parties
                </li>
                <li>
                  Deliver targeted advertising, newsletters, and other
                  information regarding promotions and the site to you
                </li>
                <li>Enable user-to-user communications</li>
                <li>Increase the efficiency and operation of the site</li>
                <li>
                  Monitor and analyze usage and trends to improve your
                  experience with the site
                </li>
                <li>Notify you of updates to the site</li>
                <li>
                  Offer new products, services, and/or recommendations to you
                </li>
                <li>Perform other business activities as needed</li>
                <li>
                  Prevent fraudulent transactions, monitor against theft, and
                  protect against criminal activity
                </li>
                <li>Process payments and refunds</li>
                <li>
                  Request feedback and contact you about your use of the site
                </li>
                <li>Resolve disputes and troubleshoot problems</li>
                <li>Respond to product and customer service requests</li>
                <li>Send you a newsletter</li>
                <li>Solicit support for the site</li>
              </ul>

              <h2>Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain
                situations. Your information may be disclosed as follows:
              </p>

              <h3>By Law or to Protect Rights</h3>
              <p>
                If we believe the release of information about you is necessary
                to respond to legal process, to investigate or remedy potential
                violations of our policies, or to protect the rights, property,
                and safety of others, we may share your information as permitted
                or required by any applicable law, rule, or regulation. This
                includes exchanging information with other entities for fraud
                protection and credit risk reduction.
              </p>

              <h3>Third-Party Service Providers</h3>
              <p>
                We may share your information with third parties that perform
                services for us or on our behalf, including payment processing,
                data analysis, email delivery, hosting services, customer
                service, and marketing assistance.
              </p>

              <h3>Marketing Communications</h3>
              <p>
                With your consent, or with an opportunity for you to withdraw
                consent, we may share your information with third parties for
                marketing purposes, as permitted by law.
              </p>

              <h3>Interactions with Other Users</h3>
              <p>
                If you interact with other users of the site, those users may
                see your name, profile photo, and descriptions of your activity,
                including sending invitations to other users, chatting with
                other users, liking posts, following blogs.
              </p>

              <h3>Online Postings</h3>
              <p>
                When you post comments, contributions or other content to the
                site, your posts may be viewed by all users and may be publicly
                distributed outside the site in perpetuity.
              </p>

              <h3>Third-Party Advertisers</h3>
              <p>
                We may use third-party advertising companies to serve ads when
                you visit the site. These companies may use information about
                your visits to the site and other websites that are contained in
                web cookies in order to provide advertisements about goods and
                services of interest to you.
              </p>

              <h3>Affiliates</h3>
              <p>
                We may share your information with our affiliates, in which case
                we will require those affiliates to honor this privacy policy.
                Affiliates include our parent company and any subsidiaries,
                joint venture partners or other companies that we control or
                that are under common control with us.
              </p>

              <h3>Business Partners</h3>
              <p>
                We may share your information with our business partners to
                offer you certain products, services or promotions.
              </p>

              <h3>Other Third Parties</h3>
              <p>
                We may share your information with advertisers and investors for
                the purpose of conducting general business analysis. We may also
                share your information with such third parties for marketing
                purposes, as permitted by law.
              </p>

              <h3>Sale or Bankruptcy</h3>
              <p>
                If we reorganize or sell all or a portion of our assets, undergo
                a merger, or are acquired by another entity, we may transfer
                your information to the successor entity. If we go out of
                business or enter bankruptcy, your information would be an asset
                transferred or acquired by a third party. You acknowledge that
                such transfers may occur and that the transferee may decline
                honor commitments we made in this privacy policy.
              </p>
              <p>
                We are not responsible for the actions of third parties with
                whom you share personal or sensitive data, and we have no
                authority to manage or control third-party solicitations. If you
                no longer wish to receive correspondence, emails or other
                communications from third parties, you are responsible for
                contacting the third party directly.
              </p>

              <h2>Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures
                to help protect your personal information. While we have taken
                reasonable steps to secure the personal information you provide
                to us, please be aware that despite our efforts, no security
                measures are perfect or impenetrable, and no method of data
                transmission can be guaranteed against any interception or other
                type of misuse. Any information disclosed online is vulnerable
                to interception and misuse by unauthorized parties. Therefore,
                we cannot guarantee complete security if you provide personal
                information.
              </p>

              <h2>Policy for Children</h2>
              <p>
                We do not knowingly solicit information from or market to
                children under the age of 13. If you become aware of any data we
                have collected from children under age 13, please contact us
                using the contact information provided below.
              </p>

              <h2>Controls for Do-Not-Track Features</h2>
              <p>
                Most web browsers and some mobile operating systems include a
                Do-Not-Track ("DNT") feature or setting you can activate to
                signal your privacy preference not to have data about your
                online browsing activities monitored and collected. No uniform
                technology standard for recognizing and implementing DNT signals
                has been finalized. As such, we do not currently respond to DNT
                browser signals or any other mechanism that automatically
                communicates your choice not to be tracked online. If a standard
                for online tracking is adopted that we must follow in the
                future, we will inform you about that practice in a revised
                version of this privacy policy.
              </p>

              <h2>Options Regarding Your Information</h2>
              <p>
                You may at any time review or change the information in your
                account or terminate your account by:
              </p>
              <ul>
                <li>
                  Logging into your account settings and updating your account
                </li>
                <li>
                  Contacting us using the contact information provided below
                </li>
              </ul>
              <p>
                Upon your request to terminate your account, we will deactivate
                or delete your account and information from our active
                databases. However, some information may be retained in our
                files to prevent fraud, troubleshoot problems, assist with any
                investigations, enforce our Terms of Use and/or comply with
                legal requirements.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have questions or comments about this Privacy Policy,
                please contact us at:
              </p>
              <p>
                Institute of Sexuality, Marriage and Family Life Research &
                Training (iSMART)
                <br />
                Email: ismflrt.official@gmail.com
                <br />
                Phone: +233 271 467 767
                <br />
                Address: Accra, Ghana
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
              Have Questions?
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              If you have any questions about our privacy practices or this
              policy, please contact us.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                asChild
              >
                <Link href="/terms">Terms of Service</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
