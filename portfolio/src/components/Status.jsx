import Shell from './Shell.jsx'

const STATS = ['Graphics', 'Game dev', 'AI / ML', 'Web', 'Open source']

export default function Status({ onBack }) {
  return (
    <Shell theme="status" title="Status" sub="Stats" onBack={onBack}>
      <p className="stamp">Work in progress</p>
      <p className="status-note">This screen is under construction. Skills will show up here as stats once they are ready.</p>
      <ul className="stats">
        {STATS.map((s) => (
          <li key={s}>
            <span className="stat-name">{s}</span>
            <span className="bar" aria-hidden="true">
              {Array.from({ length: 10 }, (_, n) => (
                <span key={n} className="seg" />
              ))}
            </span>
            <span className="stat-val">Not rated yet</span>
          </li>
        ))}
      </ul>
    </Shell>
  )
}
