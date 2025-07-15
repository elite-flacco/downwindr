import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'

// Load environment variables
config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client with service role key for server-side operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Helper function to verify user authentication from JWT token
export async function verifyAuth(authHeader?: string) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'No authorization header' }
  }

  const token = authHeader.substring(7)
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token)
    
    if (error) {
      return { user: null, error: error.message }
    }
    
    return { user, error: null }
  } catch (error) {
    return { user: null, error: 'Invalid token' }
  }
}

// Middleware to protect routes
export function requireAuth(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization
  
  verifyAuth(authHeader).then(({ user, error }) => {
    if (error || !user) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    
    req.user = user
    next()
  })
}