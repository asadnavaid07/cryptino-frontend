import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../../hooks/useAuth'

export default function MyAccount() {
  const { profile } = useAuth()
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || 'Sherry',
    username: profile?.email?.split('@')[0] || 'DrDoom616',
    phone: '+599*********42',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Update profile:', formData)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Account</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Section */}
        <section className="bg-[#1a1d2e] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-5">Profile</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Full name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[#252836] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                placeholder="Sherry"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-[#252836] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                placeholder="DrDoom616"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone number</label>
              <input
                type="text"
                value={formData.phone}
                disabled
                className="w-full bg-[#252836] border border-white/10 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </section>

        {/* Change Password Section */}
        <section className="bg-[#1a1d2e] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-5">Change Password</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-2">Enter current password</label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full bg-[#252836] border border-white/10 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showCurrentPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm text-gray-400 mb-2">Create new password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full bg-[#252836] border border-white/10 rounded-lg px-4 py-3 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showNewPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Confirm new password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-[#252836] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
                placeholder="Confirm your new password"
              />
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-blue-500 text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity"
        >
          Save changes
        </button>
      </form>
    </div>
  )
}
