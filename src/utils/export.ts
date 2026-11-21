export function downloadText(filename: string, text: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([text], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadJson(filename: string, data: unknown) {
  downloadText(filename, JSON.stringify(data, null, 2), 'application/json;charset=utf-8')
}

export function reportToText(title: string, rows: { label: string; value: string }[]): string {
  return [`${title}`, '第一性原理 · 本地思考工具', '='.repeat(40), '', ...rows.flatMap((r) => [`【${r.label}】`, r.value || '（未填写）', '']), '说明：本报告由本地工具根据用户输入整理，仅供思考辅助，不构成绝对正确的答案。', `生成时间：${new Date().toLocaleString('zh-CN')}`].join('\n')
}
