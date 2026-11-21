export interface PathStage {
  slug: string
  level: string
  title: string
  goal: string
  description: string
  articles: string[]
  books: string[]
  cases: string[]
  exercise: string
}

export const pathStages: PathStage[] = [
  {
    slug: 'beginner',
    level: '初级',
    title: '建立准确的概念',
    goal: '理解定义，区分事实与假设，能完成简单问题拆解。',
    description: '这一阶段的目标不是“知道很多理论”，而是能准确说出第一性原理是什么、不是什么，并能把日常说法拆成事实、假设、观点与结论。',
    articles: ['what-is-first-principles', 'first-principles-vs-common-sense', 'fact-opinion-assumption-conclusion', 'first-principles-and-critical-thinking', 'seven-step-method'],
    books: ['asking-the-right-questions', 'history-western-philosophy'],
    cases: ['ikea-flat-pack', 'redesign-learning-method'],
    exercise: '选一个你常听到的行业说法，写出它成立的三个条件，并检查这些条件今天是否仍成立。',
  },
  {
    slug: 'intermediate',
    level: '中级',
    title: '研究真实案例',
    goal: '掌握哲学与科学基础，能独立完成案例拆解。',
    description: '阅读公理体系、科学方法与经典案例，观察“前提如何被替换”“证据如何被检验”。这一阶段要特别注意区分公开事实、当事人解释与分析推断。',
    articles: ['axiomatic-systems', 'first-principles-and-science', 'falsifiability', 'model-is-not-reality', 'rocket-cost-reconstruction'],
    books: ['logic-scientific-discovery', 'feynman-lectures', 'thinking-in-systems', 'innovators-dilemma'],
    cases: ['euclidean-elements', 'newton-laws', 'spacex-reusable-rocket', 'toyota-production-system-case', 'netflix-streaming-transition'],
    exercise: '阅读一个案例后，先不看参考拆解，自己按 14 项模板写一遍，再对照差异。',
  },
  {
    slug: 'advanced',
    level: '高级',
    title: '综合与真实问题',
    goal: '处理复杂系统、跨学科问题，建立个人知识体系。',
    description: '把第一性原理与系统思考、概率思维结合，承认前提的不完备与价值冲突。目标是形成可复用、可修订的个人框架，而不是追求一次推导的“正确答案”。',
    articles: ['limits-of-first-principles', 'complex-systems-not-simple-decomposition', 'probabilistic-thinking', 'bayesian-updating', 'build-your-own-framework'],
    books: ['structure-scientific-revolutions', 'godel-escher-bach', 'loss-of-certainty', 'principles-dalio'],
    cases: ['einstein-spacetime', 'ai-from-first-principles', 'amazon-long-termism'],
    exercise: '选择一个真实工作问题，使用问题拆解器生成报告，并在一个月后复盘哪些假设被证明是错的。',
  },
]
