// src/components/FeaturesStrip.jsx
// Animated horizontal ticker + 4 glass stat cards
import { motion } from "framer-motion";

const TICKER_ITEMS = ["Neck Pain","Back Pain","Shoulder Tension","Wrist Strain","Hip Tightness","Knee Aches","Calf Cramps","Eye Fatigue","Sciatica","Frozen Shoulder","Carpal Tunnel","Piriformis","Tech Neck","Runner\'s Knee"];
const CARDS = [
  { icon:"🎯", num:"8",    unit:"Body Areas",    desc:"Fully covered with exercises" },
  { icon:"⚡", num:"200+", unit:"Exercises",      desc:"No equipment ever needed" },
  { icon:"🧑‍⚕️", num:"100%", unit:"Expert Backed", desc:"Reviewed by physios" },
  { icon:"⏱",  num:"5",    unit:"Minutes",        desc:"To start feeling better" },
];

export default function FeaturesStrip() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{ padding:"0 0 0", overflow:"hidden" }}>
      {/* Ticker */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"18px 0", overflow:"hidden", position:"relative" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:60, background:"linear-gradient(90deg,var(--bg),transparent)", zIndex:1 }} />
        <div style={{ position:"absolute", right:0, top:0, bottom:0, width:60, background:"linear-gradient(-90deg,var(--bg),transparent)", zIndex:1 }} />
        <motion.div
          animate={{ x:["0%","-50%"] }}
          transition={{ duration:28, ease:"linear", repeat:Infinity }}
          style={{ display:"flex", gap:0, width:"max-content" }}
        >
          {doubled.map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:0, whiteSpace:"nowrap" }}>
              <span style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,0.35)", padding:"0 28px" }}>{item}</span>
              <span style={{ color:"rgba(255,59,59,0.5)", fontSize:8 }}>●</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stat cards */}
      <div className="container" style={{ padding:"72px 28px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
          {CARDS.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:24 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ duration:0.5, delay:i*0.1 }}
              whileHover={{ y:-4 }}
              style={{
                background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)",
                borderRadius:"var(--r-lg)", padding:"28px 24px",
                backdropFilter:"blur(20px)",
              }}
            >
              <div style={{ fontSize:32, marginBottom:16 }}>{c.icon}</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:38, fontWeight:700, color:"#ff5a3b", lineHeight:1 }}>{c.num}</div>
              <div style={{ fontSize:15, fontWeight:600, marginBottom:4, marginTop:4 }}>{c.unit}</div>
              <div style={{ fontSize:13, color:"var(--muted)" }}>{c.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
