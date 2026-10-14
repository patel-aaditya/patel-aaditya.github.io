// A small reader for the blog's Zola-style posts: TOML front matter between
// +++ lines, then Markdown. It only handles what the posts use: paragraphs,
// poems (lines ending in a backslash), a subheading set off by ---, a rule,
// **bold** and *italic*.

const SENTENCE_END = /[.!?…:;”"’)\]*]$/

export function inline(text) {
  return text
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return { t: 'b', text: part.slice(2, -2) }
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return { t: 'i', text: part.slice(1, -1) }
      return { t: 's', text: part }
    })
}

function parseFront(front) {
  const meta = {}
  front.split('\n').forEach((line) => {
    const m = line.match(/^(\w+)\s*=\s*(.+)$/)
    if (!m) return
    const v = m[2].trim()
    if (v.startsWith('[')) meta[m[1]] = [...v.matchAll(/"([^"]*)"/g)].map((x) => x[1])
    else if (v.startsWith('"')) meta[m[1]] = v.slice(1, -1)
    else meta[m[1]] = v
  })
  return meta
}

function chunkToBlocks(chunk) {
  const lines = chunk.split('\n').map((l) => l.trimEnd())
  const blocks = []

  if (lines.some((l) => l.endsWith('\\'))) {
    blocks.push({ type: 'poem', lines: lines.map((l) => l.replace(/\\$/, '').trim()) })
    return blocks
  }

  let paras = []
  const flush = () => {
    paras.forEach((p) => blocks.push({ type: 'p', content: inline(p) }))
    paras = []
  }
  lines.forEach((line) => {
    const t = line.trim()
    if (!t) return
    if (/^-{3,}$/.test(t)) {
      // a single line right above --- is a subheading, otherwise a plain rule
      if (paras.length === 1) {
        blocks.push({ type: 'sub', content: inline(paras[0]) })
        paras = []
      } else {
        flush()
        blocks.push({ type: 'hr' })
      }
      return
    }
    const last = paras[paras.length - 1]
    if (last !== undefined && !SENTENCE_END.test(last)) paras[paras.length - 1] = last + ' ' + t
    else paras.push(t)
  })
  flush()
  return blocks
}

export function parsePost(raw, slug) {
  const text = raw.replace(/\r\n/g, '\n')
  const m = text.match(/^\+\+\+\s*\n([\s\S]*?)\n\+\+\+\s*\n?([\s\S]*)$/)
  const meta = m ? parseFront(m[1]) : {}
  const body = (m ? m[2] : text).trim()
  const blocks = body.split(/\n\s*\n/).flatMap(chunkToBlocks)
  const words = body.split(/\s+/).filter(Boolean).length
  return {
    slug,
    title: meta.title || slug,
    date: meta.date || '',
    tags: meta.tags || [],
    minutes: Math.max(1, Math.round(words / 200)),
    blocks,
  }
}

export function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
}
