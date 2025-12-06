import { useState } from 'react'

interface Promotion {
  id: string
  title: string
  description: string
  category: 'all' | 'sports' | 'welcome' | 'loyalty' | 'casino'
  image: string
  badge?: string
}

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Dragon Bonus',
    description: 'More Cash, New Bonus Game',
    category: 'casino',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=250&fit=crop',
    badge: '800,000 USD FS'
  },
  {
    id: '2',
    title: 'PragmaticPlay Drops And Wins',
    description: '€2,000,000 in Prizes, 10,000 Winners Every Day',
    category: 'casino',
    image: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=400&h=250&fit=crop',
  },
  {
    id: '3',
    title: 'WELCOME PACK',
    description: 'Claim & Enjoy Up to 200,000 USDT',
    category: 'welcome',
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=250&fit=crop',
  },
  {
    id: '4',
    title: 'Free-to-Play Game',
    description: 'Get a 100% Freebet with your first deposit!',
    category: 'casino',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop',
  },
  {
    id: '5',
    title: 'Free-to-Play Game',
    description: 'Create multiple bets within the same match!',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop',
  },
  {
    id: '6',
    title: 'Free-to-Play Game',
    description: 'Predict Goalscorers to Win $10,000',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=400&h=250&fit=crop',
  },
  {
    id: '7',
    title: 'Unbeatable Bonuses',
    description: 'Start Playing, Earn Points Instantly',
    category: 'loyalty',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop',
  },
  {
    id: '8',
    title: 'Wager Race Tournament',
    description: 'Wager Big, Claim $2,500 Weekly!',
    category: 'casino',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
  },
  {
    id: '9',
    title: 'Free-to-Play Game',
    description: 'Predict Goalscorers to Win $10,000',
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1596731497977-f4f7d14bcc75?w=400&h=250&fit=crop',
  },
]

const categories = [
  { id: 'all', name: 'All' },
  { id: 'sports', name: 'Sports' },
  { id: 'welcome', name: 'Welcome' },
  { id: 'loyalty', name: 'Loyalty' },
  { id: 'casino', name: 'Casino' },
]

export default function Promotions() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPromotions = activeCategory === 'all' 
    ? promotions 
    : promotions.filter(p => p.category === activeCategory)

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-green-600 to-teal-600 p-8 min-h-[180px]">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1553481187-be93c21490a9?w=1200&h=400&fit=crop" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-2">WELCOME PACK</h1>
          <p className="text-white/80 text-lg mb-2">300,000 USDT in Deposit Bonuses</p>
          <p className="text-white/80">or Cashback!</p>
        </div>
        <div className="absolute right-8 bottom-4 hidden lg:block">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-5xl shadow-xl">
            💰
          </div>
        </div>
      </div>

      {/* Header with filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Promotions</h2>
        
        {/* Category Filters */}
        <div className="flex gap-2 bg-[#1a1d2e] rounded-xl p-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-all ${
                activeCategory === cat.id 
                  ? 'bg-primary text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPromotions.map((promo) => (
          <PromotionCard key={promo.id} promotion={promo} />
        ))}
      </div>
    </div>
  )
}

function PromotionCard({ promotion }: { promotion: Promotion }) {
  return (
    <div className="bg-[#1a1d2e] rounded-xl overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all group">
      {/* Image */}
      <div className="aspect-[16/10] relative">
        <img 
          src={promotion.image} 
          alt={promotion.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badge */}
        {promotion.badge && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold rounded-full">
              {promotion.badge}
            </span>
          </div>
        )}

        {/* Overlay Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="text-2xl mb-2">
            {promotion.category === 'sports' ? '⚽' : 
             promotion.category === 'welcome' ? '🎁' :
             promotion.category === 'loyalty' ? '👑' : '🎰'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2">{promotion.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{promotion.description}</p>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#252836] hover:bg-[#2a2d3e] text-white text-sm rounded-lg transition-colors">
            Read More
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors">
            Get Bonus
          </button>
        </div>
      </div>
    </div>
  )
}
