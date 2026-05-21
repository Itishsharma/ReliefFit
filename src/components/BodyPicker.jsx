// src/components/BodyPicker.jsx
// Glassmorphic body part selector with hover glow effects
import { motion } from "framer-motion";

const PARTS = [
  { key:"neck",      icon:"🫀", name:"Neck & Cervical",  desc:"Stiffness · Headaches · Screen neck", color:"#ff3b3b", hot:true },
  { key:"back",      icon:"🦴", name:"Back & Spine",      desc:"Lower back · Disc pain · Posture",     color:"#ff7b3b", hot:true },
  { key:"shoulders", icon:"💪", name:"Shoulders",         desc:"Frozen · Rotator cuff · Tension",      color:"#f59e0b", hot:false },
  { key:"wrists",    icon:"✋", name:"Wrists & Hands",    desc:"Carpal tunnel · Typing strain",        color:"#10b981", hot:false },
  { key:"hips",      icon:"🍑", name:"Hips & Glutes",    desc:"Hip flexors · Sciatica · Piriformis",  color:"#8b5cf6", hot:true },
  { key:"knees",     icon:"🦵", name:"Knees & Quads",    desc:"Runner\'s knee · Joint pain · Clicks",  color:"#3b82f6", hot:false },
  { key:"calves",    icon:"🦶", name:"Calves & Ankles",  desc:"Tightness · Cramps · Circulation",     color:"#06b6d4", hot:false },
  { key:"eyes",      icon:"👁️", name:"Eyes & Head",       desc:"Screen strain · Migraines · Fatigue",  color:"#ec4899", hot:true },
];

const container = { hidden:{}, show:{ transition:{ staggerChildren:0.06 } } };
const item = { hidden:{ opacity:0, y:30 }, show:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.4,0,0.2,1] } } };

export default function BodyPicker({ setPage, setBodyPart }) {
  const pick = (key) => {
    setBodyPart(key);
    setPage("exercises");
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  return (
    <section id="pain-picker" style={{ padding:"110px 0", position:"relative" }}>
      {/* Section accent orb */}
      <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,59,59,0.06) 0%,transparent 70%)", pointerEvents:"none" }} />

      <div className="container">
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <div className="label" style={{ marginBottom:16, color:"rgba(255,59,59,0.8)" }}>Pain Finder</div>
          <h2 className="display-sm" style={{ marginBottom:16 }}>Where Does It Hurt?</h2>
          <p style={{ fontSize:16, color:"var(--muted)", maxWidth:520 }}>
            Tap the area giving you trouble. We'll give you instant, targeted relief — no gym, no equipment, no excuses.
          </p>
        </motion.div>

        <motion.div
          variants={container} initial="hidden" whileInView="show" viewport={{ once:true }}
          style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:16, marginTop:52 }}
        >
          {PARTS.map((p) => (
            <motion.div
              key={p.key}
              variants={item}
              whileHover={{ scale:1.04, y:-6 }}
              whileTap={{ scale:0.97 }}
              onClick={() => pick(p.key)}
              style={{
                position:"relative", borderRadius:"var(--r-lg)", padding:"28px 24px",
                cursor:"pointer", overflow:"hidden",
                background:"rgba(255,255,255,0.03)",
                border:`1px solid rgba(255,255,255,0.08)`,
                backdropFilter:"blur(20px)",
                transition:"border-color 0.3s ease",
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = p.color + "55"}
              onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
            >
              {/* Inner glow */}
              <div style={{ position:"absolute", top:-40, right:-40, width:120, height:120, borderRadius:"50%", background:`radial-gradient(circle,${p.color}22 0%,transparent 70%)`, pointerEvents:"none" }} />

              {p.hot && (
                <span style={{ position:"absolute", top:14, right:14, fontSize:10, fontWeight:700, letterSpacing:1,
                  padding:"3px 8px", borderRadius:100, background:"rgba(255,59,59,0.15)", color:"#ff5a5a", textTransform:"uppercase" }}>
                  Common
                </span>
              )}

              <div style={{ fontSize:40, marginBottom:16 }}>{p.icon}</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:600, marginBottom:6 }}>{p.name}</div>
              <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.5 }}>{p.desc}</div>

              {/* Bottom accent line */}
              <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,${p.color},transparent)`, opacity:0.6 }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
