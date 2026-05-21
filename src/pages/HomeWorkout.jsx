// src/pages/HomeWorkout.jsx
// Purple-accented section with tabbed workout grid + exercise photos
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HOME_WORKOUTS } from "../data/homeWorkouts";
import ExerciseCard from "../components/ExerciseCard";

const WORKOUT_IMGS = {
  "Bodyweight Squat": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&h=240&fit=crop",
  "Push-Ups":         "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=400&h=240&fit=crop",
  "Plank":            "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=240&fit=crop",
  "Burpees":          "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=240&fit=crop",
  "Pike Push-Ups":    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=240&fit=crop",
  "Tricep Dips (Chair)":"https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=240&fit=crop",
  "Superman":         "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=240&fit=crop",
  "Inchworm":         "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&h=240&fit=crop",
  "Reverse Lunge":    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&h=240&fit=crop",
  "Glute Bridge":     "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=400&h=240&fit=crop",
  "Wall Sit":         "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=400&h=240&fit=crop",
  "Donkey Kicks":     "https://images.unsplash.com/photo-1593164842264-854604db2260?w=400&h=240&fit=crop",
  "Dead Bug":         "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=240&fit=crop",
  "Bicycle Crunches": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=240&fit=crop",
  "Hollow Body Hold": "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6?w=400&h=240&fit=crop",
  "Side Plank":       "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=240&fit=crop",
};
const DEFAULT_IMG = "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=240&fit=crop";

export default function HomeWorkout() {
  const tabs = Object.keys(HOME_WORKOUTS);
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="page-enter" style={{ paddingTop:100, paddingBottom:80 }}>
      {/* Header band */}
      <div style={{ background:"linear-gradient(135deg,rgba(139,92,246,0.08) 0%,transparent 60%)", borderBottom:"1px solid rgba(139,92,246,0.12)", padding:"60px 0 40px", marginBottom:64 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div className="label" style={{ color:"#8b5cf6", marginBottom:14 }}>No Equipment Needed</div>
            <h1 className="display-sm" style={{ marginBottom:14 }}>
              <span style={{ color:"#a78bfa" }}>Home Workout</span> Library
            </h1>
            <p style={{ color:"var(--muted)", maxWidth:520 }}>
              Zero equipment. Maximum results. Every exercise is designed to be done in your bedroom, living room, or hotel room in 20 minutes.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Tab strip */}
        <div style={{ display:"flex", gap:8, marginBottom:40, background:"rgba(255,255,255,0.03)", padding:6, borderRadius:100, width:"fit-content", border:"1px solid rgba(255,255,255,0.07)" }}>
          {tabs.map(tab => (
            <motion.button key={tab} onClick={() => setActive(tab)}
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              style={{
                padding:"10px 22px", borderRadius:100, fontSize:14, cursor:"pointer",
                fontFamily:"var(--font-body)", fontWeight: active===tab ? 700 : 500,
                background: active===tab ? "#8b5cf6" : "transparent",
                color: active===tab ? "#fff" : "var(--muted)",
                border:"none", transition:"all 0.25s",
              }}
            >{tab}</motion.button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            exit={{ opacity:0, y:-8 }}
            transition={{ duration:0.35 }}
            className="ex-grid"
          >
            {HOME_WORKOUTS[active].map((ex, i) => {
              const img = WORKOUT_IMGS[ex.name] || DEFAULT_IMG;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity:0, y:24 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay:i*0.08 }}
                  whileHover={{ y:-6 }}
                  style={{ borderRadius:"var(--r-lg)", overflow:"hidden", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", backdropFilter:"blur(20px)" }}
                >
                  <div style={{ height:180, overflow:"hidden", position:"relative" }}>
                    <img src={img} alt={ex.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(6,7,13,0.9) 0%,transparent 50%)" }} />
                    <div style={{ position:"absolute", top:12, left:12, fontSize:22, background:"rgba(6,7,13,0.55)", backdropFilter:"blur(8px)", padding:"6px 8px", borderRadius:8, border:"1px solid rgba(255,255,255,0.1)" }}>{ex.emoji}</div>
                  </div>
                  <div style={{ padding:"18px 20px" }}>
                    <h3 style={{ fontFamily:"var(--font-display)", fontSize:16, fontWeight:600, marginBottom:7 }}>{ex.name}</h3>
                    <p style={{ fontSize:13, color:"var(--muted)", marginBottom:12, lineHeight:1.55 }}>{ex.desc}</p>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      <span className="pill" style={{ background:"rgba(139,92,246,0.12)", color:"#a78bfa", fontSize:11 }}>⏱ {ex.time}</span>
                      <span className="pill" style={{ background:"rgba(0,229,160,0.10)", color:"#34d399", fontSize:11 }}>🔁 {ex.reps}</span>
                      <span className="pill" style={{ background:"rgba(255,107,107,0.10)", color:"#f87171", fontSize:11 }}>{ex.level}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
