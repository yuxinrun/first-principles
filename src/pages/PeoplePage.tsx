import { useSearchParams } from 'react-router-dom'
import { people } from '../content'
import { PageHead } from '../components/PageHead'
import { PersonCard } from '../components/Cards'
import { useSeo } from '../utils/seo'

const stances = ['全部', '明确讨论第一原理', '相近方法', '现代语境']

export function PeoplePage() {
  useSeo({ title: '思想人物', description: '区分“明确讨论第一原理”“采用相近方法”与“现代语境人物”三类档案，避免为了凑数而错误归类。', path: '/people' })
  const [params, setParams] = useSearchParams()
  const stance = params.get('stance') ?? '全部'
  const list = stance === '全部' ? people : people.filter((p) => p.stance === stance)

  return (
    <>
      <PageHead kicker="THINKERS" title="思想人物档案" description={`共 ${people.length} 位人物。我们明确区分历史上直接讨论第一原理的思想家、采用相近方法的科学家，以及现代语境下被用于说明这种思维方式的人物。`} crumbs={[{ label: '人物' }]} />
      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="按关系类型筛选">
            {stances.map((s) => <button key={s} className={`filter-chip ${stance === s ? 'active' : ''}`} onClick={() => setParams(s === '全部' ? {} : { stance: s })}>{s}</button>)}
          </div>
          <div className="grid grid-3">{list.map((p) => <PersonCard key={p.slug} person={p} />)}</div>
        </div>
      </section>
    </>
  )
}
