import { FiLock, FiGift } from 'react-icons/fi'

const rewards = [
  { 
    type: 'WELCOME BONUS', 
    description: 'Get welcome bonus', 
    locked: false,
    color: 'text-primary',
    bgGradient: 'from-primary/20 to-blue-500/20'
  },
  { 
    type: 'DAILY BONUS', 
    description: 'Get daily bonus', 
    locked: true,
    color: 'text-blue-400',
    bgGradient: 'from-blue-500/20 to-cyan-500/20'
  },
  { 
    type: 'WEEKLY BONUS', 
    description: 'Get weekly bonus', 
    locked: true,
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-orange-500/20'
  },
  { 
    type: 'MONTHLY BONUS', 
    description: 'Get monthly bonus', 
    locked: true,
    color: 'text-red-400',
    bgGradient: 'from-red-500/20 to-pink-500/20'
  },
]

export default function Bonus() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Bonus</h1>

      {/* VIP Progress */}
      <div className="bg-[#1a1d2e] rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium">Your VIP Progress</h3>
          <span className="text-white font-semibold">35.5%</span>
        </div>
        <div className="w-full bg-[#252836] rounded-full h-1.5 mb-2">
          <div className="bg-gradient-to-r from-primary to-blue-400 h-1.5 rounded-full" style={{ width: '35.5%' }} />
        </div>
        <p className="text-sm text-gray-500">Unranked</p>
      </div>

      {/* No Bonuses */}
      <div className="bg-[#1a1d2e] rounded-xl p-10 text-center">
        <div className="w-16 h-16 mx-auto mb-4 text-gray-600">
          <FiGift className="w-full h-full" />
        </div>
        <h3 className="font-semibold text-lg mb-1">No Bonuses Found</h3>
        <p className="text-gray-500 text-sm">There are no active bonuses available</p>
      </div>

      {/* Rewards */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Rewards</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward) => (
            <div key={reward.type} className="bg-[#1a1d2e] rounded-xl p-4 text-center">
              <h4 className={`font-bold text-sm mb-4 ${reward.color}`}>{reward.type}</h4>
              <div className={`w-24 h-24 mx-auto mb-4 rounded-xl bg-gradient-to-br ${reward.bgGradient} flex items-center justify-center`}>
                {reward.locked ? (
                  <div className="text-5xl opacity-60">🎁</div>
                ) : (
                  <div className="text-5xl">🎁</div>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-4">{reward.description}</p>
              {reward.locked ? (
                <button className="w-full bg-[#252836] text-gray-500 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                  <FiLock className="w-4 h-4" />
                  Locked
                </button>
              ) : (
                <button className="w-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 py-2.5 rounded-lg text-sm font-medium transition-opacity">
                  Get Bonus
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
