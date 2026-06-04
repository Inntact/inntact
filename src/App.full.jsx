import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wifi, Bell, Gauge, Activity, Thermometer, Droplet, AlertTriangle, Check,
  ArrowRight, Star, Menu, X, Signal, ChevronRight, Sparkles, TrendingUp, Clock, Globe,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer,
} from "recharts";


function Pulse({ color = "bg-emerald-400" }) {
  return (
    <span aria-hidden="true" className="relative inline-flex h-2 w-2">
      <span className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-60 animate-ping`} />
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}

function GradientText({ children, className = "" }) {
  return (
    <span className={`bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
}

function GlowButton({ children, primary = false, className = "", href }) {
  const isAnchorOrExternal = href && (href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:"));
  const Tag = href ? (isAnchorOrExternal ? "a" : Link) : "button";
  const tagProps = href ? (isAnchorOrExternal ? { href } : { to: href }) : {};

  if (primary) {
    return (
      <Tag {...tagProps} className={`group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-400/40 hover:scale-105 active:scale-95 ${className}`}>
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 blur-xl transition-opacity group-hover:opacity-60" />
        <span className="relative">{children}</span>
        <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Tag>
    );
  }
  return (
    <Tag {...tagProps} className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/30 ${className}`}>
      {children}
    </Tag>
  );
}


function LaptopMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="pointer-events-none absolute inset-x-0 -top-20 bottom-0 mx-auto h-3/4 max-w-4xl rounded-full bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-teal-500/20 blur-3xl" />
      <div className="relative mx-auto w-full rounded-t-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-emerald-900/30">
        <div className="absolute left-1/2 top-1 h-1 w-10 -translate-x-1/2 rounded-full bg-slate-800" />
        <div className="overflow-hidden rounded-xl border border-white/5">
          <div className="w-full" style={{ aspectRatio: "16 / 10" }}>
            <img
              src="/dashboard-owner.png"
              alt="Inntact owner dashboard showing live WiFi status and connection history"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
      <div className="relative mx-auto h-3 rounded-b-xl bg-gradient-to-b from-slate-700 to-slate-800 shadow-xl" style={{ width: "103%", transform: "translateX(-1.5%)" }}>
        <div className="absolute left-1/2 top-0 h-1 w-20 -translate-x-1/2 rounded-b-full bg-slate-900/80" />
      </div>
      <div className="relative mx-auto mt-1 h-6 rounded-full bg-black/40 blur-xl" style={{ width: "90%" }} />
    </div>
  );
}

function SectionEyebrow({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
      <Pulse color="bg-emerald-400" />{children}
    </div>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2 className={`text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl ${className}`}>
      {children}
    </h2>
  );
}

function PainCard({ icon, title, body, highlight, highlightLabel }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/10">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(244,63,94,0.08), transparent 60%)" }} />
      <div className="relative">
        <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-300">{icon}</div>
        <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{body}</p>
        {highlight && (
          <div className="mt-6 flex items-baseline gap-2 border-t border-white/5 pt-4">
            <span className="text-2xl font-semibold text-white">{highlight}</span>
            <span className="text-xs text-slate-500">{highlightLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureBlock({ icon, tag, title, body, visual }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 transition hover:border-emerald-500/30">
      <div className="mb-5 flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-300">{icon}</div>
        <span className="text-xs uppercase tracking-widest text-slate-500">{tag}</span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{body}</p>
      <div className="mt-6 flex-1 rounded-xl border border-white/5 bg-slate-950/60 p-4">{visual}</div>
    </div>
  );
}

function MonitoringVisual() {
  const data = Array.from({ length: 24 }, (_, i) => ({ x: i, y: 80 + Math.sin(i / 2) * 12 + Math.cos(i / 3) * 6 }));
  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2"><Pulse /><span className="text-slate-300">Online</span></div>
        <span className="text-slate-500">24 hours</span>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fv1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="y" stroke="#34d399" strokeWidth={1.8} fill="url(#fv1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        {[{ l: "Status", v: "Online" }, { l: "This week", v: "Stable" }, { l: "Drops", v: "None" }].map((s) => (
          <div key={s.l} className="rounded-lg bg-white/5 p-2">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">{s.l}</div>
            <div className="text-sm font-semibold text-white">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertVisual() {
  return (
    <div className="space-y-2">
      <AlertRow color="rose" title="Broadband offline" time="now" body="Example Cottage · line down" />
      <AlertRow color="amber" title="Slower than usual" time="2m" body="Example Lodge · upload dropped" />
      <AlertRow color="emerald" title="Back to normal" time="14m" body="Example Barn · speed restored" />
    </div>
  );
}

function AlertRow({ color, title, time, body }) {
  const map = {
    rose: { ring: "ring-rose-500/30", dot: "bg-rose-400", text: "text-rose-300" },
    amber: { ring: "ring-amber-500/30", dot: "bg-amber-400", text: "text-amber-300" },
    emerald: { ring: "ring-emerald-500/30", dot: "bg-emerald-400", text: "text-emerald-300" },
  };
  const s = map[color];
  return (
    <div className={`flex items-center gap-3 rounded-lg bg-white/5 p-2 ring-1 ${s.ring}`}>
      <span className={`h-2 w-2 rounded-full ${s.dot}`} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold ${s.text}`}>{title}</span>
          <span className="text-[10px] text-slate-500">{time}</span>
        </div>
        <div className="truncate text-[11px] text-slate-400">{body}</div>
      </div>
    </div>
  );
}

function DashboardVisual() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-500">Last 30 days</div>
          <div className="text-sm font-semibold tracking-tight text-white">Connection history</div>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400/70" />Online</span>
          <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400/80" />Brief drop</span>
        </div>
      </div>
      <div className="mb-3 flex" style={{ gap: "3px" }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className={`h-8 flex-1 rounded-sm ${i === 11 ? "bg-amber-400/80" : "bg-emerald-400/70"}`} style={{ opacity: 0.4 + ((i * 37) % 60) / 100 }} />
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>30 days ago</span><span>today</span>
      </div>
    </div>
  );
}

