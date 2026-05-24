// src/pages/Progress.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth }     from "../context/AuthContext";
import { useProgress } from "../hooks/useProgress";

const LEAGUES = [
  { name:"Bronze",    icon:"🥉", weeks:1,  color:"#cd7f32", bg:"rgba(205,127,50,0.15)",  glow:"rgba(205,127,50,0.5)",  desc:"Just getting started" },
  { name:"Silver",    icon:"🥈", weeks:2,  color:"#c0c0c0", bg:"rgba(192,192,192,0.12)", glow:"rgba(192,192,192,0.5)", desc:"Building the habit" },
  { name:"Gold",      icon:"🥇", weeks:4,  color:"#ffd700", bg:"rgba(255,215,0,0.12)",   glow:"rgba(255,215,0,0.55)",  desc:"Consistency is key" },
  { name:"Platinum",  icon:"💎", weeks:8,  color:"#67e8f9", bg:"rgba(103,232,249,0.12)", glow:"rgba(103,232,249,0.5)", desc:"Seriously dedicated" },
  { name:"Crown",     icon:"👑", weeks:16, color:"#f472b6", bg:"rgba(244,114,182,0.12)", glow:"rgba(244,114,182,0.5)", desc:"Elite performer" },
  { name:"Ace",       icon:"⚡", weeks:32, color:"#a78bfa", bg:"rgba(167,139,250,0.12)", glow:"rgba(167,139,250,0.5)", desc:"Legendary dedication" },
  { name:"Conqueror", icon:"🏆", weeks:64, color:"#ff4d2e", bg:"rgba(255,77,46,0.15)",   glow:"rgba(255,77,46,0.6)",   desc:"Absolute champion" },
];

const EXERCISE_LIST = [
  "Neck Stretches","Cat-Cow Yoga","Shoulder Rolls","Hip Bridges","Calf Raises",
  "Pigeon Pose","Cobra Pose","Child's Pose","Plank","Squats",
  "Downward Dog","Butterfly Pose","Eye Exercises","Wrist Stretches","Pranayama",
  "Surya Namaskar","Anulom Vilom","Bhujangasana","Setu Bandhasana","Trikonasana",
];

const DAY_NAMES   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function getDaysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }

function getLeague(days){
  const w = days/7;
  let l = LEAGUES[0];
  for(const x of LEAGUES){ if(w >= x.weeks) l = x; }
  return l;
}

// ── tiny Google SVG ──
const GoogleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" style={{flexShrink:0}}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

// ── Login prompt ──
function LoginPrompt({ loginWithGoogle }) {
  return (
    <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}}
      style={{ maxWidth:420, margin:"60px auto 0", textAlign:"center",
        padding:"44px 32px", borderRadius:24,
        background:"rgba(255,255,255,0.04)",
        border:"1px solid rgba(255,255,255,0.1)",
        backdropFilter:"blur(20px)" }}>
      <div style={{fontSize:52,marginBottom:16}}>🔐</div>
      <h2 style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:700,marginBottom:10}}>Sign in to Save Progress</h2>
      <p style={{color:"var(--muted)",fontSize:13,lineHeight:1.75,marginBottom:24}}>
        Log in with Google to sync your streak across devices, keep your leagues, and never lose your progress.
      </p>
      <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.97}} onClick={loginWithGoogle}
        style={{ display:"inline-flex",alignItems:"center",gap:10,
          padding:"12px 26px",borderRadius:100,fontSize:14,fontWeight:700,
          background:"#fff",color:"#111",border:"none",cursor:"pointer",fontFamily:"var(--font-body)" }}>
        <GoogleIcon/> Continue with Google
      </motion.button>
      <p style={{marginTop:14,fontSize:11,color:"rgba(255,255,255,0.2)"}}>No password · Free forever</p>
    </motion.div>
  );
}

