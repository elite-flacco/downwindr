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
  Compass,
  Anchor,
  ShieldCheck,
  Star
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import kitesurfingHeroImage from "@/assets/kitesurfing-hero.jpg";
import { Button } from "@/components/ui/button";

export default function Home() {
  // We'll use regular Link instead of motion(Link)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with kitesurfing image as full background */}
        <section className="relative py-24 md:py-28 lg:py-32 overflow-hidden min-h-[80vh] flex items-center">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={kitesurfingHeroImage} 
              alt="Aerial view of kitesurfers on turquoise water" 
              className="w-full h-full object-cover"
            />
            {/* Darkening overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10 mix-blend-multiply"></div>
            {/* Attribution */}
            <div className="absolute bottom-2 right-2 text-white/70 text-xs bg-black/30 px-2 py-1 rounded backdrop-blur-sm z-10">
              Photo by Marcreation on Unsplash
            </div>
          </div>
          
          {/* Main container for layout */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              
              {/* Hero content - Text area */}
              <div className="w-full lg:w-3/5 mb-10 lg:mb-0 z-10 mx-auto lg:mx-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-xl border border-white"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl mb-6 text-theme-primary font-bold"
                  >
                    Catch the Perfect Wind
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed"
                  >
                    Discover the world's best kitesurfing destinations, track real-time wind conditions, 
                    and connect with the global kitesurfing community.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link href="/spots">
                      <Button 
                        variant="secondary"
                        size="lg" 
                        className="font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        🌎 Find Your Spot
                      </Button>
                    </Link>
                    <Link href="/learn">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="bg-white/50 backdrop-blur-sm font-medium hover:bg-white/80"
                      >
                        Join the Ride <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Empty space on the right side - we now have a full background image */}
              <div className="w-full lg:w-1/2"></div>
            </div>
          </div>
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
}