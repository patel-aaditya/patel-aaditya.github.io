import { useRef } from 'react'
import { SCREENS } from '../content/screens.js'
import { profile } from '../content/profile.js'
import Backdrop from './Backdrop.jsx'
import Character from './Character.jsx'
import Loud from './Loud.jsx'

// Each word gets its own size, sideways nudge and tilt so the stack is never uniform.
const LOOK = [
  { sz: 1.0, jx: 0, jr: 2 },
  { sz: 0.86, jx: 4, jr: -3 },
  { sz: 1.12, jx: -2, jr: 4 },
  { sz: 0.94, jx: 5, jr: -2 },
  { sz: 1.04, jx: 1, jr: 3 },
]
// Words at rest are mostly white outlines. The word under the cursor turns into solid tiles.
const OUT_TILES = [3, 3, 3, 0, 3, 1]
const SEL_TILES = [0, 1, 2, 4, 0, 1, 2]
const IDLE = { label: 'Menu', desc: 'Point at a word, or use the arrow keys.' }

// sel is -1 when nothing is picked: the menu starts that way, and a word only lights up while the pointer is on it
// (or while the arrow keys or Tab have picked it).
export default function Hub({ sel, setSel, open, sfx }) {
  const last = useRef(0)
  if (sel >= 0) last.current = sel
  const cur = sel >= 0 ? SCREENS[sel] : IDLE
  const mid = (SCREENS.length - 1) / 2
  return (
    <main className="hub">
      <Backdrop kick={last.current} />
      <div className="edge edge-tl" aria-hidden="true" />
      <div className="edge edge-tl-w" aria-hidden="true" />
      <div className="edge edge-br" aria-hidden="true" />
      <div className="edge edge-br-w" aria-hidden="true" />

      <div className="character-wrap" aria-hidden="true">
        <Character />
      </div>

      <div className="idbox">
        <h1>{profile.name}</h1>
        <p>{profile.line}</p>
      </div>

      <ul className="party" aria-label="What I am up to now">
        {profile.now.map(([k, v]) => (
          <li key={k}>
            <span className="pc-icon" aria-hidden="true">
              {k[0]}
            </span>
            <span className="pc-text">
              <span className="pc-k">{k}</span>
              <span className="pc-v">{v}</span>
            </span>
          </li>
        ))}
      </ul>

      <nav className="hub-nav" aria-label="Main menu">
        <ul className="menu">
          {SCREENS.map((s, i) => {
            const look = LOOK[i % LOOK.length]
            const k = i - mid
            const on = i === sel
            const abs = sel >= 0 ? Math.abs(i - sel) : Math.abs(k)
            return (
              <li key={s.id}>
                <button
                  type="button"
                  className="menu-item"
                  aria-current={on ? 'true' : undefined}
                  style={{
                    '--k': k,
                    '--sq': k * k,
                    '--abs': abs,
                    '--sz': look.sz,
                    '--jx': look.jx,
                    '--jr': look.jr,
                    '--i': i,
                    zIndex: 10 - abs,
                  }}
                  onMouseEnter={() => {
                    if (sel !== i) {
                      setSel(i)
                      sfx('move')
                    }
                  }}
                  onMouseLeave={() => setSel(-1)}
                  onFocus={() => setSel(i)}
                  onBlur={() => setSel(-1)}
                  onClick={() => open(s.id)}
                >
                  {on && (
                    <svg className="pick" viewBox="0 0 40 30" aria-hidden="true" focusable="false">
                      <polygon points="3,9 24,9 24,2 38,15 24,28 24,21 3,21" fill="#fff" stroke="#050505" strokeWidth="3" strokeLinejoin="round" />
                    </svg>
                  )}
                  <Loud text={s.label} seed={on ? 1 : 2 + i} intensity={on ? 1.15 : 0.8} tiles={on ? SEL_TILES : OUT_TILES} />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="cmd" aria-live="polite">
        <p className="cmd-title">{cur.label}</p>
        <p className="cmd-desc">{cur.desc}</p>
        <p className="cmd-keys">
          <span className="key">Enter</span> Open <span className="key">Esc</span> Back
        </p>
        <p className="cmd-touch">Tap a word to open it</p>
      </div>
    </main>
  )
}
