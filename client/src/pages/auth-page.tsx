import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import AuthForm from "@/components/AuthForm";
import { Loader2 } from "lucide-react";

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
    <div className="flex min-h-screen">
      {/* Left side: Auth forms */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-12 bg-background">
        <div className="mx-auto w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">Welcome to Downwindr</h1>
          <AuthForm />
        </div>
      </div>

      {/* Right side: Hero/Illustration */}
      <div className="hidden md:flex md:flex-1 bg-primary/10 p-8 items-center justify-center relative overflow-hidden">
        <div className="max-w-lg text-center text-foreground z-10">
          <h2 className="text-4xl font-bold mb-6">Find Your Perfect Kitesurfing Spot</h2>
          <p className="text-lg mb-8">
            Join our community of kitesurfers to discover, rate, and review the best spots around the world.
            Share your experiences and get personalized recommendations.
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
      </div>
    </div>
  );
}