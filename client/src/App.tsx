import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Spots from "@/pages/Spots";
import AuthPage from "@/pages/auth-page";
import Community from "@/pages/Community";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/spots" component={Spots} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/community" component={Community} />
      <Route path="/learn" component={NotFound} />
      <Route path="/about" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
