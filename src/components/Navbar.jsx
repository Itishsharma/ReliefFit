// src/components/Navbar.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const LINKS = [
  { id:"home",         label:"Home" },
  { id:"routine",      label:"Routine" },
  { id:"home-workout", label:"Workouts" },
  { id:"gym",          label:"Gym" },
  { id:"progress",     label:"Progress" },
];

const GoogleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

/* 3-D cartoon avatar — drawn in SVG, matches the uploaded reference:
   round peach face · coloured hair · sunglasses · jacket            */
function CartoonAvatar({ size = 36 }) {
  const s = size;
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{ display:"block", flexShrink:0 }}>
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#b3d4f5"/>
          <stop offset="100%" stopColor="#7db8ee"/>
        </radialGradient>
        <radialGradient id="faceGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#fde8d0"/>
          <stop offset="100%" stopColor="#f5c9a0"/>
        </radialGradient>
        <radialGradient id="hairGrad" cx="50%" cy="30%" r="55%">
          <stop offset="0%"   stopColor="#4ecb6e"/>
          <stop offset="100%" stopColor="#2a9e47"/>
        </radialGradient>
        <radialGradient id="jacketGrad" cx="50%" cy="20%" r="70%">
          <stop offset="0%"   stopColor="#40d9b0"/>
          <stop offset="100%" stopColor="#1aad88"/>
        </radialGradient>
        <radialGradient id="hoodGrad" cx="50%" cy="0%" r="90%">
          <stop offset="0%"   stopColor="#ff9eb5"/>
          <stop offset="100%" stopColor="#f06080"/>
        </radialGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.18)"/>
        </filter>
        <clipPath id="avatarClip">
          <rect x="0" y="0" width="100" height="100" rx="50" ry="50"/>
        </clipPath>
      </defs>

      {/* ── circle background ── */}
      <circle cx="50" cy="50" r="50" fill="url(#bgGrad)"/>

      <g clipPath="url(#avatarClip)">

        {/* ── jacket body ── */}
        <ellipse cx="50" cy="96" rx="38" ry="22" fill="url(#jacketGrad)" filter="url(#softShadow)"/>
        {/* jacket left panel */}
        <path d="M22 82 Q18 90 14 106 L46 106 L44 78 Z" fill="url(#jacketGrad)"/>
        {/* jacket right panel */}
        <path d="M78 82 Q82 90 86 106 L54 106 L56 78 Z" fill="url(#jacketGrad)"/>

        {/* ── pink hoodie inner ── */}
        <path d="M38 80 Q50 75 62 80 L65 106 L35 106 Z" fill="url(#hoodGrad)"/>
        {/* white tee peek */}
        <ellipse cx="50" cy="88" rx="9" ry="6" fill="rgba(255,255,255,0.85)"/>

        {/* ── neck ── */}
        <rect x="44" y="64" width="12" height="16" rx="6" fill="url(#faceGrad)"/>

        {/* ── face ── */}
        <ellipse cx="50" cy="52" rx="22" ry="24" fill="url(#faceGrad)" filter="url(#softShadow)"/>

        {/* face highlight */}
        <ellipse cx="43" cy="44" rx="7" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-15,43,44)"/>

        {/* ── hair — top dome ── */}
        <ellipse cx="50" cy="30" rx="24" ry="20" fill="url(#hairGrad)"/>

        {/* ── hair — side left ── */}
        <rect x="26" y="30" width="9" height="30" rx="4" fill="url(#hairGrad)"/>
        {/* ── hair — side right ── */}
        <rect x="65" y="30" width="9" height="30" rx="4" fill="url(#hairGrad)"/>

        {/* ── hair — jagged fringe (zigzag across forehead) ── */}
        <path d="M28 40 L33 33 L38 40 L43 32 L48 40 L53 32 L58 40 L63 33 L68 40 L68 30 L28 30 Z"
          fill="url(#hairGrad)"/>

        {/* ── sunglasses frame ── */}
        <rect x="31" y="47" width="16" height="11" rx="3" fill="#1a1a1a"/>
        <rect x="53" y="47" width="16" height="11" rx="3" fill="#1a1a1a"/>
        {/* bridge */}
        <line x1="47" y1="52" x2="53" y2="52" stroke="#1a1a1a" strokeWidth="2.5"/>
        {/* temples */}
        <line x1="31" y1="52" x2="27" y2="51" stroke="#1a1a1a" strokeWidth="2"/>
        <line x1="69" y1="52" x2="73" y2="51" stroke="#1a1a1a" strokeWidth="2"/>
        {/* lens shine */}
        <rect x="33" y="49" width="5" height="3" rx="1.5" fill="rgba(255,255,255,0.18)"/>
        <rect x="55" y="49" width="5" height="3" rx="1.5" fill="rgba(255,255,255,0.18)"/>
        {/* lens dark tint */}
        <rect x="31" y="47" width="16" height="11" rx="3" fill="rgba(0,0,0,0.45)"/>
        <rect x="53" y="47" width="16" height="11" rx="3" fill="rgba(0,0,0,0.45)"/>

        {/* ── nose ── */}
        <ellipse cx="50" cy="60" rx="4" ry="3" fill="rgba(220,140,110,0.55)"/>

        {/* ── mouth — subtle smile ── */}
        <path d="M45 67 Q50 70 55 67" stroke="#c0826a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

