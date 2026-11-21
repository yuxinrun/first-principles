import { useSearchParams } from 'react-router-dom'
import { books } from '../content'
import { PageHead } from '../components/PageHead'
import { BookCard } from '../components/Cards'
import { useSeo } from '../utils/seo'

const cats = ['全部', ...Array.from(new Set(books.map((b) => b.category)))]

export function BooksPage() {
  useSeo({ title: '经典书籍', description: '哲学、科学方法、思维决策、商业创新与学习认知领域的真实书籍，核实书名、作者与原著出版年份。', path: '/books' })
  const [params, setParams] = useSearchParams()
  const cat = params.get('category') ?? '全部'
  const list = cat === '全部' ? books : books.filter((b) => b.category === cat)

  return (
    <>
      <PageHead kicker="BOOKSHELF" title="经典书籍库" description={`收录 ${books.length} 本真实书籍。只填写可以核实的原著出版年份；译本年份、出版社与 ISBN 不做推测。本站不提供受版权保护的全文。`} crumbs={[{ label: '书籍' }]} />
      <section className="section">
        <div className="container">
          <div className="filter-bar" role="group" aria-label="按分类筛选">
            {cats.map((c) => <button key={c} className={`filter-chip ${cat === c ? 'active' : ''}`} onClick={() => setParams(c === '全部' ? {} : { category: c })}>{c}</button>)}
          </div>
          <div className="grid grid-4">{list.map((b) => <BookCard key={b.slug} book={b} />)}</div>
        </div>
      </section>
    </>
  )
}
