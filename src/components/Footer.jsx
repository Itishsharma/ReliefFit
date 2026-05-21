// src/components/Footer.jsx
import { motion } from "framer-motion";

export default function Footer({ setPage }) {
  const go = (id) => { setPage(id); window.scrollTo({ top:0, behavior:"smooth" }); };

  return (
    <footer style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"48px 0 24px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:500, height:200, borderRadius:"50%", background:"radial-gradient(circle,rgba(255,59,30,0.04) 0%,transparent 70%)", pointerEvents:"none" }} />
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:40, marginBottom:40 }}>
          <div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:700, marginBottom:12 }}>
              Relief<span style={{ color:"#ff3b1e" }}>Fit</span>
            </div>
            <p style={{ fontSize:13, color:"var(--muted)", maxWidth:240, lineHeight:1.8 }}>
              Pain-free movement for every body — every age, every lifestyle.
            </p>
          </div>
          {[
            { title:"Platform", links:[["home","Home"],["routine","Daily Routine"],["home-workout","Workouts"],["gym","Gym"],["progress","Progress"]] },
            { title:"Body Areas", links:[["home","Neck & Back"],["home","Shoulders"],["home","Hips & Knees"],["home","Eyes & Head"]] },
            { title:"Membership", links:[["premium","Free Plan"],["premium","Pro · $12/mo"],["premium","Elite Plan"],["premium","Book Physio"]] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontFamily:"var(--font-display)", fontSize:12, fontWeight:600, marginBottom:16, opacity:0.4, letterSpacing:2, textTransform:"uppercase" }}>{col.title}</div>
              <ul style={{ listStyle:"none" }}>
                {col.links.map(([id,label]) => (
                  <li key={label} style={{ marginBottom:10 }}>
                    <a onClick={() => go(id)} style={{ fontSize:13, color:"var(--muted)", cursor:"pointer", transition:"color 0.25s" }}
                      onMouseOver={e => e.target.style.color="#ff5a3b"}
                      onMouseOut={e => e.target.style.color="var(--muted)"}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12, color:"var(--muted)", flexWrap:"wrap", gap:10 }}>
          <span>© 2025 ReliefFit. For every body, everywhere.</span>
          <span style={{ color:"rgba(255,59,30,0.5)" }}>Move · Recover · Thrive</span>
        </div>
      </div>
    </footer>
  );
}
