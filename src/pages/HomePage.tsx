import { Link } from 'react-router-dom'
import { articles, cases, latestUpdates, people, books } from '../content'
import { topics } from '../data/site'
import { site } from '../data/site'
import { useSeo } from '../utils/seo'
import { art } from '../assets/svg'
import { Figure } from '../components/Figure'
import { Icon } from '../components/Icon'
import { ArticleCard, BookCard, CaseCard, PersonCard, TopicCard } from '../components/Cards'

const steps = [
  { title: '明确问题', desc: '用一句可衡量的话写出要改变的状态。' },
  { title: '区分事实与假设', desc: '把“公认说法”分成可验证事实与待查前提。' },
  { title: '拆解复杂问题', desc: '拆到每一块都能独立观察或计算。' },
  { title: '找出基本事实', desc: '优先选择物理约束、可复现行为与明确证据。' },
  { title: '从基本事实重新推导', desc: '生成至少两个不同方案，避免锁定首个想法。' },
  { title: '验证推导结果', desc: '写出“什么结果会证明我错了”，再做低成本测试。' },
  { title: '根据反馈迭代', desc: '把新证据写回事实清单，重新执行推导。' },
]

const toolCards = [
  { path: '/tools/problem-breakdown', icon: 'tool-breakdown', title: '问题拆解器', desc: '八步引导，把模糊问题变成结构化分析报告。' },
  { path: '/tools/assumption-check', icon: 'tool-assumption', title: '假设审查清单', desc: '逐项检查事实、证据、反例与结论范围。' },
  { path: '/tools/decision', icon: 'tool-decision', title: '决策分析器', desc: '记录目标、约束、成本、风险与可逆性。' },
  { path: '/tools/case-practice', icon: 'tool-practice', title: '案例拆解练习', desc: '先独立分析，再对照参考拆解过程。' },
]

