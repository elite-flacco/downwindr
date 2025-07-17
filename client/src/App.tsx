import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Spots from "@/pages/Spots";
import AuthPage from "@/pages/auth-page";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import Community from "@/pages/Community";
import Learn from "@/pages/Learn";
import ProfilePage from "@/pages/ProfilePage";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

function AppContent() {
  const [location] = useLocation();
  
  // Pages where header should be hidden
  const hideHeaderPages = ['/auth', '/reset-password'];
  const shouldHideHeader = hideHeaderPages.includes(location);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/spots" component={Spots} />
        <Route path="/auth" component={AuthPage} />
        <Route path="/reset-password" component={ResetPasswordPage} />
        <Route path="/community" component={Community} />
        <ProtectedRoute path="/profile" component={ProfilePage} />
        <Route path="/learn" component={Learn} />
        <Route path="/about" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </>
  );
}

export default App;
