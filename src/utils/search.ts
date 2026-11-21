import type { SearchItem } from '../types/content'
import type { Article, Book, CaseStudy, Person, Topic } from '../types/content'
import { blockText } from './content'

export function buildIndex(articles: Article[], cases: CaseStudy[], people: Person[], books: Book[], topics: Topic[]): SearchItem[] {
  const items: SearchItem[] = []
  articles.forEach((a) => items.push({
    id: `article:${a.slug}`,
    type: '文章',
    title: a.title,
    subtitle: a.summary,
    path: `/articles/${a.slug}`,
    category: a.category,
    keywords: `${a.title} ${a.subtitle ?? ''} ${a.summary} ${a.tags.join(' ')} ${a.blocks.map(blockText).join(' ')}`.toLowerCase(),
  }))
  cases.forEach((c) => items.push({
    id: `case:${c.slug}`,
    type: '案例',
    title: c.title,
    subtitle: c.summary,
    path: `/cases/${c.slug}`,
    category: c.field,
    keywords: `${c.title} ${c.summary} ${c.field} ${c.tags.join(' ')} ${c.background} ${c.basicFacts} ${c.decomposition}`.toLowerCase(),
  }))
  people.forEach((p) => items.push({
    id: `person:${p.slug}`,
    type: '人物',
    title: p.name,
    subtitle: `${p.nameEn} · ${p.field}`,
    path: `/people/${p.slug}`,
    category: p.field,
    keywords: `${p.name} ${p.nameEn} ${p.field} ${p.summary} ${p.coreIdeas} ${p.bio} ${p.works.join(' ')}`.toLowerCase(),
  }))
  books.forEach((b) => items.push({
    id: `book:${b.slug}`,
    type: '书籍',
    title: b.titleZh,
    subtitle: `${b.titleOriginal} · ${b.author}`,
    path: `/books/${b.slug}`,
    category: b.category,
    keywords: `${b.titleZh} ${b.titleOriginal} ${b.author} ${b.summary} ${b.coreIdeas} ${b.keyConcepts.join(' ')}`.toLowerCase(),
  }))
  topics.forEach((t) => items.push({
    id: `topic:${t.slug}`,
    type: '专题',
    title: t.name,
    subtitle: `${t.nameEn} · ${t.summary}`,
    path: `/${t.slug}`,
    category: t.name,
    keywords: `${t.name} ${t.nameEn} ${t.summary} ${t.children.join(' ')}`.toLowerCase(),
  }))
  return items
}

export function filterItems(items: SearchItem[], query: string, type: string, category: string): SearchItem[] {
  const q = query.trim().toLowerCase()
  return items.filter((item) => {
    if (type !== '全部' && item.type !== type) return false
    if (category !== '全部' && item.category !== category) return false
    if (!q) return true
    const terms = q.split(/\s+/)
    return terms.every((term) => item.title.toLowerCase().includes(term) || item.keywords.includes(term))
  })
}
