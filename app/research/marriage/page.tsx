"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Download, FileText, Users, Check, Heart } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function MarriageResearchPage() {
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
              <motion.h1 
                variants={fadeIn}
                className="heading-1 mb-6"
              >
                Dating & Marriage Research
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Investigating relationship dynamics, marriage patterns, and factors that contribute to relationship success.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-background" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}></div>
      </section>

      {/* Research Overview Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeIn}>
              <h2 className="heading-2 mb-6">Research Overview</h2>
              <p className="paragraph mb-6">
                Our dating and marriage research program examines the dynamics of romantic relationships, from initial attraction and dating to long-term commitment and marriage. We investigate the factors that contribute to relationship formation, quality, and stability across different cultural contexts, with a particular focus on African relationships and marriages.
              </p>
              <p className="paragraph mb-6">
                Through a combination of qualitative and quantitative research methods, we aim to understand the complex interplay of individual, interpersonal, and sociocultural factors that shape relationship experiences and outcomes. Our research informs the development of evidence-based approaches to relationship education, counseling, and therapy.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Cultural Context</h4>
                    <p className="text-muted-foreground">Examining how cultural factors influence relationship patterns and practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Relationship Quality</h4>
                    <p className="text-muted-foreground">Investigating factors that contribute to healthy, satisfying relationships</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Applied Research</h4>
                    <p className="text-muted-foreground">Developing evidence-based approaches to relationship education and counseling</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Marriage Research" 
                fill
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Focus Areas Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Research Focus Areas</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Our key areas of investigation in relationship and marriage research
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="premarital" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="premarital">Premarital Relationships</TabsTrigger>
                <TabsTrigger value="marital">Marital Quality</TabsTrigger>
                <TabsTrigger value="counseling">Relationship Counseling</TabsTrigger>
              </TabsList>
              
              <TabsContent value="premarital" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1516058575735-399a011dca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                      alt="Premarital Relationships Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Premarital Relationships Research</h3>
                    <p className="paragraph mb-6">
                      Our research on premarital relationships examines dating patterns, mate selection processes, and relationship development. We investigate how individuals meet potential partners, what factors influence attraction and compatibility, and how relationships evolve from casual dating to serious commitment.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Dating Patterns</h4>
                          <p className="text-muted-foreground">Examining how people meet and form romantic relationships</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Mate Selection</h4>
                          <p className="text-muted-foreground">Investigating factors that influence partner choice</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Relationship Development</h4>
                          <p className="text-muted-foreground">Studying how relationships progress toward commitment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="marital" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="heading-3 mb-4">Marital Quality Research</h3>
                    <p className="paragraph mb-6">
                      Our marital quality research investigates the factors that contribute to relationship satisfaction, stability, and resilience. We examine communication patterns, conflict resolution strategies, emotional intimacy, and other dimensions of relationship functioning that influence marital outcomes.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Communication</h4>
                          <p className="text-muted-foreground">Studying patterns of interaction between partners</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Conflict Resolution</h4>
                          <p className="text-muted-foreground">Examining how couples manage disagreements and problems</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Relationship Satisfaction</h4>
                          <p className="text-muted-foreground">Investigating factors that contribute to fulfilling marriages</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                    <Image 
                      src="https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Marital Quality Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="counseling" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Relationship Counseling Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Relationship Counseling Research</h3>
                    <p className="paragraph mb-6">
                      Our research on relationship counseling examines the effectiveness of different approaches to helping couples prevent and resolve relationship problems. We investigate premarital counseling, marriage enrichment programs, and therapeutic interventions for couples experiencing distress.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Premarital Counseling</h4>
                          <p className="text-muted-foreground">Evaluating programs that prepare couples for marriage</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Marriage Enrichment</h4>
                          <p className="text-muted-foreground">Studying programs that strengthen existing marriages</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-accent/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Therapeutic Approaches</h4>
                          <p className="text-muted-foreground">Investigating interventions for couples experiencing difficulties</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Current Research Projects</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Our ongoing investigations in relationship and marriage research
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-8"
          >
            {[
              {
                title: "Marriage Patterns and Relationship Satisfaction",
                description: "An investigation into marriage patterns, relationship dynamics, and factors contributing to relationship satisfaction among Ghanaian couples.",
                status: "Analysis Phase",
                completion: "Expected March 2026",
                image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "The Impact of Technology on Marital Communication",
                description: "A study examining how digital technology influences communication patterns and relationship quality in marriages.",
                status: "Data Collection Phase",
                completion: "Expected June 2026",
                image: "https://images.unsplash.com/photo-1516058575735-399a011dca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
              },
              {
                title: "Premarital Counseling Effectiveness",
                description: "An evaluation of different approaches to premarital counseling and their impact on relationship outcomes.",
                status: "Recruitment Phase",
                completion: "Expected December 2026",
                image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              }
            ].map((project, index) => (
              <motion.div key={index} variants={fadeIn} className="bg-background rounded-lg overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative h-48 md:h-auto">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-6 md:col-span-2">
                    <h3 className="heading-4 mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
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
                      <Link href={`/research/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}>
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
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Recent Publications</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Our latest research findings and insights on relationships and marriage
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {[
              {
                title: "Relationship Satisfaction Among Ghanaian Couples: A Mixed-Methods Study",
                journal: "Journal of Marriage and Family",
                authors: "Addo, G., Mensah, S., & Boateng, E.",
                year: "2024",
                volume: "Vol. 86, Issue 3, pp. 789-805"
              },
              {
                title: "The Impact of Technology on Marital Communication",
                journal: "Journal of Family Communication",
                authors: "Osei, J., Mensah, S., & Kwame, D.",
                year: "2023",
                volume: "Vol. 21, Issue 1, pp. 112-129"
              },
              {
                title: "Premarital Counseling in Ghana: Practices and Outcomes",
                journal: "Journal of Couple & Relationship Therapy",
                authors: "Addo, G., Boateng, E., & Osei, J.",
                year: "2023",
                volume: "Vol. 22, Issue 2, pp. 156-172"
              },
              {
                title: "Cultural Influences on Mate Selection in Contemporary Ghana",
                journal: "Journal of Cross-Cultural Psychology",
                authors: "Mensah, S., Addo, G., & Kwame, D.",
                year: "2022",
                volume: "Vol. 53, Issue 4, pp. 423-440"
              }
            ].map((publication, index) => (
              <motion.div key={index} variants={fadeIn} className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">{publication.title}</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>{publication.authors}</p>
                  <p>{publication.journal}, {publication.year}</p>
                  <p>{publication.volume}</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="#" className="flex items-center">
                      View Article <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div variants={fadeIn} className="text-center mt-12">
            <Button asChild>
              <Link href="/research/publications">
                View All Publications <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Research Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Research Team</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Meet the researchers leading our relationship and marriage studies
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Dr. Grace Addo",
                role: "Lead Researcher, Marriage Studies",
                bio: "Dr. Addo specializes in marital quality and relationship counseling research.",
                image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
              },
              {
                name: "Prof. James Osei",
                role: "Senior Researcher",
                bio: "Prof. Osei focuses on cultural influences on relationship patterns and practices.",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              },
              {
                name: "Mr. Daniel Kwame",
                role: "Research Associate",
                bio: "Mr. Kwame specializes in technology and its impact on relationship dynamics.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              }
            ].map((researcher, index) => (
              <motion.div key={index} variants={fadeIn} whileHover={{ y: -5 }} className="card-hover">
                <Card className="overflow-hidden h-full">
                  <div className="relative h-64">
                    <Image 
                      src={researcher.image} 
                      alt={researcher.name} 
                      fill
                      style={{ objectFit: "cover" }}
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

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-6">Support Our Research</motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Your contribution helps us continue our vital research on relationships and marriage, generating knowledge that can strengthen couples and families.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/donate">Donate Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" asChild>
                <Link href="/contact">Partner With Us</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}