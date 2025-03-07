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

export default function MediaPage() {
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
                Media & Resources
              </motion.h1>
              <motion.p 
                variants={fadeIn}
                className="text-xl mb-8 text-white/90"
              >
                Explore our videos, photos, news, and resources on sexuality, marriage, and family life.
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-background" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}></div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="section-padding">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Featured Videos</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Watch our educational videos on sexuality, marriage, and family life
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
          >
            <motion.div variants={fadeIn} className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl group">
              <Image 
                src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80" 
                alt="Building Stronger Marriages" 
                fill
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <div className="bg-primary/80 rounded-full p-4 inline-flex mb-4 group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2">Building Stronger Marriages</h3>
                  <p className="text-white/80 mb-4">A comprehensive guide to strengthening your marriage through effective communication and conflict resolution.</p>
                  <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                    Watch Now
                  </Button>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="space-y-6">
              <h3 className="heading-3 mb-4">Our Video Library</h3>
              <p className="paragraph mb-6">
                Our video library contains a wealth of educational content on sexuality, marriage, and family life. From expert interviews to practical guides, our videos provide valuable insights and strategies for building healthy relationships and families.
              </p>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Effective Communication in Relationships",
                    duration: "15:24",
                    thumbnail: "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  },
                  {
                    title: "Parenting in the Digital Age",
                    duration: "18:37",
                    thumbnail: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                  },
                  {
                    title: "Understanding Human Sexuality",
                    duration: "22:15",
                    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  }
                ].map((video, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
                      <Image 
                        src={video.thumbnail} 
                        alt={video.title} 
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{video.title}</h4>
                      <p className="text-xs text-muted-foreground">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button asChild>
                <Link href="/media/videos">
                  View All Videos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeIn} className="heading-2 mb-4">Photo Gallery</motion.h2>
            <motion.p variants={fadeIn} className="paragraph text-muted-foreground">
              Images from our events, workshops, and community activities
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <Tabs defaultValue="events" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="workshops">Workshops</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
              
              <TabsContent value="events" className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
                    "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
                    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  ].map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image 
                        src={image} 
                        alt={`Event photo ${index + 1}`} 
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="workshops" className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1516058575735-399a011dca3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
                    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1529390079861-591de354faf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  ].map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image 
                        src={image} 
                        alt={`Workshop photo ${index + 1}`} 
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="community" className="space-y-8">
                <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[
                    "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80"
                  ].map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                      <Image 
                        src={image} 
                        alt={`Community photo ${index + 1}`} 
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button variant="outline" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                          View Full Size
                        </Button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}