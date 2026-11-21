import { Link } from 'react-router-dom'
import { useSeo } from '../utils/seo'

export function NotFoundPage() {
  useSeo({ title: '页面未找到', description: '你访问的内容不存在或已被移动。', path: '/404' })
  return (
    <div className="container empty-state" style={{ minHeight: '50vh' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 72, color: 'var(--accent)' }}>404</div>
      <h2>页面未找到</h2>
      <p>这个地址没有对应的内容。你可以返回首页，或者使用全站搜索。</p>
      <div className="hero-actions" style={{ justifyContent: 'center', marginTop: 20 }}>
        <Link to="/" className="btn btn-primary">返回首页</Link>
        <Link to="/search" className="btn btn-outline">全站搜索</Link>
      </div>
    </div>
  )
}
