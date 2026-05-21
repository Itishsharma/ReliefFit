// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { id:"home",         label:"Home" },
  { id:"routine",      label:"Routine" },
  { id:"home-workout", label:"Workouts" },
  { id:"gym",          label:"Gym" },
  { id:"progress",     label:"Progress" },
];

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    setPage(id);
    setMobileOpen(false);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(10,12,10,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      {/* Logo - left */}
      <motion.div
        onClick={() => go("home")}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}
        whileHover={{ opacity: 0.8 }}
      >
        {/* Logo mark */}
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #4a7c4a, #8fd68f)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L4 7h3v4H4l5 5 5-5h-3V7h3L9 2z" fill="white" />
          </svg>
        </div>
        <span style={{
          fontFamily: "var(--font-head)", fontWeight: 700, fontSize: 17,
          letterSpacing: "-0.3px", color: "var(--white)",
        }}>
          Relief<span style={{ color: "var(--accent)" }}>Fit</span>
        </span>
      </motion.div>

      {/* Center pill nav - exactly like Forma AI */}
      <div style={{
        position: "absolute", left: "50%", transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 100,
        padding: "5px 6px",
        display: "flex", alignItems: "center", gap: 2,
      }}
        className="desktop-nav"
      >
        {/* X / close icon like Forma */}
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", marginRight: 4,
          color: "rgba(255,255,255,0.5)", fontSize: 13, fontWeight: 700,
        }} onClick={() => go("home")}>✕</div>

        {LINKS.map(n => (
          <button
            key={n.id}
            onClick={() => go(n.id)}
            style={{
              padding: "8px 18px", borderRadius: 100, fontSize: 13.5,
              fontWeight: page === n.id ? 600 : 400,
              color: page === n.id ? "var(--white)" : "rgba(255,255,255,0.55)",
              background: page === n.id ? "rgba(255,255,255,0.12)" : "transparent",
              border: "none", cursor: "pointer", transition: "all 0.25s",
              fontFamily: "var(--font-body)",
            }}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Right side - BePro button like Forma's Download */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => go("premium")}
        style={{
          padding: "10px 22px", borderRadius: 100,
          background: "var(--white)", color: "var(--bg)",
          fontSize: 13, fontWeight: 700, cursor: "pointer",
          fontFamily: "var(--font-body)",
          flexShrink: 0,
        }}
      >
        BePro
      </motion.button>
    </motion.nav>
  );
}
