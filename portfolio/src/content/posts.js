import { parsePost } from '../lib/markdown.js'

// Drop a new .md file into src/content/journal/ and it shows up in the Journal.
const files = import.meta.glob('./journal/*.md', { query: '?raw', import: 'default', eager: true })

// Downloadable PDF versions of the older posts (files live in public/pdfs/).
const PDFS = {
  nepal: 'Nepal.pdf',
  'the-comfort-of-being-unknown': 'The_Comfort_of_Being_Unknown.pdf',
  'the-empty-podium': 'The_empty_podium.pdf',
}

// The shared preview build has no public/ folder, so PDF links are hidden there.
const hasPublicFiles = import.meta.env.MODE !== 'preview'

export const posts = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '')
    const post = parsePost(raw, slug)
    post.pdf = hasPublicFiles && PDFS[slug] ? `${import.meta.env.BASE_URL}pdfs/${PDFS[slug]}` : null
    return post
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))
