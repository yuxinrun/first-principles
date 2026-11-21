import { useEffect } from 'react'
import { iconsRawSvg } from '../assets/svg'

export function IconSprite() {
  useEffect(() => {
    if (document.getElementById('fp-icon-sprite')) return
    const el = document.createElement('div')
    el.id = 'fp-icon-sprite'
    el.setAttribute('aria-hidden', 'true')
    el.style.display = 'none'
    el.innerHTML = iconsRawSvg
    document.body.appendChild(el)
  }, [])
  return null
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

export function Icon({ name, size = 20, className = '' }: IconProps) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <use href={`#i-${name}`} />
    </svg>
  )
}
