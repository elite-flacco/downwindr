import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Spots from "@/pages/Spots";
import AuthPage from "@/pages/auth-page";
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
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/spots" component={Spots} />
        <Route path="/auth" component={AuthPage} />
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
