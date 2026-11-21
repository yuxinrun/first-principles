import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { mainNav, site } from '../data/site'
import { Icon } from './Icon'
import { useReadingSettings, applyTheme } from '../utils/storage'
import { art } from '../assets/svg'

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { settings, setSettings } = useReadingSettings()

  useEffect(() => { setMenuOpen(false) }, [location.pathname])
  useEffect(() => { applyTheme(settings.theme) }, [settings.theme])
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => { if (settings.theme === 'system') applyTheme('system') }
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [settings.theme])

  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme
    setSettings((s) => ({ ...s, theme: current === 'dark' ? 'light' : 'dark' }))
  }

  useEffect(() => {
    document.documentElement.style.setProperty('--article-font', `${settings.fontSize}px`)
    document.documentElement.style.setProperty('--reading-width', `${settings.lineWidth}px`)
  }, [settings.fontSize, settings.lineWidth])

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="第一性原理首页">
            <span className="brand-mark" dangerouslySetInnerHTML={{ __html: art.logo }} />
            <span className="brand-text">
              <span className="brand-cn">{site.name}</span>
              <span className="brand-en">{site.nameEn}</span>
            </span>
          </Link>
          <nav className="main-nav" aria-label="主导航">
            {mainNav.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <Link to="/search" className="icon-btn" aria-label="全站搜索" title="全站搜索"><Icon name="search" /></Link>
            <button className="icon-btn" onClick={toggleTheme} aria-label="切换深浅色模式" title="切换深浅色模式">
              <Icon name={document.documentElement.dataset.theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <button className="icon-btn menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="打开菜单" aria-expanded={menuOpen}>
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-panel open container" aria-label="移动端导航">
            {mainNav.map((item) => (
              <NavLink key={item.path} to={item.path} end={item.path === '/'} className={({ isActive }) => isActive ? 'active' : ''}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </header>
      <main id="main">{children}</main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>{site.name} · {site.nameEn}</h3>
              <p>{site.manifesto}</p>
              <p>{site.tagline}</p>
            </div>
            <div>
              <h3>探索</h3>
              <ul>
                <li><Link to="/topics">知识体系</Link></li>
                <li><Link to="/cases">真实案例</Link></li>
                <li><Link to="/people">思想人物</Link></li>
                <li><Link to="/books">经典书籍</Link></li>
              </ul>
            </div>
            <div>
              <h3>实践</h3>
              <ul>
                <li><Link to="/tools">思维工具</Link></li>
                <li><Link to="/learning-path">学习路径</Link></li>
                <li><Link to="/search">全站搜索</Link></li>
                <li><Link to="/privacy">隐私说明</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>本站内容仅供学习与研究使用；所有工具在浏览器本地运行，不上传数据。</span>
            <span>© {new Date().getFullYear()} {site.name} · <a href={site.repo} target="_blank" rel="noreferrer">GitHub</a></span>
          </div>
        </div>
      </footer>
    </>
  )
}
