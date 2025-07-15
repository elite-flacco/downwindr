import { Link } from 'wouter';
import { 
  Wind, 
  Mail, 
  Phone, 
  MapPin,
  Compass,
  Info,
  Sun,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        // staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <footer className="relative splash-divider text-theme-text pt-16 pb-8 bg-gradient-to-br from-theme-background to-theme-surface/30">      
      {/* <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-theme-primary-hover/10 via-theme-primary-hover to-theme-primary-hover/10 opacity-40"></div>
       */}
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-r from-theme-secondary to-theme-secondary/60 text-theme-background shadow-lg p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-md">
              <Wind className="w-8 h-8 text-theme-background" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-theme-primary">Downwindr</h3>
            <p className="text-theme-text text-xs mb-4">Discover your dream kitesurfing experience worldwide.</p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="mb-6 flex items-center">
              <Compass className="w-5 h-5 mr-2 text-theme-primary-hover" />
              Explore
            </h4>
            <ul className="space-y-4 font-semibold">
              <li>
                <Link href="/spots">
                  <motion.div 
                    className="text-theme-text text-sm hover:text-theme-primary group flex items-center cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="h-0.5 w-4 bg-theme-primary-hover/40 mr-3 group-hover:bg-theme-primary transition-colors"></span>
                    Find Spots
                    <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              </li>
              <li>
                <Link href="/community">
                  <motion.div 
                    className="text-theme-text text-sm hover:text-theme-primary group flex items-center cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="h-0.5 w-4 bg-theme-primary-hover/40 mr-3 group-hover:bg-theme-primary transition-colors"></span>
                    Community
                    <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="mb-6 flex items-center">
              <Info className="w-5 h-5 mr-2 text-theme-primary-hover" />
              Resources
            </h4>
            <ul className="space-y-4 font-semibold">
              <li>
                <Link href="/learn">
                  <motion.div 
                    className="text-theme-text text-sm hover:text-theme-primary group flex items-center cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="h-0.5 w-4 bg-theme-primary-hover/40 mr-3 group-hover:bg-theme-primary transition-colors"></span>
                    Tutorials
                    <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <h4 className="mb-6 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-theme-primary-hover" />
              Get in Touch
            </h4>
            <ul className="space-y-4 font-semibold">
              <li>
                <Link href="/contact">
                  <motion.div 
                    className="text-theme-text text-sm hover:text-theme-primary group flex items-center cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="h-0.5 w-4 bg-theme-primary-hover/40 mr-3 group-hover:bg-theme-primary transition-colors"></span>
                    Send Us a Message
                    <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              </li>
              {/* <li>
                <Link href="/about">
                  <motion.div 
                    className="text-theme-text-light hover:text-theme-primary group flex items-center cursor-pointer text-[15px]"
                    whileHover={{ x: 5 }}
                  >
                    <span className="h-0.5 w-4 bg-theme-primary-hover/40 mr-3 group-hover:bg-theme-primary transition-colors"></span>
                    About Us
                    <ArrowUpRight className="w-3 h-3 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </Link>
              </li> */}
            </ul>
            
          </motion.div>
        </motion.div>
        
        <div className="mt-8 pt-8 text-center text-theme-text-light text-sm relative">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-border to-transparent"></div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <p>&copy; {new Date().getFullYear()} Downwindr. All rights reserved.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
