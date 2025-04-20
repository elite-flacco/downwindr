import { useState } from 'react';
import { Link } from 'wouter';
import { Wind, Compass, Users, Info, Menu, X, Map, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <motion.div 
              className="flex items-center" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <Wind className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-heading" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                  Downwindr <span className="inline-block animate-bounce">🏄‍♂️</span>
                </h1>
                <p className="text-xs text-slate-500">Ride the perfect breeze 💨</p>
              </div>
            </motion.div>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          <Link href="/">
            <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
              <Wind className="w-4 h-4 mr-2" />
              Home 🏠
            </div>
          </Link>
          <Link href="/spots">
            <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
              <Map className="w-4 h-4 mr-2" />
              Spots 🌊
            </div>
          </Link>
          <Link href="/community">
            <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
              <Users className="w-4 h-4 mr-2" />
              Community 👥
            </div>
          </Link>
          <Link href="/learn">
            <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-2 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
              <Activity className="w-4 h-4 mr-2" />
              Learn 📚
            </div>
          </Link>
        </nav>
        
        <div className="md:hidden">
          <motion.button 
            className="text-slate-700 p-2 rounded-lg hover:bg-slate-100" 
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
            className="md:hidden bg-white w-full py-2 shadow-inner border-t border-slate-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto px-4 flex flex-col space-y-2 py-2">
              <Link href="/">
                <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
                  <Wind className="w-5 h-5 mr-3 text-primary" />
                  Home 🏠
                </div>
              </Link>
              <Link href="/spots">
                <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
                  <Map className="w-5 h-5 mr-3 text-primary" />
                  Spots 🌊
                </div>
              </Link>
              <Link href="/community">
                <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
                  <Users className="w-5 h-5 mr-3 text-primary" />
                  Community 👥
                </div>
              </Link>
              <Link href="/learn">
                <div className="font-medium text-slate-600 hover:text-primary hover:bg-primary/5 px-4 py-3 rounded-md transition-colors duration-200 flex items-center cursor-pointer">
                  <Activity className="w-5 h-5 mr-3 text-primary" />
                  Learn 📚
                </div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
