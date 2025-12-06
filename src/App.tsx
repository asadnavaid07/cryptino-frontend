import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Layouts
import { MainLayout } from './components/layout'
import { AdminLayout } from './pages/admin'

// Auth Pages
import { Login, Signup, Callback } from './pages/auth'

// Main Pages
import Home from './pages/Home'
import { Casino } from './pages/casino'
import { Challenges } from './pages/challenges'
import { Promotions } from './pages/promotions'
import { VIP } from './pages/vip'
import Sports from './pages/sports/Sports'
import Tournaments from './pages/tournaments/Tournaments'
import Affiliate from './pages/affiliate/Affiliate'

// Profile Pages
import { 
  ProfileLayout, 
  MyAccount, 
  Verify, 
  Transactions, 
  Bonus 
} from './pages/profile'

// Wallet Page
import { Wallet } from './pages/wallet'

// Admin Pages
import { Dashboard, Users, Wallets, Games, Reports, Bonuses, Notifications, Settings, Security } from './pages/admin'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

// Admin Route Component
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isAdmin, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }
  
  if (!isAdmin) {
    return <Navigate to="/" replace />
  }
  
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/callback" element={<Callback />} />

      {/* Main App Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/casino" element={<Casino />} />
        <Route path="/casino/:category" element={<Casino />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/live-casino" element={<Casino />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/loyalty" element={<VIP />} />
        <Route path="/vip" element={<VIP />} />
        <Route path="/bonuses" element={<ProtectedRoute><Bonus /></ProtectedRoute>} />
        <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
        <Route path="/deposit" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
        <Route path="/affiliate" element={<Affiliate />} />
        <Route path="/blog" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Blog - Coming Soon</h1></div>} />
        <Route path="/support" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Live Support - Coming Soon</h1></div>} />
        
        {/* Game Detail */}
        <Route path="/game/:id" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Game Player - Coming Soon</h1></div>} />
        
        {/* Profile Routes */}
        <Route path="/profile" element={<ProtectedRoute><ProfileLayout /></ProtectedRoute>}>
          <Route index element={<MyAccount />} />
          <Route path="verify" element={<Verify />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="bonus" element={<Bonus />} />
        </Route>

        {/* Static Pages */}
        <Route path="/terms" element={<div className="card p-8 max-w-4xl mx-auto"><h1 className="text-2xl font-bold mb-4">Terms & Conditions</h1><p className="text-gray-400">Terms content here...</p></div>} />
        <Route path="/privacy" element={<div className="card p-8 max-w-4xl mx-auto"><h1 className="text-2xl font-bold mb-4">Privacy Policy</h1><p className="text-gray-400">Privacy content here...</p></div>} />
        <Route path="/responsible-gambling" element={<div className="card p-8 max-w-4xl mx-auto"><h1 className="text-2xl font-bold mb-4">Responsible Gambling</h1><p className="text-gray-400">Responsible gambling content here...</p></div>} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="wallets" element={<Wallets />} />
        <Route path="games" element={<Games />} />
        <Route path="reports" element={<Reports />} />
        <Route path="bonuses" element={<Bonuses />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
        <Route path="security" element={<Security />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-dark">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-8">Page not found</p>
            <a href="/" className="btn-primary">Go Home</a>
          </div>
        </div>
      } />
    </Routes>
  )
}
