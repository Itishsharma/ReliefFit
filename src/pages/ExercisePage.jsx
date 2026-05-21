// src/pages/ExercisePage.jsx
import { motion } from "framer-motion";
import EXERCISES from "../data/exercises";
import ExerciseCard from "../components/ExerciseCard";

const ACCENT_MAP = {
  neck:"#ff3b3b", back:"#ff7b3b", shoulders:"#f59e0b",
  wrists:"#10b981", hips:"#8b5cf6", knees:"#3b82f6",
  calves:"#06b6d4", eyes:"#ec4899",
};

export default function ExercisePage({ bodyPart, setPage }) {
  const data = EXERCISES[bodyPart] || EXERCISES.neck;
  const accent = ACCENT_MAP[bodyPart] || "#ff3b3b";

  return (
    <div className="page-enter" style={{ paddingTop:100, paddingBottom:80 }}>
      <div className="container">
        {/* Back */}
        <motion.div
          whileHover={{ x:-4 }}
          onClick={() => { setPage("home"); window.scrollTo(0,0); }}
          style={{ display:"inline-flex", alignItems:"center", gap:8, color:"var(--muted)", fontSize:13, marginBottom:36, cursor:"pointer" }}
        >
          ← Back to Home
        </motion.div>

        {/* Header */}
        <div style={{ marginBottom:52, position:"relative" }}>
          <div style={{ position:"absolute", top:-40, left:-40, width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle,${accent}18 0%,transparent 70%)`, pointerEvents:"none" }} />
          <div className="label" style={{ marginBottom:14, color:accent }}>Targeted Relief</div>
          <h1 className="display-sm" style={{ marginBottom:14 }}>{data.label} Exercises</h1>
          <p style={{ color:"var(--muted)", fontSize:16, maxWidth:540 }}>
            {data.exercises.length} expert-selected exercises to relieve {data.label.toLowerCase()} pain. No equipment, no gym — start right now.
          </p>
        </div>

        {/* Grid */}
        <div className="ex-grid">
          {data.exercises.map((ex, i) => (
            <ExerciseCard key={ex.id} ex={ex} delay={i*0.1} />
          ))}
        </div>

        <motion.div
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ marginTop:56, textAlign:"center" }}
        >
          <button className="btn-glow btn" onClick={() => { setPage("home-workout"); window.scrollTo(0,0); }}
            style={{ fontSize:15, padding:"16px 36px" }}>
            See Full Home Workout Library →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