function FloatingChip({ className = "", color, icon, title, sub }) {
  const map = {
    emerald: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    amber: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
  };
  return (
    <div className={`absolute z-20 inline-flex items-center gap-2 rounded-full border bg-slate-950/80 px-3 py-2 text-xs shadow-xl backdrop-blur-md ${map[color]} ${className}`}>
      <span>{icon}</span>
      <div className="leading-tight">
        <div className="font-semibold text-white">{title}</div>
        <div className="text-[10px] opacity-80">{sub}</div>
      </div>
    </div>
  );
}

function SensorCard({ icon, title, value, status, color }) {
  const map = {
    emerald: "from-emerald-500/15 border-emerald-500/20 text-emerald-300",
    cyan: "from-cyan-500/15 border-cyan-500/20 text-cyan-300",
    teal: "from-teal-500/15 border-teal-500/20 text-teal-300",
  };
  return (
    <div className={`rounded-2xl border bg-gradient-to-br ${map[color]} to-transparent p-5 backdrop-blur-sm`}>
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">{icon}</div>
        <span className="text-[10px] uppercase tracking-widest">{status}</span>
      </div>
      <div className="text-xs text-slate-400">{title}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-white">{value}</div>
    </div>
  );
}

function PriceCard({ name, price, per, desc, features, cta, highlighted }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-7 transition ${highlighted ? "border-emerald-400/40 bg-gradient-to-b from-emerald-500/10 to-slate-900/60 shadow-xl shadow-emerald-900/20" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
      {highlighted && (
        <div className="absolute right-5 top-5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-200">Best value</div>
      )}
      <div className="text-sm font-semibold tracking-wide text-slate-300">{name}</div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tracking-tight text-white">{price}</span>
        {per && <span className="text-sm text-slate-500">{per}</span>}
      </div>
      <p className="mt-3 text-sm text-slate-400">{desc}</p>
      <Link to="/signup" className={`mt-6 block w-full rounded-full px-5 py-2.5 text-center text-sm font-semibold transition ${highlighted ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/30" : "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"}`}>
        {cta}
      </Link>
      <ul className="mt-7 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            <span dangerouslySetInnerHTML={{ __html: f }} />
          </li>
        ))}
      </ul>
    </div>
  );
}


