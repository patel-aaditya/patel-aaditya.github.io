import TunnelSection from "./TunnelSection";

const socials = [
  { label: "GitHub", href: "https://github.com/patel-aaditya" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aadityapatel" },
  { label: "Email", href: "mailto:your@email.com" },
];

export default function Contact() {
  return (
    <TunnelSection
      id="contact"
      bg="linear-gradient(180deg, #0d1f14 0%, #07080d 100%)"
      className="min-h-[70vh] flex items-center py-32 px-8"
    >
      <div className="max-w-2xl mx-auto text-center w-full">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-violet-soft/60 mb-5">
          Let's connect
        </p>
        <h2
          className="font-display font-bold grad-text leading-tight mb-6"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          Get in touch
        </h2>
        <p className="font-body text-mist/60 leading-relaxed mb-12 text-base max-w-md mx-auto">
          Open to projects, internships, and conversations. Whether it's a
          build idea or just a hello — drop a line.
        </p>

        <div className="hairline w-24 mx-auto mb-12" />

        <div className="flex flex-wrap gap-4 justify-center">
          {socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-display text-xs tracking-widest uppercase px-8 py-3 rounded-sm
                         border border-violet-soft/25 text-mist
                         hover:border-violet-soft/60 hover:text-violet-glow hover:bg-violet-soft/5
                         transition-all duration-300"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </TunnelSection>
  );
}
