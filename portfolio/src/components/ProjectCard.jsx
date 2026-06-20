const accentMap = {
  violet: {
    tag: "text-violet-soft border-violet-soft/30 bg-violet-soft/5",
    pill: "bg-violet-soft/10 text-violet-glow",
    link: "text-violet-soft hover:text-violet-glow",
    glow: "hover:shadow-[0_0_32px_rgba(167,139,250,0.15)]",
  },
  sage: {
    tag: "text-sage border-sage/30 bg-sage/5",
    pill: "bg-sage/10 text-sage",
    link: "text-sage hover:text-sage/80",
    glow: "hover:shadow-[0_0_32px_rgba(107,143,113,0.15)]",
  },
};

export default function ProjectCard({ title, tag, description, stack, href, accent = "violet" }) {
  const c = accentMap[accent];
  return (
    <article
      className={`glass-card rounded-2xl p-8 flex flex-col gap-5 transition-all duration-400 cursor-default group ${c.glow} hover:-translate-y-1`}
      style={{ borderColor: "rgba(167,139,250,0.08)", transition: "all 0.35s ease" }}
    >
      <header className="flex items-start justify-between gap-4">
        <span className={`font-body text-[11px] tracking-widest uppercase border rounded-sm px-2 py-0.5 ${c.tag}`}>
          {tag}
        </span>
      </header>

      <div>
        <h3 className="font-display font-semibold text-ash text-xl mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="font-body text-mist/70 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {stack.map((s) => (
          <span key={s} className={`font-body text-[11px] rounded-full px-3 py-1 ${c.pill}`}>
            {s}
          </span>
        ))}
      </div>

      {href && href !== "#" ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-display text-[11px] tracking-widest uppercase border-b pb-px self-start transition-colors ${c.link}`}
          style={{ borderColor: "currentColor" }}
        >
          View on GitHub ↗
        </a>
      ) : (
        <span className="font-display text-[11px] tracking-widest uppercase text-mist/30">
          In progress
        </span>
      )}
    </article>
  );
}
