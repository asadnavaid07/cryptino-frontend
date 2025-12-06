import { useState } from 'react'
import { FiChevronDown, FiChevronRight, FiCheck, FiX } from 'react-icons/fi'

// VIP Levels
const vipLevels = [
  { level: 1, name: 'Bronze', color: 'from-amber-700 to-amber-600', freeSpins: 0, cashback: '5%', rakeback: '1%', wager: '$0' },
  { level: 2, name: 'Silver', color: 'from-gray-400 to-gray-500', freeSpins: 10, cashback: '5%', rakeback: '1%', wager: '$400' },
  { level: 3, name: 'Gold', color: 'from-yellow-500 to-amber-500', freeSpins: 20, cashback: '5%', rakeback: '1%', wager: '$600' },
  { level: 4, name: 'Platinum', color: 'from-cyan-400 to-blue-500', freeSpins: 30, cashback: '5%', rakeback: '1%', wager: '$800' },
]

// VIP Tiers
const vipTiers = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Jade', 'Sapphire', 'Ruby', 'Diamond']

// Benefits table
const benefits = [
  { name: 'Instant Rakeback', tiers: [false, true, true, true, true, true, true, true] },
  { name: 'Weekly Bonus', tiers: [false, true, true, true, true, true, true, true] },
  { name: 'Level-Up Bonus', tiers: [false, false, true, true, true, true, true, true] },
  { name: 'Tier Up Bonus', tiers: [false, false, false, true, true, true, true, true] },
  { name: 'Monthly Bonus', tiers: [false, false, false, false, true, true, true, true] },
  { name: 'Bonus Increase', tiers: [false, false, false, false, false, true, true, true] },
  { name: 'VIP Host', tiers: [false, false, false, false, false, false, true, true] },
  { name: 'Invitation to Shuffle Events', tiers: [false, false, false, false, false, false, false, true] },
]

// Partner casinos
const partnerCasinos = ['BETFURY', 'Duelbits', 'BC.GAME', 'Stake', 'BITCASINO', 'ROLLBIT', 'ROOBET']

// FAQs
const faqs = [
  { question: 'What is the Cryptino VIP Club?', answer: 'The Cryptino VIP Club is an exclusive loyalty program designed to reward our players for their dedication and engagement. The program consists of 30 levels, each offering unique benefits and bonuses.' },
  { question: 'What are Milestone Rewards?', answer: 'Milestone Rewards are special bonuses you receive when reaching certain VIP levels. These rewards include free spins, cashback percentages, and exclusive bonuses.' },
  { question: 'What rewards do I get when I level up?', answer: 'When you level up, you receive Level-Up Bonuses, increased rakeback percentages, and access to new benefits based on your tier.' },
  { question: 'What is the Daily Bonus?', answer: 'The Daily Bonus is a reward you can claim every day based on your VIP level. Higher levels receive larger daily bonuses.' },
  { question: 'How do I level up?', answer: 'You level up by wagering on games. Every wager contributes to your VIP progress. The more you play, the faster you level up!' },
]

