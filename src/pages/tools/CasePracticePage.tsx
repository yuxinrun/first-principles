import { useState } from 'react'
import { Link } from 'react-router-dom'
import { cases } from '../../content'
import { useSeo } from '../../utils/seo'
import { useLocalState } from '../../utils/storage'
import { downloadJson, downloadText } from '../../utils/export'
import { ToolShell } from '../../components/ToolShell'
import { Icon } from '../../components/Icon'

const practiceCases = ['spacex-reusable-rocket', 'euclidean-elements', 'ikea-flat-pack', 'redesign-learning-method', 'netflix-streaming-transition', 'battery-energy-density']

const prompts = [
  { key: 'problem', label: '需要解决的问题', hint: '用一句话写出案例试图解决的核心问题。' },
  { key: 'assumptions', label: '传统假设', hint: '当时或行业内默认的前提是什么？' },
  { key: 'facts', label: '基本事实', hint: '哪些是可确认的物理、经济或行为事实？' },
  { key: 'derivation', label: '重新推导', hint: '如果换掉某个假设，会得到什么不同方案？' },
  { key: 'limits', label: '局限与风险', hint: '这个方案在什么条件下会失败？' },
]

type Answers = Record<string, string>

export function CasePracticePage() {
  useSeo({ title: '案例拆解练习', description: '先独立分析一个真实案例，再显示参考拆解过程。在浏览器本地运行，不上传输入。', path: '/tools/case-practice' })
  const [slug, setSlug] = useState(practiceCases[0])
  const [answersByCase, setAnswersByCase] = useLocalState<Record<string, Answers>>('tool-case-practice', {})
  const [revealed, setRevealed] = useState(false)
  const item = cases.find((c) => c.slug === slug)!
  const answers = answersByCase[slug] ?? Object.fromEntries(prompts.map((p) => [p.key, '']))
  const setAnswer = (key: string, value: string) => setAnswersByCase((all) => ({ ...all, [slug]: { ...answers, [key]: value } }))

  const rows = prompts.map((p) => ({ label: p.label, value: answers[p.key] ?? '' }))
  const reference = [
    { label: '传统思路或常见假设', value: item.traditionalAssumptions },
    { label: '可确认的基本事实', value: item.basicFacts },
    { label: '拆解过程', value: item.decomposition },
    { label: '重新推导', value: item.reDerivation },
    { label: '实际方案', value: item.actualSolution },
    { label: '结果与证据', value: item.resultsEvidence },
    { label: '案例局限', value: item.limitations },
    { label: '可迁移方法', value: item.transferableMethods },
  ]

  const reset = () => { setAnswersByCase((all) => ({ ...all, [slug]: {} })); setRevealed(false) }

  return (
    <ToolShell
      kicker="TOOL 04"
      title="案例拆解练习"
      description="选择一个案例，先独立写下分析，再显示网站中的参考拆解，比较差异。"
      path="/tools/case-practice"
      aside={<div className="box"><h4>练习方法</h4>不要先读参考拆解。先写下你的判断，即使很粗糙；差异本身才是最有价值的学习材料。<br /><br /><Link to={`/cases/${slug}`}>阅读完整案例 →</Link></div>}
    >
      <div className="form-row">
        <label htmlFor="case-select">选择练习案例</label>
        <select id="case-select" value={slug} onChange={(e) => { setSlug(e.target.value); setRevealed(false) }}>
          {practiceCases.map((s) => { const c = cases.find((x) => x.slug === s)!; return <option value={s} key={s}>{c.field} · {c.title}</option> })}
        </select>
      </div>

      <div className="callout note" style={{ marginTop: 18 }}><div className="callout-title">案例背景</div><p>{item.background}</p></div>

      {prompts.map((p, i) => (
        <div className="step-block" key={p.key} style={{ marginTop: 24 }}>
          <div className="step-head"><span className="step-num">{String(i + 1).padStart(2, '0')}</span><h3 className="step-title">{p.label}</h3></div>
          <p className="step-hint">{p.hint}</p>
          <textarea value={answers[p.key] ?? ''} onChange={(e) => setAnswer(p.key, e.target.value)} />
        </div>
      ))}

      <div className="form-actions">
        <button className="btn btn-primary" onClick={() => setRevealed(true)}>显示参考拆解</button>
        <button className="btn btn-outline" onClick={reset}>重置本题</button>
        <button className="btn btn-outline" onClick={() => downloadText('case-practice.txt', [`案例：${item.title}`, '我的分析', ...rows.flatMap((r) => [`【${r.label}】`, r.value || '（未填写）', ''])].join('\n'))}><Icon name="download" size={14} /> 导出我的分析</button>
        <button className="btn btn-outline" onClick={() => downloadJson('case-practice.json', { case: slug, answers })}><Icon name="download" size={14} /> 导出 JSON</button>
      </div>

      {revealed && (
        <div className="report">
          <div className="report-head">参考拆解：{item.title}</div>
          <div className="report-body">
            <dl style={{ margin: 0 }}>
              {reference.map((r, i) => <div className="report-row" key={i}><dt>{r.label}</dt><dd>{r.value}</dd></div>)}
            </dl>
            <div className="callout warn"><div className="callout-title">对照提示</div><p>参考拆解不代表唯一正确分析。请检查：你是否漏掉了某个约束？是否把当事人解释当成了公开事实？是否高估了第一性原理对结果的解释力？</p></div>
          </div>
        </div>
      )}
    </ToolShell>
  )
}
