import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, UserPlus, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Community() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 pt-12 pb-20 flex-grow flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-theme-primary mb-3">Downwindr Community</h1>
          <p className="text-md text-theme-text-light mb-8">Connect with fellow kiters worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader>
                <UserPlus className="h-10 w-10 text-blue-500 mb-2" />
                <CardTitle className="font-medium">Join Forums</CardTitle>
                <CardDescription>Discuss gear, techniques, and travel</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
              <CardHeader>
                <Users className="h-10 w-10 text-teal-500 mb-2" />
                <CardTitle className="font-medium">Find Buddies</CardTitle>
                <CardDescription>Connect with kiters at your destination</CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardHeader>
                <Mail className="h-10 w-10 text-purple-500 mb-2" />
                <CardTitle className="font-medium">Stay Updated</CardTitle>
                <CardDescription>Get notified about events and meetups</CardDescription>
              </CardHeader>
            </Card>
          </div>
          
          <Card className="max-w-2xl mx-auto border-theme-primary/20 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-4 font-medium">Coming Soon!</CardTitle>
              <CardDescription>
                We're working hard to build an amazing community platform for kitesurfers around the world.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-theme-text mb-4">
                Want to be part of this journey? Get in touch with us! 👇
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                size="lg"
                variant={"default"}
                onClick={() => window.location.href = "mailto:hello@downwindr.com?subject=Community Interest"}
              >
                <Mail className="mr-2 h-4 w-4" />
                Get in Touch
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}