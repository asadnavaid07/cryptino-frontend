import { useState } from 'react'
import { FiSearch, FiStar, FiTrendingUp, FiClock } from 'react-icons/fi'

interface Team {
  name: string
  logo: string
  score?: number
}

interface Match {
  id: string
  league: string
  leagueIcon: string
  team1: Team
  team2: Team
  time: string
  isLive: boolean
  odds: { home: string; draw: string; away: string }
}

const liveMatches: Match[] = [
  {
    id: '1',
    league: 'Premier League',
    leagueIcon: '⚽',
    team1: { name: 'Manchester United', logo: '🔴', score: 2 },
    team2: { name: 'Liverpool FC', logo: '🔴', score: 1 },
    time: "67'",
    isLive: true,
    odds: { home: '2.10', draw: '3.40', away: '3.20' }
  },
  {
    id: '2',
    league: 'La Liga',
    leagueIcon: '⚽',
    team1: { name: 'Real Madrid', logo: '⚪', score: 0 },
    team2: { name: 'Barcelona', logo: '🔵', score: 0 },
    time: "23'",
    isLive: true,
    odds: { home: '2.50', draw: '3.20', away: '2.80' }
  },
  {
    id: '3',
    league: 'Serie A',
    leagueIcon: '⚽',
    team1: { name: 'AC Milan', logo: '🔴', score: 1 },
    team2: { name: 'Inter Milan', logo: '🔵', score: 2 },
    time: "45+2'",
    isLive: true,
    odds: { home: '3.80', draw: '3.40', away: '1.95' }
  },
  {
    id: '4',
    league: 'Bundesliga',
    leagueIcon: '⚽',
    team1: { name: 'Bayern Munich', logo: '🔴', score: 3 },
    team2: { name: 'Dortmund', logo: '🟡', score: 1 },
    time: "78'",
    isLive: true,
    odds: { home: '1.25', draw: '6.50', away: '9.00' }
  },
]

const upcomingMatches: Match[] = [
  {
    id: '5',
    league: 'Champions League',
    leagueIcon: '🏆',
    team1: { name: 'PSG', logo: '🔵' },
    team2: { name: 'Man City', logo: '🔵' },
    time: 'Tomorrow, 20:00',
    isLive: false,
    odds: { home: '2.90', draw: '3.30', away: '2.45' }
  },
  {
    id: '6',
    league: 'NBA',
    leagueIcon: '🏀',
    team1: { name: 'LA Lakers', logo: '🟡' },
    team2: { name: 'Boston Celtics', logo: '🟢' },
    time: 'Today, 23:30',
    isLive: false,
    odds: { home: '1.85', draw: '-', away: '1.95' }
  },
  {
    id: '7',
    league: 'NFL',
    leagueIcon: '🏈',
    team1: { name: 'Kansas City', logo: '🔴' },
    team2: { name: 'Buffalo Bills', logo: '🔵' },
    time: 'Sunday, 18:00',
    isLive: false,
    odds: { home: '1.72', draw: '-', away: '2.15' }
  },
]

const sportsCategories = [
  { id: 'all', name: 'All Sports', icon: '🎯', count: 156 },
  { id: 'soccer', name: 'Soccer', icon: '⚽', count: 89 },
  { id: 'basketball', name: 'Basketball', icon: '🏀', count: 34 },
  { id: 'tennis', name: 'Tennis', icon: '🎾', count: 28 },
  { id: 'esports', name: 'eSports', icon: '🎮', count: 45 },
  { id: 'cricket', name: 'Cricket', icon: '🏏', count: 12 },
  { id: 'hockey', name: 'Ice Hockey', icon: '🏒', count: 18 },
  { id: 'mma', name: 'MMA/UFC', icon: '🥊', count: 8 },
]

