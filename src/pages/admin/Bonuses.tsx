import { useState } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiGift, FiPercent, FiDollarSign, FiClock } from 'react-icons/fi'

interface Bonus {
  id: string
  name: string
  type: 'welcome' | 'deposit' | 'reload' | 'cashback' | 'free_spins' | 'referral'
  value: number
  valueType: 'percentage' | 'fixed'
  minDeposit: number
  maxBonus: number
  wagerRequirement: number
  validDays: number
  isActive: boolean
  usageCount: number
  createdAt: string
}

const sampleBonuses: Bonus[] = [
  { id: '1', name: 'Welcome Bonus', type: 'welcome', value: 100, valueType: 'percentage', minDeposit: 20, maxBonus: 500, wagerRequirement: 35, validDays: 30, isActive: true, usageCount: 245, createdAt: '2024-01-01' },
  { id: '2', name: 'First Deposit', type: 'deposit', value: 50, valueType: 'percentage', minDeposit: 50, maxBonus: 200, wagerRequirement: 25, validDays: 14, isActive: true, usageCount: 189, createdAt: '2024-01-05' },
  { id: '3', name: 'Reload Friday', type: 'reload', value: 25, valueType: 'percentage', minDeposit: 30, maxBonus: 100, wagerRequirement: 20, validDays: 7, isActive: true, usageCount: 78, createdAt: '2024-01-10' },
  { id: '4', name: 'VIP Cashback', type: 'cashback', value: 10, valueType: 'percentage', minDeposit: 0, maxBonus: 1000, wagerRequirement: 1, validDays: 7, isActive: true, usageCount: 56, createdAt: '2024-01-15' },
  { id: '5', name: '50 Free Spins', type: 'free_spins', value: 50, valueType: 'fixed', minDeposit: 25, maxBonus: 50, wagerRequirement: 40, validDays: 7, isActive: false, usageCount: 320, createdAt: '2024-01-20' },
  { id: '6', name: 'Refer a Friend', type: 'referral', value: 25, valueType: 'fixed', minDeposit: 0, maxBonus: 25, wagerRequirement: 10, validDays: 30, isActive: true, usageCount: 145, createdAt: '2024-02-01' },
]

