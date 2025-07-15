import { useAuth } from '@/contexts/AuthContext'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

interface UserProfile {
  id: string
  username?: string
  displayName?: string
  bio?: string
  experience?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

interface UpdateUserProfile {
  username?: string
  displayName?: string
  bio?: string
  experience?: string
  avatarUrl?: string
}

export function useUser() {
  const { user } = useAuth()
  
  return useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user) return null
      
      const response = await fetch(`/api/users/${user.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user profile')
      }
      return response.json() as Promise<UserProfile>
    },
    enabled: !!user,
  })
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (updates: UpdateUserProfile) => {
      if (!user) throw new Error('User not authenticated')
      
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update user profile')
      }
      
      return response.json() as Promise<UserProfile>
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user-profile', user?.id], data)
    },
  })
}

export function useCreateUserProfile() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  return useMutation({
    mutationFn: async (profile: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>) => {
      if (!user) throw new Error('User not authenticated')
      
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          ...profile,
        }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create user profile')
      }
      
      return response.json() as Promise<UserProfile>
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user-profile', user?.id], data)
    },
  })
}