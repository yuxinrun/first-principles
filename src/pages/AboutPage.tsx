import { Link } from 'react-router-dom'
import { articles, books, cases, people, topics } from '../content'
import { site } from '../data/site'
import { PageHead } from '../components/PageHead'
import { Figure } from '../components/Figure'
import { useSeo } from '../utils/seo'

export function AboutPage() {
  useSeo({ title: '关于本站', description: '第一性原理网站的定位、编辑原则、内容边界与知识结构说明。', path: '/about' })
  return (
    <>
      <PageHead kicker="ABOUT" title="关于本站" description={site.manifesto} crumbs={[{ label: '关于本站' }]} />
      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <div className="section-kicker">POSITIONING</div>
              <h2 className="card-title">一个可以持续扩充的知识库</h2>
              <p className="card-desc" style={{ display: 'block' }}>"第一性原理"是一个系统研究和传播第一性原理思维方式的中文知识平台。它通过哲学思想、科学方法、数学逻辑、工程实践、商业创新、历史案例、人物思想与经典书籍，帮助读者理解这种思维方式，并学会在现实生活和工作中使用它。本站不是概念介绍页，也不是名人语录合集。</p>
            </div>
            <div className="card">
              <div className="section-kicker">SCOPE</div>
              <h2 className="card-title">目前收录</h2>
              <p className="card-desc" style={{ display: 'block' }}>{topics.length} 个知识专题、{articles.length} 篇深度文章、{cases.length} 个结构化案例、{people.length} 位人物档案、{books.length} 本经典书籍、4 个本地思维工具与一套三阶段学习路径。内容会持续修订，日期与参考资料随文标注。</p>
            </div>
          </div>

          <div style={{ marginTop: 40 }}>
            <div className="section-head"><div><div className="section-kicker">EDITORIAL PRINCIPLES</div><h2 className="section-title" style={{ fontSize: 28 }}>编辑原则</h2></div></div>
            <div className="grid grid-2">
              <div className="card"><h3 className="card-title">区分证据等级</h3><p className="card-desc" style={{ display: 'block' }}>案例明确标注：公开资料支持的事实、当事人的公开解释、作者的分析推断、教学示例。商业人物案例同时说明适用范围、成功条件、失败风险与局限，不把结果全部归因于某种思维方式。</p></div>
              <div className="card"><h3 className="card-title">不编造来源</h3><p className="card-desc" style={{ display: 'block' }}>不虚构论文、实验、统计数字、专家观点或企业内部决策过程。书籍只记录可核实的书名、作者与原著年份；无法确认的信息省略或标注待核实。</p></div>
              <div className="card"><h3 className="card-title">说明适用边界</h3><p className="card-desc" style={{ display: 'block' }}>文章先解释问题再提出观点，提供定义、推理、案例、反例与边界。对尚有争议的理论明确标注争议，不把个人判断伪装成科学定论。</p></div>
              <div className="card"><h3 className="card-title">本地优先的隐私</h3><p className="card-desc" style={{ display: 'block' }}>搜索在浏览器内完成；收藏、阅读进度、字号与主题保存在 localStorage。没有账号、没有后端、没有上传。详见<Link to="/privacy">隐私说明</Link>。</p></div>
            </div>
          </div>

          <div style={{ marginTop: 40 }}><Figure name="axiomDerivation" caption="本站的内容结构：以可核查的基本前提支持结论" /></div>

          <div style={{ marginTop: 40 }}>
            <h2 className="section-title" style={{ fontSize: 28 }}>视觉与资源</h2>
            <p style={{ color: 'var(--text-2)', maxWidth: 760 }}>网站的所有 SVG 插画、图标与结构图均为本站原创，作为本地文件随项目发布，不依赖远程图片。字体使用系统字体栈。图片与 SVG 的来源和许可记录见仓库中的 <code>image-sources.md</code>。</p>
          </div>

          <div className="callout note" style={{ marginTop: 34 }}>
            <div className="callout-title">如何阅读本站</div>
            <p>建议从<Link to="/foundations">第一性原理基础</Link>开始，然后进入<Link to="/learning-path">学习路径</Link>。如果你想直接看方法如何落地，可以从<Link to="/cases">案例库</Link>或<Link to="/tools">思维工具</Link>开始。</p>
          </div>
        </div>
      </section>
    </>
  )
}
