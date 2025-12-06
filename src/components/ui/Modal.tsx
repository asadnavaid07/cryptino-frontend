import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md'
}: ModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`
        relative w-full ${sizes[size]} bg-surface rounded-2xl shadow-2xl 
        border border-white/10 animate-scaleIn
      `}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-lg font-semibold">{title}</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Content */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
