import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── CONSTANTS ──────────────────────────────────────────────────────────────
const Z_GAP   = 1800;   // distance between planes in 3D space
const SCROLL_SPEED = 1.4; // wheel sensitivity

// Planes: 0=sky/hero, 1=about, 2..N-1=projects
const PROJECTS = [
  {
    id: 0,
    title: "Solar System",
    sub: "An interactive 3D model of the solar system with real orbital mechanics and camera controls.",
    tech: ["React", "Three.js", "TypeScript", "Vite"],
    tag: "3D / Web",
    href: "https://github.com/patel-aaditya/Solar-system",
    accent: "#a78bfa",
    bg: "cosmos",
  },
  {
    id: 1,
    title: "MGNREGA Dashboard",
    sub: "Multi-year social audit data across 6 Sikkim districts, consolidated into one interactive dashboard.",
    tech: ["React", "Recharts", "Python", "Excel"],
    tag: "Data / NGO",
    href: null,
    accent: "#86efac",
    bg: "forest",
  },
  {
    id: 2,
    title: "Spotify Analyser",
    sub: "Listening history deep-dive — mood trends, top artists, time-of-day patterns.",
    tech: ["Python", "Pandas", "Matplotlib"],
    tag: "Analysis",
    href: null,
    accent: "#fbbf24",
    bg: "dusk",
  },
  {
    id: 3,
    title: "Sea of Myths",
    sub: "A pirate/mythic ocean world. Lore-built first, then parallel Unity game and narrative development.",
    tech: ["Unity", "C#", "World Design"],
    tag: "Game Dev",
    href: null,
    accent: "#38bdf8",
    bg: "ocean",
  },
  {
    id: 4,
    title: "Portfolio",
    sub: "This site. Sky portal, Z-scroll tunnel, CSS-painted scenes, Framer Motion.",
    tech: ["React", "Framer Motion", "Tailwind", "Vite"],
    tag: "Web",
    href: null,
    accent: "#f472b6",
    bg: "void",
  },
];

// Blog posts pulled from your live Zola blog
const BLOG_POSTS = [
  { title: "The Empty Podium",          date: "Jan 15, 2026", href: "https://patel-aaditya.github.io/blog/the-empty-podium/" },
  { title: "The Comfort of Being Unknown", date: "Jan 2, 2026",  href: "https://patel-aaditya.github.io/blog/the-comfort-of-being-unknown/" },
  { title: "Nepal",                     date: "Dec 10, 2025", href: "https://patel-aaditya.github.io/blog/nepal/" },
];

const TOTAL_PLANES = 2 + PROJECTS.length + 2; // hero + about + projects + blog + contact

// ─── PAINTED BACKGROUNDS ────────────────────────────────────────────────────

function Cloud({ x, y, w, delay, op = 0.9 }) {
  return (
    <motion.div
      style={{ position:"absolute", left:x, top:y, width:w, opacity:op, pointerEvents:"none" }}
      animate={{ x:[0,20,0], y:[0,-8,0] }}
      transition={{ duration:16+delay*4, repeat:Infinity, ease:"easeInOut", delay }}
    >
      <svg viewBox="0 0 240 90" fill="white" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="120" cy="62" rx="120" ry="28"/>
        <ellipse cx="85"  cy="48" rx="65"  ry="35"/>
        <ellipse cx="162" cy="44" rx="55"  ry="31"/>
        <ellipse cx="58"  cy="59" rx="40"  ry="22"/>
        <ellipse cx="190" cy="58" rx="44"  ry="24"/>
      </svg>
    </motion.div>
  );
}

function SkyBg() {
  return (
    <div style={{ position:"absolute", inset:0,
      background:"linear-gradient(180deg,#4a90c4 0%,#6ab0de 22%,#87ceeb 42%,#b0d9f2 65%,#ceeaf8 100%)" }}>
      <Cloud x="-5%"  y="3%"  w={500} delay={0}   op={0.95}/>
      <Cloud x="54%"  y="7%"  w={400} delay={2.5}  op={0.88}/>
      <Cloud x="-6%"  y="36%" w={320} delay={5}    op={0.50}/>
      <Cloud x="60%"  y="45%" w={520} delay={1.5}  op={0.38}/>
      <Cloud x="22%"  y="0%"  w={220} delay={4}    op={0.70}/>
      <Cloud x="68%"  y="62%" w={380} delay={7}    op={0.28}/>
    </div>
  );
}

