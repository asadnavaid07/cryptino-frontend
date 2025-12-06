import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface GameSectionProps {
  title: string
  icon?: ReactNode
  viewAllLink?: string
  children: ReactNode
}

export default function GameSection({ 
  title, 
  icon, 
  viewAllLink, 
  children 
}: GameSectionProps) {
  return (
    <section className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          {viewAllLink && (
            <Link to={viewAllLink} className="text-sm text-gray-400 hover:text-white">
              All &gt;
            </Link>
          )}
          <div className="flex gap-1">
            <button className="p-2 bg-surface hover:bg-surface-light rounded-lg transition-colors">
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-2 bg-surface hover:bg-surface-light rounded-lg transition-colors">
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {children}
      </div>
    </section>
  )
}