export default function VIP() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)
  const userProgress = 35.5

  return (
    <div className="space-y-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-white">VIP Club</h1>

      {/* User Progress Card */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Username123</h2>
              <p className="text-gray-400 text-sm">Unranked</p>
            </div>
          </div>

          {/* Progress */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Your VIP Progress</span>
              <span className="text-white font-medium">{userProgress}%</span>
            </div>
            <div className="h-2 bg-[#252836] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                style={{ width: `${userProgress}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">Unranked</p>
          </div>

          {/* VIP Badge */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full opacity-30 blur-xl" />
              <div className="relative w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-4xl">
                💰
              </div>
            </div>
            <p className="text-gray-400 text-xs">Get rewarded every time you bet. Leveling up entitles you to bigger & better rewards!</p>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Rewards</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['WELCOME BONUS', 'DAILY BONUS', 'WEEKLY BONUS', 'MONTHLY BONUS'].map((bonus, i) => (
            <div 
              key={bonus}
              className={`bg-[#1a1d2e] rounded-xl p-4 text-center ${i === 0 ? 'ring-2 ring-primary' : ''}`}
            >
              <span className={`text-sm font-bold ${i === 0 ? 'text-primary' : 'text-gray-400'}`}>{bonus}</span>
              <div className="w-16 h-16 mx-auto my-3 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center text-3xl">
                {i === 0 ? '🎁' : i === 1 ? '📅' : i === 2 ? '📆' : '🗓️'}
              </div>
              <p className="text-gray-400 text-xs mb-3">Get {bonus.toLowerCase()}</p>
              {i === 0 ? (
                <button className="w-full py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors">
                  Get Bonus
                </button>
              ) : (
                <div className="flex items-center justify-center gap-1 text-gray-500 text-xs">
                  <span>🔒</span>
                  <span>Locked</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* VIP Rewards Breakdown */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">VIP Rewards Breakdown</h2>
        <p className="text-gray-400 text-sm mb-6">Experience an exciting adventure spanning 30 levels across 7 tiers, each delivering its own distinct and rewarding journey.</p>
        
        {/* Tier Icons */}
        <div className="flex justify-center gap-4 mb-8">
          {vipTiers.slice(0, 7).map((tier, i) => (
            <div key={tier} className="text-center">
              <div className={`w-10 h-10 rounded-full ${i === 0 ? 'ring-2 ring-primary' : ''} bg-gradient-to-br ${
                i === 0 ? 'from-amber-700 to-amber-600' :
                i === 1 ? 'from-gray-400 to-gray-500' :
                i === 2 ? 'from-yellow-500 to-amber-500' :
                i === 3 ? 'from-cyan-400 to-blue-500' :
                i === 4 ? 'from-green-500 to-emerald-500' :
                i === 5 ? 'from-blue-500 to-indigo-500' :
                'from-red-500 to-pink-500'
              } flex items-center justify-center text-lg mx-auto mb-1`}>
                {tier[0]}
              </div>
              <span className="text-gray-500 text-xs">{tier}</span>
            </div>
          ))}
        </div>

        {/* Level Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vipLevels.map((level) => (
            <div key={level.level} className="bg-[#252836] rounded-xl p-4 border border-gray-700/50">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${level.color} flex items-center justify-center text-white font-bold mx-auto mb-2`}>
                {level.level}
              </div>
              <h3 className="text-white font-bold">Level {level.level}</h3>
              <p className="text-gray-400 text-xs mb-3">{level.name}</p>
              
              <div className="space-y-2 text-left">
                <div className="bg-green-500/10 text-green-400 text-xs font-medium px-2 py-1 rounded text-center">
                  {level.freeSpins} FS
                </div>
                <p className="text-gray-400 text-xs">Level Up Bonus</p>
                
                <p className="text-white text-sm font-bold">{level.cashback}</p>
                <p className="text-gray-400 text-xs">Weekly Cashback</p>
                
                <p className="text-white text-sm font-bold">{level.rakeback}</p>
                <p className="text-gray-400 text-xs">Daily Rakeback</p>
                
                <p className="text-white text-sm font-bold">{level.wager}</p>
                <p className="text-gray-400 text-xs">Wager</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Table */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4 text-center">The Benefits</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-400 text-sm py-3 px-4">VIP Rank</th>
                {vipTiers.map((tier) => (
                  <th key={tier} className="text-center text-gray-400 text-xs py-3 px-2">{tier}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit, i) => (
                <tr key={i} className="border-b border-gray-800/50">
                  <td className="text-white text-sm py-3 px-4">{benefit.name}</td>
                  {benefit.tiers.map((available, j) => (
                    <td key={j} className="text-center py-3 px-2">
                      {available ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary">
                          <FiCheck className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-gray-600">
                          <FiX className="w-4 h-4" />
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transfer VIP Status */}
      <div className="bg-[#1a1d2e] rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Do You Have A Status Somewhere Else?</h2>
        <p className="text-gray-400 text-sm mb-6">There's no need to engage in the same game twice. Through Cryptino, we'll align with your VIP Status.</p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {partnerCasinos.map((casino) => (
            <span key={casino} className="text-gray-500 text-sm font-medium">{casino}</span>
          ))}
        </div>
        
        <div className="flex items-center justify-center gap-4">
          <span className="text-gray-400 text-sm">Transfer your</span>
          <span className="text-primary font-bold">VIP Status</span>
          <span className="text-2xl">→</span>
          <span className="text-primary font-bold text-lg">CRYPTINO</span>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-2 text-center">VIP Club FAQs</h2>
        <p className="text-gray-400 text-sm mb-6 text-center">Find quick answers to your VIP Club related queries</p>
        
        <div className="space-y-3 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              className="bg-[#252836] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {expandedFaq === i ? (
                  <FiChevronDown className="w-5 h-5 text-primary" />
                ) : (
                  <FiChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-4">
                  <p className="text-gray-400 text-sm">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Loyalty Program Description */}
      <div className="bg-[#1a1d2e] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Casino Loyalty Program: Join the Pack, Get Rewarded</h2>
        <div className="text-gray-400 text-sm space-y-4">
          <p>Our online crypto casino offers a Loyalty program that caters to the needs of crypto gambling players. With our crypto casino Loyalty Program you'll enjoy some of the most enticing crypto rewards you have ever seen: milestone bonuses, free spins, cash prizes, daily cashback, and more!</p>
          <p>At dcblion, we understand the importance of keeping our loyal players happy and satisfied, that's why we've designed our Loyalty Program to provide our players with the best possible rewards and benefits. Our loyalty program is available to players who consistently play at our Bitcoin casino, Ethereum casino, Doge casino, Cardano casino, or Litecoin casino.</p>
          <p>We're proud to say that our Loyalty Program is one of the best in the online crypto casino industry. Our VIP program offers a total of 30 different levels, with each level providing a unique set of prizes and rewards. As you progress through the levels, you'll have access to exclusive promotions, free spins, and even bigger bonuses. We want to make sure that our loyal players feel valued, and our Loyalty Program is the perfect way to do that.</p>
          <button className="text-primary hover:underline">Read more</button>
        </div>
      </div>
    </div>
  )
}
