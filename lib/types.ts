export interface CardProps {
  title: string
  content: string
  variant?: 'default' | 'primary' | 'secondary'
}

export interface ImageBlockProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export interface TextSectionProps {
  title?: string
  content: string
  size?: 'sm' | 'md' | 'lg'
  align?: 'left' | 'center' | 'right'
}

export interface StatsBoxProps {
  stats: Array<{
    label: string
    value: string | number
    description?: string
  }>
}

export interface CTAProps {
  text: string
  href?: string
  onClick?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export interface ComponentData {
  type: 'Card' | 'ImageBlock' | 'TextSection' | 'StatsBox' | 'CTA'
  props: CardProps | ImageBlockProps | TextSectionProps | StatsBoxProps | CTAProps
}

export interface PageData {
  slug: string
  components: ComponentData[]
}