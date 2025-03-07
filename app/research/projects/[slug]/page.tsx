"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Calendar, Users, BookOpen, Award, Clock, Check, FileText, Download } from "lucide-react";
import { notFound } from "next/navigation";

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

// Sample project data
const projects = [
  {
    slug: "sexuality-education-in-ghanaian-schools",
    title: "Sexuality Education in Ghanaian Schools",
    description: "A comprehensive study of sexuality education programs in Ghanaian schools, examining content, delivery methods, and impact on student knowledge and attitudes.",
    status: "Data Collection Phase",
    completion: "Expected December 2025",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "sexuality",
    lead: "Dr. Sarah Mensah",
    team: ["Dr. Sarah Mensah", "Prof. James Osei", "Ms. Abena Owusu"],
    objectives: [
      "Evaluate the content and delivery of sexuality education in Ghanaian schools",
      "Assess the impact of sexuality education on student knowledge, attitudes, and behaviors",
      "Identify gaps and opportunities for improvement in sexuality education programs",
      "Develop recommendations for culturally appropriate, comprehensive sexuality education"
    ],
    methodology: "This mixed-methods study employs surveys, interviews, focus groups, and classroom observations to gather data from students, teachers, administrators, and parents across 20 schools in Ghana.",
    findings: "Preliminary findings indicate significant variation in the content and quality of sexuality education across schools, with many programs focusing primarily on abstinence and lacking comprehensive information about sexual health and relationships.",
    publications: [
      {
        title: "Sexuality Education in Ghana: A Preliminary Assessment",
        journal: "Journal of Sex Education",
        year: "2023",
        authors: "Mensah, S., Osei, J., & Owusu, A."
      }
    ]
  },
  {
    slug: "digital-media-and-youth-sexuality",
    title: "Digital Media and Youth Sexuality",
    description: "An investigation into how digital media influences sexual knowledge, attitudes, and behaviors among Ghanaian youth.",
    status: "Analysis Phase",
    completion: "Expected March 2026",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "sexuality",
    lead: "Dr. Emmanuel Boateng",
    team: ["Dr. Emmanuel Boateng", "Dr. Sarah Mensah", "Ms. Abena Owusu"],
    objectives: [
      "Examine how youth access and engage with sexual content through digital media",
      "Assess the influence of digital media on sexual knowledge, attitudes, and behaviors",
      "Identify risks and opportunities associated with digital sexuality education",
      "Develop guidelines for parents, educators, and policymakers"
    ],
    methodology: "This study uses surveys, media diaries, and in-depth interviews with youth aged 15-24 to understand their engagement with digital media and its influence on their sexuality.",
    findings: "Initial findings suggest that social media and online content are increasingly important sources of sexual information for young people, often filling gaps left by formal sexuality education.",
    publications: [
      {
        title: "Digital Media as a Source of Sexual Information for Ghanaian Youth",
        journal: "Journal of Adolescent Research",
        year: "2023",
        authors: "Boateng, E., Mensah, S., & Owusu, A."
      }
    ]
  },
  {
    slug: "sexual-health-access-and-outcomes",
    title: "Sexual Health Access and Outcomes",
    description: "A study examining barriers and facilitators to sexual health services and their impact on sexual health outcomes in diverse communities.",
    status: "Recruitment Phase",
    completion: "Expected June 2026",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "sexuality",
    lead: "Dr. Grace Addo",
    team: ["Dr. Grace Addo", "Mr. Daniel Kwame", "Prof. James Osei"],
    objectives: [
      "Identify barriers and facilitators to sexual health service utilization",
      "Examine disparities in access to sexual health services across different populations",
      "Assess the relationship between service access and sexual health outcomes",
      "Develop recommendations for improving sexual health service delivery"
    ],
    methodology: "This study combines surveys, medical record reviews, and interviews with service users and providers to examine patterns of sexual health service utilization and associated outcomes.",
    findings: "Preliminary data indicates significant disparities in access to sexual health services, with young people, rural residents, and those with lower socioeconomic status facing particular barriers.",
    publications: []
  },
  {
    slug: "marriage-patterns-and-relationship-satisfaction",
    title: "Marriage Patterns and Relationship Satisfaction",
    description: "An investigation into marriage patterns, relationship dynamics, and factors contributing to relationship satisfaction among Ghanaian couples.",
    status: "Analysis Phase",
    completion: "Expected March 2026",
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "marriage",
    lead: "Dr. Grace Addo",
    team: ["Dr. Grace Addo", "Dr. Sarah Mensah", "Dr. Emmanuel Boateng"],
    objectives: [
      "Examine contemporary marriage patterns and practices in Ghana",
      "Identify factors that contribute to relationship satisfaction and stability",
      "Investigate cultural influences on marital expectations and experiences",
      "Develop culturally appropriate measures of relationship quality"
    ],
    methodology: "This mixed-methods study employs surveys and in-depth interviews with married couples across different regions, socioeconomic backgrounds, and marriage durations.",
    findings: "Initial analyses suggest that communication quality, shared decision-making, and emotional support are key predictors of relationship satisfaction in the Ghanaian context.",
    publications: [
      {
        title: "Predictors of Marital Satisfaction in Ghana: A Preliminary Analysis",
        journal: "Journal of Marriage and Family",
        year: "2023",
        authors: "Addo, G., Mensah, S., & Boateng, E."
      }
    ]
  },
  {
    slug: "the-impact-of-technology-on-marital-communication",
    title: "The Impact of Technology on Marital Communication",
    description: "A study examining how digital technology influences communication patterns and relationship quality in marriages.",
    status: "Data Collection Phase",
    completion: "Expected June 2026",
    image: "https://images.unsplash.com/photo-1516058575735-399a011dca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    category: "marriage",
    lead: "Prof. James Osei",
    team: ["Prof. James Osei", "Dr. Sarah Mensah", "Mr. Daniel Kwame"],
    objectives: [
      "Examine how couples use technology for communication",
      "Assess the impact of technology use on relationship quality and satisfaction",
      "Identify patterns of technology use that enhance or hinder marital communication",
      "Develop guidelines for healthy technology use in relationships"
    ],
    methodology: "This study combines surveys, communication diaries, and observation of couple interactions to examine how technology influences marital communication.",
    findings: "Preliminary data suggests that technology can both facilitate and impede marital communication, with effects depending on how couples integrate digital tools into their relationship.",
    publications: []
  },
  {
    slug: "premarital-counseling-effectiveness",
    title: "Premarital Counseling Effectiveness",
    description: "An evaluation of different approaches to premarital counseling and their impact on relationship outcomes.",
    status: "Recruitment Phase",
    completion: "Expected December 2026",
    image: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "marriage",
    lead: "Dr. Grace Addo",
    team: ["Dr. Grace Addo", "Dr. Emmanuel Boateng", "Prof. James Osei"],
    objectives: [
      "Compare different approaches to premarital counseling in Ghana",
      "Assess the impact of premarital counseling on relationship outcomes",
      "Identify key components of effective premarital preparation",
      "Develop recommendations for premarital counseling best practices"
    ],
    methodology: "This longitudinal study follows couples from premarital counseling through the first two years of marriage, comparing outcomes across different counseling approaches.",
    findings: "The study is currently in the recruitment phase, with no findings to report yet.",
    publications: []
  },
  {
    slug: "parenting-practices-and-child-development",
    title: "Parenting Practices and Child Development",
    description: "A longitudinal study examining the relationship between parenting practices and child development outcomes in Ghanaian families.",
    status: "Recruitment Phase",
    completion: "Expected June 2027",
    image: "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    category: "family",
    lead: "Dr. Emmanuel Boateng",
    team: ["Dr. Emmanuel Boateng", "Mr. Daniel Kwame", "Ms. Abena Owusu"],
    objectives: [
      "Examine parenting practices in Ghanaian families",
      "Assess the relationship between parenting practices and child development outcomes",
      "Identify cultural and contextual factors that influence parenting",
      "Develop culturally appropriate measures of parenting and child development"
    ],
    methodology: "This longitudinal study follows families with children aged 0-5 over a three-year period, using observations, interviews, and developmental assessments to track parenting practices and child outcomes.",
    findings: "The study is currently in the recruitment phase, with no findings to report yet.",
    publications: []
  },
  {
    slug: "parenting-in-the-digital-age",
    title: "Parenting in the Digital Age",
    description: "An investigation into how digital technology influences parenting practices and family dynamics in contemporary Ghanaian families.",
    status: "Data Collection Phase",
    completion: "Expected September 2026",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "family",
    lead: "Dr. Emmanuel Boateng",
    team: ["Dr. Emmanuel Boateng", "Dr. Grace Addo", "Dr. Sarah Mensah"],
    objectives: [
      "Examine how parents manage children's technology use",
      "Assess the impact of digital technology on family interactions and dynamics",
      "Identify challenges and opportunities that digital media presents for parenting",
      "Develop guidelines for healthy technology use in families"
    ],
    methodology: "This mixed-methods study combines surveys, interviews, and family observations to examine how digital technology is integrated into family life and parenting practices.",
    findings: "Preliminary data indicates that parents face significant challenges in managing children's technology use, with many feeling unprepared for the digital parenting role.",
    publications: [
      {
        title: "Digital Parenting Challenges in Ghana: A Preliminary Study",
        journal: "Journal of Family Issues",
        year: "2023",
        authors: "Boateng, E., Addo, G., & Mensah, S."
      }
    ]
  },
  {
    slug: "family-resilience-in-times-of-crisis",
    title: "Family Resilience in Times of Crisis",
    description: "A study examining how families cope with and adapt to major stressors and challenges, including economic hardship, health crises, and social disruption.",
    status: "Analysis Phase",
    completion: "Expected December 2025",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    category: "family",
    lead: "Mr. Daniel Kwame",
    team: ["Mr. Daniel Kwame", "Dr. Emmanuel Boateng", "Prof. James Osei"],
    objectives: [
      "Identify factors that contribute to family resilience during times of crisis",
      "Examine how families adapt to different types of stressors",
      "Assess the impact of crises on family functioning and well-being",
      "Develop interventions to support family resilience"
    ],
    methodology: "This study uses interviews and surveys with families who have experienced significant stressors, including economic hardship, health crises, and social disruption.",
    findings: "Initial analyses suggest that social support, flexible coping strategies, and shared meaning-making are key components of family resilience in the face of adversity.",
    publications: [
      {
        title: "Family Coping Strategies During Economic Hardship in Ghana",
        journal: "Family Process",
        year: "2022",
        authors: "Kwame, D., Boateng, E., & Osei, J."
      }
    ]
  }
];

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }
  
  // Determine the research area page link based on the project category
  const researchAreaLink = `/research/${project.category}`;
  
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
              <motion.div variants={fadeIn} className="mb-4">
                <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20" asChild>
                  <Link href={researchAreaLink}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to {project.category.charAt(0).toUpperCase() + project.category.slice(1)} Research
                  </Link>
                </Button>
              </motion.div>
              <motion.h1 
                variants={fadeIn}
                className="heading-1 mb-6"
              >
                {project.title}
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                {project.description}
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-background" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}></div>
      </section>

      {/* Project Overview Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
          >
            <motion.div variants={fadeIn}>
              <h2 className="heading-2 mb-6">Project Overview</h2>
              <p className="paragraph mb-6">
                {project.description}
              </p>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Status</h3>
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium mr-2">Current Phase:</span>
                    <span>{project.status}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-medium mr-2">Expected Completion:</span>
                    <span>{project.completion}</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Research Team</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <span className="font-medium mr-2">Lead Investigator:</span>
                    <span>{project.lead}</span>
                  </div>
                  <div className="text-muted-foreground">
                    <span className="font-medium mr-2">Team Members:</span>
                    <ul className="list-disc ml-6 mt-1">
                      {project.team.map((member, index) => (
                        <li key={index}>{member}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Research Objectives</h3>
                <ul className="space-y-2 mb-6">
                  {project.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 bg-primary/10 p-1 rounded-full">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="space-y-8">
              <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Methodology</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.methodology}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preliminary Findings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.findings || "No findings to report yet."}</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Publications Section */}
      {project.publications.length > 0 && (
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="max-w-3xl mx-auto"
            >
              <motion.h2 variants={fadeIn} className="heading-2 mb-6 text-center">Related Publications</motion.h2>
              
              <motion.div variants={fadeIn} className="space-y-6">
                {project.publications.map((publication, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{publication.title}</CardTitle>
                      <CardDescription>{publication.journal}, {publication.year}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{publication.authors}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" className="flex items-center">
                          View Publication <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Projects Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Related Projects</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Explore other research in this area
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects
              .filter(p => p.category === project.category && p.slug !== project.slug)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div key={index} variants={fadeIn} whileHover={{ y: -5 }} className="card-hover">
                  <Card className="overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image 
                        src={relatedProject.image} 
                        alt={relatedProject.title} 
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{relatedProject.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3">{relatedProject.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <Link href={`/research/projects/${relatedProject.slug}`}>
                          View Project <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
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
              Your contribution helps us continue our vital research on {project.category}, generating knowledge that can inform policy, education, and practice.
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