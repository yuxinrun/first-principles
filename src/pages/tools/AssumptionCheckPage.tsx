import { useMemo, useState } from 'react'
import { useSeo } from '../../utils/seo'
import { useLocalState } from '../../utils/storage'
import { downloadJson, downloadText, reportToText } from '../../utils/export'
import { ToolShell, Report } from '../../components/ToolShell'

const checks = [
  { key: 'evidence', label: '事实依据是什么？', hint: '写出可核对的来源、数据或观察。' },
  { key: 'assumption', label: '假设是什么？', hint: '哪些内容被当作前提，但没有独立验证？' },
  { key: 'verified', label: '假设是否被验证？', hint: '如果是，写出验证方式；如果不是，写出计划。' },
  { key: 'counter', label: '有没有相反证据？', hint: '主动寻找一个不支持当前结论的例子。' },
  { key: 'bias', label: '是否存在认知偏差？', hint: '确认偏误、幸存者偏差、锚定、可得性等。' },
  { key: 'constraints', label: '是否忽略了关键约束？', hint: '资源、时间、制度、物理条件。' },
  { key: 'scope', label: '结论是否超出了证据范围？', hint: '样本能否推广？相关是否被当成因果？' },
]

type Data = { decision: string; conclusion: string } & Record<string, string>
const empty: Data = { decision: '', conclusion: '', ...Object.fromEntries(checks.map((c) => [c.key, ''])) }

export function AssumptionCheckPage() {
  useSeo({ title: '假设审查清单', description: '对一个决定或观点逐项检查事实、假设、反例、认知偏差与结论范围。浏览器本地运行。', path: '/tools/assumption-check' })
  const [data, setData] = useLocalState<Data>('tool-assumption', empty)
  const [showReport, setShowReport] = useState(false)

  const states = useMemo(() => checks.map((c) => {
    const value = (data[c.key] ?? '').trim()
    return { ...c, value, state: !value ? 'warn' : value.length > 24 ? 'ok' : 'warn' }
  }), [data])
  const filled = states.filter((s) => s.state === 'ok').length
  const rows = [
    { label: '待审查的决定或观点', value: data.decision },
    { label: '当前结论', value: data.conclusion },
    ...checks.map((c) => ({ label: c.label, value: data[c.key] ?? '' })),
  ]
  const title = '假设审查报告'

  return (
    <ToolShell
      kicker="TOOL 02"
      title="假设审查清单"
      description="把“我认为”拆成事实、假设与推理，逐项检查证据是否支持结论。"
      path="/tools/assumption-check"
      aside={
        <div className="box">
          <h4>审查进度</h4>
          已较充分填写 {filled} / {checks.length} 项。带橙色标记的条目说明内容过短或尚未填写，建议补充具体例子。
          <ul className="check-list" style={{ marginTop: 12 }}>
            {states.map((s) => <li key={s.key}><span className={`state ${s.state}`}>{s.state === 'ok' ? '已填' : '待补'}</span><span>{s.label}</span></li>)}
          </ul>
        </div>
      }
    >
      <div className="step-block">
        <div className="step-head"><span className="step-num">00</span><h3 className="step-title">写下要审查的内容</h3></div>
        <p className="step-hint">可以是一个决定，也可以是一个你准备接受的观点。</p>
        <div className="form-row"><label>待审查的决定或观点</label><textarea value={data.decision} onChange={(e) => setData((d) => ({ ...d, decision: e.target.value }))} placeholder="例如：我应该接受这份 offer" /></div>
        <div className="form-row"><label>当前结论</label><textarea value={data.conclusion} onChange={(e) => setData((d) => ({ ...d, conclusion: e.target.value }))} placeholder="例如：接受它是更好的选择" /></div>
      </div>

      {checks.map((c, i) => (
        <div className="step-block" key={c.key}>
          <div className="step-head"><span className="step-num">{String(i + 1).padStart(2, '0')}</span><h3 className="step-title">{c.label}</h3></div>
          <p className="step-hint">{c.hint}</p>
          <textarea value={data[c.key] ?? ''} onChange={(e) => setData((d) => ({ ...d, [c.key]: e.target.value }))} />
        </div>
      ))}

      <div className="form-actions">
        <button className="btn btn-primary" onClick={() => setShowReport(true)}>生成审查报告</button>
        <button className="btn btn-outline" onClick={() => { setData(empty); setShowReport(false) }}>重置全部</button>
      </div>

      {showReport && (
        <Report title={title} rows={rows}
          onTxt={() => downloadText('assumption-check.txt', reportToText(title, rows))}
          onJson={() => downloadJson('assumption-check.json', { title, data, generatedAt: new Date().toISOString() })}>
          <div className="callout warn"><div className="callout-title">可靠性提醒</div><p>本工具只能反映你填写的内容，不能替你发现不知道的证据。若第 4、5、7 项填写不足，结论仍可能只是确认偏误的产物。</p></div>
        </Report>
      )}
    </ToolShell>
  )
}
