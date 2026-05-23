// src/pages/Progress.jsx — Firebase-backed progress tracker
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth }     from "../context/AuthContext";
import { useProgress } from "../hooks/useProgress";

// ── League definitions ──────────────────────────────────────────
const LEAGUES = [
  { name:"Bronze",    icon:"🥉", weeks:1,  color:"#cd7f32", glow:"rgba(205,127,50,0.35)"  },
  { name:"Silver",    icon:"🥈", weeks:2,  color:"#c0c0c0", glow:"rgba(192,192,192,0.3)"  },
  { name:"Gold",      icon:"🥇", weeks:4,  color:"#ffd700", glow:"rgba(255,215,0,0.35)"   },
  { name:"Platinum",  icon:"💎", weeks:8,  color:"#b9f2ff", glow:"rgba(185,242,255,0.3)"  },
  { name:"Crown",     icon:"👑", weeks:16, color:"#ff6b6b", glow:"rgba(255,107,107,0.3)"  },
  { name:"Ace",       icon:"⚡", weeks:32, color:"#a78bfa", glow:"rgba(167,139,250,0.3)"  },
  { name:"Conqueror", icon:"🏆", weeks:64, color:"#ff4d2e", glow:"rgba(255,77,46,0.4)"   },
];

const EXERCISE_LIST = [
  "Neck Stretches","Cat-Cow Yoga","Shoulder Rolls","Hip Bridges","Calf Raises",
  "Pigeon Pose","Cobra Pose","Child's Pose","Plank","Squats",
  "Downward Dog","Butterfly Pose","Eye Exercises","Wrist Stretches","Pranayama",
  "Surya Namaskar","Anulom Vilom","Bhujangasana","Setu Bandhasana","Trikonasana",
];

const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getDaysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }

function getLeague(streakDays) {
  const weeks = streakDays / 7;
  let league = LEAGUES[0];
  for (const l of LEAGUES) { if (weeks >= l.weeks) league = l; }
  return league;
}

// ── Login prompt shown when user is not signed in ───────────────
function LoginPrompt({ loginWithGoogle }) {
  return (
    <motion.div
      initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
      style={{
        maxWidth:440, margin:"80px auto 0", textAlign:"center",
        padding:"48px 36px", borderRadius:24,
        background:"rgba(255,255,255,0.03)",
        border:"1px solid rgba(255,255,255,0.08)",
        backdropFilter:"blur(20px)",
      }}
    >
      <div style={{ fontSize:56, marginBottom:20 }}>🔐</div>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:700, marginBottom:12 }}>
        Sign in to Track Progress
      </h2>
      <p style={{ color:"var(--muted)", fontSize:14, lineHeight:1.75, marginBottom:28 }}>
        Log in with Google to save your streak, sync your progress across devices,
        and climb the league ladder. Your data stays private and secure.
      </p>
      <motion.button
        whileHover={{ scale:1.04, boxShadow:"0 12px 32px rgba(255,59,30,0.4)" }}
        whileTap={{ scale:0.97 }}
        onClick={loginWithGoogle}
        style={{
          display:"inline-flex", alignItems:"center", gap:10,
          padding:"13px 28px", borderRadius:100, fontSize:15, fontWeight:700,
          background:"#fff", color:"#111", border:"none", cursor:"pointer",
          fontFamily:"var(--font-body)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </motion.button>
      <p style={{ marginTop:18, fontSize:12, color:"rgba(255,255,255,0.25)" }}>
        No password needed · Free forever
      </p>
    </motion.div>
  );
}

