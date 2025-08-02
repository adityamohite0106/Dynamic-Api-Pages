import { NextRequest, NextResponse } from 'next/server'
import { savePage, getAllPages, initializeDemoPages } from '../../../lib/pageStorage'
import { PageData } from '../../../lib/types'

// Initialize demo pages on server start
initializeDemoPages()

export async function POST(request: NextRequest) {
  console.log('POST /api/pages - Request received')
  
  try {
    // Log request headers for debugging
    console.log('Headers:', Object.fromEntries(request.headers.entries()))
    
    const body: PageData = await request.json()
    console.log('Request body:', body)
    
    // Validate required fields
    if (!body.slug || !body.components) {
      console.log('Validation failed: Missing required fields')
      return NextResponse.json(
        { error: 'Missing required fields: slug and components' },
        { status: 400 }
      )
    }

    // Validate slug format (alphanumeric, hyphens, underscores)
    if (!/^[a-zA-Z0-9-_]+$/.test(body.slug)) {
      console.log('Validation failed: Invalid slug format')
      return NextResponse.json(
        { error: 'Invalid slug format. Use only letters, numbers, hyphens, and underscores.' },
        { status: 400 }
      )
    }

    // Validate components
    if (!Array.isArray(body.components) || body.components.length === 0) {
      console.log('Validation failed: Invalid components array')
      return NextResponse.json(
        { error: 'Components must be a non-empty array' },
        { status: 400 }
      )
    }

    const validTypes = ['Card', 'ImageBlock', 'TextSection', 'StatsBox', 'CTA']
    for (const component of body.components) {
      if (!component.type || !validTypes.includes(component.type)) {
        console.log('Validation failed: Invalid component type:', component.type)
        return NextResponse.json(
          { error: `Invalid component type: ${component.type}. Valid types: ${validTypes.join(', ')}` },
          { status: 400 }
        )
      }
      
      if (!component.props || typeof component.props !== 'object') {
        console.log('Validation failed: Invalid component props')
        return NextResponse.json(
          { error: 'Each component must have props object' },
          { status: 400 }
        )
      }
    }

    // Save the page
    savePage(body)
    console.log('Page saved successfully:', body.slug)

    return NextResponse.json({
      success: true,
      message: `Page '${body.slug}' created successfully`,
      url: `/${body.slug}`
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating page:', error)
    
    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format in request body' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  console.log('GET /api/pages - Request received')
  
  try {
    const pages = getAllPages()
    console.log('Found pages:', pages.length)
    
    return NextResponse.json({
      pages: pages.map(page => ({
        slug: page.slug,
        componentCount: page.components.length,
        url: `/${page.slug}`
      }))
    })
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}