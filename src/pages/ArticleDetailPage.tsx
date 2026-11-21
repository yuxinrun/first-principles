import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { articles, articleBySlug, books, cases, people, topics } from '../content'
import { formatDate, headingId } from '../utils/content'
import { useSeo } from '../utils/seo'
import { useFavorites, useReadingRecords, useReadingSettings } from '../utils/storage'
import { RichContent } from '../components/RichContent'
import { Icon } from '../components/Icon'
import { Figure } from '../components/Figure'
import type { ArtKey } from '../assets/svg'
import { NotFoundPage } from './NotFoundPage'

const figureMap: Record<string, ArtKey> = {
  foundations: 'thinkingFlow', philosophy: 'axiomDerivation', logic: 'logicTree', science: 'scientificMethod',
  engineering: 'battery', business: 'costBreakdown', life: 'problemBreakdown', education: 'learningPath',
  society: 'systemsThinking', practice: 'causalMap',
}

export function ArticleDetailPage() {
  const { slug = '' } = useParams()
  const article = articleBySlug(slug)
  const bodyRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activeHeading, setActiveHeading] = useState('')
  const { favorites, toggle } = useFavorites()
  const { save, get } = useReadingRecords()
  const { setSettings } = useReadingSettings()

  const key = `article:${slug}` as const
  const fav = favorites.includes(key)

  useEffect(() => {
    if (!article) return
    const onScroll = () => {
      const el = bodyRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.offsetHeight - window.innerHeight * 0.6
      const done = Math.min(100, Math.max(0, (-rect.top / Math.max(total, 1)) * 100))
      setProgress(done)
      save(key, done)
      const headings = el.querySelectorAll<HTMLElement>('h2[id], h3[id]')
      let current = ''
      headings.forEach((h) => { if (h.getBoundingClientRect().top <= 130) current = h.id })
      setActiveHeading(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [article, key, save])

  const headings = useMemo(() => article ? article.blocks.flatMap((b, index) => (b.type === 'h2' || b.type === 'h3') ? [{ text: b.text, index, sub: b.type === 'h3' }] : []) : [], [article])

  useSeo({
    title: article?.title ?? '文章',
    description: article?.summary ?? '',
    type: 'article',
    path: `/articles/${slug}`,
    jsonLd: article ? {
      '@context': 'https://schema.org', '@type': 'Article', headline: article.title,
      description: article.summary, datePublished: article.published,
      author: { '@type': 'Organization', name: article.author },
    } : undefined,
  })

  if (!article) return <NotFoundPage />
  const topic = topics.find((t) => t.slug === article.category)
  const idx = articles.findIndex((a) => a.slug === slug)
  const prev = articles[idx - 1]
  const next = articles[idx + 1]
  const relatedPeople = (article.relatedPeople ?? []).map((s) => people.find((p) => p.slug === s)).filter(Boolean)
  const relatedBooks = (article.relatedBooks ?? []).map((s) => books.find((b) => b.slug === s)).filter(Boolean)
  const relatedCases = (article.relatedCases ?? []).map((s) => cases.find((c) => c.slug === s)).filter(Boolean)
  const readingPct = Math.round(get(key))

  return (
    <>
      <div className="reading-progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>
      <div className="detail-head">
        <div className="container-narrow">
          <div className="crumbs"><Link to="/">首页</Link><span>/</span><Link to="/articles">文章</Link><span>/</span><span>{topic?.name ?? article.category}</span></div>
          <h1>{article.title}</h1>
          {article.subtitle && <p className="detail-sub">{article.subtitle}</p>}
          <p className="detail-summary">{article.summary}</p>
          <div className="detail-meta">
            <span><Icon name="person" size={14} /> {article.author}</span>
            <span>发布于 {formatDate(article.published)}</span>
            {article.updated && <span>更新于 {formatDate(article.updated)}</span>}
            <span>预计阅读 {article.readingMinutes} 分钟</span>
            <span>{topic?.name ?? article.category}</span>
            {readingPct > 0 && <span>已读 {readingPct}%</span>}
          </div>
        </div>
      </div>

      <div className="container article-layout">
        <nav className="toc" aria-label="文章目录">
          <div className="toc-title">本文目录</div>
          <ol>
            {headings.map((h) => (
              <li key={h.index} className={h.sub ? 'sub' : ''}>
                <a href={`#${headingId(h.text, h.index)}`} className={activeHeading === headingId(h.text, h.index) ? 'active' : ''}>{h.text}</a>
              </li>
            ))}
          </ol>
          <div style={{ marginTop: 22 }}>
            <Link to="/tools/problem-breakdown" className="btn btn-outline btn-sm">用工具拆解 <Icon name="arrow-right" size={13} /></Link>
          </div>
        </nav>

        <div ref={bodyRef}>
          <div className="reading-toolbar" aria-label="阅读设置">
            <div className="tool-group">
              <span>字号</span>
              <button onClick={() => setSettings((s) => ({ ...s, fontSize: Math.max(15, s.fontSize - 1) }))} aria-label="减小字号">A−</button>
              <button onClick={() => setSettings((s) => ({ ...s, fontSize: Math.min(22, s.fontSize + 1) }))} aria-label="增大字号">A+</button>
            </div>
            <div className="tool-group">
              <span>行宽</span>
              <button onClick={() => setSettings((s) => ({ ...s, lineWidth: Math.max(560, s.lineWidth - 80) }))} aria-label="缩窄行宽">窄</button>
              <button onClick={() => setSettings((s) => ({ ...s, lineWidth: Math.min(900, s.lineWidth + 80) }))} aria-label="加宽行宽">宽</button>
            </div>
            <div className="tool-group">
              <button className={document.documentElement.dataset.theme === 'dark' ? 'on' : ''} onClick={() => setSettings((s) => ({ ...s, theme: document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark' }))}>深色阅读</button>
              <button className={fav ? 'on' : ''} onClick={() => toggle(key)} aria-pressed={fav}><Icon name="bookmark" size={13} /> {fav ? '已收藏' : '收藏'}</button>
              <button onClick={() => window.print()}><Icon name="print" size={13} /> 打印</button>
            </div>
          </div>

          <RichContent blocks={article.blocks} />

          <Figure name={figureMap[article.category] ?? 'thinkingFlow'} caption={`与「${topic?.name ?? article.category}」相关的结构图`} />

          <div className="article-footer">
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>参考资料</h3>
            <ol className="reference-list">
              {article.references.map((r, i) => <li key={i}>{r.title}{r.author ? `，${r.author}` : ''}{r.note ? `。${r.note}` : ''}{r.url ? ` — ${r.url}` : ''}</li>)}
            </ol>

            {(relatedPeople.length > 0 || relatedBooks.length > 0 || relatedCases.length > 0) && (
              <div style={{ marginTop: 30 }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>延伸阅读</h3>
                <ul className="prose" style={{ paddingLeft: 20 }}>
                  {relatedPeople.map((p) => <li key={p!.slug}>人物：<Link to={`/people/${p!.slug}`}>{p!.name}</Link></li>)}
                  {relatedBooks.map((b) => <li key={b!.slug}>书籍：<Link to={`/books/${b!.slug}`}>{b!.titleZh}</Link></li>)}
                  {relatedCases.map((c) => <li key={c!.slug}>案例：<Link to={`/cases/${c!.slug}`}>{c!.title}</Link></li>)}
                </ul>
              </div>
            )}

            <div className="pager">
              {prev ? <Link to={`/articles/${prev.slug}`}><small>上一篇</small>{prev.title}</Link> : <span />}
              {next && <Link to={`/articles/${next.slug}`}><small>下一篇</small>{next.title}</Link>}
            </div>
          </div>
        </div>

        <aside className="article-aside">
          <div className="side-block">
            <h4>专题</h4>
            <Link to={`/${article.category}`}>{topic?.name ?? article.category} <Icon name="arrow-right" size={12} /></Link>
          </div>
          <div className="side-block">
            <h4>关键词</h4>
            <div>{article.tags.map((t) => <span className="tag" key={t} style={{ marginRight: 6, marginBottom: 6 }}>{t}</span>)}</div>
          </div>
          <div className="side-block">
            <h4>阅读记录</h4>
            <p style={{ fontSize: 13, color: 'var(--text-2)' }}>阅读进度保存在本机浏览器，不会上传。当前：{readingPct}%</p>
          </div>
        </aside>
      </div>
    </>
  )
}
