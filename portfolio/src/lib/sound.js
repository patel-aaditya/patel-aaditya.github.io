// Tiny menu blips. Off by default; only runs after the visitor turns sound on.
let ctx = null

const TONES = { move: 660, open: 880, back: 330, pick: 520 }

export function play(kind) {
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
    gain.gain.exponentialRampToValueAtTime(0.05, t + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.13)
  } catch (e) {
    /* audio is optional */
  }
}
