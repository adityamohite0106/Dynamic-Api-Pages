import { PrismaClient } from '@prisma/client';
import { PageData } from './types';


const prisma = new PrismaClient();


export async function savePage(pageData: PageData): Promise<void> {
  await prisma.page.upsert({
    where: { slug: pageData.slug },
    update: { components: pageData.components as any },
    create: {
      slug: pageData.slug,
      components: pageData.components as any,
    },
  });
}

export async function getPage(slug: string): Promise<PageData | undefined> {
  const page = await prisma.page.findUnique({
    where: { slug },
  });
console.log('Slug:', slug);
;

  return page
    ? {
        slug: page.slug,
        components: page.components as unknown as PageData['components'],
      }
    : undefined;
}

export async function getAllPages(): Promise<PageData[]> {
  const pages = await prisma.page.findMany();
  console.log('All pages:', pages)
  return pages.map((page: { slug: string; components: unknown }) => ({
    slug: page.slug,
    components: page.components as unknown as PageData['components'],
  }));
}

export async function deletePage(slug: string): Promise<boolean> {
  try {
    await prisma.page.delete({
      where: { slug },
    });
    return true;
  } catch {
    return false;
  }
}

export async function initializeDemoPages(): Promise<void> {
  const existingPages = await prisma.page.count();
  if (existingPages > 0) return; // Skip if demo pages exist

  await savePage({
    slug: 'demo-product',
    components: [
      {
        type: 'TextSection',
        props: {
          title: 'Revolutionary Product Launch',
          content: 'Introducing our latest innovation that will change the way you work.',
          size: 'lg',
          align: 'center',
        },
      },
      {
        type: 'ImageBlock',
        props: {
          src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
          alt: 'Product showcase',
          caption: 'Our flagship product in action',
          width: 800,
          height: 400,
        },
      },
      {
        type: 'StatsBox',
        props: {
          stats: [
            { label: 'Users', value: '10,000+', description: 'Active monthly users' },
            { label: 'Growth', value: '150%', description: 'Year over year' },
            { label: 'Rating', value: '4.9/5', description: 'Customer satisfaction' },
          ],
        },
      },
      {
        type: 'CTA',
        props: {
          text: 'Try It Free Today',
          href: '/signup',
          variant: 'primary',
          size: 'lg',
        },
      },
    ],
  });

  await savePage({
    slug: 'company-overview',
    components: [
      {
        type: 'TextSection',
        props: {
          title: 'About Our Company',
          content:
            'We are a forward-thinking technology company dedicated to creating innovative solutions that empower businesses and individuals to achieve their goals.',
          size: 'md',
          align: 'center',
        },
      },
      {
        type: 'Card',
        props: {
          title: 'Our Mission',
          content:
            'To democratize technology and make powerful tools accessible to everyone, regardless of their technical background.',
          variant: 'primary',
        },
      },
      {
        type: 'Card',
        props: {
          title: 'Our Vision',
          content:
            'A world where technology serves humanity, fostering creativity, collaboration, and sustainable growth.',
          variant: 'secondary',
        },
      },
      {
        type: 'ImageBlock',
        props: {
          src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
          alt: 'Team collaboration',
          caption: 'Our diverse team working together',
          width: 800,
          height: 400,
        },
      },
      {
        type: 'StatsBox',
        props: {
          stats: [
            { label: 'Founded', value: '2020', description: 'Years of innovation' },
            { label: 'Team Size', value: '50+', description: 'Talented professionals' },
            { label: 'Countries', value: '15', description: 'Global presence' },
          ],
        },
      },
    ],
  });
}
