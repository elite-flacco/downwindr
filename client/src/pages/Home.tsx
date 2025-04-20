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
                    className="text-4xl md:text-5xl lg:text-6xl mb-6 text-ocean-blue font-bold"
                    style={{ fontFamily: "'Permanent Marker', cursive" }}
                  >
                    Catch the Perfect Wind
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed"
                  >
                    Discover the world's best kitesurfing spots with real-time wind conditions, 
                    seasonal recommendations, and local insights.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link href="/spots">
                      <Button 
                        size="lg" 
                        className="bg-ocean-blue hover:bg-primary/90 text-white font-medium px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Find Spots <Map className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/learn">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="bg-white/80 backdrop-blur-sm border-ocean-blue text-ocean-blue hover:bg-blue-50 font-medium px-8 py-6"
                      >
                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
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
        
        {/* Features Section */}
        <section className="py-16 bg-gradient-to-b from-white to-blue-50/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 
                  className="text-3xl md:text-4xl font-bold text-ocean-dark mb-4"
                >
                  Why Downwindr?
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                  We help kitesurfers of all levels find their ideal riding conditions with our 
                  comprehensive tools and community-driven insights.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <motion.div 
                className="bg-white p-8 rounded-xl border border-slate-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-ocean-gradient rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-ocean-dark mb-4">Interactive Spot Map</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Explore a global map of kitesurfing locations with detailed wind data, seasonal 
                  recommendations, and local tips.
                </p>
                <Link href="/spots">
                  <motion.div 
                    className="text-primary font-medium flex items-center cursor-pointer group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>Explore spots</span> 
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </Link>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="bg-white p-8 rounded-xl border border-slate-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-ocean-gradient rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-ocean-dark mb-4">Community Insights</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Connect with fellow kitesurfers, share experiences, and get real-time updates
                  about conditions at popular spots.
                </p>
                <Link href="/community">
                  <motion.div 
                    className="text-primary font-medium flex items-center cursor-pointer group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>Join community</span> 
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </Link>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="bg-white p-8 rounded-xl border border-slate-100 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-ocean-gradient rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <Sun className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-ocean-dark mb-4">Seasonal Planning</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Plan your kitesurfing trips with confidence using our monthly wind quality data
                  and seasonal recommendations.
                </p>
                <Link href="/spots">
                  <motion.div 
                    className="text-primary font-medium flex items-center cursor-pointer group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>Check seasons</span> 
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section with Icons */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-ocean-dark mb-4">
                  Make Better Kitesurfing Plans
                </h2>
                <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Downwindr helps you make informed decisions before you travel. Know where and when to
                  go for the best kitesurfing conditions, so you can maximize your time on the water.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                      <Anchor className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-ocean-dark mb-2">Reliable Data</h3>
                      <p className="text-slate-600">Trusted wind information collected from multiple sources</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                      <ShieldCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-ocean-dark mb-2">Safety First</h3>
                      <p className="text-slate-600">Spot hazards and safety considerations highlighted</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                      <Star className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-ocean-dark mb-2">Expert Reviews</h3>
                      <p className="text-slate-600">Insights from experienced kitesurfers at each location</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-lg mr-4">
                      <Waves className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-ocean-dark mb-2">Wave Conditions</h3>
                      <p className="text-slate-600">Detailed information on wave types and heights</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2 bg-blue-50 rounded-2xl p-1 overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-ocean-blue to-primary h-full w-full rounded-xl overflow-hidden relative py-16 px-8">
                  <div className="absolute top-0 left-0 w-full h-full opacity-20">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#FFFFFF" d="M41.3,-69.3C55.4,-63.5,69.9,-55.1,78.9,-42.3C87.8,-29.6,91.3,-12.4,88.6,3.4C85.9,19.1,77.1,33.5,67.1,47.4C57.1,61.3,45.8,74.6,31.8,80.2C17.9,85.8,1.2,83.6,-15.8,80.1C-32.8,76.6,-50.2,71.8,-61.3,60.8C-72.4,49.8,-77.3,32.6,-79.3,15.6C-81.4,-1.4,-80.5,-18.2,-74.4,-32.8C-68.2,-47.5,-56.7,-60.1,-43.1,-66.3C-29.4,-72.6,-14.7,-72.5,-0.4,-71.9C14,-71.3,27.2,-75.1,41.3,-69.3Z" transform="translate(100 100)" />
                    </svg>
                  </div>
                  
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      Ready to Discover Your Next Destination?
                    </h3>
                    <p className="text-white/90 mb-8 leading-relaxed text-lg max-w-lg mx-auto">
                      Join thousands of kitesurfers who use Downwindr to plan their perfect trips.
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link href="/spots">
                        <Button 
                          size="lg" 
                          className="bg-white text-primary hover:bg-white/90 font-medium px-8 shadow-lg"
                        >
                          Explore Spots <Map className="w-5 h-5 ml-2" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-ocean-dark z-0"></div>
          
          {/* Wave overlay */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
              <path fill="#ffffff" fillOpacity="0.2" d="M0,192L48,176C96,160,192,128,288,117.3C384,107,480,117,576,144C672,171,768,213,864,213.3C960,213,1056,171,1152,149.3C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 
                className="text-3xl md:text-5xl font-bold text-white mb-6"
              >
                Ready to Catch the Perfect Wind?
              </h2>
              <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
                Start exploring the best kitesurfing spots around the world and plan your next adventure!
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/spots">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-white/90 font-medium px-10 py-7 text-lg shadow-xl"
                  >
                    Find Kitesurfing Spots <Compass className="w-6 h-6 ml-2" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}