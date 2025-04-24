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
import KitesurferIllustration from "@/components/KitesurferIllustration";
import { Button } from "@/components/ui/button";

export default function Home() {
  // We'll use regular Link instead of motion(Link)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section with contained illustration */}
        <section className="relative py-24 md:py-28 lg:py-32 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 overflow-hidden">
          {/* Background wave pattern */}
          <div className="absolute inset-0 z-0 opacity-15">
            <svg 
              className="absolute bottom-0 left-0 w-full opacity-20" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1440 320"
            >
              <path 
                fill="#0099ff" 
                fillOpacity="1" 
                d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,176C672,171,768,117,864,101.3C960,85,1056,107,1152,133.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
            <svg 
              className="absolute top-0 left-0 w-full opacity-10 rotate-180" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 1440 320"
            >
              <path 
                fill="#0099ff" 
                fillOpacity="1" 
                d="M0,96L48,106.7C96,117,192,139,288,128C384,117,480,75,576,80C672,85,768,139,864,154.7C960,171,1056,149,1152,122.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
          
          {/* Main container for layout */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center">
              
              {/* Left content - Text area */}
              <div className="w-full lg:w-1/2 mb-10 lg:mb-0 z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/70 backdrop-blur-md p-8 md:p-10 rounded-xl shadow-lg border border-white"
                >
                  <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl mb-6 text-ocean-blue font-bold"                  >
                    Catch the Perfect Wind
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed"
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
                        size="default" 
                        className="font-medium shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        🌎 Find Your Spot
                      </Button>
                    </Link>
                    <Link href="/learn">
                      <Button 
                        variant="outline" 
                        size="default" 
                        className="backdrop-blur-sm font-medium"
                      >
                        Join the Ride <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              
              {/* Right content - Illustration area */}
              <div className="w-full lg:w-1/2 lg:absolute lg:right-0 lg:top-0 lg:bottom-0 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative h-full flex items-center"
                >
                  {/* Position the illustration to fill the right side but stay contained */}
                  <div className="absolute lg:-right-32 lg:-top-10 lg:bottom-0 lg:w-[700px] w-full flex items-center">
                    <KitesurferIllustration className="w-full h-auto" />
                  </div>
                </motion.div>
              </div>
              
              {/* Wind indicator animations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute right-0 bottom-0 left-0 h-20 pointer-events-none"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    className="absolute h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                    style={{ 
                      bottom: `${10 + i * 10}%`,
                      left: 0,
                      right: 0,
                      height: '2px',
                    }}
                    animate={{
                      x: ['-100%', '100%'],
                      transition: {
                        repeat: Infinity,
                        duration: 5 + i,
                        ease: 'linear'
                      }
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>
        
      </main>
      
      <Footer />
    </div>
  );
}