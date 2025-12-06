import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { 
  FiSearch, 
  FiBell, 
  FiUser, 
  FiLogOut, 
  FiSettings,
  FiCreditCard,
  FiChevronDown
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user, profile, wallet, signOut, loading } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Debug log
  console.log('🎯 Navbar render:', { loading, hasUser: !!user, hasProfile: !!profile, hasWallet: !!wallet })

  const handleSignOut = async () => {
    setShowUserMenu(false)
    await signOut()
    navigate('/')
  }

  // Format balance with commas
  const formatBalance = (balance: number) => {
    return balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  // Get display name
  const displayName = profile?.username || profile?.full_name || user?.email?.split('@')[0] || 'User'

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50" style={{
      background: 'linear-gradient(135deg, rgba(10, 14, 26, 0.95) 0%, rgba(15, 25, 40, 0.9) 50%, rgba(10, 14, 26, 0.95) 100%)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Icon */}
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-white/5 rounded-lg"
          >
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h10" />
              <path d="M18 15l3-3-3-3" />
            </svg>
          </button>
          
          <Link to="/" className="flex items-center">
            {/* CRYP - White text on blue background */}
            <div className="bg-[#00A3FF] px-2 py-1 rounded-l-md">
              <span className="text-white font-black text-xl tracking-wide">CRYP</span>
            </div>
            {/* TIN - Dark text on dark background */}
            <div className="bg-[#1a2744] px-2 py-1 rounded-r-md flex items-center">
              <span className="text-white font-black text-xl tracking-wide">TIN</span>
              {/* Bitcoin Icon */}
              <div className="w-6 h-6 ml-0.5 rounded-full bg-[#F7931A] flex items-center justify-center">
                <span className="text-white font-bold text-sm">₿</span>
              </div>
            </div>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            <Link 
              to="/casino" 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm transition-all ${
                isActive('/casino') 
                  ? 'bg-white/10 text-white' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>🎰</span>
              <span>Casino</span>
            </Link>
            <Link 
              to="/sports" 
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-medium text-sm transition-all ${
                isActive('/sports') 
                  ? 'bg-white/10 text-white' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span>⚽</span>
              <span>Sports</span>
            </Link>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search Button - Rounded square with glassmorphism */}
          <button 
            className="p-2.5 rounded-xl text-white transition-colors"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 45, 70, 0.8) 0%, rgba(25, 40, 60, 0.7) 100%)',
              border: '1px solid rgba(100, 150, 200, 0.15)'
            }}
          >
            <FiSearch className="w-5 h-5" />
          </button>

          {loading ? (
            <>
              {/* Loading skeleton - more visible */}
              <div className="w-20 h-9 rounded-lg bg-gray-600/50 animate-pulse" />
              <div className="w-32 h-10 rounded-xl bg-cyan-600/30 animate-pulse" />
            </>
          ) : user ? (
            <>
              {/* Deposit Button - Bright blue */}
              <Link 
                to="/deposit"
                className="hidden sm:flex items-center gap-1 px-5 py-2 rounded-lg font-semibold text-sm text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #00A3FF 0%, #0080FF 100%)',
                  boxShadow: '0 4px 15px rgba(0, 163, 255, 0.3)'
                }}
              >
                <span>Deposit</span>
              </Link>

              {/* User Info with Avatar - shows username and balance */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors"
                  style={{
                    background: 'linear-gradient(135deg, rgba(30, 45, 70, 0.6) 0%, rgba(25, 40, 60, 0.5) 100%)',
                    border: '1px solid rgba(100, 150, 200, 0.15)'
                  }}
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center overflow-hidden ring-2 ring-cyan-500/30">
                    {profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt={displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-4 h-4 text-white" />
                    )}
                  </div>
                  
                  {/* Username and Balance */}
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-white font-medium text-sm">{displayName}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[#F7931A] text-xs">₿</span>
                      <span className="text-green-400 font-semibold text-xs">
                        {wallet ? formatBalance(wallet.balance) : '0.00'}
                      </span>
                    </div>
                  </div>

                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-12 w-64 rounded-xl shadow-xl overflow-hidden animate-scaleIn" style={{
                    background: 'linear-gradient(180deg, rgba(15, 28, 46, 0.98) 0%, rgba(10, 20, 35, 0.98) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)'
                  }}>
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center overflow-hidden">
                          {profile?.avatar_url ? (
                            <img 
                              src={profile.avatar_url} 
                              alt={displayName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiUser className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{displayName}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      {/* Balance in dropdown */}
                      <div className="mt-3 p-3 rounded-lg" style={{ background: 'rgba(0, 180, 180, 0.1)', border: '1px solid rgba(0, 200, 200, 0.2)' }}>
                        <p className="text-xs text-gray-400 mb-1">Balance</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#F7931A]">₿</span>
                          <span className="text-white font-bold text-lg">
                            {wallet ? formatBalance(wallet.balance) : '0.00'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <nav className="p-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FiUser className="w-4 h-4" />
                        My Account
                      </Link>
                      <Link 
                        to="/wallet" 
                        className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FiCreditCard className="w-4 h-4" />
                        Wallet
                      </Link>
                      <Link 
                        to="/bonuses" 
                        className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-gray-300 hover:text-white"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FiBell className="w-4 h-4" />
                        Bonuses
                      </Link>
                      {(profile?.role === 'admin' || profile?.role === 'staff') && (
                        <Link 
                          to="/admin" 
                          className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-cyan-400"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <FiSettings className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                    </nav>
                    <div className="p-2 border-t border-white/10">
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg w-full text-left text-red-400"
                      >
                        <FiLogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Button */}
              <button 
                className="p-2.5 rounded-xl text-white transition-colors"
                style={{
                  background: 'linear-gradient(135deg, rgba(30, 45, 70, 0.8) 0%, rgba(25, 40, 60, 0.7) 100%)',
                  border: '1px solid rgba(100, 150, 200, 0.15)'
                }}
              >
                <FiBell className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              {/* Log In - Plain text */}
              <Link 
                to="/login" 
                className="px-4 py-2 text-white hover:text-gray-200 transition-colors font-medium text-sm sm:text-base"
              >
                Log In
              </Link>

              {/* Sign Up - Bright cyan/blue button */}
              <Link 
                to="/signup" 
                className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base text-white transition-all hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF 0%, #00A3FF 100%)',
                  boxShadow: '0 4px 15px rgba(0, 163, 255, 0.4)'
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
