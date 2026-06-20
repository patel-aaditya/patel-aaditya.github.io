import { useEffect, useRef } from "react";

export default function Hero() {
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const p = Math.min(y / vh, 1);

      // Name is on a farther plane — moves slower (parallax depth split)
      if (nameRef.current)
        nameRef.current.style.transform = `translateY(${p * -60}px) translateZ(0)`;

      // Role is on a closer plane — moves faster
      if (roleRef.current)
        roleRef.current.style.transform = `translateY(${p * -120}px) translateZ(30px)`;

      // Background fog shrinks inward as we fly in
      if (bgRef.current) {
        bgRef.current.style.transform = `scale(${1 + p * 0.08})`;
        bgRef.current.style.opacity = 1 - p * 1.2;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, #1a0f2e 0%, #0d1f14 50%, #07080d 100%)" }}
    >
      {/* Ambient glow orbs */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(167,139,250,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-[300px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(107,143,113,0.1) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />

      {/* Misty horizon line */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, transparent 50%, rgba(107,143,113,0.06) 70%, rgba(167,139,250,0.04) 90%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ perspective: "600px" }}>
        {/* Eyebrow */}
        <p
          className="font-body text-xs tracking-[0.25em] uppercase text-mist mb-8 animate-fade-in"
          style={{ animationDelay: "0.2s", opacity: 0 }}
        >
          B.Tech CSE &nbsp;·&nbsp; COEP Pune &nbsp;·&nbsp; Class of 2029
        </p>

        {/* Name — far plane */}
        <div
          ref={nameRef}
          style={{ willChange: "transform", transition: "transform 0.05s linear" }}
        >
          <h1 className="font-display font-bold leading-none tracking-tight text-balance">
            <span
              className="grad-text"
              style={{ fontSize: "clamp(4rem, 14vw, 10rem)" }}
            >
              Aaditya
            </span>
          </h1>
        </div>

        {/* Role — near plane */}
        <div
          ref={roleRef}
          style={{ willChange: "transform", transition: "transform 0.05s linear" }}
        >
          <h2
            className="font-display font-light text-ash/80 tracking-wide mt-2"
            style={{ fontSize: "clamp(1.1rem, 3.5vw, 2.2rem)" }}
          >
            Developer · Builder ·{" "}
            <span className="text-sage italic">Explorer of ideas</span>
          </h2>
        </div>

        {/* Divider */}
        <div className="hairline w-32 mx-auto my-10" />

        {/* CTAs */}
        <div
          className="flex gap-4 justify-center animate-fade-in"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <a
            href="#projects"
            className="font-display text-xs tracking-widest uppercase px-7 py-3 rounded-sm border border-violet-soft/50 text-violet-glow hover:bg-violet-soft/10 hover:border-violet-soft transition-all duration-300"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="font-display text-xs tracking-widest uppercase px-7 py-3 rounded-sm bg-violet-soft/10 border border-violet-soft/20 text-ash hover:bg-violet-soft/20 transition-all duration-300"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in"
        style={{ animationDelay: "1.1s", opacity: 0 }}
        aria-hidden="true"
      >
        <span className="font-body text-[10px] tracking-[0.3em] uppercase text-mist/50">scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div
            className="w-full h-full bg-gradient-to-b from-violet-soft/60 to-transparent"
            style={{ animation: "lineScroll 1.6s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes lineScroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
