import { useState } from 'react'
import { useSeo } from '../../utils/seo'
import { useLocalState } from '../../utils/storage'
import { downloadJson, downloadText, reportToText } from '../../utils/export'
import { ToolShell, Report } from '../../components/ToolShell'
import { Icon } from '../../components/Icon'

interface DecisionData {
  goal: string
  deadline: string
  constraints: string
  options: string
  cost: string
  risk: string
  reversibility: string
  longTerm: string
  trigger: string
}

const empty: DecisionData = { goal: '', deadline: '', constraints: '', options: '', cost: '', risk: '', reversibility: '', longTerm: '', trigger: '' }

const fields: { key: keyof DecisionData; label: string; hint: string }[] = [
  { key: 'goal', label: '目标', hint: '你要改变什么状态？用可衡量的语言描述。' },
  { key: 'deadline', label: '时间范围与决策期限', hint: '什么时候必须做决定？过早与过晚各有什么代价？' },
  { key: 'constraints', label: '关键约束', hint: '不可改变的条件与可以重新设计的条件分开写。' },
  { key: 'options', label: '可选方案', hint: '每行一个方案，至少两个，避免二选一陷阱。' },
  { key: 'cost', label: '成本', hint: '包括金钱、时间、注意力与机会成本。' },
  { key: 'risk', label: '风险与最坏情形', hint: '你能承受的最坏结果是什么？有没有止损方式？' },
  { key: 'reversibility', label: '可逆性', hint: '如果决定错了，能否退回？退回需要多大代价？' },
  { key: 'longTerm', label: '长期影响', hint: '一年后、三年后，这个决定会如何改变你的选择空间？' },
  { key: 'trigger', label: '改变判断的条件', hint: '出现什么新证据时，你会重新考虑这个决定？' },
]

export function DecisionPage() {
  useSeo({ title: '决策分析器', description: '用目标、约束、成本、风险、可逆性与长期影响整理决策记录，生成可打印、可导出的结构化文档。', path: '/tools/decision' })
  const [data, setData] = useLocalState<DecisionData>('tool-decision', empty)
  const [saved, setSaved] = useState(false)
  const rows = fields.map((f) => ({ label: f.label, value: data[f.key] }))
  const title = '结构化决策记录'
  const reversible = (data.reversibility ?? '').trim().length > 0
  const hasTrigger = (data.trigger ?? '').trim().length > 0

  return (
    <ToolShell
      kicker="TOOL 03"
      title="决策分析器"
      description="把重要决定写成可复核的记录：目标、约束、方案、成本、风险、可逆性与重新判断的条件。"
      path="/tools/decision"
      aside={
        <div className="box">
          <h4>可逆性规则</h4>
          可逆决策可以快速尝试；不可逆决策需要更慢地收集证据。把两者混在一起，是常见的决策错误。
        </div>
      }
    >
      {fields.map((f, i) => (
        <div className="step-block" key={f.key}>
          <div className="step-head"><span className="step-num">{String(i + 1).padStart(2, '0')}</span><h3 className="step-title">{f.label}</h3></div>
          <p className="step-hint">{f.hint}</p>
          <textarea value={data[f.key]} onChange={(e) => setData((d) => ({ ...d, [f.key]: e.target.value }))} />
        </div>
      ))}

      <div className="form-actions">
        <button className="btn btn-primary" onClick={() => setSaved(true)}><Icon name="check" size={15} /> 生成决策记录</button>
        <button className="btn btn-outline" onClick={() => { setData(empty); setSaved(false) }}>重置全部</button>
      </div>

      {saved && (
        <Report title={title} rows={rows}
          onTxt={() => downloadText('decision-record.txt', reportToText(title, rows))}
          onJson={() => downloadJson('decision-record.json', { title, data, generatedAt: new Date().toISOString() })}>
          <div className={`callout ${reversible ? 'tip' : 'warn'}`}>
            <div className="callout-title">可逆性检查</div>
            <p>{reversible ? '你已填写可逆性判断。请确认“退回代价”是否被低估，尤其是时间、关系与沉没成本。' : '你还没有写可逆性。强烈建议补上：如果错了，能不能退回？'}</p>
          </div>
          <div className={`callout ${hasTrigger ? 'note' : 'warn'}`}>
            <div className="callout-title">重新判断的条件</div>
            <p>{hasTrigger ? '已记录触发条件。把它放到日历提醒里，到期重新检查。' : '没有写下触发条件，意味着你可能在证据变化后仍坚持原判断。请补上一条具体条件。'}</p>
          </div>
        </Report>
      )}
    </ToolShell>
  )
}
