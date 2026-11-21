import { useSearchParams } from 'react-router-dom'
import { articles, topics } from '../content'
import { PageHead } from '../components/PageHead'
import { ArticleCard } from '../components/Cards'
import { useSeo } from '../utils/seo'

export function ArticlesPage() {
  useSeo({ title: '深度文章', description: '有定义、有推理、有案例、有反例与适用边界的中文长文，系统讲解第一性原理及其应用。', path: '/articles' })
  const [params, setParams] = useSearchParams()
  const category = params.get('category') ?? '全部'
  const list = category === '全部' ? articles : articles.filter((a) => a.category === category)

  return (
    <>
      <PageHead kicker="ESSAYS" title="深度文章" description={`共 ${articles.length} 篇中文文章，覆盖基础概念、思考方法、科学哲学、商业工程、个人应用与进阶反思。`} crumbs={[{ label: '文章' }]} />
      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="按专题筛选">
            <button className={`filter-chip ${category === '全部' ? 'active' : ''}`} onClick={() => setParams({})}>全部 {articles.length}</button>
            {topics.map((t) => {
              const count = articles.filter((a) => a.category === t.slug).length
              if (!count) return null
              return <button key={t.slug} className={`filter-chip ${category === t.slug ? 'active' : ''}`} onClick={() => setParams({ category: t.slug })}>{t.name} {count}</button>
            })}
          </div>
          <div className="grid grid-3">{list.map((a) => <ArticleCard key={a.slug} article={a} />)}</div>
        </div>
      </section>
    </>
  )
}
