import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Wind, Compass, Users, Info, Menu, X, Map, Activity, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`bg-white border-b border-sky/10 w-full transition-all duration-300 ${
        scrolled ? "sticky top-0 z-50 shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-sky-gradient p-2 rounded-full mr-3 shadow-md">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-electric" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                Downwindr <span className="inline-block animate-bounce">🏄‍♂️</span>
              </h1>
              <p className="text-xs text-navy/70 font-medium">Ride the perfect breeze 💨</p>
            </div>
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex space-x-2">
          <Link href="/">
            <motion.div 
              className={`font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                location === "/" 
                  ? "bg-electric text-white shadow-md" 
                  : "text-navy hover:text-electric hover:bg-sky/10"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Wind className="w-4 h-4 mr-2" />
              Home
            </motion.div>
          </Link>
          <Link href="/spots">
            <motion.div 
              className={`font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                location === "/spots" 
                  ? "bg-electric text-white shadow-md" 
                  : "text-navy hover:text-electric hover:bg-sky/10"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Map className="w-4 h-4 mr-2" />
              Spots
            </motion.div>
          </Link>
          <Link href="/community">
            <motion.div 
              className={`font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                location === "/community" 
                  ? "bg-electric text-white shadow-md" 
                  : "text-navy hover:text-electric hover:bg-sky/10"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </motion.div>
          </Link>
          <Link href="/learn">
            <motion.div 
              className={`font-medium px-4 py-2 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                location === "/learn" 
                  ? "bg-electric text-white shadow-md" 
                  : "text-navy hover:text-electric hover:bg-sky/10"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <Sun className="w-4 h-4 mr-2" />
              Learn
            </motion.div>
          </Link>
        </nav>
        
        <div className="md:hidden">
          <motion.button 
            className="text-electric p-2 rounded-lg hover:bg-sky/10" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white w-full py-2 shadow-md border-t border-sky/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto px-4 flex flex-col space-y-2 py-2">
              <Link href="/">
                <motion.div 
                  className={`font-medium px-4 py-3 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/" 
                      ? "bg-electric text-white" 
                      : "text-navy hover:text-electric hover:bg-sky/10"
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 0 }}
                >
                  <Wind className={`w-5 h-5 mr-3 ${location === "/" ? "text-white" : "text-electric"}`} />
                  Home
                </motion.div>
              </Link>
              <Link href="/spots">
                <motion.div 
                  className={`font-medium px-4 py-3 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/spots" 
                      ? "bg-electric text-white" 
                      : "text-navy hover:text-electric hover:bg-sky/10"
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 0 }}
                >
                  <Map className={`w-5 h-5 mr-3 ${location === "/spots" ? "text-white" : "text-electric"}`} />
                  Spots
                </motion.div>
              </Link>
              <Link href="/community">
                <motion.div 
                  className={`font-medium px-4 py-3 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/community" 
                      ? "bg-electric text-white" 
                      : "text-navy hover:text-electric hover:bg-sky/10"
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 0 }}
                >
                  <Users className={`w-5 h-5 mr-3 ${location === "/community" ? "text-white" : "text-electric"}`} />
                  Community
                </motion.div>
              </Link>
              <Link href="/learn">
                <motion.div 
                  className={`font-medium px-4 py-3 rounded-md transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/learn" 
                      ? "bg-electric text-white" 
                      : "text-navy hover:text-electric hover:bg-sky/10"
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 0 }}
                >
                  <Sun className={`w-5 h-5 mr-3 ${location === "/learn" ? "text-white" : "text-electric"}`} />
                  Learn
                </motion.div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