// Cosmos — deep space, star field
function CosmosBg({ accent }) {
  const stars = useRef(
    Array.from({ length: 120 }, () => ({
      x: Math.random()*100, y: Math.random()*100,
      r: 0.5+Math.random()*1.8, op: 0.3+Math.random()*0.7,
      dur: 2+Math.random()*3, del: Math.random()*4,
    }))
  ).current;
  return (
    <div style={{ position:"absolute", inset:0,
      background:"radial-gradient(ellipse 80% 70% at 50% 40%, #1a0a3a 0%, #0a0518 50%, #000 100%)" }}>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}>
        {stars.map((s,i)=>(
          <motion.circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r}
            fill="white" opacity={s.op}
            animate={{ opacity:[s.op, s.op*0.3, s.op] }}
            transition={{ duration:s.dur, repeat:Infinity, delay:s.del, ease:"easeInOut" }}/>
        ))}
      </svg>
      <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)",
        width:340, height:340, borderRadius:"50%",
        background:`radial-gradient(ellipse, ${accent}22 0%, transparent 70%)`,
        filter:"blur(40px)" }}/>
    </div>
  );
}

// Forest — misty green
function ForestBg({ accent }) {
  return (
    <div style={{ position:"absolute", inset:0,
      background:"linear-gradient(180deg,#0a1a0e 0%,#0d2410 30%,#0a1c0c 60%,#050e06 100%)" }}>
      {/* Moon */}
      <div style={{ position:"absolute", top:"12%", right:"20%", width:60, height:60,
        borderRadius:"50%", background:"radial-gradient(circle, #e0f0d8 0%, #b8d8a0 60%, transparent 100%)",
        boxShadow:"0 0 40px rgba(160,220,130,0.4)" }}/>
      {/* Tree silhouettes */}
      {[12,22,32,42,52,62,72,82,88].map((l,i)=>(
        <div key={i} style={{ position:"absolute", bottom:0, left:`${l}%`,
          width: 24+i*3, height:`${38+Math.sin(i)*12}%`,
          background:"#04080a",
          clipPath:"polygon(50% 0%,90% 100%,10% 100%)" }}/>
      ))}
      {/* Fog */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"28%",
        background:"linear-gradient(0deg, rgba(40,80,50,0.55) 0%, transparent 100%)",
        filter:"blur(8px)" }}/>
      <div style={{ position:"absolute", inset:0,
        background:`radial-gradient(ellipse 60% 60% at 50% 50%, ${accent}10 0%, transparent 70%)` }}/>
    </div>
  );
}

// Dusk — warm gradient, silhouetted hills
function DuskBg({ accent }) {
  return (
    <div style={{ position:"absolute", inset:0,
      background:"linear-gradient(180deg,#1a0a00 0%,#6b2800 20%,#c85000 38%,#e87820 52%,#f0a030 65%,#c87820 78%,#602010 100%)" }}>
      {/* Sun disk */}
      <div style={{ position:"absolute", top:"52%", left:"50%", transform:"translate(-50%,-50%)",
        width:90, height:90, borderRadius:"50%",
        background:"radial-gradient(circle, #fff8e0 0%, #ffe060 40%, #ff8800 100%)",
        boxShadow:"0 0 60px rgba(255,160,0,0.7), 0 0 120px rgba(255,100,0,0.4)" }}/>
      {/* Hill silhouettes */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"35%",
        background:"#0a0505",
        clipPath:"polygon(0 80%,5% 50%,12% 70%,20% 30%,30% 55%,40% 20%,50% 45%,60% 15%,72% 40%,82% 25%,92% 50%,100% 35%,100% 100%,0 100%)" }}/>
      {/* Horizon glow */}
      <div style={{ position:"absolute", top:"50%", left:0, right:0, height:"8%",
        background:"rgba(255,180,60,0.35)", filter:"blur(18px)" }}/>
    </div>
  );
}

