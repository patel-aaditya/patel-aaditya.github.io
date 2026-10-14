import { useEffect, useState } from 'react'
import Shell from './Shell.jsx'
import { posts } from '../content/posts.js'
import { formatDate } from '../lib/markdown.js'

function Inline({ parts }) {
  return parts.map((p, i) => {
    if (p.t === 'b') return <strong key={i}>{p.text}</strong>
    if (p.t === 'i') return <em key={i}>{p.text}</em>
    return p.text
  })
}

function Block({ b }) {
  switch (b.type) {
    case 'poem':
      return (
        <p className="poem">
          {b.lines.map((l, i) => (
            <span key={i}>
              {l}
              <br />
            </span>
          ))}
        </p>
      )
    case 'sub':
      return (
        <h4 className="post-sub">
          <Inline parts={b.content} />
        </h4>
      )
    case 'hr':
      return <hr />
    default:
      return (
        <p>
          <Inline parts={b.content} />
        </p>
      )
  }
}

export default function Journal({ onBack, slug, setPost, sfx }) {
  const [i, setI] = useState(0)
  const post = slug ? posts.find((p) => p.slug === slug) : null

  useEffect(() => {
    if (post) return undefined
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        sfx('move')
        setI((n) => (n + (e.key === 'ArrowDown' ? 1 : posts.length - 1)) % posts.length)
      } else if (e.key === 'Enter' && !(e.target instanceof Element && e.target.closest('button, a'))) {
        setPost(posts[i].slug)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [post, i, setPost, sfx])

  if (post) {
    return (
      <Shell theme="journal" title="Journal" sub={formatDate(post.date)} onBack={onBack}>
        <article className="post">
          <button type="button" className="all-posts" onClick={() => setPost(null)}>
            &lsaquo; All entries
          </button>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-meta">
            {formatDate(post.date)} · {post.minutes} min read
            {post.tags.length > 0 && ` · ${post.tags.join(', ')}`}
          </p>
          <div className="post-body">
            {post.blocks.map((b, n) => (
              <Block key={n} b={b} />
            ))}
          </div>
          {post.pdf && (
            <a className="pdf" href={post.pdf} download>
              Download as PDF
            </a>
          )}
        </article>
      </Shell>
    )
  }

  return (
    <Shell theme="journal" title="Journal" sub="Writing" onBack={onBack}>
      <ul className="entries">
        {posts.map((p, n) => (
          <li key={p.slug}>
            <button
              type="button"
              className="entry"
              aria-current={n === i ? 'true' : undefined}
              onMouseEnter={() => setI(n)}
              onClick={() => {
                sfx('open')
                setPost(p.slug)
              }}
            >
              <span className="e-date">{formatDate(p.date)}</span>
              <span className="e-title">{p.title}</span>
              <span className="e-meta">
                {p.tags.join(', ')} · {p.minutes} min
              </span>
            </button>
          </li>
        ))}
      </ul>
    </Shell>
  )
}
