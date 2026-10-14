import Shell from './Shell.jsx'
import { profile } from '../content/profile.js'

export default function Contact({ onBack }) {
  const rows = profile.contact.filter((c) => c.text)
  return (
    <Shell theme="contact" title="Contact" sub="Calling card" onBack={onBack}>
      <div className="card">
        <p className="card-kicker">Calling card</p>
        <h3 className="card-name">{profile.name}</h3>
        <p className="card-role">Student and builder. Games, graphics, simulations, web.</p>
        <dl className="card-links">
          {rows.map((c) => (
            <div key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.href ? <a href={c.href}>{c.text}</a> : c.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Shell>
  )
}
