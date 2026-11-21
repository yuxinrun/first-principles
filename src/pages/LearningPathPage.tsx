import { Link } from 'react-router-dom'
import { articles, books, cases } from '../content'
import { pathStages } from '../content/learning-path'
import { PageHead } from '../components/PageHead'
import { Figure } from '../components/Figure'
import { useSeo } from '../utils/seo'

export function LearningPathPage() {
  useSeo({ title: '学习路径', description: '从初级到高级的三阶段学习路线，每阶段配有推荐文章、书籍、案例与练习。', path: '/learning-path' })
  return (
    <>
      <PageHead kicker="LEARNING PATH" title="学习路径" description="路径只是建议顺序，不是硬性规定。你可以按兴趣跳转，但每个阶段的练习建议不要跳过。" crumbs={[{ label: '学习路径' }]} />
      <section className="section">
        <div className="container">
          <Figure name="learningPath" caption="三阶段学习路径：建立定义 → 分析案例 → 系统综合" className="figure-framed" />
          <div style={{ marginTop: 30 }}>
            {pathStages.map((stage) => (
              <section className="path-stage" key={stage.slug}>
                <div className="path-level">{stage.level}<span>STAGE {stage.slug === 'beginner' ? '01' : stage.slug === 'intermediate' ? '02' : '03'}</span></div>
                <div>
                  <h2>{stage.title}</h2>
                  <p><strong>目标：</strong>{stage.goal}</p>
                  <p>{stage.description}</p>
                  <div className="path-group"><h4>推荐文章</h4><div className="path-chips">{stage.articles.map((s) => { const a = articles.find((x) => x.slug === s); return a ? <Link key={s} to={`/articles/${s}`}>{a.title}</Link> : null })}</div></div>
                  <div className="path-group"><h4>推荐书籍</h4><div className="path-chips">{stage.books.map((s) => { const b = books.find((x) => x.slug === s); return b ? <Link key={s} to={`/books/${s}`}>{b.titleZh}</Link> : null })}</div></div>
                  <div className="path-group"><h4>研究案例</h4><div className="path-chips">{stage.cases.map((s) => { const c = cases.find((x) => x.slug === s); return c ? <Link key={s} to={`/cases/${s}`}>{c.title}</Link> : null })}</div></div>
                  <div className="callout tip" style={{ marginTop: 18 }}><div className="callout-title">阶段练习</div><p>{stage.exercise}</p></div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
