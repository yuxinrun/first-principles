import { coreArticles } from './articles/articles-core'
import { methodArticles } from './articles/articles-method'
import { scienceArticles } from './articles/articles-science'
import { businessArticles } from './articles/articles-business'
import { lifeArticles } from './articles/articles-life'
import { advancedArticles } from './articles/articles-advanced'
import { scienceCases } from './cases/cases-science'
import { mathCases } from './cases/cases-math'
import { engineeringCases } from './cases/cases-engineering'
import { businessCases } from './cases/cases-business'
import { lifeCases } from './cases/cases-life'
import { classicalPeople } from './people/people-classical'
import { sciencePeople } from './people/people-science'
import { modernPeople } from './people/people-modern'
import { philosophyBooks } from './books/books-philosophy'
import { scienceBooks } from './books/books-science'
import { thinkingBooks } from './books/books-thinking'
import { businessBooks } from './books/books-business'
import { learningBooks } from './books/books-learning'
import { topics } from '../data/site'
import { buildIndex } from '../utils/search'

export const articles = [
  ...coreArticles,
  ...methodArticles,
  ...scienceArticles,
  ...businessArticles,
  ...lifeArticles,
  ...advancedArticles,
]

export const cases = [
  ...scienceCases,
  ...mathCases,
  ...engineeringCases,
  ...businessCases,
  ...lifeCases,
]

export const people = [
  ...classicalPeople,
  ...sciencePeople,
  ...modernPeople,
]

export const books = [
  ...philosophyBooks,
  ...scienceBooks,
  ...thinkingBooks,
  ...businessBooks,
  ...learningBooks,
]

export { topics }

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug)
export const caseBySlug = (slug: string) => cases.find((c) => c.slug === slug)
export const personBySlug = (slug: string) => people.find((p) => p.slug === slug)
export const bookBySlug = (slug: string) => books.find((b) => b.slug === slug)

export const searchIndex = buildIndex(articles, cases, people, books, topics)

export const latestUpdates = [
  ...articles.map((a) => ({ title: a.title, path: `/articles/${a.slug}`, date: a.updated ?? a.published, type: '文章' })),
  ...cases.map((c) => ({ title: c.title, path: `/cases/${c.slug}`, date: c.published, type: '案例' })),
  ...books.map((b) => ({ title: b.titleZh, path: `/books/${b.slug}`, date: '', type: '书籍' })),
].filter((x) => x.date).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8)
