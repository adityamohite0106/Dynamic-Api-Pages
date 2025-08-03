export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { getPage } from '../../lib/pageStorage';
import ComponentRenderer from '../../components/ComponentRenderer';
import Link from 'next/link';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Home
            </Link>
            <div className="text-sm text-gray-500">
              Page: /{params.slug}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {page.components.map((component, index) => (
            <div key={index} className="w-full">
              <ComponentRenderer component={component} />
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          This page was generated dynamically using the Pages API
        </div>
      </footer>
    </div>
  );
}
