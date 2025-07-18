import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Wind, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { AvatarWithRefresh } from '@/components/AvatarWithRefresh';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, navigate] = useLocation();
  const { user, userProfile, loading, signOut } = useAuth();
  
  // Handle logout click
  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    await signOut();
    
    // Close mobile menu after logout click
    setMobileMenuOpen(false);
  };

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
      className={`bg-theme-background border-b border-theme-border w-full transition-all duration-300 ${
        scrolled ? "sticky top-0 z-50 shadow-xl" : "shadow-lg"
      }`}
    >
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link href="/">
          <motion.div 
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-gradient-to-r from-theme-secondary to-theme-secondary/70 text-theme-background shadow-md p-2 hand-drawn mr-4">
              <Wind className="w-6 h-6 text-theme-background " />
            </div>
            <div>
              <p className="text-xl font-bold text-theme-primary" style={{ fontFamily: "'Permanent Marker', cursive" }}>
                Downwindr <span className="inline-block animate-bounce">🏄‍♂️</span>
              </p>
              <p className="text-xs text-theme-text font-semibold">Ride the perfect breeze 💨</p>
            </div>
          </motion.div>
        </Link>
        
        <nav className="hidden md:flex space-x-4">
          <Link href="/">
            <motion.div 
              className={`text-sm font-bold px-4 py-2 hand-drawn hand-drawn-nav transition-all duration-200 flex items-center cursor-pointer ${
                location === "/" 
                  ? "bg-theme-secondary text-white shadow-md" 
                  : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              🏖️ Back to the Beach
            </motion.div>
          </Link>
          <Link href="/spots">
            <motion.div 
              className={`text-sm font-bold px-4 py-2 hand-drawn hand-drawn-nav transition-all duration-200 flex items-center cursor-pointer ${
                location === "/spots" 
                  ? "bg-theme-secondary text-white shadow-md chalk-drawn wobbly-border" 
                  : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              📍 Where to Shred
            </motion.div>
          </Link>
          <Link href="/community">
            <motion.div 
              className={`text-sm font-bold px-4 py-2 hand-drawn hand-drawn-nav transition-all duration-200 flex items-center cursor-pointer ${
                location === "/community" 
                  ? "bg-theme-secondary text-white shadow-md chalk-drawn wobbly-border" 
                  : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              🌬️ Wind Fam
            </motion.div>
          </Link>
          <Link href="/learn">
            <motion.div 
              className={`text-sm font-bold px-4 py-2 hand-drawn transition-all duration-200 flex items-center cursor-pointer ${
                location === "/learn" 
                  ? "bg-theme-secondary text-white shadow-md hand-drawn chalk-texture chalk-drawn wobbly-border" 
                  : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
              }`}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ y: 0, scale: 0.98 }}
            >
              🎓 Skill Up
            </motion.div>
          </Link>
        </nav>
        
        {/* Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {loading ? (
            <Button variant="ghost" className="h-8 w-8 p-0">
              <div className="h-8 w-8 flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              </div>
            </Button>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <AvatarWithRefresh 
                    userAvatarUrl={userProfile?.avatarUrl}
                    userName={userProfile?.username}
                    className="h-8 w-8"
                    fallbackClassName="bg-theme-primary text-theme-background"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile?.displayName && userProfile?.displayName !== 'New User' ? userProfile?.displayName : userProfile?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button 
                variant="action" 
                className="flex items-center gap-2 px-2 py-2 relative overflow-hidden group wind-gust relative overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent_70%)]"
                size="sm"
              >
                <LogIn className="h-4 w-4 relative z-10" />
                <span className="relative z-10">Join the Ride</span>
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          {loading ? (
            <Button variant="ghost" className="h-8 w-8 p-0">
              <div className="h-8 w-8 flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              </div>
            </Button>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <AvatarWithRefresh 
                    userAvatarUrl={userProfile?.avatarUrl}
                    userName={userProfile?.username}
                    className="h-8 w-8"
                    fallbackClassName="bg-theme-primary text-theme-background"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile?.displayName && userProfile?.displayName !== 'New User' ? userProfile?.displayName : userProfile?.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2"
                size="icon"
              >
                <LogIn className="h-5 w-5" />
              </Button>
            </Link>
          )}
          
          <motion.button 
            className="text-theme-primary p-2 hand-drawn chalk-drawn wobbly-border hover:bg-theme-surface" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            whileHover={{ scale: 1.05 }}
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
            className="md:hidden bg-theme-background w-full py-2 shadow-md border-t border-theme-border"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="container mx-auto px-4 flex flex-col space-y-4 py-4">
              <Link href="/">
                <motion.div 
                  className={`text-sm font-medium px-4 py-3 hand-drawn hand-drawn-nav transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/" 
                      ? "bg-theme-secondary text-white shadow-md" 
                      : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ x: 0, scale: 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🏖️ Back to the Beach
                </motion.div>
              </Link>
              <Link href="/spots">
                <motion.div 
                  className={`text-sm font-medium px-4 py-3 hand-drawn hand-drawn-nav transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/spots" 
                      ? "bg-theme-secondary text-white shadow-md chalk-drawn wobbly-border" 
                      : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ x: 0, scale: 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📍 Where to Shred
                </motion.div>
              </Link>
              <Link href="/community">
                <motion.div 
                  className={`text-sm font-medium px-4 py-3 hand-drawn hand-drawn-nav transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/community" 
                      ? "bg-theme-secondary text-white shadow-md chalk-drawn wobbly-border" 
                      : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ x: 0, scale: 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🌬️ Wind Fam
                </motion.div>
              </Link>
              <Link href="/learn">
                <motion.div 
                  className={`text-sm font-medium px-4 py-3 hand-drawn transition-all duration-300 flex items-center cursor-pointer ${
                    location === "/learn" 
                      ? "bg-theme-secondary text-white shadow-md hand-drawn chalk-texture chalk-drawn wobbly-border" 
                      : "text-theme-text hover:text-theme-primary hover:bg-theme-surface"
                  }`}
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ x: 0, scale: 0.98 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🎓 Skill Up
                </motion.div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}