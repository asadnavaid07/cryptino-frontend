import { useState } from 'react'
import { FiUsers, FiDollarSign, FiAward, FiChevronRight } from 'react-icons/fi'

const tournaments = [
  {
    id: '1',
    name: 'Mega Slots Battle',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=200&fit=crop',
    prizePool: '€50,000',
    players: 1234,
    endsIn: '2d 14h',
    status: 'live',
    games: ['Sweet Bonanza', 'Gates of Olympus', 'Sugar Rush'],
    provider: 'Pragmatic Play'
  },
  {
    id: '2',
    name: 'Crash Masters',
    image: 'https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=400&h=200&fit=crop',
    prizePool: '€25,000',
    players: 567,
    endsIn: '5d 8h',
    status: 'live',
    games: ['Aviator', 'Spaceman', 'Plinko'],
    provider: 'Spribe'
  },
  {
    id: '3',
    name: 'Weekly Showdown',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop',
    prizePool: '€100,000',
    players: 3456,
    endsIn: '6d 12h',
    status: 'live',
    games: ['All Games'],
    provider: 'Multiple'
  },
  {
    id: '4',
    name: 'Hacksaw Mayhem',
    image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=200&fit=crop',
    prizePool: '€30,000',
    players: 890,
    endsIn: '3d 6h',
    status: 'live',
    games: ['Wanted Dead or Wild', 'Chaos Crew'],
    provider: 'Hacksaw Gaming'
  },
  {
    id: '5',
    name: 'Live Casino Championship',
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=200&fit=crop',
    prizePool: '€75,000',
    players: 2100,
    endsIn: '4d 18h',
    status: 'live',
    games: ['Crazy Time', 'Lightning Roulette'],
    provider: 'Evolution'
  },
  {
    id: '6',
    name: 'BGaming Drops',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=200&fit=crop',
    prizePool: '€20,000',
    players: 456,
    endsIn: '1d 4h',
    status: 'ending',
    games: ['Plinko', 'Dice'],
    provider: 'BGaming'
  },
]

const leaderboard = [
  { rank: 1, user: 'CryptoKing', avatar: '👑', wagered: '$125,430', prize: '$5,000' },
  { rank: 2, user: 'LuckyPlayer', avatar: '🍀', wagered: '$98,320', prize: '$3,000' },
  { rank: 3, user: 'SlotMaster', avatar: '🎰', wagered: '$87,650', prize: '$2,000' },
  { rank: 4, user: 'WinStreak', avatar: '🔥', wagered: '$76,890', prize: '$1,000' },
  { rank: 5, user: 'DiamondHands', avatar: '💎', wagered: '$65,430', prize: '$500' },
]

export default function Tournaments() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'finished'>('active')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Tournaments</h1>
          <p className="text-gray-400">Compete with other players and win big prizes</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ backgroundColor: '#0D101C' }}>
            <FiDollarSign className="text-[#F7931A]" />
            <span className="text-gray-400">Total Prize Pool:</span>
            <span className="text-white font-bold">€300,000</span>
          </div>
        </div>
      </div>

      {/* Featured Tournament */}
      <div 
        className="relative rounded-2xl overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(0,174,255,0.2) 0%, rgba(247,147,26,0.2) 100%)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C15] via-transparent to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop" 
          alt="Featured Tournament" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500 text-white animate-pulse">🔴 LIVE</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'rgba(247,147,26,0.2)', color: '#F7931A' }}>Featured</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Grand Slot Championship</h2>
          <p className="text-gray-300 mb-4 max-w-md">Compete against players worldwide for the ultimate prize!</p>
          <div className="flex items-center gap-6 mb-6">
            <div>
              <div className="text-2xl font-bold text-[#F7931A]">€100,000</div>
              <div className="text-sm text-gray-400">Prize Pool</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">5,432</div>
              <div className="text-sm text-gray-400">Players</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#00AEFF]">2d 14h</div>
              <div className="text-sm text-gray-400">Ends In</div>
            </div>
          </div>
          <button 
            className="w-fit px-6 py-3 rounded-xl font-semibold text-white hover:scale-105 transition-all"
            style={{ background: 'linear-gradient(135deg, #00AEFF 0%, #0083FF 100%)' }}
          >
            Join Tournament
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['active', 'upcoming', 'finished'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-5 py-2.5 rounded-xl font-medium capitalize transition-all ${
              activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
            style={{ backgroundColor: activeTab === tab ? '#00AEFF' : 'transparent' }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tournament Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((tournament) => (
          <div
            key={tournament.id}
            className="rounded-xl overflow-hidden transition-all hover:scale-[1.02] cursor-pointer group"
            style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div className="relative h-40">
              <img src={tournament.image} alt={tournament.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D101C] to-transparent" />
              <div className="absolute top-3 left-3 flex gap-2">
                {tournament.status === 'live' && (
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-red-500 text-white">🔴 Live</span>
                )}
                {tournament.status === 'ending' && (
                  <span className="px-2 py-1 rounded-md text-xs font-medium bg-orange-500 text-white">⏰ Ending Soon</span>
                )}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-lg font-bold text-white">{tournament.name}</h3>
                <p className="text-sm text-gray-400">{tournament.provider}</p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xl font-bold" style={{ color: '#F7931A' }}>{tournament.prizePool}</div>
                  <div className="text-xs text-gray-500">Prize Pool</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{tournament.endsIn}</div>
                  <div className="text-xs text-gray-500">Ends In</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <FiUsers />
                  <span>{tournament.players.toLocaleString()} players</span>
                </div>
                <button className="flex items-center gap-1 text-[#00AEFF] text-sm font-medium group-hover:gap-2 transition-all">
                  Join <FiChevronRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="rounded-xl p-6" style={{ backgroundColor: '#0D101C', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FiAward className="text-[#F7931A]" />
            Leaderboard
          </h2>
          <span className="text-sm text-gray-400">Weekly Showdown</span>
        </div>

        <div className="space-y-3">
          {leaderboard.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/5 ${
                player.rank <= 3 ? 'border border-white/10' : ''
              }`}
              style={{ backgroundColor: player.rank <= 3 ? 'rgba(247,147,26,0.05)' : 'transparent' }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                player.rank === 1 ? 'bg-yellow-500 text-black' :
                player.rank === 2 ? 'bg-gray-400 text-black' :
                player.rank === 3 ? 'bg-orange-600 text-white' :
                'bg-white/10 text-gray-400'
              }`}>
                {player.rank}
              </div>
              <span className="text-2xl">{player.avatar}</span>
              <div className="flex-1">
                <div className="font-medium text-white">{player.user}</div>
                <div className="text-sm text-gray-500">Wagered: {player.wagered}</div>
              </div>
              <div className="text-right">
                <div className="font-bold" style={{ color: '#F7931A' }}>{player.prize}</div>
                <div className="text-xs text-gray-500">Prize</div>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-4 py-3 rounded-xl text-[#00AEFF] font-medium hover:bg-white/5 transition-all">
          View Full Leaderboard
        </button>
      </div>
    </div>
  )
}