// Ocean — the wanderer-inspired misty sea (the one Aaditya liked!)
function OceanBg({ accent }) {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden" }}>
      {/* Sky */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(180deg,#0a1520 0%,#102030 25%,#1a3040 45%,#0d2030 65%,#081520 100%)" }}/>
      {/* Moon reflection strip */}
      <div style={{ position:"absolute", top:"15%", left:"50%", transform:"translateX(-50%)",
        width:50, height:50, borderRadius:"50%",
        background:"radial-gradient(circle,#e8f4f8 0%,#b0d0e0 60%,transparent 100%)",
        boxShadow:"0 0 50px rgba(180,220,240,0.5)" }}/>
      {/* Distant fog peaks */}
      <div style={{ position:"absolute", bottom:"35%", left:0, right:0, height:"32%",
        background:"linear-gradient(180deg,#1a2a38 0%,#0e1e2c 100%)",
        clipPath:"polygon(0 80%,4%36%,10%58%,18%14%,26%46%,36%4%,46%30%,56%6%,66%38%,76%14%,86%42%,94%26%,100%52%,100%100%,0 100%)" }}/>
      {/* Water */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"38%",
        background:"linear-gradient(180deg,#0d2030 0%,#081828 100%)" }}/>
      {/* Water shimmer */}
      {[...Array(6)].map((_,i)=>(
        <motion.div key={i}
          animate={{ opacity:[0.15,0.45,0.15], scaleX:[1,1.1,1] }}
          transition={{ duration:3+i*0.5, repeat:Infinity, delay:i*0.4, ease:"easeInOut" }}
          style={{ position:"absolute", bottom:`${8+i*5}%`, left:`${10+i*4}%`,
            width:`${60-i*8}%`, height:1,
            background:"rgba(180,220,240,0.6)", borderRadius:1 }}/>
      ))}
      {/* Wanderer silhouette — the one you liked! */}
      <div style={{ position:"absolute", bottom:"36%", left:"calc(50% - 18px)" }}>
        <div style={{ width:28, height:55, background:"#050c12",
          borderRadius:"44% 44% 28% 28% / 14% 14% 42% 42%", position:"relative" }}>
          <div style={{ position:"absolute", top:-19, left:"50%", transform:"translateX(-50%)",
            width:18, height:22, background:"#0a1520", borderRadius:"50% 50% 42% 42%"}}/>
          <div style={{ position:"absolute", bottom:-10, left:-5, width:38, height:16,
            background:"#050c12", borderRadius:"0 0 50% 50%"}}/>
          <div style={{ position:"absolute", top:10, right:-14, width:2, height:62,
            background:"#1a2a38", transform:"rotate(11deg)", transformOrigin:"top", borderRadius:1}}/>
        </div>
      </div>
      {/* Mist */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(180deg,rgba(10,20,32,0.4) 0%,transparent 35%,rgba(8,16,26,0.3) 75%,rgba(8,16,26,0.6) 100%)" }}/>
      <div style={{ position:"absolute", inset:0,
        background:`radial-gradient(ellipse 70% 70% at 50% 50%, ${accent}15 0%, transparent 70%)` }}/>
    </div>
  );
}

// Void — dark minimal
function VoidBg({ accent }) {
  return (
    <div style={{ position:"absolute", inset:0,
      background:"radial-gradient(ellipse 100% 100% at 50% 0%, #1a0a2e 0%, #0a0514 50%, #000 100%)" }}>
      {/* Grid lines */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.08 }}>
        {[...Array(12)].map((_,i)=>(
          <line key={`v${i}`} x1={`${i*100/11}%`} y1="0" x2={`${i*100/11}%`} y2="100%"
            stroke="white" strokeWidth="0.5"/>
        ))}
        {[...Array(8)].map((_,i)=>(
          <line key={`h${i}`} x1="0" y1={`${i*100/7}%`} x2="100%" y2={`${i*100/7}%`}
            stroke="white" strokeWidth="0.5"/>
        ))}
      </svg>
      <div style={{ position:"absolute", top:"35%", left:"50%", transform:"translate(-50%,-50%)",
        width:400, height:300, borderRadius:"50%",
        background:`radial-gradient(ellipse, ${accent}18 0%, transparent 70%)`,
        filter:"blur(50px)" }}/>
    </div>
  );
}

const BG_MAP = {
  cosmos: CosmosBg,
  forest: ForestBg,
  dusk:   DuskBg,
  ocean:  OceanBg,
  void:   VoidBg,
};

