import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiGift, FiCheck } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { SiApple, SiBitcoin, SiEthereum, SiLitecoin } from 'react-icons/si'
import { FaTelegram } from 'react-icons/fa'
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../lib/supabase'

export default function Signup() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signUp, signInWithGoogle, user } = useAuth()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/')
      // Hard refresh to ensure all data loads correctly
      window.location.reload()
    }
  }, [user, navigate])
  
  // Watch for user state changes after signup
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

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!agreeToTerms) {
      setError('You must agree to the terms and conditions')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const { error } = await signUp(email, password, fullName)
      
      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Signup successful - check if user is immediately logged in
      // (Supabase might require email confirmation, so user might not be logged in yet)
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        // User is immediately logged in (email confirmation disabled)
        // Give the auth context a moment to update, then navigate
        setLoading(false)
        
        // Wait a bit for auth state to propagate through context
        setTimeout(() => {
          // Navigate to home and hard refresh to ensure all data loads
          navigate('/')
          window.location.reload()
        }, 500)
      } else {
        // Email confirmation required - show success message
        setLoading(false)
        // Show success message
        alert('Account created successfully! Please check your email to confirm your account.')
        navigate('/login')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during signup')
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

  const passwordStrength = () => {
    if (password.length === 0) return { strength: 0, label: '', color: '' }
    if (password.length < 6) return { strength: 1, label: 'Weak', color: '#ef4444' }
    if (password.length < 10) return { strength: 2, label: 'Medium', color: '#f59e0b' }
    return { strength: 3, label: 'Strong', color: '#22c55e' }
  }

  const { strength, label, color } = passwordStrength()

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#0A0C15' }}>
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          {/* Logo */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
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
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Join thousands of players winning daily</p>
          </div>

          {/* Bonus Banner */}
          <div className="mb-6 p-4 rounded-xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(247,147,26,0.15) 0%, rgba(0,174,255,0.15) 100%)', border: '1px solid rgba(247,147,26,0.3)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7931A]/20 rounded-full blur-[50px]" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F7931A 0%, #FF6B00 100%)' }}>
                <FiGift className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">🎁 Welcome Bonus</div>
                <div className="text-sm" style={{ color: '#F7931A' }}>Get 150% up to 3000 EUR + 200 Free Spins</div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-2xl p-8" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <span>⚠️</span> {error}
                </div>
              )}

              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <FiUser className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00AEFF]/50 transition-all"
                    style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
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
                {/* Password Strength */}
                {password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all"
                          style={{ backgroundColor: i <= strength ? color : '#2a2f3e' }}
                        />
                      ))}
                    </div>
                    <span className="text-xs" style={{ color }}>{label}</span>
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <FiLock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00AEFF]/50 transition-all"
                    style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  {confirmPassword && password === confirmPassword && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400">
                      <FiCheck className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Promo Code <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00AEFF]/50 transition-all"
                  style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input 
                    type="checkbox" 
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${agreeToTerms ? 'bg-[#00AEFF] border-[#00AEFF]' : 'border-gray-600'}`}>
                    {agreeToTerms && <span className="text-white text-xs">✓</span>}
                  </div>
                </div>
                <span className="text-gray-400 text-sm leading-relaxed">
                  I confirm I am over 18 and agree to the{' '}
                  <Link to="/terms" className="text-[#00AEFF] hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-[#00AEFF] hover:underline">Privacy Policy</Link>
                </span>
              </label>

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
                    Create Account <FiArrowRight className="w-5 h-5" />
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
                <span className="px-4 text-sm text-gray-500" style={{ backgroundColor: '#0D101C' }}>or sign up with</span>
              </div>
            </div>

            {/* Social Signup Buttons */}
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

            {/* Login Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00AEFF] font-semibold hover:text-[#00B5FF] transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#00AEFF]/20 via-[#0A0C15] to-[#F7931A]/10" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,174,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Orbs */}
        <div className="absolute top-32 right-20 w-80 h-80 bg-[#00AEFF]/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#F7931A]/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center px-16 text-center">
          {/* Crypto Icons */}
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(247,147,26,0.2)' }}>
              <SiBitcoin className="w-8 h-8" style={{ color: '#F7931A' }} />
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(98,126,234,0.2)' }}>
              <SiEthereum className="w-8 h-8 text-[#627EEA]" />
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0,174,255,0.2)' }}>
              <SiLitecoin className="w-8 h-8 text-[#00AEFF]" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Start Winning<br />
            <span className="bg-gradient-to-r from-[#F7931A] to-[#FF6B00] bg-clip-text text-transparent">
              With Crypto
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-10 max-w-md">
            Deposit with Bitcoin, Ethereum, and 50+ cryptocurrencies. Instant withdrawals, no fees.
          </p>

          {/* Features */}
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
                <span className="text-green-400">✓</span>
              </div>
              <span className="text-gray-300">Instant Crypto Deposits</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
                <span className="text-green-400">✓</span>
              </div>
              <span className="text-gray-300">5000+ Games Available</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
                <span className="text-green-400">✓</span>
              </div>
              <span className="text-gray-300">VIP Rewards Program</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
                <span className="text-green-400">✓</span>
              </div>
              <span className="text-gray-300">24/7 Live Support</span>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 rounded-2xl text-left max-w-md" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <p className="text-gray-300 italic mb-4">
              "Best crypto casino I've ever used. Instant withdrawals and amazing VIP rewards!"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00AEFF] to-[#0083FF] flex items-center justify-center text-white font-bold">
                M
              </div>
              <div>
                <div className="text-white font-semibold">Mike T.</div>
                <div className="text-sm text-gray-500">VIP Diamond Member</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
