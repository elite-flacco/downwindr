import { useState } from 'react';
import { Link } from 'wouter';
import { Wind } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-primary mr-2">
            <Wind className="w-8 h-8" />
          </div>
          <Link href="/">
            <h1 className="text-2xl font-bold font-heading text-neutral-dark cursor-pointer">KiteSpotter</h1>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <a className="font-semibold text-neutral-dark hover:text-primary transition">Home</a>
          </Link>
          <Link href="/">
            <a className="font-semibold text-neutral-dark hover:text-primary transition">Spots</a>
          </Link>
          <Link href="/">
            <a className="font-semibold text-neutral-dark hover:text-primary transition">Community</a>
          </Link>
          <Link href="/">
            <a className="font-semibold text-neutral-dark hover:text-primary transition">About</a>
          </Link>
        </nav>
        
        <div className="md:hidden">
          <button 
            className="text-neutral-dark p-2" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
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
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white w-full py-2 shadow-md">
          <nav className="container mx-auto px-4 flex flex-col space-y-3">
            <Link href="/">
              <a className="font-semibold text-neutral-dark hover:text-primary transition py-2 border-b border-neutral-light">Home</a>
            </Link>
            <Link href="/">
              <a className="font-semibold text-neutral-dark hover:text-primary transition py-2 border-b border-neutral-light">Spots</a>
            </Link>
            <Link href="/">
              <a className="font-semibold text-neutral-dark hover:text-primary transition py-2 border-b border-neutral-light">Community</a>
            </Link>
            <Link href="/">
              <a className="font-semibold text-neutral-dark hover:text-primary transition py-2">About</a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
