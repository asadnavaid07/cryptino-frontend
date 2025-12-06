import { useState, useEffect } from 'react'
import { FiSearch, FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi'

interface Game {
  id: string
  name: string
  provider: string
  category: string
  thumbnail: string
  description?: string
  game_url?: string
  isHot?: boolean
  isNew?: boolean
  players?: number
  rating?: string
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Category tabs matching Figma
const categoryTabs = [
  { id: 'lobby', name: 'Lobby', icon: '🎮' },
  { id: 'originals', name: 'Cryptino Original', icon: '⭐' },
  { id: 'slots', name: 'Slot Games', icon: '🎰' },
  { id: 'new', name: 'New Releases', icon: '✨' },
  { id: 'table', name: 'Table Games', icon: '🎲' },
  { id: 'live', name: 'Live Dealers', icon: '🃏' },
]

// Game providers from Figma
const gameProviders = [
  { name: 'Pragmatic Play', games: 478, logo: '🎰' },
  { name: 'Hacksaw Gaming', games: 113, logo: '🪚' },
  { name: 'Endorphina', games: 188, logo: '🎯' },
  { name: 'BGaming', games: 170, logo: '🎮' },
  { name: 'Platipus', games: 166, logo: '🐙' },
  { name: 'Belatra', games: 111, logo: '⭐' },
]

export default function Casino() {
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('lobby')
  const [search, setSearch] = useState('')
  const [selectedProvider] = useState('all') // eslint-disable-line @typescript-eslint/no-unused-vars

  // Fetch games from API
  useEffect(() => {
    async function fetchGames() {
      setLoading(true)
      try {
        const response = await fetch(`${API_URL}/api/games`)
        const data = await response.json()
        
        if (data.games && data.games.length > 0) {
          setGames(data.games)
        } else {
          setGames(getMockGames())
        }
      } catch (error) {
        console.error('Failed to fetch games:', error)
        setGames(getMockGames())
      } finally {
        setLoading(false)
      }
    }
    
    fetchGames()
  }, [])

  // Filter games
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase())
    const matchesProvider = selectedProvider === 'all' || game.provider === selectedProvider
    return matchesSearch && matchesProvider
  })

  const hotGames = games.filter(g => g.isHot).slice(0, 6)
  const newGames = games.filter(g => g.isNew).slice(0, 6)
  const slotGames = games.filter(g => g.category === 'slots').slice(0, 6)
  const crashGames = games.filter(g => g.category === 'crash').slice(0, 6)
  const liveGames = games.filter(g => g.category === 'live').slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Hero Banners */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Aviator Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 to-red-800 p-5 h-40">
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/40 text-white text-xs font-bold rounded flex items-center gap-1">📈 Crash</span>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 opacity-30">
            <img src="https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=200" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="relative z-10 mt-8">
            <h3 className="text-3xl font-black text-white tracking-tight">AVIATOR</h3>
            <p className="text-white/80 text-sm">SKY'S THE LIMIT!</p>
            <span className="inline-block mt-2 px-3 py-1 bg-black/30 text-white text-xs font-medium rounded">SPRIBE</span>
          </div>
        </div>

        {/* Dragon Bonus Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a1040] via-[#0F1C2E] to-[#1A3A5C] p-5 h-40 border border-purple-500/20">
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-2 py-1 bg-[#00A3FF]/20 text-[#00A3FF] text-xs font-bold rounded">✓ Promotion</span>
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded">New</span>
          </div>
          <div className="relative z-10 mt-6">
            <p className="text-white/80 text-sm font-medium">DRAGON BONUS</p>
            <h3 className="text-xl font-bold text-white">MORE CASH,</h3>
            <h3 className="text-xl font-bold text-white">NEW BONUS GAME!</h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="px-3 py-1 bg-yellow-400 text-black text-sm font-bold rounded">800,000 USD</span>
              <span className="text-yellow-400 text-sm font-bold">500,000 FS</span>
            </div>
          </div>
        </div>

        {/* Tournament Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#065F46] via-[#047857] to-[#059669] p-5 h-40">
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-black/30 text-white text-xs font-bold rounded flex items-center gap-1">🏆 Tournament</span>
          </div>
          <div className="relative z-10 mt-6">
            <h3 className="text-4xl font-black text-white">$2,000,000</h3>
            <p className="text-white font-bold text-lg">DROPS&WINS!</p>
          </div>
          <div className="absolute bottom-2 left-3">
            <span className="text-white/60 text-xs font-bold tracking-wider">PRAGMATICPLAY</span>
          </div>
        </div>
      </div>

      {/* Category Tabs - Blue theme matching Figma */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 font-medium text-sm ${
              activeTab === tab.id 
                ? 'bg-[#00A3FF] text-white shadow-lg shadow-[#00A3FF]/30' 
                : 'bg-[#1a2744] hover:bg-[#243656] text-gray-400'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.name}
          </button>
        ))}
        
        {/* Search */}
        <div className="relative ml-auto">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2.5 bg-[#1a2744] border border-[#2a3a5c] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#00A3FF] text-sm w-32"
          />
        </div>

        {/* Providers Dropdown */}
        <button className="px-4 py-2.5 bg-[#1a2744] border border-[#2a3a5c] rounded-lg text-gray-400 text-sm hover:bg-[#243656] transition-colors flex items-center gap-2">
          Providers
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <FiLoader className="w-10 h-10 text-primary animate-spin" />
        </div>
      )}

      {!loading && (
        <>
          {/* Cryptino Original Section */}
          <GameSection 
            title="Cryptino Original" 
            icon="💎" 
            games={hotGames.length > 0 ? hotGames : getMockGames().slice(0, 6)} 
          />

          {/* Slot Games Section */}
          <GameSection 
            title="Slot Games" 
            icon="🎰" 
            games={slotGames.length > 0 ? slotGames : getMockGames().slice(0, 6)} 
          />

          {/* New Games Section */}
          <GameSection 
            title="New" 
            icon="✨" 
            games={newGames.length > 0 ? newGames : getMockGames().slice(0, 6)} 
          />

          {/* Game Providers Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span>🎮</span> Game Providers
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-[#00A3FF] text-sm cursor-pointer hover:underline">All &gt;</span>
                <button className="p-1.5 rounded-lg bg-[#1a2744] hover:bg-[#243656] text-gray-400 hover:text-white transition-colors">
                  <FiChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-lg bg-[#1a2744] hover:bg-[#243656] text-gray-400 hover:text-white transition-colors">
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {gameProviders.map((provider) => (
                <div 
                  key={provider.name}
                  className="bg-[#0F1C2E] hover:bg-[#1a2744] border border-[#1a3a5c] rounded-xl p-4 text-center cursor-pointer transition-all hover:border-[#00A3FF]/50"
                >
                  <h3 className="font-bold text-white text-sm truncate">{provider.name}</h3>
                  <p className="text-[#00A3FF] text-xs mt-1">{provider.games} Games</p>
                </div>
              ))}
            </div>
          </section>

          {/* Crash Games Section */}
          <GameSection 
            title="Crash" 
            icon="🚀" 
            games={crashGames.length > 0 ? crashGames : getMockGames().filter(g => g.category === 'crash').slice(0, 6)} 
          />

          {/* Live Casino Section */}
          <GameSection 
            title="Live Casino" 
            icon="🎲" 
            games={liveGames.length > 0 ? liveGames : getMockGames().filter(g => g.category === 'live').slice(0, 6)} 
          />

          {/* Popular Games Section */}
          <GameSection 
            title="Popular Games" 
            icon="🔥" 
            games={filteredGames.slice(0, 6)} 
          />

          {/* All Games Grid */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">
                All Games
                <span className="text-gray-500 font-normal ml-2 text-sm">({filteredGames.length})</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredGames.slice(0, 18).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}

// Game Section Component
function GameSection({ title, icon, games }: { title: string, icon: string, games: Game[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span>{icon}</span> {title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[#00A3FF] text-sm cursor-pointer hover:underline">All &gt;</span>
          <button className="p-1.5 rounded-lg bg-[#1a2744] hover:bg-[#243656] text-gray-400 hover:text-white transition-colors">
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-lg bg-[#1a2744] hover:bg-[#243656] text-gray-400 hover:text-white transition-colors">
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}

// Game Card Component matching Figma design
function GameCard({ game }: { game: Game }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="group relative rounded-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Game Image */}
      <div className="aspect-[3/4] relative">
        <img 
          src={game.thumbnail}
          alt={game.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Hot/New Badge */}
        {game.isHot && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded">HOT</span>
          </div>
        )}
        {game.isNew && !game.isHot && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 bg-[#00A3FF] text-white text-[10px] font-bold rounded">NEW</span>
          </div>
        )}
        
        {/* Game Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 drop-shadow-lg">
            {game.name}
          </h3>
          <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-wider">
            {game.provider}
          </p>
        </div>

        {/* Hover Play Button */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
            <a 
              href={game.game_url || '#'} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg text-sm hover:shadow-lg hover:shadow-primary/50 transition-all"
            >
              Play Now
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// Mock games data matching Figma design
function getMockGames(): Game[] {
  return [
    { id: '1', name: 'LADY WOLF MOON MEGAWAYS', provider: 'BGaming', category: 'slots', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=400&fit=crop', players: 45230, rating: '4.8' },
    { id: '2', name: 'BLACKJACK', provider: 'GameArt', category: 'table', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=300&h=400&fit=crop', players: 38420, rating: '4.9' },
    { id: '3', name: 'THRONE OF CAMELOT', provider: 'GameArt', category: 'slots', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=400&fit=crop', players: 52100, rating: '4.7' },
    { id: '4', name: 'WILD SPIN DELUXE', provider: 'Platipus', category: 'slots', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop', players: 67800, rating: '4.9' },
    { id: '5', name: 'THE BIG SCORE', provider: 'Platipus', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=400&fit=crop', players: 19500, rating: '4.4' },
    { id: '6', name: 'GOLDEN JOKER 100', provider: 'TopSpin', category: 'slots', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=300&h=400&fit=crop', players: 89000, rating: '4.9' },
    { id: '7', name: 'SWEET BONANZA 1000', provider: 'Pragmatic Play', category: 'slots', isNew: true, thumbnail: 'https://images.unsplash.com/photo-1563941433-b6a094db1719?w=300&h=400&fit=crop', players: 31200, rating: '4.6' },
    { id: '8', name: 'LE VIKING', provider: 'Hacksaw Gaming', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=300&h=400&fit=crop', players: 34200, rating: '4.8' },
    { id: '9', name: 'GATES OF OLYMPUS 1000', provider: 'Pragmatic Play', category: 'slots', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&h=400&fit=crop', players: 22100, rating: '4.6' },
    { id: '10', name: 'DUEL AT DAWN', provider: 'Hacksaw Gaming', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1596731497977-f4f7d14bcc75?w=300&h=400&fit=crop', players: 56700, rating: '4.8' },
    { id: '11', name: 'SUGAR RUSH 1000', provider: 'Pragmatic Play', category: 'slots', isNew: true, thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop', players: 41200, rating: '4.7' },
    { id: '12', name: 'WANTED DEAD OR A WILD', provider: 'Hacksaw Gaming', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=300&h=400&fit=crop', players: 27800, rating: '4.5' },
    // Crash games
    { id: '13', name: 'STELLAR', provider: 'Orbital', category: 'crash', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=400&fit=crop', players: 52000, rating: '4.8' },
    { id: '14', name: 'SHOOTING GALAXY', provider: 'Mascot Gaming', category: 'crash', thumbnail: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=400&fit=crop', players: 41000, rating: '4.7' },
    { id: '15', name: 'ASTRO', provider: 'Orbital', category: 'crash', isNew: true, thumbnail: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=300&h=400&fit=crop', players: 38000, rating: '4.6' },
    { id: '16', name: 'TRIPLE CASH OR CRASH', provider: 'Betsoft Gaming', category: 'crash', thumbnail: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=400&fit=crop', players: 29000, rating: '4.5' },
    { id: '17', name: 'SPACE XY', provider: 'BGaming', category: 'crash', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=400&fit=crop', players: 65000, rating: '4.9' },
    { id: '18', name: 'DRAGON\'S CRASH', provider: 'BGaming', category: 'crash', thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=400&fit=crop', players: 32000, rating: '4.4' },
    // Live Casino games
    { id: '19', name: 'BLACKJACK LOBBY', provider: 'ImagineLive', category: 'live', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=300&h=400&fit=crop', players: 78000, rating: '4.9' },
    { id: '20', name: 'ROULETTE LOBBY', provider: 'ImagineLive', category: 'live', thumbnail: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&h=400&fit=crop', players: 67000, rating: '4.8' },
    { id: '21', name: 'DYNAMITE ROULETTE', provider: 'ImagineLive', category: 'live', isNew: true, thumbnail: 'https://images.unsplash.com/photo-1596731497977-f4f7d14bcc75?w=300&h=400&fit=crop', players: 45000, rating: '4.7' },
    { id: '22', name: 'CASINO HOLDEM', provider: 'ImagineLive', category: 'live', thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop', players: 34000, rating: '4.6' },
    { id: '23', name: 'BACCARAT', provider: 'ImagineLive', category: 'live', isHot: true, thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=400&fit=crop', players: 56000, rating: '4.8' },
    { id: '24', name: 'LIGHTNING ROULETTE', provider: 'Evolution Gaming', category: 'live', thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=400&fit=crop', players: 89000, rating: '4.9' },
  ]
}
