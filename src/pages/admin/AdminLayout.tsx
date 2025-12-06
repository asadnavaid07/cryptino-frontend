import { Link, Outlet, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiPlay, 
  FiBarChart2, 
  FiGift, 
  FiBell, 
  FiSettings,
  FiShield
} from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

const adminMenu = [
  { icon: FiHome, label: 'Dashboard', path: '/admin' },
  { icon: FiUsers, label: 'Users', path: '/admin/users' },
  { icon: FiDollarSign, label: 'Wallets', path: '/admin/wallets' },
  { icon: FiPlay, label: 'Games', path: '/admin/games' },
  { icon: FiBarChart2, label: 'Reports', path: '/admin/reports' },
  { icon: FiGift, label: 'Bonuses', path: '/admin/bonuses' },
  { icon: FiBell, label: 'Notifications', path: '/admin/notifications' },
  { icon: FiSettings, label: 'Settings', path: '/admin/settings' },
  { icon: FiShield, label: 'Security Logs', path: '/admin/security' },
]

export default function AdminLayout() {
  const { isAdmin } = useAuth()
  const location = useLocation()

  // Redirect non-admins
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-400 mb-4">You don't have permission to access the admin panel.</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-dark-100 border-r border-white/5 flex-shrink-0">
        <div className="p-4 border-b border-white/5">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-dark font-bold">A</span>
            </div>
            <span className="font-bold">Admin Panel</span>
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {adminMenu.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
