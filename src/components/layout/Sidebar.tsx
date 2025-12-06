import { Link, useLocation } from 'react-router-dom'
import { FiChevronRight, FiChevronDown, FiMessageCircle } from 'react-icons/fi'
import { 
  IoGameControllerOutline, 
  IoFootballOutline, 
  IoGiftOutline, 
  IoRibbonOutline, 
  IoTrophyOutline, 
  IoHeartOutline, 
  IoDiamondOutline,
  IoPeopleOutline,
  IoNewspaperOutline
} from 'react-icons/io5'
import { HiOutlineViewGrid } from 'react-icons/hi'

interface SidebarProps {
  isOpen: boolean
  onClose?: () => void
}

const menuItems = [
  { 
    label: 'Casino', 
    path: '/casino',
    hasSubmenu: true,
    icon: IoGameControllerOutline
  },
  { 
    label: 'Sports', 
    path: '/sports',
    hasSubmenu: true,
    icon: IoFootballOutline
  },
  { label: 'My Bonuses', path: '/bonuses', icon: HiOutlineViewGrid },
  { label: 'Promotions', path: '/promotions', icon: IoGiftOutline },
  { label: 'Challenges', path: '/challenges', icon: IoRibbonOutline },
  { label: 'Tournaments', path: '/tournaments', icon: IoTrophyOutline },
  { label: 'Loyalty', path: '/loyalty', icon: IoHeartOutline },
  { label: 'VIP', path: '/vip', icon: IoDiamondOutline },
  { label: 'Affiliate', path: '/affiliate', icon: IoPeopleOutline },
  { label: 'Blog', path: '/blog', icon: IoNewspaperOutline },
]

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation()

  return (
    <aside 
      className={`
        fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-56 bg-[#0A0E1A]
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        flex flex-col
      `}
    >
      {/* Wheel of Fortune & Refer Banner - Glassmorphism */}
      <div className="p-2.5 flex gap-2">
        <Link 
          to="/wheel" 
          className="flex-1 rounded-lg p-2 flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 40, 80, 0.6) 0%, rgba(30, 60, 100, 0.4) 100%)',
            border: '1px solid rgba(100, 150, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="text-base">🎡</span>
          <div>
            <div className="text-[8px] text-cyan-400 font-medium leading-none">WHEEL</div>
            <div className="text-[10px] text-white font-bold leading-tight">OF FORTUNE</div>
          </div>
        </Link>
        <Link 
          to="/refer" 
          className="flex-1 rounded-lg p-2 flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          style={{
            background: 'linear-gradient(135deg, rgba(20, 40, 80, 0.6) 0%, rgba(30, 60, 100, 0.4) 100%)',
            border: '1px solid rgba(100, 150, 255, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <span className="text-base">🚀</span>
          <div>
            <div className="text-[8px] text-cyan-400 font-medium leading-none">REFER</div>
            <div className="text-[10px] text-white font-bold leading-tight">A FRIEND</div>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 py-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          location.pathname.startsWith(item.path + '/')
          const Icon = item.icon
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg text-sm
                transition-all duration-200
                ${isActive 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-white'}
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.label}</span>
              {item.hasSubmenu && (
                isActive 
                  ? <FiChevronDown className="w-4 h-4" />
                  : <FiChevronRight className="w-4 h-4" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Live Support */}
      <div className="p-3">
        <Link 
          to="/support" 
          className="flex items-center gap-3 px-3 py-2 text-[#00E676] hover:text-[#69F0AE] transition-colors"
        >
          <FiMessageCircle className="w-5 h-5" />
          <span className="font-medium">Live Support</span>
        </Link>
      </div>
    </aside>
  )
}
