import { useState } from "react";
import { Wifi, ArrowRight, Check, Loader, Activity, Bell, Star } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line,
} from "recharts";

const speedData = Array.from({ length: 48 }, (_, i) => {
  const base = 285 + Math.sin(i / 3.2) * 28 + Math.cos(i / 6) * 10;
  return {
    t: i,
    down: Math.max(150, Math.round(base + (i === 19 ? -110 : 0))),
    up: Math.round(base / 9 + 4 + Math.sin(i / 2) * 2),
  };
});

const makeSpark = (seed) =>
  Array.from({ length: 18 }, (_, i) => ({
    x: i,
    y: 50 + Math.sin(i / 2 + seed) * 18 + Math.cos(i / 1.3 + seed) * 6,
  }));

function Pulse({ color = "bg-emerald-400" }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#34d399", opacity: 0.6, animation: "ping 1.5s ease-out infinite" }} />
      <span style={{ position: "relative", width: 8, height: 8, borderRadius: "50%", background: "#34d399", display: "block" }} />
    </span>
  );
}

function DashboardMockup() {
  return (
    <div style={{ display: "flex", height: "100%", width: "100%", background: "#020617", color: "#f1f5f9", fontSize: 10, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 120, flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.05)", padding: "12px 8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, padding: "0 4px" }}>
            <div style={{ width: 20, height: 20, borderRadius: 5, background: "linear-gradient(135deg,#34d399,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Wifi size={11} color="#020617" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 11 }}>Inntact</span>
          </div>
          {[["Overview", true], ["Properties", false], ["Alerts", false], ["Sensors", false]].map(([l, a]) => (
            <div key={l} style={{ padding: "5px 8px", borderRadius: 6, marginBottom: 2, background: a ? "rgba(255,255,255,0.1)" : "transparent", color: a ? "#f1f5f9" : "#64748b", fontSize: 10 }}>{l}</div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: 8, fontSize: 9, color: "#64748b" }}>
          <div style={{ marginBottom: 2 }}>Plan</div>
          <div style={{ color: "#f1f5f9", fontWeight: 500 }}>Pro · 3 properties</div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Topbar */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "6px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "3px 8px", fontSize: 9, color: "#64748b" }}>Search properties…</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "#34d399", background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 9999, padding: "2px 8px" }}>
            <Pulse /> All systems operational
          </div>
        </div>

        <div style={{ flex: 1, padding: 12, overflow: "hidden" }}>
          {/* Greeting */}
          <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontSize: 9, color: "#64748b" }}>Friday, 17 April</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Good morning, Eddie</div>
            </div>
            <div style={{ fontSize: 9, color: "#475569" }}>Last synced · 12s ago</div>
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 10 }}>
            {[["Uptime","99.98%","emerald"],["Avg speed","287 Mbps","cyan"],["Latency","12ms","teal"],["Sensors","4 / 4","emerald"]].map(([l,v,c]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 6, padding: "6px 8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ fontSize: 8, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 8, marginBottom: 10, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontSize: 9, fontWeight: 500, marginBottom: 4 }}>Download speed · 24h — Sea View Cottage</div>
            <div style={{ height: 60 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={speedData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="csDown" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 380]} />
                  <Area type="monotone" dataKey="down" stroke="#34d399" strokeWidth={1.5} fill="url(#csDown)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Properties */}
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)", fontSize: 9, fontWeight: 500, display: "flex", justifyContent: "space-between" }}>
              <span>Properties</span><span style={{ color: "#475569" }}>3 active</span>
            </div>
            {[
              { name: "Sea View Cottage", loc: "Cornwall", speed: "312 Mbps", status: "Healthy", color: "#34d399", spark: makeSpark(1) },
              { name: "Lakeside Lodge", loc: "Lake District", speed: "268 Mbps", status: "Healthy", color: "#34d399", spark: makeSpark(3) },
              { name: "The Oast House", loc: "Kent", speed: "94 Mbps", status: "Slow upload", color: "#fbbf24", spark: makeSpark(7) },
            ].map((p) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize: 8, color: "#475569" }}>{p.loc}</div>
                </div>
                <div style={{ width: 50, height: 20 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={p.spark}>
                      <Line type="monotone" dataKey="y" stroke={p.color} strokeWidth={1} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ fontSize: 8, color: "#94a3b8", width: 55, textAlign: "right" }}>{p.speed}</div>
                <div style={{ fontSize: 8, color: p.color, width: 60, textAlign: "right" }}>{p.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", background: "#020617", color: "#f1f5f9", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />

      {/* Backgrounds */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(34,211,238,0.07), transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none", zIndex: 0 }} />

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes ping { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        .fade-1 { animation: fadeUp 0.7s ease both; }
        .fade-2 { animation: fadeUp 0.7s ease 0.15s both; }
        .fade-3 { animation: fadeUp 0.7s ease 0.3s both; }
        .fade-4 { animation: fadeUp 0.7s ease 0.45s both; }
        .fade-5 { animation: fadeUp 0.7s ease 0.6s both; }
        .fade-6 { animation: fadeUp 0.7s ease 0.75s both; }
        .email-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 9999px; padding: 14px 24px; color: white; font-size: 15px; outline: none; width: 100%; font-family: 'DM Sans', sans-serif; transition: border-color 0.2s; }
        .email-input::placeholder { color: rgba(148,163,184,0.6); }
        .email-input:focus { border-color: rgba(52,211,153,0.4); }
        .submit-btn { background: linear-gradient(135deg, #34d399, #22d3ee); border: none; border-radius: 9999px; padding: 14px 28px; color: #020617; font-weight: 500; font-size: 15px; cursor: pointer; display: flex; align-items: center; gap: 8px; white-space: nowrap; font-family: 'DM Sans', sans-serif; transition: opacity 0.2s, transform 0.2s; }
        .submit-btn:hover { opacity: 0.9; transform: scale(1.02); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .spinner { animation: spin 0.8s linear infinite; }
        .dashboard-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      {/* Hero section */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "5rem 1.5rem 3rem" }}>

        {/* Logo */}
        <div className="fade-1" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "3rem" }}>
          <div style={{ position: "relative", width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,#34d399,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(52,211,153,0.3)" }}>
            <Wifi size={20} color="#020617" strokeWidth={2.5} />
            <div style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, borderRadius: "50%", background: "#34d399", border: "2px solid #020617" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#34d399", animation: "ping 1.5s ease-out infinite" }} />
            </div>
          </div>
          <span style={{ fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em" }}>Inntact</span>
        </div>

        {/* Eyebrow */}
        <div className="fade-2" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9999, padding: "6px 16px", marginBottom: "1.5rem" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
          <span style={{ fontSize: 13, color: "#94a3b8", letterSpacing: "0.05em" }}>Launching soon</span>
        </div>

        {/* Headline */}
        <h1 className="fade-3" style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 400, lineHeight: 1.1, marginBottom: "1.25rem", letterSpacing: "-0.02em", maxWidth: 640 }}>
          Your guests deserve{" "}
          <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#34d399,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            perfect WiFi.
          </span>
        </h1>

        {/* Subheading */}
        <p className="fade-4" style={{ fontSize: 17, color: "#94a3b8", lineHeight: 1.7, marginBottom: "2.5rem", fontWeight: 300, maxWidth: 520 }}>
          Inntact monitors your holiday let internet 24/7 — catching outages before your guests do. We're putting the finishing touches on something special.
        </p>

        {/* CTA form */}
        <div className="fade-5" style={{ width: "100%", maxWidth: 520 }}>
          {status === "success" ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 9999, padding: "14px 24px", color: "#34d399" }}>
              <Check size={18} />
              <span style={{ fontSize: 15 }}>You're on the list — we'll be in touch!</span>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  className="email-input"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  disabled={status === "loading"}
                />
                <button className="submit-btn" onClick={handleSubmit} disabled={status === "loading"}>
                  {status === "loading" ? (
                    <Loader size={16} className="spinner" />
                  ) : (
                    <>Get Early Access <ArrowRight size={16} /></>
                  )}
                </button>
              </div>
              {status === "error" && (
                <p style={{ marginTop: "0.75rem", fontSize: 13, color: "#f87171" }}>Something went wrong — please try again.</p>
              )}
            </>
          )}
          <p style={{ marginTop: "1rem", fontSize: 13, color: "#475569" }}>No spam. Just a heads-up when we launch.</p>
        </div>

        {/* Pain bullets */}
        <div className="fade-6" style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {[
            "Catch outages before guests do",
            "Instant SMS & email alerts",
            "Protect your 5-star reviews",
          ].map((f) => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#64748b" }}>
              <Check size={13} color="#34d399" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard showcase */}
      <div className="fade-6" style={{ position: "relative", zIndex: 10, padding: "0 1.5rem 5rem", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ textAlign: "center", fontSize: 13, color: "#334155", marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>See it in action</p>

        <div className="dashboard-float" style={{ position: "relative" }}>
          {/* Glow */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(52,211,153,0.12), transparent 70%)", borderRadius: 20, pointerEvents: "none" }} />

          {/* Laptop frame */}
          <div style={{ position: "relative", background: "#0f172a", borderRadius: "16px 16px 0 0", border: "1px solid rgba(255,255,255,0.08)", padding: 8, boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
            <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 40, height: 4, borderRadius: 9999, background: "#1e293b" }} />
            <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ aspectRatio: "16/10" }}>
                <DashboardMockup />
              </div>
            </div>
          </div>
          {/* Base */}
          <div style={{ height: 10, background: "linear-gradient(to bottom, #1e293b, #0f172a)", borderRadius: "0 0 8px 8px", margin: "0 -8px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }} />

          {/* Floating chips */}
          <div style={{ position: "absolute", top: 40, left: -20, background: "rgba(2,6,23,0.9)", border: "1px solid rgba(52,211,153,0.3)", borderRadius: 9999, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
            <Check size={12} color="#34d399" />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "white" }}>Uptime 99.98%</div>
              <div style={{ fontSize: 9, color: "#64748b" }}>last 30 days</div>
            </div>
          </div>

          <div style={{ position: "absolute", top: 80, right: -20, background: "rgba(2,6,23,0.9)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: 9999, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
            <Bell size={12} color="#fbbf24" />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "white" }}>Slow upload detected</div>
              <div style={{ fontSize: 9, color: "#64748b" }}>Oast House · 2m ago</div>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 30, left: "20%", background: "rgba(2,6,23,0.9)", border: "1px solid rgba(34,211,238,0.3)", borderRadius: 9999, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>
            <Activity size={12} color="#22d3ee" />
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "white" }}>Speed 312 Mbps</div>
              <div style={{ fontSize: 9, color: "#64748b" }}>Sea View Cottage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