export default function Bonuses() {
  const [bonuses, setBonuses] = useState<Bonus[]>(sampleBonuses)
  const [showModal, setShowModal] = useState(false)
  const [editingBonus, setEditingBonus] = useState<Bonus | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'welcome' as Bonus['type'],
    value: '',
    valueType: 'percentage' as 'percentage' | 'fixed',
    minDeposit: '',
    maxBonus: '',
    wagerRequirement: '',
    validDays: '',
    isActive: true
  })

  const bonusTypes = [
    { value: 'welcome', label: 'Welcome Bonus', icon: '🎉' },
    { value: 'deposit', label: 'Deposit Bonus', icon: '💰' },
    { value: 'reload', label: 'Reload Bonus', icon: '🔄' },
    { value: 'cashback', label: 'Cashback', icon: '💸' },
    { value: 'free_spins', label: 'Free Spins', icon: '🎰' },
    { value: 'referral', label: 'Referral Bonus', icon: '👥' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newBonus: Bonus = {
      id: editingBonus?.id || Date.now().toString(),
      name: formData.name,
      type: formData.type,
      value: parseFloat(formData.value),
      valueType: formData.valueType,
      minDeposit: parseFloat(formData.minDeposit) || 0,
      maxBonus: parseFloat(formData.maxBonus) || 0,
      wagerRequirement: parseFloat(formData.wagerRequirement) || 0,
      validDays: parseInt(formData.validDays) || 30,
      isActive: formData.isActive,
      usageCount: editingBonus?.usageCount || 0,
      createdAt: editingBonus?.createdAt || new Date().toISOString()
    }

    if (editingBonus) {
      setBonuses(bonuses.map(b => b.id === editingBonus.id ? newBonus : b))
    } else {
      setBonuses([newBonus, ...bonuses])
    }

    setShowModal(false)
    setEditingBonus(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'welcome',
      value: '',
      valueType: 'percentage',
      minDeposit: '',
      maxBonus: '',
      wagerRequirement: '',
      validDays: '',
      isActive: true
    })
  }

  const openEditModal = (bonus: Bonus) => {
    setEditingBonus(bonus)
    setFormData({
      name: bonus.name,
      type: bonus.type,
      value: bonus.value.toString(),
      valueType: bonus.valueType,
      minDeposit: bonus.minDeposit.toString(),
      maxBonus: bonus.maxBonus.toString(),
      wagerRequirement: bonus.wagerRequirement.toString(),
      validDays: bonus.validDays.toString(),
      isActive: bonus.isActive
    })
    setShowModal(true)
  }

  const toggleActive = (id: string) => {
    setBonuses(bonuses.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b))
  }

  const deleteBonus = (id: string) => {
    if (confirm('Are you sure you want to delete this bonus?')) {
      setBonuses(bonuses.filter(b => b.id !== id))
    }
  }

  const getTypeIcon = (type: string) => {
    return bonusTypes.find(t => t.value === type)?.icon || '🎁'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bonus Management</h1>
        <button
          onClick={() => { resetForm(); setEditingBonus(null); setShowModal(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:opacity-90"
        >
          <FiPlus /> Create Bonus
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <FiGift className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{bonuses.length}</div>
              <div className="text-sm text-gray-400">Total Bonuses</div>
            </div>
          </div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <FiPercent className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{bonuses.filter(b => b.isActive).length}</div>
              <div className="text-sm text-gray-400">Active Bonuses</div>
            </div>
          </div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">{bonuses.reduce((sum, b) => sum + b.usageCount, 0)}</div>
              <div className="text-sm text-gray-400">Total Claims</div>
            </div>
          </div>
        </div>
        <div className="bg-[#1a1d2e] rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <FiClock className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold">$12,450</div>
              <div className="text-sm text-gray-400">Bonus Given (30d)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bonuses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bonuses.map(bonus => (
          <div key={bonus.id} className={`bg-[#1a1d2e] rounded-xl p-6 ${!bonus.isActive && 'opacity-60'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{getTypeIcon(bonus.type)}</span>
                <div>
                  <h3 className="font-semibold">{bonus.name}</h3>
                  <span className="text-xs px-2 py-0.5 bg-white/10 rounded capitalize">{bonus.type.replace('_', ' ')}</span>
                </div>
              </div>
              <button
                onClick={() => toggleActive(bonus.id)}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  bonus.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {bonus.isActive ? 'Active' : 'Inactive'}
              </button>
            </div>

            <div className="text-3xl font-bold text-cyan-400 mb-4">
              {bonus.valueType === 'percentage' ? `${bonus.value}%` : `$${bonus.value}`}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Min Deposit</span>
                <span>${bonus.minDeposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Max Bonus</span>
                <span>${bonus.maxBonus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Wagering</span>
                <span>{bonus.wagerRequirement}x</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Valid For</span>
                <span>{bonus.validDays} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Claims</span>
                <span>{bonus.usageCount}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => openEditModal(bonus)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20"
              >
                <FiEdit2 className="w-4 h-4" /> Edit
              </button>
              <button
                onClick={() => deleteBonus(bonus.id)}
                className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1d2e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">{editingBonus ? 'Edit Bonus' : 'Create New Bonus'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Bonus Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Bonus Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Bonus['type'] })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                >
                  {bonusTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.icon} {type.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Value *</label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Value Type</label>
                  <select
                    value={formData.valueType}
                    onChange={(e) => setFormData({ ...formData, valueType: e.target.value as 'percentage' | 'fixed' })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Min Deposit ($)</label>
                  <input
                    type="number"
                    value={formData.minDeposit}
                    onChange={(e) => setFormData({ ...formData, minDeposit: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Max Bonus ($)</label>
                  <input
                    type="number"
                    value={formData.maxBonus}
                    onChange={(e) => setFormData({ ...formData, maxBonus: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Wager Requirement (x)</label>
                  <input
                    type="number"
                    value={formData.wagerRequirement}
                    onChange={(e) => setFormData({ ...formData, wagerRequirement: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Valid Days</label>
                  <input
                    type="number"
                    value={formData.validDays}
                    onChange={(e) => setFormData({ ...formData, validDays: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 rounded"
                />
                <span>Active</span>
              </label>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingBonus(null) }}
                  className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:opacity-90"
                >
                  {editingBonus ? 'Update' : 'Create'} Bonus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
