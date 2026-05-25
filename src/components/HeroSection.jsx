import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

const COLUMNS = [
  { opacity: 0.0, color: "rgba(10,12,10,1)" },
  { opacity: 0.15, color: "rgba(26,46,26,0.6)" },
  { opacity: 0.35, color: "rgba(45,74,45,0.75)" },
  { opacity: 0.55, color: "rgba(74,124,74,0.6)" },
  { opacity: 0.35, color: "rgba(45,74,45,0.75)" },
  { opacity: 0.20, color: "rgba(26,46,26,0.6)" },
  { opacity: 0.08, color: "rgba(10,12,10,0.9)" },
];

const FloatingCard = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 40, rotate: -2 }}
    animate={{ opacity: 1, scale: 1, y: 0, rotate: -1 }}
    transition={{ duration: 1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: "absolute", right: "8%", top: "18%",
      width: 340, borderRadius: 14,
      background: "rgba(20,26,20,0.85)",
      border: "1px solid rgba(109,184,109,0.25)",
      backdropFilter: "blur(20px)",
      overflow: "hidden",
      boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
    }}
  >
    {/* Card header bar */}
    <div style={{ background: "rgba(26,46,26,0.9)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ display: "flex", gap: 5 }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
      </div>
      <div style={{ flex:1, background:"rgba(0,0,0,0.3)", borderRadius:6, height:20, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:1 }}>relieffit.in</span>
      </div>
    </div>
    {/* Card body - simulated website */}
    <div style={{ padding: "16px" }}>
      <div style={{ display:"flex", gap:8, marginBottom:12 }}>
        {["Neck","Back","Hips","Knees"].map(t => (
          <div key={t} style={{ fontSize:8, padding:"3px 8px", borderRadius:100, background:"rgba(109,184,109,0.15)", border:"1px solid rgba(109,184,109,0.25)", color:"#8fd68f" }}>{t}</div>
        ))}
      </div>
      <div style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:800, lineHeight:1.2, marginBottom:8 }}>
        Find Your<br /><span style={{ color:"#6db86d" }}>Pain Area</span>
      </div>
      <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", marginBottom:14, lineHeight:1.5 }}>
        Select where it hurts — get instant targeted exercises from certified physiotherapists
      </div>
      <div style={{ height:80, borderRadius:10, background:"linear-gradient(135deg,rgba(26,46,26,0.8),rgba(45,74,45,0.4))", display:"flex", alignItems:"center", justifyContent:"center", gap:16, border:"1px solid rgba(109,184,109,0.15)" }}>
        {["🫀","🦴","💪","🍑","🦶"].map(e => (
          <div key={e} style={{ fontSize:20, filter:"drop-shadow(0 2px 8px rgba(109,184,109,0.3))" }}>{e}</div>
        ))}
      </div>
    </div>
    {/* Arrow badge */}
    <div style={{ position:"absolute", bottom:12, right:12, width:28, height:28, borderRadius:8, background:"var(--white)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>↗</div>
  </motion.div>
);

// Counters
const Counter = ({ end, label, delay }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const step = Math.ceil(end / 60);
      const interval = setInterval(() => {
        start += step;
        if (start >= end) { setCount(end); clearInterval(interval); }
        else setCount(start);
      }, 25);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [end, delay]);
  return (
    <div>
      <div style={{ fontFamily:"var(--font-head)", fontSize:36, fontWeight:800, color:"var(--accent)", lineHeight:1 }}>{count}+</div>
      <div style={{ fontSize:12, color:"var(--muted)", marginTop:3 }}>{label}</div>
    </div>
  );
};

// Scrolling words
const WORDS = ["Neck Pain", "Back Aches", "Hip Stiffness", "Knee Soreness", "Wrist Strain", "Shoulder Tension", "Eye Fatigue", "Sciatica"];

