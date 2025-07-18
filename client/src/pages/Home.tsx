import kitesurfingHeroImage from "@/assets/kitesurfing-hero.jpg";
import Footer from "@/components/Footer";
import SEOHelmet from "@/components/SEOHelmet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Home() {
  // We'll use regular Link instead of motion(Link)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Downwindr",
    "url": "https://downwindr.com",
    "description": "Discover the world's best kitesurfing spots with real-time conditions, community reviews, and personalized recommendations.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://downwindr.com/spots?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHelmet
        title="Downwindr - Discover the World's Best Kitesurfing Spots"
        description="Find and explore the best kitesurfing spots worldwide. Get real-time wind conditions, community reviews, and personalized recommendations for your perfect kiting adventure."
        keywords="kitesurfing spots, kiteboarding locations, wind conditions, kite surfing, water sports, surf spots, travel, adventure sports"
        ogTitle="Downwindr - Your Guide to the World's Best Kitesurfing Spots"
        ogDescription="Join thousands of kiters discovering amazing spots worldwide. Get real-time conditions, read community reviews, and find your perfect kiting destination."
        structuredData={structuredData}
      />
      <main className="flex-grow">
        {/* Hero Section with kitesurfing image as full background */}
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden min-h-[80vh] flex items-center">
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
              <div className="w-full lg:w-3/5 mb-12 lg:mb-0 z-10 mx-auto lg:mx-0">
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
                    className="text-4xl md:text-5xl lg:text-6xl mb-8 text-white font-bold text-shadow-lg"
                  >
                    Catch the Perfect Wind
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed text-shadow"
                  >
                    Plan your next kitesurfing trip, discover epic spots, and
                    join a global wind fam.
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
                        className="text-white border-2 border-white bg-white/40 backdrop-blur-sm font-bold hover:bg-white hover:text-cyan-900 hover:border-white transition-all duration-300"
                      >
                        Join the Community <ArrowRight className="w-4 h-4 ml-2" />
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
