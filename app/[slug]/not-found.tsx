import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/" 
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}