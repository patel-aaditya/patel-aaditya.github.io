import { useScrollY } from "../hooks/useTunnel";

const links = ["about", "projects", "skills", "contact"];

export default function Nav() {
  const y = useScrollY();
  const scrolled = y > 60;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-void/80 backdrop-blur-xl border-b border-violet-soft/10"
          : "bg-transparent"
      }`}
    >
      <a
        href="#hero"
        className="font-display font-bold text-sm tracking-widest uppercase text-violet-glow hover:text-white transition-colors"
      >
        AP
      </a>

      <ul className="flex gap-8">
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l}`}
              className="font-body text-xs tracking-widest uppercase text-mist hover:text-violet-soft transition-colors duration-200"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
