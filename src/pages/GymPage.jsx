// src/pages/GymPage.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GYM_WORKOUTS } from "../data/gym";

const CATEGORIES = ["All","Warmup","Push","Pull","Legs","Core"];
const GYM_IMGS = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1517963879433-6ad2a51bec5e?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1517344800994-80b20463999c?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1543781542-aa15a94c1b25?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1517963879433-6ad2a51bec5e?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=220&fit=crop",
  "https://images.unsplash.com/photo-1517344800994-80b20463999c?w=400&h=220&fit=crop",
];
const BADGE_COLORS = { Warmup:"#fbbf24", Push:"#f87171", Pull:"#60a5fa", Legs:"#34d399", Core:"#a78bfa" };

export default function GymPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? GYM_WORKOUTS : GYM_WORKOUTS.filter(w => w.category === active);

  return (
    <div className="page-enter" style={{ paddingTop:100, paddingBottom:80 }}>
      <div style={{ background:"linear-gradient(135deg,rgba(59,130,246,0.08) 0%,transparent 60%)", borderBottom:"1px solid rgba(59,130,246,0.12)", padding:"60px 0 40px", marginBottom:56 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <div className="label" style={{ color:"#3b82f6", marginBottom:14 }}>Equipment Training</div>
            <h1 className="display-sm" style={{ marginBottom:14 }}>
              <span style={{ color:"#60a5fa" }}>Gym Workouts</span> — Warmup to Cool Down
            </h1>
            <p style={{ color:"var(--muted)", maxWidth:520 }}>
              Structured by category — start with warmup, then pick Push / Pull / Legs / Core splits. Every exercise targets the muscle imbalances that cause chronic pain.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Category filter */}
        <div style={{ display:"flex", gap:8, marginBottom:36, flexWrap:"wrap" }}>
          {CATEGORIES.map(cat => (
            <motion.button key={cat} onClick={() => setActive(cat)}
              whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              style={{ padding:"9px 20px", borderRadius:100, fontSize:13, cursor:"pointer", fontFamily:"var(--font-body)",
                fontWeight: active===cat ? 700 : 500,
                background: active===cat ? (BADGE_COLORS[cat] || "#fff") : "rgba(255,255,255,0.04)",
                color: active===cat ? "#000" : "var(--muted)",
                border: active===cat ? "none" : "1px solid rgba(255,255,255,0.08)",
                transition:"all 0.25s",
              }}>{cat}</motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            transition={{ duration:0.3 }}
            style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:20 }}>
            {filtered.map((w, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.07 }}
                whileHover={{ y:-6 }}
                style={{ borderRadius:"var(--r-lg)", overflow:"hidden", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(20px)" }}>
                <div style={{ height:200, overflow:"hidden", position:"relative" }}>
                  <img src={GYM_IMGS[i % GYM_IMGS.length]} alt={w.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(6,7,13,1) 0%,rgba(6,7,13,0.3) 60%,transparent)" }} />
                  <div style={{ position:"absolute", top:12, left:12 }}>
                    <span style={{ fontSize:11, fontWeight:800, letterSpacing:1, textTransform:"uppercase", padding:"4px 10px", borderRadius:100, background:BADGE_COLORS[w.category]||"#fff", color:"#000" }}>{w.badge||w.category}</span>
                  </div>
                  <div style={{ position:"absolute", top:12, right:12, fontSize:28 }}>{w.icon}</div>
                  <div style={{ position:"absolute", bottom:14, left:14, fontSize:12, fontWeight:700, color:"#60a5fa" }}>{w.muscle}</div>
                </div>
                <div style={{ padding:"18px 20px" }}>
                  <h3 style={{ fontFamily:"var(--font-display)", fontSize:18, fontWeight:700, marginBottom:7 }}>{w.title}</h3>
                  <p style={{ fontSize:13, color:"var(--muted)", marginBottom:12, lineHeight:1.6 }}>{w.desc}</p>
                  <div style={{ fontSize:11, color:"#60a5fa", fontWeight:600, marginBottom:10 }}>⚙ {w.equipment}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
                    {w.sets.map((s,j) => <span key={j} style={{ fontSize:11, padding:"4px 10px", borderRadius:100, border:"1px solid rgba(59,130,246,0.2)", color:"var(--muted)" }}>{s}</span>)}
                  </div>
                  <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.6, padding:11, background:"rgba(59,130,246,0.05)", borderRadius:9, border:"1px solid rgba(59,130,246,0.12)" }}>💡 {w.tips}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
