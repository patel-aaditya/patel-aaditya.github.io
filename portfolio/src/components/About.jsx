import TunnelSection from "./TunnelSection";

export default function About() {
  return (
    <TunnelSection
      id="about"
      bg="linear-gradient(180deg, #07080d 0%, #0d1a10 50%, #0f0a20 100%)"
      className="min-h-screen flex items-center py-32 px-8"
    >
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div>
          <p className="font-body text-xs tracking-[0.2em] uppercase text-violet-soft/60 mb-4">
            About me
          </p>
          <h2
            className="font-display font-bold leading-tight text-ash mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Making things that{" "}
            <em className="grad-text not-italic">actually work</em>
          </h2>
          <p className="font-body text-mist leading-relaxed mb-5 text-base">
            First-year CS student at COEP Pune with a focus on full-stack
            development, AI/ML, and game development. I build tools that are
            useful and experiences that are memorable.
          </p>
          <p className="font-body text-mist/70 leading-relaxed text-sm">
            Currently completing a social internship at VHAS (Voluntary Health
            Association of Sikkim) — building data dashboards for MGNREGA social
            audit programmes and running digital literacy training for NGO staff.
          </p>

          <div className="hairline w-24 mt-10 mb-8" />

          <a
            href="#contact"
            className="font-display text-xs tracking-widest uppercase text-violet-soft hover:text-violet-glow transition-colors"
          >
            Say hello →
          </a>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { n: "5+", l: "Projects shipped" },
            { n: "2029", l: "Graduation year" },
            { n: "3+", l: "Tech stacks" },
            { n: "∞", l: "Things to build" },
          ].map(({ n, l }) => (
            <div
              key={l}
              className="glass-card bio-glow rounded-xl p-7 cursor-default"
            >
              <p
                className="font-display font-bold grad-text leading-none mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}
              >
                {n}
              </p>
              <p className="font-body text-xs text-mist/60 tracking-wide">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </TunnelSection>
  );
}
