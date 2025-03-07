"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, Download, FileText, Users, Check, Search, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

// Sample publication data
const publications = [
  // Sexuality Research Publications
  {
    title: "Sexuality Education in Ghana: Challenges and Opportunities",
    journal: "Journal of Sex Education",
    authors: "Mensah, S., Osei, J., & Addo, G.",
    year: "2024",
    volume: "Vol. 15, Issue 2, pp. 45-62",
    category: "sexuality",
    abstract: "This study examines the current state of sexuality education in Ghanaian schools, identifying key challenges and opportunities for improvement. Through interviews with educators, students, and parents, the research highlights cultural barriers, resource limitations, and policy gaps that affect the delivery of comprehensive sexuality education."
  },
  {
    title: "Digital Media and Youth Sexual Knowledge: A Mixed-Methods Study",
    journal: "Journal of Adolescent Research",
    authors: "Boateng, E., Mensah, S., & Owusu, A.",
    year: "2023",
    volume: "Vol. 38, Issue 4, pp. 412-430",
    category: "sexuality",
    abstract: "This mixed-methods study investigates how digital media influences sexual knowledge, attitudes, and behaviors among Ghanaian youth. Findings indicate that social media and online content are increasingly important sources of sexual information for young people, often filling gaps left by formal sexuality education."
  },
  {
    title: "Sexual Health Service Utilization Among Young Adults in Ghana",
    journal: "International Journal of Sexual Health",
    authors: "Addo, G., Kwame, D., & Osei, J.",
    year: "2023",
    volume: "Vol. 35, Issue 2, pp. 178-195",
    category: "sexuality",
    abstract: "This research examines patterns of sexual health service utilization among young adults in Ghana, identifying barriers to access and factors that facilitate engagement with services. The study highlights the importance of youth-friendly services, confidentiality, and cultural sensitivity in promoting sexual health."
  },
  {
    title: "Cultural Influences on Sexual Attitudes and Behaviors",
    journal: "Archives of Sexual Behavior",
    authors: "Mensah, S., Addo, G., & Boateng, E.",
    year: "2022",
    volume: "Vol. 51, Issue 3, pp. 1567-1584",
    category: "sexuality",
    abstract: "This study explores how cultural factors shape sexual attitudes and behaviors in Ghana, examining the influence of traditional values, religious beliefs, and changing social norms. The research highlights the complex interplay between cultural heritage and contemporary influences in shaping sexuality."
  },
  
  // Marriage Research Publications
  {
    title: "Relationship Satisfaction Among Ghanaian Couples: A Mixed-Methods Study",
    journal: "Journal of Marriage and Family",
    authors: "Addo, G., Mensah, S., & Boateng, E.",
    year: "2024",
    volume: "Vol. 86, Issue 3, pp. 789-805",
    category: "marriage",
    abstract: "This mixed-methods study investigates factors contributing to relationship satisfaction among Ghanaian couples. Through surveys and in-depth interviews, the research identifies key dimensions of relationship quality, including communication, conflict resolution, and emotional intimacy, that predict satisfaction in the Ghanaian context."
  },
  {
    title: "The Impact of Technology on Marital Communication",
    journal: "Journal of Family Communication",
    authors: "Osei, J., Mensah, S., & Kwame, D.",
    year: "2023",
    volume: "Vol. 21, Issue 1, pp. 112-129",
    category: "marriage",
    abstract: "This study examines how digital technology influences communication patterns and relationship quality in marriages. Findings suggest that technology can both enhance and hinder marital communication, depending on how couples integrate digital tools into their relationship."
  },
  {
    title: "Premarital Counseling in Ghana: Practices and Outcomes",
    journal: "Journal of Couple & Relationship Therapy",
    authors: "Addo, G., Boateng, E., & Osei, J.",
    year: "2023",
    volume: "Vol. 22, Issue 2, pp. 156-172",
    category: "marriage",
    abstract: "This research evaluates premarital counseling practices in Ghana and their impact on relationship outcomes. The study examines different approaches to premarital preparation, including religious, cultural, and secular programs, and assesses their effectiveness in preparing couples for marriage."
  },
  {
    title: "Cultural Influences on Mate Selection in Contemporary Ghana",
    journal: "Journal of Cross-Cultural Psychology",
    authors: "Mensah, S., Addo, G., & Kwame, D.",
    year: "2022",
    volume: "Vol. 53, Issue 4, pp. 423-440",
    category: "marriage",
    abstract: "This study investigates how cultural factors influence partner choice and mate selection processes in contemporary Ghana. The research examines the evolving balance between traditional practices and modern approaches to finding a spouse, highlighting generational differences and urban-rural variations."
  },
  
  // Family Research Publications
  {
    title: "Parenting Practices and Child Development in Urban Ghana",
    journal: "Child Development Research",
    authors: "Boateng, E., Kwame, D., & Owusu, A.",
    year: "2023",
    volume: "Vol. 12, Issue 4, pp. 321-338",
    category: "family",
    abstract: "This longitudinal study examines the relationship between parenting practices and child development outcomes in urban Ghanaian families. The research identifies specific parenting behaviors that promote positive developmental trajectories in cognitive, social, and emotional domains."
  },
  {
    title: "Parenting in the Digital Age: Challenges for Ghanaian Families",
    journal: "Journal of Family Issues",
    authors: "Boateng, E., Addo, G., & Mensah, S.",
    year: "2023",
    volume: "Vol. 44, Issue 2, pp. 178-195",
    category: "family",
    abstract: "This study investigates how digital technology influences parenting practices and family dynamics in contemporary Ghanaian families. The research highlights challenges parents face in managing children's screen time, monitoring online activities, and modeling healthy technology use."
  },
  {
    title: "Family Resilience During Economic Hardship: A Qualitative Study",
    journal: "Family Process",
    authors: "Kwame, D., Boateng, E., & Osei, J.",
    year: "2022",
    volume: "Vol. 61, Issue 3, pp. 845-862",
    category: "family",
    abstract: "This qualitative study examines how families cope with and adapt to economic challenges in Ghana. Through in-depth interviews with families experiencing financial hardship, the research identifies key resilience factors that help families maintain functioning and well-being despite adversity."
  },
  {
    title: "Cultural Influences on Parenting Styles in Ghana",
    journal: "Journal of Cross-Cultural Psychology",
    authors: "Mensah, S., Boateng, E., & Addo, G.",
    year: "2022",
    volume: "Vol. 53, Issue 2, pp. 245-262",
    category: "family",
    abstract: "This study explores how cultural factors shape parenting approaches in Ghana, examining the influence of traditional values, religious beliefs, and changing social norms. The research highlights the complex interplay between cultural heritage and contemporary influences in shaping parenting practices."
  }
];

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filter publications based on search term and category
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || pub.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

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
                Research Publications
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Explore our published research on sexuality, marriage, and family life.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-background" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}></div>
      </section>

      {/* Publications Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto mb-16"
          >
            <motion.div variants={fadeIn} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="heading-2 mb-2">Our Publications</h2>
                <p className="text-muted-foreground">Sharing our research findings with the academic community and the public</p>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search publications..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mb-8">
              <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All Publications</TabsTrigger>
                  <TabsTrigger value="sexuality">Sexuality</TabsTrigger>
                  <TabsTrigger value="marriage">Marriage</TabsTrigger>
                  <TabsTrigger value="family">Family</TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              className="space-y-6"
            >
              {filteredPublications.length > 0 ? (
                filteredPublications.map((publication, index) => (
                  <motion.div key={index} variants={fadeIn} className="bg-muted/30 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">{publication.title}</h3>
                    <div className="space-y-2 text-muted-foreground mb-4">
                      <p>{publication.authors}</p>
                      <p>{publication.journal}, {publication.year}</p>
                      <p>{publication.volume}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{publication.abstract}</p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" className="flex items-center">
                          View Article <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href="#" className="flex items-center">
                          Download PDF <Download className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No publications found matching your search criteria.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Our Research Areas</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Explore our key areas of investigation
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="card-hover">
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">
                    <BookOpen className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Sex & Sexuality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our sexuality research explores human sexuality through biological, psychological, social, and cultural lenses.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/research/sexuality">
                      Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="card-hover">
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">
                    <Heart className="h-10 w-10 text-accent" />
                  </div>
                  <CardTitle>Dating & Marriage</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our relationship research investigates dynamics, patterns, and factors that contribute to relationship success.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/research/marriage">
                      Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeIn} whileHover={{ y: -5 }} className="card-hover">
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-4">
                    <Users className="h-10 w-10 text-secondary" />
                  </div>
                  <CardTitle>Family Life & Parenting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Our family research studies dynamics, parenting practices, and their impact on child development and family well-being.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href="/research/family">
                      Explore Research <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
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
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-6">Support Our Research</motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Your contribution helps us continue our vital research and share our findings with the world.
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