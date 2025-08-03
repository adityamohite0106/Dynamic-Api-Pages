import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Dynamic Pages App
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Create brand new pages on demand through our API
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">API Endpoint</h2>
            <code className="bg-gray-100 px-4 py-2 rounded text-sm">
              POST /api/pages
            </code>
            
            <div className="mt-6 text-left">
              <h3 className="font-semibold mb-2">Sample Request:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`curl -X POST ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/pages \\
  -H "Content-Type: application/json" \\
  -d '{
    "slug": "about-us",
    "components": [
      {
        "type": "TextSection",
        "props": {
          "title": "About Our Company",
          "content": "We are a dynamic team..."
        }
      }
    ]
  }'`}
              </pre>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
          

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Available Components</h3>
              <ul className="text-left space-y-1 text-sm">
                <li>• Card - Display cards with title and content</li>
                <li>• ImageBlock - Show images with captions</li>
                <li>• TextSection - Rich text sections</li>
                <li>• StatsBox - Display statistics</li>
                <li>• CTA - Call-to-action buttons</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}