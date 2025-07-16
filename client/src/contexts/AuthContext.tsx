import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { Session, User as SupabaseUser } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { User } from '@shared/schema'

interface AuthContextType {
  session: Session | null
  user: SupabaseUser | null
  userProfile: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
  refreshUserProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [userProfile, setUserProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      
      // Fetch user profile if user exists
      if (session?.user) {
        fetchUserProfile(session.user.id)
      }
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
        
        // Handle user profile based on auth event
        if (event === 'SIGNED_IN' && session?.user) {
          await fetchUserProfile(session.user.id)
        } else if (event === 'SIGNED_OUT') {
          setUserProfile(null)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const createUserProfile = useCallback(async (userId: string) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          username: user?.email?.split('@')[0] || 'user', // Use email prefix as default username
          displayName: user?.email?.split('@')[0] || null,
        }),
      })
      
      if (response.ok) {
        const profile = await response.json()
        setUserProfile(profile)
      }
    } catch (error) {
      console.error('Error creating user profile:', error)
    }
  }, [user])

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (response.ok) {
        const profile = await response.json()
        // Only update if the profile data has actually changed
        setUserProfile(prevProfile => {
          if (!prevProfile || JSON.stringify(prevProfile) !== JSON.stringify(profile)) {
            return profile;
          }
          return prevProfile;
        });
      } else if (response.status === 404) {
        // User profile doesn't exist, create one
        await createUserProfile(userId)
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }, [createUserProfile])

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    // Check if user was created or if they already exist
    if (!error && data.user && !data.user.email_confirmed_at && data.user.identities?.length === 0) {
      // This indicates the user already exists but isn't confirmed
      return { 
        error: { 
          message: 'An account with this email already exists. Check your email or try signing in.'
        } 
      }
    }
    
    return { error }
  }, [])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
  }, [])

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { error }
  }, [])

  const refreshUserProfile = useCallback(async () => {
    if (user) {
      await fetchUserProfile(user.id)
    }
  }, [user, fetchUserProfile])

  const value = useMemo(() => ({
    session,
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    refreshUserProfile,
  }), [session, user, userProfile, loading, signIn, signUp, signOut, resetPassword, refreshUserProfile])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}