// ── Progress Graph Component ──
function ProgressGraph({ log }) {
  const [view, setView] = useState("week"); // week | month | year
  const today = new Date();

  // Build data points based on view
  const buildData = () => {
    if (view === "week") {
      return Array.from({length:7}, (_,i) => {
        const d = new Date(today); d.setDate(d.getDate()-(6-i));
        const k = d.toISOString().slice(0,10);
        return { label:DAY_NAMES[d.getDay()], sub: `${d.getDate()}`, count:(log[k]||[]).length, key:k, isToday: k===today.toISOString().slice(0,10) };
      });
    }
    if (view === "month") {
      const days = getDaysInMonth(today.getFullYear(), today.getMonth());
      return Array.from({length:days}, (_,i) => {
        const d = new Date(today.getFullYear(), today.getMonth(), i+1);
        const k = d.toISOString().slice(0,10);
        return { label:`${i+1}`, sub:DAY_NAMES[d.getDay()][0], count:(log[k]||[]).length, key:k, isToday: k===today.toISOString().slice(0,10) };
      });
    }
    // year — group by month
    return Array.from({length:12}, (_,i) => {
      const prefix = `${today.getFullYear()}-${String(i+1).padStart(2,"0")}`;
      const total = Object.entries(log).filter(([k])=>k.startsWith(prefix)).reduce((s,[,v])=>s+v.length,0);
      return { label:MONTH_NAMES[i], sub:"", count:total, key:prefix, isToday: i===today.getMonth() };
    });
  };

  const data = buildData();
  const maxCount = Math.max(...data.map(d=>d.count), 1);
  const totalCount = data.reduce((s,d)=>s+d.count, 0);
  const activeDays = data.filter(d=>d.count>0).length;

  const TABS = ["week","month","year"];

  return (
    <motion.div initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
      style={{ borderRadius:24, overflow:"hidden",
        background:"linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.02) 100%)",
        border:"1px solid rgba(255,255,255,0.09)", backdropFilter:"blur(20px)" }}>

      {/* Header */}
      <div style={{ padding:"28px 28px 0",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12 }}>
        <div>
          <div style={{fontFamily:"var(--font-display)",fontSize:20,fontWeight:700,marginBottom:4}}>Activity Graph</div>
          <div style={{fontSize:13,color:"var(--muted)"}}>
            {totalCount > 0
              ? <><span style={{color:"#ff4d2e",fontWeight:700}}>{totalCount}</span> exercises · <span style={{color:"#34d399",fontWeight:700}}>{activeDays}</span> active {view === "year" ? "months" : "days"}</>
              : "No activity logged yet"}
          </div>
        </div>
        {/* View toggle */}
        <div style={{ display:"flex",gap:4,background:"rgba(255,255,255,0.06)",padding:4,borderRadius:100,border:"1px solid rgba(255,255,255,0.08)" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setView(t)}
              style={{ padding:"7px 18px",borderRadius:100,fontSize:12,fontWeight:600,
                background: view===t ? "rgba(255,255,255,0.14)" : "transparent",
                color: view===t ? "#fff" : "rgba(255,255,255,0.4)",
                border:"none",cursor:"pointer",fontFamily:"var(--font-body)",
                textTransform:"capitalize",transition:"all 0.2s" }}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Graph area */}
      <div style={{ padding:"24px 28px 28px", overflowX:"auto" }}>
        <AnimatePresence mode="wait">
          <motion.div key={view}
            initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}}
            transition={{duration:0.3}}
            style={{ display:"flex",alignItems:"flex-end",gap: view==="month" ? 4 : view==="year" ? 8 : 12,
              height:180, minWidth: view==="month" ? 600 : "auto", paddingBottom:36, position:"relative" }}>

            {/* Y-axis grid lines */}
            {[0.25,0.5,0.75,1].map(p => (
              <div key={p} style={{ position:"absolute", left:0, right:0,
                bottom: `${p*140+36}px`,
                borderTop:"1px dashed rgba(255,255,255,0.06)", pointerEvents:"none" }}/>
            ))}

            {data.map((d, i) => {
              const barH = d.count > 0 ? Math.max((d.count/maxCount)*140, 8) : 4;
              const isHigh = d.count === maxCount && maxCount > 0;
              return (
                <div key={i} style={{ flex:1, minWidth: view==="month" ? 14 : view==="year" ? 40 : 36,
                  display:"flex",flexDirection:"column",alignItems:"center",gap:4,
                  position:"relative" }}>
                  {/* count label on top */}
                  {d.count > 0 && (
                    <motion.div initial={{opacity:0,y:4}} animate={{opacity:1,y:0}} transition={{delay:i*0.03}}
                      style={{ fontSize: view==="month" ? 8 : 10, fontWeight:700,
                        color: isHigh ? "#ffd700" : "#ff4d2e",
                        position:"absolute", bottom: barH+40, whiteSpace:"nowrap" }}>
                      {d.count}
                    </motion.div>
                  )}

                  {/* Bar */}
                  <motion.div
                    initial={{scaleY:0}} animate={{scaleY:1}}
                    transition={{delay:i*0.03, duration:0.5, ease:[0.4,0,0.2,1]}}
                    style={{ width:"100%", transformOrigin:"bottom", borderRadius:"6px 6px 0 0",
                      position:"absolute", bottom:36,
                      height: barH,
                      background: d.isToday
                        ? "linear-gradient(to top,#ff3b1e,#ff9966)"
                        : d.count > 0
                          ? isHigh
                            ? "linear-gradient(to top,#ffd700,#ffed80)"
                            : "linear-gradient(to top,rgba(255,77,46,0.7),rgba(255,120,80,0.9))"
                          : "rgba(255,255,255,0.05)",
                      boxShadow: d.isToday ? "0 0 12px rgba(255,59,30,0.5)"
                        : isHigh ? "0 0 12px rgba(255,215,0,0.4)" : "none",
                    }}/>

                  {/* Labels below */}
                  <div style={{ position:"absolute", bottom:0, textAlign:"center" }}>
                    <div style={{ fontSize: view==="month" ? 8 : 10,
                      color: d.isToday ? "#ff4d2e" : "rgba(255,255,255,0.4)",
                      fontWeight: d.isToday ? 700 : 400, lineHeight:1.3 }}>
                      {d.label}
                    </div>
                    {d.sub && view==="week" && (
                      <div style={{fontSize:9,color:"rgba(255,255,255,0.25)"}}>{d.sub}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div style={{ display:"flex",gap:20,marginTop:8,paddingTop:16,borderTop:"1px solid rgba(255,255,255,0.06)",flexWrap:"wrap" }}>
          {[
            {color:"linear-gradient(135deg,#ff3b1e,#ff9966)", label:"Today"},
            {color:"linear-gradient(135deg,#ffd700,#ffed80)", label:"Best day"},
            {color:"linear-gradient(135deg,rgba(255,77,46,0.7),rgba(255,120,80,0.9))", label:"Active day"},
            {color:"rgba(255,255,255,0.05)", label:"Rest day"},
          ].map(l => (
            <div key={l.label} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:10,height:10,borderRadius:3,background:l.color,flexShrink:0}}/>
              <span style={{fontSize:11,color:"var(--muted)"}}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Progress() {
  const { user, loginWithGoogle } = useAuth();
  const { log, saveDay, getStreak, syncing, loaded } = useProgress();

  const today    = new Date();
  const todayStr = today.toISOString().slice(0,10);

  const [checked,    setChecked]    = useState([]);
  const [viewMonth,  setViewMonth]  = useState(today.getMonth());
  const [viewYear,   setViewYear]   = useState(today.getFullYear());
  const [celebrated, setCelebrated] = useState(false);

  const streak     = getStreak();
  const league     = getLeague(streak);
  const leagueIdx  = LEAGUES.indexOf(league);
  const nextLeague = LEAGUES[leagueIdx+1] || null;
  const daysToNext = nextLeague ? nextLeague.weeks*7 - streak : 0;
  const progress   = nextLeague
    ? Math.min((streak - league.weeks*7) / ((nextLeague.weeks - league.weeks)*7) * 100, 100)
    : 100;

  const handleLog = async () => {
    if (!checked.length) return;
    const merged = [...new Set([...(log[todayStr]||[]), ...checked])];
    await saveDay(todayStr, merged);
    setChecked([]);
    setCelebrated(true);
    setTimeout(() => setCelebrated(false), 3000);
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const monthPfx    = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}`;

  if (!loaded) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"60vh"}}>
      <motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:"linear"}}
        style={{width:32,height:32,borderRadius:"50%",border:"3px solid rgba(255,255,255,0.1)",borderTopColor:"#ff4d2e"}}/>
    </div>
  );

  return (
    <div className="page-enter" style={{paddingTop:100,paddingBottom:80}}>

      {/* ── Colourful header band ── */}
      <div style={{ position:"relative", overflow:"hidden", padding:"60px 0 48px", marginBottom:48,
        background:"linear-gradient(135deg,rgba(167,139,250,0.1) 0%,rgba(255,77,46,0.08) 50%,rgba(52,211,153,0.08) 100%)",
        borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        {/* decorative orbs */}
        <div style={{position:"absolute",top:-60,right:"10%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,0.15),transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-80,left:"5%",width:250,height:250,borderRadius:"50%",background:"radial-gradient(circle,rgba(52,211,153,0.12),transparent 70%)",pointerEvents:"none"}}/>
        <div className="container">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            <div className="label" style={{color:"#a78bfa",marginBottom:12}}>Your Journey</div>
            <h1 className="display-sm" style={{marginBottom:10}}>
              Progress & <span style={{background:"linear-gradient(135deg,#a78bfa,#ff4d2e)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Streak Tracker</span>
            </h1>
            <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
              <p style={{color:"var(--muted)",fontSize:14}}>Log daily · Build streaks · Climb leagues</p>
              {user && (
                <div style={{display:"flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:100,
                  background:"rgba(52,211,153,0.1)",border:"1px solid rgba(52,211,153,0.2)",fontSize:12,color:"#34d399"}}>
                  <motion.span animate={{opacity:syncing?[1,0.3,1]:1}} transition={{duration:1,repeat:syncing?Infinity:0}}>
                    {syncing?"⏳":"☁️"}
                  </motion.span>
                  {syncing ? "Saving..." : `Synced · ${user.displayName?.split(" ")[0]}`}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container">

        {/* ── Not-logged-in banner ── */}
        {!user && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}
            style={{padding:"14px 20px",borderRadius:12,marginBottom:28,
              background:"rgba(255,59,30,0.06)",border:"1px solid rgba(255,59,30,0.2)",
              display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <span style={{fontSize:13,color:"rgba(255,255,255,0.55)"}}>
              ⚠️ Using <strong style={{color:"#fff"}}>local storage</strong> — sign in to sync across devices
            </span>
            <motion.button whileHover={{scale:1.04}} whileTap={{scale:0.97}} onClick={loginWithGoogle}
              style={{display:"flex",alignItems:"center",gap:7,padding:"8px 18px",borderRadius:100,
                fontSize:13,fontWeight:700,background:"#fff",color:"#111",border:"none",
                cursor:"pointer",fontFamily:"var(--font-body)",flexShrink:0}}>
              <GoogleIcon/> Sign in
            </motion.button>
          </motion.div>
        )}

        {/* ── Top 3 stat cards ── */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,marginBottom:24}}>
          {[
            { emoji:"🔥", val:streak, label:"Day Streak", sub: streak===0?"Start today!":"Keep it going!", color:"#ff4d2e", glow:"rgba(255,77,46,0.3)" },
            { emoji:"📅", val:Object.keys(log).filter(k=>log[k]?.length>0).length, label:"Total Days Active", sub:"All time", color:"#34d399", glow:"rgba(52,211,153,0.25)" },
            { emoji:"⚡", val:Object.values(log).flat().length, label:"Exercises Logged", sub:"All time", color:"#a78bfa", glow:"rgba(167,139,250,0.25)" },
          ].map((s,i) => (
            <motion.div key={i} initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}}
              style={{ background:"rgba(255,255,255,0.03)", border:`1px solid ${s.glow}`,
                borderRadius:20, padding:"24px 20px", textAlign:"center", backdropFilter:"blur(20px)",
                boxShadow:`0 0 30px ${s.glow}` }}>
              <div style={{fontSize:36,marginBottom:8}}>{s.emoji}</div>
              <motion.div key={s.val}
                initial={{scale:0.7,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:200}}
                style={{fontFamily:"var(--font-display)",fontSize:48,fontWeight:800,color:s.color,lineHeight:1}}>{s.val}</motion.div>
              <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",marginTop:6}}>{s.label}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,0.25)",marginTop:2}}>{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ══════════════════════════════════════════
            LEAGUE PROGRESSION — BIG CENTREPIECE
        ══════════════════════════════════════════ */}
        <motion.div initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
          style={{ borderRadius:28, overflow:"hidden", marginBottom:24, position:"relative",
            background:"linear-gradient(135deg,rgba(10,12,22,0.95) 0%,rgba(20,14,34,0.95) 100%)",
            border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(24px)" }}>

          {/* Background glow for current league */}
          <div style={{ position:"absolute", inset:0, pointerEvents:"none",
            background:`radial-gradient(ellipse 60% 50% at 50% 50%, ${league.glow.replace("0.5","0.12")} 0%, transparent 70%)` }}/>

          <div style={{padding:"36px 32px"}}>
            <div style={{textAlign:"center",marginBottom:36}}>
              <div className="label" style={{color:"rgba(255,255,255,0.4)",marginBottom:8}}>League System</div>
              <h2 style={{fontFamily:"var(--font-display)",fontSize:26,fontWeight:700}}>Your Rank Progression</h2>
            </div>

            {/* ── League cards row ── */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:10,marginBottom:36}}>
              {LEAGUES.map((l,i) => {
                const reached  = streak >= l.weeks*7;
                const isCurrent = l.name === league.name;
                return (
                  <motion.div key={l.name}
                    whileHover={{scale:1.06,y:-4}}
                    animate={ isCurrent ? { boxShadow:["0 0 20px "+l.glow, "0 0 40px "+l.glow, "0 0 20px "+l.glow] } : {} }
                    transition={ isCurrent ? { duration:2.5, repeat:Infinity } : {} }
                    style={{
                      borderRadius:18, padding:"20px 8px 16px", textAlign:"center",
                      background: isCurrent ? l.bg : reached ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                      border: isCurrent ? `2px solid ${l.color}` : reached ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.04)",
                      opacity: reached ? 1 : 0.35,
                      position:"relative", overflow:"hidden",
                      transition:"all 0.3s",
                      cursor:"default",
                    }}>
                    {/* shine for current */}
                    {isCurrent && (
                      <div style={{position:"absolute",top:0,left:0,right:0,height:"40%",
                        background:"linear-gradient(to bottom,rgba(255,255,255,0.1),transparent)",
                        borderRadius:"18px 18px 0 0",pointerEvents:"none"}}/>
                    )}
                    {/* Completed checkmark */}
                    {reached && !isCurrent && (
                      <div style={{position:"absolute",top:6,right:6,width:16,height:16,borderRadius:"50%",
                        background:l.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:800,color:"#000"}}>✓</div>
                    )}

                    <motion.div
                      animate={isCurrent ? {scale:[1,1.15,1]} : {}}
                      transition={{duration:2,repeat:Infinity}}
                      style={{fontSize: isCurrent ? 38 : 30, marginBottom:10, display:"block"}}>
                      {l.icon}
                    </motion.div>

                    <div style={{fontFamily:"var(--font-display)",fontSize:12,fontWeight:700,
                      color: isCurrent ? l.color : reached ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)",
                      marginBottom:4}}>
                      {l.name}
                    </div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",marginBottom:6}}>{l.weeks}w</div>
                    { isCurrent && (
                      <div style={{fontSize:9,color:l.color,fontWeight:600,
                        padding:"2px 6px",borderRadius:100,
                        background:l.bg,display:"inline-block"}}>
                        YOU
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* ── Current league detail + progress bar ── */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
              {/* Current */}
              <div style={{padding:"20px 24px",borderRadius:18,
                background: league.bg, border:`1px solid ${league.color}40`}}>
                <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
                  <motion.div animate={{scale:[1,1.2,1]}} transition={{duration:2.5,repeat:Infinity}}
                    style={{fontSize:48}}>{league.icon}</motion.div>
                  <div>
                    <div style={{fontFamily:"var(--font-display)",fontSize:22,fontWeight:800,color:league.color}}>{league.name}</div>
                    <div style={{fontSize:13,color:"rgba(255,255,255,0.5)",marginTop:2}}>{league.desc}</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
                  <div style={{padding:"8px 16px",borderRadius:100,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Streak: </span>
                    <span style={{fontSize:13,fontWeight:700,color:league.color}}>{streak} days</span>
                  </div>
                  <div style={{padding:"8px 16px",borderRadius:100,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)"}}>
                    <span style={{fontSize:12,color:"rgba(255,255,255,0.5)"}}>Weeks: </span>
                    <span style={{fontSize:13,fontWeight:700,color:league.color}}>{Math.floor(streak/7)}</span>
                  </div>
                </div>
              </div>

              {/* Progress to next */}
              <div style={{padding:"20px 24px",borderRadius:18,
                background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)"}}>
                {nextLeague ? (
                  <>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                      <div>
                        <div style={{fontSize:12,color:"var(--muted)",marginBottom:4}}>Next League</div>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{fontSize:28}}>{nextLeague.icon}</span>
                          <span style={{fontFamily:"var(--font-display)",fontSize:18,fontWeight:700,color:nextLeague.color}}>{nextLeague.name}</span>
                        </div>
                      </div>
                      <div style={{textAlign:"right"}}>
                        <div style={{fontSize:12,color:"var(--muted)",marginBottom:2}}>Days left</div>
                        <div style={{fontFamily:"var(--font-display)",fontSize:28,fontWeight:800,color:"#fff"}}>{daysToNext}</div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{height:8,borderRadius:100,background:"rgba(255,255,255,0.08)",overflow:"hidden",marginBottom:8}}>
                      <motion.div initial={{width:0}} animate={{width:`${progress}%`}}
                        transition={{duration:1.2,ease:[0.4,0,0.2,1],delay:0.5}}
                        style={{height:"100%",borderRadius:100,
                          background:`linear-gradient(90deg,${league.color},${nextLeague.color})`}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.3)"}}>
                      <span>{league.name} · {league.weeks}w</span>
                      <span style={{color:nextLeague.color,fontWeight:600}}>{Math.round(progress)}%</span>
                      <span>{nextLeague.name} · {nextLeague.weeks}w</span>
                    </div>
                  </>
                ) : (
                  <div style={{textAlign:"center",padding:"20px 0"}}>
                    <div style={{fontSize:40,marginBottom:10}}>🏆</div>
                    <div style={{fontFamily:"var(--font-display)",fontSize:18,fontWeight:700,color:"#ffd700",marginBottom:6}}>Maximum League!</div>
                    <div style={{fontSize:13,color:"var(--muted)"}}>You are an absolute champion</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Daily log + Calendar side by side ── */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,marginBottom:24}}>

          {/* Daily log */}
          <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.42}}
            style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:20,padding:24,backdropFilter:"blur(20px)"}}>
            <div style={{fontFamily:"var(--font-display)",fontSize:17,fontWeight:700,marginBottom:4}}>
              Log Today
            </div>
            <div style={{fontSize:12,color:"var(--muted)",marginBottom:14}}>{todayStr}</div>

            {log[todayStr]?.length > 0 && (
              <div style={{marginBottom:12,padding:"10px 14px",borderRadius:10,
                background:"rgba(52,211,153,0.07)",border:"1px solid rgba(52,211,153,0.18)"}}>
                <div style={{fontSize:11,color:"#34d399",marginBottom:4,fontWeight:700}}>✅ Logged today:</div>
                {log[todayStr].map((e,i) => <div key={i} style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>· {e}</div>)}
              </div>
            )}

            <div style={{maxHeight:200,overflowY:"auto",marginBottom:14}}>
              {EXERCISE_LIST.map(ex => (
                <label key={ex} style={{display:"flex",alignItems:"center",gap:10,
                  padding:"6px 0",borderBottom:"1px solid rgba(255,255,255,0.04)",cursor:"pointer"}}>
                  <input type="checkbox" checked={checked.includes(ex)}
                    onChange={e => setChecked(p => e.target.checked ? [...p,ex] : p.filter(x=>x!==ex))}
                    style={{accentColor:"#ff4d2e",width:14,height:14,flexShrink:0}}/>
                  <span style={{fontSize:12,color:"var(--muted)"}}>{ex}</span>
                </label>
              ))}
            </div>

            <motion.button whileHover={{scale:checked.length?1.03:1}} whileTap={{scale:checked.length?0.97:1}}
              onClick={handleLog} disabled={!checked.length}
              style={{width:"100%",padding:"11px",borderRadius:100,fontSize:13,fontWeight:700,
                background:checked.length?"linear-gradient(135deg,#ff3b1e,#ff6b2e)":"rgba(255,255,255,0.05)",
                color:checked.length?"#fff":"var(--muted)",
                border:"none",cursor:checked.length?"pointer":"not-allowed",
                fontFamily:"var(--font-body)",transition:"all 0.3s"}}>
              {checked.length ? `Log ${checked.length} Exercise${checked.length>1?"s":""}` : "Select above"}
            </motion.button>

            <AnimatePresence>
              {celebrated && (
                <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  style={{textAlign:"center",marginTop:12,fontSize:18}}>
                  🎉 Logged! {streak>1 ? `${streak}-day streak! 🔥` : "Day 1 — let's go!"}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Monthly Calendar */}
          <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:0.46}}
            style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:20,padding:24,backdropFilter:"blur(20px)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:17,fontWeight:700}}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </div>
              <div style={{display:"flex",gap:6}}>
                {[["←",()=>{let m=viewMonth-1,y=viewYear;if(m<0){m=11;y--;}setViewMonth(m);setViewYear(y);}],
                  ["→",()=>{let m=viewMonth+1,y=viewYear;if(m>11){m=0;y++;}setViewMonth(m);setViewYear(y);}]]
                  .map(([lbl,fn]) => (
                    <button key={lbl} onClick={fn}
                      style={{padding:"5px 12px",borderRadius:100,
                        background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                        color:"#fff",cursor:"pointer",fontFamily:"var(--font-body)",fontSize:12}}>
                      {lbl}
                    </button>
                  ))}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4,marginBottom:6}}>
              {DAY_NAMES.map(d => (
                <div key={d} style={{textAlign:"center",fontSize:9,color:"var(--muted)",fontWeight:600,paddingBottom:4}}>{d}</div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
              {Array(firstDay).fill(null).map((_,i) => <div key={"e"+i}/>)}
              {Array.from({length:daysInMonth},(_,i) => {
                const day = i+1;
                const k = `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                const cnt = (log[k]||[]).length;
                const isToday = k===todayStr;
                return (
                  <motion.div key={day} whileHover={{scale:1.15}}
                    style={{aspectRatio:"1",borderRadius:8,
                      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                      background: cnt>0 ? `rgba(255,59,30,${Math.min(0.1+cnt*0.06,0.45)})` : "rgba(255,255,255,0.025)",
                      border: isToday ? "1.5px solid #ff4d2e" : cnt>0 ? "1px solid rgba(255,59,30,0.3)" : "1px solid rgba(255,255,255,0.05)",
                      boxShadow: isToday ? "0 0 8px rgba(255,77,46,0.4)" : "none",
                    }}>
                    <span style={{fontSize:11,fontWeight:isToday?800:500,
                      color:cnt>0?"#ff6b4a":isToday?"#ff4d2e":"var(--muted)"}}>
                      {day}
                    </span>
                    {cnt>0 && <span style={{fontSize:6,color:"#ff4d2e",marginTop:1}}>{"●".repeat(Math.min(cnt,3))}</span>}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            ACTIVITY GRAPH — Week / Month / Year
        ══════════════════════════════════════════ */}
        <ProgressGraph log={log} />

        {/* ── Login CTA if not signed in ── */}
        {!user && <LoginPrompt loginWithGoogle={loginWithGoogle}/>}

        {/* ── Cloud sync note ── */}
        {user && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}
            style={{marginTop:24,padding:"16px 20px",borderRadius:14,
              background:"rgba(52,211,153,0.05)",border:"1px solid rgba(52,211,153,0.15)",
              display:"flex",alignItems:"center",gap:12}}>
            <div style={{fontSize:22}}>☁️</div>
            <div>
              <div style={{fontFamily:"var(--font-display)",fontSize:13,fontWeight:700,marginBottom:2}}>Progress synced to Firebase</div>
              <div style={{fontSize:12,color:"var(--muted)"}}>
                Logged in as <strong style={{color:"#fff"}}>{user.email}</strong>. Available on any device.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}