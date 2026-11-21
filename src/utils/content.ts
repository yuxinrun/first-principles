import type { Block } from '../types/content'

export function blockText(block: Block): string {
  switch (block.type) {
    case 'h2':
    case 'h3':
    case 'p':
      return block.text
    case 'list':
      return block.items.join(' ')
    case 'callout':
      return `${block.title ?? ''} ${block.text}`
    case 'quote':
      return `${block.text} ${block.source ?? ''}`
    case 'table':
      return [...block.headers, ...block.rows.flat()].join(' ')
  }
}

export function blocksToText(blocks: Block[]): string {
  return blocks.map(blockText).join(' ')
}

export function headingId(text: string, index: number): string {
  return `s-${index}-${text.replace(/[^\p{L}\p{N}]+/gu, '-').slice(0, 24)}`
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split('-')
  return `${y}年${Number(m)}月${Number(d)}日`
}

export function stripMarkdown(text: string): string {
  return text.replace(/[*_`>]/g, '').trim()
}
