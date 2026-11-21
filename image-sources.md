# 图片与 SVG 资源来源记录

## 总原则

本站**不依赖任何远程图片 URL**。所有视觉资源都是随项目发布的本地文件，或者由浏览器本地渲染的原创 SVG。这样可以避免第三方图床失效、版权不明和离线不可用等问题。

由于未能对任何外部图库中的具体图片逐一确认授权与署名要求，本站没有下载或使用 Unsplash、Pexels、Wikimedia、NASA、大都会博物馆等来源的照片。所有插画均改用原创 SVG 实现。

## 原创 SVG 清单

以下文件位于 `src/assets/svg/`，均为本项目原创，用于表达知识结构而非装饰。采用 `currentColor` 描边，因此能自动适配浅色与深色主题。

| 文件 | 用途 | 作者 | 许可 |
| --- | --- | --- | --- |
| `logo.svg` | 网站标志 | 本项目 | CC0 / 可自由使用 |
| `hero-art.svg` | 首页 Hero 几何结构插画 | 本项目 | CC0 / 可自由使用 |
| `thinking-flow.svg` | 第一性原理七步思考流程图 | 本项目 | CC0 / 可自由使用 |
| `problem-breakdown.svg` | 问题拆解结构图 | 本项目 | CC0 / 可自由使用 |
| `fact-assumption.svg` | 事实与假设关系图 | 本项目 | CC0 / 可自由使用 |
| `axiom-derivation.svg` | 公理到结论的推导图 | 本项目 | CC0 / 可自由使用 |
| `logic-tree.svg` | 逻辑树 | 本项目 | CC0 / 可自由使用 |
| `causal-map.svg` | 因果关系与反馈回路图 | 本项目 | CC0 / 可自由使用 |
| `scientific-method.svg` | 科学方法循环图 | 本项目 | CC0 / 可自由使用 |
| `systems-thinking.svg` | 系统思考结构图 | 本项目 | CC0 / 可自由使用 |
| `cost-breakdown.svg` | 商业成本拆解图 | 本项目 | CC0 / 可自由使用 |
| `rocket.svg` | 火箭质量与推力约束示意图 | 本项目 | CC0 / 可自由使用 |
| `battery.svg` | 电池结构示意图 | 本项目 | CC0 / 可自由使用 |
| `geometry.svg` | 数学与几何插画 | 本项目 | CC0 / 可自由使用 |
| `learning-path.svg` | 三阶段学习路径图 | 本项目 | CC0 / 可自由使用 |
| `icons.svg` | 10 个专题图标、4 个工具图标及通用界面图标（symbol 集合） | 本项目 | CC0 / 可自由使用 |

## public 目录中的本地资源

| 文件 | 用途 | 说明 |
| --- | --- | --- |
| `public/favicon.svg` | 网站图标 | 原创，与 Logo 同构 |
| `public/og-cover.svg` | Open Graph 分享封面 | 原创，1200×630 |
| `public/robots.txt` | 爬虫规则 | 文本 |
| `public/sitemap.xml` | 站点地图 | 文本 |

## 截图

`docs/screenshots/` 下的 PNG 是**实际运行本网站后由浏览器截取的真实运行截图**，不是 AI 生成的效果图，也不是从其他网站下载的图片。截图工具为 Playwright CLI，视口分别为 1440×900（PC）与 390×844（手机）。

## 字体

使用系统字体栈（`"Noto Serif SC"`、`"PingFang SC"`、`"Microsoft YaHei"` 等），不加载远程字体，不产生第三方字体请求。

## 如后续引入外部图片

必须逐张记录：图片名称、作者、来源链接、许可协议与署名要求，并确认允许在 GitHub Pages 站点中使用；同时下载到本地 `public/images/` 并在代码中以本地路径引用。无法确认许可的图片一律改用原创 SVG。
