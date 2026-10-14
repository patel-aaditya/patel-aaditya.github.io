import Shell from './Shell.jsx'
import { profile } from '../content/profile.js'

export default function About({ onBack }) {
  return (
    <Shell theme="about" title="About" sub="Who is this" onBack={onBack}>
      <div className="about-grid">
        <div className="about-bio">
          {profile.bio.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="profile-card" aria-label="Profile">
          <h3>{profile.name}</h3>
          <dl>
            {profile.facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </Shell>
  )
}
