import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'

interface Game {
  id: string
  name: string
  slug: string
  provider: string
  category: string
  thumbnail: string | null
  rtp: number | null
  is_featured: boolean
  is_new: boolean
  is_popular: boolean
  is_active: boolean
  created_at: string
}

export default function Games() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingGame, setEditingGame] = useState<Game | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    provider: '',
    category: 'slots',
    thumbnail: '',
    rtp: '',
    is_featured: false,
    is_new: false,
    is_popular: false,
    is_active: true
  })

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setGames(data || [])
    } catch (error) {
      console.error('Error fetching games:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const gameData = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        provider: formData.provider,
        category: formData.category,
        thumbnail: formData.thumbnail || null,
        rtp: formData.rtp ? parseFloat(formData.rtp) : null,
        is_featured: formData.is_featured,
        is_new: formData.is_new,
        is_popular: formData.is_popular,
        is_active: formData.is_active
      }

      if (editingGame) {
        const { error } = await supabase
          .from('games')
          .update(gameData)
          .eq('id', editingGame.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('games')
          .insert([gameData])
        if (error) throw error
      }

      setShowAddModal(false)
      setEditingGame(null)
      resetForm()
      fetchGames()
    } catch (error) {
      console.error('Error saving game:', error)
      alert('Error saving game')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this game?')) return
    try {
      const { error } = await supabase.from('games').delete().eq('id', id)
      if (error) throw error
      fetchGames()
    } catch (error) {
      console.error('Error deleting game:', error)
    }
  }

  const toggleStatus = async (game: Game, field: 'is_active' | 'is_featured' | 'is_new' | 'is_popular') => {
    try {
      const { error } = await supabase
        .from('games')
        .update({ [field]: !game[field] })
        .eq('id', game.id)
      if (error) throw error
      fetchGames()
    } catch (error) {
      console.error('Error updating game:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      provider: '',
      category: 'slots',
      thumbnail: '',
      rtp: '',
      is_featured: false,
      is_new: false,
      is_popular: false,
      is_active: true
    })
  }

  const openEditModal = (game: Game) => {
    setEditingGame(game)
    setFormData({
      name: game.name,
      slug: game.slug,
      provider: game.provider,
      category: game.category,
      thumbnail: game.thumbnail || '',
      rtp: game.rtp?.toString() || '',
      is_featured: game.is_featured,
      is_new: game.is_new,
      is_popular: game.is_popular,
      is_active: game.is_active
    })
    setShowAddModal(true)
  }

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.provider.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || game.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ['all', 'slots', 'live', 'crash', 'table', 'poker']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Game Management</h1>
        <button
          onClick={() => { resetForm(); setEditingGame(null); setShowAddModal(true) }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:opacity-90"
        >
          <FiPlus /> Add Game
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1a1d2e] border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-lg capitalize ${
                categoryFilter === cat
                  ? 'bg-cyan-500 text-white'
                  : 'bg-[#1a1d2e] text-gray-400 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Table */}
      <div className="bg-[#1a1d2e] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left p-4 font-medium text-gray-400">Game</th>
              <th className="text-left p-4 font-medium text-gray-400">Provider</th>
              <th className="text-left p-4 font-medium text-gray-400">Category</th>
              <th className="text-left p-4 font-medium text-gray-400">RTP</th>
              <th className="text-center p-4 font-medium text-gray-400">Status</th>
              <th className="text-center p-4 font-medium text-gray-400">Tags</th>
              <th className="text-right p-4 font-medium text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : filteredGames.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">No games found</td></tr>
            ) : (
              filteredGames.map(game => (
                <tr key={game.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-xl">
                        🎮
                      </div>
                      <div>
                        <div className="font-medium">{game.name}</div>
                        <div className="text-sm text-gray-400">{game.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{game.provider}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-white/10 rounded text-sm capitalize">{game.category}</span>
                  </td>
                  <td className="p-4 text-gray-300">{game.rtp ? `${game.rtp}%` : '-'}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleStatus(game, 'is_active')}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        game.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {game.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-1">
                      <button
                        onClick={() => toggleStatus(game, 'is_featured')}
                        className={`p-1.5 rounded ${game.is_featured ? 'bg-yellow-500/20 text-yellow-400' : 'bg-white/5 text-gray-500'}`}
                        title="Featured"
                      >
                        <FiStar className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleStatus(game, 'is_new')}
                        className={`p-1.5 rounded ${game.is_new ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-gray-500'}`}
                        title="New"
                      >
                        <FiZap className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleStatus(game, 'is_popular')}
                        className={`p-1.5 rounded ${game.is_popular ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-500'}`}
                        title="Popular"
                      >
                        <FiTrendingUp className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(game)}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(game.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1d2e] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold">{editingGame ? 'Edit Game' : 'Add New Game'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Game Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated-from-name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Provider *</label>
                  <input
                    type="text"
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="slots">Slots</option>
                    <option value="live">Live Casino</option>
                    <option value="crash">Crash</option>
                    <option value="table">Table Games</option>
                    <option value="poker">Poker</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">RTP (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.rtp}
                    onChange={(e) => setFormData({ ...formData, rtp: e.target.value })}
                    placeholder="96.50"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Thumbnail URL</label>
                  <input
                    type="text"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span>Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span>Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_new}
                    onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span>New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span>Popular</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingGame(null) }}
                  className="flex-1 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium hover:opacity-90"
                >
                  {editingGame ? 'Update' : 'Add'} Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
