import { useState } from "react";
import { Wifi, ArrowRight, Check } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#020617", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      {/* Background glow */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(16,185,129,0.2), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(34,211,238,0.08), transparent 60%)", pointerEvents: "none" }} />

      {/* Grid */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px", WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)", pointerEvents: "none" }} />

      {/* Animated orb */}
      <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)", animation: "pulse 4s ease-in-out infinite" }} />

      <style>{`
        @keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
        .fade-1 { animation: fadeUp 0.7s ease both; }
        .fade-2 { animation: fadeUp 0.7s ease 0.15s both; }
        .fade-3 { animation: fadeUp 0.7s ease 0.3s both; }
        .fade-4 { animation: fadeUp 0.7s ease 0.45s both; }
        .fade-5 { animation: fadeUp 0.7s ease 0.6s both; }
        .email-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 9999px; padding: 14px 24px; color: white; font-size: 15px; outline: none; width: 100%; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; }
        .email-input::placeholder { color: rgba(148,163,184,0.6); }
        .email-input:focus { border-color: rgba(52,211,153,0.4); }
        .submit-btn { background: linear-gradient(135deg, #34d399, #22d3ee); border: none; border-radius: 9999px; padding: 14px 28px; color: #020617; font-weight: 500; font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 8px; white-space: nowrap; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s, transform 0.2s; }
        .submit-btn:hover { opacity: 0.9; transform: scale(1.02); }
      `}</style>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem", maxWidth: "640px", width: "100%" }}>
        
        {/* Logo */}
        <div className="fade-1" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "3rem" }}>
          <div style={{ position: "relative", width: "40px", height: "40px", borderRadius: "10px", background: "linear-gradient(135deg, #34d399, #22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(52,211,153,0.3)" }}>
            <Wifi size={20} color="#020617" strokeWidth={2.5} />
            <div style={{ position: "absolute", top: "-3px", right: "-3px", width: "10px", height: "10px", borderRadius: "50%", background: "#34d399", border: "2px solid #020617" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#34d399", animation: "ping 1.5s ease-out infinite" }} />
            </div>
          </div>
          <span style={{ fontSize: "22px", fontWeight: 500, color: "white", letterSpacing: "-0.02em" }}>Inntact</span>
        </div>

        {/* Eyebrow */}
        <div className="fade-2" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "9999px", padding: "6px 16px", marginBottom: "1.5rem" }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: "13px", color: "#94a3b8", letterSpacing: "0.05em" }}>Launching soon</span>
        </div>

        {/* Headline */}
        <h1 className="fade-3" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 400, lineHeight: 1.1, color: "white", marginBottom: "1.25rem", letterSpacing: "-0.02em" }}>
          Your guests deserve{" "}
          <span style={{ fontStyle: "italic", background: "linear-gradient(135deg, #34d399, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            perfect WiFi.
          </span>
        </h1>

        {/* Subheading */}
        <p className="fade-4" style={{ fontSize: "17px", color: "#94a3b8", lineHeight: 1.7, marginBottom: "2.5rem", fontWeight: 300 }}>
          Inntact monitors your holiday let internet 24/7 — catching outages before your guests do. We're putting the finishing touches on something special.
        </p>

        {/* Email form */}
        <div className="fade-5">
          {!submitted ? (
            <div style={{ display: "flex", gap: "10px", maxWidth: "480px", margin: "0 auto" }}>
              <input
                className="email-input"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              <button className="submit-btn" onClick={handleSubmit}>
                Notify me
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "9999px", padding: "14px 24px", color: "#34d399" }}>
              <Check size={18} />
              <span style={{ fontSize: "15px" }}>You're on the list — we'll be in touch!</span>
            </div>
          )}

          <p style={{ marginTop: "1rem", fontSize: "13px", color: "#475569" }}>
            No spam. Just a heads-up when we launch.
          </p>
        </div>

        {/* Features preview */}
        <div className="fade-5" style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {["24/7 monitoring", "Instant alerts", "Smart sensors"].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748b" }}>
              <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#34d399", flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
