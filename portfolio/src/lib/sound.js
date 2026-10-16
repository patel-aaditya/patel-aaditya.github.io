// Menu blips and the background track. Browsers keep audio locked until the first click, tap or key press, so
// unlock() is called on that first gesture: it resumes the blips and starts the music if it could not start by itself.
// level: 0 is muted, 1 is low (the default), 2 is medium, 3 is high.
const SRC = (typeof window !== 'undefined' && window.__BGM) || `${import.meta.env.BASE_URL}audio/bgm.mp3`
const MUSIC = [0, 0.08, 0.2, 0.4]
const BLIP = [0, 0.03, 0.06, 0.1]
const TONES = { move: 660, open: 880, back: 330, pick: 520 }

let ctx = null
let audio = null
let level = 1

function track() {
  if (!audio) {
    audio = new Audio(SRC)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = MUSIC[level]
  }
  return audio
}

function startMusic() {
  if (level === 0) return
  try {
    const p = track().play()
    if (p && p.catch) p.catch(() => {})
  } catch (e) {
    /* audio is optional */
  }
}

export function setLevel(v) {
  level = v
  try {
    const a = track()
    a.volume = MUSIC[v]
    if (v === 0) a.pause()
    else startMusic()
  } catch (e) {
    /* audio is optional */
  }
}

export function play(kind) {
  if (level === 0) return
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
    const f = TONES[kind] || 520
    const t = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.setValueAtTime(f, t)
    if (kind === 'open') osc.frequency.exponentialRampToValueAtTime(f * 1.5, t + 0.08)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(BLIP[level], t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.13)
  } catch (e) {
    /* audio is optional */
  }
}

export function unlock() {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)()
    if (ctx.state === 'suspended') ctx.resume()
  } catch (e) {
    /* audio is optional */
  }
  startMusic()
}