// ─── 3D LINE CURSOR ─────────────────────────────────────────────────────────
function LineCursor({ mouseX, mouseY }) {
  const [lines, setLines] = useState([]);
  const trailRef = useRef([]);
  const rafRef   = useRef(null);

  useEffect(() => {
    const update = () => {
      const mx = mouseX.get();
      const my = mouseY.get();
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = mx - cx;
      const dy = my - cy;

      // 3D perspective lines radiating from center toward cursor
      const now = Date.now();
      trailRef.current.push({ x: mx, y: my, t: now });
      trailRef.current = trailRef.current.filter(p => now - p.t < 800);

      const newLines = [];
      // Primary line from center to cursor
      newLines.push({ x1: cx, y1: cy, x2: mx, y2: my, op: 0.35, w: 0.7 });
      // Depth lines at varying z-perspective offsets
      for (let i = 1; i <= 5; i++) {
        const f = i / 5;
        const shrink = 1 - f * 0.35;
        newLines.push({
          x1: cx + dx * f * 0.15 * shrink,
          y1: cy + dy * f * 0.15 * shrink,
          x2: cx + dx * shrink,
          y2: cy + dy * shrink,
          op: 0.05 + (1-f)*0.12,
          w: 0.4 - f*0.08,
        });
      }
      // Cross lines for 3D feel
      const perp = Math.sqrt(dx*dx+dy*dy);
      if (perp > 10) {
        const nx = -dy/perp * 24;
        const ny =  dx/perp * 24;
        newLines.push({ x1:mx-nx, y1:my-ny, x2:mx+nx, y2:my+ny, op:0.18, w:0.5 });
        newLines.push({ x1:mx-nx*0.5, y1:my-ny*0.5, x2:mx+nx*0.5, y2:my+ny*0.5, op:0.1, w:0.4 });
      }
      setLines(newLines);
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mouseX, mouseY]);

  return (
    <svg style={{ position:"fixed", inset:0, width:"100%", height:"100%",
                  zIndex:998, pointerEvents:"none", mixBlendMode:"screen" }}>
      {lines.map((l,i) => (
        <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="white" strokeWidth={l.w} opacity={l.op}
          strokeLinecap="round"/>
      ))}
    </svg>
  );
}

// ─── PROJECT PLANE ──────────────────────────────────────────────────────────
function ProjectPlane({ project, depth, worldZ, onDragIn }) {
  const BgComp = BG_MAP[project.bg];
  const isVisible = Math.abs(worldZ + depth) < Z_GAP * 1.6;

  return (
    <div className="z-plane" style={{ transform:`translateZ(${depth}px)` }}>
      {/* Full-screen painting */}
      <div style={{ position:"absolute", inset:0 }}>
        <BgComp accent={project.accent} />
      </div>

      {/* Vignette */}
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse 85% 85% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)",
        pointerEvents:"none" }}/>

      {/* Content card */}
      <motion.div
        initial={{ opacity:0, y:30 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
        transition={{ duration:0.6, ease:[0.25,0.46,0.45,0.94] }}
        style={{ position:"relative", zIndex:2, textAlign:"center",
                 display:"flex", flexDirection:"column", alignItems:"center", gap:"1.2rem",
                 maxWidth:520, padding:"0 2rem" }}
      >
        {/* Tag */}
        <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.6rem",
          letterSpacing:"0.22em", textTransform:"uppercase",
          color: project.accent, border:`1px solid ${project.accent}55`,
          borderRadius:2, padding:"0.2rem 0.7rem",
          background:`${project.accent}10` }}>
          {project.tag}
        </span>

        {/* Title — clickable drag-in */}
        <motion.h2
          onClick={() => onDragIn(depth)}
          whileHover={{ scale:1.04 }}
          whileTap={{ scale:0.97 }}
          style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
            fontSize:"clamp(2.2rem,5.5vw,3.8rem)", lineHeight:1.05,
            letterSpacing:"-0.025em", color:"#fff",
            cursor:"pointer", userSelect:"none",
            textShadow:`0 0 60px ${project.accent}55` }}
        >
          {project.title}
        </motion.h2>

        {/* Hairline */}
        <div style={{ width:60, height:1,
          background:`linear-gradient(90deg,transparent,${project.accent}88,transparent)` }}/>

        {/* Sub */}
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.92rem",
          lineHeight:1.75, color:"rgba(255,255,255,0.62)", maxWidth:400 }}>
          {project.sub}
        </p>

        {/* Tech pills */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", justifyContent:"center" }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem",
              borderRadius:20, padding:"0.25rem 0.8rem",
              background:`${project.accent}15`,
              color: project.accent, border:`1px solid ${project.accent}30` }}>
              {t}
            </span>
          ))}
        </div>

        {/* Link */}
        {project.href ? (
          <a href={project.href} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.68rem",
              letterSpacing:"0.18em", textTransform:"uppercase",
              color: project.accent, textDecoration:"none",
              borderBottom:`1px solid ${project.accent}60`, paddingBottom:2 }}>
            View on GitHub ↗
          </a>
        ) : (
          <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.65rem",
            color:"rgba(255,255,255,0.22)", letterSpacing:"0.1em" }}>
            in progress
          </span>
        )}

        {/* Click hint */}
        <motion.p
          animate={{ opacity:[0.3,0.7,0.3] }}
          transition={{ duration:2.5, repeat:Infinity, ease:"easeInOut" }}
          style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.55rem",
            letterSpacing:"0.22em", textTransform:"uppercase",
            color:"rgba(255,255,255,0.3)", marginTop:"0.3rem" }}>
          click title to enter →
        </motion.p>
      </motion.div>
    </div>
  );
}