export default function Navbar({ page, setPage }) {
  const { user, loading, loginWithGoogle, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  const go = (id) => {
    setPage(id);
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.4,0,0.2,1], delay: 0.15 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: "flex", alignItems: "center",
        padding: "10px 28px",
        /* transparent — no background */
        background: "transparent",
        backdropFilter: "none",
      }}
    >
      {/* ── LEFT: Logo ── */}
      <div onClick={() => go("home")}
        style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", flexShrink:0 }}>
        <div style={{
          width:28, height:28, borderRadius:8, flexShrink:0,
          background:"linear-gradient(135deg,#ff3b1e,#ff6b2e)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 0 14px rgba(255,59,30,0.45)",
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
              stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span style={{ fontFamily:"var(--font-display)", fontSize:15, fontWeight:700,
          letterSpacing:"-0.3px", color:"#fff" }}>
          Relief<span style={{ color:"#ff4d2e" }}>Fit</span>
        </span>
      </div>

      {/* ── CENTER: glass pill with nav links ── */}
      <div style={{
        position:"absolute", left:"50%", transform:"translateX(-50%)",
        display:"flex", alignItems:"center", gap:2,
        /* glass effect */
        background:"rgba(255,255,255,0.07)",
        backdropFilter:"blur(20px)",
        WebkitBackdropFilter:"blur(20px)",
        border:"1px solid rgba(255,255,255,0.14)",
        borderRadius:100,
        padding:"4px 6px",
        boxShadow:"0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}>
        {LINKS.map(n => (
          <button key={n.id} onClick={() => go(n.id)}
            style={{
              padding:"7px 16px", borderRadius:100,
              fontSize:13, fontWeight: page===n.id ? 600 : 400,
              background: page===n.id ? "rgba(255,255,255,0.15)" : "transparent",
              color:      page===n.id ? "#fff"                   : "rgba(255,255,255,0.5)",
              border:"none", cursor:"pointer",
              transition:"color 0.2s, background 0.2s",
              fontFamily:"var(--font-body)", whiteSpace:"nowrap",
            }}
            onMouseEnter={e => { if(page!==n.id) e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { if(page!==n.id) e.currentTarget.style.color="rgba(255,255,255,0.5)"; }}
          >{n.label}</button>
        ))}
      </div>

      {/* ── RIGHT: BePro + Auth ── */}
      <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>

        {/* BePro */}
        <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.96 }}
          onClick={() => go("premium")}
          style={{
            padding:"8px 18px", borderRadius:100, fontSize:13, fontWeight:700,
            background:"linear-gradient(135deg,#ff3b1e,#ff6b2e)",
            color:"#fff", border:"none", cursor:"pointer",
            fontFamily:"var(--font-body)",
            boxShadow:"0 0 18px rgba(255,59,30,0.4)",
            whiteSpace:"nowrap",
          }}>BePro</motion.button>

        {/* Auth area */}
        {!loading && (
          !user ? (
            /* Sign in button */
            <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.96 }}
              onClick={loginWithGoogle}
              style={{
                display:"flex", alignItems:"center", gap:6,
                padding:"8px 15px", borderRadius:100,
                fontSize:13, fontWeight:600,
                background:"rgba(255,255,255,0.08)",
                border:"1px solid rgba(255,255,255,0.15)",
                color:"#fff", cursor:"pointer",
                fontFamily:"var(--font-body)", whiteSpace:"nowrap",
              }}>
              <GoogleIcon/> Sign in
            </motion.button>
          ) : (
            /* Avatar + dropdown */
            <div style={{ position:"relative" }}>
              <motion.button whileHover={{ scale:1.08 }} whileTap={{ scale:0.93 }}
                onClick={() => setShowMenu(m => !m)}
                style={{
                  width:38, height:38, padding:0, border:"none",
                  borderRadius:"50%", overflow:"hidden",
                  cursor:"pointer", background:"none",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  outline:"2.5px solid rgba(255,59,30,0.65)",
                  outlineOffset:2,
                }}>
                {user.photoURL
                  ? <img src={user.photoURL} alt="av"
                      style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }}/>
                  : <CartoonAvatar size={38}/>
                }
              </motion.button>

              <AnimatePresence>
                {showMenu && (
                  <>
                    <div style={{ position:"fixed", inset:0, zIndex:-1 }}
                      onClick={() => setShowMenu(false)}/>
                    <motion.div
                      initial={{ opacity:0, y:8, scale:0.94 }}
                      animate={{ opacity:1, y:0, scale:1 }}
                      exit={{    opacity:0, y:8, scale:0.94 }}
                      transition={{ duration:0.16 }}
                      style={{
                        position:"absolute", top:"calc(100% + 10px)", right:0,
                        background:"rgba(10,12,22,0.95)",
                        border:"1px solid rgba(255,255,255,0.1)",
                        borderRadius:16, padding:14, minWidth:220,
                        boxShadow:"0 24px 56px rgba(0,0,0,0.7)",
                        backdropFilter:"blur(28px)",
                        WebkitBackdropFilter:"blur(28px)",
                        zIndex:10,
                      }}>
                      {/* User info */}
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, paddingBottom:12, borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
                        <div style={{ width:44, height:44, borderRadius:"50%", overflow:"hidden", flexShrink:0, outline:"2px solid rgba(255,59,30,0.5)", outlineOffset:2 }}>
                          {user.photoURL
                            ? <img src={user.photoURL} alt="av" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                            : <CartoonAvatar size={44}/>
                          }
                        </div>
                        <div style={{ minWidth:0 }}>
                          <div style={{ fontSize:13, fontWeight:700, color:"#fff", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {user.displayName}
                          </div>
                          <div style={{ fontSize:11, color:"var(--muted)", marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                            {user.email}
                          </div>
                        </div>
                      </div>

                      <button onClick={() => go("progress")}
                        style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 10px", borderRadius:9, fontSize:13, color:"rgba(255,255,255,0.75)", background:"rgba(255,255,255,0.04)", border:"none", cursor:"pointer", fontFamily:"var(--font-body)", marginBottom:6, textAlign:"left" }}>
                        📊 My Progress
                      </button>

                      <button onClick={() => { logout(); setShowMenu(false); }}
                        style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"9px 10px", borderRadius:9, fontSize:13, color:"#ff6b4a", background:"rgba(255,59,30,0.07)", border:"1px solid rgba(255,59,30,0.18)", cursor:"pointer", fontFamily:"var(--font-body)", textAlign:"left" }}>
                        ↩ Sign out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )
        )}
      </div>
    </motion.div>
  );
}