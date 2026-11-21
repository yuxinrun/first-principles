import type { Block } from '../types/content'
import { headingId } from '../utils/content'

export function RichContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return <h2 key={i} id={headingId(block.text, i)}>{block.text}</h2>
          case 'h3':
            return <h3 key={i} id={headingId(block.text, i)}>{block.text}</h3>
          case 'p':
            return <p key={i}>{block.text}</p>
          case 'list':
            return block.ordered
              ? <ol key={i}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ol>
              : <ul key={i}>{block.items.map((item, j) => <li key={j}>{item}</li>)}</ul>
          case 'callout':
            return (
              <aside key={i} className={`callout ${block.tone ?? 'note'}`}>
                {block.title && <div className="callout-title">{block.title}</div>}
                <p>{block.text}</p>
              </aside>
            )
          case 'quote':
            return <blockquote key={i}>{block.text}{block.source && <cite>— {block.source}</cite>}</blockquote>
          case 'table':
            return (
              <table key={i}>
                <thead><tr>{block.headers.map((h, j) => <th key={j}>{h}</th>)}</tr></thead>
                <tbody>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}>{cell}</td>)}</tr>)}</tbody>
              </table>
            )
        }
      })}
    </div>
  )
}
