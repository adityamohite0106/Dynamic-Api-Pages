import { TextSectionProps } from '../lib/types'

export default function TextSection({ 
  title, 
  content, 
  size = 'md', 
  align = 'left' 
}: TextSectionProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  const titleSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div className={`${alignClasses[align]}`}>
      {title && (
        <h2 className={`font-bold text-gray-900 mb-4 ${titleSizeClasses[size]}`}>
          {title}
        </h2>
      )}
      <div 
        className={`text-gray-700 leading-relaxed ${sizeClasses[size]}`}
        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br>') }}
      />
    </div>
  )
}