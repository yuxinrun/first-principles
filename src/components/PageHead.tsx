import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface PageHeadProps {
  kicker?: string
  title: string
  description: string
  children?: ReactNode
  crumbs?: { label: string; to?: string }[]
}

export function PageHead({ kicker, title, description, children, crumbs }: PageHeadProps) {
  return (
    <div className="page-head">
      <div className="container">
        {crumbs && (
          <div className="crumbs" style={{ marginBottom: 14 }}>
            <Link to="/">首页</Link>
            {crumbs.map((c, i) => (
              <span key={i} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                <span>/</span>{c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
              </span>
            ))}
          </div>
        )}
        {kicker && <div className="section-kicker">{kicker}</div>}
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </div>
  )
}
