import kitesurfingHeroImage from "@/assets/kitesurfing-hero.jpg";
import AuthForm from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [location, navigate] = useLocation();
  const { user, loading } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);
  
  // Show loading while checking auth status
  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30">
        {/* Single subtle floating element */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left side: Auth forms */}
        <div className="flex-1 flex flex-col justify-center p-8 lg:p-16">
          <div className="mx-auto w-full max-w-sm">
            {/* Minimal Logo */}
            <div className="text-center mb-12">
              <h1>Downwindr<span className="inline-block animate-bounce">🏄‍♂️</span></h1>
              <p className="text-md text-gray-500 mt-2">
                Your kitesurfing community
              </p>
            </div>
            
            <AuthForm />
          </div>
        </div>

        {/* Right side: Minimal Hero */}
        <div className="hidden lg:flex lg:flex-1 relative items-center justify-center">
          <div className="absolute inset-0">
            <img src={kitesurfingHeroImage} alt="Kitesurfing hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Clean content */}
          <div className="relative z-10 text-center text-white px-12">
            <h2 className="text-3xl font-light mb-6 leading-relaxed">
              <span className="text-white">Discover the world's best</span>
              <span className="block font-bold text-theme-primary mt-[-0.25rem]">
                kitesurfing spots
              </span>
            </h2>
            <p className="text-blue-100 max-w-md mx-auto leading-relaxed">
              Join our community to find epic spots, share experiences, 
              and get personalized recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile tagline */}
      <div className="lg:hidden relative z-10 px-8 pb-8">
        <p className="text-center text-sm text-gray-500">
          Discover • Connect • Learn
        </p>
      </div>
    </div>
  );
}