import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function Callback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session from the URL hash (Supabase OAuth flow)
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          navigate('/login')
          return
        }

        if (session) {
          console.log('✅ OAuth callback successful:', session.user.email)
          // Small delay to let auth state propagate
          setTimeout(() => {
            navigate('/')
          }, 500)
        } else {
          console.log('No session found, redirecting to login')
          navigate('/login')
        }
      } catch (err) {
        console.error('Callback error:', err)
        navigate('/login')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a]">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-white text-lg">Signing you in...</p>
      </div>
    </div>
  )
}
