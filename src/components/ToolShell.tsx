import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageHead } from './PageHead'
import { Icon } from './Icon'

interface ToolShellProps {
  kicker: string
  title: string
  description: string
  path: string
  children: ReactNode
  aside?: ReactNode
}

export function ToolShell({ kicker, title, description, path, children, aside }: ToolShellProps) {
  return (
    <>
      <PageHead kicker={kicker} title={title} description={description} crumbs={[{ label: '思维工具', to: '/tools' }, { label: title }]} />
      <div className="container tool-layout">
        <div className="tool-panel">{children}</div>
        <aside className="tool-aside">
          <div className="box">
            <h4>本地运行说明</h4>
            你的所有输入只保存在当前浏览器的 localStorage 中，不会上传到任何服务器。清除浏览器数据会删除这些记录。工具提供的是思考辅助，不是自动给出绝对正确的答案。
          </div>
          <div className="box">
            <h4>通用操作</h4>
            可以随时修改、重置、打印当前报告，也可以导出为 TXT 或 JSON 留作复盘。导出的文件只包含你在本页填写的内容。
          </div>
          {aside}
          <div className="box">
            <h4>相关阅读</h4>
            <Link to="/articles/seven-step-method">第一性原理的七步思考法 →</Link><br />
            <Link to="/articles/identify-hidden-assumptions">识别隐含假设 →</Link><br />
            <Link to="/tools">返回工具总览 →</Link>
          </div>
          <div className="box" style={{ fontSize: 12 }}>
            <span className="path">{path}</span>
          </div>
        </aside>
      </div>
    </>
  )
}

interface ReportProps {
  title: string
  rows: { label: string; value: string }[]
  onTxt: () => void
  onJson: () => void
  children?: ReactNode
}

export function Report({ title, rows, onTxt, onJson, children }: ReportProps) {
  return (
    <div className="report">
      <div className="report-head">{title}</div>
      <div className="report-body">
        <dl style={{ margin: 0 }}>
          {rows.map((r, i) => <div className="report-row" key={i}><dt>{r.label}</dt><dd>{r.value || '（未填写）'}</dd></div>)}
        </dl>
        {children}
      </div>
      <div className="form-actions" style={{ margin: 0, padding: 14, borderTop: '1px solid var(--border)' }}>
        <button className="btn btn-outline btn-sm" onClick={() => window.print()}><Icon name="print" size={14} /> 打印</button>
        <button className="btn btn-outline btn-sm" onClick={onTxt}><Icon name="download" size={14} /> 导出 TXT</button>
        <button className="btn btn-outline btn-sm" onClick={onJson}><Icon name="download" size={14} /> 导出 JSON</button>
      </div>
    </div>
  )
}
