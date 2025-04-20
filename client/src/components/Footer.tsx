import { Link } from 'wouter';
import { 
  Wind, 
  Mail, 
  Phone, 
  MapPin,
  Compass,
  Sun,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer className="relative bg-slate-50 border-t border-slate-100 text-slate-700 py-12 mt-12">      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <Wind className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-2 text-primary" style={{ fontFamily: "'Permanent Marker', cursive" }}>Downwindr</h3>
            <p className="text-slate-600 mb-6">Discover. Learn. Connect</p>
            {/* <div className="flex space-x-4">
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary/20 transition-all duration-300 cursor-pointer">
                <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary/20 transition-all duration-300 cursor-pointer">
                <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
              <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center hover:bg-primary/20 transition-all duration-300 cursor-pointer">
                <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
            </div> */}
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold font-heading mb-5 flex items-center text-primary">
              <Compass className="w-5 h-5 mr-2 text-primary" />
              Explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <div className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center cursor-pointer">
                    <span className="bg-primary/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                    Find Spots
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center cursor-pointer">
                    <span className="bg-primary/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                    Community
                  </div>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold font-heading mb-5 flex items-center text-primary">
              <Sun className="w-5 h-5 mr-2 text-primary" />
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/">
                  <div className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center cursor-pointer">
                    <span className="bg-primary/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                    Kitesurfing Guide
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <div className="text-slate-600 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center cursor-pointer">
                    <span className="bg-primary/20 w-1.5 h-1.5 rounded-full mr-2"></span>
                    Equipment Reviews
                  </div>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold font-heading mb-5 flex items-center text-primary">
              <Globe className="w-5 h-5 mr-2 text-primary" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="text-slate-600 flex items-center bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                <Mail className="w-5 h-5 mr-3 text-primary" /> 
                <span>info@downwindr.com</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <div className="mt-1 pt-1 text-center text-slate-500 text-sm relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <p>&copy; {new Date().getFullYear()} Downwindr. All rights reserved.</p>
            {/* <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/">
                <div className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</div>
              </Link>
              <Link href="/">
                <div className="hover:text-primary cursor-pointer transition-colors">Terms of Service</div>
              </Link>
              <Link href="/">
                <div className="hover:text-primary cursor-pointer transition-colors">Cookie Policy</div>
              </Link>
            </div> */}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
