import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#0A0C15]">
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main content */}
      <main className="pt-14 lg:pl-56 min-h-screen">
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  )
}
