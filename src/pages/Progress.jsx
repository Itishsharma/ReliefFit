// src/pages/Progress.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// League system
const LEAGUES = [
  { name:"Bronze",     icon:"🥉", minDays:0,  maxDays:6,   color:"#cd7f32", bg:"rgba(205,127,50,0.12)",  desc:"Just getting started — every legend begins here" },
  { name:"Silver",     icon:"🥈", minDays:7,  maxDays:13,  color:"#c0c0c0", bg:"rgba(192,192,192,0.12)", desc:"One solid week — your body is already changing" },
  { name:"Gold",       icon:"🥇", minDays:14, maxDays:27,  color:"#ffd700", bg:"rgba(255,215,0,0.12)",   desc:"Two weeks in — habits are forming in your brain" },
  { name:"Platinum",   icon:"💎", minDays:28, maxDays:55,  color:"#e5e4e2", bg:"rgba(229,228,226,0.12)", desc:"One month strong — you're in the top 10%" },
  { name:"Crown",      icon:"👑", minDays:56, maxDays:111, color:"#a855f7", bg:"rgba(168,85,247,0.12)",  desc:"Two months — pain levels have significantly dropped" },
  { name:"Ace",        icon:"🎯", minDays:112,maxDays:223, color:"#3b82f6", bg:"rgba(59,130,246,0.12)",  desc:"Four months — this is now a lifestyle, not a habit" },
  { name:"Conqueror",  icon:"⚔️", minDays:224,maxDays:999, color:"#ef4444", bg:"rgba(239,68,68,0.12)",   desc:"Eight months — you have conquered your body" },
];

// Mock 12 weeks of data
function generateData() {
  const weeks = [];
  for (let w=1; w<=12; w++) {
    weeks.push({
      week: `W${w}`,
      sessions: Math.min(7, Math.max(1, Math.round(w*0.4 + Math.random()*2))),
      streak:   Math.round(w*1.8 + Math.random()*3),
      pain:     Math.max(1, Math.round(9 - w*0.5 - Math.random()*1.5)),
      energy:   Math.min(10, Math.round(3 + w*0.6 + Math.random()*1.5)),
    });
  }
  return weeks;
}

const BODY_PARTS = ["Neck","Back","Shoulders","Wrists","Hips","Knees","Calves","Eyes"];

function getLeague(days) {
  for (let i = LEAGUES.length-1; i >= 0; i--) {
    if (days >= LEAGUES[i].minDays) return LEAGUES[i];
  }
  return LEAGUES[0];
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"rgba(10,12,10,0.95)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, padding:"10px 14px", backdropFilter:"blur(20px)" }}>
      <div style={{ fontSize:12, color:"var(--muted)", marginBottom:6 }}>{label}</div>
      {payload.map((p,i) => (
        <div key={i} style={{ fontSize:13, fontWeight:600, color:p.color }}>{p.name}: {p.value}</div>
      ))}
    </div>
  );
};

