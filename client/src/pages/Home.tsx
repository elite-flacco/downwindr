import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Wind, 
  Map, 
  Users, 
  Info, 
  ArrowRight, 
  Sun, 
  Cloud, 
  Waves,
  Compass
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KitesurferIllustration from "@/components/KitesurferIllustration";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with full blended background */}
        <section className="relative overflow-hidden pt-24 pb-40 md:pt-20 md:pb-32 lg:py-28">
          {/* Background gradient to blend with illustration */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-cyan-50/20 z-0"></div>
          
          {/* Stretched illustration as full background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <div className="absolute inset-0 md:-top-10 md:-bottom-10 md:-right-96 xl:-right-64">
              <KitesurferIllustration className="w-[200%] md:w-[140%] h-auto" />
            </div>
          </div>
          
          {/* Main content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left side text content - with backdrop for readability */}
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-xl backdrop-blur-sm bg-white/40 p-8 md:p-10 shadow-sm"
                >
                  <h1 
                    className="text-4xl md:text-5xl lg:text-6xl mb-4 text-primary"
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                  >
                    Catch the Perfect Wind
                  </h1>
                  
                  <p className="text-lg md:text-xl text-slate-700 mb-8">
                    Discover the world's best kitesurfing spots with real-time wind conditions, 
                    seasonal recommendations, and local insights.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/spots">
                      <Button 
                        size="lg" 
                        className="bg-primary hover:bg-primary/90 text-white font-medium px-6 flex items-center gap-2"
                      >
                        Find Spots <Map className="w-5 h-5" />
                      </Button>
                    </Link>
                    <Link href="/learn">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="bg-white border-slate-200 text-slate-700 hover:bg-slate-50 font-medium px-6"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              {/* Right side is now empty as we're using the illustration as background */}
              <div className="md:w-1/2"></div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 
                className="text-3xl md:text-4xl font-bold text-primary mb-4"
                style={{ fontFamily: "'Permanent Marker', cursive" }}
              >
                Why Downwindr?
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                We help kitesurfers of all levels find their ideal riding conditions with our 
                comprehensive tools and community-driven insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Map className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Interactive Spot Map</h3>
                <p className="text-slate-600 mb-4">
                  Explore a global map of kitesurfing locations with detailed wind data, seasonal 
                  recommendations, and local tips.
                </p>
                <Link href="/spots">
                  <div className="text-primary font-medium flex items-center cursor-pointer hover:underline">
                    Explore spots <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Community Insights</h3>
                <p className="text-slate-600 mb-4">
                  Connect with fellow kitesurfers, share experiences, and get real-time updates
                  about conditions at popular spots.
                </p>
                <Link href="/community">
                  <div className="text-primary font-medium flex items-center cursor-pointer hover:underline">
                    Join community <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Waves className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Seasonal Planning</h3>
                <p className="text-slate-600 mb-4">
                  Plan your kitesurfing trips with confidence using our monthly wind quality data
                  and seasonal recommendations.
                </p>
                <Link href="/spots">
                  <div className="text-primary font-medium flex items-center cursor-pointer hover:underline">
                    Check seasons <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ fontFamily: "'Permanent Marker', cursive" }}
            >
              Ready to Catch the Wind?
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-lg">
              Start exploring the best kitesurfing spots around the world and plan your next adventure!
            </p>
            <Link href="/spots">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 font-medium px-8"
              >
                Find Kitesurfing Spots <Compass className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}