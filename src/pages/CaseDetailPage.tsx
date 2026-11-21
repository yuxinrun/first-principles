import { Link, useParams } from 'react-router-dom'
import { articles, caseBySlug, cases, people } from '../content'
import { formatDate } from '../utils/content'
import { useSeo } from '../utils/seo'
import { useFavorites } from '../utils/storage'
import { Icon } from '../components/Icon'
import { Figure } from '../components/Figure'
import type { ArtKey } from '../assets/svg'
import { NotFoundPage } from './NotFoundPage'

const fieldFigure: Record<string, ArtKey> = {
  科学: 'scientificMethod', 数学: 'axiomDerivation', 工程: 'rocket', 商业: 'costBreakdown', 日常: 'problemBreakdown',
}

const template = [
  { key: 'background', label: '背景', num: '01' },
  { key: 'problem', label: '需要解决的问题', num: '02' },
  { key: 'traditionalAssumptions', label: '传统思路或常见假设', num: '03' },
  { key: 'basicFacts', label: '可确认的基本事实', num: '04' },
  { key: 'decomposition', label: '拆解过程', num: '05' },
  { key: 'reDerivation', label: '重新推导', num: '06' },
  { key: 'actualSolution', label: '实际方案', num: '07' },
  { key: 'resultsEvidence', label: '结果与证据', num: '08' },
  { key: 'firstPrinciplesReflection', label: '哪里体现了第一性原理', num: '09' },
  { key: 'limitations', label: '案例局限', num: '10' },
  { key: 'transferableMethods', label: '可以迁移的思考方法', num: '11' },
] as const

export function CaseDetailPage() {
  const { slug = '' } = useParams()
  const item = caseBySlug(slug)
  const { favorites, toggle } = useFavorites()
  const key = `case:${slug}` as const
  const fav = favorites.includes(key)

  useSeo({
    title: item?.title ?? '案例',
    description: item?.summary ?? '',
    path: `/cases/${slug}`,
    jsonLd: item ? { '@context': 'https://schema.org', '@type': 'Article', headline: item.title, description: item.summary, datePublished: item.published } : undefined,
  })

  if (!item) return <NotFoundPage />
  const idx = cases.findIndex((c) => c.slug === slug)
  const prev = cases[idx - 1]
  const next = cases[idx + 1]
  const relatedArticles = (item.relatedArticles ?? []).map((s) => articles.find((a) => a.slug === s)).filter(Boolean)
  const relatedPeople = (item.relatedPeople ?? []).map((s) => people.find((p) => p.slug === s)).filter(Boolean)

  return (
    <>
      <div className="detail-head">
        <div className="container-narrow">
          <div className="crumbs"><Link to="/">首页</Link><span>/</span><Link to="/cases">案例</Link><span>/</span><span>{item.field}</span></div>
          <div style={{ margin: '14px 0' }}><span className="tag tag-accent">{item.field}</span> <span className="evidence-badge" style={{ marginLeft: 8 }}>证据等级：{item.evidenceLevel}</span></div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>{item.title}</h1>
          <p className="detail-summary">{item.summary}</p>
          <div className="detail-meta"><span>发布于 {formatDate(item.published)}</span><span>预计阅读 {item.readingMinutes} 分钟</span><span>统一 14 项模板</span></div>
          <div className="hero-actions" style={{ marginTop: 20 }}>
            <button className="btn btn-outline btn-sm" onClick={() => toggle(key)}><Icon name="bookmark" size={14} /> {fav ? '已收藏' : '收藏案例'}</button>
            <button className="btn btn-outline btn-sm" onClick={() => window.print()}><Icon name="print" size={14} /> 打印</button>
          </div>
        </div>
      </div>

      <div className="container article-layout no-aside">
        <nav className="toc" aria-label="案例目录">
          <div className="toc-title">拆解结构</div>
          <ol>{template.map((t) => <li key={t.key}><a href={`#f-${t.key}`}>{t.label}</a></li>)}<li><a href="#f-ref">参考资料</a></li></ol>
          <div style={{ marginTop: 20, fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>本案例明确区分公开事实、当事人解释、作者分析与教学示例。</div>
        </nav>

        <div className="prose" style={{ maxWidth: 'none' }}>
          <Figure name={fieldFigure[item.field] ?? 'problemBreakdown'} caption={`${item.field}案例的结构示意（概念图，不代表案例真实数据）`} />

          {template.map((t) => (
            <section className="field" id={`f-${t.key}`} key={t.key} style={{ scrollMarginTop: 90 }}>
              <h2 className="field-label"><span className="num">{t.num}</span>{t.label}</h2>
              <p>{item[t.key]}</p>
            </section>
          ))}

          <section className="field" id="f-ref" style={{ scrollMarginTop: 90 }}>
            <h2 className="field-label"><span className="num">12</span>参考资料</h2>
            <ol className="reference-list">
              {item.references.map((r, i) => <li key={i}>{r.title}{r.author ? `，${r.author}` : ''}{r.note ? `。${r.note}` : ''}</li>)}
            </ol>
          </section>

          {(relatedArticles.length > 0 || relatedPeople.length > 0) && (
            <div className="callout note">
              <div className="callout-title">延伸阅读</div>
              <p>
                {relatedArticles.map((a) => <span key={a!.slug}><Link to={`/articles/${a!.slug}`}>{a!.title}</Link>　</span>)}
                {relatedPeople.map((p) => <span key={p!.slug}><Link to={`/people/${p!.slug}`}>{p!.name}</Link>　</span>)}
              </p>
            </div>
          )}

          <div className="pager">
            {prev ? <Link to={`/cases/${prev.slug}`}><small>上一个案例</small>{prev.title}</Link> : <span />}
            {next && <Link to={`/cases/${next.slug}`}><small>下一个案例</small>{next.title}</Link>}
          </div>
        </div>
      </div>
    </>
  )
}
