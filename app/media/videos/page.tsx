"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Play, FileText, ExternalLink, Download } from "lucide-react";

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

// Sample video data
const videos = [
  {
    id: 1,
    title: "Building Stronger Marriages",
    description: "A comprehensive guide to strengthening your marriage through effective communication and conflict resolution.",
    duration: "45:18",
    category: "marriage",
    thumbnail: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: true
  },
  {
    id: 2,
    title: "Effective Communication in Relationships",
    description: "Learn practical techniques for improving communication with your partner and resolving conflicts constructively.",
    duration: "15:24",
    category: "marriage",
    thumbnail: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "Parenting in the Digital Age",
    description: "Strategies for navigating the challenges of raising children in a technology-saturated world.",
    duration: "18:37",
    category: "family",
    thumbnail: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
  },
  {
    id: 4,
    title: "Understanding Human Sexuality",
    description: "An introduction to human sexuality from biological, psychological, social, and cultural perspectives.",
    duration: "22:15",
    category: "sexuality",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 5,
    title: "Positive Discipline Techniques",
    description: "Learn effective, non-punitive approaches to discipline that teach children responsibility and self-regulation.",
    duration: "19:42",
    category: "family",
    thumbnail: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 6,
    title: "Sexual Health and Wellness",
    description: "Explore the components of sexual health and strategies for maintaining sexual wellness throughout the lifespan.",
    duration: "16:53",
    category: "sexuality",
    thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 7,
    title: "Building Emotional Intimacy",
    description: "Discover practical ways to deepen emotional connection and intimacy in your relationship.",
    duration: "14:29",
    category: "marriage",
    thumbnail: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 8,
    title: "Family Resilience in Times of Crisis",
    description: "Strategies for helping families cope with and adapt to major stressors and challenges.",
    duration: "20:18",
    category: "family",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
  },
  {
    id: 9,
    title: "Sexuality Education for Parents",
    description: "Guidance for parents on providing age-appropriate sexuality education to their children.",
    duration: "17:45",
    category: "sexuality",
    thumbnail: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  }
];

export default function VideosPage() {
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
                Video Library
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Educational videos on sexuality, marriage, and family life from our expert team.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-background" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}></div>
      </section>

      {/* Featured Video Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Featured Video</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Our most popular educational content
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            {videos.filter(video => video.featured).map((video) => (
              <div key={video.id} className="relative rounded-lg overflow-hidden shadow-xl group">
                <div className="aspect-video relative">
                  <Image 
                    src={video.thumbnail} 
                    alt={video.title} 
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-white text-center p-6">
                      <div className="bg-primary/80 rounded-full p-4 inline-flex mb-4 group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{video.title}</h3>
                      <p className="text-white/80 mb-4 max-w-2xl mx-auto">{video.description}</p>
                      <div className="flex justify-center items-center mb-4">
                        <span className="text-white/70 text-sm">{video.duration}</span>
                      </div>
                      <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Categories Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Video Categories</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Browse our videos by topic
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
                <TabsTrigger value="all">All Videos</TabsTrigger>
                <TabsTrigger value="sexuality">Sexuality</TabsTrigger>
                <TabsTrigger value="marriage">Marriage</TabsTrigger>
                <TabsTrigger value="family">Family</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.map((video) => (
                    <Card key={video.id} className="overflow-hidden h-full">
                      <div className="relative aspect-video group">
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title} 
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-primary/80 rounded-full p-3 group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                        <CardDescription className="uppercase text-xs">
                          {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{video.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <a href="#">Watch Video</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="sexuality" className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.filter(video => video.category === "sexuality").map((video) => (
                    <Card key={video.id} className="overflow-hidden h-full">
                      <div className="relative aspect-video group">
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title} 
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-primary/80 rounded-full p-3 group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{video.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <a href="#">Watch Video</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="marriage" className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.filter(video => video.category === "marriage").map((video) => (
                    <Card key={video.id} className="overflow-hidden h-full">
                      <div className="relative aspect-video group">
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title} 
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-primary/80 rounded-full p-3 group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{video.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <a href="#">Watch Video</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="family" className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videos.filter(video => video.category === "family").map((video) => (
                    <Card key={video.id} className="overflow-hidden h-full">
                      <div className="relative aspect-video group">
                        <Image 
                          src={video.thumbnail} 
                          alt={video.title} 
                          fill
                          style={{ objectFit: "cover" }}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="bg-primary/80 rounded-full p-3 group-hover:scale-110 transition-transform">
                            <Play className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{video.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground line-clamp-2">{video.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <a href="#">Watch Video</a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Video Series Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Video Series</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Comprehensive educational series on key topics
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12"
          >
            {/* Marriage Series */}
            <motion.div variants={fadeIn} className="bg-muted/30 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Building Stronger Marriages Series" 
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6 md:col-span-2">
                  <h3 className="heading-4 mb-2">Building Stronger Marriages Series</h3>
                  <p className="text-muted-foreground mb-4">
                    A comprehensive 5-part series on building and maintaining a healthy, fulfilling marriage. Topics include communication, conflict resolution, emotional intimacy, and more.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium mr-2">Episodes:</span>
                      <span>5</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium mr-2">Total Duration:</span>
                      <span>2 hours 15 minutes</span>
                    </div>
                  </div>
                  <Button asChild>
                    <a href="#">
                      Watch Series <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Parenting Series */}
            <motion.div variants={fadeIn} className="bg-muted/30 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80" 
                    alt="Effective Parenting Series" 
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6 md:col-span-2">
                  <h3 className="heading-4 mb-2">Effective Parenting Series</h3>
                  <p className="text-muted-foreground mb-4">
                    A 4-part series on evidence-based parenting strategies that promote healthy child development and strong parent-child relationships.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium mr-2">Episodes:</span>
                      <span>4</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium mr-2">Total Duration:</span>
                      <span>1 hour 45 minutes</span>
                    </div>
                  </div>
                  <Button asChild>
                    <a href="#">
                      Watch Series <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Sexuality Series */}
            <motion.div variants={fadeIn} className="bg-muted/30 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative h-64 md:h-auto">
                  <Image 
                    src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Understanding Human Sexuality Series" 
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="p-6 md:col-span-2">
                  <h3 className="heading-4 mb-2">Understanding Human Sexuality Series</h3>
                  <p className="text-muted-foreground mb-4">
                    A 6-part series exploring human sexuality from biological, psychological, social, and cultural perspectives.
                  </p>
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium mr-2">Episodes:</span>
                      <span>6</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium mr-2">Total Duration:</span>
                      <span>2 hours 30 minutes</span>
                    </div>
                  </div>
                  <Button asChild>
                    <a href="#">
                      Watch Series <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
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
            <motion.h2 variants={fadeIn} className="heading-2 mb-6">Subscribe for Updates</motion.h2>
            <motion.p variants={fadeIn} className="paragraph mb-8">
              Sign up to be notified when we release new educational videos and resources.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">Subscribe Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20" asChild>
                <Link href="/media">Browse All Media</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}