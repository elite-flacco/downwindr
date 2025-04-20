import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Spots from "@/pages/Spots";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/spots" component={Spots} />
      <Route path="/community" component={NotFound} />
      <Route path="/learn" component={NotFound} />
      <Route path="/about" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
