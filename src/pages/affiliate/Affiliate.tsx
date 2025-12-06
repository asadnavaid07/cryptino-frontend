import { useState } from 'react'
import { FiCopy, FiDollarSign, FiUsers, FiTrendingUp, FiGift, FiCheck, FiShare2 } from 'react-icons/fi'
import { FaTelegram, FaTwitter, FaFacebook, FaWhatsapp } from 'react-icons/fa'

const stats = {
  totalEarnings: '$12,450.00',
  totalReferrals: 156,
  activeReferrals: 89,
  pendingCommission: '$340.50',
  commissionRate: '25%',
  lifetimeClicks: 2340
}

const referrals = [
  { id: '1', username: 'User***234', joined: '2024-11-28', wagered: '$5,230', commission: '$130.75', status: 'active' },
  { id: '2', username: 'User***567', joined: '2024-11-25', wagered: '$3,120', commission: '$78.00', status: 'active' },
  { id: '3', username: 'User***891', joined: '2024-11-20', wagered: '$8,450', commission: '$211.25', status: 'active' },
  { id: '4', username: 'User***123', joined: '2024-11-15', wagered: '$1,890', commission: '$47.25', status: 'inactive' },
  { id: '5', username: 'User***456', joined: '2024-11-10', wagered: '$12,340', commission: '$308.50', status: 'active' },
]

const tiers = [
  { name: 'Bronze', commission: '20%', minReferrals: 0, color: '#CD7F32' },
  { name: 'Silver', commission: '25%', minReferrals: 10, color: '#C0C0C0' },
  { name: 'Gold', commission: '30%', minReferrals: 50, color: '#FFD700' },
  { name: 'Platinum', commission: '35%', minReferrals: 100, color: '#E5E4E2' },
  { name: 'Diamond', commission: '40%', minReferrals: 500, color: '#B9F2FF' },
]

