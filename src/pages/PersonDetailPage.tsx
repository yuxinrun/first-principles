import { Link, useParams } from 'react-router-dom'
import { articles, cases, personBySlug, people } from '../content'
import { useSeo } from '../utils/seo'
import { useFavorites } from '../utils/storage'
import { Icon } from '../components/Icon'
import { Figure } from '../components/Figure'
import { NotFoundPage } from './NotFoundPage'

export function PersonDetailPage() {
  const { slug = '' } = useParams()
  const person = personBySlug(slug)
  const { favorites, toggle } = useFavorites()
  const key = `person:${slug}` as const
  const fav = favorites.includes(key)

  useSeo({
    title: person ? `${person.name} · 思想人物` : '人物',
    description: person?.summary ?? '',
    path: `/people/${slug}`,
    jsonLd: person ? { '@context': 'https://schema.org', '@type': 'Person', name: person.name, alternateName: person.nameEn, description: person.summary } : undefined,
  })

  if (!person) return <NotFoundPage />
  const idx = people.findIndex((p) => p.slug === slug)
  const prev = people[idx - 1]
  const next = people[idx + 1]
  const relatedArticles = (person.relatedArticles ?? []).map((s) => articles.find((a) => a.slug === s)).filter(Boolean)
  const relatedCases = (person.relatedCases ?? []).map((s) => cases.find((c) => c.slug === s)).filter(Boolean)

  return (
    <>
      <div className="detail-head">
        <div className="container-narrow">
          <div className="crumbs"><Link to="/">首页</Link><span>/</span><Link to="/people">人物</Link><span>/</span><span>{person.name}</span></div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{person.name}</h1>
          <p className="detail-sub" style={{ fontFamily: 'var(--sans)', fontSize: 15 }}>{person.nameEn} · {person.years}</p>
          <p className="detail-summary">{person.summary}</p>
          <div className="detail-meta">
            <span>{person.field}</span>
            <span className="tag tag-accent">{person.stance}</span>
          </div>
          <div className="hero-actions" style={{ marginTop: 20 }}>
            <button className="btn btn-outline btn-sm" onClick={() => toggle(key)}><Icon name="bookmark" size={14} /> {fav ? '已收藏' : '收藏人物'}</button>
            <button className="btn btn-outline btn-sm" onClick={() => window.print()}><Icon name="print" size={14} /> 打印</button>
          </div>
        </div>
      </div>

      <div className="container article-layout no-aside">
        <nav className="toc" aria-label="人物档案目录">
          <div className="toc-title">档案目录</div>
          <ol>
            {[['p-bio', '生平简介'], ['p-ideas', '核心思想'], ['p-contrib', '重要贡献'], ['p-link', '与第一性原理的联系'], ['p-works', '代表作品'], ['p-impact', '影响与争议'], ['p-ref', '参考资料']].map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
          </ol>
        </nav>

        <div className="prose" style={{ maxWidth: 'none' }}>
          <Figure name="axiomDerivation" caption="思想的位置：从基本前提到可检验结论" />

          <section className="field" id="p-bio" style={{ scrollMarginTop: 90 }}><h2 className="field-label"><span className="num">01</span>生平简介</h2><p>{person.bio}</p></section>
          <section className="field" id="p-ideas" style={{ scrollMarginTop: 90 }}><h2 className="field-label"><span className="num">02</span>核心思想</h2><p>{person.coreIdeas}</p></section>
          <section className="field" id="p-contrib" style={{ scrollMarginTop: 90 }}><h2 className="field-label"><span className="num">03</span>重要理论或贡献</h2><p>{person.contributions}</p></section>
          <section className="field" id="p-link" style={{ scrollMarginTop: 90 }}><h2 className="field-label"><span className="num">04</span>与第一性原理的联系</h2><p>{person.connection}</p></section>
          <section className="field" id="p-works" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">05</span>代表作品与重要案例</h2>
            <p>{person.works.join('；')}</p>
            <p>{person.keyCases.join('；')}</p>
          </section>
          <section className="field" id="p-impact" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">06</span>思想的影响、争议与局限</h2>
            <p>{person.influence}</p>
            <p>{person.controversies}</p>
            <div className="callout note"><div className="callout-title">延伸阅读</div><p>{person.furtherReading.join('；')}</p></div>
          </section>

          {(relatedArticles.length > 0 || relatedCases.length > 0) && (
            <section className="field">
              <h2 className="field-label">关联内容</h2>
              <p>
                {relatedArticles.map((a) => <span key={a!.slug}><Link to={`/articles/${a!.slug}`}>{a!.title}</Link>　</span>)}
                {relatedCases.map((c) => <span key={c!.slug}><Link to={`/cases/${c!.slug}`}>{c!.title}</Link>　</span>)}
              </p>
            </section>
          )}

          <section className="field" id="p-ref" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">07</span>参考资料</h2>
            <ol className="reference-list">{person.references.map((r, i) => <li key={i}>{r.title}{r.author ? `，${r.author}` : ''}{r.note ? `。${r.note}` : ''}</li>)}</ol>
          </section>

          <div className="pager">
            {prev ? <Link to={`/people/${prev.slug}`}><small>上一位</small>{prev.name}</Link> : <span />}
            {next && <Link to={`/people/${next.slug}`}><small>下一位</small>{next.name}</Link>}
          </div>
        </div>
      </div>
    </>
  )
}
