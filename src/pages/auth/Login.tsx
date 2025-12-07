import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { SiApple } from 'react-icons/si'
import { FaTelegram } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signIn, signInWithGoogle, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/')
      // Hard refresh to ensure all data loads correctly
      window.location.reload()
    }
  }, [user, navigate])
  
  // Watch for user state changes after login
  useEffect(() => {
    if (user && !loading) {
      // User is logged in and loading is done, navigate to home
      navigate('/')
      // Hard refresh to ensure all data loads correctly
      window.location.reload()
    }
  }, [user, loading, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Login successful - check if user is logged in
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // User is logged in
        // Give the auth context a moment to update, then navigate
        setLoading(false)
        
        // Wait a bit for auth state to propagate through context
        setTimeout(() => {
          // Navigate to home and hard refresh to ensure all data loads
          navigate('/')
          window.location.reload()
        }, 500)
      } else {
        // Should not happen, but handle it just in case
        setError('Login failed. Please try again.')
        setLoading(false)
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    const { error } = await signInWithGoogle()
    if (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0C15' }}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00AEFF]/20 via-[#0A0C15] to-[#F7931A]/10" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,174,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#00AEFF]/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-[#F7931A]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 mb-12">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00AEFF 0%, #0083FF 100%)' }}>
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <span className="text-3xl font-bold text-white">
              CRYP<span style={{ color: '#00AEFF' }}>TINO</span>
            </span>
          </Link>

          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Your Gateway to<br />
            <span className="bg-gradient-to-r from-[#00AEFF] to-[#00B5FF] bg-clip-text text-transparent">
              Crypto Gaming
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-10 max-w-md">
            Experience the thrill of gaming with cryptocurrency. Fast deposits, instant withdrawals, and provably fair games.
          </p>

          {/* Stats */}
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-500">Active Players</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-gray-500">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold" style={{ color: '#F7931A' }}>₿ 500+</div>
              <div className="text-gray-500">Paid Out</div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 mt-12">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <span className="text-green-400">🔒</span>
              <span className="text-sm text-gray-400">SSL Secured</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <span className="text-blue-400">✓</span>
              <span className="text-sm text-gray-400">Provably Fair</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5">
              <span className="text-yellow-400">⚡</span>
              <span className="text-sm text-gray-400">Instant Payouts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00AEFF 0%, #0083FF 100%)' }}>
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-white">
                CRYP<span style={{ color: '#00AEFF' }}>TINO</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-400">Enter your credentials to access your account</p>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00AEFF]/50 transition-all"
                    style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <FiLock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00AEFF]/50 transition-all"
                    style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${rememberMe ? 'bg-[#00AEFF] border-[#00AEFF]' : 'border-gray-600'}`}>
                      {rememberMe && <span className="text-white text-xs">✓</span>}
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-[#00AEFF] hover:text-[#00B5FF] transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                style={{ background: 'linear-gradient(135deg, #00AEFF 0%, #0083FF 100%)' }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500" style={{ backgroundColor: '#0D101C' }}>or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center py-3 rounded-xl transition-all hover:scale-105"
                style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <FcGoogle className="w-6 h-6" />
              </button>
              <button
                className="flex items-center justify-center py-3 rounded-xl transition-all hover:scale-105"
                style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <SiApple className="w-6 h-6 text-white" />
              </button>
              <button
                className="flex items-center justify-center py-3 rounded-xl transition-all hover:scale-105"
                style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <FaTelegram className="w-6 h-6 text-[#0088cc]" />
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#00AEFF] font-semibold hover:text-[#00B5FF] transition-colors">
                Create Account
              </Link>
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-600">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