function FaqItem({ q, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 py-5 text-left transition hover:text-white" aria-expanded={open}>
        <span className="text-base font-medium text-white">{q}</span>
        <ChevronRight className={`h-4 w-4 shrink-0 text-emerald-300 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-slate-400">{children}</p>}
    </div>
  );
}

export default function InntactHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden scroll-smooth bg-slate-950 font-sans text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at 0% 30%, rgba(20,184,166,0.08), transparent 60%)" }} />
      <div className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0.035, backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "48px 48px", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 80%)", maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 80%)" }} />

      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-white/5 bg-slate-950/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" aria-label="Inntact home" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/30">
              <Wifi className="h-4 w-4 text-slate-950" strokeWidth={2.5} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-300 ring-2 ring-slate-950" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Inntact</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">How it works</a>
            <a href="#solution" className="transition hover:text-white">Dashboard</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#faq" className="transition hover:text-white">FAQ</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="https://dashboard.inntact.co.uk/" className="text-sm text-slate-300 transition hover:text-white">Sign in</a>
            <GlowButton primary href="/signup" className="!py-2 !text-xs">Get set up</GlowButton>
          </div>
          <button onClick={() => setMenuOpen((v) => !v)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden" aria-label="Menu">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/5 bg-slate-950/95 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <a href="#features" onClick={() => setMenuOpen(false)}>How it works</a>
              <a href="#solution" onClick={() => setMenuOpen(false)}>Dashboard</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
              <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
              <div className="pt-2"><GlowButton primary href="/signup" className="w-full">Get set up</GlowButton></div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative z-10 px-6 pt-32 sm:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
            <Pulse color="bg-emerald-400" />
            Looking after UK holiday lets, 24/7
          </div>
          <h1 className="mx-auto max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl" style={{ lineHeight: 1.05 }}>
            Your holiday let, looked after around the clock
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-400 sm:text-xl">
            Inntact keeps watch over your property day and night — monitoring the WiFi, restarting the router automatically when it drops, and catching leaks or damp early. Real peace of mind between guests, without you having to check a thing.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton primary href="/signup">Get set up</GlowButton>
            <GlowButton href="#features">See how it works</GlowButton>
          </div>
          <p className="mt-5 text-sm text-slate-400">From £49 a month per property · cancel any time</p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xs text-slate-500 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />Most properties live in about 10 minutes</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />30-day money-back guarantee</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />Secure payment by Stripe</span>
          </div>
        </div>
        <div className="relative mx-auto mt-20 max-w-6xl px-4" role="img" aria-label="Preview of the Inntact owner dashboard"><LaptopMockup /></div>
        <div className="mx-auto mt-16 max-w-5xl px-6">
          <p className="text-center text-xs uppercase text-slate-500" style={{ letterSpacing: "0.2em" }}>Built for UK holiday-let owners</p>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>The problem</SectionEyebrow>
          <SectionTitle>WiFi trouble is best <GradientText>caught early</GradientText></SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">When the WiFi goes down in a holiday let, the guest is the first to notice and you're usually the last to know — often only when it turns up in a review. Inntact closes that gap.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-3">
          <PainCard icon={<AlertTriangle className="h-5 w-5" />} title="Guests notice a dropout first" body="Working guests rely on the WiFi. When it drops, they feel it straight away — and you'd usually rather hear it from us than from them." />
          <PainCard icon={<Clock className="h-5 w-5" />} title="You're often miles away" body="Managing a property remotely, it's hard to know what's happening on the ground. Inntact keeps watch so you don't have to guess." />
          <PainCard icon={<Star className="h-5 w-5" />} title="It's your reviews on the line" body="A spell of bad WiFi is the kind of thing that ends up in a review. Catching it early keeps small problems from becoming public ones." />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>The solution</SectionEyebrow>
          <SectionTitle>Not just alerts — Inntact <GradientText>acts when WiFi drops</GradientText></SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">Inntact watches your WiFi around the clock and steps in automatically when it drops. Most problems clear with a restart on their own; when one needs a real fix, you'll know right away — with the history to back you up.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-3">
          <FeatureBlock icon={<Activity className="h-5 w-5" />} tag="Monitoring" title="24/7 monitoring & alerts" body="We watch your property's connection around the clock, so a drop never goes unnoticed. As soon as a real problem is confirmed, you get a plain email: what's happening, and since when." visual={<MonitoringVisual />} />
          <FeatureBlock icon={<Bell className="h-5 w-5" />} tag="Auto-restart" title="Automatic router restart" body="If your WiFi drops, we restart the router for you through a smart plug — which clears most common outages on its own, usually before you'd even hear about it. When a restart isn't enough, you'll know straight away." visual={<AlertVisual />} />
          <FeatureBlock icon={<Gauge className="h-5 w-5" />} tag="Reporting" title="Weekly report & history" body="A simple summary each week, plus a full record of every drop. Spot recurring patterns early — and if your broadband provider is the cause, you've got the evidence to take to them." visual={<DashboardVisual />} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>How it works</SectionEyebrow>
          <SectionTitle>Up and running <GradientText>in about 10 minutes</GradientText></SectionTitle>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-3">
          {[
            { n: "1", title: "Plug in your kit", body: "Your monitor and smart plug arrive ready to go. Plug the monitor into your router, plug the router into the smart plug, and power it on. No apps to configure, nothing technical to set." },
            { n: "2", title: "Place your sensors", body: "Your temperature, humidity and water-leak sensors come already paired, so there's no fiddly setup. Just pop them where they're needed — under a sink, in the loft, by the boiler — and they start working straight away." },
            { n: "3", title: "We take it from here", body: "If your WiFi drops, Inntact restarts the router automatically and emails you what happened. Each week you also get a simple health report — usually there's nothing for you to do." },
          ].map((step) => (
            <div key={step.n} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-6 transition hover:border-emerald-500/30">
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-sm font-semibold text-emerald-300">{step.n}</div>
              <h3 className="text-xl font-semibold tracking-tight text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section id="solution" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>Dashboard</SectionEyebrow>
          <SectionTitle>Your property's WiFi health <GradientText>at a glance</GradientText></SectionTitle>
        </div>
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-2 shadow-2xl shadow-emerald-900/20 backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border border-white/5" style={{ aspectRatio: "16 / 9.5" }}>
              <img
                src="/dashboard-owner.png"
                alt="Inntact owner dashboard showing live WiFi status, broadband health and sensor readings"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
          <FloatingChip className="left-2 top-10 hidden md:flex" color="emerald" icon={<Check className="h-3 w-3" />} title="Connection healthy" sub="All looking good" />
          <FloatingChip className="right-2 top-24 hidden md:flex" color="amber" icon={<AlertTriangle className="h-3 w-3" />} title="4G backup: standby" sub="Ready if the line fails" />
          <FloatingChip className="-bottom-4 left-1/4 hidden md:flex" color="cyan" icon={<Signal className="h-3 w-3" />} title="Monitored 24/7" sub="Always watching" />
        </div>
      </section>

      {/* GUEST PAGE */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="relative grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionEyebrow>For your guests</SectionEyebrow>
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
                What guests see <GradientText>when they check in</GradientText>
              </h2>
              <p className="mt-5 max-w-xl text-slate-400">Every property gets a dedicated WiFi status page. Guests open it and instantly see their connection is live, monitored, and protected — before they even think to ask.</p>
              <ul className="mt-8 space-y-4">
                {[
                  { title: "Live connection status", body: "A clear green screen the moment WiFi is working — reassurance before the bags are unpacked." },
                  { title: "Current speeds", body: "Guests can see their download and upload speeds in real time, so they know what to expect." },
                  { title: "Automatic 4G backup", body: "If the broadband line itself fails, the property switches to 4G backup, so guests usually stay online while it recovers — wherever there's a mobile signal." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="text-sm text-slate-400">{item.body}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-emerald-500/20 to-cyan-500/10 blur-3xl" />
              <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-emerald-900/20">
                <img
                  src="/dashboard-guest.png"
                  alt="Guest WiFi status page showing WiFi is Working with live speed readings"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SENSORS */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.2), transparent 40%)" }} />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionEyebrow>Included in your kit</SectionEyebrow>
                <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Smart sensors for <GradientText>leaks, damp and freezing</GradientText></h2>
                <p className="mt-4 max-w-xl text-slate-400">Alongside the WiFi, your sensors keep an eye on temperature, humidity and water leaks — the things that quietly cause damage in an empty property. They arrive already paired, so you just place them where they're needed. Catch a leak or a freeze early, before it becomes an expensive repair.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <GlowButton href="#features">See how it works</GlowButton>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                <SensorCard icon={<Thermometer className="h-5 w-5" />} title="Temperature" value="19.4°C" status="Normal" color="emerald" />
                <SensorCard icon={<Droplet className="h-5 w-5" />} title="Leak Detection" value="Dry" status="No leaks" color="cyan" />
                <SensorCard icon={<Globe className="h-5 w-5" />} title="Humidity" value="52%" status="Optimal" color="teal" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-10 sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 0% 0%, rgba(16,185,129,0.18), transparent 45%)" }} />
            <div className="relative">
              <SectionEyebrow>Why Inntact exists</SectionEyebrow>
              <h2 className="text-balance text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">Monitoring done properly — and personally</h2>
              <p className="mt-5 text-slate-400">Inntact looks after holiday-let WiFi the way it should be done: quietly, in the background, with real people paying attention rather than a call-centre script. Our founder, Eddie, started the company after seeing how often a simple WiFi drop became a bad review — and how rarely owners found out in time. That same standard runs through everything we do: clear alerts, honest weekly reports, and help from someone who understands your setup.</p>
              <p className="mt-5 text-sm text-slate-300">Eddie · Founder, Inntact · <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a></p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <SectionTitle>Simple <GradientText>pricing</GradientText></SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">One simple plan per property, monthly or yearly. All the kit is included and posted to you ready to go — it's yours to use for as long as you subscribe, and you simply send it back if you ever cancel. 30-day money-back guarantee, no setup fees.</p>
        </div>
        <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          <PriceCard name="Monthly" price="£49" per="/ month per property" desc="Everything included, per property. Cancel any time." features={["All kit included &mdash; monitor, smart plug &amp; sensors", "24/7 WiFi monitoring &amp; alerts", "Automatic router restart", "4G backup if the line fails", "Leak &amp; temperature sensors", "Weekly report &amp; full history", "Owner dashboard", "30-day money-back guarantee"]} cta="Get set up" />
          <PriceCard name="Annual" price="£490" per="/ year per property" desc="Two months free. Pay once, covered all year." features={["Everything in Monthly", "<strong>Two months free</strong> vs monthly", "Direct line to the founder", "Early access to new features"]} cta="Get set up" highlighted />
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <SectionTitle>Questions, <GradientText>answered</GradientText></SectionTitle>
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <FaqItem q="Do I need to install anything technical?">
              No. Your kit arrives ready to go — plug the monitor into your router, plug the router into the included smart plug, and place the sensors where they're needed. Most owners are set up in about 10 minutes, with no apps to configure.
            </FaqItem>
            <FaqItem q="What can the automatic restart actually fix?">
              It power-cycles your router through the smart plug, which clears the most common cause of a WiFi drop. It can't repair a fault on the broadband line itself — but when a restart isn't enough, we tell you straight away, and 4G backup keeps your guests online in the meantime, wherever there's a mobile signal.
            </FaqItem>
            <FaqItem q="What if the problem is my broadband provider, not your kit?">
              That's exactly where the weekly report and full history help. You'll have a clear record of every drop to take to your provider — and while the line's down, 4G backup keeps guests connected wherever there's a mobile signal.
            </FaqItem>
            <FaqItem q="Is there a contract?">
              No fixed term. Pay monthly or yearly and cancel any time. The kit is included on loan for as long as you subscribe; if you cancel, you simply send it back.
            </FaqItem>
            <FaqItem q="How is it priced — per property?">
              Yes. It's one simple plan per property: £49 a month or £490 a year, with all the kit included. If you run several lets, each one gets its own kit and its own dashboard — just sign up each property.
            </FaqItem>
            <FaqItem q="Does it work when I'm not at the property?">
              Yes — that's the point. Everything runs remotely. You get alerts and reports by email, and you can check your dashboard from anywhere.
            </FaqItem>
            <FaqItem q="What do the sensors cover?">
              Temperature, humidity and water leaks — so you catch a leak or the risk of frozen pipes early, before they turn into an expensive repair. They arrive already paired; you just place them where they're needed.
            </FaqItem>
            <FaqItem q="Do you monitor what my guests do online?">
              No. We only watch whether the connection is up and how it's performing — never the content of anyone's internet use. There's more detail in our <Link to="/privacy" className="text-emerald-300 transition hover:text-emerald-200">Privacy Policy</Link>.
            </FaqItem>
          </div>
          <p className="mt-10 text-center text-sm text-slate-400">
            Still wondering something? Email us at{" "}
            <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>{" "}— we're always happy to help.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(16,185,129,0.25), transparent 50%), radial-gradient(circle at 50% 100%, rgba(34,211,238,0.2), transparent 50%)" }} />
            <div className="relative">
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Keep your guests online — <GradientText>we'll watch the WiFi</GradientText></h2>
              <p className="mx-auto mt-5 max-w-xl text-slate-400">Setup takes about 10 minutes, and from then on it runs quietly in the background. If anything's unclear, email us first — we're happy to talk it through.</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <GlowButton primary href="/signup">Get set up</GlowButton>
                <GlowButton href="mailto:hello@inntact.co.uk">Ask us a question</GlowButton>
              </div>
              <p className="mt-4 text-xs text-slate-500">30-day money-back guarantee · Cancel any time, no contract</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 mt-32 border-t border-white/5 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
              <Wifi className="h-4 w-4 text-slate-950" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-semibold">Inntact</div>
              <div className="text-xs text-slate-500">WiFi monitoring for UK holiday lets</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <a href="mailto:hello@inntact.co.uk" className="transition hover:text-white">Contact</a>
            <a href="/privacy" className="transition hover:text-white">Privacy</a>
            <a href="/terms" className="transition hover:text-white">Terms</a>
          </div>
          <div className="text-xs text-slate-500">© {new Date().getFullYear()} Inntact Ltd · Company no. 17140019</div>
        </div>
      </footer>
    </div>
  );
}
