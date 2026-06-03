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

export default function Privacy() {
  return (
    <LegalShell title="Privacy Policy" updated="3 June 2026">
      <p>
        This policy explains what personal information Inntact collects, why we collect it, and what
        we do with it. We keep this deliberately plain. If anything here is unclear, email Eddie at{" "}
        <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>{" "}
        and he'll happily explain.
      </p>

      <section className="space-y-3">
        <H2>Who we are</H2>
        <p>
          Inntact is a UK WiFi monitoring service for holiday lets, operated by Inntact Ltd (company
          number 17140019, registered at 14 Tarn Moor Crescent, Skipton, BD23 1LT). For the purposes of
          UK data protection law, Inntact Ltd is the data controller for the information described below.
        </p>
      </section>

      <section className="space-y-3">
        <H2>What we collect</H2>
        <p>We collect only what we need to run the service:</p>
        <ul className="list-disc space-y-2 pl-5 text-slate-300 marker:text-emerald-400">
          <li><span className="font-medium text-white">Account details</span> — your name, email address, and the address of the property you're monitoring.</li>
          <li><span className="font-medium text-white">Payment details</span> — handled entirely by Stripe, our payment provider. Inntact never sees or stores your full card number.</li>
          <li><span className="font-medium text-white">Monitoring data</span> — connection status, speeds, uptime and sensor readings (temperature, humidity, water-leak) from the kit installed at your property. This is technical data about the property, not about your guests.</li>
          <li><span className="font-medium text-white">Correspondence</span> — emails you send us and our replies, so we can help you properly.</li>
        </ul>
        <p>
          We do not monitor what your guests do online, and we do not collect the content of anyone's
          internet traffic. We watch whether the connection is up and how it's performing — nothing more.
        </p>
      </section>

      <section className="space-y-3">
        <H2>How we use it, and our legal basis</H2>
        <p>We use your information to:</p>
        <ul className="list-disc space-y-2 pl-5 text-slate-300 marker:text-emerald-400">
          <li>provide the monitoring service, send you alerts, and produce your weekly health report (to perform our contract with you);</li>
          <li>take payment and manage your subscription (to perform our contract, and to meet our legal and accounting obligations);</li>
          <li>contact you about your account or a problem with your service (our legitimate interest in running the service well);</li>
          <li>improve the reliability of the service (our legitimate interest), using aggregated or technical data.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <H2>Who we share it with</H2>
        <p>
          We don't sell your data, and we don't share it for marketing. We use a small number of trusted
          providers to run the service: Stripe (payments), our email provider (to send alerts, reports and
          replies), and our hosting and infrastructure providers. Each only receives what they need to do
          their job, and is bound to keep it secure. We may also disclose information where the law requires it.
        </p>
      </section>

      <section className="space-y-3">
        <H2>How long we keep it</H2>
        <p>
          We keep your account information for as long as you're a customer, and for a reasonable period
          afterwards to meet legal and accounting requirements (typically up to seven years for billing
          records). Monitoring data is kept while it's useful for showing you history and spotting recurring
          issues, then routinely cleared.
        </p>
      </section>

      <section className="space-y-3">
        <H2>How we keep it safe</H2>
        <p>
          Access to your data is limited to what's needed to run the service, connections are encrypted, and
          payment card data never touches our systems — it's handled by Stripe. No service can promise perfect
          security, but we take it seriously and keep our setup current.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Your rights</H2>
        <p>
          Under UK GDPR you have the right to access the personal data we hold about you, to have it corrected
          or deleted, to object to or restrict certain processing, and to receive a copy in a portable format.
          To exercise any of these, just email{" "}
          <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>.
          If you're not happy with how we've handled your data, you can complain to the Information
          Commissioner's Office (ICO) at ico.org.uk.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Cookies</H2>
        <p>
          Our website and dashboard use only the cookies needed to make them work — for example, to keep you
          signed in. We don't use advertising or third-party tracking cookies.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Changes to this policy</H2>
        <p>
          If we change this policy, we'll update the date at the top of this page, and we'll let you know by
          email if the change is significant.
        </p>
      </section>

      <section className="space-y-3">
        <H2>Contact</H2>
        <p>
          Questions about your data, or this policy? Email Eddie at{" "}
          <a href="mailto:hello@inntact.co.uk" className="text-emerald-300 transition hover:text-emerald-200">hello@inntact.co.uk</a>.
          I read every email personally.
        </p>
      </section>
    </LegalShell>
  );
}
