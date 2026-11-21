import { art, type ArtKey } from '../assets/svg'

interface FigureProps {
  name: ArtKey
  caption?: string
  className?: string
}

export function Figure({ name, caption, className = '' }: FigureProps) {
  return (
    <figure className={`figure ${className}`}>
      <div className="figure-art" aria-hidden={caption ? undefined : true} dangerouslySetInnerHTML={{ __html: art[name] }} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
