import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Calendar, MessageCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

export default function Community() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto px-4 pt-12 pb-20 flex-grow flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="mb-4">Connect with the Global Kite Community</h2>
          <p className="font-body text-base text-theme-text/70 mb-8 max-w-2xl mx-auto">
            Share sessions, discover spots, and connect with kiters worldwide
          </p>
          <div className="mb-12">
            <Badge
              variant="outline"
              className="relative font-semibold text-base py-2 px-5 rounded-md border-0 bg-theme-action text-white transition-all inline-flex items-center gap-2.5 shadow-lg"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="relative -top-px">Coming Soon</span>
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="group interactive-item bg-gradient-to-br from-theme-surface/30 to-theme-surface/60 border-theme-primary/20 hover:border-theme-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-theme-primary/10 rounded-full group-hover:bg-theme-primary/20 transition-colors duration-300">
                    <MessageCircle className="h-8 w-8 text-theme-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="font-heading text-xl text-theme-primary mb-2">Connect & Share</CardTitle>
                  <CardDescription className="font-body text-theme-text/80 text-sm leading-relaxed">
                    Discuss gear, techniques, and travel destinations with fellow kiters from around the globe
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="group interactive-item bg-gradient-to-br from-theme-accent/10 to-theme-accent/20 border-theme-accent/30 hover:border-theme-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-theme-accent/15 rounded-full group-hover:bg-theme-accent/25 transition-colors duration-300">
                    <Users className="h-8 w-8 text-theme-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="font-heading text-xl text-theme-accent mb-2">Find Kite Buddies</CardTitle>
                  <CardDescription className="font-body text-theme-text/80 text-sm leading-relaxed">
                    Connect with local kiters, meet new friends, plan sessions, and explore new spots together
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="group interactive-item bg-gradient-to-br from-theme-action/10 to-theme-action/20 border-theme-action/30 hover:border-theme-action/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-theme-action/15 rounded-full group-hover:bg-theme-action/25 transition-colors duration-300">
                    <Calendar className="h-8 w-8 text-theme-action group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="font-heading text-xl text-theme-action mb-2">Events & Meetups</CardTitle>
                  <CardDescription className="font-body text-theme-text/80 text-sm leading-relaxed">
                    Get notified about local meetups, competitions, and events worldwide
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-full max-w-4xl mx-auto"
          >
            <Card className="border-theme-primary/20 shadow-xl bg-gradient-to-br from-white to-theme-surface/30 overflow-hidden">
              <CardHeader className="text-center pb-6 relative">
                <CardTitle className="font-heading text-xl text-theme-primary mb-4">🌊  Want to ride the wave early?</CardTitle>
                <CardDescription className="font-body text-sm text-theme-text max-w-2xl mx-auto leading-relaxed">
                  Help us shape the future of this community. Share your ideas and get early access.
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-col sm:flex-row items-center justify-center gap-4 px-8 pb-8">
                <Button
                  size="default"
                  variant="default"
                  className="flex items-center justify-center gap-2"
                  onClick={() => window.open('https://forms.gle/qJJGEmZheciTxncK8', '_blank')}
                >
                  <div>
                    💌
                  </div>
                  Share Ideas
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="flex items-center justify-center gap-2"
                  onClick={() => window.open('https://forms.gle/upasRGT7aQwFmgSB6', '_blank')}
                >
                  <div>
                    ✋
                  </div>
                  Join Waitlist
                </Button>

              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}