import { Link } from "react-router-dom";
import { Wifi, ArrowLeft } from "lucide-react";

function LegalShell({ title, updated, children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 font-sans text-slate-300 antialiased">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-60" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(16,185,129,0.14), transparent 60%)" }} />
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link to="/" aria-label="Inntact home" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/30">
              <Wifi className="h-4 w-4 text-slate-950" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">Inntact</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {updated}</p>
        <div className="mt-10 space-y-8 leading-relaxed text-slate-300">{children}</div>
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 py-10">
        <div className="mx-auto max-w-3xl text-xs text-slate-500">
          © {new Date().getFullYear()} Inntact Ltd. Questions? Email{" "}
          <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>.
        </div>
      </footer>
    </div>
  );
}

function H2({ children }) {
  return <h2 className="text-xl font-semibold tracking-tight text-white">{children}</h2>;
}

export default function Terms() {
  return (
    <LegalShell title="Terms of Service" updated="3 June 2026">
      <p>
        These terms cover your use of Inntact. By signing up, you agree to them. They're written to be
        clear rather than clever — if anything's unclear, email Eddie at{" "}
        <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>{" "}
        before you sign up.
      </p>

      <section className="space-y-3">
        <H2>Who we are</H2>
        <p>
          Inntact is operated by Inntact Ltd (company number 17140019, registered at 14 Tarn Moor
          Crescent, Skipton, BD23 1LT). In these terms, "we", "us" and "Inntact" mean Inntact Ltd, and
          "you" means the customer who signs up for the service.
        </p>
      </section>

      <section className="space-y-3">
        <H2>What the service does</H2>
        <p>
          Inntact monitors the WiFi at your holiday let around the clock. If the connection drops, we
          automatically restart your router through a smart plug, email you what's happened, and — where
          a 4G backup is in place — the property can switch to a mobile connection while the line recovers.
          You also receive a weekly health report and access to an owner dashboard. Smart sensors for
          temperature, humidity and water leaks are included with the kit.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Your equipment</H2>
        <p>
          We provide the kit needed to run the service — a small monitor, a smart plug, and sensors. It
          remains our property and is provided for use only while you're a subscriber. You agree to install
          it as described in our setup guide, to keep it powered and connected, and to return or safely
          dispose of it when your subscription ends, if we ask. Please take reasonable care of it; you may be
          charged for kit that's lost or damaged beyond normal use.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Subscription and payment</H2>
        <p>
          Inntact is £49 per month, or £490 per year (which works out as two months free). Payment is taken
          securely by Stripe; we never store your card details. Subscriptions renew automatically each period
          until you cancel. Prices may change, but we'll give you reasonable notice by email before any change
          affects you.
        </p>
      </section>

      <section className="space-y-3">
        <H2>30-day money-back guarantee</H2>
        <p>
          If Inntact isn't right for you, email us within 30 days of your first payment and we'll refund it in
          full. We'll ask you to return the kit. After the first 30 days, payments already made are
          non-refundable, but you can cancel at any time to stop future payments.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Cancelling</H2>
        <p>
          There's no contract and no minimum term beyond the period you've paid for. Cancel any time by
          emailing{" "}
          <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>.
          Your monitoring continues until the end of the period you've already paid for.
        </p>
      </section>

      <section className="space-y-3">
        <H2>What we can and can't promise</H2>
        <p>
          We monitor your connection and act on problems quickly, including restarting your router and, where
          fitted, failing over to 4G. We can't control your broadband provider, your guests' devices, or a
          local power cut, and no monitoring service can guarantee 100% uptime or that every problem is
          resolved before a guest notices. Inntact tells you what's happening and fixes what it can — it
          doesn't replace your broadband contract or guarantee a particular speed.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Acceptable use</H2>
        <p>
          Please use the service and the dashboard only for monitoring your own property, and don't attempt to
          interfere with, copy or misuse the kit or our systems. We may suspend the service if it's being
          misused or if payment fails.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Liability</H2>
        <p>
          We'll provide the service with reasonable care and skill. To the extent the law allows, we're not
          liable for losses outside our reasonable control — such as broadband or power outages, or lost
          bookings or reviews — and our total liability to you is limited to the amount you've paid us in the
          12 months before the claim. Nothing in these terms limits liability that can't legally be limited,
          and none of this affects your statutory rights as a consumer.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Your data</H2>
        <p>
          How we handle your personal information is set out in our{" "}
          <Link to="/privacy" className="text-emerald-300 transition hover:text-emerald-200">Privacy Policy</Link>.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Changes and governing law</H2>
        <p>
          We may update these terms from time to time; we'll update the date above and let you know by email if
          a change is significant. These terms are governed by the law of England and Wales, and the courts of
          England and Wales have jurisdiction.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Contact</H2>
        <p>
          Email Eddie at{" "}
          <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>.
          I read every email personally.
        </p>
      </section>
    </LegalShell>
  );
}
