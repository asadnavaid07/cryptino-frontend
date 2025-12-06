import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight, FiSearch } from 'react-icons/fi'
import { FaBitcoin, FaEthereum } from 'react-icons/fa'
import { SiTether, SiDogecoin, SiLitecoin, SiRipple } from 'react-icons/si'
import { gamesApi } from '../lib/api'

// Types
interface Game {
  id: string
  name: string
  provider: string
  category: string
  thumbnail: string
  isHot?: boolean
  isNew?: boolean
}

// Category tabs matching Figma
const categoryTabs = [
  { id: 'lobby', name: 'Lobby', icon: '🏠' },
  { id: 'originals', name: 'Cryptino Original', icon: '⭐' },
  { id: 'slots', name: 'Slot Games', icon: '🎰' },
  { id: 'live', name: 'Live Dealers', icon: '🎲' },
  { id: 'table', name: 'Table Games', icon: '♠️' },
  { id: 'new', name: 'New Releases', icon: '🆕' },
]

// Crypto icons for deposit bar
const cryptoIcons = [
  { icon: <FaBitcoin className="text-[#F7931A]" />, name: 'BTC' },
  { icon: <FaEthereum className="text-[#627EEA]" />, name: 'ETH' },
  { icon: <span className="text-white text-xs font-bold">X</span>, name: 'X' },
  { icon: <SiTether className="text-[#26A17B]" />, name: 'USDT' },
  { icon: <span className="text-[#F0B90B] text-xs font-bold">S</span>, name: 'SOL' },
  { icon: <SiDogecoin className="text-[#C2A633]" />, name: 'DOGE' },
  { icon: <SiLitecoin className="text-[#345D9D]" />, name: 'LTC' },
  { icon: <SiRipple className="text-[#0085C0]" />, name: 'XRP' },
]

// Sports categories
const sportsCategories = [
  { name: 'SOCCER', icon: '⚽' },
  { name: 'TENNIS', icon: '🎾' },
  { name: 'CRICKET', icon: '🏏' },
  { name: 'VOLLEYBALL', icon: '🏐' },
  { name: 'BASKETBALL', icon: '🏀' },
  { name: 'ICE HOCKEY', icon: '🏒' },
]

// Game providers
const gameProviders = [
  { name: 'PRAGMATIC PLAY', games: 478 },
  { name: 'HACKSAW', games: 113 },
  { name: 'ENDORPHINA', games: 188 },
  { name: 'BGAMING', games: 170 },
  { name: 'PLATIPUS', games: 166 },
  { name: 'BELATRA', games: 111 },
]

// Leaderboard data from Figma
const leaderboardData = [
  { game: 'Money Pot', icon: '💰', player: 'Lu*******', bet: '$0.40', coin: 'BTC', mult: '5.50x', payout: '$2.20' },
  { game: 'Lady Wolf Moon Megaways', icon: '🐺', player: 'Si*****', bet: '$0.60', coin: 'ETH', mult: '1.33x', payout: '$0.80' },
  { game: 'Fortune Coins', icon: '🪙', player: 'Bo**********', bet: '$0.20', coin: 'USDT', mult: '4.00x', payout: '$0.80' },
  { game: 'Fortune Coins', icon: '🪙', player: 'Bo**********', bet: '$0.20', coin: 'BTC', mult: '3.00x', payout: '$0.60' },
  { game: 'Super Golden Dragon Inferno', icon: '🐉', player: 'Lyn*', bet: '$3.75', coin: 'ETH', mult: '1.76x', payout: '$6.60' },
  { game: 'AirBoss', icon: '✈️', player: 'Pi****', bet: '$0.50', coin: 'DOGE', mult: '1.68x', payout: '$0.84' },
  { game: 'West Town', icon: '🤠', player: 'Pl****', bet: '$0.18', coin: 'LTC', mult: '1.11x', payout: '$0.20' },
]

