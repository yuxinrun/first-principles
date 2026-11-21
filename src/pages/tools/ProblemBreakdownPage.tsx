import { useState } from 'react'
import { useSeo } from '../../utils/seo'
import { useLocalState } from '../../utils/storage'
import { downloadJson, downloadText, reportToText } from '../../utils/export'
import { ToolShell, Report } from '../../components/ToolShell'

const questions = [
  { key: 'problem', title: '真正需要解决的问题是什么？', hint: '用一句可衡量的话写出要改变的状态，而不是写下愿望。' },
  { key: 'assumptions', title: '目前有哪些未经验证的假设？', hint: '写下那些“大家都这么认为”但你没有独立核对过的前提。' },
  { key: 'facts', title: '哪些信息是已知事实？', hint: '事实应带来源、条件与时间；无法核实的请放到“猜测”一栏。' },
  { key: 'guesses', title: '哪些是个人猜测？', hint: '猜测不是错误，只需标明它还没有证据。' },
  { key: 'fixed', title: '哪些约束条件不可改变？', hint: '物理定律、法规、已经作出的承诺通常属于这一类。' },
  { key: 'designable', title: '哪些条件可以重新设计？', hint: '流程、工具、合作方式、产品形态通常属于这一类。' },
  { key: 'options', title: '从基本事实能推导出哪些可能方案？', hint: '至少写两个不同的方案，避免把第一个想法当成唯一解。' },
  { key: 'test', title: '如何用最低成本验证方案？', hint: '指出最承重的假设，并设计一个可在短期内完成的测试。' },
]

type Answers = Record<string, string>
const empty: Answers = Object.fromEntries(questions.map((q) => [q.key, '']))

export function ProblemBreakdownPage() {
  useSeo({ title: '问题拆解器', description: '八步引导式问题拆解工具，把模糊问题变成结构化分析报告。全部在浏览器本地运行。', path: '/tools/problem-breakdown' })
  const [answers, setAnswers] = useLocalState<Answers>('tool-breakdown', empty)
  const [showReport, setShowReport] = useState(false)

  const rows = questions.map((q) => ({ label: q.title, value: answers[q.key] ?? '' }))
  const title = '第一性原理问题拆解报告'
  const analysis = (() => {
    const filled = questions.filter((q) => (answers[q.key] ?? '').trim()).length
    if (filled < 4) return '当前信息较少。建议至少完成四个步骤后再看结论，尤其是“事实”与“假设”的区分。'
    const hasFacts = (answers.facts ?? '').trim().length > 0
    const hasTest = (answers.test ?? '').trim().length > 0
    if (!hasFacts) return '你还没有列出明确事实。请回到第 3 步，优先填写可以被观察、测量或查证的信息。'
    if (!hasTest) return '你已列出基本事实，但还没有验证方式。请为最关键的假设设计一个低成本测试。'
    return '报告结构基本完整。请重点检查第 2 步与第 4 步：你标记为“假设”和“猜测”的内容，是否真的无法被验证？'
  })()

  return (
    <ToolShell
      kicker="TOOL 01"
      title="第一性原理问题拆解器"
      description="从一个模糊的问题出发，逐步填写事实、假设、约束与验证方式，最后生成结构化报告。"
      path="/tools/problem-breakdown"
      aside={<div className="box"><h4>使用建议</h4>填入一个具体场景，例如“我想创业，但不知道应该做什么”。每一步不必写得很长，但要尽量具体。</div>}
    >
      {questions.map((q, i) => (
        <div className="step-block" key={q.key}>
          <div className="step-head"><span className="step-num">{String(i + 1).padStart(2, '0')}</span><h3 className="step-title">{q.title}</h3></div>
          <p className="step-hint">{q.hint}</p>
          <textarea value={answers[q.key] ?? ''} onChange={(e) => setAnswers((a) => ({ ...a, [q.key]: e.target.value }))} placeholder={`请输入第 ${i + 1} 步的思考……`} />
        </div>
      ))}
      <div className="form-actions">
        <button className="btn btn-primary" onClick={() => setShowReport(true)}>生成结构化报告</button>
        <button className="btn btn-outline" onClick={() => { setAnswers(empty); setShowReport(false) }}>重置全部</button>
      </div>
      {showReport && (
        <Report
          title={title}
          rows={rows}
          onTxt={() => downloadText('first-principles-breakdown.txt', reportToText(title, rows) + `\n\n【自动检查】\n${analysis}`)}
          onJson={() => downloadJson('first-principles-breakdown.json', { title, answers, generatedAt: new Date().toISOString() })}
        >
          <div className="callout note"><div className="callout-title">自动检查（启发式提示）</div><p>{analysis}</p></div>
        </Report>
      )}
    </ToolShell>
  )
}
