import { Link } from 'react-router-dom'
import type { Article, Book, CaseStudy, Person, Topic } from '../types/content'
import { formatDate } from '../utils/content'
import { Icon } from './Icon'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link to={`/articles/${article.slug}`} className="card card-link">
      <div className="card-meta">
        <span className="tag">{article.category === 'foundations' ? '基础' : article.category === 'practice' ? '方法' : article.category}</span>
        <span>{formatDate(article.published)}</span>
        <span>{article.readingMinutes} 分钟</span>
      </div>
      <h3 className="card-title">{article.title}</h3>
      <p className="card-desc">{article.summary}</p>
      <div className="card-foot"><span>{article.author}</span><span className="read-more">阅读 <Icon name="arrow-right" size={14} /></span></div>
    </Link>
  )
}

export function CaseCard({ item }: { item: CaseStudy }) {
  return (
    <Link to={`/cases/${item.slug}`} className="card card-link">
      <div className="card-meta"><span className="tag tag-accent">{item.field}</span><span>{item.evidenceLevel}</span></div>
      <h3 className="card-title">{item.title}</h3>
      <p className="card-desc">{item.summary}</p>
      <div className="card-foot"><span>{item.readingMinutes} 分钟</span><span className="read-more">查看拆解 <Icon name="arrow-right" size={14} /></span></div>
    </Link>
  )
}

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.slug}`} className="card card-link">
      <div className="card-meta"><span className="tag">{book.category}</span><span>{book.difficulty}</span></div>
      <h3 className="card-title">{book.titleZh}</h3>
      <p className="card-desc">{book.summary}</p>
      <div className="card-foot"><span>{book.author}</span><span className="read-more">详情 <Icon name="arrow-right" size={14} /></span></div>
    </Link>
  )
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <Link to={`/people/${person.slug}`} className="card card-link">
      <div className="card-meta"><span className="tag">{person.field}</span><span className="tag tag-accent">{person.stance}</span></div>
      <h3 className="card-title">{person.name} <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 400 }}>{person.nameEn}</span></h3>
      <p className="card-desc">{person.summary}</p>
      <div className="card-foot"><span>{person.years}</span><span className="read-more">档案 <Icon name="arrow-right" size={14} /></span></div>
    </Link>
  )
}

export function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link to={`/${topic.slug}`} className="card card-link topic-card">
      <div className="topic-icon"><Icon name={topic.icon} size={22} /></div>
      <div className="topic-en">{topic.nameEn}</div>
      <h3 className="card-title" style={{ marginTop: 4 }}>{topic.name}</h3>
      <p className="card-desc">{topic.summary}</p>
      <ul className="topic-children">{topic.children.slice(0, 5).map((c) => <li key={c}>{c}</li>)}</ul>
      <div className="card-foot"><span>{topic.children.length} 个子主题</span><span className="read-more">进入 <Icon name="arrow-right" size={14} /></span></div>
    </Link>
  )
}
