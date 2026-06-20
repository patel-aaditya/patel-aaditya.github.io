import { useMemo } from "react";

const SPORES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 3 + Math.random() * 9,
  delay: Math.random() * 10,
  duration: 9 + Math.random() * 8,
  opacity: 0.12 + Math.random() * 0.22,
  hue: Math.random() > 0.5 ? "rgba(167,139,250," : "rgba(107,143,113,",
  rx: `${50 + Math.random() * 30}% ${50 - Math.random() * 20}% ${50 + Math.random() * 20}% ${50 - Math.random() * 30}%`,
  ry: `${40 + Math.random() * 20}% ${60 - Math.random() * 20}% ${40 + Math.random() * 20}% ${60 - Math.random() * 20}%`,
}));

export default function SporeField() {
  const spores = useMemo(() => SPORES, []);
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {spores.map((s) => (
        <div
          key={s.id}
          className="spore absolute"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: `${s.hue}${s.opacity})`,
            borderRadius: `${s.rx} / ${s.ry}`,
            animation: `sporeFloat ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
