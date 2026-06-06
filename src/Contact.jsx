import { useState } from "react";
import { Link } from "react-router-dom";
import { Wifi, ArrowLeft, Check } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Web3Forms access key. Get one free at https://web3forms.com — enter
// hello@inntact.co.uk, confirm the email they send, then paste the key below.
// Submissions to this form will be emailed straight to hello@inntact.co.uk.
const WEB3FORMS_ACCESS_KEY = "40599698-956b-4997-a3b1-2c22be86a1da";
// ─────────────────────────────────────────────────────────────────────────────

function GradientText({ children }) {
  return (
    <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, ...data }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased">
      {/* subtle grid backdrop */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          opacity: 0.035,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 80%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-xl flex-col px-6 py-10">
        {/* brand + back */}
        <div className="mb-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500">
              <Wifi className="h-4 w-4 text-slate-950" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold">Inntact</span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>

        {status === "success" ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500">
              <Check className="h-7 w-7 text-slate-950" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Message received</h1>
            <p className="mx-auto mt-3 max-w-sm text-slate-400">
              Thanks — your message is with us. We'll reply within one working day.
            </p>
            <Link
              to="/"
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Get in <GradientText>touch</GradientText>
            </h1>
            <p className="mt-4 max-w-lg text-slate-400">
              Have a question about WiFi monitoring for your holiday let? Send us a
              message and we'll reply within one working day.
            </p>

            <form onSubmit={onSubmit} className="mt-9 flex flex-col gap-5">
              {/* Web3Forms metadata */}
              <input type="hidden" name="subject" value="New enquiry via inntact.co.uk" />
              <input type="hidden" name="from_name" value="Inntact website" />
              {/* honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-300">Your name</span>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-emerald-400/50 focus:bg-white/10"
                  placeholder="Jane Smith"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-300">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-emerald-400/50 focus:bg-white/10"
                  placeholder="you@example.com"
                />
              </label>

              <label className="flex flex-col gap-2 text-sm">
                <span className="font-medium text-slate-300">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-emerald-400/50 focus:bg-white/10"
                  placeholder="How can we help?"
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-400/40 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              {status === "error" && (
                <p className="text-sm text-amber-300">
                  Something went wrong sending that. Please email us directly at{" "}
                  <a href="mailto:hello@inntact.co.uk" className="underline">
                    hello@inntact.co.uk
                  </a>{" "}
                  and we'll pick it up.
                </p>
              )}
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Prefer email? Reach us any time at{" "}
              <a href="mailto:hello@inntact.co.uk" className="text-slate-300 transition hover:text-white">
                hello@inntact.co.uk
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
