import { useState } from "react";
import {
  Wifi, Check, ArrowRight, ArrowLeft, Shield, Zap, BarChart3,
  Lock, ChevronDown, ChevronUp, AlertCircle, Loader
} from "lucide-react";

const MONTHLY_PRICE = 49;
const ANNUAL_PRICE  = 490;
const ANNUAL_MONTHLY_EQUIV = (ANNUAL_PRICE / 12).toFixed(0);

const API_BASE = import.meta.env.VITE_API_BASE || "https://backend.inntact.co.uk";

// ── Shared atoms ──────────────────────────────────────────────────────────────

function GradientText({ children }) {
  return (
    <span style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
      {children}
    </span>
  );
}

function Input({ label, type = "text", value, onChange, placeholder, hint, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#0f172a", marginBottom: 6 }}>
        {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%", boxSizing: "border-box",
          padding: "10px 14px", borderRadius: 8,
          border: "1.5px solid #e2e8f0", fontSize: 14,
          outline: "none", fontFamily: "inherit",
          transition: "border-color 0.15s",
          background: "white", color: "#0f172a",
        }}
        onFocus={e => e.target.style.borderColor = "#34d399"}
        onBlur={e => e.target.style.borderColor = "#e2e8f0"}
      />
      {hint && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#94a3b8" }}>{hint}</p>}
    </div>
  );
}

