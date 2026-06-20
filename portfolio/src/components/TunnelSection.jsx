import { useTunnelReveal } from "../hooks/useTunnel";

/**
 * Wraps any section with the "fly into it" tunnel scroll effect.
 * Children appear to zoom in from a vanishing point as you scroll toward them.
 */
export default function TunnelSection({ id, className = "", children, bg }) {
  const ref = useTunnelReveal();

  return (
    <div
      className="tunnel-stage"
      style={{ background: bg || "transparent" }}
    >
      <section
        id={id}
        ref={ref}
        className={`tunnel-panel ${className}`}
        style={{ opacity: 0 }}
      >
        {children}
      </section>
    </div>
  );
}