export default function HeroSection({ setPage }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y   = useTransform(scrollYProgress, [0,1], [0, 180]);
  const op  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i+1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={{ minHeight: "100vh", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 64 }}>

      {/* Background: Vertical columns */}
      <div style={{ position: "absolute", inset: 0, display: "flex" }}>
        {COLUMNS.map((col, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: col.opacity > 0 ? 1 : 0 }}
            transition={{ duration: 1.2, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: 1, height: "100%",
              background: col.color,
              transformOrigin: "top",
            }}
          />
        ))}
        {/* Noise grain */}
        <div style={{ position:"absolute", inset:0, background:"url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"n\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"4\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23n)\" opacity=\"0.05\"/%3E%3C/svg%3E')", backgroundSize:"150px", opacity:0.6, pointerEvents:"none" }} />
        {/* Radial gradient center fade */}
        <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 60% at 50% 40%, transparent 20%, rgba(10,12,10,0.5) 100%)", pointerEvents:"none" }} />
        {/* Bottom fade to dark */}
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:300, background:"linear-gradient(to top, var(--bg) 20%, transparent)", pointerEvents:"none" }} />
        {/* Top fade */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:200, background:"linear-gradient(to bottom, rgba(10,12,10,0.7), transparent)", pointerEvents:"none" }} />
      </div>

      {/* Floating card top right */}
      <FloatingCard />

      {/* Animated scan line */}
      <motion.div
        style={{
          position:"absolute", left:0, right:0, height:1,
          background:"linear-gradient(90deg,transparent,rgba(109,184,109,0.4),transparent)",
          top: useTransform(scrollYProgress, [0,1], ["10%","100%"]),
          opacity: useTransform(scrollYProgress, [0,0.8], [0.6, 0]),
          pointerEvents:"none",
        }}
      />

      {/* Content: bottom-left */}
      <motion.div style={{ y, opacity: op, position:"relative", zIndex:5 }}>
        <div className="container">

          {/* Animated word badge */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.8, duration:0.6 }}
            style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:28 }}
          >
            <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--accent)", animation:"pulse 2s infinite" }} />
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ y:14, opacity:0 }}
                animate={{ y:0, opacity:1 }}
                exit={{ y:-14, opacity:0 }}
                transition={{ duration:0.4, ease:[0.4,0,0.2,1] }}
                style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:600, color:"var(--muted)", letterSpacing:0.3 }}
              >
                {WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontSize:15, color:"var(--muted)" }}>→ Fixed.</span>
          </motion.div>

          {/* Main headline — large, bottom-left */}
          <div style={{ overflow:"hidden", marginBottom:4 }}>
            <motion.h1
              className="display"
              initial={{ y:"110%" }}
              animate={{ y:0 }}
              transition={{ duration:0.9, delay:0.5, ease:[0.22,1,0.36,1] }}
              style={{ color:"var(--white)" }}
            >
              Your body
            </motion.h1>
          </div>
          <div style={{ overflow:"hidden", marginBottom:4 }}>
            <motion.h1
              className="display"
              initial={{ y:"110%" }}
              animate={{ y:0 }}
              transition={{ duration:0.9, delay:0.65, ease:[0.22,1,0.36,1] }}
              style={{ color:"var(--muted)", fontStyle:"italic" }}
            >
              deserves
            </motion.h1>
          </div>
          <div style={{ overflow:"hidden", marginBottom:40 }}>
            <motion.h1
              className="display"
              initial={{ y:"110%" }}
              animate={{ y:0 }}
              transition={{ duration:0.9, delay:0.8, ease:[0.22,1,0.36,1] }}
              style={{ color:"var(--white)" }}
            >
              to feel free.
            </motion.h1>
          </div>

          {/* CTA row like CleverMellow's "ONTDEK MEER →" */}
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:1.1, duration:0.6 }}
            style={{ display:"flex", alignItems:"center", gap:16 }}
          >
            <button
              className="btn btn-primary"
              style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", padding:"14px 24px" }}
              onClick={() => document.getElementById("pain-picker")?.scrollIntoView({ behavior:"smooth" })}
            >
              Explore →
            </button>
            <span style={{ fontSize:13, color:"var(--muted)" }}>Select your pain area below</span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:1.5, duration:0.8 }}
            style={{ display:"flex", gap:48, marginTop:52, paddingTop:36, borderTop:"1px solid rgba(255,255,255,0.07)", flexWrap:"wrap" }}
          >
            <Counter end={8}   label="Body areas covered" delay={1.5} />
            <Counter end={200} label="Targeted exercises"  delay={1.7} />
            <Counter end={50}  label="Yoga asanas included" delay={1.9} />
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:2, duration:0.8 }}
        style={{ position:"absolute", bottom:24, right:36, display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:5 }}
      >
        <span style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color:"var(--muted)" }}>Scroll</span>
        <motion.div
          animate={{ y:[0,8,0] }}
          transition={{ duration:1.6, repeat:Infinity, ease:"easeInOut" }}
          style={{ width:1, height:36, background:"linear-gradient(to bottom,rgba(109,184,109,0.8),transparent)" }}
        />
      </motion.div>
      <style>{`@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}`}</style>
    </section>
  );
}
