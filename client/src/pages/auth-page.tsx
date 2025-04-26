import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KitesurferIllustration from "@/components/KitesurferIllustration";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Wind, User, Mail, Lock, Compass } from "lucide-react";
import { motion } from "framer-motion";

// Login Form Schema
const loginFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Registration Form Schema
const registerFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  displayName: z.string().optional(),
  experience: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
});

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [location, navigate] = useLocation();
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect if already logged in
  if (user) {
    navigate("/");
    return null;
  }

  // Login form setup
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form setup
  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      displayName: "",
      experience: undefined,
    },
  });

  // Form submission handlers
  function onLoginSubmit(values: z.infer<typeof loginFormSchema>) {
    loginMutation.mutate(values);
  }

  function onRegisterSubmit(values: z.infer<typeof registerFormSchema>) {
    registerMutation.mutate(values);
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-blue-50 to-cyan-50 dark:from-slate-950 dark:to-slate-900">
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto">
        {/* Left side: Auth forms */}
        <motion.div 
          className="lg:w-1/2 flex flex-col justify-center p-8 sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto w-full max-w-md">
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="text-4xl font-bold mb-2 text-primary">Welcome to Downwindr</h1>
              <p className="text-muted-foreground">Your gateway to the best kitesurfing spots worldwide</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Card className="border-t border-l border-primary/5 shadow-xl">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 rounded-b-none">
                    <TabsTrigger value="login" className="rounded-br-none text-base">Login</TabsTrigger>
                    <TabsTrigger value="register" className="rounded-bl-none text-base">Register</TabsTrigger>
                  </TabsList>

                  {/* Login Form */}
                  <TabsContent value="login" className="m-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-body text-primary">Login to your account</CardTitle>
                      <CardDescription>Enter your credentials to access all features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                          <FormField
                            control={loginForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Username</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      placeholder="username" 
                                      className="pl-9" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      type="password" 
                                      placeholder="••••••••" 
                                      className="pl-9" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button 
                            type="submit" 
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 h-11"
                            disabled={loginMutation.isPending}
                          >
                            {loginMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging in...
                              </>
                            ) : (
                              "Login & Start Exploring"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-0">
                      <div className="relative w-full text-center my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-card px-2 text-muted-foreground">New to Downwindr?</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-full text-center text-sm text-primary-foreground bg-primary/10 hover:bg-primary/20 py-2.5 rounded-md transition-all duration-200"
                        onClick={() => setActiveTab("register")}
                      >
                        Create a new account
                      </button>
                    </CardFooter>
                  </TabsContent>

                  {/* Register Form */}
                  <TabsContent value="register" className="m-0">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-2xl font-body text-primary">Create an account</CardTitle>
                      <CardDescription>Join our community of kitesurfing enthusiasts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                      <Form {...registerForm}>
                        <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                          <FormField
                            control={registerForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Username</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      placeholder="Choose a username" 
                                      className="pl-9" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Email</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      type="email" 
                                      placeholder="you@example.com" 
                                      className="pl-9" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input 
                                      type="password" 
                                      placeholder="••••••••" 
                                      className="pl-9" 
                                      {...field} 
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="displayName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Display Name (optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={registerForm.control}
                            name="experience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Experience Level</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <div className="relative">
                                      <Compass className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                                      <SelectTrigger className="pl-9">
                                        <SelectValue placeholder="Select your level" />
                                      </SelectTrigger>
                                    </div>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button 
                            type="submit" 
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 h-11"
                            disabled={registerMutation.isPending}
                          >
                            {registerMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                              </>
                            ) : (
                              "Create Account"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-0">
                      <div className="relative w-full text-center my-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-card px-2 text-muted-foreground">Already registered?</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="w-full text-center text-sm text-primary-foreground bg-primary/10 hover:bg-primary/20 py-2.5 rounded-md transition-all duration-200"
                        onClick={() => setActiveTab("login")}
                      >
                        Login to your account
                      </button>
                    </CardFooter>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side: Hero/Illustration */}
        <motion.div 
          className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden p-8 bg-primary/5"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative z-10 w-full max-w-lg">
            <KitesurferIllustration className="w-full h-auto" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-20 bg-gradient-to-br from-transparent via-transparent to-primary/5">
            <div className="max-w-lg text-center">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                <h2 className="text-4xl font-bold mb-6 text-foreground">Find Your Perfect <span className="text-primary">Kitesurfing Spot</span></h2>
              </motion.div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                <p className="text-lg mb-8 text-foreground/80">
                  Join our community of kitesurfers to discover, rate, and review the best spots around the world.
                  Share your experiences and get personalized recommendations.
                </p>
              </motion.div>
              <motion.div 
                className="flex flex-wrap gap-4 justify-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.7 }}
              >
                {["Global Coverage", "Wind Forecasts", "Community Reviews", "Spot Matching"].map((feature, i) => (
                  <div 
                    key={i} 
                    className="bg-background/70 px-4 py-2 rounded-full text-sm font-medium text-foreground border border-primary/20"
                  >
                    {feature}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}