// ─── ABOUT PLANE ────────────────────────────────────────────────────────────
function AboutPlane({ depth, worldZ }) {
  const isVisible = Math.abs(worldZ + depth) < Z_GAP * 1.6;
  return (
    <div className="z-plane" style={{ transform:`translateZ(${depth}px)` }}>
      {/* BG */}
      <div style={{ position:"absolute", inset:0,
        background:"linear-gradient(135deg,#0d0d1a 0%,#0a1a12 50%,#1a0d2e 100%)" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.06 }}>
          {[...Array(20)].map((_,i)=>(
            <div key={i} style={{ position:"absolute",
              left:`${Math.random()*100}%`, top:`${Math.random()*100}%`,
              width:1, height:`${20+Math.random()*40}%`,
              background:"rgba(255,255,255,0.8)", transform:"rotate(0deg)" }}/>
          ))}
        </div>
      </div>
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse 80% 80% at 50% 50%,transparent 20%,rgba(0,0,0,0.7) 100%)",
        pointerEvents:"none" }}/>

      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration:0.6 }}
        style={{ position:"relative", zIndex:2, maxWidth:760, padding:"0 2.5rem",
                 display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3.5rem", alignItems:"center" }}
      >
        <div>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.22em", textTransform:"uppercase",
            color:"rgba(167,139,250,0.6)", marginBottom:"1rem" }}>About</p>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
            fontSize:"clamp(2rem,4vw,2.8rem)", lineHeight:1.1, letterSpacing:"-0.025em",
            color:"#f1f0f5", marginBottom:"1.4rem" }}>
            Making things<br/>
            <span style={{ background:"linear-gradient(120deg,#c4b5fd,#a78bfa,#86efac)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text" }}>that actually work</span>
          </h2>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.92rem",
            lineHeight:1.82, color:"rgba(209,196,233,0.72)", marginBottom:"1rem" }}>
            First-year CS student at COEP Pune focused on full-stack dev, AI/ML, and game development.
          </p>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.85rem",
            lineHeight:1.8, color:"rgba(209,196,233,0.48)" }}>
            Recently at VHAS Sikkim — building MGNREGA audit dashboards across 6 districts.
          </p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
          {[["5+","Projects"],["2029","Graduation"],["COEP","Pune"],["∞","To build"]].map(([n,l])=>(
            <div key={l} style={{ background:"rgba(167,139,250,0.06)",
              border:"1px solid rgba(167,139,250,0.14)", borderRadius:10,
              padding:"1.4rem 1.2rem" }}>
              <p style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
                fontSize:"2rem", lineHeight:1,
                background:"linear-gradient(120deg,#c4b5fd,#86efac)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                backgroundClip:"text", marginBottom:"0.3rem" }}>{n}</p>
              <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.68rem",
                color:"rgba(196,181,253,0.45)", letterSpacing:"0.06em" }}>{l}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── BLOG PLANE ─────────────────────────────────────────────────────────────
function BlogPlane({ depth, worldZ }) {
  const isVisible = Math.abs(worldZ + depth) < Z_GAP * 1.6;
  return (
    <div className="z-plane" style={{ transform:`translateZ(${depth}px)` }}>
      {/* BG — warm paper/ink feel */}
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse 100% 100% at 50% 0%, #1a1208 0%, #0e0c06 50%, #060504 100%)" }}>
        {/* Faint ruled lines */}
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.04 }}>
          {[...Array(18)].map((_,i)=>(
            <line key={i} x1="0" y1={`${(i+1)*100/19}%`} x2="100%" y2={`${(i+1)*100/19}%`}
              stroke="#c8b090" strokeWidth="1"/>
          ))}
        </svg>
        {/* Ink bleed glow */}
        <div style={{ position:"absolute", top:"30%", left:"50%", transform:"translate(-50%,-50%)",
          width:500, height:300, borderRadius:"50%",
          background:"radial-gradient(ellipse, rgba(200,160,80,0.1) 0%, transparent 70%)",
          filter:"blur(40px)" }}/>
      </div>
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse 80% 80% at 50% 50%,transparent 25%,rgba(0,0,0,0.7) 100%)",
        pointerEvents:"none" }}/>

      <motion.div
        initial={{ opacity:0 }} animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration:0.6 }}
        style={{ position:"relative", zIndex:2, textAlign:"center",
                 display:"flex", flexDirection:"column", alignItems:"center", gap:"2rem",
                 maxWidth:600, padding:"0 2rem" }}
      >
        <div>
          <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
            letterSpacing:"0.22em", textTransform:"uppercase",
            color:"rgba(200,160,80,0.55)", marginBottom:"0.8rem" }}>Writing</p>
          <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
            fontSize:"clamp(2.2rem,5vw,3.5rem)", lineHeight:1.05,
            letterSpacing:"-0.025em", color:"#f5f0e8",
            textShadow:"0 0 60px rgba(200,160,80,0.3)" }}>
            Aadi's Archive
          </h2>
        </div>

        {/* Hairline */}
        <div style={{ width:60, height:1,
          background:"linear-gradient(90deg,transparent,rgba(200,160,80,0.6),transparent)" }}/>

        {/* Blog posts */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", width:"100%" }}>
          {BLOG_POSTS.map((post, i) => (
            <motion.a
              key={i}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity:0, x:-20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ delay: i*0.1+0.2, duration:0.5 }}
              whileHover={{ x:8, transition:{ duration:0.2 } }}
              style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                       padding:"1rem 1.4rem", textDecoration:"none",
                       background:"rgba(200,160,80,0.06)",
                       border:"1px solid rgba(200,160,80,0.14)", borderRadius:3,
                       cursor:"none", transition:"border-color 0.25s, background 0.25s" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(200,160,80,0.4)";
                e.currentTarget.style.background  = "rgba(200,160,80,0.1)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(200,160,80,0.14)";
                e.currentTarget.style.background  = "rgba(200,160,80,0.06)";
              }}
            >
              <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:500,
                fontSize:"0.95rem", color:"rgba(245,240,232,0.88)", textAlign:"left" }}>
                {post.title}
              </span>
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
                color:"rgba(200,160,80,0.5)", letterSpacing:"0.06em", flexShrink:0, marginLeft:"1rem" }}>
                {post.date}
              </span>
            </motion.a>
          ))}
        </div>

        <a href="https://patel-aaditya.github.io"
          target="_blank" rel="noopener noreferrer"
          style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.68rem",
            letterSpacing:"0.18em", textTransform:"uppercase",
            color:"rgba(200,160,80,0.7)", textDecoration:"none",
            borderBottom:"1px solid rgba(200,160,80,0.35)", paddingBottom:2 }}>
          Read all posts ↗
        </a>
      </motion.div>
    </div>
  );
}