export function HomePage() {
  useSeo({ title: site.name, description: site.description, path: '/' })

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="hero-eyebrow">THINK FROM FIRST PRINCIPLES</div>
            <h1>回到本质，<br />重新理解世界。</h1>
            <p className="hero-sub">{site.manifesto}当我们不再满足于别人告诉我们的答案，而是开始追问事物为什么存在、如何运作，以及哪些事实不可再简化，真正的创新和深刻理解才开始发生。</p>
            <div className="hero-actions">
              <Link to="/foundations" className="btn btn-primary">探索第一性原理 <Icon name="arrow-right" size={16} /></Link>
              <Link to="/cases" className="btn btn-ghost-light">浏览经典案例</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><strong>{articles.length}</strong><span>深度文章</span></div>
              <div className="hero-stat"><strong>{cases.length}</strong><span>真实案例</span></div>
              <div className="hero-stat"><strong>{people.length}</strong><span>思想人物</span></div>
              <div className="hero-stat"><strong>{books.length}</strong><span>经典书籍</span></div>
            </div>
          </div>
          <div className="hero-art" dangerouslySetInnerHTML={{ __html: art.heroArt }} aria-hidden="true" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">01 · THE CONCEPT</div>
              <h2 className="section-title">第一性原理是什么？</h2>
              <p className="section-desc">它不是“多问几个为什么”，而是把结论追溯到不再依赖其他命题的基本原则，再从那里重新推导。这个概念有明确的哲学来源，也有清晰的现代用法与边界。</p>
            </div>
            <Link className="section-link" to="/foundations">进入基础专题 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <div className="section-kicker">定义</div>
              <h3 className="card-title">作为推导起点的基本原则</h3>
              <p className="card-desc" style={{ display: 'block' }}>在亚里士多德那里，第一原理（archē）是不由其他命题推出、却能支持其他命题的起点。现代用法把它收紧为：由经验事实与逻辑规则支持、而不是由惯例或权威支持的基本前提。关键不是“原始”，而是“作为推导基础”。</p>
            </div>
            <div className="card">
              <div className="section-kicker">边界</div>
              <h3 className="card-title">它不是从零开始，也不是怀疑一切</h3>
              <p className="card-desc" style={{ display: 'block' }}>现实推导必须承认已经确认的事实；方法论怀疑只是手段。正确的前提加上有效推理，也可能只是得到一个已被采用的方案。把第一性原理当成万能创新公式，最常见的后果是忽视约束与价值冲突。</p>
            </div>
          </div>
          <div style={{ marginTop: 24 }}><Figure name="factAssumption" caption="第一步：把“公认说法”拆成事实与假设两栏" /></div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">02 · THE METHOD</div>
              <h2 className="section-title">从哪里开始思考？</h2>
              <p className="section-desc">七步思考法不是一个线性流水线，而是可以回退的循环。关键动作发生在第 4 步和第 6 步：确认真正的基本事实，并写出什么结果会推翻你的推导。</p>
            </div>
            <Link className="section-link" to="/tools/problem-breakdown">打开拆解器 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <Figure name="thinkingFlow" caption="第一性原理七步思考流程：从明确问题到反馈迭代" className="figure-framed" />
          <div className="grid grid-4" style={{ marginTop: 24 }}>
            {steps.map((s, i) => (
              <div className="card" key={s.title}>
                <div className="section-kicker">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="card-title" style={{ fontSize: 17 }}>{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">03 · CASES</div>
              <h2 className="section-title">经典案例</h2>
              <p className="section-desc">科学、工程、商业与日常生活中的案例，统一按照背景、假设、基本事实、拆解、推导、结果、局限的结构呈现，并标明证据等级。</p>
            </div>
            <Link className="section-link" to="/cases">查看全部 {cases.length} 个案例 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-3">
            {cases.filter((c) => c.featured || ['euclidean-elements', 'darwin-natural-selection', 'redesign-learning-method', 'battery-energy-density', 'netflix-streaming-transition'].includes(c.slug)).slice(0, 6).map((c) => <CaseCard key={c.slug} item={c} />)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">04 · THINKERS</div>
              <h2 className="section-title">思想人物</h2>
              <p className="section-desc">严格区分三类人物：历史上明确讨论第一原理的思想家、采用相近方法的科学家，以及现代语境下被用来说明这种思维方式的人。</p>
            </div>
            <Link className="section-link" to="/people">浏览 {people.length} 位人物 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-4">
            {people.filter((p) => ['aristotle', 'descartes', 'feynman', 'einstein'].includes(p.slug)).map((p) => <PersonCard key={p.slug} person={p} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">05 · LIBRARY</div>
              <h2 className="section-title">经典书籍</h2>
              <p className="section-desc">哲学、科学方法、思维决策、商业创新与学习认知五个门类。只记录可核实的书名、作者与原著出版年份，译本年份不作为原著年份。</p>
            </div>
            <Link className="section-link" to="/books">浏览 {books.length} 本书 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-4">
            {books.filter((b) => ['metaphysics-aristotle', 'logic-scientific-discovery', 'thinking-in-systems', 'zero-to-one'].includes(b.slug)).map((b) => <BookCard key={b.slug} book={b} />)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">06 · ESSAYS</div>
              <h2 className="section-title">深度文章</h2>
              <p className="section-desc">先解释问题，再提出观点；给出定义、推理、案例、反例与适用边界。每篇都标注日期、预计阅读时间与参考资料。</p>
            </div>
            <Link className="section-link" to="/articles">阅读全部 {articles.length} 篇文章 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-3">
            {articles.filter((a) => a.featured).slice(0, 6).map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">07 · TOOLKIT</div>
              <h2 className="section-title">思维工具</h2>
              <p className="section-desc">四个可以真正使用的浏览器本地工具。所有输入都留在你的设备里，不登录、不上传；可以重置、打印、导出 TXT 或 JSON。</p>
            </div>
            <Link className="section-link" to="/tools">查看工具说明 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-4">
            {toolCards.map((t) => (
              <Link to={t.path} className="card card-link" key={t.path}>
                <div className="topic-icon"><Icon name={t.icon} size={22} /></div>
                <h3 className="card-title" style={{ fontSize: 17 }}>{t.title}</h3>
                <p className="card-desc">{t.desc}</p>
                <div className="card-foot"><span>本地运行</span><span className="read-more">使用 <Icon name="arrow-right" size={14} /></span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">08 · LEARNING PATH</div>
              <h2 className="section-title">学习路径</h2>
              <p className="section-desc">从定义到案例再到系统综合，每个阶段都配有推荐文章、书籍、案例与练习。</p>
            </div>
            <Link className="section-link" to="/learning-path">查看完整路径 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <Figure name="learningPath" caption="三阶段学习路径：建立定义 → 分析案例 → 系统综合" className="figure-framed" />
          <div className="grid grid-3" style={{ marginTop: 24 }}>
            {[
              { level: '初级', title: '建立准确的概念', desc: '定义、事实与假设、简单拆解、基础逻辑。' },
              { level: '中级', title: '研究真实案例', desc: '哲学基础、科学方法、数学逻辑与商业案例。' },
              { level: '高级', title: '综合与真实问题', desc: '复杂系统、概率思维、个人知识体系。' },
            ].map((s) => (
              <div className="card" key={s.level}>
                <div className="section-kicker">{s.level}</div>
                <h3 className="card-title">{s.title}</h3>
                <p className="card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">09 · KNOWLEDGE MAP</div>
              <h2 className="section-title">知识体系</h2>
              <p className="section-desc">十个相互关联的专题，从哲学基础到实践工具，构成可以持续扩充的知识地图。</p>
            </div>
            <Link className="section-link" to="/topics">全部专题 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-4">{topics.map((t) => <TopicCard key={t.slug} topic={t} />)}</div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-kicker">LATEST</div>
              <h2 className="section-title">最新更新</h2>
            </div>
            <Link className="section-link" to="/search">全站检索 <Icon name="arrow-right" size={15} /></Link>
          </div>
          <div className="grid grid-2">
            {latestUpdates.map((u, i) => (
              <Link to={u.path} className="result-item" key={i}>
                <span className="tag">{u.type}</span> <span className="path">{u.date}</span>
                <h3>{u.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
