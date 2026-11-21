import { Link } from 'react-router-dom'
import { PageHead } from '../components/PageHead'
import { Icon } from '../components/Icon'
import { Figure } from '../components/Figure'
import { useSeo } from '../utils/seo'

const tools = [
  { path: '/tools/problem-breakdown', icon: 'tool-breakdown', title: '第一性原理问题拆解器', desc: '八步引导：问题、假设、事实、猜测、约束、可设计条件、方案与验证。最后生成可导出的结构化报告。' },
  { path: '/tools/assumption-check', icon: 'tool-assumption', title: '假设审查清单', desc: '对一个决定或观点逐项检查事实依据、假设、验证状态、反例、认知偏差、关键约束与结论范围。' },
  { path: '/tools/decision', icon: 'tool-decision', title: '决策分析器', desc: '记录目标、时间范围、约束、方案、成本、风险、可逆性、长期影响与重新判断的触发条件。' },
  { path: '/tools/case-practice', icon: 'tool-practice', title: '案例拆解练习', desc: '从一个真实案例出发，先独立分析，再显示参考拆解过程，并给出对照问题。' },
]

export function ToolsPage() {
  useSeo({ title: '思维工具', description: '四个在浏览器本地运行的思考工具：问题拆解、假设审查、决策分析与案例练习。不上传输入，可导出 TXT/JSON。', path: '/tools' })
  return (
    <>
      <PageHead kicker="TOOLKIT" title="思维工具" description="工具不是答案生成器。它们的作用是把你的思考显式化，让前提、证据和推理过程能被自己复核。" crumbs={[{ label: '思维工具' }]} />
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {tools.map((t) => (
              <Link to={t.path} className="card card-link" key={t.path}>
                <div className="topic-icon"><Icon name={t.icon} size={22} /></div>
                <h3 className="card-title">{t.title}</h3>
                <p className="card-desc" style={{ display: 'block' }}>{t.desc}</p>
                <div className="card-foot"><span>本地运行 · 可导出</span><span className="read-more">开始使用 <Icon name="arrow-right" size={14} /></span></div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: 34 }}><Figure name="problemBreakdown" caption="这些工具共同遵循的结构：从问题到可验证的基本事实，再重新推导方案" /></div>
          <div className="callout warn" style={{ marginTop: 26 }}>
            <div className="callout-title">重要说明</div>
            <p>所有工具都在你的浏览器中运行。输入内容保存在本机 localStorage，不会上传，也没有账号系统。工具提供的是思考辅助，不是自动给出绝对正确的答案；清除浏览器数据会删除记录。你可以随时重置、修改、打印或导出 TXT / JSON。</p>
          </div>
        </div>
      </section>
    </>
  )
}
