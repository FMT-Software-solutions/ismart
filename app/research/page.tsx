'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, BookOpen, Download, FileText, Users } from 'lucide-react';

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
              Our Research Focus Areas
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Exploring critical aspects of human experience through rigorous,
              culturally sensitive research
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: 'Sex & Sexuality',
                description:
                  'Exploring human sexuality through biological, psychological, social, and cultural lenses.',
                image:
                  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                link: '/research/sexuality',
              },
              {
                title: 'Dating & Marriage',
                description:
                  'Investigating relationship dynamics, marriage patterns, and factors that contribute to relationship success.',
                image:
                  'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                link: '/research/marriage',
              },
              {
                title: 'Family Life & Parenting',
                description:
                  'Studying family dynamics, parenting practices, and their impact on child development and family well-being.',
                image:
                  'https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
                link: '/research/family',
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-48">
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{area.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{area.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild>
                      <Link href={area.link}>
                        Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
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
            className="text-center max-w-3xl mx-auto mb-16"
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

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {[
              {
                title: 'Sexuality Education in Ghanaian Schools',
                description:
                  'A comprehensive study of sexuality education programs in Ghanaian schools, examining content, delivery methods, and impact on student knowledge and attitudes.',
                status: 'Data Collection Phase',
                completion: 'Expected December 2025',
                image:
                  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Marriage Patterns and Relationship Satisfaction',
                description:
                  'An investigation into marriage patterns, relationship dynamics, and factors contributing to relationship satisfaction among Ghanaian couples.',
                status: 'Analysis Phase',
                completion: 'Expected March 2026',
                image:
                  'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                title: 'Parenting Practices and Child Development',
                description:
                  'A longitudinal study examining the relationship between parenting practices and child development outcomes in Ghanaian families.',
                status: 'Recruitment Phase',
                completion: 'Expected June 2027',
                image:
                  'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-background rounded-lg overflow-hidden shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-48 md:h-auto">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-6 md:col-span-2">
                    <h3 className="heading-4 mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-muted-foreground">
                        <span className="font-medium mr-2">Status:</span>
                        <span>{project.status}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <span className="font-medium mr-2">Completion:</span>
                        <span>{project.completion}</span>
                      </div>
                    </div>
                    <Button variant="outline" asChild>
                      <Link
                        href={`/research/projects/${project.title
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`}
                      >
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Publications Section */}
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
              Recent Publications
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Our latest research findings and insights
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="articles">Journal Articles</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="briefs">Policy Briefs</TabsTrigger>
              </TabsList>

              <TabsContent value="articles" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title:
                        'Sexuality Education in Ghana: Challenges and Opportunities',
                      journal: 'Journal of Sex Education',
                      authors: 'Mensah, S., Osei, J., & Addo, G.',
                      year: '2024',
                      volume: 'Vol. 15, Issue 2, pp. 45-62',
                    },
                    {
                      title:
                        'Relationship Satisfaction Among Ghanaian Couples: A Mixed-Methods Study',
                      journal: 'Journal of Marriage and Family',
                      authors: 'Addo, G., Mensah, S., & Boateng, E.',
                      year: '2024',
                      volume: 'Vol. 86, Issue 3, pp. 789-805',
                    },
                    {
                      title:
                        'Parenting Practices and Child Development in Urban Ghana',
                      journal: 'Child Development Research',
                      authors: 'Boateng, E., Kwame, D., & Owusu, A.',
                      year: '2023',
                      volume: 'Vol. 12, Issue 4, pp. 321-338',
                    },
                    {
                      title:
                        'The Impact of Technology on Marital Communication',
                      journal: 'Journal of Family Communication',
                      authors: 'Osei, J., Mensah, S., & Kwame, D.',
                      year: '2023',
                      volume: 'Vol. 21, Issue 1, pp. 112-129',
                    },
                  ].map((article, index) => (
                    <div key={index} className="bg-muted/30 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">{article.title}</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>{article.authors}</p>
                        <p>
                          {article.journal}, {article.year}
                        </p>
                        <p>{article.volume}</p>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" className="flex items-center">
                            View Article <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reports" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title:
                        'The State of Marriage and Family Life in Ghana: 2024 Report',
                      authors: 'iSMART Research Team',
                      pages: '120 pages',
                      year: '2024',
                    },
                    {
                      title:
                        'Sexuality Education in Ghanaian Schools: An Assessment',
                      authors: 'Mensah, S., Boateng, E., & Addo, G.',
                      pages: '85 pages',
                      year: '2023',
                    },
                    {
                      title:
                        'Technology and Relationships: Impacts and Implications',
                      authors: 'Osei, J., Kwame, D., & Owusu, A.',
                      pages: '65 pages',
                      year: '2023',
                    },
                    {
                      title:
                        'Parenting in the Digital Age: Challenges for Ghanaian Families',
                      authors: 'Boateng, E., Addo, G., & Mensah, S.',
                      pages: '78 pages',
                      year: '2022',
                    },
                  ].map((report, index) => (
                    <div key={index} className="bg-muted/30 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">{report.title}</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>{report.authors}</p>
                        <p>{report.pages}</p>
                        <p>{report.year}</p>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" className="flex items-center">
                            Download Report{' '}
                            <Download className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="briefs" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title:
                        'Improving Sexuality Education in Ghana: Recommendations for Policymakers',
                      authors: 'Mensah, S., Boateng, E., & Addo, G.',
                      pages: '12 pages',
                      year: '2024',
                    },
                    {
                      title:
                        'Supporting Healthy Marriages: Policy Recommendations',
                      authors: 'Addo, G., Osei, J., & Kwame, D.',
                      pages: '10 pages',
                      year: '2024',
                    },
                    {
                      title:
                        'Digital Media and Youth: Implications for Sexuality Education',
                      authors: 'Boateng, E., Owusu, A., & Mensah, S.',
                      pages: '15 pages',
                      year: '2024',
                    },
                    {
                      title:
                        'Family-Friendly Workplace Policies: Recommendations for Employers and Policymakers',
                      authors: 'Kwame, D., Addo, G., & Mensah, S.',
                      pages: '10 pages',
                      year: '2024',
                    },
                  ].map((brief, index) => (
                    <div key={index} className="bg-muted/30 p-6 rounded-lg">
                      <h3 className="font-semibold mb-2">{brief.title}</h3>
                      <div className="space-y-2 text-muted-foreground">
                        <p>{brief.authors}</p>
                        <p>{brief.pages}</p>
                        <p>{brief.year}</p>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <a href="#" className="flex items-center">
                            Download Brief <Download className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <motion.div variants={fadeIn} className="text-center mt-12">
              <Button asChild>
                <Link href="/research/publications">
                  View All Publications <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Team Section */}
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
              Our Research Team
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              Meet the dedicated researchers behind our work
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
                name: 'Dr. Sarah Mensah',
                role: 'Research Director',
                bio: 'Dr. Mensah leads our research initiatives with expertise in family dynamics and sexuality studies.',
                image:
                  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
              },
              {
                name: 'Prof. James Osei',
                role: 'Senior Researcher',
                bio: 'Prof. Osei specializes in cultural studies and their impact on marriage and family life.',
                image:
                  'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                name: 'Dr. Grace Addo',
                role: 'Research Fellow',
                bio: 'Dr. Addo focuses on relationship education and marriage counseling research.',
                image:
                  'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80',
              },
              {
                name: 'Mr. Daniel Kwame',
                role: 'Research Associate',
                bio: 'Mr. Kwame specializes in policy research and community-based participatory research methods.',
                image:
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
              {
                name: 'Dr. Emmanuel Boateng',
                role: 'Research Fellow',
                bio: 'Dr. Boateng leads our sexuality education research with a focus on curriculum development.',
                image:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
              },
              {
                name: 'Ms. Abena Owusu',
                role: 'Research Assistant',
                bio: 'Ms. Owusu specializes in qualitative research methods and data analysis.',
                image:
                  'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
              },
            ].map((researcher, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -5 }}
                className="card-hover"
              >
                <Card className="overflow-hidden h-full">
                  <div className="relative h-64">
                    <Image
                      src={researcher.image}
                      alt={researcher.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{researcher.name}</CardTitle>
                    <CardDescription>{researcher.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{researcher.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Partnerships Section */}
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
              Research Partnerships
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="paragraph text-muted-foreground"
            >
              We collaborate with leading institutions to advance knowledge and
              practice
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeIn}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center"
          >
            {[
              'University of Ghana',
              'Ghana Health Service',
              'Ministry of Gender, Children and Social Protection',
              'UNFPA Ghana',
              'African Family Health Research Institute',
              'International Center for Research on Women',
              'Kwame Nkrumah University of Science and Technology',
              'Ghana Education Service',
            ].map((partner, index) => (
              <div
                key={index}
                className="bg-muted/30 p-4 rounded-lg w-full h-24 flex items-center justify-center text-center"
              >
                <p className="font-medium">{partner}</p>
              </div>
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
