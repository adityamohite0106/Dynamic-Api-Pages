import Link from 'next/link'
import { CTAProps } from '../lib/types'

export default function CTA({ 
  text, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md' 
}: CTAProps) {
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const buttonClasses = `
    inline-block font-semibold rounded-lg transition-colors duration-200
    ${variantClasses[variant]} ${sizeClasses[size]}
  `

  const handleClick = () => {
    if (onClick) {
      // In a real app, you might eval this or use a safer function mapping
      console.log('CTA clicked:', onClick)
    }
  }

  if (href) {
    return (
      <div className="text-center">
        <Link href={href} className={buttonClasses}>
          {text}
        </Link>
      </div>
    )
  }

  return (
    <div className="text-center">
      <button 
        onClick={handleClick}
        className={buttonClasses}
      >
        {text}
      </button>
    </div>
  )
}