import type { Topic } from '../types/content'

export const site = {
  name: '第一性原理',
  nameEn: 'First Principles',
  tagline: 'Think Deeper, Understand Better',
  manifesto: '回到事物本身，从本质出发，重新理解世界。',
  url: 'https://yuxinrun.github.io/first-principles/',
  repo: 'https://github.com/yuxinrun/first-principles',
  description: '系统研究第一性原理思维方式的中文知识库：哲学、科学、数学、工程、商业与经典案例。',
}

export const mainNav = [
  { label: '首页', path: '/' },
  { label: '知识体系', path: '/topics' },
  { label: '案例', path: '/cases' },
  { label: '人物', path: '/people' },
  { label: '书籍', path: '/books' },
  { label: '文章', path: '/articles' },
  { label: '思维工具', path: '/tools' },
  { label: '学习路径', path: '/learning-path' },
]

export const topics: Topic[] = [
  {
    slug: 'foundations',
    name: '第一性原理基础',
    nameEn: 'Foundations',
    icon: 'foundation',
    summary: '从定义、历史来源到与常识、科学方法、批判性思维的关系，建立对第一性原理的准确理解。',
    children: ['第一性原理的定义', '思想起源', '与常识的区别', '与经验主义', '与科学方法', '与批判性思维', '与逻辑推理', '与系统思考', '与逆向思维', '与奥卡姆剃刀'],
  },
  {
    slug: 'philosophy',
    name: '哲学与本体论',
    nameEn: 'Philosophy & Ontology',
    icon: 'philosophy',
    summary: '从古希腊到现代分析哲学，追踪“第一原理”作为知识基础的概念如何演变。',
    children: ['古希腊第一原理', '亚里士多德', '柏拉图理念论', '笛卡尔方法论怀疑', '斯宾诺莎几何学方法', '康德先验哲学', '休谟经验主义', '莱布尼茨充足理由律', '现代分析哲学', '形而上学与知识基础'],
  },
  {
    slug: 'logic',
    name: '数学与逻辑',
    nameEn: 'Mathematics & Logic',
    icon: 'logic',
    summary: '公理、证明、演绎与归纳：理解如何从不可再简化的前提出发建立可靠结论。',
    children: ['公理、公设与定理', '从公理推导结论', '数学证明', '演绎与归纳', '逻辑谬误', '必要与充分条件', '概率与不确定性', '贝叶斯思维', '数学建模', '抽象与形式化'],
  },
  {
    slug: 'science',
    name: '科学方法与自然规律',
    nameEn: 'Scientific Method',
    icon: 'science',
    summary: '观察、假设、验证、可证伪：科学如何把经验事实组织成可检验的理论。',
    children: ['科学方法基本结构', '物理学基本定律', '从观察到理论', '可证伪性', '假设与验证', '因果关系', '相关性与因果性', '模型与现实', '复杂系统', '科学理论的边界'],
  },
  {
    slug: 'engineering',
    name: '工程与技术创新',
    nameEn: 'Engineering',
    icon: 'engineering',
    summary: '约束、材料、能量与成本：工程创新往往来自对基本物理与经济约束的重新计算。',
    children: ['工程设计基本约束', '从需求重新定义产品', '物理约束与成本结构', '材料科学', '能源系统', '电池技术', '航空航天', '芯片与计算机', '软件工程', '人工智能', '工程创新案例'],
  },
  {
    slug: 'business',
    name: '商业与企业创新',
    nameEn: 'Business',
    icon: 'business',
    summary: '把商业模式拆解为用户需求、成本结构与激励机制，分析创新发生的真实条件。',
    children: ['商业模式拆解', '成本结构分析', '用户需求本质', '产品创新', '供应链重构', '企业战略', '竞争优势', '定价与价值创造', '创业中的第一性原理', '商业决策案例'],
  },
  {
    slug: 'life',
    name: '个人成长与生活决策',
    nameEn: 'Life & Decisions',
    icon: 'life',
    summary: '把思维工具用于职业、学习、财务与时间：识别自己的假设，做更清醒的选择。',
    children: ['识别自己的假设', '重要决策', '摆脱思维惯性', '职业选择', '学习新知识', '时间管理', '个人财务', '复杂问题', '独立判断', '避免过度自信'],
  },
  {
    slug: 'education',
    name: '教育与学习方法',
    nameEn: 'Education',
    icon: 'education',
    summary: '从理解原理开始学习，建立可迁移的知识结构，而不是堆积零散事实。',
    children: ['从原理开始学习', '知识迁移', '概念拆解', '费曼学习法', '刻意练习', '跨学科思维', '认知负荷', '知识体系构建', '自主学习', '终身学习'],
  },
  {
    slug: 'society',
    name: '历史与社会',
    nameEn: 'History & Society',
    icon: 'society',
    summary: '用基本条件、约束与激励机制解释历史和社会现象，同时承认解释的边界。',
    children: ['历史事件的基本条件', '制度与激励', '经济活动的底层约束', '技术改变社会的机制', '制度与行为', '社会复杂性', '历史解释的局限', '文化与观念'],
  },
  {
    slug: 'practice',
    name: '思维工具与实践',
    nameEn: 'Tools & Practice',
    icon: 'practice',
    summary: '五层追问、假设清单、逻辑树、决策矩阵等可以直接使用的思考工具。',
    children: ['五层追问法', '假设清单', '事实与观点分离', '约束条件分析', '反向推导', '逻辑树', '因果图', '成本结构拆解', '决策矩阵', '反事实思考', '认知偏差检查', '结果复盘'],
  },
]

export const topicBySlug = (slug: string) => topics.find((t) => t.slug === slug)

export const fieldColors: Record<string, string> = {
  科学: '#344F65',
  数学: '#5B6B8C',
  工程: '#7A6A58',
  商业: '#A68B65',
  日常: '#6B7F6E',
  哲学: '#6E5A7A',
  历史: '#8A6A5A',
}
