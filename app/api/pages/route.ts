
import { NextRequest, NextResponse } from 'next/server';
import { savePage, getAllPages, initializeDemoPages } from '../../../lib/pageStorage';
import { PageData } from '../../../lib/types';

export async function POST(request: NextRequest) {
  try {
    // Initialize demo pages on first POST request
    await initializeDemoPages();

    const body: PageData = await request.json();

    // Validate required fields
    if (!body.slug || !body.components) {
      return NextResponse.json(
        { error: 'Missing required fields: slug and components' },
        { status: 400 }
      );
    }

    // Validate slug format (alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9-_]+$/.test(body.slug)) {
      return NextResponse.json(
        { error: 'Invalid slug format. Use only letters, numbers, hyphens, and underscores.' },
        { status: 400 }
      );
    }

    // Validate components
    if (!Array.isArray(body.components) || body.components.length === 0) {
      return NextResponse.json(
        { error: 'Components must be a non-empty array' },
        { status: 400 }
      );
    }

    const validTypes = ['Card', 'ImageBlock', 'TextSection', 'StatsBox', 'CTA'];
    for (const component of body.components) {
      if (!component.type || !validTypes.includes(component.type)) {
        return NextResponse.json(
          {
            error: `Invalid component type: ${component.type}. Valid types: ${validTypes.join(', ')}`,
          },
          { status: 400 }
        );
      }

      if (!component.props || typeof component.props !== 'object') {
        return NextResponse.json(
          { error: 'Each component must have props object' },
          { status: 400 }
        );
      }
    }

    // Save the page
    await savePage(body);

    return NextResponse.json({
      success: true,
      message: `Page '${body.slug}' created successfully`,
      url: `/${body.slug}`,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating page:', error);
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Initialize demo pages on first GET request
    await initializeDemoPages();

    const pages = await getAllPages();
    return NextResponse.json({
      pages: pages.map(page => ({
        slug: page.slug,
        componentCount: page.components.length,
        url: `/${page.slug}`,
      })),
    });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}