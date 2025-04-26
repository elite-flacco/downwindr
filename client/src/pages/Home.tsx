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
import TestImage from "@/components/TestImage";
import kitesurfingHeroImage from "@/assets/kitesurfing-hero.jpg";
import joinTheRideImage from "@/assets/join-the-ride.png";
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
                  className="max-w-2xl"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white font-bold text-shadow-lg"
                  >
                    Catch the Perfect Wind
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 mb-16 leading-relaxed text-shadow"
                  >
                    Plan your next kitesurfing trip, discover epic spots, and join a global wind fam.
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
                        className="font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        🌎 Find Your Spot
                      </Button>
                    </Link>
                    <Link href="/community">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="relative overflow-hidden flex items-center gap-1.5 px-6 py-5 group text-white"
                        style={{
                          backgroundImage: `url(${joinTheRideImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: 'none',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        <span className="relative z-10 font-bold">Join the Ride</span> <ArrowRight className="w-4 h-4 ml-1 relative z-10" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-200" />
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

        {/* Debug section for image testing */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="mb-4">Image Debug</h2>
            <TestImage />
          </div>
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
}