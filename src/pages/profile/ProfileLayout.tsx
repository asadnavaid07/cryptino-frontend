import { Link, useLocation, Outlet } from 'react-router-dom'
import { FiUser, FiShield, FiCreditCard, FiGift, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const profileMenu = [
  { icon: FiUser, label: 'My Account', path: '/profile' },
  { icon: FiShield, label: 'Verify', path: '/profile/verify' },
  { icon: FiCreditCard, label: 'Transactions', path: '/profile/transactions' },
  { icon: FiGift, label: 'Bonus', path: '/profile/bonus' },
]

export default function ProfileLayout() {
  const { profile, signOut } = useAuth()
  const location = useLocation()

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full md:w-56 flex-shrink-0">
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          {/* User Info */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-primary/30">
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=username123" 
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            <h3 className="font-bold text-sm flex items-center justify-center gap-1">
              {profile?.full_name || 'USERNAME123'}
              <span className="text-primary text-xs">✓</span>
            </h3>
            <p className="text-xs text-gray-500">ID: 356251</p>
          </div>

          {/* Menu */}
          <nav className="space-y-0.5">
            {profileMenu.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            <button
              onClick={signOut}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg w-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
