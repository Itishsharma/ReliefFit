// src/components/ExerciseCard.jsx
// Glassmorphic card with exercise photo from Unsplash
import { motion } from "framer-motion";

// Curated Unsplash exercise images by keyword
const IMG_MAP = {
  "🧘": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop",
  "🤸": "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=240&fit=crop",
  "🔄": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop",
  "💆": "https://images.unsplash.com/photo-1540206395-68808572332f?w=400&h=240&fit=crop",
  "🐱": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=240&fit=crop",
  "🙆": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=240&fit=crop",
  "🦸": "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=240&fit=crop",
  "😇": "https://images.unsplash.com/photo-1593164842264-854604db2260?w=400&h=240&fit=crop",
  "🚪": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=240&fit=crop",
  "🤲": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=240&fit=crop",
  "🙏": "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=240&fit=crop",
  "🦢": "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=400&h=240&fit=crop",
  "🌉": "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=400&h=240&fit=crop",
  "🏃": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=240&fit=crop",
  "🦿": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=240&fit=crop",
  "🏋️": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=240&fit=crop",
  "👀": "https://images.unsplash.com/photo-1562564055-71e051d33c19?w=400&h=240&fit=crop",
  "🔭": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
  "default": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=240&fit=crop",
};

export default function ExerciseCard({ ex, delay=0 }) {
  const img = IMG_MAP[ex.emoji] || IMG_MAP.default;

  return (
    <motion.div
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.55, delay, ease:[0.4,0,0.2,1] }}
      whileHover={{ y:-6 }}
      style={{
        borderRadius:"var(--r-lg)", overflow:"hidden",
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        backdropFilter:"blur(20px)",
        transition:"border-color 0.3s",
      }}
    >
      {/* Photo */}
      <div style={{ position:"relative", height:190, overflow:"hidden" }}>
        <img src={img} alt={ex.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}
          onError={e => { e.target.src = IMG_MAP.default; }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(6,7,13,0.9) 0%,transparent 50%)" }} />
        {/* Emoji badge */}
        <div style={{ position:"absolute", top:14, left:14, fontSize:24,
          background:"rgba(6,7,13,0.6)", backdropFilter:"blur(10px)",
          padding:"8px 10px", borderRadius:10, border:"1px solid rgba(255,255,255,0.1)" }}>
          {ex.emoji}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"20px 22px" }}>
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:600, marginBottom:8 }}>{ex.name}</h3>
        <p style={{ fontSize:13, color:"var(--muted)", marginBottom:14, lineHeight:1.6 }}>{ex.desc}</p>

        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom: ex.steps ? 16 : 0 }}>
          <span className="pill" style={{ background:"rgba(59,130,246,0.12)", color:"#60a5fa", fontSize:11 }}>⏱ {ex.time}</span>
          <span className="pill" style={{ background:"rgba(0,229,160,0.10)", color:"#34d399", fontSize:11 }}>🔁 {ex.reps}</span>
          <span className="pill" style={{ background:"rgba(255,107,107,0.10)", color:"#f87171", fontSize:11 }}>{ex.level}</span>
        </div>

        {ex.steps && (
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:14 }}>
            {ex.steps.map((s, i) => (
              <div key={i} style={{ display:"flex", gap:10, marginBottom:7, alignItems:"flex-start" }}>
                <div style={{ width:18, height:18, borderRadius:"50%", background:"rgba(255,91,59,0.2)", color:"#ff5b3b", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>{i+1}</div>
                <span style={{ fontSize:12, color:"var(--muted)", lineHeight:1.5 }}>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
