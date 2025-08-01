import Image from 'next/image'
import { ImageBlockProps } from '../lib/types'

export default function ImageBlock({ 
  src, 
  alt, 
  caption, 
  width = 800, 
  height = 400 
}: ImageBlockProps) {
  return (
    <div className="w-full">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover"
          priority={false}
        />
      </div>
      {caption && (
        <p className="text-sm text-gray-600 text-center mt-3 italic">
          {caption}
        </p>
      )}
    </div>
  )
}