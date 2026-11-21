import { Link, useParams } from 'react-router-dom'
import { articles, bookBySlug, books, cases } from '../content'
import { useSeo } from '../utils/seo'
import { useFavorites } from '../utils/storage'
import { Icon } from '../components/Icon'
import { Figure } from '../components/Figure'
import { NotFoundPage } from './NotFoundPage'

export function BookDetailPage() {
  const { slug = '' } = useParams()
  const book = bookBySlug(slug)
  const { favorites, toggle } = useFavorites()
  const key = `book:${slug}` as const
  const fav = favorites.includes(key)

  useSeo({
    title: book?.titleZh ?? '书籍',
    description: book?.summary ?? '',
    path: `/books/${slug}`,
    jsonLd: book ? {
      '@context': 'https://schema.org', '@type': 'Book', name: book.titleZh,
      author: { '@type': 'Person', name: book.author },
      ...(book.yearOriginal ? { datePublished: String(book.yearOriginal) } : {}),
      description: book.summary,
    } : undefined,
  })

  if (!book) return <NotFoundPage />
  const idx = books.findIndex((b) => b.slug === slug)
  const prev = books[idx - 1]
  const next = books[idx + 1]
  const relatedArticles = (book.relatedArticles ?? []).map((s) => articles.find((a) => a.slug === s)).filter(Boolean)
  const relatedCases = (book.relatedCases ?? []).map((s) => cases.find((c) => c.slug === s)).filter(Boolean)

  return (
    <>
      <div className="detail-head">
        <div className="container-narrow">
          <div className="crumbs"><Link to="/">首页</Link><span>/</span><Link to="/books">书籍</Link><span>/</span><span>{book.category}</span></div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{book.titleZh}</h1>
          <p className="detail-sub" style={{ fontFamily: 'var(--sans)', fontSize: 15 }}>{book.titleOriginal}</p>
          <p className="detail-summary">{book.summary}</p>
          <div className="detail-meta">
            <span><Icon name="person" size={14} /> {book.author}</span>
            <span>{book.category}</span>
            <span>阅读难度：{book.difficulty}</span>
            {book.yearOriginal && <span>原著出版：{book.yearOriginal} 年</span>}
            {!book.yearOriginal && <span>原著年份待核实，未填写</span>}
          </div>
          <div className="hero-actions" style={{ marginTop: 20 }}>
            <button className="btn btn-outline btn-sm" onClick={() => toggle(key)}><Icon name="bookmark" size={14} /> {fav ? '已收藏' : '收藏书籍'}</button>
            <button className="btn btn-outline btn-sm" onClick={() => window.print()}><Icon name="print" size={14} /> 打印</button>
          </div>
        </div>
      </div>

      <div className="container article-layout no-aside">
        <nav className="toc" aria-label="书籍目录">
          <div className="toc-title">目录</div>
          <ol>
            <li><a href="#b-intro">书籍介绍</a></li>
            <li><a href="#b-core">核心观点</a></li>
            <li><a href="#b-connection">与第一性原理的关系</a></li>
            <li><a href="#b-read">阅读建议</a></li>
            <li><a href="#b-ref">参考资料</a></li>
          </ol>
        </nav>

        <div className="prose" style={{ maxWidth: 'none' }}>
          <Figure name="logicTree" caption="阅读主线：从核心观点到适用边界" />

          <section className="field" id="b-intro" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">01</span>书籍介绍</h2>
            <p>{book.intro}</p>
          </section>
          <section className="field" id="b-core" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">02</span>核心观点</h2>
            <p>{book.coreIdeas}</p>
            <div style={{ marginTop: 12 }}>{book.keyConcepts.map((c) => <span className="tag" key={c} style={{ marginRight: 8, marginBottom: 8 }}>{c}</span>)}</div>
          </section>
          <section className="field" id="b-connection" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">03</span>与第一性原理的关系</h2>
            <p>{book.connection}</p>
          </section>
          <section className="field" id="b-read" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">04</span>适合读者与阅读顺序</h2>
            <p>适合读者：{book.audience}。阅读难度：{book.difficulty}。{book.readingOrder}</p>
            <div className="callout note"><div className="callout-title">版权说明</div><p>本站不提供受版权保护的全文或大段原文，仅提供概述、概念索引与关联阅读。</p></div>
          </section>

          {(relatedArticles.length > 0 || relatedCases.length > 0) && (
            <section className="field">
              <h2 className="field-label"><span className="num">05</span>关联文章与案例</h2>
              <p>
                {relatedArticles.map((a) => <span key={a!.slug}><Link to={`/articles/${a!.slug}`}>{a!.title}</Link>　</span>)}
                {relatedCases.map((c) => <span key={c!.slug}><Link to={`/cases/${c!.slug}`}>{c!.title}</Link>　</span>)}
              </p>
            </section>
          )}

          <section className="field" id="b-ref" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">06</span>参考资料</h2>
            <ol className="reference-list">{book.references.map((r, i) => <li key={i}>{r.title}{r.author ? `，${r.author}` : ''}{r.note ? `。${r.note}` : ''}</li>)}</ol>
          </section>

          <div className="pager">
            {prev ? <Link to={`/books/${prev.slug}`}><small>上一本</small>{prev.titleZh}</Link> : <span />}
            {next && <Link to={`/books/${next.slug}`}><small>下一本</small>{next.titleZh}</Link>}
          </div>
        </div>
      </div>
    </>
  )
}
