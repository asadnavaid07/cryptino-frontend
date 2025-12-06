import { 
  createContext, 
  useContext, 
  useEffect, 
  useState, 
  ReactNode 
} from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

export interface Profile {
  id: string
  email: string
  full_name: string | null
  username: string | null
  role: 'admin' | 'staff' | 'player' | 'user'
  is_active: boolean
  avatar_url: string | null
  created_at: string
  status?: string
  vip_level?: number
}

export interface Wallet {
  id: string
  user_id: string
  currency: string
  balance: number
  locked_balance: number
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  wallet: Wallet | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  refreshWallet: () => Promise<void>
  isAdmin: boolean
  isStaff: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  // Safety timeout to prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn('⚠️ Auth loading timeout - forcing loading to false')
        setLoading(false)
      }
    }, 5000) // 5 second timeout
    
    return () => clearTimeout(timeout)
  }, [loading])

  // Fetch user wallet
  const fetchWallet = async (userId: string) => {
    try {
      console.log('💰 Fetching wallet for user:', userId)
      const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) {
        console.warn('💰 Wallet fetch error:', error.message)
        // Return fallback wallet
        const fallbackWallet: Wallet = {
          id: 'fallback',
          user_id: userId,
          currency: 'USD',
          balance: 5125120.00,
          locked_balance: 0,
        }
        setWallet(fallbackWallet)
        console.log('💰 Using fallback wallet:', fallbackWallet)
        return
      }
      console.log('💰 Wallet fetched:', data)
      setWallet(data)
    } catch (error) {
      console.error('💰 Error fetching wallet:', error)
      // Still set fallback
      setWallet({
        id: 'fallback',
        user_id: userId,
        currency: 'USD',
        balance: 5125120.00,
        locked_balance: 0,
      })
    }
  }

  // Refresh wallet balance
  const refreshWallet = async () => {
    if (user) {
      await fetchWallet(user.id)
    }
  }

  // Fetch user profile
  const fetchProfile = async (userId: string, userEmail?: string, userMetadata?: any) => {
    try {
      console.log('👤 Fetching profile for user:', userId, userEmail)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) {
        console.warn('👤 Profile fetch error:', error.message, '- Using fallback')
        // Create a minimal profile from user data if profiles table doesn't exist or has no data
        const fallbackProfile: Profile = {
          id: userId,
          email: userEmail || '',
          full_name: userMetadata?.full_name || userMetadata?.name || null,
          username: userMetadata?.full_name || userMetadata?.name || userEmail?.split('@')[0] || 'User',
          role: 'user',
          is_active: true,
          avatar_url: userMetadata?.avatar_url || userMetadata?.picture || null,
          created_at: new Date().toISOString(),
        }
        console.log('👤 Using fallback profile:', fallbackProfile)
        setProfile(fallbackProfile)
        // Create a fallback wallet
        await fetchWallet(userId)
        return
      }
      console.log('👤 Profile fetched:', data)
      setProfile(data)
      // Also fetch wallet
      await fetchWallet(userId)
    } catch (error) {
      console.error('👤 Error fetching profile:', error)
      // Still set fallback
      const fallbackProfile: Profile = {
        id: userId,
        email: userEmail || '',
        full_name: userMetadata?.full_name || userMetadata?.name || null,
        username: userMetadata?.full_name || userMetadata?.name || userEmail?.split('@')[0] || 'User',
        role: 'user',
        is_active: true,
        avatar_url: userMetadata?.avatar_url || userMetadata?.picture || null,
        created_at: new Date().toISOString(),
      }
      setProfile(fallbackProfile)
      await fetchWallet(userId)
    }
  }

  // Initialize auth state
  useEffect(() => {
    let mounted = true
    
    // Get initial session
    const initAuth = async () => {
      console.log('🚀 Initializing auth...')
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('❌ Session error:', error)
          if (mounted) setLoading(false)
          return
        }
        
        console.log('🔐 Initial session:', session ? `User: ${session.user.email}` : 'No session')
        
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
        }
        
        if (session?.user && mounted) {
          try {
            await fetchProfile(session.user.id, session.user.email, session.user.user_metadata)
          } catch (profileError) {
            console.error('❌ Profile fetch error:', profileError)
          }
        }
      } catch (error) {
        console.error('❌ Error initializing auth:', error)
      } finally {
        console.log('✅ Auth init complete, setting loading to false')
        if (mounted) setLoading(false)
      }
    }
    
    initAuth()
    
    return () => {
      mounted = false
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, session?.user?.email || 'no user')
        setSession(session)
        setUser(session?.user ?? null)
        
        if (session?.user) {
          // Store token for API calls
          localStorage.setItem('access_token', session.access_token)
          await fetchProfile(session.user.id, session.user.email, session.user.user_metadata)
          console.log('✅ User logged in:', session.user.email)
        } else {
          localStorage.removeItem('access_token')
          setProfile(null)
          setWallet(null)
          console.log('❌ User logged out')
        }
        
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Sign in with email/password
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Sign up with email/password
  const signUp = async (email: string, password: string, fullName?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      // The database trigger automatically creates profile and wallet
      // No need to manually insert here

      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      return { error }
    } catch (error) {
      return { error: error as Error }
    }
  }

  // Sign out
  const signOut = async () => {
    console.log('🚪 Signing out...')
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      setWallet(null)
      setSession(null)
      localStorage.removeItem('access_token')
      console.log('✅ Signed out successfully')
    } catch (error) {
      console.error('❌ Sign out error:', error)
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    wallet,
    session,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    refreshWallet,
    isAdmin: profile?.role === 'admin',
    isStaff: profile?.role === 'staff' || profile?.role === 'admin',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
