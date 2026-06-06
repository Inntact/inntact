import { Check, Mail, LayoutDashboard, Wifi, Package } from "lucide-react";

export default function Success() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        {/* Tick */}
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#34d399,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(52,211,153,0.3)" }}>
          <Check size={32} color="#020617" strokeWidth={2.5} />
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>You're all set!</h1>
        <p style={{ color: "#64748b", fontSize: 16, margin: "0 0 32px", lineHeight: 1.6 }}>
          Your Inntact subscription is active. Check your email for your welcome message with dashboard login and guest page details.
        </p>

        {/* Steps */}
        <div style={{ background: "white", borderRadius: 14, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", padding: 28, textAlign: "left", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: 20 }}>What happens next</div>
          {[
            { icon: <Mail size={16} color="#34d399" />, title: "Check your email", body: "Your welcome email is on its way with your dashboard login and guest WiFi QR code." },
            { icon: <Package size={16} color="#34d399" />, title: "Your device is being prepared", body: "We'll configure and post your monitoring device within 3–5 working days." },
            { icon: <Wifi size={16} color="#34d399" />, title: "Plug in & go", body: "When it arrives, simply plug it into your router. Monitoring starts automatically." },
            { icon: <LayoutDashboard size={16} color="#34d399" />, title: "Watch your dashboard", body: "Log in to dashboard.inntact.co.uk to see live stats, alerts and speed history." },
          ].map(({ icon, title, body }, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 3 ? 20 : 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5 }}>{body}</div>
              </div>
            </div>
          ))}
        </div>

        <a href="https://dashboard.inntact.co.uk" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          background: "linear-gradient(135deg,#34d399,#22d3ee)", color: "#020617",
          textDecoration: "none", borderRadius: 9999, padding: "14px 32px",
          fontWeight: 700, fontSize: 15, marginBottom: 16,
        }}>
          <LayoutDashboard size={16} /> Go to your dashboard
        </a>

        <p style={{ fontSize: 12, color: "#94a3b8" }}>
          Questions? Email us at <a href="mailto:hello@inntact.co.uk" style={{ color: "#0d9488" }}>hello@inntact.co.uk</a>
        </p>
      </div>
    </div>
  );
}
