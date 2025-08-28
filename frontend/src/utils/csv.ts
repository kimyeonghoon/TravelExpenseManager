export type CsvRow = Record<string, string | number | boolean | null | undefined>

const needsQuote = (value: string) => /[",\n]/.test(value)

const escapeCsv = (value: unknown): string => {
  if (value === null || value === undefined) return ''
  let s = String(value)
  if (needsQuote(s)) {
    s = '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

export const buildCsv = (rows: CsvRow[], headers?: string[]): string => {
  if (!rows || rows.length === 0) return ''
  const columns = headers && headers.length > 0 ? headers : Object.keys(rows[0])
  const lines = [] as string[]
  lines.push(columns.map((h) => escapeCsv(h)).join(','))
  for (const row of rows) {
    lines.push(columns.map((c) => escapeCsv(row[c])).join(','))
  }
  return lines.join('\n')
}

export const downloadCsv = (filename: string, csv: string) => {
  // UTF-8 BOM 포함하여 Excel 한글 깨짐 방지
  const BOM = '\ufeff'
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
