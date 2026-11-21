import { Link } from 'react-router-dom'
import { PageHead } from '../components/PageHead'
import { TopicCard } from '../components/Cards'
import { topics } from '../data/site'
import { useSeo } from '../utils/seo'
import { Figure } from '../components/Figure'

export function TopicsPage() {
  useSeo({ title: '知识体系', description: '第一性原理的完整知识分类：基础、哲学、数学逻辑、科学方法、工程、商业、个人成长、教育、社会与思维工具。', path: '/topics' })
  return (
    <>
      <PageHead kicker="KNOWLEDGE MAP" title="知识体系" description="十个专题不是十座孤岛：哲学提供问题意识，数学与科学提供验证方法，工程与商业提供约束场景，个人实践与思维工具把方法带回日常。" crumbs={[{ label: '知识体系' }]} />
      <section className="section">
        <div className="container">
          <div className="grid grid-4">{topics.map((t) => <TopicCard key={t.slug} topic={t} />)}</div>
          <div style={{ marginTop: 34 }}><Figure name="axiomDerivation" caption="贯穿各专题的共同结构：明确前提，规定推理，得到可复核的结论" /></div>
        </div>
      </section>
      <section className="section-tight section-alt">
        <div className="container">
          <div className="section-head"><div><h2 className="section-title" style={{ fontSize: 24 }}>不知道从哪里开始？</h2><p className="section-desc">建议先读第一性原理基础，再按你的兴趣进入某个领域；每个阶段都可以配合学习路径使用。</p></div><Link className="section-link" to="/learning-path">前往学习路径 →</Link></div>
        </div>
      </section>
    </>
  )
}
