import TunnelSection from "./TunnelSection";
import { skills } from "../data";

export default function Skills() {
  return (
    <TunnelSection
      id="skills"
      bg="linear-gradient(180deg, #0a0f1a 0%, #1a0f2e 60%, #0d1f14 100%)"
      className="py-32 px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-violet-soft/60 mb-3">
            What I work with
          </p>
          <h2
            className="font-display font-bold text-ash leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Skills
          </h2>
        </div>

        <div className="space-y-10">
          {Object.entries(skills).map(([group, tags]) => (
            <div key={group}>
              <p className="font-body text-[11px] tracking-[0.2em] uppercase text-mist/40 mb-4">
                {group}
              </p>
              <div className="flex flex-wrap gap-3">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="font-display text-sm text-ash/80 glass-card rounded-lg px-4 py-2 cursor-default
                               hover:border-violet-soft/30 hover:text-violet-glow transition-all duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </TunnelSection>
  );
}
