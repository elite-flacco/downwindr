import { useState } from 'react';
import { Link } from 'wouter';
import { Wind, Compass, Users, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-ocean-blue to-ocean-dark shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center cursor-pointer" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-white p-2 rounded-full mr-3 shadow-md">
              <Wind className="w-8 h-8 text-ocean-blue" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-heading text-white">KiteSpotter</h1>
              <p className="text-xs text-white text-opacity-80">Find Your Perfect Wind</p>
            </div>
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex space-x-1">
          <Link href="/">
            <motion.a 
              className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Wind className="w-4 h-4 mr-2" />
              Home
            </motion.a>
          </Link>
          <Link href="/">
            <motion.a 
              className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Compass className="w-4 h-4 mr-2" />
              Spots
            </motion.a>
          </Link>
          <Link href="/">
            <motion.a 
              className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </motion.a>
          </Link>
          <Link href="/">
            <motion.a 
              className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-2 rounded-md transition-colors duration-200 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Info className="w-4 h-4 mr-2" />
              About
            </motion.a>
          </Link>
        </nav>
        
        <div className="md:hidden">
          <motion.button 
            className="text-white p-2 rounded-lg bg-white bg-opacity-20" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.9 }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden bg-ocean-blue w-full py-2 shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 flex flex-col space-y-3 py-3">
            <Link href="/">
              <a className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-md transition-colors duration-200 flex items-center">
                <Wind className="w-5 h-5 mr-3" />
                Home
              </a>
            </Link>
            <Link href="/">
              <a className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-md transition-colors duration-200 flex items-center">
                <Compass className="w-5 h-5 mr-3" />
                Spots
              </a>
            </Link>
            <Link href="/">
              <a className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-md transition-colors duration-200 flex items-center">
                <Users className="w-5 h-5 mr-3" />
                Community
              </a>
            </Link>
            <Link href="/">
              <a className="font-medium text-white hover:bg-white hover:bg-opacity-20 px-4 py-3 rounded-md transition-colors duration-200 flex items-center">
                <Info className="w-5 h-5 mr-3" />
                About
              </a>
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