export default function Sports() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'popular'>('live')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Sports Betting</h1>
          <p className="text-gray-400">Bet on your favorite sports with the best odds</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-10 pr-4 py-2.5 rounded-xl text-white placeholder-gray-500"
              style={{ backgroundColor: '#151823', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          </div>
        </div>
      </div>

      {/* Sports Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sportsCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeCategory === cat.id 
                ? 'text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            style={{ 
              backgroundColor: activeCategory === cat.id ? '#00AEFF' : '#151823',
              border: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
            <span className="text-xs px-1.5 py-0.5 rounded-md" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('live')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'live' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          style={{ backgroundColor: activeTab === 'live' ? '#00AEFF' : 'transparent' }}
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Live
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'upcoming' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          style={{ backgroundColor: activeTab === 'upcoming' ? '#00AEFF' : 'transparent' }}
        >
          <FiClock />
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('popular')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
            activeTab === 'popular' ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
          style={{ backgroundColor: activeTab === 'popular' ? '#00AEFF' : 'transparent' }}
        >
          <FiTrendingUp />
          Popular
        </button>
      </div>

      {/* Live Matches */}
      {activeTab === 'live' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-lg font-semibold text-white">Live Now</h2>
            <span className="text-gray-500 text-sm">({liveMatches.length} events)</span>
          </div>
          
          <div className="grid gap-4">
            {liveMatches.map((match) => (
              <div
                key={match.id}
                className="rounded-xl p-4 transition-all hover:scale-[1.01] cursor-pointer"
                style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>{match.leagueIcon}</span>
                    <span className="text-sm text-gray-400">{match.league}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-red-400 text-sm font-medium">{match.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {/* Teams */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{match.team1.logo}</span>
                      <span className="text-white font-medium">{match.team1.name}</span>
                      {match.isLive && <span className="text-xl font-bold text-white ml-auto">{match.team1.score}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{match.team2.logo}</span>
                      <span className="text-white font-medium">{match.team2.name}</span>
                      {match.isLive && <span className="text-xl font-bold text-white ml-auto">{match.team2.score}</span>}
                    </div>
                  </div>

                  {/* Odds */}
                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                      <div className="text-xs text-gray-500 mb-1">1</div>
                      <div className="text-white font-semibold">{match.odds.home}</div>
                    </button>
                    <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                      <div className="text-xs text-gray-500 mb-1">X</div>
                      <div className="text-white font-semibold">{match.odds.draw}</div>
                    </button>
                    <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                      <div className="text-xs text-gray-500 mb-1">2</div>
                      <div className="text-white font-semibold">{match.odds.away}</div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FiClock className="text-[#00AEFF]" />
            Upcoming Events
          </h2>
          
          <div className="grid gap-4">
            {upcomingMatches.map((match) => (
              <div
                key={match.id}
                className="rounded-xl p-4 transition-all hover:scale-[1.01] cursor-pointer"
                style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>{match.leagueIcon}</span>
                    <span className="text-sm text-gray-400">{match.league}</span>
                  </div>
                  <span className="text-[#00AEFF] text-sm font-medium">{match.time}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{match.team1.logo}</span>
                      <span className="text-white font-medium">{match.team1.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{match.team2.logo}</span>
                      <span className="text-white font-medium">{match.team2.name}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                      <div className="text-xs text-gray-500 mb-1">1</div>
                      <div className="text-white font-semibold">{match.odds.home}</div>
                    </button>
                    {match.odds.draw !== '-' && (
                      <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                        <div className="text-xs text-gray-500 mb-1">X</div>
                        <div className="text-white font-semibold">{match.odds.draw}</div>
                      </button>
                    )}
                    <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                      <div className="text-xs text-gray-500 mb-1">2</div>
                      <div className="text-white font-semibold">{match.odds.away}</div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Popular */}
      {activeTab === 'popular' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <FiStar className="text-[#F7931A]" />
            Popular Events
          </h2>
          
          <div className="grid gap-4">
            {[...liveMatches, ...upcomingMatches].slice(0, 5).map((match) => (
              <div
                key={match.id}
                className="rounded-xl p-4 transition-all hover:scale-[1.01] cursor-pointer"
                style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>{match.leagueIcon}</span>
                    <span className="text-sm text-gray-400">{match.league}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {match.isLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                    <span className={match.isLive ? 'text-red-400 text-sm font-medium' : 'text-[#00AEFF] text-sm font-medium'}>
                      {match.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{match.team1.logo}</span>
                      <span className="text-white font-medium">{match.team1.name}</span>
                      {match.isLive && match.team1.score !== undefined && <span className="text-xl font-bold text-white ml-auto">{match.team1.score}</span>}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{match.team2.logo}</span>
                      <span className="text-white font-medium">{match.team2.name}</span>
                      {match.isLive && match.team2.score !== undefined && <span className="text-xl font-bold text-white ml-auto">{match.team2.score}</span>}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                      <div className="text-xs text-gray-500 mb-1">1</div>
                      <div className="text-white font-semibold">{match.odds.home}</div>
                    </button>
                    {match.odds.draw !== '-' && (
                      <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                        <div className="text-xs text-gray-500 mb-1">X</div>
                        <div className="text-white font-semibold">{match.odds.draw}</div>
                      </button>
                    )}
                    <button className="px-4 py-3 rounded-lg text-center min-w-[70px] hover:scale-105 transition-all" style={{ backgroundColor: '#151823' }}>
                      <div className="text-xs text-gray-500 mb-1">2</div>
                      <div className="text-white font-semibold">{match.odds.away}</div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bet Slip */}
      <div className="fixed bottom-20 right-6 z-50">
        <button
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white shadow-lg hover:scale-105 transition-all"
          style={{ background: 'linear-gradient(135deg, #00AEFF 0%, #0083FF 100%)' }}
        >
          <span>Bet Slip</span>
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm">0</span>
        </button>
      </div>
    </div>
  )
}