function PlanToggle({ plan, onChange }) {
  return (
    <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 10, padding: 4, marginBottom: 24, position: "relative" }}>
      {["monthly", "annual"].map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 7, border: "none", cursor: "pointer",
            background: plan === p ? "white" : "transparent",
            boxShadow: plan === p ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
            fontWeight: plan === p ? 600 : 400,
            fontSize: 14, color: plan === p ? "#0f172a" : "#64748b",
            transition: "all 0.2s", fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}
        >
          {p === "monthly" ? "Monthly" : (
            <>
              Annual
              <span style={{ background: "linear-gradient(135deg,#34d399,#22d3ee)", color: "#020617", fontSize: 11, fontWeight: 700, borderRadius: 9999, padding: "2px 8px" }}>
                Save £98
              </span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Step indicators ───────────────────────────────────────────────────────────

function Steps({ current }) {
  const steps = ["Plan", "Your details", "Property", "Payment"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
      {steps.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              background: i < current ? "linear-gradient(135deg,#34d399,#22d3ee)" : i === current ? "#0f172a" : "#f1f5f9",
              fontSize: 12, fontWeight: 600,
              color: i < current ? "#020617" : i === current ? "white" : "#94a3b8",
            }}>
              {i < current ? <Check size={13} /> : i + 1}
            </div>
            <span style={{ fontSize: 13, fontWeight: i === current ? 600 : 400, color: i === current ? "#0f172a" : "#94a3b8", whiteSpace: "nowrap" }}>
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: i < current ? "#34d399" : "#e2e8f0", margin: "0 12px" }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Step 0: Plan selection ────────────────────────────────────────────────────

function StepPlan({ plan, setPlan, onNext }) {
  const features = [
    "24/7 broadband monitoring",
    "Instant SMS & email alerts",
    "Owner dashboard",
    "Guest WiFi status page & QR code",
    "Smart sensor support",
    "Pre-configured monitoring device included",
    "Self-install in around 10 minutes",
    "Hardware remains Inntact property",
  ];

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>
        Choose your plan
      </h2>
      <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 28px" }}>
        One plan. Everything included. Cancel any time.
      </p>

      <PlanToggle plan={plan} onChange={setPlan} />

      {/* Price card */}
      <div style={{
        border: "2px solid transparent",
        backgroundImage: "linear-gradient(white,white), linear-gradient(135deg,#34d399,#22d3ee)",
        backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box",
        borderRadius: 14, padding: 28, marginBottom: 24,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", marginBottom: 4 }}>
              {plan === "annual" ? "Annual plan" : "Monthly plan"}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
              <span style={{ fontSize: 42, fontWeight: 700, color: "#0f172a" }}>
                £{plan === "annual" ? ANNUAL_MONTHLY_EQUIV : MONTHLY_PRICE}
              </span>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>/month</span>
            </div>
            {plan === "annual" && (
              <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>
                Billed annually as £{ANNUAL_PRICE}
              </div>
            )}
          </div>
          <div style={{ background: "linear-gradient(135deg,rgba(52,211,153,0.1),rgba(34,211,238,0.1))", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 9999, padding: "4px 12px", fontSize: 12, color: "#0d9488", fontWeight: 600 }}>
            Everything included
          </div>
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
          {features.map(f => (
            <li key={f} style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0", fontSize: 14, color: "#334155" }}>
              <Check size={15} color="#34d399" strokeWidth={2.5} style={{ flexShrink: 0 }} />
              {f}
            </li>
          ))}
        </ul>

        <button onClick={onNext} style={{
          width: "100%", padding: "14px 0", borderRadius: 9999, border: "none",
          background: "linear-gradient(135deg,#34d399,#22d3ee)", color: "#020617",
          fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "opacity 0.15s",
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
          onMouseLeave={e => e.currentTarget.style.opacity = "1"}
        >
          Get started <ArrowRight size={16} />
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
        {[
          { icon: <Shield size={14} />, text: "No setup fees" },
          { icon: <Zap size={14} />, text: "Cancel any time" },
          { icon: <Lock size={14} />, text: "Secure payments by Stripe" },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8" }}>
            {icon}{text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Step 1: Customer details ──────────────────────────────────────────────────

function StepDetails({ form, setField, onNext, onBack }) {
  const valid = form.name && form.email && form.phone;
  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "0 0 20px", fontFamily: "inherit" }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>Your details</h2>
      <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 24px" }}>We'll use these to set up your account and send your welcome email.</p>

      <Input label="Full name" value={form.name} onChange={v => setField("name", v)} placeholder="Jane Smith" required />
      <Input label="Email address" type="email" value={form.email} onChange={v => setField("email", v)} placeholder="jane@example.com" required hint="Your dashboard login will be created with this email" />
      <Input label="Phone number" type="tel" value={form.phone} onChange={v => setField("phone", v)} placeholder="07700 900123" required hint="We'll use this for urgent alerts only" />

      <button onClick={onNext} disabled={!valid} style={{
        width: "100%", padding: "14px 0", borderRadius: 9999, border: "none",
        background: valid ? "linear-gradient(135deg,#34d399,#22d3ee)" : "#e2e8f0",
        color: valid ? "#020617" : "#94a3b8", fontWeight: 700, fontSize: 15,
        cursor: valid ? "pointer" : "not-allowed", fontFamily: "inherit",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        marginTop: 8,
      }}>
        Continue <ArrowRight size={16} />
      </button>
    </div>
  );
}

// ── Step 2: Property details ──────────────────────────────────────────────────

function StepProperty({ form, setField, onNext, onBack }) {
  const [showWifi, setShowWifi] = useState(false);
  const valid = form.property_name && form.address && form.wifi_name && form.wifi_password;

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "0 0 20px", fontFamily: "inherit" }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>Your property</h2>
      <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 24px" }}>Tell us about the property we'll be monitoring.</p>

      <Input label="Property name" value={form.property_name} onChange={v => setField("property_name", v)} placeholder="Sea View Cottage" required hint="This appears on your guest WiFi page" />
      <Input label="Full postal address" value={form.address} onChange={v => setField("address", v)} placeholder="1 Harbour Lane, St Ives, TR26 1AA" required hint="We'll post your monitoring device here" />

      <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setShowWifi(v => !v)}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>WiFi credentials</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Needed to set up your guest WiFi page</div>
          </div>
          {showWifi ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
        </div>
        {showWifi && (
          <div style={{ marginTop: 16 }}>
            <div style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 8 }}>
              <Lock size={14} color="#0d9488" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: "#0d9488" }}>Your WiFi credentials are encrypted in transit and stored securely on your dedicated server. They are never shared.</span>
            </div>
            <Input label="WiFi network name (SSID)" value={form.wifi_name} onChange={v => setField("wifi_name", v)} placeholder="SeaViewCottage_Guest" required />
            <Input label="WiFi password" type="password" value={form.wifi_password} onChange={v => setField("wifi_password", v)} placeholder="••••••••" required />
          </div>
        )}
        {!showWifi && (form.wifi_name || form.wifi_password) && (
          <div style={{ marginTop: 8, fontSize: 12, color: "#34d399", display: "flex", alignItems: "center", gap: 4 }}>
            <Check size={12} /> WiFi details saved
          </div>
        )}
      </div>

      <button
        onClick={() => { if (!showWifi && (!form.wifi_name || !form.wifi_password)) { setShowWifi(true); } else { onNext(); } }}
        disabled={!valid}
        style={{
          width: "100%", padding: "14px 0", borderRadius: 9999, border: "none",
          background: valid ? "linear-gradient(135deg,#34d399,#22d3ee)" : "#e2e8f0",
          color: valid ? "#020617" : "#94a3b8", fontWeight: 700, fontSize: 15,
          cursor: valid ? "pointer" : "not-allowed", fontFamily: "inherit",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          marginTop: 8,
        }}
      >
        Continue to payment <ArrowRight size={16} />
      </button>
    </div>
  );
}

// ── Step 3: Payment summary + checkout ───────────────────────────────────────

function StepPayment({ form, plan, onBack }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API_BASE}/api/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Could not connect to payment server. Please try again.");
      setLoading(false);
    }
  };

  const priceLabel = plan === "annual"
    ? `£${ANNUAL_PRICE}/year (£${ANNUAL_MONTHLY_EQUIV}/mo)`
    : `£${MONTHLY_PRICE}/month`;

  return (
    <div>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", gap: 6, fontSize: 13, padding: "0 0 20px", fontFamily: "inherit" }}>
        <ArrowLeft size={14} /> Back
      </button>
      <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>Review & pay</h2>
      <p style={{ color: "#64748b", fontSize: 15, margin: "0 0 24px" }}>Check your details before heading to secure checkout.</p>

      {/* Summary */}
      {[
        { title: "Your details", rows: [["Name", form.name], ["Email", form.email], ["Phone", form.phone]] },
        { title: "Property", rows: [["Name", form.property_name], ["Address", form.address], ["WiFi network", form.wifi_name]] },
        { title: "Plan", rows: [["Billing", plan === "annual" ? "Annual" : "Monthly"], ["Amount", priceLabel]] },
      ].map(({ title, rows }) => (
        <div key={title} style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: 10 }}>{title}</div>
          {rows.map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: 14 }}>
              <span style={{ color: "#64748b" }}>{l}</span>
              <span style={{ color: "#0f172a", fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>
      ))}

      {error && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
          <AlertCircle size={14} color="#ef4444" />
          <span style={{ fontSize: 13, color: "#dc2626" }}>{error}</span>
        </div>
      )}

      <button onClick={handleCheckout} disabled={loading} style={{
        width: "100%", padding: "16px 0", borderRadius: 9999, border: "none",
        background: "linear-gradient(135deg,#34d399,#22d3ee)", color: "#020617",
        fontWeight: 700, fontSize: 16, cursor: loading ? "wait" : "pointer",
        fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        opacity: loading ? 0.8 : 1, marginBottom: 12,
      }}>
        {loading ? <><Loader size={16} style={{ animation: "spin 0.8s linear infinite" }} /> Taking you to payment…</> : <><Lock size={15} /> Pay securely with Stripe</>}
      </button>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, fontSize: 12, color: "#94a3b8" }}>
        <Shield size={12} /> Payments processed securely by Stripe. Inntact never stores card details.
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ── Main signup page ──────────────────────────────────────────────────────────

