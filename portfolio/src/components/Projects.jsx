import { useEffect, useState } from 'react'
import Shell from './Shell.jsx'
import Loud from './Loud.jsx'
import { projects } from '../content/projects.js'

export default function Projects({ onBack, sfx }) {
  const [i, setI] = useState(0)
  const p = projects[i]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      e.preventDefault()
      sfx('move')
      setI((n) => (n + (e.key === 'ArrowDown' ? 1 : projects.length - 1)) % projects.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sfx])

  return (
    <Shell theme="projects" title="Projects" sub="Missions" onBack={onBack}>
      <div className="split">
        <ul className="mission-list">
          {projects.map((m, n) => (
            <li key={m.id}>
              <button
                type="button"
                className="mission"
                aria-current={n === i ? 'true' : undefined}
                onClick={() => {
                  setI(n)
                  sfx('pick')
                }}
              >
                <span className="m-name">{m.name}</span>
                <span className={`m-status ${m.status === 'In progress' ? 'wip' : ''}`}>{m.status}</span>
              </button>
            </li>
          ))}
        </ul>

        <article className="mission-detail" aria-live="polite">
          <p className={`stamp-sm ${p.status === 'In progress' ? 'wip' : ''}`}>{p.status}</p>
          <h3>
            <Loud key={p.id} text={p.name} seed={5} intensity={0.7} />
          </h3>
          <p className="m-blurb">{p.blurb}</p>
          <ul className="chips" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </article>
      </div>
    </Shell>
  )
}
