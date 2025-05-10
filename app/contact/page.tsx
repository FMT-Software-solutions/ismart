'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '@/components/icons';

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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' }),
  department: z.string().optional(),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      department: '',
    },
  });

  const onSubmit = (data: z.infer<typeof contactFormSchema>) => {
    toast({
      title: 'Message Sent',
      description:
        "Thank you for contacting us. We'll respond to your inquiry as soon as possible.",
    });
    form.reset();
  };

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
                Contact Us
              </motion.h1>
              <motion.p
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                We'd love to hear from you. Reach out with questions,
                partnership inquiries, or to learn more about our work.
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

      {/* Contact Information Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <motion.div variants={fadeIn} className="text-center">
              <div className="bg-primary/10 rounded-full p-6 inline-flex mb-4">
                <Mail className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">
                <a
                  href="mailto:ismflrt.official@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  ismflrt.official@gmail.com
                </a>
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center">
              <div className="bg-secondary/10 rounded-full p-6 inline-flex mb-4">
                <Phone className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">
                <a
                  href="tel:+233271467767"
                  className="hover:text-secondary transition-colors"
                >
                  +233 271 467 767
                </a>
              </p>
            </motion.div>

            <motion.div variants={fadeIn} className="text-center">
              <div className="bg-accent/10 rounded-full p-6 inline-flex mb-4">
                <MapPin className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-muted-foreground">Accra, Ghana</p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <motion.div variants={fadeIn}>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as
                    possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="your.email@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone (Optional)</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="+233 XX XXX XXXX"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Department (Optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a department" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="general">
                                  General Inquiry
                                </SelectItem>
                                <SelectItem value="research">
                                  Research Department
                                </SelectItem>
                                <SelectItem value="training">
                                  Training & Education
                                </SelectItem>
                                <SelectItem value="advocacy">
                                  Campaigns & Advocacy
                                </SelectItem>
                                <SelectItem value="media">
                                  Media Relations
                                </SelectItem>
                                <SelectItem value="donations">
                                  Donations & Support
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the department your inquiry is related to
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Subject of your message"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Your message"
                                className="resize-none min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeIn} className="space-y-8">
              <div>
                <h2 className="heading-3 mb-4">Connect With Us</h2>
                <p className="paragraph mb-6">
                  We're always interested in hearing from individuals,
                  organizations, and communities who share our passion for
                  strengthening sexuality education, marriages, and families.
                </p>
                <p className="paragraph mb-6">
                  Whether you have questions about our research, want to
                  participate in our training programs, or are interested in
                  partnering with us, we're here to help.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/people/Ismart/61573042893192/"
                    className="bg-muted/50 p-3 rounded-full hover:bg-primary/10 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon className="h-6 w-6" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  {/* <a
                    href="#"
                    className="bg-muted/50 p-3 rounded-full hover:bg-primary/10 transition-colors"
                  >
                    <Twitter className="h-6 w-6 text-primary" />
                    <span className="sr-only">Twitter</span>
                  </a> */}
                  <a
                    href="https://www.instagram.com/ismart_1024/"
                    className="bg-muted/50 p-3 rounded-full hover:bg-primary/10 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@Inst.ofSexualityMarriageResear"
                    className="bg-muted/50 p-3 rounded-full hover:bg-primary/10 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <YoutubeIcon className="h-6 w-6" />
                    <span className="sr-only">Youtube</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 5:00 PM
                  <br />
                  Saturday: 10:00 AM - 2:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Media Inquiries</h3>
                <p className="text-muted-foreground mb-4">
                  For press and media inquiries, please contact our
                  Communications Department.
                </p>
                <p className="text-muted-foreground">
                  <strong>Email:</strong> media@ismart.org
                  <br />
                  <strong>Phone:</strong> +233 271 467 767
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4">
              <MapPin className="h-12 w-12 text-primary mb-4" />
              <h2 className="heading-2 mb-4">Find Us</h2>
            </div>
            <p className="paragraph text-muted-foreground max-w-3xl mx-auto">
              We are located in the heart of Accra, Ghana
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className="bg-muted h-[400px] rounded-lg flex items-center justify-center"
          >
            <div className="text-center w-full h-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127066.75857679047!2d-0.17972944999999999!3d5.5912087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0xbed14ed8650e2dd3!2sAccra!5e0!3m2!1sen!2sgh!4v1746872238331!5m2!1sen!2sgh"
                width="100%"
                height="400"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Common questions about contacting and working with us
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-6"
          >
            {[
              {
                question: 'How quickly can I expect a response to my inquiry?',
                answer:
                  "We strive to respond to all inquiries within 48 hours during business days. Complex inquiries may take a bit longer, but we'll always acknowledge receipt of your message.",
              },
              {
                question: 'Can I schedule a meeting with your team?',
                answer:
                  'Yes, you can request a meeting through our contact form. Please provide details about the purpose of the meeting and your availability, and our team will get back to you to arrange a suitable time.',
              },
              {
                question: 'Do you offer consultations for organizations?',
                answer:
                  'Yes, we provide consultations for organizations interested in improving their policies and practices related to sexuality education, marriage support, and family life. Please contact us with specific details about your needs.',
              },
              {
                question:
                  'How can I invite someone from iSMART to speak at my event?',
                answer:
                  "We welcome speaking opportunities. Please submit your request through our contact form with details about your event, including the date, location, audience, and topic you'd like addressed.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-muted/30 p-6 rounded-lg"
              >
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
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
              Join Our Community
            </motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Subscribe to our newsletter to stay updated on our latest
              research, upcoming events, and training opportunities.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary">Subscribe</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
