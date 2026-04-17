import { useEffect, useState } from "react";
import {
  Wifi, Bell, Gauge, Activity, Thermometer, Droplet, AlertTriangle, Check,
  ArrowRight, Star, Menu, X, Signal, ChevronRight, LayoutDashboard, Search,
  Home, BarChart3, Settings, Sparkles, TrendingUp, Clock, Globe,
} from "lucide-react";
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
    <span className="relative inline-flex h-2 w-2">
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

function GlowButton({ children, primary = false, className = "" }) {
  if (primary) {
    return (
      <button className={`group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-400/40 hover:scale-105 active:scale-95 ${className}`}>
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-300 opacity-0 blur-xl transition-opacity group-hover:opacity-60" />
        <span className="relative">{children}</span>
        <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    );
  }
  return (
    <button className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10 ${className}`}>
      {children}
    </button>
  );
}

function DashboardMockup() {
  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-100">
      <aside className="hidden w-40 shrink-0 flex-col justify-between border-r border-white/5 bg-slate-950/80 px-3 py-3 sm:flex">
        <div>
          <div className="mb-4 flex items-center gap-2 px-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500">
              <Wifi className="h-3.5 w-3.5 text-slate-950" />
            </div>
            <span className="text-xs font-semibold tracking-tight">Inntact</span>
          </div>
          <nav className="space-y-0.5 text-[10px]">
            <NavItem icon={<LayoutDashboard className="h-3 w-3" />} label="Overview" active />
            <NavItem icon={<Home className="h-3 w-3" />} label="Properties" />
            <NavItem icon={<AlertTriangle className="h-3 w-3" />} label="Alerts" badge="2" />
            <NavItem icon={<Thermometer className="h-3 w-3" />} label="Sensors" />
            <NavItem icon={<BarChart3 className="h-3 w-3" />} label="Reports" />
            <NavItem icon={<Settings className="h-3 w-3" />} label="Settings" />
          </nav>
        </div>
        <div className="rounded-lg border border-white/5 bg-white/5 p-2">
          <div className="mb-1 text-[9px] text-slate-500">Plan</div>
          <div className="text-[10px] font-medium">Pro · 3 properties</div>
        </div>
      </aside>
      <main className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
          <div className="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-[10px] text-slate-400">
            <Search className="h-3 w-3" /> Search properties…
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] text-emerald-300">
              <Pulse />
              All systems operational
            </div>
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-amber-300 to-rose-400" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden p-3">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <div className="text-[10px] text-slate-500">Friday, 17 April</div>
              <div className="text-sm font-semibold tracking-tight">Good morning, Eddie</div>
            </div>
            <div className="text-[9px] text-slate-500">Last synced · 12s ago</div>
          </div>
          <div className="mb-2 grid grid-cols-4 gap-2">
            <StatCard label="Uptime" value="99.98%" trend="+0.04" accent="emerald" />
            <StatCard label="Avg speed" value="287 Mbps" trend="+12" accent="cyan" />
            <StatCard label="Latency" value="12ms" trend="-3" accent="teal" />
            <StatCard label="Sensors" value="4 / 4" trend="OK" accent="emerald" />
          </div>
          <div className="mb-2 rounded-lg border border-white/5 bg-white/5 p-2">
            <div className="mb-1 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-medium">Download speed · 24h</div>
                <div className="text-[9px] text-slate-500">Sea View Cottage · Cornwall</div>
              </div>
              <div className="flex items-center gap-1 text-[9px]">
                <span className="flex items-center gap-1 text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Down</span>
                <span className="flex items-center gap-1 text-cyan-300"><span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Up</span>
              </div>
            </div>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={speedData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="gDown" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gUp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide domain={[0, 380]} />
                  <Tooltip contentStyle={{ background: "rgba(2,6,23,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 10, color: "#e2e8f0" }} labelFormatter={() => ""} />
                  <Area type="monotone" dataKey="down" stroke="#34d399" strokeWidth={1.5} fill="url(#gDown)" />
                  <Area type="monotone" dataKey="up" stroke="#22d3ee" strokeWidth={1.2} fill="url(#gUp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-lg border border-white/5 bg-white/5">
            <div className="flex items-center justify-between border-b border-white/5 px-2 py-1.5">
              <div className="text-[10px] font-medium">Properties</div>
              <div className="text-[9px] text-slate-500">3 active</div>
            </div>
            <PropRow name="Sea View Cottage" loc="Cornwall" status="Healthy" speed="312 Mbps" color="emerald" spark={makeSpark(1)} />
            <PropRow name="Lakeside Lodge" loc="Lake District" status="Healthy" speed="268 Mbps" color="emerald" spark={makeSpark(3)} />
            <PropRow name="The Oast House" loc="Kent" status="Slow upload" speed="94 Mbps" color="amber" spark={makeSpark(7)} />
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, badge }) {
  return (
    <div className={`flex items-center justify-between rounded-md px-2 py-1.5 ${active ? "bg-white/10 text-slate-100" : "text-slate-400 hover:text-slate-200"}`}>
      <div className="flex items-center gap-1.5">{icon}<span>{label}</span></div>
      {badge && <span className="rounded-full bg-rose-500/20 px-1.5 text-[8px] text-rose-300">{badge}</span>}
    </div>
  );
}

function StatCard({ label, value, trend, accent }) {
  const accentMap = { emerald: "text-emerald-300", cyan: "text-cyan-300", teal: "text-teal-300" };
  return (
    <div className="rounded-lg border border-white/5 bg-white/5 p-2">
      <div className="text-[9px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 text-[13px] font-semibold tracking-tight">{value}</div>
      <div className={`mt-0.5 text-[9px] ${accentMap[accent] || "text-emerald-300"}`}>{trend}</div>
    </div>
  );
}

function PropRow({ name, loc, status, speed, color, spark }) {
  const dot = color === "emerald" ? "bg-emerald-400" : "bg-amber-400";
  const text = color === "emerald" ? "text-emerald-300" : "text-amber-300";
  const stroke = color === "emerald" ? "#34d399" : "#fbbf24";
  return (
    <div className="flex items-center gap-2 border-b border-white/5 px-2 py-1.5 last:border-b-0">
      <div className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[10px] font-medium">{name}</div>
        <div className="truncate text-[9px] text-slate-500">{loc}</div>
      </div>
      <div className="h-6 w-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={spark}>
            <Line type="monotone" dataKey="y" stroke={stroke} strokeWidth={1.2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-16 text-right text-[9px] text-slate-300">{speed}</div>
      <div className={`w-20 text-right text-[9px] ${text}`}>{status}</div>
    </div>
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
            <DashboardMockup />
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
        <div className="mt-6 flex items-baseline gap-2 border-t border-white/5 pt-4">
          <span className="text-2xl font-semibold text-white">{highlight}</span>
          <span className="text-xs text-slate-500">{highlightLabel}</span>
        </div>
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
        {[{ l: "Uptime", v: "99.98%" }, { l: "Ping", v: "12ms" }, { l: "Dropouts", v: "0" }].map((s) => (
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
      <AlertRow color="rose" title="Broadband offline" time="now" body="Sea View Cottage · 0 Mbps" />
      <AlertRow color="amber" title="Slow upload" time="2m" body="Oast House · 12 Mbps up" />
      <AlertRow color="emerald" title="Speed restored" time="14m" body="Lakeside Lodge · 268 Mbps" />
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
          <div className="text-xs text-slate-500">30-day uptime</div>
          <div className="text-2xl font-semibold tracking-tight text-white">99.98<span className="text-slate-500">%</span></div>
        </div>
        <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
          <TrendingUp className="mr-1 inline h-3 w-3" /> +0.04%
        </div>
      </div>
      <div className="mb-3 flex" style={{ gap: "3px" }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className={`h-8 flex-1 rounded-sm ${i === 11 ? "bg-amber-400/80" : "bg-emerald-400/70"}`} style={{ opacity: 0.4 + ((i * 37) % 60) / 100 }} />
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>30d ago</span><span>today</span>
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
        <div className="absolute right-5 top-5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-200">Most popular</div>
      )}
      <div className="text-sm font-semibold tracking-wide text-slate-300">{name}</div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tracking-tight text-white">{price}</span>
        {per && <span className="text-sm text-slate-500">{per}</span>}
      </div>
      <p className="mt-3 text-sm text-slate-400">{desc}</p>
      <button className={`mt-6 w-full rounded-full px-5 py-2.5 text-sm font-semibold transition ${highlighted ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:shadow-lg hover:shadow-emerald-500/30" : "border border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"}`}>
        {cta}
      </button>
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

function Testimonial({ name, role, avatar, text, gradient }) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20">
      <div className="mb-3 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />)}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-slate-200">"{text}"</p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/5 pt-5">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-sm font-semibold text-slate-900`}>{avatar}</div>
        <div>
          <div className="text-sm font-semibold text-white">{name}</div>
          <div className="text-xs text-slate-500">{role}</div>
        </div>
      </div>
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
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-100 antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(34,211,238,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at 0% 30%, rgba(20,184,166,0.08), transparent 60%)" }} />
      <div className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0.035, backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "48px 48px", WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 80%)", maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 80%)" }} />

      {/* NAV */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "border-b border-white/5 bg-slate-950/70 backdrop-blur-xl" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/30">
              <Wifi className="h-4 w-4 text-slate-950" strokeWidth={2.5} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-300 ring-2 ring-slate-950" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Inntact</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="transition hover:text-white">Features</a>
            <a href="#solution" className="transition hover:text-white">Solution</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
            <a href="#reviews" className="transition hover:text-white">Reviews</a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a href="#" className="text-sm text-slate-300 transition hover:text-white">Sign in</a>
            <GlowButton primary className="!py-2 !text-xs">Start Free Trial</GlowButton>
          </div>
          <button onClick={() => setMenuOpen((v) => !v)} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden" aria-label="Menu">
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-white/5 bg-slate-950/95 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm">
              <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a href="#solution" onClick={() => setMenuOpen(false)}>Solution</a>
              <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
              <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
              <div className="pt-2"><GlowButton primary className="w-full">Start Free Trial</GlowButton></div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative z-10 px-6 pt-32 sm:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Now with smart temperature, leak &amp; humidity sensors
            <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          </div>
          <h1 className="mx-auto max-w-4xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl" style={{ lineHeight: 1.05 }}>
            Prevent Guest WiFi Complaints <GradientText>Before They Happen</GradientText>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-slate-400 sm:text-xl">
            Inntact monitors your holiday let internet 24/7 so you know about outages, slow speeds, and issues before guests complain.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GlowButton primary>Start Free Trial</GlowButton>
            <GlowButton>Book Demo</GlowButton>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-xs text-slate-500 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />14-day free trial</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />No credit card required</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" />Setup in under 5 minutes</span>
          </div>
        </div>
        <div className="relative mx-auto mt-20 max-w-6xl px-4"><LaptopMockup /></div>
        <div className="mx-auto mt-16 max-w-5xl px-6">
          <p className="mb-6 text-center text-xs uppercase text-slate-500" style={{ letterSpacing: "0.2em" }}>Trusted by 1,200+ luxury holiday let owners across the UK</p>
          <div className="grid grid-cols-2 items-center gap-8 opacity-60 sm:grid-cols-5">
            {["COTTAGES & CO", "SEABREEZE LETS", "HIGHLAND STAYS", "OAK & STONE", "LAKELAND LODGES"].map((n) => (
              <div key={n} className="text-center text-xs font-semibold text-slate-400" style={{ letterSpacing: "0.15em" }}>{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>The problem</SectionEyebrow>
          <SectionTitle>WiFi Problems <GradientText>Damage Reviews</GradientText></SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">One bad broadband week can undo years of 5-star reviews. And by the time you hear about it, it's usually in a review.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-3">
          <PainCard icon={<AlertTriangle className="h-5 w-5" />} title="Guests complain when WiFi fails" body="Remote working guests expect reliable speeds. A dropout on a Tuesday morning can end a stay — and a review." highlight="1 in 3" highlightLabel="bookings mention WiFi" />
          <PainCard icon={<Clock className="h-5 w-5" />} title="Owners find out too late" body="You're managing a property from miles away. By the time a guest messages you, the damage is already done." highlight="48 hrs" highlightLabel="avg. delay to detect issues" />
          <PainCard icon={<Star className="h-5 w-5" />} title="Bad reviews cost future bookings" body="A single 3-star review can drop your Airbnb ranking and cost thousands in lost bookings over a season." highlight="-22%" highlightLabel="bookings after a 3★ review" />
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>The solution</SectionEyebrow>
          <SectionTitle>Know Issues <GradientText>Before Guests Do</GradientText></SectionTitle>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">Inntact watches your internet around the clock and tells you the moment something's off — so you can fix it before a guest even notices.</p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-5 lg:grid-cols-3">
          <FeatureBlock icon={<Activity className="h-5 w-5" />} tag="Monitoring" title="24/7 Broadband Monitoring" body="Track uptime, outages, speed drops and latency spikes across every property — down to the minute." visual={<MonitoringVisual />} />
          <FeatureBlock icon={<Bell className="h-5 w-5" />} tag="Alerts" title="Instant Alerts" body="Get notified immediately via SMS, email or app when problems happen. Resolve issues before guests notice." visual={<AlertVisual />} />
          <FeatureBlock icon={<Gauge className="h-5 w-5" />} tag="Dashboard" title="Owner Dashboard" body="A beautiful dashboard showing real-time status, 90-day speed history and uptime percentage per property." visual={<DashboardVisual />} />
        </div>
      </section>

      {/* DASHBOARD SHOWCASE */}
      <section id="solution" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>Dashboard</SectionEyebrow>
          <SectionTitle>Your property's internet health <GradientText>at a glance</GradientText></SectionTitle>
        </div>
        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-4/5 rounded-full bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 p-2 shadow-2xl shadow-emerald-900/20 backdrop-blur-sm">
            <div className="overflow-hidden rounded-xl border border-white/5" style={{ aspectRatio: "16 / 9.5" }}>
              <DashboardMockup />
            </div>
          </div>
          <FloatingChip className="left-2 top-10 hidden md:flex" color="emerald" icon={<Check className="h-3 w-3" />} title="Uptime 99.98%" sub="last 30 days" />
          <FloatingChip className="right-2 top-24 hidden md:flex" color="amber" icon={<AlertTriangle className="h-3 w-3" />} title="Slow upload detected" sub="Oast House · 2m ago" />
          <FloatingChip className="-bottom-4 left-1/4 hidden md:flex" color="cyan" icon={<Signal className="h-3 w-3" />} title="Speed 312 Mbps" sub="Sea View Cottage" />
        </div>
      </section>

      {/* SENSORS */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 sm:p-14">
            <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(34,211,238,0.2), transparent 40%)" }} />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionEyebrow>Optional extras</SectionEyebrow>
                <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">Total peace of mind <GradientText>with smart sensors</GradientText></h2>
                <p className="mt-4 max-w-xl text-slate-400">Add smart sensors for total property peace of mind. Catch leaks, freezes and humidity issues before they turn into five-figure repair bills.</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <GlowButton primary>Add sensors</GlowButton>
                  <GlowButton>See how it works</GlowButton>
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

      {/* PRICING */}
      <section id="pricing" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>Pricing</SectionEyebrow>
          <SectionTitle>Simple pricing, <GradientText>per property</GradientText></SectionTitle>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">Start with a 14-day free trial. Cancel any time. No setup fees.</p>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-3">
          <PriceCard name="Starter" price="£19" per="/ month per property" desc="Everything you need to monitor one holiday let." features={["24/7 broadband monitoring", "Email alerts", "90-day speed history", "Owner dashboard", "1 property"]} cta="Start free trial" />
          <PriceCard name="Pro" price="£29" per="/ month per property" desc="For serious hosts who want full peace of mind." features={["Everything in Starter", "SMS + app push alerts", "Unlimited properties", "Smart sensor support", "Priority support"]} cta="Start free trial" highlighted />
          <PriceCard name="Enterprise" price="Custom" per="" desc="For agencies managing 20+ properties." features={["Everything in Pro", "Dedicated account manager", "API &amp; PMS integrations", "Custom SLAs", "White-label portals"]} cta="Contact sales" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="reviews" className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-6xl text-center">
          <SectionEyebrow>Loved by hosts</SectionEyebrow>
          <SectionTitle>Stories from <GradientText>our owners</GradientText></SectionTitle>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl gap-5 lg:grid-cols-3">
          <Testimonial name="Charlotte Whitman" role="Owner · Cotswolds" avatar="CW" gradient="from-rose-300 to-amber-300" text="I used to find out about WiFi outages from angry reviews. Since Inntact, I've fixed four issues before guests even noticed. It's quietly the best £29 I spend each month." />
          <Testimonial name="James Okafor" role="Host · Cornwall (3 properties)" avatar="JO" gradient="from-emerald-300 to-cyan-300" text="The dashboard is gorgeous and the SMS alerts are spot on. One leak alert alone paid for two years of subscription. This is what luxury hosting should feel like." />
          <Testimonial name="Priya Sharma" role="Manager · Lakeland Lodges" avatar="PS" gradient="from-violet-300 to-indigo-300" text="We manage 14 lets and used to get complaints every week. Since rolling out Inntact, our review scores went from 4.6 to 4.9. Our cleaners love it too." />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 px-6 pt-40">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 50% 0%, rgba(16,185,129,0.25), transparent 50%), radial-gradient(circle at 50% 100%, rgba(34,211,238,0.2), transparent 50%)" }} />
            <div className="relative">
              <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Protect Your Reviews. <GradientText>Protect Your Guests.</GradientText></h2>
              <p className="mx-auto mt-5 max-w-xl text-slate-400">Join 1,200+ holiday let owners keeping their guests — and their 5-star reviews — online.</p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <GlowButton primary>Start Free Trial</GlowButton>
                <GlowButton>Book Demo</GlowButton>
              </div>
              <p className="mt-4 text-xs text-slate-500">14-day free trial · No credit card required</p>
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
              <div className="text-xs text-slate-500">Monitoring for holiday lets</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
            <a href="#" className="transition hover:text-white">Contact</a>
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
          </div>
          <div className="text-xs text-slate-500">© {new Date().getFullYear()} Inntact Ltd. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
