export type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; title?: string; text: string; tone?: 'note' | 'warn' | 'tip' }
  | { type: 'quote'; text: string; source?: string }
  | { type: 'table'; headers: string[]; rows: string[][] }

export interface Reference {
  title: string
  author?: string
  url?: string
  note?: string
}

export interface Article {
  slug: string
  title: string
  subtitle?: string
  summary: string
  category: string
  tags: string[]
  author: string
  published: string
  updated?: string
  readingMinutes: number
  featured?: boolean
  blocks: Block[]
  relatedPeople?: string[]
  relatedBooks?: string[]
  relatedCases?: string[]
  references: Reference[]
}

export interface CaseStudy {
  slug: string
  title: string
  field: string
  category: string
  summary: string
  tags: string[]
  published: string
  readingMinutes: number
  featured?: boolean
  background: string
  problem: string
  traditionalAssumptions: string
  basicFacts: string
  decomposition: string
  reDerivation: string
  actualSolution: string
  resultsEvidence: string
  firstPrinciplesReflection: string
  limitations: string
  transferableMethods: string
  evidenceLevel: '公开资料' | '当事人公开解释' | '作者分析' | '教学示例'
  references: Reference[]
  relatedArticles?: string[]
  relatedPeople?: string[]
}

export type PersonStance = '明确讨论第一原理' | '相近方法' | '现代语境'

export interface Person {
  slug: string
  name: string
  nameEn: string
  years: string
  field: string
  stance: PersonStance
  summary: string
  bio: string
  coreIdeas: string
  contributions: string
  connection: string
  works: string[]
  keyCases: string[]
  influence: string
  controversies: string
  furtherReading: string[]
  references: Reference[]
  relatedArticles?: string[]
  relatedCases?: string[]
}

export interface Book {
  slug: string
  titleZh: string
  titleOriginal: string
  author: string
  yearOriginal?: number
  category: string
  summary: string
  intro: string
  coreIdeas: string
  connection: string
  keyConcepts: string[]
  audience: string
  difficulty: '入门' | '进阶' | '深入'
  readingOrder: string
  relatedArticles?: string[]
  relatedCases?: string[]
  relatedPeople?: string[]
  references: Reference[]
}

export interface Topic {
  slug: string
  name: string
  nameEn: string
  summary: string
  icon: string
  children: string[]
}

export interface SearchItem {
  id: string
  type: '文章' | '案例' | '人物' | '书籍' | '专题'
  title: string
  subtitle: string
  path: string
  category: string
  keywords: string
}
