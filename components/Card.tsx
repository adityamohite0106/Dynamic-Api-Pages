import { CardProps } from '../lib/types'

export default function Card({ title, content, variant = 'default' }: CardProps) {
  const variantClasses = {
    default: 'bg-white border-gray-200',
    primary: 'bg-blue-50 border-blue-200',
    secondary: 'bg-purple-50 border-purple-200'
  }

  const titleClasses = {
    default: 'text-gray-900',
    primary: 'text-blue-900',
    secondary: 'text-purple-900'
  }

  return (
    <div className={`rounded-lg border-2 p-6 shadow-sm ${variantClasses[variant]}`}>
      <h3 className={`text-xl font-semibold mb-3 ${titleClasses[variant]}`}>
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed">
        {content}
      </p>
    </div>
  )
}