// ── Main Progress page ───────────────────────────────────────────
export default function Progress() {
  const { user, loginWithGoogle } = useAuth();
  const { log, saveDay, getStreak, syncing, loaded } = useProgress();

  const today    = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  const [checked,    setChecked]    = useState([]);
  const [viewMonth,  setViewMonth]  = useState(today.getMonth());
  const [viewYear,   setViewYear]   = useState(today.getFullYear());
  const [celebrated, setCelebrated] = useState(false);

  const streak     = getStreak();
  const league     = getLeague(streak);
  const nextLeague = LEAGUES[LEAGUES.indexOf(league) + 1] || null;
  const daysToNext = nextLeague ? nextLeague.weeks * 7 - streak : 0;

  // Log today's exercises
  const handleLog = async () => {
    if (checked.length === 0) return;
    const existing = log[todayStr] || [];
    const merged   = [...new Set([...existing, ...checked])];
    await saveDay(todayStr, merged);
    setChecked([]);
    setCelebrated(true);
    setTimeout(() => setCelebrated(false), 3000);
  };

  // Bar chart — last 7 days
  const last7 = Array.from({ length:7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    const k = d.toISOString().slice(0, 10);
    return { label: DAY_NAMES[d.getDay()], count: (log[k] || []).length, key: k };
  });
  const maxCount = Math.max(...last7.map(d => d.count), 1);

  // Calendar
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;

  if (!loaded) return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:"linear" }}
        style={{ width:32, height:32, borderRadius:"50%", border:"3px solid rgba(255,255,255,0.1)", borderTopColor:"#ff4d2e" }} />
    </div>
  );

  return (
    <div className="page-enter" style={{ paddingTop:100, paddingBottom:80 }}>

      {/* Header band */}
      <div style={{ background:"linear-gradient(135deg,rgba(167,139,250,0.08),rgba(255,77,46,0.05))", borderBottom:"1px solid rgba(167,139,250,0.15)", padding:"52px 0 36px", marginBottom:48 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <div className="label" style={{ color:"#a78bfa", marginBottom:12 }}>Your Journey</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
              <div>
                <h1 className="display-sm" style={{ marginBottom:8 }}>
                  Progress & <span style={{ color:"#a78bfa" }}>Streak Tracker</span>
                </h1>
                <p style={{ color:"var(--muted)", maxWidth:480 }}>
                  Log exercises daily · Build streaks · Climb leagues
                  {user && <span style={{ color:"rgba(255,255,255,0.4)" }}> · Syncing as <strong style={{ color:"#fff" }}>{user.displayName?.split(" ")[0]}</strong></span>}
                </p>
              </div>

              {/* Sync badge */}
              {user && (
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", borderRadius:100, background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.2)", fontSize:12, color:"#34d399" }}>
                  <motion.span animate={{ opacity: syncing ? [1,0.3,1] : 1 }} transition={{ duration:1, repeat: syncing ? Infinity : 0 }}>
                    {syncing ? "⏳" : "☁️"}
                  </motion.span>
                  {syncing ? "Saving..." : "Synced to cloud"}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">

        {/* ── If not logged in, show login prompt ABOVE tracker ── */}
        {!user && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
            style={{ padding:"16px 20px", borderRadius:12, background:"rgba(255,59,30,0.06)", border:"1px solid rgba(255,59,30,0.2)", marginBottom:32, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>
              ⚠️ You're using <strong style={{ color:"#fff" }}>local storage</strong> — progress will be lost if you clear your browser.
            </div>
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }}
              onClick={loginWithGoogle}
              style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:700, background:"#fff", color:"#111", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", flexShrink:0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign in to save
            </motion.button>
          </motion.div>
        )}

        {/* ── Top stat cards ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24 }}>
          {/* Streak */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, textAlign:"center", backdropFilter:"blur(20px)" }}>
            <div style={{ fontSize:40, marginBottom:8 }}>🔥</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:48, fontWeight:800, color:"#ff4d2e", lineHeight:1 }}>{streak}</div>
            <div style={{ fontSize:13, color:"var(--muted)", marginTop:6 }}>Day Streak</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:3 }}>{streak === 0 ? "Start today!" : "Keep it going!"}</div>
          </motion.div>

          {/* League */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.18 }}
            style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${league.glow}`, borderRadius:20, padding:24, textAlign:"center", backdropFilter:"blur(20px)", boxShadow:`0 0 32px ${league.glow}` }}>
            <motion.div animate={{ scale:[1,1.12,1] }} transition={{ duration:2.5, repeat:Infinity }}
              style={{ fontSize:44, marginBottom:6 }}>{league.icon}</motion.div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:22, fontWeight:800, color:league.color }}>{league.name}</div>
            <div style={{ fontSize:11, color:"var(--muted)", marginTop:6 }}>League</div>
            {nextLeague
              ? <div style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:3 }}>{daysToNext}d → {nextLeague.name} {nextLeague.icon}</div>
              : <div style={{ fontSize:10, color:"#ff4d2e", marginTop:3 }}>Max League! 🏆</div>}
          </motion.div>

          {/* Total */}
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.26 }}
            style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, textAlign:"center", backdropFilter:"blur(20px)" }}>
            <div style={{ fontSize:40, marginBottom:8 }}>📊</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:48, fontWeight:800, color:"#34d399", lineHeight:1 }}>
              {Object.values(log).flat().length}
            </div>
            <div style={{ fontSize:13, color:"var(--muted)", marginTop:6 }}>Total Logged</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:3 }}>All time</div>
          </motion.div>
        </div>

        {/* ── League progression bar ── */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }}
          style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, padding:"22px 24px", backdropFilter:"blur(20px)", marginBottom:24 }}>
          <div style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:700, marginBottom:18 }}>League Progression</div>
          <div style={{ display:"flex", alignItems:"center", overflowX:"auto", paddingBottom:4 }}>
            {LEAGUES.map((l, i) => {
              const reached  = streak >= l.weeks * 7;
              const isCurrent = l.name === league.name;
              return (
                <div key={l.name} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
                  <motion.div whileHover={{ scale:1.12 }}
                    style={{
                      textAlign:"center", padding:"8px 10px", borderRadius:12,
                      background: isCurrent ? `${l.color}18` : reached ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                      border: isCurrent ? `1px solid ${l.color}` : "1px solid transparent",
                      opacity: reached ? 1 : 0.3,
                      boxShadow: isCurrent ? `0 0 18px ${l.glow}` : "none",
                    }}>
                    <div style={{ fontSize:22 }}>{l.icon}</div>
                    <div style={{ fontSize:9, fontWeight:700, color: reached ? l.color : "var(--muted)", marginTop:3 }}>{l.name}</div>
                    <div style={{ fontSize:9, color:"var(--muted)" }}>{l.weeks}w</div>
                  </motion.div>
                  {i < LEAGUES.length - 1 && (
                    <div style={{ width:24, height:2, background: reached ? league.color : "rgba(255,255,255,0.07)", flexShrink:0, transition:"background 0.5s" }} />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Daily log + Bar chart ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:24 }}>

          {/* Daily log */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.38 }}
            style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, backdropFilter:"blur(20px)" }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:700, marginBottom:4 }}>Log Today</div>
            <div style={{ fontSize:12, color:"var(--muted)", marginBottom:16 }}>{todayStr}</div>

            {/* Already logged today */}
            {(log[todayStr]?.length > 0) && (
              <div style={{ marginBottom:14, padding:"10px 14px", borderRadius:10, background:"rgba(52,211,153,0.07)", border:"1px solid rgba(52,211,153,0.18)" }}>
                <div style={{ fontSize:11, color:"#34d399", marginBottom:5, fontWeight:700 }}>✅ Logged today:</div>
                {log[todayStr].map((e, i) => (
                  <div key={i} style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>· {e}</div>
                ))}
              </div>
            )}

            <div style={{ maxHeight:220, overflowY:"auto", marginBottom:14 }}>
              {EXERCISE_LIST.map(ex => (
                <label key={ex} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", cursor:"pointer" }}>
                  <input type="checkbox" checked={checked.includes(ex)}
                    onChange={e => setChecked(p => e.target.checked ? [...p, ex] : p.filter(x => x !== ex))}
                    style={{ accentColor:"#ff4d2e", width:15, height:15, flexShrink:0 }} />
                  <span style={{ fontSize:13, color:"var(--muted)" }}>{ex}</span>
                </label>
              ))}
            </div>

            <motion.button whileHover={{ scale: checked.length ? 1.03 : 1 }} whileTap={{ scale: checked.length ? 0.97 : 1 }}
              onClick={handleLog} disabled={checked.length === 0}
              style={{
                width:"100%", padding:"12px", borderRadius:100, fontSize:14, fontWeight:700,
                background: checked.length ? "linear-gradient(135deg,#ff3b1e,#ff6b2e)" : "rgba(255,255,255,0.05)",
                color: checked.length ? "#fff" : "var(--muted)",
                border:"none", cursor: checked.length ? "pointer" : "not-allowed",
                fontFamily:"var(--font-body)", transition:"all 0.3s",
              }}>
              {checked.length ? `Log ${checked.length} Exercise${checked.length > 1 ? "s" : ""}` : "Select exercises above"}
            </motion.button>

            <AnimatePresence>
              {celebrated && (
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                  style={{ textAlign:"center", marginTop:12, fontSize:20 }}>
                  🎉 Logged! {streak > 1 ? `${streak}-day streak! 🔥` : "Day 1 — let's go!"}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bar chart */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.43 }}
            style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, backdropFilter:"blur(20px)" }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:700, marginBottom:4 }}>Last 7 Days</div>
            <div style={{ fontSize:12, color:"var(--muted)", marginBottom:20 }}>Exercises logged per day</div>

            <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:140, marginBottom:10 }}>
              {last7.map((d, i) => (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  {d.count > 0 && <div style={{ fontSize:9, color:"#ff4d2e", fontWeight:700 }}>{d.count}</div>}
                  <motion.div
                    initial={{ scaleY:0 }} animate={{ scaleY:1 }}
                    transition={{ delay:0.5 + i * 0.07, duration:0.5, ease:[0.4,0,0.2,1] }}
                    style={{
                      width:"100%", transformOrigin:"bottom", borderRadius:"6px 6px 0 0",
                      height: d.count > 0 ? `${(d.count / maxCount) * 110}px` : "4px",
                      background: d.key === todayStr
                        ? "linear-gradient(to top,#ff3b1e,#ff9966)"
                        : d.count > 0
                          ? "linear-gradient(to top,rgba(255,59,30,0.6),rgba(255,107,107,0.6))"
                          : "rgba(255,255,255,0.06)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {last7.map((d, i) => (
                <div key={i} style={{ flex:1, textAlign:"center", fontSize:10, color: d.key === todayStr ? "#ff4d2e" : "var(--muted)", fontWeight: d.key === todayStr ? 700 : 400 }}>{d.label}</div>
              ))}
            </div>

            {/* Quick stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:20 }}>
              {[
                { label:"This Month", value: (() => {
                    const total = Object.entries(log).filter(([k]) => k.startsWith(monthPrefix)).reduce((s,[,v]) => s + v.length, 0);
                    return total > 0 ? `${total} exercises` : "None yet";
                  })()
                },
                { label:"Best Day", value: (() => {
                    const best = Math.max(...Object.values(log).map(v => v.length), 0);
                    return best > 0 ? `${best} exercises` : "No data";
                  })()
                },
              ].map(s => (
                <div key={s.label} style={{ padding:"12px 14px", borderRadius:12, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", textAlign:"center" }}>
                  <div style={{ fontSize:11, color:"var(--muted)", marginBottom:4 }}>{s.label}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#ff4d2e" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Monthly Calendar ── */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.52 }}
          style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:24, backdropFilter:"blur(20px)", marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:17, fontWeight:700 }}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              {[["←", () => { let m = viewMonth-1, y = viewYear; if (m < 0) { m=11; y--; } setViewMonth(m); setViewYear(y); }],
                ["→", () => { let m = viewMonth+1, y = viewYear; if (m > 11) { m=0; y++; } setViewMonth(m); setViewYear(y); }]
              ].map(([lbl, fn]) => (
                <button key={lbl} onClick={fn}
                  style={{ padding:"6px 14px", borderRadius:100, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", cursor:"pointer", fontFamily:"var(--font-body)", fontSize:13 }}>{lbl}</button>
              ))}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6, marginBottom:8 }}>
            {DAY_NAMES.map(d => <div key={d} style={{ textAlign:"center", fontSize:10, color:"var(--muted)", fontWeight:600, paddingBottom:4 }}>{d}</div>)}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6 }}>
            {Array(firstDay).fill(null).map((_, i) => <div key={"e"+i} />)}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const k   = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
              const cnt = (log[k] || []).length;
              const isToday = k === todayStr;
              return (
                <motion.div key={day} whileHover={{ scale:1.1 }}
                  style={{
                    aspectRatio:"1", borderRadius:10, display:"flex", flexDirection:"column",
                    alignItems:"center", justifyContent:"center",
                    background: cnt > 0 ? `rgba(255,59,30,${Math.min(0.1 + cnt * 0.06, 0.45)})` : "rgba(255,255,255,0.025)",
                    border: isToday ? "1px solid #ff4d2e" : cnt > 0 ? "1px solid rgba(255,59,30,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    cursor: cnt > 0 ? "pointer" : "default",
                  }}>
                  <span style={{ fontSize:12, fontWeight: isToday ? 800 : 500, color: cnt > 0 ? "#ff6b4a" : isToday ? "#ff4d2e" : "var(--muted)" }}>{day}</span>
                  {cnt > 0 && <span style={{ fontSize:7, color:"#ff4d2e", marginTop:1 }}>{"●".repeat(Math.min(cnt,3))}</span>}
                </motion.div>
              );
            })}
          </div>

          <div style={{ display:"flex", gap:16, marginTop:14, justifyContent:"flex-end" }}>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:"var(--muted)" }}>
              <div style={{ width:10, height:10, borderRadius:3, background:"rgba(255,59,30,0.35)" }} /> Exercised
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:10, color:"var(--muted)" }}>
              <div style={{ width:10, height:10, borderRadius:3, border:"1px solid #ff4d2e" }} /> Today
            </div>
          </div>
        </motion.div>

        {/* ── Sign-in CTA if not logged in ── */}
        {!user && <LoginPrompt loginWithGoogle={loginWithGoogle} />}

        {/* ── Logged in sync note ── */}
        {user && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}
            style={{ padding:"18px 22px", borderRadius:14, background:"rgba(52,211,153,0.05)", border:"1px solid rgba(52,211,153,0.15)", display:"flex", alignItems:"center", gap:14 }}>
            <div style={{ fontSize:24 }}>☁️</div>
            <div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:700, marginBottom:3 }}>
                Progress synced to Firebase
              </div>
              <div style={{ fontSize:12, color:"var(--muted)" }}>
                Logged in as <strong style={{ color:"#fff" }}>{user.email}</strong>. Your streak and logs are saved in the cloud and available on any device.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
