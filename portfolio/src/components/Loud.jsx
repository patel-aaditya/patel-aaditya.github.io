// "Loud" lettering: every letter gets its own typeface, tile, tilt and size, like cut-out headlines.
// Choices come from a seeded generator, so the same word always looks the same.
function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

const FONTS = 7

export default function Loud({ text, seed = 0, intensity = 1, tiles = [0, 1, 2, 3, 4] }) {
  const r = rng(hash(text) + seed * 7919)
  let prevFont = -1
  return (
    <span className="loud">
      <span className="sr">{text}</span>
      {[...text].map((ch, i) => {
        if (ch === ' ') return <span key={i} className="lt-gap" aria-hidden="true" />
        let font = Math.floor(r() * FONTS)
        if (font === prevFont) font = (font + 1) % FONTS
        prevFont = font
        const tile = tiles[Math.floor(r() * tiles.length)]
        const rot = ((r() - 0.5) * 16 * intensity).toFixed(1)
        const sc = (1 + (r() - 0.5) * 0.3 * intensity).toFixed(2)
        const dy = ((r() - 0.5) * 0.26 * intensity).toFixed(2)
        return (
          <span
            key={i}
            aria-hidden="true"
            className={`lt lt-${tile} f-${font}`}
            style={{ '--rot': `${rot}deg`, '--sc': sc, '--dy': `${dy}em` }}
          >
            {ch}
          </span>
        )
      })}
    </span>
  )
}
