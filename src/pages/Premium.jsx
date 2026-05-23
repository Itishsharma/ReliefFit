// src/pages/Premium.jsx — Forma AI style pricing + working toggle + payment modal
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Monthly prices → Yearly = 20% off (rounded)
const PLANS = [
  {
    name:"Free", monthlyPrice:0, yearlyPrice:0, period:"forever", free:true,
    featured:false, cta:"Current Plan",
    acc:"rgba(255,255,255,0.08)", accB:"rgba(255,255,255,0.12)", grad:null,
    features:[
      {t:"All 8 body area exercises",a:true},{t:"Daily routine guide",a:true},
      {t:"Home workout library",a:true},{t:"Basic gym workouts",a:true},
      {t:"Video physio calls",a:false},{t:"Personalised program",a:false},
      {t:"Live expert Q&A",a:false},{t:"Progress analytics",a:false},
    ],
  },
  {
    name:"Pro", monthlyPrice:12, yearlyPrice:10, period:"/month",  free:false,
    featured:true, cta:"Start Free Trial",
    acc:"rgba(255,59,30,0.08)", accB:"rgba(255,59,30,0.35)", grad:"linear-gradient(135deg,#ff3b1e,#ff6b2e)",
    features:[
      {t:"Everything in Free",a:true},{t:"Unlimited video calls",a:true},
      {t:"Certified physiotherapist",a:true},{t:"Custom 12-week plan",a:true},
      {t:"Real-time posture analysis",a:true},{t:"Weekly live Q&A",a:true},
      {t:"Full progress tracking",a:true},{t:"Priority 24/7 support",a:false},
    ],
  },
  {
    name:"Elite", monthlyPrice:29, yearlyPrice:23, period:"/month", free:false,
    featured:false, cta:"Go Elite",
    acc:"rgba(139,92,246,0.06)", accB:"rgba(139,92,246,0.25)", grad:"linear-gradient(135deg,#8b5cf6,#3b82f6)",
    features:[
      {t:"Everything in Pro",a:true},{t:"Dedicated physiotherapist",a:true},
      {t:"Daily check-ins",a:true},{t:"Priority 24/7 support",a:true},
      {t:"Desk ergonomics audit",a:true},{t:"Nutrition coaching",a:true},
      {t:"Custom meal plans",a:true},{t:"Monthly review call",a:true},
    ],
  },
];

const TESTIMONIALS = [
  {stars:5,text:"3 months in — back pain from 8/10 to barely noticeable. The video calls changed everything.",name:"Rahul M.",role:"Software Engineer",avatar:"👨‍💻"},
  {stars:5,text:"The neck yoga alone was worth it. No more weekly painkillers. 2 months pain-free.",name:"Priya S.",role:"Data Analyst",avatar:"👩‍💼"},
  {stars:5,text:"My physio spotted anterior pelvic tilt immediately. Fixed in 3 weeks.",name:"Arjun K.",role:"UI Designer",avatar:"👨‍🎨"},
  {stars:5,text:"3 movement breaks a day and I'm somehow MORE productive. Witchcraft.",name:"Sneha P.",role:"Product Manager",avatar:"👩‍💻"},
  {stars:4,text:"Upgraded to Pro after week 1. Having a real physio analyse my posture was priceless.",name:"Vikram T.",role:"Accountant",avatar:"👨‍💼"},
  {stars:5,text:"Finally someone who explains exactly why face pulls matter for desk workers.",name:"Ananya R.",role:"Content Creator",avatar:"👩‍🎨"},
];

