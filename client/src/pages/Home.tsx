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
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-12 md:py-20 lg:py-24">
          {/* Enhanced background with lighter gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-sky-50 to-cyan-100/50 z-0"></div>
          
          {/* Subtle wave pattern background */}
          <div className="absolute inset-0 z-0 opacity-5" 
               style={{ 
                 backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264.888-.14 1.24.19 1.64.39 1.85.39.41 0 1.12-.41 1.22-.4.11.01 1.85.2 2.08.15.23-.05 1.02-.4 1.2-.47.19-.05.48-.36.69-.14.18.11.95.13 1.11.22.18.1.91.24 1.06.11.16-.12.2-.1.38-.1.78 0 1.62.5 1.81.02.2-.47.06-.47.89-.47.55 0 .31.21.54.57.36.57 1.21.79 2.01.79.39 0 .24-.09.77-.17.65-.09 1.29.03 1.5-.41.12-.29.23-.21.62-.14.11.03.46.17.57.08.19-.14.14-.18.67-.04.77.21 1.75.17 2.51.22.41.03.56-.16.8-.38.13-.14.27-.17.44-.13.1.01.32.18.44.16.6-.01 1.07-.21 1.49-.56.14-.13.13-.36.51-.27.11.01.5.3.71.22.14-.06.34-.14.65-.14.35-.01.4.33.58.26.1-.05.16-.1.44-.1.38-.01.34.08.34.17.03.22.42.11.6.18.08.02.25.14.37.19.21.1.44.19.73.19.29 0 .36-.08.52-.25.14-.14.25-.22.51-.16.12.03.24.08.45.08.57.06.14-.13.25-.13.11 0 .09.12.53.11.33-.01.42-.14.57-.28.13-.13.29-.18.59-.18.21 0 .38.02.62.02.19 0 .31-.21.53-.23.17-.04.31.09.5.09.16 0 .29-.09.53.03.16.08.15.18.49.18.4 0 .66-.26.85-.48.05-.05.27 0 .42 0 .38 0 .76-.26.97-.4.11-.07.12.03.31.03.19 0 .48-.28.67-.35.49-.17.53.02 1.04-.08.47-.1.67-.3.99-.44.29-.12.4-.04.65-.04.26 0 .42-.17.67-.31.25-.15.3.05.42-.16.04-.07.11-.06.22-.13.1-.07.37-.17.5-.25.31-.17.74-.14.89-.37.03-.06.52-.14.62-.19.26-.12.08-.36.41-.41.19-.03.26.22.55.22.12 0 .25-.1.37-.1.12 0 .24.22.35.22.11 0 .23-.09.42-.17.19-.07.42-.18.58-.18.17 0 .3.18.53.19.22.01.28-.14.43-.28.14-.12.41-.23.42-.4' fill='%2306b6d4' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E\")",
                 backgroundSize: "cover"
               }}></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 opacity-10">
            <Wind className="w-24 h-24 text-primary/30" />
          </div>
          <div className="absolute bottom-10 left-10 opacity-10">
            <Cloud className="w-16 h-16 text-primary/20" />
          </div>
          
          {/* Main content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 
                    className="text-4xl md:text-5xl lg:text-6xl mb-4 text-primary"
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                  >
                    Catch the Perfect Wind
                  </h1>
                  
                  <p className="text-lg md:text-xl text-slate-600 mb-8">
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
              
              {/* Illustration container that is larger and positioned to fill the right side of the page */}
              <div className="md:w-1/2 relative">
                {/* Position the illustration to overflow the container */}
                <div className="relative md:absolute md:-right-24 md:-top-24 md:-bottom-24 md:left-0">
                  {/* Floating effect for the illustration */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: 0.4,
                      ease: "easeOut"
                    }}
                    className="relative z-10"
                  >
                    {/* The illustration - made larger with transform and negative margins */}
                    <div className="transform scale-125 md:scale-150 origin-center">
                      <KitesurferIllustration className="w-full h-auto md:max-w-2xl mx-auto relative z-10" />
                    </div>
                  </motion.div>
                </div>
              </div>
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