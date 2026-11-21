import { useSearchParams } from 'react-router-dom'
import { cases } from '../content'
import { PageHead } from '../components/PageHead'
import { CaseCard } from '../components/Cards'
import { useSeo } from '../utils/seo'

const fields = ['全部', '科学', '数学', '工程', '商业', '日常']

export function CasesPage() {
  useSeo({ title: '真实案例', description: '按统一 14 项模板拆解的科学、数学、工程、商业与日常案例，标注证据等级、局限与可迁移方法。', path: '/cases' })
  const [params, setParams] = useSearchParams()
  const field = params.get('field') ?? '全部'
  const list = field === '全部' ? cases : cases.filter((c) => c.field === field)

  return (
    <>
      <PageHead kicker="CASE LIBRARY" title="真实案例库" description={`每个案例都讲清背景、问题、传统假设、基本事实、拆解过程、重新推导、实际行动、结果与证据、第一性原理体现、局限与可迁移方法。共 ${cases.length} 个案例。`} crumbs={[{ label: '案例' }]} />
      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="按领域筛选">
            {fields.map((f) => (
              <button key={f} className={`filter-chip ${field === f ? 'active' : ''}`} onClick={() => setParams(f === '全部' ? {} : { field: f })}>
                {f}{f === '全部' ? ` ${cases.length}` : ` ${cases.filter((c) => c.field === f).length}`}
              </button>
            ))}
          </div>
          <div className="grid grid-3">{list.map((c) => <CaseCard key={c.slug} item={c} />)}</div>
        </div>
      </section>
    </>
  )
}