// Sample fallback games data with real images
const sampleGames: Game[] = [
  { id: '1', name: 'Aviator', provider: 'SPRIBE', category: 'crash', thumbnail: 'https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=300&h=400&fit=crop', isHot: true },
  { id: '2', name: 'Sweet Bonanza', provider: 'PRAGMATIC PLAY', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1563941433-b6a094db1719?w=300&h=400&fit=crop', isHot: true },
  { id: '3', name: 'Gates of Olympus', provider: 'PRAGMATIC PLAY', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&h=400&fit=crop', isHot: true },
  { id: '4', name: 'Wanted Dead or Wild', provider: 'HACKSAW', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1596731497977-f4f7d14bcc75?w=300&h=400&fit=crop', isHot: true },
  { id: '5', name: 'Crazy Time', provider: 'EVOLUTION', category: 'live', thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=400&fit=crop', isHot: true },
  { id: '6', name: 'Big Bass Bonanza', provider: 'PRAGMATIC PLAY', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=300&h=400&fit=crop', isNew: true },
  { id: '7', name: 'Sugar Rush', provider: 'PRAGMATIC PLAY', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=400&fit=crop', isNew: true },
  { id: '8', name: 'Blackjack', provider: 'EVOLUTION', category: 'live', thumbnail: 'https://images.unsplash.com/photo-1541278107931-e006523892df?w=300&h=400&fit=crop', isHot: true },
  { id: '9', name: 'Le Viking', provider: 'HACKSAW GAMING', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=300&h=400&fit=crop', isNew: true },
  { id: '10', name: 'Wild Spin Deluxe', provider: 'PLATIPUS', category: 'slots', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300&h=400&fit=crop', isHot: true },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('lobby')
  const [games, setGames] = useState<Game[]>(sampleGames)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch games from API (optional - keep sample games as fallback)
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await gamesApi.getAll()
        if (response.data && response.data.games && response.data.games.length > 0) {
          setGames(response.data.games)
        }
      } catch (error) {
        // Keep sample games on error - no need to log
      }
    }
    fetchGames()
  }, [])

  // Get different sections of games - 6 games per section
  const originalGames = games.filter(g => g.isHot).slice(0, 6)
  const slotGamesData = games.filter(g => g.category === 'mmorpg' || g.category === 'slots').slice(0, 6)
  const newGamesData = games.filter(g => g.isNew).slice(0, 6)
  const liveWinsGames = games.slice(0, 8)
  
  // Filter games by search
  const filteredGames = searchQuery 
    ? games.filter(g => g.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : games

  return (
    <div className="space-y-5">
      {/* Hero Banner - Using the Cryptino banner with mascots */}
      <div 
        className="relative rounded-2xl overflow-hidden min-h-[320px]"
        style={{
          backgroundImage: 'url("/images/image.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#0D1B2A'
        }}
      >
        {/* Cyan bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00A3FF] to-transparent" />
        
        <div className="relative z-10 p-8 h-full flex flex-col justify-center min-h-[320px]">
          <h1 className="text-4xl font-bold text-white mb-3">Welcome to<br/>Cryptino</h1>
          <p className="text-gray-300 text-base mb-6">Get first deposit 150% bonus up to 3000 EUR</p>
          <Link 
            to="/signup"
            className="inline-block px-8 py-3 rounded-xl text-white font-bold w-fit"
            style={{ background: 'linear-gradient(135deg, #00B4D8 0%, #00A3FF 100%)', boxShadow: '0 4px 20px rgba(0, 163, 255, 0.4)' }}
          >
            Register Now
          </Link>
        </div>
        
        {/* Carousel dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <span className="w-2 h-2 rounded-full bg-white"></span>
          <span className="w-2 h-2 rounded-full bg-white/40"></span>
          <span className="w-2 h-2 rounded-full bg-white/40"></span>
          <span className="w-2 h-2 rounded-full bg-white/40"></span>
          <span className="w-2 h-2 rounded-full bg-white/40"></span>
        </div>
      </div>

      {/* Deposit Now Bar */}
      <div className="flex items-center justify-between bg-[#151A23] rounded-xl px-4 py-3">
        <div className="flex items-center gap-4">
          <span className="text-[#7D8CA3] text-sm">Want to play? Deposit now</span>
          <div className="flex items-center gap-2">
            {cryptoIcons.map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full bg-[#1C2333] flex items-center justify-center cursor-pointer hover:bg-[#252D3D] transition-colors">
                {c.icon}
              </div>
            ))}
          </div>
        </div>
        <button 
          className="px-5 py-2 rounded-lg text-white text-sm font-medium"
          style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' }}
        >
          Deposit
        </button>
      </div>

      {/* VIP Club & Mission Cards - Matching Figma */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/vip" className="bg-[#0F1C2E] hover:bg-[#1a2744] border border-[#1a3a5c] rounded-xl p-5 flex items-center gap-4 transition-all">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-yellow-600/30 to-yellow-800/20 flex items-center justify-center">
            <span className="text-3xl">👑</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">VIP Club</h3>
            <p className="text-gray-400 text-sm">Exclusive perks. Elite access. VIP only</p>
          </div>
        </Link>
        <Link to="/challenges" className="bg-[#0F1C2E] hover:bg-[#1a2744] border border-[#1a3a5c] rounded-xl p-5 flex items-center gap-4 transition-all">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-orange-600/30 to-orange-800/20 flex items-center justify-center">
            <span className="text-3xl">⭐</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Mission</h3>
            <p className="text-gray-400 text-sm">Rewarding loyalty with premium experiences.</p>
          </div>
        </Link>
      </div>

      {/* Category Icons - 4 big icons */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { name: 'Casino', icon: '🎰', path: '/casino', color: 'from-pink-500 to-purple-600' },
          { name: 'Sports', icon: '⚽', path: '/sports', color: 'from-cyan-500 to-blue-600' },
          { name: 'Live Casino', icon: '🎲', path: '/casino', color: 'from-red-500 to-orange-500' },
          { name: 'Mini Games', icon: '🎮', path: '/casino', color: 'from-blue-500 to-cyan-500' },
        ].map((item) => (
          <Link key={item.name} to={item.path} className="bg-[#0F1C2E] hover:bg-[#1a2744] border border-[#1a3a5c] rounded-xl p-4 text-center transition-all group">
            <div className={`w-14 h-14 mx-auto mb-2 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
              <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
            </div>
            <span className="text-white text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Category Tabs - Blue theme matching Figma */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveTab('lobby')}
          className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'lobby' 
              ? 'bg-[#00A3FF] text-white' 
              : 'bg-[#1a2744] text-gray-400 hover:bg-[#243656] hover:text-white'
          }`}
        >
          🏠 Lobby
        </button>
        {categoryTabs.slice(1).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-[#00A3FF] text-white' 
                : 'bg-[#1a2744] text-gray-400 hover:bg-[#243656] hover:text-white'
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2.5 bg-[#1a2744] border border-[#2a3a5c] rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00A3FF] w-32"
            />
          </div>
          <button className="px-4 py-2.5 bg-[#1a2744] border border-[#2a3a5c] rounded-lg text-gray-400 text-sm hover:bg-[#243656] transition-colors flex items-center gap-2">
            Providers
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cryptino Original Section */}
      {loading ? (
        <LoadingSection />
      ) : (
        <>
          <GameSection title="Cryptino Original" icon="⭐" games={originalGames.length > 0 ? originalGames : games.slice(0, 6)} />
          <GameSection title="Slot Games" icon="🎰" games={slotGamesData.length > 0 ? slotGamesData : games.slice(6, 12)} />
        </>
      )}

      {/* No Crypto Banner */}
      <div className="bg-[#151A23] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">No Crypto? No Problem!</span>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💳</span>
            <span className="w-10 h-6 bg-[#1A1F6C] rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</span>
            <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#EB001B] to-[#F79E1B] flex items-center justify-center">
              <span className="text-xs">●●</span>
            </span>
          </div>
        </div>
        <button className="px-5 py-2 rounded-lg text-white text-sm font-medium" style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' }}>
          Buy Crypto
        </button>
      </div>

      {/* Live Sports Section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold flex items-center gap-2">
            <span className="text-[#00A3FF]">🔴</span> Live Sports
          </h2>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg text-white text-xs font-medium" style={{ background: 'linear-gradient(135deg, #00A3FF 0%, #0090E0 100%)' }}>
              Place Bet
            </button>
            <span className="text-[#00A3FF] text-xs cursor-pointer">See All Live</span>
          </div>
        </div>
        {/* Sports tabs */}
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {['Football', 'Tennis', 'Basketball', 'Ice Hockey', 'CS2', 'Dota 2', 'LoL', 'eFootball', 'Volleyball', 'Cricket', 'Table Tennis'].map((sport, i) => (
            <button key={sport} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${i === 0 ? 'bg-[#00A3FF] text-white' : 'bg-[#1a2744] text-gray-400 hover:bg-[#243656]'}`}>
              {sport}
            </button>
          ))}
        </div>
        {/* Match cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { league: 'Championship of Bulgaria, 1 league', team1: 'POFC Botev Vratsa', team2: 'Septemvri Sofia', score1: 1, score2: 2, odds: ['1.06', '2.25', '2.07'] },
            { league: 'Ukraine, Premier League', team1: 'Kryvyi Rihsky', team2: 'Oleksandr Kyiv', score1: 0, score2: 0, odds: ['12.20', '5.97', '1.20'] },
            { league: 'Championship of Uzbekistan, Super league', team1: 'Bunyodkor FK Urgench', team2: 'Nasof', score1: 0, score2: 0, odds: ['', '', ''] },
            { league: 'Championship of Latvia, Virsliga', team1: 'FC Metta', team2: 'Liepaja', score1: 0, score2: 0, odds: ['25.00', '13.46', '1.05'] },
          ].map((match, i) => (
            <div key={i} className="bg-[#151A23] rounded-xl p-3">
              <div className="text-[10px] text-[#7D8CA3] mb-2 truncate">{match.league}</div>
              <div className="space-y-1 mb-2">
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs">{match.team1}</span>
                  <span className="text-white text-xs font-bold">{match.score1}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white text-xs">{match.team2}</span>
                  <span className="text-white text-xs font-bold">{match.score2}</span>
                </div>
              </div>
              <div className="flex gap-1">
                {match.odds.map((odd, j) => (
                  <button key={j} className="flex-1 py-1.5 bg-[#1C2333] hover:bg-[#252D3D] text-white text-xs rounded transition-colors">
                    {odd || '-'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sports Categories - Responsive */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold">🏆 Sports</h2>
          <NavArrows />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {sportsCategories.map((sport, i) => {
            const sportGradients = [
              'from-cyan-600 to-blue-800',
              'from-yellow-500 to-orange-700',
              'from-blue-600 to-indigo-800',
              'from-purple-600 to-pink-800',
              'from-orange-500 to-red-700',
              'from-cyan-500 to-blue-800',
            ]
            return (
              <Link key={sport.name} to="/sports" className={`relative rounded-xl overflow-hidden aspect-square group bg-gradient-to-br ${sportGradients[i % sportGradients.length]}`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-50">
                  <span className="text-5xl">{sport.icon}</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="absolute bottom-3 left-0 right-0 text-center text-white text-sm font-bold">{sport.name}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Live Wins - Using real game images */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold flex items-center gap-2">🎉 Live Wins</h2>
          <NavArrows />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {(loading ? [...Array(8)] : games.slice(0, 8)).map((game, i) => {
            const multipliers = ['43x', '12x', '8x', '156x', '34x', '21x', '67x', '89x']
            const players = ['Ev**y', 'Lu**', 'Ma**', 'Al**', 'Jo**', 'Sa**', 'Mi**', 'Da**']
            const gradients = [
              'from-purple-600 to-indigo-800',
              'from-blue-600 to-cyan-800',
              'from-emerald-600 to-teal-800',
              'from-orange-500 to-red-700',
              'from-pink-500 to-purple-700',
              'from-amber-500 to-orange-700',
              'from-cyan-500 to-blue-700',
              'from-rose-500 to-pink-700',
            ]
            
            if (loading) {
              return (
                <div key={i} className="flex-shrink-0 w-28 aspect-[3/4] rounded-xl bg-[#151A23] animate-pulse" />
              )
            }
            
            return (
              <div key={game.id} className="flex-shrink-0 w-28 relative rounded-xl overflow-hidden">
                <div className="w-full aspect-[3/4] relative">
                  {game.thumbnail ? (
                    <img src={game.thumbnail} alt={game.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}>
                      <span className="text-4xl opacity-50">🎰</span>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                  <p className="text-white text-[10px] font-medium truncate">{game.name}</p>
                  <p className="text-[#7D8CA3] text-[8px]">{players[i % players.length]}</p>
                  <p className="text-[#00A3FF] text-[10px] font-bold">{multipliers[i % multipliers.length]}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* New Games */}
      {!loading && <GameSection title="New" icon="🆕" games={newGamesData.length > 0 ? newGamesData : games.slice(12, 18).map(g => ({ ...g, isNew: true }))} />}

      {/* Promotions - Matching Figma */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold">🎁 Promotions</h2>
          <NavArrows />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'CASINO WELCOME BONUS',
              subtitle: '100 FreeSpins - WAGER FREE',
              highlight: 'NO WAGERING\n100 FREE SPINS',
              gradient: 'from-purple-900/80 to-indigo-900/80',
              img: '🎰'
            },
            { 
              title: 'SPORTS WELCOME BONUS',
              subtitle: 'Get 100% of the first bet amount back if the bet is lost',
              highlight: '100% NO RISK\nSPORTS BONUS',
              gradient: 'from-blue-900/80 to-cyan-900/80',
              img: '⚽'
            },
            { 
              title: 'NBA PLAYOFFS CASHBACK',
              subtitle: 'NBA Playoffs: 10% Cashback on Lost Bets',
              highlight: 'BET ON THE NBA PLAYOFFS\n& GET 10% CASHBACK',
              gradient: 'from-orange-900/80 to-red-900/80',
              img: '🏀'
            },
          ].map((promo, i) => (
            <div key={i} className={`bg-gradient-to-br ${promo.gradient} rounded-xl overflow-hidden border border-white/10`}>
              <div className="h-32 flex items-center justify-center relative">
                <span className="text-6xl opacity-50">{promo.img}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white font-black text-center text-lg whitespace-pre-line leading-tight">{promo.highlight}</p>
                </div>
              </div>
              <div className="p-4 bg-[#0F1C2E]">
                <h3 className="text-white font-bold text-sm mb-1">{promo.title}</h3>
                <p className="text-gray-400 text-xs mb-3">{promo.subtitle}</p>
                <div className="flex gap-2">
                  <button className="text-[#00A3FF] text-xs hover:underline">Read More</button>
                  <button className="px-4 py-1.5 bg-[#00A3FF] text-white text-xs font-medium rounded-lg hover:bg-[#0090E0] transition-colors">Get Bonus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Game Providers - Matching Figma design */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold">🎮 Game Providers</h2>
          <div className="flex items-center gap-2">
            <span className="text-[#00A3FF] text-xs cursor-pointer">All &gt;</span>
            <NavArrows />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { name: 'PRAGMATIC PLAY', games: 478, logo: '🎰' },
            { name: 'HACKSAW', games: 113, logo: '⚔️' },
            { name: 'ENDORPHINA', games: 188, logo: '🎲' },
            { name: 'BGAMING', games: 170, logo: '🎮' },
            { name: 'PLATIPUS', games: 166, logo: '🐙' },
            { name: 'BELATRA', games: 111, logo: '🎯' },
          ].map((provider) => (
            <div key={provider.name} className="bg-[#0F1C2E] hover:bg-[#1a2744] border border-[#1a3a5c] rounded-xl p-4 text-center cursor-pointer transition-all hover:border-[#00A3FF]/50">
              <div className="h-10 flex items-center justify-center mb-2">
                <span className="text-white font-bold text-sm tracking-wide">{provider.name}</span>
              </div>
              <p className="text-[#00A3FF] text-xs font-medium">{provider.games} Games</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-white font-bold">Leaderboard</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-[#1C2333] text-white text-xs rounded-lg">Recent Winners</button>
            <button className="px-3 py-1.5 text-[#7D8CA3] text-xs rounded-lg hover:bg-[#1C2333]">Top Winners</button>
          </div>
        </div>
        <div className="bg-[#151A23] rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1C2333]">
                <th className="text-left text-[#7D8CA3] text-[10px] font-medium py-3 px-4">GAME</th>
                <th className="text-left text-[#7D8CA3] text-[10px] font-medium py-3 px-4">PLAYER</th>
                <th className="text-left text-[#7D8CA3] text-[10px] font-medium py-3 px-4">BET AMOUNT</th>
                <th className="text-left text-[#7D8CA3] text-[10px] font-medium py-3 px-4">MULTIPLIER</th>
                <th className="text-right text-[#7D8CA3] text-[10px] font-medium py-3 px-4">PAYOUT</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry, i) => (
                <tr key={i} className="border-b border-[#1C2333]/50 hover:bg-[#1C2333] transition-colors">
                  <td className="py-2.5 px-4">
                    <div className="flex items-center gap-2">
                      <span>{entry.icon}</span>
                      <span className="text-white text-xs">{entry.game}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-[#7D8CA3] text-xs">{entry.player}</td>
                  <td className="py-2.5 px-4">
                    <span className="text-white text-xs">{entry.bet}</span>
                    <span className="ml-1 text-[#F7931A]">●</span>
                  </td>
                  <td className="py-2.5 px-4 text-white text-xs">{entry.mult}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className="text-[#00A3FF] text-xs font-medium">{entry.payout}</span>
                    <span className="ml-1 text-[#F7931A]">●</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

// Game Section Component - Responsive
function GameSection({ title, icon, games }: { title: string; icon: string; games: Game[] }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-bold flex items-center gap-2">
          <span>{icon}</span> {title}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-[#0EA5E9] text-xs cursor-pointer">All &gt;</span>
          <NavArrows />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  )
}

// Loading Section Component
function LoadingSection() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="aspect-[3/4] rounded-xl bg-[#151A23] animate-pulse" />
      ))}
    </div>
  )
}

// Game Card Component with real images or gradient fallback
function GameCard({ game }: { game: Game }) {
  const [hovered, setHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  // Generate unique gradient based on game id for fallback
  const gradients = [
    'from-violet-600 via-purple-600 to-indigo-700',
    'from-sky-500 via-blue-600 to-indigo-700',
    'from-cyan-500 via-teal-600 to-blue-700',
    'from-orange-500 via-amber-500 to-yellow-600',
    'from-pink-500 via-rose-500 to-red-600',
    'from-fuchsia-500 via-purple-600 to-violet-700',
    'from-cyan-400 via-sky-500 to-blue-600',
    'from-teal-500 via-cyan-500 to-blue-600',
  ]
  const gradientIndex = parseInt(game.id) % gradients.length
  const gradient = gradients[gradientIndex]
  
  // Game category icons for fallback
  const getCategoryIcon = () => {
    if (game.category === 'live') return '🎲'
    if (game.category === 'crash') return '🚀'
    if (game.category === 'slots') return '🍒'
    if (game.name.toLowerCase().includes('dragon')) return '🐉'
    if (game.name.toLowerCase().includes('wolf')) return '🐺'
    if (game.name.toLowerCase().includes('gold')) return '👑'
    if (game.name.toLowerCase().includes('bonanza')) return '💎'
    return '🎰'
  }

  const hasValidImage = game.thumbnail && !imageError

  return (
    <div 
      className="relative rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-200 hover:scale-105 hover:z-10 shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[3/4] relative">
        {/* Real Image or Gradient Fallback */}
        {hasValidImage ? (
          <img 
            src={game.thumbnail} 
            alt={game.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
            <div className="absolute bottom-10 left-2 w-16 h-16 bg-white/10 rounded-full blur-lg" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl drop-shadow-lg">{getCategoryIcon()}</span>
            </div>
          </>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {game.isHot && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded">HOT</span>
        )}
        {game.isNew && !game.isHot && (
          <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#00A3FF] text-white text-[9px] font-bold rounded">NEW</span>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-xs leading-tight line-clamp-2">{game.name}</h3>
          <p className="text-[#9CA3AF] text-[10px] mt-1 uppercase">{game.provider}</p>
        </div>

        {hovered && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <button className="px-5 py-2 text-white text-sm font-semibold rounded-lg shadow-lg" style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' }}>
              Play Now
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// Promotion Card
function PromotionCard({ title, subtitle, gradient, border }: { title: string; subtitle: string; gradient: string; border: string }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl p-4 border ${border}`}>
      <h3 className="text-white font-bold text-sm mb-1">{title}</h3>
      <p className="text-[#7D8CA3] text-xs mb-3">{subtitle}</p>
      <div className="flex gap-2">
        <button className="px-3 py-1.5 bg-[#1C2333] text-white text-xs rounded-lg hover:bg-[#252D3D]">Read More</button>
        <button className="px-3 py-1.5 text-white text-xs rounded-lg" style={{ background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)' }}>Get Bonus</button>
      </div>
    </div>
  )
}

// Navigation Arrows
function NavArrows() {
  return (
    <div className="flex gap-1">
      <button className="p-1.5 rounded-lg bg-[#151A23] hover:bg-[#1C2333] text-[#7D8CA3]">
        <FiChevronLeft className="w-4 h-4" />
      </button>
      <button className="p-1.5 rounded-lg bg-[#151A23] hover:bg-[#1C2333] text-[#7D8CA3]">
        <FiChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
