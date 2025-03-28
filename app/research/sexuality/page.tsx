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

export default function SexualityResearchPage() {
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
                Sex & Sexuality Research
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Exploring human sexuality through biological, psychological, social, and cultural lenses.
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
                Our sexuality research program explores the complex dimensions of human sexuality, examining biological, psychological, social, and cultural factors that shape sexual development, identity, and behavior. We take a holistic, interdisciplinary approach that recognizes the diverse ways in which sexuality is experienced and expressed across different contexts and communities.
              </p>
              <p className="paragraph mb-6">
                Through rigorous, culturally sensitive research methods, we aim to generate knowledge that can inform policy, education, and practice in ways that promote sexual health, well-being, and rights. Our work is guided by a commitment to scientific integrity, ethical research practices, and respect for human dignity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Interdisciplinary Approach</h4>
                    <p className="text-muted-foreground">Integrating perspectives from biology, psychology, sociology, and anthropology</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Cultural Sensitivity</h4>
                    <p className="text-muted-foreground">Recognizing the importance of cultural context in understanding sexuality</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Applied Research</h4>
                    <p className="text-muted-foreground">Generating knowledge that can inform policy, education, and practice</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image 
                src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Sexuality Research" 
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
              Our key areas of investigation in sexuality research
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="education" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="education">Sexuality Education</TabsTrigger>
                <TabsTrigger value="health">Sexual Health</TabsTrigger>
                <TabsTrigger value="development">Sexual Development</TabsTrigger>
              </TabsList>
              
              <TabsContent value="education" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Sexuality Education Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Sexuality Education Research</h3>
                    <p className="paragraph mb-6">
                      Our research on sexuality education examines the content, delivery, and impact of sexuality education programs in various settings, including schools, communities, and families. We investigate how different approaches to sexuality education influence knowledge, attitudes, and behaviors related to sexuality, relationships, and sexual health.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Curriculum Analysis</h4>
                          <p className="text-muted-foreground">Evaluating the content and approach of sexuality education curricula</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Teacher Training</h4>
                          <p className="text-muted-foreground">Examining how educator preparation influences program effectiveness</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Program Evaluation</h4>
                          <p className="text-muted-foreground">Assessing the impact of sexuality education on knowledge, attitudes, and behaviors</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="health" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="order-2 md:order-1">
                    <h3 className="heading-3 mb-4">Sexual Health Research</h3>
                    <p className="paragraph mb-6">
                      Our sexual health research investigates factors that influence sexual health outcomes, including access to information and services, social and cultural norms, and individual behaviors. We examine how these factors interact to shape sexual health across the lifespan and in different populations.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Access to Services</h4>
                          <p className="text-muted-foreground">Examining barriers and facilitators to sexual health services</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Health Disparities</h4>
                          <p className="text-muted-foreground">Investigating inequities in sexual health outcomes</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Preventive Behaviors</h4>
                          <p className="text-muted-foreground">Studying factors that influence protective sexual health practices</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                    <Image 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Sexual Health Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="development" className="mt-6">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
                    <Image 
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80" 
                      alt="Sexual Development Research" 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h3 className="heading-3 mb-4">Sexual Development Research</h3>
                    <p className="paragraph mb-6">
                      Our research on sexual development explores how sexuality develops and changes throughout the lifespan, from childhood through older adulthood. We examine biological, psychological, and social factors that influence the development of sexual identity, attitudes, and behaviors.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Adolescent Sexuality</h4>
                          <p className="text-muted-foreground">Studying the unique aspects of sexual development during adolescence</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Identity Formation</h4>
                          <p className="text-muted-foreground">Examining the development of sexual and gender identities</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-4 mt-1 bg-primary/10 p-2 rounded-full">
                          <Check className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Lifespan Perspective</h4>
                          <p className="text-muted-foreground">Investigating how sexuality changes across different life stages</p>
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
              Our ongoing investigations in sexuality research
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
                title: "Sexuality Education in Ghanaian Schools",
                description: "A comprehensive study of sexuality education programs in Ghanaian schools, examining content, delivery methods, and impact on student knowledge and attitudes.",
                status: "Data Collection Phase",
                completion: "Expected December 2025",
                image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Digital Media and Youth Sexuality",
                description: "An investigation into how digital media influences sexual knowledge, attitudes, and behaviors among Ghanaian youth.",
                status: "Analysis Phase",
                completion: "Expected March 2026",
                image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                title: "Sexual Health Access and Outcomes",
                description: "A study examining barriers and facilitators to sexual health services and their impact on sexual health outcomes in diverse communities.",
                status: "Recruitment Phase",
                completion: "Expected June 2026",
                image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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
              Our latest research findings and insights on sexuality
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
                title: "Sexuality Education in Ghana: Challenges and Opportunities",
                journal: "Journal of Sex Education",
                authors: "Mensah, S., Osei, J., & Addo, G.",
                year: "2024",
                volume: "Vol. 15, Issue 2, pp. 45-62"
              },
              {
                title: "Digital Media and Youth Sexual Knowledge: A Mixed-Methods Study",
                journal: "Journal of Adolescent Research",
                authors: "Boateng, E., Mensah, S., & Owusu, A.",
                year: "2023",
                volume: "Vol. 38, Issue 4, pp. 412-430"
              },
              {
                title: "Sexual Health Service Utilization Among Young Adults in Ghana",
                journal: "International Journal of Sexual Health",
                authors: "Addo, G., Kwame, D., & Osei, J.",
                year: "2023",
                volume: "Vol. 35, Issue 2, pp. 178-195"
              },
              {
                title: "Cultural Influences on Sexual Attitudes and Behaviors",
                journal: "Archives of Sexual Behavior",
                authors: "Mensah, S., Addo, G., & Boateng, E.",
                year: "2022",
                volume: "Vol. 51, Issue 3, pp. 1567-1584"
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
              Meet the researchers leading our sexuality studies
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
                name: "Dr. Sarah Mensah",
                role: "Lead Researcher, Sexuality Studies",
                bio: "Dr. Mensah specializes in sexuality education and cultural influences on sexual attitudes and behaviors.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
              },
              {
                name: "Dr. Emmanuel Boateng",
                role: "Senior Researcher",
                bio: "Dr. Boateng focuses on adolescent sexuality and digital media influences on sexual development.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              },
              {
                name: "Ms. Abena Owusu",
                role: "Research Associate",
                bio: "Ms. Owusu specializes in sexual health services and access to care in diverse communities.",
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
              Your contribution helps us continue our vital research on sexuality, generating knowledge that can inform policy, education, and practice.
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