// ─── CONTACT PLANE ──────────────────────────────────────────────────────────
function ContactPlane({ depth, worldZ }) {
  const isVisible = Math.abs(worldZ + depth) < Z_GAP * 1.6;
  return (
    <div className="z-plane" style={{ transform:`translateZ(${depth}px)` }}>
      {/* BG — back to sky, full circle */}
      <SkyBg />
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse 70% 60% at 50% 48%,transparent 30%,rgba(20,40,70,0.18) 100%)",
        pointerEvents:"none" }}/>

      <motion.div
        initial={{ opacity:0 }} animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration:0.6 }}
        style={{ position:"relative", zIndex:2, textAlign:"center",
                 display:"flex", flexDirection:"column", alignItems:"center", gap:"1.5rem",
                 maxWidth:520, padding:"0 2rem" }}
      >
        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
          letterSpacing:"0.22em", textTransform:"uppercase",
          color:"rgba(24,44,74,0.45)", marginBottom:"0.2rem" }}>
          Let's connect
        </p>
        <h2 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
          fontSize:"clamp(2.8rem,8vw,6rem)", lineHeight:0.95,
          letterSpacing:"-0.03em", color:"rgba(18,38,68,0.85)" }}>
          Get in touch
        </h2>
        <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:300,
          fontSize:"clamp(0.85rem,1.5vw,1rem)", lineHeight:1.8,
          color:"rgba(24,44,74,0.5)", maxWidth:380 }}>
          Open to internships, projects, and conversations.
          Whether it's a build idea or just a hello.
        </p>

        <div style={{ width:48, height:1, margin:"0.4rem 0",
          background:"linear-gradient(90deg,transparent,rgba(24,44,74,0.3),transparent)" }}/>

        <div style={{ display:"flex", gap:"0.9rem", flexWrap:"wrap", justifyContent:"center" }}>
          {[
            { l:"Email",    h:"mailto:aadityapatel@example.com", col:"rgba(18,38,68,0.75)" },
            { l:"GitHub",   h:"https://github.com/patel-aaditya", col:"rgba(18,38,68,0.75)" },
            { l:"LinkedIn", h:"https://linkedin.com/in/aadityapatel", col:"rgba(18,38,68,0.75)" },
            { l:"Blog",     h:"https://patel-aaditya.github.io", col:"rgba(18,38,68,0.75)" },
          ].map(({ l, h }) => (
            <a key={l} href={h}
              target={h.startsWith("http") ? "_blank" : undefined}
              rel={h.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:"0.68rem",
                letterSpacing:"0.18em", textTransform:"uppercase",
                padding:"0.65rem 1.6rem", borderRadius:2,
                border:"1px solid rgba(18,38,68,0.3)",
                color:"rgba(18,38,68,0.72)", textDecoration:"none",
                background:"transparent", transition:"all 0.25s", cursor:"none" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(18,38,68,0.08)"; e.currentTarget.style.borderColor="rgba(18,38,68,0.6)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(18,38,68,0.3)"; }}>
              {l}
            </a>
          ))}
        </div>

        <p style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
          color:"rgba(24,44,74,0.28)", letterSpacing:"0.08em", marginTop:"1rem" }}>
          © 2026 Aaditya Patel
        </p>
      </motion.div>
    </div>
  );
}

