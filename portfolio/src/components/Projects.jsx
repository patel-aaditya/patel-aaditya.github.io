import TunnelSection from "./TunnelSection";
import ProjectCard from "./ProjectCard";
import { projects } from "../data";

export default function Projects() {
  return (
    <TunnelSection
      id="projects"
      bg="linear-gradient(180deg, #0f0a20 0%, #0d1f14 40%, #0a0f1a 100%)"
      className="py-32 px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-14">
          <p className="font-body text-xs tracking-[0.2em] uppercase text-sage/60 mb-3">
            Selected work
          </p>
          <h2
            className="font-display font-bold text-ash leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Things I've built
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </TunnelSection>
  );
}
