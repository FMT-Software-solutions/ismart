"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Download, FileText, Users, Check } from "lucide-react";

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

export default function FamilyResearchPage() {
  return (
    (<div>
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
                Family Life & Parenting Research
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Studying family dynamics, parenting practices, and their impact on child development and family well-being.
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
                Our family life and parenting research program examines the complex dynamics of family systems and the practices that promote healthy child development and family functioning. We investigate how family structures, processes, and contexts influence individual and collective well-being, with a particular focus on African families.
              </p>
              <p className="paragraph mb-6">
                Through a combination of observational, survey, and interview methods, we aim to understand the challenges facing contemporary families and identify strategies that support family resilience and thriving. Our research informs the development of family-centered policies, programs, and interventions.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Family Systems</h4>
                    <p className="text-muted-foreground">Examining the interactions and relationships within family units</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Parenting Practices</h4>
                    <p className="text-muted-foreground">Investigating approaches to child-rearing and their outcomes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Family Well-being</h4>
                    <p className="text-muted-foreground">Studying factors that contribute to healthy, thriving families</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80" 
                alt="Family Research" 
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
              Our key areas of investigation in family and parenting research
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="parenting" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="parenting">Parenting Styles</TabsTrigger>
                <TabsTrigger value="development">Child Development</TabsTrigger>
                <TabsTrigger value="dynamics">Family Dynamics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="parenting" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80" 
                      alt="Parenting Styles Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Parenting Styles Research</h3>
                    <p className="paragraph mb-6">
                      Our research on parenting styles examines different approaches to child-rearing and their impact on child development and family functioning. We investigate how cultural, social, and individual factors influence parenting practices and how these practices shape children's outcomes.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Cultural Influences</h4>
                          <p className="text-muted-foreground">Examining how culture shapes parenting approaches</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Discipline Strategies</h4>
                          <p className="text-muted-foreground">Investigating approaches to guiding children's behavior</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Parent-Child Relationships</h4>
                          <p className="text-muted-foreground">Studying the quality of interactions between parents and children</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="development" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="heading-3 mb-4">Child Development Research</h3>
                    <p className="paragraph mb-6">
                      Our child development research investigates the physical, cognitive, social, and emotional development of children from infancy through adolescence. We examine how family environments, parenting practices, and other contextual factors influence developmental trajectories and outcomes.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Developmental Milestones</h4>
                          <p className="text-muted-foreground">Tracking key achievements in children's development</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Environmental Influences</h4>
                          <p className="text-muted-foreground">Examining how family contexts shape development</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Resilience Factors</h4>
                          <p className="text-muted-foreground">Identifying what helps children thrive despite challenges</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                    <Image 
                      src="https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" 
                      alt="Child Development Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="dynamics" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
                      alt="Family Dynamics Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Family Dynamics Research</h3>
                    <p className="paragraph mb-6">
                      Our research on family dynamics examines the patterns of interaction, relationships, and functioning within family systems. We investigate how families adapt to challenges, manage transitions, and maintain cohesion and flexibility in the face of change.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Family Communication</h4>
                          <p className="text-muted-foreground">Studying patterns of interaction within families</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Family Transitions</h4>
                          <p className="text-muted-foreground">Examining how families navigate major life changes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-secondary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Family Resilience</h4>
                          <p className="text-muted-foreground">Investigating what helps families cope with challenges</p>
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
              Our ongoing investigations in family and parenting research
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
                title: "Parenting Practices and Child Development",
                description: "A longitu dinal study examining the relationship between parenting practices and child development outcomes in Ghanaian families.",
                status: "Recruitment Phase",
                completion: "Expected June 2027",
                image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
              },
              {
                title: "Parenting in the Digital Age",
                description: "An investigation into how digital technology influences parenting practices and family dynamics in contemporary Ghanaian families.",
                status: "Data Collection Phase",
                completion: "Expected September 2026",
                image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Family Resilience in Times of Crisis",
                description: "A study examining how families cope with and adapt to major stressors and challenges, including economic hardship, health crises, and social disruption.",
                status: "Analysis Phase",
                completion: "Expected December 2025",
                image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
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
              Our latest research findings and insights on family life and parenting
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
                title: "Parenting Practices and Child Development in Urban Ghana",
                journal: "Child Development Research",
                authors: "Boateng, E., Kwame, D., & Owusu, A.",
                year: "2023",
                volume: "Vol. 12, Issue 4, pp. 321-338"
              },
              {
                title: "Parenting in the Digital Age: Challenges for Ghanaian Families",
                journal: "Journal of Family Issues",
                authors: "Boateng, E., Addo, G., & Mensah, S.",
                year: "2023",
                volume: "Vol. 44, Issue 2, pp. 178-195"
              },
              {
                title: "Family Resilience During Economic Hardship: A Qualitative Study",
                journal: "Family Process",
                authors: "Kwame, D., Boateng, E., & Osei, J.",
                year: "2022",
                volume: "Vol. 61, Issue 3, pp. 845-862"
              },
              {
                title: "Cultural Influences on Parenting Styles in Ghana",
                journal: "Journal of Cross-Cultural Psychology",
                authors: "Mensah, S., Boateng, E., & Addo, G.",
                year: "2022",
                volume: "Vol. 53, Issue 2, pp. 245-262"
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
              Meet the researchers leading our family and parenting studies
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
                name: "Dr. Emmanuel Boateng",
                role: "Lead Researcher, Family Studies",
                bio: "Dr. Boateng specializes in parenting practices and child development research.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                name: "Mr. Daniel Kwame",
                role: "Senior Researcher",
                bio: "Mr. Kwame focuses on family resilience and adaptation to challenges.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              },
              {
                name: "Ms. Abena Owusu",
                role: "Research Associate",
                bio: "Ms. Owusu specializes in digital media and its impact on family dynamics.",
                image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
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
              Your contribution helps us continue our vital research on family life and parenting, generating knowledge that can strengthen families and support child development.
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
    </div>)
  );
}