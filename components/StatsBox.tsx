import { StatsBoxProps } from '../lib/types'

export default function StatsBox({ stats }: StatsBoxProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stat.value}
            </div>
            <div className="text-lg font-semibold text-gray-900 mb-1">
              {stat.label}
            </div>
            {stat.description && (
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}