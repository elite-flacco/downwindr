import { Link } from 'wouter';
import { 
  Wind, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-2">
              <Wind className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold font-heading">KiteSpotter</h3>
            </div>
            <p className="text-gray-300 mb-4">Connecting kitesurfing enthusiasts with the best spots worldwide.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-white hover:text-secondary transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-heading mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Find Spots</a></Link></li>
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Spot Map</a></Link></li>
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Community</a></Link></li>
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Events</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-heading mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Kitesurfing Guide</a></Link></li>
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Weather Conditions</a></Link></li>
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Equipment Reviews</a></Link></li>
              <li><Link href="/"><a className="text-gray-300 hover:text-secondary transition">Travel Tips</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold font-heading mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="text-gray-300 flex items-center">
                <Mail className="w-4 h-4 mr-2" /> info@kitespotter.com
              </li>
              <li className="text-gray-300 flex items-center">
                <Phone className="w-4 h-4 mr-2" /> +1 (123) 456-7890
              </li>
              <li className="text-gray-300 flex items-center">
                <MapPin className="w-4 h-4 mr-2" /> Worldwide
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} KiteSpotter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