export default function Affiliate() {
  const [copied, setCopied] = useState(false)
  const affiliateLink = 'https://cryptino.io/ref/USER123'
  const affiliateCode = 'USER123'

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Affiliate Program</h1>
          <p className="text-gray-400">Earn commission by referring friends to Cryptino</p>
        </div>
        <button 
          className="w-fit px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all"
          style={{ background: 'linear-gradient(135deg, #00AEFF 0%, #0083FF 100%)' }}
        >
          Withdraw Commission
        </button>
      </div>

      {/* Referral Link Card */}
      <div 
        className="rounded-2xl p-6 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(0,174,255,0.15) 0%, rgba(247,147,26,0.15) 100%)', border: '1px solid rgba(0,174,255,0.3)' }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00AEFF]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F7931A]/20 rounded-full blur-[60px]" />
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FiShare2 className="text-[#00AEFF]" />
            Your Referral Link
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Referral Link</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={affiliateLink}
                  readOnly
                  className="flex-1 px-4 py-3 rounded-xl text-white"
                  style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
                />
                <button
                  onClick={() => copyToClipboard(affiliateLink)}
                  className="px-4 py-3 rounded-xl transition-all hover:scale-105"
                  style={{ backgroundColor: copied ? '#22c55e' : '#00AEFF' }}
                >
                  {copied ? <FiCheck className="w-5 h-5 text-white" /> : <FiCopy className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
            <div className="w-40">
              <label className="text-sm text-gray-400 mb-2 block">Referral Code</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={affiliateCode}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl text-white text-center font-mono font-bold"
                  style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">Share on:</span>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all" style={{ backgroundColor: '#1DA1F2' }}>
              <FaTwitter className="text-white" />
            </button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all" style={{ backgroundColor: '#0088cc' }}>
              <FaTelegram className="text-white" />
            </button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all" style={{ backgroundColor: '#1877F2' }}>
              <FaFacebook className="text-white" />
            </button>
            <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:scale-110 transition-all" style={{ backgroundColor: '#25D366' }}>
              <FaWhatsapp className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="rounded-xl p-4" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
          <FiDollarSign className="text-[#F7931A] text-xl mb-2" />
          <div className="text-xl font-bold text-white">{stats.totalEarnings}</div>
          <div className="text-xs text-gray-500">Total Earnings</div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
          <FiUsers className="text-[#00AEFF] text-xl mb-2" />
          <div className="text-xl font-bold text-white">{stats.totalReferrals}</div>
          <div className="text-xs text-gray-500">Total Referrals</div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
          <FiTrendingUp className="text-green-400 text-xl mb-2" />
          <div className="text-xl font-bold text-white">{stats.activeReferrals}</div>
          <div className="text-xs text-gray-500">Active Referrals</div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
          <FiGift className="text-purple-400 text-xl mb-2" />
          <div className="text-xl font-bold text-white">{stats.pendingCommission}</div>
          <div className="text-xs text-gray-500">Pending</div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="text-xl mb-2">💰</div>
          <div className="text-xl font-bold text-[#00AEFF]">{stats.commissionRate}</div>
          <div className="text-xs text-gray-500">Commission Rate</div>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="text-xl mb-2">👁️</div>
          <div className="text-xl font-bold text-white">{stats.lifetimeClicks.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Link Clicks</div>
        </div>
      </div>

      {/* Commission Tiers */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 className="text-xl font-bold text-white mb-6">Commission Tiers</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`rounded-xl p-4 text-center transition-all hover:scale-105 ${index === 1 ? 'ring-2 ring-[#00AEFF]' : ''}`}
              style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div 
                className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${tier.color}20`, color: tier.color }}
              >
                {tier.name === 'Bronze' && '🥉'}
                {tier.name === 'Silver' && '🥈'}
                {tier.name === 'Gold' && '🥇'}
                {tier.name === 'Platinum' && '💎'}
                {tier.name === 'Diamond' && '👑'}
              </div>
              <div className="font-bold text-white mb-1">{tier.name}</div>
              <div className="text-2xl font-bold mb-1" style={{ color: tier.color }}>{tier.commission}</div>
              <div className="text-xs text-gray-500">{tier.minReferrals}+ referrals</div>
              {index === 1 && (
                <div className="mt-2 text-xs px-2 py-1 rounded-md bg-[#00AEFF]/20 text-[#00AEFF]">Current</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Referrals Table */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 className="text-xl font-bold text-white mb-6">Your Referrals</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Joined</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Wagered</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Commission</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((ref) => (
                <tr key={ref.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4 px-4 text-white font-medium">{ref.username}</td>
                  <td className="py-4 px-4 text-gray-400">{ref.joined}</td>
                  <td className="py-4 px-4 text-white">{ref.wagered}</td>
                  <td className="py-4 px-4 font-medium" style={{ color: '#F7931A' }}>{ref.commission}</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      ref.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {ref.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How It Works */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h2 className="text-xl font-bold text-white mb-6">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(0,174,255,0.2)' }}>
              1️⃣
            </div>
            <h3 className="font-bold text-white mb-2">Share Your Link</h3>
            <p className="text-sm text-gray-400">Share your unique referral link with friends</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(247,147,26,0.2)' }}>
              2️⃣
            </div>
            <h3 className="font-bold text-white mb-2">Friends Sign Up</h3>
            <p className="text-sm text-gray-400">They register using your link or code</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(34,197,94,0.2)' }}>
              3️⃣
            </div>
            <h3 className="font-bold text-white mb-2">They Play Games</h3>
            <p className="text-sm text-gray-400">Your referrals play and wager on games</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ backgroundColor: 'rgba(168,85,247,0.2)' }}>
              4️⃣
            </div>
            <h3 className="font-bold text-white mb-2">Earn Commission</h3>
            <p className="text-sm text-gray-400">Get up to 40% of the house edge forever</p>
          </div>
        </div>
      </div>
    </div>
  )
}