export default function Signup() {
  const [step, setStep]   = useState(0);
  const [plan, setPlan]   = useState("monthly");
  const [form, setForm]   = useState({
    name: "", email: "", phone: "",
    property_name: "", address: "", wifi_name: "", wifi_password: "",
  });

  const setField = (key, val) => setForm(f => ({ ...f, [key]: val }));

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Nav */}
      <nav style={{ background: "white", borderBottom: "1px solid #e2e8f0", padding: "0 24px", height: 60, display: "flex", alignItems: "center" }}>
        <a href="https://inntact.co.uk" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#34d399,#22d3ee)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Wifi size={16} color="#020617" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 18, fontWeight: 600, color: "#0f172a" }}>Inntact</span>
        </a>
      </nav>

      {/* Card */}
      <div style={{ maxWidth: 580, margin: "40px auto", padding: "0 16px 60px" }}>
        <div style={{ background: "white", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", padding: "36px 40px" }}>
          {step > 0 && <Steps current={step} />}
          {step === 0 && <StepPlan plan={plan} setPlan={setPlan} onNext={() => setStep(1)} />}
          {step === 1 && <StepDetails form={form} setField={setField} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <StepProperty form={form} setField={setField} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
          {step === 3 && <StepPayment form={form} plan={plan} onBack={() => setStep(2)} />}
        </div>
      </div>
    </div>
  );
}
