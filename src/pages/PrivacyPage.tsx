import { PageHead } from '../components/PageHead'
import { useSeo } from '../utils/seo'

export function PrivacyPage() {
  useSeo({ title: '隐私说明', description: '本站不使用后端与账号系统；收藏、阅读记录与工具输入仅保存在浏览器本地。', path: '/privacy' })
  return (
    <>
      <PageHead kicker="PRIVACY" title="隐私说明" description="本站没有服务器、没有数据库、没有用户账号。所有个性化数据都留在你的设备中。" crumbs={[{ label: '隐私说明' }]} />
      <section className="section">
        <div className="container container-narrow">
          <div className="card">
            <h2 className="card-title">本地存储的数据</h2>
            <p className="card-desc" style={{ display: 'block' }}>为了让读者能继续使用个人设置，本站使用浏览器的 localStorage 保存以下内容：主题偏好（fp:reading-settings）、字号与行宽、收藏列表（fp:favorites）、阅读进度（fp:reading-records），以及四个思维工具的输入内容（fp:tool-*）。</p>
          </div>
          <div className="card" style={{ marginTop: 18 }}>
            <h2 className="card-title">不收集的内容</h2>
            <p className="card-desc" style={{ display: 'block' }}>本站不收集姓名、邮箱、IP 归属信息或浏览画像；没有第三方统计脚本、广告追踪与远程字体请求。搜索在页面内对本地内容索引执行，不会把关键词发送到服务器。</p>
          </div>
          <div className="card" style={{ marginTop: 18 }}>
            <h2 className="card-title">如何删除</h2>
            <p className="card-desc" style={{ display: 'block' }}>在浏览器中清除本站数据即可删除全部本地记录。你也可以在每个思维工具页面点击“重置全部”，或在文章详情页取消收藏。清除后无法恢复，建议先使用导出功能保存需要的记录。</p>
          </div>
          <div className="callout warn" style={{ marginTop: 24 }}>
            <div className="callout-title">共享设备提示</div>
            <p>在公共或共享电脑上使用时，请记得清除浏览器数据。站点的静态资源由 GitHub Pages 提供，GitHub 可能按其平台政策记录基础访问日志，这与本站的本地存储无关。</p>
          </div>
        </div>
      </section>
    </>
  )
}