export default function Progress() {
  const [streak, setStreak] = useState(23);
  const [totalDays, setTotalDays] = useState(23);
  const [completed, setCompleted] = useState({});
  const [data] = useState(generateData);
  const [activeTab, setActiveTab] = useState("overview");
  const [loggedToday, setLoggedToday] = useState(false);

  const league = getLeague(totalDays);
  const nextLeague = LEAGUES[LEAGUES.findIndex(l=>l.name===league.name)+1];
  const leagueProgress = nextLeague ? ((totalDays - league.minDays) / (nextLeague.minDays - league.minDays)) * 100 : 100;

  const today = new Date();
  const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const logSession = () => {
    if (!loggedToday) {
      setLoggedToday(true);
      setStreak(s => s+1);
      setTotalDays(t => t+1);
    }
  };

  // Generate calendar dots (last 30 days)
  const calDots = Array.from({length:30}, (_,i) => {
    const d = new Date(today); d.setDate(d.getDate()-29+i);
    const key = d.toDateString();
    const done = completed[key] || (i < 20 && Math.random()>0.25);
    return { date:d, done, key };
  });

  const TABS = ["overview","calendar","leagues","graphs"];

  return (
    <div className="page-enter" style={{ paddingTop:80, paddingBottom:80 }}>
      {/* Header */}
      <div className="band-gold" style={{ padding:"60px 0 48px", marginBottom:48 }}>
        <div className="container">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div className="label" style={{ color:"var(--gold)", marginBottom:14 }}>My Progress</div>
            <h1 className="display-sm" style={{ marginBottom:14 }}>
              Track · <span style={{ color:"var(--gold)" }}>Streak</span> · Conquer
            </h1>
            <p style={{ color:"var(--muted)", fontSize:16, maxWidth:540 }}>
              Every session logged brings you closer to a pain-free body. Build your streak, climb the leagues, and watch your progress on real graphs.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {/* Top stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:16, marginBottom:32 }}>
          {[
            { label:"Current Streak", value:`${streak} days`, icon:"🔥", color:"#e05252" },
            { label:"Total Sessions", value:`${totalDays}`, icon:"⚡", color:"var(--accent)" },
            { label:"This Week", value:`${Math.min(7,data[data.length-1].sessions)}/7`, icon:"📅", color:league.color },
            { label:"Pain Score", value:`${data[data.length-1].pain}/10`, icon:"💊", color:"#38b2ac", sublabel:"Lower = better" },
          ].map((s,i) => (
            <motion.div key={i}
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              style={{ background:"var(--glass)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:"22px 20px", backdropFilter:"blur(20px)" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:28, fontWeight:800, color:s.color, lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:13, color:"var(--muted)", marginTop:4 }}>{s.label}</div>
              {s.sublabel && <div style={{ fontSize:10, color:"var(--muted)", opacity:0.6 }}>{s.sublabel}</div>}
            </motion.div>
          ))}
        </div>

        {/* Log today button */}
        <motion.div
          whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
          onClick={logSession}
          style={{
            padding:"20px 28px", borderRadius:"var(--r-lg)", marginBottom:36,
            background: loggedToday ? "rgba(109,184,109,0.15)" : "rgba(109,184,109,0.08)",
            border: loggedToday ? "1px solid var(--accent)" : "1px solid rgba(109,184,109,0.25)",
            backdropFilter:"blur(20px)", cursor: loggedToday ? "default" : "pointer",
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}
        >
          <div>
            <div style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, marginBottom:4, color:loggedToday?"var(--accent)":"var(--white)" }}>
              {loggedToday ? "✅ Today's session logged! Keep it up!" : "Log Today's Workout Session"}
            </div>
            <div style={{ fontSize:13, color:"var(--muted)" }}>
              {loggedToday ? `Streak: ${streak} days 🔥 — ${nextLeague ? `${nextLeague.minDays - totalDays} days to ${nextLeague.name}` : "Maximum league reached!"}` : "Tap to record that you completed your exercises today"}
            </div>
          </div>
          {!loggedToday && (
            <div style={{ padding:"12px 24px", borderRadius:100, background:"var(--accent)", color:"var(--bg)", fontSize:13, fontWeight:700, flexShrink:0 }}>+ Log Session</div>
          )}
        </motion.div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:6, marginBottom:32, background:"var(--glass)", padding:5, borderRadius:100, width:"fit-content", border:"1px solid var(--border)" }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              padding:"9px 20px", borderRadius:100, fontSize:13, cursor:"pointer",
              background:activeTab===t ? "rgba(255,255,255,0.12)" : "transparent",
              color:activeTab===t ? "var(--white)" : "var(--muted)",
              fontWeight:activeTab===t ? 600 : 400, border:"none",
              fontFamily:"var(--font-body)", transition:"all 0.25s", textTransform:"capitalize",
            }}>{t}</button>
          ))}
        </div>

        {/* ── Overview Tab ── */}
        <AnimatePresence mode="wait">
          {activeTab==="overview" && (
            <motion.div key="overview" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              {/* Current League card */}
              <div style={{ padding:"32px", borderRadius:"var(--r-xl)", marginBottom:32, background:league.bg, border:`1px solid ${league.color}44`, backdropFilter:"blur(24px)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:24 }}>
                  <div style={{ fontSize:64 }}>{league.icon}</div>
                  <div>
                    <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:league.color, textTransform:"uppercase", marginBottom:6 }}>Current League</div>
                    <div style={{ fontFamily:"var(--font-head)", fontSize:36, fontWeight:800, color:league.color }}>{league.name}</div>
                    <div style={{ fontSize:14, color:"var(--muted)", marginTop:4 }}>{league.desc}</div>
                  </div>
                </div>
                {nextLeague && (
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"var(--muted)", marginBottom:8 }}>
                      <span>{league.name} ({totalDays} days)</span>
                      <span>{nextLeague.name} at {nextLeague.minDays} days</span>
                    </div>
                    <div style={{ height:6, borderRadius:100, background:"rgba(255,255,255,0.08)", overflow:"hidden" }}>
                      <motion.div initial={{ width:0 }} animate={{ width:`${leagueProgress}%` }} transition={{ duration:1, delay:0.5 }}
                        style={{ height:"100%", background:`linear-gradient(90deg,${league.color},${nextLeague.color})`, borderRadius:100 }} />
                    </div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginTop:8 }}>{nextLeague.minDays - totalDays} more days to reach {nextLeague.name} {nextLeague.icon}</div>
                  </div>
                )}
              </div>

              {/* All leagues */}
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, marginBottom:20 }}>League Path</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12 }}>
                {LEAGUES.map((l,i) => {
                  const isActive = l.name===league.name;
                  const isDone = totalDays >= l.minDays;
                  return (
                    <motion.div key={i} whileHover={{ scale:1.03 }}
                      style={{ padding:"16px 18px", borderRadius:"var(--r)", background:isDone ? l.bg : "var(--glass)", border:`1px solid ${isActive ? l.color : isDone ? l.color+"44" : "var(--border)"}`, backdropFilter:"blur(16px)", opacity:isDone?1:0.5 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6 }}>
                        <span style={{ fontSize:24 }}>{l.icon}</span>
                        <span style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, color:isDone?l.color:"var(--muted)" }}>{l.name}</span>
                        {isActive && <span style={{ fontSize:9, padding:"2px 7px", borderRadius:100, background:l.color, color:"var(--bg)", fontWeight:800 }}>YOU</span>}
                      </div>
                      <div style={{ fontSize:11, color:"var(--muted)" }}>From day {l.minDays}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Calendar Tab ── */}
          {activeTab==="calendar" && (
            <motion.div key="calendar" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, marginBottom:8 }}>Last 30 Days</h3>
              <p style={{ color:"var(--muted)", fontSize:13, marginBottom:28 }}>🟢 = Session completed · ⬜ = Rest day</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:10, maxWidth:500, marginBottom:40 }}>
                {DAYS.map(d => <div key={d} style={{ fontSize:10, fontWeight:700, color:"var(--muted)", textAlign:"center", letterSpacing:1, textTransform:"uppercase" }}>{d}</div>)}
                {calDots.map((dot,i) => (
                  <motion.div key={i} whileHover={{ scale:1.2 }} onClick={() => setCompleted(c => ({...c, [dot.key]:!dot.done}))}
                    style={{ aspectRatio:"1", borderRadius:"50%", background:dot.done?"var(--accent)":"rgba(255,255,255,0.06)", border:dot.done?"none":"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:9, color:dot.done?"var(--bg)":"var(--muted)", fontWeight:700, transition:"all 0.2s" }}>
                    {dot.date.getDate()}
                  </motion.div>
                ))}
              </div>

              {/* Streak history */}
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, marginBottom:20 }}>Body Parts Done This Week</h3>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))", gap:12 }}>
                {BODY_PARTS.map((bp,i) => {
                  const done = i < 5;
                  return (
                    <div key={bp} style={{ padding:"14px 16px", borderRadius:"var(--r)", background:done?"rgba(109,184,109,0.1)":"var(--glass)", border:`1px solid ${done?"rgba(109,184,109,0.25)":"var(--border)"}`, display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", background:done?"var(--accent)":"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, flexShrink:0 }}>{done?"✓":""}</div>
                      <span style={{ fontSize:13, color:done?"var(--white)":"var(--muted)" }}>{bp}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Leagues Tab ── */}
          {activeTab==="leagues" && (
            <motion.div key="leagues" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, marginBottom:6 }}>The League System</h3>
              <p style={{ color:"var(--muted)", fontSize:13, marginBottom:28 }}>Consistency is rewarded. The longer your streak, the higher your league. There are no shortcuts.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {LEAGUES.map((l,i) => {
                  const isDone = totalDays >= l.minDays;
                  const isActive = l.name===league.name;
                  return (
                    <motion.div key={i} whileHover={{ x:4 }}
                      style={{ display:"flex", alignItems:"center", gap:20, padding:"20px 24px", borderRadius:"var(--r-lg)", background:isActive?l.bg:isDone?"rgba(255,255,255,0.03)":"transparent", border:`1px solid ${isActive?l.color:isDone?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.04)"}`, backdropFilter:"blur(16px)", opacity:isDone?1:0.4 }}>
                      <div style={{ fontSize:36, flexShrink:0 }}>{l.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
                          <span style={{ fontFamily:"var(--font-head)", fontSize:18, fontWeight:700, color:isDone?l.color:"var(--muted)" }}>{l.name}</span>
                          {isActive && <span style={{ fontSize:10, padding:"2px 8px", borderRadius:100, background:l.color, color:"var(--bg)", fontWeight:800 }}>CURRENT</span>}
                          {!isDone && !isActive && <span style={{ fontSize:10, color:"var(--muted)" }}>Locked</span>}
                        </div>
                        <div style={{ fontSize:13, color:"var(--muted)" }}>{l.desc}</div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontFamily:"var(--font-head)", fontSize:20, fontWeight:700, color:isDone?l.color:"var(--muted)" }}>Day {l.minDays}+</div>
                        <div style={{ fontSize:11, color:"var(--muted)" }}>{l.maxDays < 999 ? `until day ${l.maxDays}` : "forever"}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── Graphs Tab ── */}
          {activeTab==="graphs" && (
            <motion.div key="graphs" initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                {/* Sessions per week */}
                <div style={{ background:"var(--glass)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:24, backdropFilter:"blur(20px)" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, marginBottom:6 }}>Sessions per Week</div>
                  <div style={{ fontSize:12, color:"var(--muted)", marginBottom:20 }}>How many times you exercised each week</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="week" tick={{ fill:"rgba(255,255,255,0.35)", fontSize:11 }} />
                      <YAxis tick={{ fill:"rgba(255,255,255,0.35)", fontSize:11 }} domain={[0,7]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="sessions" fill="var(--accent)" radius={[4,4,0,0]} name="Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Pain score */}
                <div style={{ background:"var(--glass)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:24, backdropFilter:"blur(20px)" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, marginBottom:6 }}>Pain Level Over Time</div>
                  <div style={{ fontSize:12, color:"var(--muted)", marginBottom:20 }}>Self-reported pain (1=none, 10=severe) — trending down ✅</div>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="week" tick={{ fill:"rgba(255,255,255,0.35)", fontSize:11 }} />
                      <YAxis tick={{ fill:"rgba(255,255,255,0.35)", fontSize:11 }} domain={[0,10]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="pain" stroke="#e05252" strokeWidth={2} dot={{ fill:"#e05252", r:3 }} name="Pain Score" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Energy */}
                <div style={{ background:"var(--glass)", border:"1px solid var(--border)", borderRadius:"var(--r-lg)", padding:24, backdropFilter:"blur(20px)", gridColumn:"1/-1" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:700, marginBottom:6 }}>Energy Level vs Sessions</div>
                  <div style={{ fontSize:12, color:"var(--muted)", marginBottom:20 }}>More consistent sessions = higher energy. The correlation is real.</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="week" tick={{ fill:"rgba(255,255,255,0.35)", fontSize:11 }} />
                      <YAxis tick={{ fill:"rgba(255,255,255,0.35)", fontSize:11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="energy" stroke="#d4a92a" strokeWidth={2.5} dot={{ fill:"#d4a92a", r:4 }} name="Energy" />
                      <Line type="monotone" dataKey="sessions" stroke="var(--accent)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Sessions" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Note about backend */}
              <div style={{ marginTop:24, padding:"18px 22px", borderRadius:"var(--r)", background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)", backdropFilter:"blur(16px)" }}>
                <div style={{ fontSize:13, color:"rgba(147,197,253,0.9)", lineHeight:1.65 }}>
                  🔗 <strong>Coming soon:</strong> Sign in with Google to save your real progress data, sync across devices, and access your full history. Your streak and league will persist in the cloud. The data above is a preview of how your dashboard will look.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