// ─── HERO PLANE ─────────────────────────────────────────────────────────────
function HeroPlane({ depth }) {
  const [typed,    setTyped]    = useState("");
  const [showSub,  setShowSub]  = useState(false);
  const full = "Aaditya Patel";

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) { clearInterval(iv); setTimeout(()=>setShowSub(true), 300); }
    }, 80);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="z-plane" style={{ transform:`translateZ(${depth}px)` }}>
      <SkyBg />
      <div style={{ position:"absolute", inset:0,
        background:"radial-gradient(ellipse 70% 60% at 50% 48%,transparent 30%,rgba(30,50,80,0.12) 100%)",
        pointerEvents:"none" }}/>

      <div style={{ position:"relative", zIndex:2, textAlign:"center",
                    display:"flex", flexDirection:"column", alignItems:"center", gap:"1rem" }}>
        {/* small greeting */}
        <motion.p
          initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2, duration:0.8 }}
          style={{ fontFamily:"'Inter',sans-serif", fontWeight:300,
            fontSize:"0.78rem", letterSpacing:"0.18em", textTransform:"uppercase",
            color:"rgba(24,44,74,0.52)" }}>
          Hi, I am
        </motion.p>

        {/* Big name */}
        <h1 style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
          fontSize:"clamp(3.5rem,10vw,8rem)", lineHeight:0.95,
          letterSpacing:"-0.03em", color:"rgba(18,38,68,0.88)",
          minWidth:"5ch", minHeight:"1em" }}>
          {typed}
          {typed.length < full.length && <span className="tcursor">|</span>}
        </h1>

        {/* Subtitle */}
        <AnimatePresence>
          {showSub && (
            <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.7 }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.8rem" }}>
              <p style={{ fontFamily:"'Inter',sans-serif", fontWeight:300,
                fontSize:"clamp(0.85rem,1.8vw,1.1rem)", letterSpacing:"0.08em",
                color:"rgba(24,44,74,0.55)" }}>
                Developer · Builder · COEP Pune · Class of&nbsp;2029
              </p>
              {/* Scroll hint */}
              <motion.div
                animate={{ y:[0,-6,0], opacity:[0.4,0.8,0.4] }}
                transition={{ duration:2.2, repeat:Infinity, ease:"easeInOut" }}
                style={{ marginTop:"2rem", display:"flex", flexDirection:"column",
                         alignItems:"center", gap:"0.4rem" }}>
                <span style={{ fontFamily:"'Inter',sans-serif", fontSize:"0.56rem",
                  letterSpacing:"0.28em", textTransform:"uppercase",
                  color:"rgba(24,44,74,0.38)" }}>scroll down</span>
                <svg width="16" height="24" viewBox="0 0 16 24" fill="none"
                  style={{ opacity:0.38 }}>
                  <path d="M8 0v20M1 14l7 8 7-8" stroke="rgba(24,44,74,0.8)"
                    strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  // Raw accumulated scroll position (in Z units)
  const rawZ    = useMotionValue(0);
  // Spring-smoothed — this is what we actually render
  const smoothZ = useSpring(rawZ, { stiffness: 55, damping: 22, mass: 0.8 });
  // What worldZ we render (for child components to know proximity)
  const [worldZ, setWorldZ] = useState(0);

  // Mouse
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth/2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight/2 : 0);
  const cursorRef = useRef(null);

  // Plane depths: hero=0, about=-Z_GAP, projects, blog, contact
  const planDepths = [
    0,
    -Z_GAP,
    ...PROJECTS.map((_,i) => -(i+2)*Z_GAP),
    -(PROJECTS.length+2)*Z_GAP, // blog
    -(PROJECTS.length+3)*Z_GAP, // contact
  ];
  const MAX_Z = -planDepths[planDepths.length-1];

  // ── Mouse tracking ──
  useEffect(() => {
    const onMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  // ── Hover cursor state ──
  const setCursorBig = useCallback((big) => {
    if (cursorRef.current) cursorRef.current.classList.toggle("big", big);
  }, []);

  // ── Wheel → rawZ ──
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();
      const next = Math.max(0, Math.min(MAX_Z, rawZ.get() + e.deltaY * SCROLL_SPEED));
      rawZ.set(next);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [rawZ, MAX_Z]);

  // ── Touch scroll ──
  useEffect(() => {
    let lastY = null;
    const onStart = (e) => { lastY = e.touches[0].clientY; };
    const onMove  = (e) => {
      if (lastY === null) return;
      const dy = (lastY - e.touches[0].clientY) * 2.2;
      lastY = e.touches[0].clientY;
      const next = Math.max(0, Math.min(MAX_Z, rawZ.get() + dy));
      rawZ.set(next);
    };
    const onEnd = () => { lastY = null; };
    window.addEventListener("touchstart", onStart, { passive:true });
    window.addEventListener("touchmove",  onMove,  { passive:true });
    window.addEventListener("touchend",   onEnd,   { passive:true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchmove",  onMove);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [rawZ, MAX_Z]);

  // ── Sync smoothZ → state + progress bar ──
  useEffect(() => {
    const unsub = smoothZ.on("change", (v) => {
      setWorldZ(v);
      const bar = document.getElementById("progress");
      if (bar) bar.style.width = `${(v / MAX_Z) * 100}%`;
    });
    return unsub;
  }, [smoothZ, MAX_Z]);

  // ── World transform: as Z increases, we move forward ──
  // smoothZ goes 0→MAX_Z; we translate world by +smoothZ so planes come to us
  const worldTransform = useTransform(smoothZ, v => `translateZ(${v}px)`);

  // ── Drag-in: when user clicks a project title ──
  const dragIn = useCallback((planeDepth) => {
    // Snap rawZ to just past this plane (enter it)
    const target = -planeDepth + Z_GAP * 0.3;
    const clamped = Math.max(0, Math.min(MAX_Z, target));
    // Animate with a quick burst
    rawZ.set(rawZ.get());
    // Temporarily stiffen spring for the "suck-in" feel
    const steps = 12;
    const start = rawZ.get();
    const diff  = clamped - start;
    let step = 0;
    const iv = setInterval(() => {
      step++;
      const t = step / steps;
      const ease = t < 0.5 ? 4*t*t*t : 1-Math.pow(-2*t+2,3)/2;
      rawZ.set(start + diff * ease);
      if (step >= steps) clearInterval(iv);
    }, 16);
  }, [rawZ, MAX_Z]);

  // ── Snap to nearest plane on scroll stop ──
  useEffect(() => {
    let snapTimeout = null;
    const unsub = rawZ.on("change", () => {
      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(() => {
        const cur = rawZ.get();
        // Find nearest plane
        const targets = planDepths.map(d => -d);
        const nearest = targets.reduce((best, t) =>
          Math.abs(t - cur) < Math.abs(best - cur) ? t : best
        , targets[0]);
        // Only snap if close enough
        if (Math.abs(nearest - cur) < Z_GAP * 0.45) {
          rawZ.set(nearest);
        }
      }, 180);
    });
    return () => { unsub(); clearTimeout(snapTimeout); };
  }, [rawZ, planDepths]);

  // Current active plane index
  const activePlane = planDepths.reduce((best, d, i) => {
    return Math.abs(-d - worldZ) < Math.abs(-planDepths[best] - worldZ) ? i : best;
  }, 0);

  const blogPlaneIdx    = PROJECTS.length + 2;
  const contactPlaneIdx = PROJECTS.length + 3;
  const sideLabels = ["Hero", "About", ...PROJECTS.map(p => p.title), "Blog", "Contact"];

  return (
    <>
      {/* ── Custom cursor ── */}
      <div id="cursor" ref={cursorRef}/>

      {/* ── 3D Line cursor ── */}
      <LineCursor mouseX={mouseX} mouseY={mouseY}/>

      {/* ── NAV ── */}
      <div id="nav">
        <button onClick={() => rawZ.set(0)}
          onMouseEnter={() => setCursorBig(true)}
          onMouseLeave={() => setCursorBig(false)}
          style={{ background:"none", border:"none", cursor:"none",
            fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
            fontSize:"0.82rem", letterSpacing:"0.18em", textTransform:"uppercase",
            color: activePlane === 0 ? "rgba(18,38,68,0.75)" : "rgba(255,255,255,0.65)",
            transition:"color 0.4s" }}>
          AP
        </button>
        <div style={{ display:"flex", gap:"2rem" }}>
          {[["About",1],["Projects",2],["Blog",blogPlaneIdx],["Contact",contactPlaneIdx]].map(([l,idx])=>(
            <button key={l}
              onClick={() => rawZ.set(-planDepths[idx])}
              onMouseEnter={() => setCursorBig(true)}
              onMouseLeave={() => setCursorBig(false)}
              style={{ background:"none", border:"none", cursor:"none",
                fontFamily:"'Inter',sans-serif", fontSize:"0.62rem",
                letterSpacing:"0.2em", textTransform:"uppercase", transition:"color 0.4s",
                color: activePlane === 0 ? "rgba(18,38,68,0.48)" : "rgba(255,255,255,0.45)" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* ── Side labels ── */}
      <div className="side-label left">{`0${activePlane+1} / 0${TOTAL_PLANES}`}</div>
      <div className="side-label right">{sideLabels[activePlane] ?? ""}</div>

      {/* ── Progress bar ── */}
      <div id="progress"/>

      {/* ── Nav dots ── */}
      <div style={{ position:"fixed", bottom:"1.8rem", left:"50%",
                    transform:"translateX(-50%)", display:"flex", gap:"0.5rem",
                    zIndex:500, alignItems:"center" }}>
        {planDepths.map((d,i) => (
          <button key={i}
            onClick={() => rawZ.set(-d)}
            onMouseEnter={() => setCursorBig(true)}
            onMouseLeave={() => setCursorBig(false)}
            style={{ width: i===activePlane ? 24 : 6, height:5, borderRadius:3, border:"none",
              cursor:"none", padding:0, transition:"all 0.3s ease",
              background: i===activePlane
                ? (activePlane===0 ? "rgba(18,38,68,0.7)" : "rgba(255,255,255,0.8)")
                : (activePlane===0 ? "rgba(18,38,68,0.2)" : "rgba(255,255,255,0.2)") }}/>
        ))}
      </div>

      {/* ── THE STAGE ── */}
      <div id="stage">
        <motion.div id="world" style={{ transform: worldTransform }}>

          {/* Hero */}
          <HeroPlane depth={planDepths[0]} />

          {/* About */}
          <AboutPlane depth={planDepths[1]} worldZ={worldZ} />

          {/* Projects — each at own Z depth with own painting */}
          {PROJECTS.map((proj, i) => (
            <ProjectPlane
              key={proj.id}
              project={proj}
              depth={planDepths[i+2]}
              worldZ={worldZ}
              onDragIn={dragIn}
            />
          ))}

          {/* Blog */}
          <BlogPlane depth={planDepths[blogPlaneIdx]} worldZ={worldZ} />

          {/* Contact */}
          <ContactPlane depth={planDepths[contactPlaneIdx]} worldZ={worldZ} />

        </motion.div>
      </div>
    </>
  );
}
