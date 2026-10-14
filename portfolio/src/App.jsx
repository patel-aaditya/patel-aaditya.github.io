import { useCallback, useEffect, useRef, useState } from 'react'
import { SCREENS } from './content/screens.js'
import { play } from './lib/sound.js'
import Hub from './components/Hub.jsx'
import About from './components/About.jsx'
import Projects from './components/Projects.jsx'
import Status from './components/Status.jsx'
import Journal from './components/Journal.jsx'
import Contact from './components/Contact.jsx'

const REDUCED = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches

// Hash routes: "#projects", "#journal", "#journal-<post-slug>". Empty hash is the menu.
function parseHash() {
  let h = ''
  try {
    h = location.hash.replace(/^#/, '')
  } catch (e) {
    /* hash is optional */
  }
  if (!h) return { screen: 'hub', post: null }
  if (h.startsWith('journal-')) return { screen: 'journal', post: h.slice('journal-'.length) }
  if (SCREENS.some((s) => s.id === h)) return { screen: h, post: null }
  return { screen: 'hub', post: null }
}

function writeHash(route) {
  try {
    location.hash = route.screen === 'hub' ? '' : route.post ? `journal-${route.post}` : route.screen
  } catch (e) {
    /* hash is optional */
  }
}

export default function App() {
  const [route, setRoute] = useState(parseHash)
  const [sel, setSel] = useState(-1) // -1: nothing picked
  const [ghost, setGhost] = useState(null) // the view we just left, kept briefly for the burst
  const [soundOn, setSoundOn] = useState(false)
  const timers = useRef([])
  const routeRef = useRef(route)
  const ghostId = useRef(0)
  routeRef.current = route

  const sfx = useCallback(
    (kind) => {
      if (soundOn) play(kind)
    },
    [soundOn],
  )

  // Opening a screen bursts it out of the character; going back pulls it back in.
  const go = useCallback((screen, post = null) => {
    const next = { screen, post }
    setSel(-1)
    if (!REDUCED) {
      ghostId.current += 1
      setGhost({ id: ghostId.current, route: routeRef.current })
      timers.current.forEach(clearTimeout)
      timers.current = [setTimeout(() => setGhost(null), 620)]
    }
    setRoute(next)
    writeHash(next)
  }, [])

  // Moving between a list and a post inside Journal needs no burst.
  const setPost = useCallback((slug) => {
    const next = { screen: 'journal', post: slug }
    setRoute(next)
    writeHash(next)
  }, [])

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => {
      window.removeEventListener('hashchange', onHash)
      timers.current.forEach(clearTimeout)
    }
  }, [])

  const back = useCallback(() => {
    sfx('back')
    if (route.screen === 'journal' && route.post) setPost(null)
    else go('hub')
  }, [route, setPost, go, sfx])

  const open = useCallback(
    (id) => {
      sfx('open')
      go(id)
    },
    [go, sfx],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const onControl = e.target instanceof Element && e.target.closest('button, a')
      if (route.screen === 'hub') {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault()
          sfx('move')
          const down = e.key === 'ArrowDown'
          setSel((i) => (i < 0 ? (down ? 0 : SCREENS.length - 1) : (i + (down ? 1 : SCREENS.length - 1)) % SCREENS.length))
        } else if ((e.key === 'Enter' || e.key === ' ') && !onControl && sel >= 0) {
          e.preventDefault()
          open(SCREENS[sel].id)
        } else if (/^[1-9]$/.test(e.key) && SCREENS[Number(e.key) - 1]) {
          open(SCREENS[Number(e.key) - 1].id)
        }
      } else if (e.key === 'Escape' || (e.key === 'Backspace' && !onControl)) {
        e.preventDefault()
        back()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [route.screen, sel, open, back, sfx])

  const hubVisible = route.screen === 'hub' || (ghost && ghost.route.screen === 'hub')
  const top = route.screen !== 'hub' ? route : ghost && ghost.route.screen !== 'hub' ? ghost.route : null
  const phase = ghost ? (route.screen !== 'hub' ? 'burst-in' : 'burst-out') : ''

  let view = null
  if (top) {
    switch (top.screen) {
      case 'about':
        view = <About onBack={back} />
        break
      case 'projects':
        view = <Projects onBack={back} sfx={sfx} />
        break
      case 'status':
        view = <Status onBack={back} />
        break
      case 'journal':
        view = <Journal onBack={back} slug={top.post} setPost={setPost} sfx={sfx} />
        break
      default:
        view = <Contact onBack={back} />
    }
  }

  return (
    <div className="app">
      {hubVisible && <Hub sel={sel} setSel={setSel} open={open} sfx={sfx} />}
      {view && <div className={`layer ${phase}`}>{view}</div>}
      {ghost && <div key={ghost.id} className="ring" aria-hidden="true" />}
      <button
        type="button"
        className="sound"
        aria-pressed={soundOn}
        onClick={() => {
          const next = !soundOn
          setSoundOn(next)
          if (next) play('pick')
        }}
      >
        Sound {soundOn ? 'on' : 'off'}
      </button>
    </div>
  )
}
