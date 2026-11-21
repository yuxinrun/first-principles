import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { searchIndex } from '../content'
import { filterItems } from '../utils/search'
import { PageHead } from '../components/PageHead'
import { Icon } from '../components/Icon'
import { useSeo } from '../utils/seo'

const types = ['全部', '文章', '案例', '人物', '书籍', '专题'] as const

export function SearchPage() {
  useSeo({ title: '全站搜索', description: '搜索文章、案例、人物、书籍与专题，支持中文关键词、分类与内容类型筛选。', path: '/search' })
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const type = params.get('type') ?? '全部'
  const category = params.get('category') ?? '全部'

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (!value || value === '全部') next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const categories = useMemo(() => ['全部', ...Array.from(new Set(searchIndex.map((i) => i.category)))].slice(0, 18), [])
  const results = useMemo(() => filterItems(searchIndex, q, type, category), [q, type, category])

  return (
    <>
      <PageHead kicker="SEARCH" title="全站搜索" description="覆盖文章正文摘要、案例、人物、书籍与专题。支持多个关键词同时匹配。" crumbs={[{ label: '搜索' }]} />
      <section className="section">
        <div className="container">
          <div className="search-bar">
            <input type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="输入中文关键词，例如：公理、火箭、假设、贝叶斯" aria-label="搜索关键词" autoFocus />
            <button className="btn btn-outline" onClick={() => setParams({})}>清空</button>
          </div>
          <div className="filter-bar" role="group" aria-label="内容类型筛选">
            {types.map((t) => <button key={t} className={`filter-chip ${type === t ? 'active' : ''}`} onClick={() => set('type', t)}>{t}</button>)}
          </div>
          <div className="filter-bar" role="group" aria-label="分类筛选">
            {categories.map((c) => <button key={c} className={`filter-chip ${category === c ? 'active' : ''}`} onClick={() => set('category', c)}>{c}</button>)}
          </div>
          <p style={{ color: 'var(--text-2)', fontSize: 13, margin: '18px 0' }}>共找到 <strong style={{ color: 'var(--text)' }}>{results.length}</strong> 条结果{q && ` · 关键词「${q}」`}</p>
          {results.length === 0 ? (
            <div className="empty-state"><Icon name="search" size={44} /><h3>没有找到匹配内容</h3><p>试试更短的关键词，或清除筛选条件。</p></div>
          ) : (
            results.map((r) => (
              <Link to={r.path} key={r.id} className="result-item">
                <span className="tag">{r.type}</span> <span className="path">{r.category}</span>
                <h3>{r.title}</h3>
                <p>{r.subtitle}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  )
}