function BookingForm() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", issue:"", time:"" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (!form.issue.trim()) e.issue = "Please describe your issue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (validate()) setSent(true);
  };

  if (sent) return (
    <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
      style={{ textAlign:"center", padding:"48px 32px" }}>
      <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
      <h3 style={{ fontFamily:"var(--font-display)", fontSize:24, fontWeight:700, marginBottom:12, color:"#34d399" }}>We'll Contact You Soon!</h3>
      <p style={{ color:"var(--muted)", fontSize:15, lineHeight:1.7, maxWidth:360, margin:"0 auto" }}>
        Thank you, <strong style={{ color:"#fff" }}>{form.name}</strong>! Your booking request has been received. Our team will reach out at <strong style={{ color:"#ff4d2e" }}>{form.email}</strong> within 24 hours to confirm your appointment.
      </p>
      <div style={{ marginTop:24, padding:"14px 20px", borderRadius:12, background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.2)", fontSize:13, color:"#34d399" }}>
        📞 Alternatively, WhatsApp us at +91 98765 43210
      </div>
    </motion.div>
  );

  const inp = (label, key, type="text", placeholder="") => (
    <div style={{ marginBottom:16 }}>
      <label style={{ display:"block", fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)", marginBottom:7, letterSpacing:"0.05em" }}>{label}</label>
      <input type={type} placeholder={placeholder} value={form[key]}
        onChange={e => setForm(p => ({...p,[key]:e.target.value}))}
        style={{ width:"100%", padding:"12px 16px", borderRadius:10, fontSize:14,
          background:"rgba(255,255,255,0.05)", border:`1px solid ${errors[key] ? "#ff4d2e" : "rgba(255,255,255,0.1)"}`,
          color:"#fff", fontFamily:"var(--font-body)", outline:"none" }} />
      {errors[key] && <div style={{ fontSize:11, color:"#ff4d2e", marginTop:4 }}>{errors[key]}</div>}
    </div>
  );

  return (
    <div>
      {inp("Your Name *","name","text","Dr. Priya Sharma")}
      {inp("Email Address *","email","email","you@example.com")}
      {inp("Phone Number","phone","tel","+91 98765 43210")}
      <div style={{ marginBottom:16 }}>
        <label style={{ display:"block", fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)", marginBottom:7 }}>Preferred Slot</label>
        <select value={form.time} onChange={e => setForm(p=>({...p,time:e.target.value}))}
          style={{ width:"100%", padding:"12px 16px", borderRadius:10, fontSize:14,
            background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)",
            color:"#fff", fontFamily:"var(--font-body)", outline:"none" }}>
          <option value="">Select a time</option>
          {["Morning (9–11 AM)","Afternoon (2–4 PM)","Evening (6–8 PM)"].map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div style={{ marginBottom:20 }}>
        <label style={{ display:"block", fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)", marginBottom:7 }}>Describe Your Pain / Issue *</label>
        <textarea rows={3} placeholder="e.g. Lower back pain for 3 months, worsens when sitting..." value={form.issue}
          onChange={e => setForm(p=>({...p,issue:e.target.value}))}
          style={{ width:"100%", padding:"12px 16px", borderRadius:10, fontSize:14,
            background:"rgba(255,255,255,0.05)", border:`1px solid ${errors.issue ? "#ff4d2e" : "rgba(255,255,255,0.1)"}`,
            color:"#fff", fontFamily:"var(--font-body)", outline:"none", resize:"vertical" }} />
        {errors.issue && <div style={{ fontSize:11, color:"#ff4d2e", marginTop:4 }}>{errors.issue}</div>}
      </div>
      <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
        onClick={submit}
        style={{ width:"100%", padding:"14px", borderRadius:100, fontSize:15, fontWeight:700, cursor:"pointer",
          background:"linear-gradient(135deg,#8b5cf6,#3b82f6)", color:"#fff", border:"none", fontFamily:"var(--font-body)" }}>
        Book My Free Consultation →
      </motion.button>
    </div>
  );
}

// ── Payment-down modal ──────────────────────────────────────────
function PaymentModal({ plan, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1,    opacity: 1, y: 0  }}
          exit={{    scale: 0.85, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: "rgba(14,16,26,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 24, padding: "40px 36px", maxWidth: 420, width: "100%",
            textAlign: "center", boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
          }}
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, -8, 8, -5, 5, 0] }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontSize: 56, marginBottom: 20 }}
          >
            🔧
          </motion.div>

          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,59,30,0.12)", border: "1px solid rgba(255,59,30,0.3)",
            borderRadius: 100, padding: "5px 14px", marginBottom: 18,
            fontSize: 12, fontWeight: 700, letterSpacing: 1,
            color: "#ff6b4a", textTransform: "uppercase",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ff3b1e", display: "inline-block", animation: "pulse 1.5s infinite" }} />
            Payment Server Down
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
            We're Sorry for the Inconvenience
          </h3>

          <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.75, marginBottom: 8 }}>
            Our payment gateway is currently undergoing maintenance.
            The <strong style={{ color: "#fff" }}>{plan.name}</strong> plan
            ({plan.grad ? `$${plan.yearlyPrice || plan.monthlyPrice}/mo` : "Free"}) will be available shortly.
          </p>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginBottom: 28 }}>
            Please try again in a little while. Your interest has been noted — we'll notify you when payments are back online.
          </p>

          {/* ETA chip */}
          <div style={{
            padding: "12px 16px", borderRadius: 12, marginBottom: 28,
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          }}>
            <span style={{ fontSize: 16 }}>⏱</span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Estimated fix time: <strong style={{ color: "#fbbf24" }}>2–4 hours</strong>
            </span>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={onClose}
              style={{
                flex: 1, padding: "12px", borderRadius: 100, fontSize: 14,
                fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)",
                background: "rgba(255,255,255,0.08)", color: "#fff",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              Got it
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => { onClose(); document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" }); }}
              style={{
                flex: 1, padding: "12px", borderRadius: 100, fontSize: 14,
                fontWeight: 700, cursor: "pointer", fontFamily: "var(--font-body)",
                background: "linear-gradient(135deg,#8b5cf6,#3b82f6)", color: "#fff", border: "none",
              }}
            >
              Book a Physio Call
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Premium() {
  // ── State ──
  const [yearly,     setYearly]     = useState(false);   // toggle
  const [modalPlan,  setModalPlan]  = useState(null);     // which paid plan was clicked

  const handlePlanClick = (plan) => {
    if (plan.free) return;          // Free plan — do nothing
    setModalPlan(plan);             // paid → show maintenance modal
  };

  return (
    <div className="page-enter" style={{ paddingTop:100, paddingBottom:80 }}>

      {/* ── Payment modal ── */}
      {modalPlan && <PaymentModal plan={modalPlan} onClose={() => setModalPlan(null)} />}

      {/* BIG background text like Forma AI */}
      <div style={{ position:"relative", textAlign:"center", padding:"60px 0 0", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", fontSize:"clamp(80px,14vw,200px)", fontFamily:"var(--font-display)", fontWeight:800, color:"rgba(255,255,255,0.02)", pointerEvents:"none", whiteSpace:"nowrap", userSelect:"none" }}>
          PRICING
        </div>
        <div className="container" style={{ position:"relative", zIndex:1 }}>
          <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <div className="label" style={{ color:"rgba(255,59,30,0.8)", marginBottom:16, display:"flex", justifyContent:"center" }}>Membership</div>
            <h1 className="display-sm" style={{ marginBottom:14 }}>Invest in Your Body</h1>
            <p style={{ color:"var(--muted)", maxWidth:460, margin:"0 auto 28px" }}>Start free. Upgrade for personalised physio support from certified experts.</p>
            {/* ── Working toggle ── */}
            <button
              onClick={() => setYearly(y => !y)}
              style={{
                display:"inline-flex", alignItems:"center", gap:12,
                background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                padding:"8px 16px", borderRadius:100, cursor:"pointer",
                fontFamily:"var(--font-body)",
              }}
            >
              <span style={{ fontSize:13, color: yearly ? "var(--muted)" : "#fff", fontWeight: yearly ? 400 : 600, transition:"all 0.25s" }}>Monthly</span>

              {/* pill track */}
              <div style={{ width:44, height:24, borderRadius:100, background: yearly ? "#10b981" : "#ff3b1e", position:"relative", transition:"background 0.3s", flexShrink:0 }}>
                <motion.div
                  animate={{ left: yearly ? 24 : 4 }}
                  transition={{ type:"spring", stiffness:400, damping:30 }}
                  style={{ width:16, height:16, borderRadius:"50%", background:"#fff", position:"absolute", top:4 }}
                />
              </div>

              <span style={{ fontSize:13, color: yearly ? "#fff" : "var(--muted)", fontWeight: yearly ? 600 : 400, transition:"all 0.25s" }}>
                Yearly{" "}
                <motion.span
                  animate={{ opacity: yearly ? 1 : 0.5, scale: yearly ? 1 : 0.9 }}
                  style={{ display:"inline-block", color:"#10b981", fontSize:11 }}
                >
                  -20%
                </motion.span>
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="container" style={{ marginTop:52 }}>
        {/* Pricing cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20, alignItems:"start" }}>
          {PLANS.map((plan, i) => {
            const price = plan.free ? 0 : (yearly ? plan.yearlyPrice : plan.monthlyPrice);
            return (
            <motion.div key={i}
              initial={{ opacity:0, y:40, scale:0.97 }} whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:true }} transition={{ duration:0.55, delay:i*0.12 }}
              whileHover={{ y:-8 }}
              style={{ position:"relative", borderRadius:"var(--r-xl)", overflow:"hidden",
                background:plan.acc, border:`1px solid ${plan.accB}`,
                backdropFilter:"blur(32px)", padding: plan.featured ? "36px 32px 32px" : "32px",
                marginTop: plan.featured ? "-14px" : "0",
              }}>
              {plan.grad && <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:plan.grad }} />}
              {plan.featured && <div style={{ position:"absolute", top:16, right:16, fontSize:11, fontWeight:800, letterSpacing:1, padding:"4px 12px", borderRadius:100, background:"#ff3b1e", color:"#fff", textTransform:"uppercase" }}>Popular</div>}

              <div style={{ fontSize:12, fontWeight:700, letterSpacing:2, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", marginBottom:14 }}>{plan.name}</div>

              {/* Price — animates when toggle changes */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:4, marginBottom:4 }}>
                <span style={{ fontFamily:"var(--font-display)", fontSize:14, fontWeight:600, color:"rgba(255,255,255,0.5)", alignSelf:"flex-start", marginTop:10 }}>
                  {plan.free ? "" : "$"}
                </span>
                <motion.span
                  key={`${plan.name}-${yearly}`}
                  initial={{ opacity:0, y:-10 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.3 }}
                  style={{ fontFamily:"var(--font-display)", fontSize:56, fontWeight:800, lineHeight:1 }}
                >
                  {plan.free ? "Free" : price}
                </motion.span>
              </div>

              <div style={{ fontSize:14, color:"var(--muted)", marginBottom: yearly && !plan.free ? 4 : 28 }}>
                {plan.free ? "forever" : `${plan.period}${yearly ? ", billed yearly" : ""}`}
              </div>

              {/* Yearly saving note */}
              {yearly && !plan.free && (
                <motion.div
                  initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:"auto" }}
                  style={{ fontSize:11, color:"#10b981", marginBottom:18, fontWeight:600 }}
                >
                  Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/year
                </motion.div>
              )}

              <div style={{ height:1, background:"rgba(255,255,255,0.07)", marginBottom:24 }} />
              {plan.features.map((f,j) => (
                <div key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:13, marginBottom:13, color:f.a?"var(--text)":"rgba(255,255,255,0.3)" }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800,
                    background:f.a?(plan.grad||"rgba(255,255,255,0.12)"):"rgba(255,255,255,0.04)",
                    color:f.a?"#fff":"rgba(255,255,255,0.2)" }}>{f.a?"✓":"—"}</div>
                  {f.t}
                </div>
              ))}

              <motion.button
                whileHover={{ scale: plan.free ? 1 : 1.03 }}
                whileTap={{ scale: plan.free ? 1 : 0.97 }}
                onClick={() => handlePlanClick(plan)}
                style={{
                  marginTop:24, width:"100%", padding:"14px", borderRadius:100, fontSize:14, fontWeight:700,
                  cursor: plan.free ? "default" : "pointer",
                  fontFamily:"var(--font-body)",
                  background: plan.free ? "rgba(255,255,255,0.06)" : (plan.grad || "rgba(255,255,255,0.08)"),
                  color: plan.free ? "rgba(255,255,255,0.4)" : "#fff",
                  border: plan.grad ? "none" : "1px solid rgba(255,255,255,0.12)",
                  boxShadow: plan.featured ? "0 8px 30px rgba(255,59,30,0.35)" : "none",
                }}>
                {plan.cta}
              </motion.button>
            </motion.div>
            );
          })}
        </div>

        {/* Video Call + Booking Form */}
        <motion.div id="booking-form" initial={{ opacity:0, y:32 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          style={{ marginTop:80, borderRadius:"var(--r-xl)", background:"linear-gradient(135deg,rgba(139,92,246,0.06),rgba(59,130,246,0.06))", border:"1px solid rgba(139,92,246,0.2)", backdropFilter:"blur(32px)", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, padding:"48px", alignItems:"start" }}>
          <div>
            <div className="label" style={{ color:"#8b5cf6", marginBottom:14 }}>Pro Exclusive</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:34, fontWeight:700, marginBottom:18, lineHeight:1.2 }}>Video Calls with<br /><span style={{ color:"#a78bfa" }}>Real Physiotherapists</span></h2>
            <p style={{ color:"var(--muted)", marginBottom:24, lineHeight:1.8, fontSize:14 }}>Show your physio how you move live. Get a personalised recovery protocol built for your body in one session.</p>
            {[["📹","HD Video Calls","Connect from anywhere, anytime"],["🎯","Live Posture Analysis","Real-time feedback as you move"],["📋","Custom Recovery Plan","Built for your specific pain points"],["📈","Monthly Progress Reviews","Track and celebrate improvements"]].map(([ic,t,d],i) => (
              <div key={i} style={{ display:"flex", gap:12, marginBottom:16 }}>
                <div style={{ fontSize:18, marginTop:2 }}>{ic}</div>
                <div>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:600, fontSize:14, marginBottom:2 }}>{t}</div>
                  <div style={{ fontSize:12, color:"var(--muted)" }}>{d}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking form */}
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"var(--r-lg)", padding:28, backdropFilter:"blur(16px)" }}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, marginBottom:6 }}>Book a Free Consultation</div>
            <div style={{ fontSize:13, color:"var(--muted)", marginBottom:24 }}>First session is on us. No credit card needed.</div>
            <BookingForm />
          </div>
        </motion.div>

        {/* Testimonials */}
        <div style={{ marginTop:80 }}>
          <div className="label" style={{ color:"rgba(255,59,30,0.8)", marginBottom:16 }}>Real Results</div>
          <h2 className="display-sm" style={{ marginBottom:40 }}>What Members Say</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
            {TESTIMONIALS.map((t,i) => (
              <motion.div key={i} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.08 }}
                whileHover={{ y:-4 }}
                style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"var(--r-lg)", padding:24, backdropFilter:"blur(20px)" }}>
                <div style={{ color:"#f59e0b", fontSize:12, marginBottom:12, letterSpacing:2 }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", lineHeight:1.75, marginBottom:18, fontStyle:"italic" }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, border:"1px solid rgba(255,255,255,0.1)" }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight:600, fontSize:13 }}>{t.name}</div>
                    <div style={{ fontSize:11, color:"var(--muted)" }}>{t.role}</div>
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
