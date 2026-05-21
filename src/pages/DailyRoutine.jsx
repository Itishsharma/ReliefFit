// src/pages/DailyRoutine.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ROUTINES } from "../data/routine";
import { MEALS } from "../data/diet";

const MEAL_IMGS = {
  "🍃":"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=160&fit=crop",
  "🫓":"https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&h=160&fit=crop",
  "🥜":"https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=300&h=160&fit=crop",
  "🍛":"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=160&fit=crop",
  "☕":"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=300&h=160&fit=crop",
  "🍲":"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=160&fit=crop",
  "🍌":"https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=160&fit=crop",
  "🥥":"https://images.unsplash.com/photo-1580984969071-a8da5656c2fb?w=300&h=160&fit=crop",
};

const AGE_GROUPS = [
  { key:"young", label:"Below 22", sublabel:"Student", icon:"🎓" },
  { key:"adult", label:"23 – 60",  sublabel:"Working", icon:"💼" },
  { key:"senior",label:"60+",      sublabel:"Senior",  icon:"🧓" },
];

export default function DailyRoutine() {
  const [ageGroup, setAgeGroup] = useState(null);
  const routine = ageGroup ? ROUTINES[ageGroup] : null;

  return (
    <div className="page-enter" style={{ paddingTop:80, paddingBottom:80 }}>
      {/* Header band */}
      <div className="band-green" style={{ padding:"60px 0 48px", marginBottom:60 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div className="label" style={{ color:"var(--accent)", marginBottom:14 }}>24-Hour Blueprint</div>
            <h1 className="display-sm" style={{ marginBottom:14 }}>
              The <span className="green-text">Perfect Day</span> — Personalised for You
            </h1>
            <p style={{ color:"var(--muted)", fontSize:16, maxWidth:560 }}>
              Your daily routine is not one-size-fits-all. Tell us your life stage and we'll show you a routine that actually fits your schedule and body's needs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Age group selector */}
        <div style={{ marginBottom:56 }}>
          <h2 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:700, marginBottom:6 }}>First — What's your life stage?</h2>
          <p style={{ color:"var(--muted)", fontSize:14, marginBottom:28 }}>Your routine adapts to your actual available hours, not an imaginary perfect day.</p>
          <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
            {AGE_GROUPS.map(ag => (
              <motion.button
                key={ag.key}
                whileHover={{ scale:1.03 }}
                whileTap={{ scale:0.97 }}
                onClick={() => setAgeGroup(ag.key)}
                style={{
                  padding:"20px 32px", borderRadius:"var(--r-lg)", cursor:"pointer",
                  background: ageGroup===ag.key ? "rgba(109,184,109,0.15)" : "var(--glass)",
                  border: ageGroup===ag.key ? "1px solid var(--accent)" : "1px solid var(--border)",
                  backdropFilter:"blur(20px)",
                  textAlign:"left", minWidth:180,
                  transition:"all 0.3s ease",
                }}
              >
                <div style={{ fontSize:32, marginBottom:10 }}>{ag.icon}</div>
                <div style={{ fontFamily:"var(--font-head)", fontSize:20, fontWeight:700, marginBottom:2 }}>{ag.label}</div>
                <div style={{ fontSize:12, color:"var(--muted)" }}>{ag.sublabel}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Routine timeline */}
        <AnimatePresence mode="wait">
          {routine && (
            <motion.div
              key={ageGroup}
              initial={{ opacity:0, y:24 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-16 }}
              transition={{ duration:0.5 }}
            >
              {/* Routine header */}
              <div style={{ padding:"24px 28px", borderRadius:"var(--r-lg)", marginBottom:36, background:`rgba(${ageGroup==="young"?"82,133,224":ageGroup==="adult"?"109,184,109":"212,169,42"},0.1)`, border:`1px solid rgba(${ageGroup==="young"?"82,133,224":ageGroup==="adult"?"109,184,109":"212,169,42"},0.2)`, backdropFilter:"blur(20px)" }}>
                <div style={{ fontFamily:"var(--font-head)", fontSize:20, fontWeight:700, marginBottom:4, color:routine.color }}>{routine.label} Routine</div>
                <div style={{ fontSize:14, color:"var(--muted)" }}>{routine.desc}</div>
              </div>

              {/* Timeline */}
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", left:23, top:0, bottom:0, width:2, background:`linear-gradient(to bottom,${routine.color},rgba(255,255,255,0.05),transparent)` }} />
                {routine.schedule.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity:0, x:-20 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay:i*0.04, duration:0.4 }}
                    style={{ display:"flex", gap:24, marginBottom:24 }}
                  >
                    <div style={{ width:48, height:48, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, zIndex:1, border:`1px solid ${item.important ? routine.color : "rgba(255,255,255,0.1)"}`, background: item.important ? `rgba(${ageGroup==="young"?"82,133,224":ageGroup==="adult"?"109,184,109":"212,169,42"},0.15)` : "var(--bg2)", backdropFilter:"blur(12px)" }}>
                      {item.icon}
                    </div>
                    <motion.div
                      whileHover={{ borderColor:item.important ? routine.color : "rgba(255,255,255,0.18)" }}
                      style={{ background:"var(--glass)", border:`1px solid ${item.important ? routine.color+"44" : "var(--border)"}`, borderRadius:"var(--r)", padding:"18px 22px", flex:1, backdropFilter:"blur(16px)" }}
                    >
                      <div style={{ fontSize:11, fontWeight:700, letterSpacing:2, color:routine.color, textTransform:"uppercase", marginBottom:5 }}>{item.time}</div>
                      <div style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, marginBottom:5, display:"flex", alignItems:"center", gap:8 }}>
                        {item.title}
                        {item.important && <span style={{ fontSize:9, padding:"2px 8px", borderRadius:100, background:`${routine.color}22`, color:routine.color, fontFamily:"var(--font-body)", fontWeight:700, letterSpacing:1, textTransform:"uppercase" }}>Key Habit</span>}
                      </div>
                      <div style={{ fontSize:13, color:"var(--muted)", lineHeight:1.65 }}>{item.desc}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {!routine && (
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ textAlign:"center", padding:"60px 0", color:"var(--muted)" }}>
              <div style={{ fontSize:64, marginBottom:16 }}>👆</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:20, marginBottom:8 }}>Select your life stage above</div>
              <div style={{ fontSize:14 }}>Your personalised daily routine will appear here</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meal Plan */}
        <div style={{ marginTop:96 }}>
          <div className="label" style={{ color:"var(--gold)", marginBottom:14 }}>Fuel Your Body</div>
          <h2 className="display-sm" style={{ marginBottom:14 }}>Indian Vegetarian Meal Plan</h2>
          <p style={{ color:"var(--muted)", maxWidth:560, marginBottom:40 }}>
            Pure vegetarian, rooted in Ayurvedic principles. These are the foods that have kept Indians healthy for thousands of years — now backed by modern nutritional science.
          </p>
          <div className="diet-grid">
            {MEALS.map((meal, i) => (
              <motion.div
                key={i}
                initial={{ opacity:0, y:24 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.07 }}
                whileHover={{ y:-5, borderColor:"rgba(212,169,42,0.25)" }}
                style={{ background:"var(--glass)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", overflow:"hidden", backdropFilter:"blur(16px)" }}
              >
                <div style={{ height:140, overflow:"hidden", position:"relative" }}>
                  <img src={MEAL_IMGS[meal.emoji]||MEAL_IMGS["🍛"]} alt={meal.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,12,10,0.9),transparent 50%)" }} />
                  <div style={{ position:"absolute", top:10, left:10, fontSize:24, background:"rgba(10,12,10,0.6)", backdropFilter:"blur(8px)", padding:"5px 8px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)" }}>{meal.emoji}</div>
                </div>
                <div style={{ padding:18 }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:2, color:"var(--gold)", textTransform:"uppercase", marginBottom:7 }}>{meal.label}</div>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:15, fontWeight:700, marginBottom:6 }}>{meal.name}</div>
                  <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.55, marginBottom:12 }}>{meal.desc}</div>
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {meal.macros.map((m,j) => <span key={j} style={{ fontSize:10, fontWeight:600, padding:"3px 10px", borderRadius:100, background:"rgba(212,169,42,0.1)", color:"#d4a92a" }}>{m}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
