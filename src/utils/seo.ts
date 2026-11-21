import { useEffect } from 'react'
import { site } from '../data/site'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = content
}

export interface SeoOptions {
  title: string
  description: string
  type?: 'website' | 'article' | 'book'
  path?: string
  jsonLd?: Record<string, unknown>
}

export function useSeo({ title, description, type = 'website', path = '/', jsonLd }: SeoOptions) {
  useEffect(() => {
    const fullTitle = title === site.name ? title : `${title} · ${site.name}`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:type"]', 'property', 'og:type', type)
    const url = site.url.replace(/\/$/, '') + '/#' + path
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
    let script = document.head.querySelector<HTMLScriptElement>('script[data-seo="jsonld"]')
    if (jsonLd) {
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.dataset.seo = 'jsonld'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(jsonLd)
    } else if (script) {
      script.remove()
    }
  }, [title, description, type, path, jsonLd])
}
