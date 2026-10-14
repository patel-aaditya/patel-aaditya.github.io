import Loud from './Loud.jsx'

// Common frame for every screen behind the menu: back button, loud title, scrolling body.
export default function Shell({ theme, title, sub, onBack, children }) {
  return (
    <section className={`screen theme-${theme}`}>
      <header className="screen-head">
        <button type="button" className="back" onClick={onBack}>
          &lsaquo; Menu
        </button>
        <h2 className="screen-title">
          <Loud text={title} seed={3} />
        </h2>
        {sub && <span className="screen-sub">{sub}</span>}
      </header>
      <div className="screen-body">
        <div className="inner">{children}</div>
      </div>
    </section>
  )
}
