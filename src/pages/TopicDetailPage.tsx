import { Link } from 'react-router-dom'
import { articles, books, cases, topics } from '../content'
import { PageHead } from '../components/PageHead'
import { ArticleCard, BookCard, CaseCard } from '../components/Cards'
import { Figure } from '../components/Figure'
import { useSeo } from '../utils/seo'
import { NotFoundPage } from './NotFoundPage'
import type { ArtKey } from '../assets/svg'

const figureMap: Record<string, ArtKey> = {
  foundations: 'thinkingFlow',
  philosophy: 'axiomDerivation',
  logic: 'logicTree',
  science: 'scientificMethod',
  engineering: 'battery',
  business: 'costBreakdown',
  life: 'problemBreakdown',
  education: 'learningPath',
  society: 'systemsThinking',
  practice: 'causalMap',
}

export function TopicDetailPage({ slug }: { slug: string }) {
  const topic = topics.find((t) => t.slug === slug)
  useSeo({
    title: topic?.name ?? '专题',
    description: topic?.summary ?? '第一性原理专题',
    path: `/${slug}`,
  })
  if (!topic) return <NotFoundPage />

  const bookMap: Record<string, string[]> = {
    foundations: ['asking-the-right-questions', 'art-of-thinking-clearly', 'poor-charlies-almanack', 'history-western-philosophy'],
    philosophy: ['metaphysics-aristotle', 'meditations-descartes', 'ethics-spinoza', 'critique-pure-reason'],
    logic: ['elements-euclid', 'godel-escher-bach', 'loss-of-certainty', 'logic-scientific-discovery'],
    science: ['logic-scientific-discovery', 'structure-scientific-revolutions', 'feynman-lectures', 'thinking-in-systems'],
    engineering: ['feynman-lectures', 'principia-newton', 'deep-work', 'zero-to-one'],
    business: ['zero-to-one', 'innovators-dilemma', 'competitive-advantage', 'business-model-generation'],
    life: ['principles-dalio', 'thinking-fast-slow', 'influence-cialdini', 'asking-the-right-questions'],
    education: ['cognitive-nature-learning', 'peak-deliberate-practice', 'how-to-read-a-book', 'brainway-learning'],
    society: ['structure-scientific-revolutions', 'history-western-philosophy', 'thinking-in-systems', 'fifth-discipline'],
    practice: ['thinking-in-systems', 'lean-startup', 'asking-the-right-questions', 'fifth-discipline'],
  }
  const topicArticles = articles.filter((a) => a.category === slug)
  const topicCases = cases.filter((c) => c.category === slug)
  const topicBooks = (bookMap[slug] ?? []).map((s) => books.find((b) => b.slug === s)).filter((b): b is (typeof books)[number] => Boolean(b))

  return (
    <>
      <PageHead kicker={topic.nameEn} title={topic.name} description={topic.summary} crumbs={[{ label: '知识体系', to: '/topics' }, { label: topic.name }]} />
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <div className="section-kicker">本专题包含</div>
              <ul className="prose" style={{ paddingLeft: 20, marginTop: 12 }}>
                {topic.children.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <Figure name={figureMap[slug] ?? 'thinkingFlow'} caption={`${topic.name}专题结构图`} />
          </div>

          <div style={{ marginTop: 46 }}>
            <div className="section-head"><div><div className="section-kicker">ESSAYS</div><h2 className="section-title" style={{ fontSize: 26 }}>相关文章</h2></div><Link className="section-link" to={`/articles?category=${slug}`}>更多文章 →</Link></div>
            {topicArticles.length ? <div className="grid grid-3">{topicArticles.slice(0, 6).map((a) => <ArticleCard key={a.slug} article={a} />)}</div> : <div className="card"><p className="card-desc" style={{ display: 'block' }}>本专题的深度文章正在持续扩充。你可以先通过下方案例与全站搜索查找相关内容。</p></div>}
          </div>

          {topicCases.length > 0 && (
            <div style={{ marginTop: 46 }}>
              <div className="section-head"><div><div className="section-kicker">CASES</div><h2 className="section-title" style={{ fontSize: 26 }}>关联案例</h2></div><Link className="section-link" to="/cases">案例总览 →</Link></div>
              <div className="grid grid-3">{topicCases.slice(0, 6).map((c) => <CaseCard key={c.slug} item={c} />)}</div>
            </div>
          )}

          <div style={{ marginTop: 46 }}>
            <div className="section-head"><div><div className="section-kicker">BOOKS</div><h2 className="section-title" style={{ fontSize: 26 }}>推荐阅读</h2></div><Link className="section-link" to="/books">书籍总览 →</Link></div>
            <div className="grid grid-4">{topicBooks.map((b) => <BookCard key={b.slug} book={b} />)}</div>
          </div>
        </div>
      </section>
    </>
  )
}
