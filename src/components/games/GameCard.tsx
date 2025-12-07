import { Link } from 'react-router-dom'

interface GameCardProps {
  id: string
  name: string
  provider: string
  thumbnail?: string
  image?: string
  category?: string
  game_url?: string
  isNew?: boolean
  isHot?: boolean
}

export default function GameCard({ 
  id, 
  name, 
  provider, 
  thumbnail,
  image,
  game_url,
  isNew, 
  isHot 
}: GameCardProps) {
  const imgSrc = thumbnail || image
  
  const cardContent = (
    <div className="relative aspect-[4/5] bg-surface rounded-xl overflow-hidden">
      {imgSrc ? (
        <img 
          src={imgSrc} 
          alt={name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-4xl">🎰</span>
        </div>
      )}
      
      {/* Badges */}
      <div className="absolute top-2 left-2 flex gap-1">
        {isNew && (
          <span className="badge badge-primary">NEW</span>
        )}
        {isHot && (
          <span className="badge bg-orange-500/20 text-orange-400">🔥 HOT</span>
        )}
      </div>

      {/* Overlay */}
      <div className="game-card-overlay flex items-end justify-center pb-4">
        <button className="btn-primary text-sm px-4 py-2">
          Play Now
        </button>
      </div>

      {/* Game Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
        <h3 className="font-semibold text-sm truncate">{name}</h3>
        <p className="text-xs text-gray-400">{provider}</p>
      </div>
    </div>
  )
  
  // If game_url exists, make the whole card clickable to open the game
  if (game_url) {
    return (
      <div 
        className="game-card cursor-pointer" 
        onClick={() => window.open(game_url, '_blank', 'noopener,noreferrer')}
      >
        {cardContent}
      </div>
    )
  }
  
  // Otherwise, use internal route
  return (
    <Link to={`/game/${id}`} className="game-card">
      {cardContent}
    </Link>
  )
}
