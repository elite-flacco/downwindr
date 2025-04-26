import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { User } from "@shared/schema";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

type LoginData = {
  username: string;
  password: string;
};

type RegisterData = {
  username: string;
  email: string;
  password: string;
  displayName?: string;
  experience?: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  
  // Better refetching with refetchInterval and shorter staleTime
  const {
    data: user,
    error,
    isLoading,
    refetch: refetchUser,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 60 * 1000, // Refetch every minute
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: async (user: User) => {
      // Set the user data in cache
      queryClient.setQueryData(["/api/user"], user);
      
      // Force an immediate refetch to ensure consistent state
      await refetchUser();
      
      toast({
        title: "Logged in",
        description: `Welcome back, ${user.username}!`,
      });
      
      // Small delay before redirecting to allow state to update
      setTimeout(() => {
        navigate("/");
      }, 100);
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      const res = await apiRequest("POST", "/api/register", userData);
      return await res.json();
    },
    onSuccess: async (user: User) => {
      // Set the user data in cache
      queryClient.setQueryData(["/api/user"], user);
      
      // Force an immediate refetch to ensure consistent state
      await refetchUser();
      
      toast({
        title: "Registration successful",
        description: `Welcome to Downwindr, ${user.username}!`,
      });
      
      // Small delay before redirecting to allow state to update
      setTimeout(() => {
        navigate("/");
      }, 100);
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async (): Promise<void> => {
      try {
        await apiRequest("POST", "/api/logout");
      } catch (error) {
        console.error("Logout API error:", error);
        throw error;
      }
    },
    onSuccess: async () => {
      // Force clear the user data from cache
      queryClient.setQueryData(["/api/user"], null);
      
      // Force an immediate refetch to ensure consistent state
      await refetchUser();
      
      toast({
        title: "Logged out",
        description: "You have been logged out successfully",
      });
      
      // Redirect to auth page after a small delay
      setTimeout(() => {
        if (location !== "/auth") {
          navigate("/auth");
        }
      }, 100);
    },
    onError: async (error: Error) => {
      console.error("Logout error in mutation:", error);
      
      // Even if API call fails, clear user data from client
      queryClient.setQueryData(["/api/user"], null);
      
      // Force an immediate refetch to ensure consistent state
      await refetchUser();
      
      toast({
        title: "Logout had issues",
        description: "You've been logged out, but there were some errors.",
        variant: "destructive",
      });
      
      // Redirect to auth page after a small delay
      setTimeout(() => {
        if (location !== "/auth") {
          navigate("/auth");
        }
      }, 100);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}