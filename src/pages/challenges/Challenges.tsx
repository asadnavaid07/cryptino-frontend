import { useState } from 'react'
import { FiBitcoin } from 'react-icons/fi'

interface Challenge {
  id: string
  name: string
  provider: string
  multiplier: string
  minBet: number
  reward: number
  image: string
  creator: string
}

const challenges: Challenge[] = [
  { id: '1', name: 'STELLAR', provider: 'ORBITAL', multiplier: '7,500x', minBet: 2.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '2', name: 'SHOOTING GALAXY', provider: 'MASCOT GAMING', multiplier: '10,000x', minBet: 5.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '3', name: 'ASTRO', provider: 'ORBITAL', multiplier: '1,750x', minBet: 1.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '4', name: 'DRAGON\'S CRASH', provider: 'BGAMING', multiplier: '5,000x', minBet: 0.50, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '5', name: 'TRIPLE CASH OR CRASH', provider: 'BETSOFT GAMING', multiplier: '2,500x', minBet: 1.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '6', name: 'SWEET BONANZA 1000', provider: 'PRAGMATIC PLAY', multiplier: '7,500x', minBet: 2.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1563941433-b6a094db1719?w=300&h=400&fit=crop', creator: 'Bitlion' },
  { id: '7', name: 'LE VIKING', provider: 'HACKSAW GAMING', multiplier: '10,000x', minBet: 5.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=300&h=400&fit=crop', creator: 'Bitlion' },
  { id: '8', name: 'GATES OF OLYMPUS 1000', provider: 'PRAGMATIC PLAY', multiplier: '1,750x', minBet: 1.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=300&h=400&fit=crop', creator: 'Bitlion' },
  { id: '9', name: 'DUEL AT DAWN', provider: 'HACKSAW GAMING', multiplier: '5,000x', minBet: 0.50, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1596731497977-f4f7d14bcc75?w=300&h=400&fit=crop', creator: 'Bitlion' },
  { id: '10', name: 'WANTED DEAD OR A WILD', provider: 'HACKSAW GAMING', multiplier: '2,500x', minBet: 1.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1436891620584-47fd0e565afb?w=300&h=400&fit=crop', creator: 'Bitlion' },
  { id: '11', name: 'STELLAR', provider: 'ORBITAL', multiplier: '7,500x', minBet: 2.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '12', name: 'SHOOTING GALAXY', provider: 'MASCOT GAMING', multiplier: '10,000x', minBet: 5.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '13', name: 'ASTRO', provider: 'ORBITAL', multiplier: '1,750x', minBet: 1.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '14', name: 'DRAGON\'S CRASH', provider: 'BGAMING', multiplier: '5,000x', minBet: 0.50, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&h=250&fit=crop', creator: 'Bitlion' },
  { id: '15', name: 'PHO SHO', provider: 'BETSOFT', multiplier: '2,500x', minBet: 1.00, reward: 600.00000000, image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=300&h=400&fit=crop', creator: 'Bitlion' },
]

export default function Challenges() {
  const [activeTab, setActiveTab] = useState<'live' | 'finished' | 'completed'>('live')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Challenges</h1>
        <div className="flex gap-2 bg-[#1a1d2e] rounded-xl p-1">
          <button 
            onClick={() => setActiveTab('live')}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'live' 
                ? 'bg-primary text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Live
          </button>
          <button 
            onClick={() => setActiveTab('finished')}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'finished' 
                ? 'bg-primary text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Finished
          </button>
          <button 
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'completed' 
                ? 'bg-primary text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            My Completed
          </button>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>

      {/* Show More */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors">
          <span>✨</span>
          <span>Show More</span>
          <span>∨</span>
        </button>
      </div>
    </div>
  )
}

function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div className="bg-[#1a1d2e] rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all group">
      {/* Game Image */}
      <div className="aspect-[4/3] relative">
        <img 
          src={challenge.image} 
          alt={challenge.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Game Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-bold text-lg leading-tight">{challenge.name}</h3>
          <p className="text-gray-400 text-xs mt-0.5">{challenge.provider}</p>
        </div>
      </div>

      {/* Challenge Details */}
      <div className="p-4 space-y-3">
        {/* Multiplier and Bet */}
        <p className="text-gray-300 text-sm">
          First to hit <span className="text-white font-semibold">{challenge.multiplier}</span> with minimum <span className="text-white font-semibold">${challenge.minBet.toFixed(2)}</span> bet
        </p>

        {/* Reward */}
        <div>
          <p className="text-gray-500 text-xs mb-1">Reward</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">₿</span>
            <span className="text-white font-bold">{challenge.reward.toFixed(8)}</span>
          </div>
        </div>

        {/* Creator */}
        <div>
          <p className="text-gray-500 text-xs mb-1">Creator</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs">
              🦁
            </div>
            <span className="text-primary text-sm font-medium">{challenge.creator}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
