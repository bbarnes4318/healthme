import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Plus, Phone, Stethoscope, HeartHandshake, Microscope, Pill, Siren, FileText } from "lucide-react";
import { HeroVisit, AskExplorer, ProductTour, FamilyMock, Mark } from "@/components/landing/Demos";
import { track } from "@/components/landing/track";
import "@/components/landing/landing.css";

const container = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
const h2 = "lp-display font-semibold text-[2rem] leading-[1.1] sm:text-[2.5rem] lg:text-[3rem]";
const lede = "text-lg sm:text-[1.1875rem] leading-relaxed text-[color:var(--ink-2)]";
const CTA_LABEL = "Start a free visit";

function Cta({ src, size = "", className = "", children = CTA_LABEL }) {
  return (
    <a
      href={`/register?src=${src}`}
      onClick={() => track("landing_cta_click", { location: src })}
      className={`lp-btn ${size} ${className}`}
    >
      {children}
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </a>
  );
}

function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark className="w-8 h-8" />
      <span className="lp-display text-[1.1875rem] font-bold tracking-[-0.02em]">Health Me</span>
    </span>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const link = "hidden lg:inline-flex items-center h-10 px-3 rounded-full text-[0.9375rem] font-medium text-[color:var(--ink-2)] hover:text-[color:var(--ink)] transition-colors";

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-200 ${
        scrolled ? "bg-[rgba(250,248,244,0.86)] backdrop-blur-md shadow-[0_1px_0_var(--line)]" : "bg-transparent"
      }`}
    >
      <nav aria-label="Main" className={`${container} flex items-center justify-between h-16 sm:h-[72px]`}>
        <a href="/" aria-label="Health Me home" className="rounded-lg"><Wordmark /></a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#services" className={link}>Services</a>
          <a href="#how" className={link}>How it works</a>
          <a href="#pricing" className={link}>Pricing</a>
          <a
            href="/login"
            onClick={() => track("landing_signin_click", { location: "nav" })}
            className="inline-flex items-center h-10 px-3 rounded-full text-[0.9375rem] font-medium text-[color:var(--ink)] hover:bg-[color:var(--paper-2)] transition-colors"
          >
            Sign in
          </a>
          <Cta src="nav" size="lp-btn--sm" className="ml-1">
            <span className="sm:hidden">Start free</span>
            <span className="hidden sm:inline">{CTA_LABEL}</span>
          </Cta>
        </div>
      </nav>
    </header>
  );
}

function Assurance({ dark = false }) {
  const items = ["Free to start", "No credit card", "Open 24/7"];
  return (
    <ul className={`flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem] ${dark ? "text-white/80" : "text-[color:var(--muted)]"}`}>
      {items.map((t) => (
        <li key={t} className="inline-flex items-center gap-1.5">
          <Check className={`w-4 h-4 ${dark ? "text-emerald-300" : "text-[color:var(--ok)]"}`} aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

function Hero({ ctaRef }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-10%] w-[70%] h-[120%] hidden lg:block"
        style={{ background: "radial-gradient(closest-side, rgba(14,165,233,0.10), rgba(14,165,233,0) 70%)" }}
      />
      <div className={`${container} relative grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-12 items-center pt-6 sm:pt-12 lg:pt-4 pb-16 sm:pb-20 lg:pb-12 lg:min-h-[calc(100svh-72px)]`}>
        <div className="max-w-[620px]">
          <h1 id="hero-title" className="lp-display [text-wrap:wrap] font-semibold text-[2.625rem] leading-[1.05] sm:text-[3.5rem] lg:text-[3.25rem] xl:text-[3.5rem] lg:leading-[1.05]">
            Talk to an AI doctor tonight, without leaving home.
          </h1>
          <p className="mt-5 sm:mt-6 text-[1.125rem] sm:text-[1.25rem] leading-relaxed text-[color:var(--ink-2)] max-w-[560px]">
            Health Me is a complete medical center on your phone. Describe what's wrong, and the AI doctor will ask the
            right questions, explain what is most likely going on, and tell you exactly what to do next. It is available
            24 hours a day, and you can start for free.
          </p>
          <div ref={ctaRef} className="mt-8 flex flex-col items-start gap-4">
            <Cta src="hero" size="lp-btn--lg" className="w-full sm:w-auto" />
            <Assurance />
          </div>
        </div>
        <div>
          <HeroVisit />
          <p className="mt-4 text-center text-[0.8125rem] text-[color:var(--muted)]">
            Example visit. Health Me uses AI and does not replace your physician.
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionHead({ id, eyebrow, title, body, center = false, dark = false }) {
  return (
    <div className={`max-w-[760px] ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`lp-eyebrow ${dark ? "!text-sky-300" : ""}`}>{eyebrow}</p>}
      <h2 id={id} className={`${h2} mt-3 ${dark ? "text-white" : ""}`}>{title}</h2>
      {body && <p className={`mt-4 ${dark ? "text-lg sm:text-[1.1875rem] leading-relaxed text-white/80" : lede}`}>{body}</p>}
    </div>
  );
}

const SERVICES = [
  { icon: Stethoscope, name: "AI Doctor", text: "Get help with new symptoms, illnesses and injuries." },
  { icon: HeartHandshake, name: "AI Nurse", text: "Get practical advice on caring for yourself or someone else at home." },
  { icon: Microscope, name: "Specialists", text: "Consult AI specialists in dermatology, dental care, eye care, ear, nose and throat, and physical therapy." },
  { icon: Pill, name: "Pharmacy", text: "Ask about your medications, side effects and drug interactions." },
  { icon: Siren, name: "Emergency", text: "Find out quickly whether you need the emergency room, and keep your critical medical information ready." },
  { icon: FileText, name: "Records", text: "Upload your lab results and medical records and have them explained in plain English." },
];

function ServicesSection() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-16 sm:py-28 bg-[color:var(--paper-2)]">
      <div className={container}>
        <SectionHead
          id="services-title"
          eyebrow="Services"
          title="A medical center that never closes"
          body="Health Me brings the departments of a medical center together in one app, and every one of them is open around the clock."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SERVICES.map((s) => (
            <div key={s.name} className="rounded-[20px] bg-white p-6 sm:p-7 shadow-[0_0_0_1px_rgba(15,30,44,0.05)]">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-[color:var(--sky-wash)] text-[color:var(--brand)]">
                <s.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <h3 className="lp-display mt-5 text-[1.25rem] font-semibold tracking-[-0.02em]">{s.name}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-[color:var(--ink-2)]">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = [
  { title: "Tell us what's wrong.", text: "Type or speak your symptoms in your own words." },
  { title: "Answer a few questions.", text: "The AI doctor asks follow-up questions, the way a physician would, and takes your medications and medical history into account." },
  { title: "Get a clear plan.", text: "You'll learn what is most likely going on, what warning signs to watch for, and whether to treat it at home, call your doctor, or go to the emergency room. You can save every visit as a PDF to share with your own doctor." },
];

function HowSection() {
  return (
    <section id="how" aria-labelledby="how-title" className="py-16 sm:py-28">
      <div className={container}>
        <SectionHead id="how-title" title="How a visit works" />
        <ol className="mt-10 sm:mt-12 grid md:grid-cols-3 gap-8 md:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t-2 border-[color:var(--brand)] pt-5">
              <p className="text-sm font-semibold text-[color:var(--brand)]">Step {i + 1}</p>
              <h3 className="lp-display mt-2 text-[1.375rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 sm:mt-24">
          <h3 className="lp-display text-[1.5rem] sm:text-[1.875rem] font-semibold tracking-[-0.02em]">See example visits</h3>
          <p className="mt-2 mb-8 text-[1.0625rem] text-[color:var(--ink-2)]">Select a question to see how Health Me responds.</p>
          <AskExplorer />
        </div>
      </div>
    </section>
  );
}

function HistorySection() {
  return (
    <section aria-labelledby="history-title" className="py-16 sm:py-28 border-t border-[color:var(--line)]">
      <div className={container}>
        <SectionHead
          id="history-title"
          eyebrow="Your records"
          title="Your health history, all in one place"
          body="Your records, medications, test results and vital signs are stored together, so every visit starts with your full history. Health Me also reminds you when prescriptions need refilling and when appointments are coming up."
        />
        <div className="mt-10 sm:mt-14">
          <ProductTour />
        </div>
      </div>
    </section>
  );
}

function FamilySection() {
  return (
    <section aria-labelledby="family-title" className="py-16 sm:py-28 bg-[#eef6fb]">
      <div className={`${container} grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
        <SectionHead
          id="family-title"
          eyebrow="Family plan"
          title="Care for your whole family"
          body="One account covers up to five family members. Each person has a separate profile, so the AI doctor always knows whose health you are asking about."
        />
        <div className="flex lg:justify-end">
          <FamilyMock />
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section aria-labelledby="trust-title" className="lp-dark py-16 sm:py-24 bg-[color:var(--ink)] text-white">
      <div className={container}>
        <SectionHead
          dark
          id="trust-title"
          title="What you should know"
          body="Health Me uses artificial intelligence to provide health information and guidance. It does not replace your own physician, and it cannot write prescriptions. If you are experiencing a medical emergency, call 911 immediately."
        />
        <div className="mt-10 flex items-start sm:items-center gap-3 sm:gap-4 rounded-2xl bg-white/[0.06] px-5 py-4 max-w-[760px]">
          <Phone className="w-5 h-5 mt-0.5 sm:mt-0 text-[#fca5a5] shrink-0" aria-hidden="true" />
          <p className="text-[1.0625rem]">
            <span className="font-semibold">In an emergency, call 911.</span>{" "}
            <span className="text-white/80">Health Me is not an emergency service.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

const FREE = ["Three AI consultations each month", "Your personal health profile", "Medication tracking and reminders", "Appointment reminders"];
const PAID = [
  { name: "Basic Care", price: "$29.99", note: "Unlimited AI doctor and nurse visits, full medical records, health trends and PDF visit reports." },
  { name: "Family", price: "$54.99", note: "Everything in Basic Care for up to five family members, plus a caregiver dashboard and alerts." },
];

function PricingSection() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        track("landing_pricing_view");
        io.disconnect();
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} id="pricing" aria-labelledby="pricing-title" className="py-16 sm:py-28">
      <div className={container}>
        <SectionHead
          center
          id="pricing-title"
          eyebrow="Pricing"
          title="Start for free"
          body="The free plan includes three AI consultations each month. Upgrade at any time for unlimited visits, full medical records and family profiles."
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-5 max-w-[980px] mx-auto">
          <div className="lp-card p-7 sm:p-9 flex flex-col">
            <p className="font-semibold text-lg">Free</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="lp-display text-5xl font-semibold">$0</span>
              <span className="text-[color:var(--muted)]">per month</span>
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {FREE.map((f) => (
                <li key={f} className="flex gap-3 text-[1.0625rem]">
                  <Check className="w-5 h-5 text-[color:var(--ok)] shrink-0 mt-0.5" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <Cta src="pricing_free" size="lp-btn--lg" className="mt-8 w-full" />
            <p className="mt-3 text-center text-sm text-[color:var(--muted)]">No credit card required</p>
          </div>

          <div className="rounded-[24px] border border-[color:var(--line)] p-7 sm:p-9 flex flex-col">
            <p className="font-semibold text-lg">Paid plans</p>
            <p className="mt-2 text-[color:var(--muted)]">You can upgrade from your account at any time.</p>
            <div className="mt-6 divide-y divide-[color:var(--line)]">
              {PAID.map((p) => (
                <div key={p.name} className="py-5 first:pt-0">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="font-semibold text-[1.0625rem]">{p.name}</p>
                    <p><span className="font-semibold text-lg">{p.price}</span><span className="text-[color:var(--muted)]"> per month</span></p>
                  </div>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[color:var(--ink-2)]">{p.note}</p>
                </div>
              ))}
            </div>
            <p className="mt-auto pt-5 text-sm leading-relaxed text-[color:var(--muted)]">
              Chronic Care ($79.99 per month) and Premium Complete ($129.99 per month) are also available. Active-duty
              service members and veterans receive 20% off all paid plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ = [
  {
    q: "Is the AI doctor a real doctor?",
    a: "No. Health Me uses artificial intelligence to provide health information and guidance. It does not replace your own physician and cannot write prescriptions, and it will tell you when you need to see a doctor in person.",
  },
  {
    q: "How much does it cost?",
    a: "You can start for free. The free plan includes three AI consultations each month and does not require a credit card. Paid plans begin at $29.99 per month.",
  },
  {
    q: "Can I use Health Me for my family?",
    a: "Yes. The Family plan covers up to five people. Each person has a separate profile, so the AI doctor always knows whose health you are asking about.",
  },
  {
    q: "Can I share my results with my own doctor?",
    a: "Yes. You can save any visit as a PDF, and you can share your records with a doctor through a link that expires automatically.",
  },
  {
    q: "Who can see my health information?",
    a: "Only you and the people you choose to share it with. To answer your questions, the information you enter is processed by Health Me's AI.",
  },
  {
    q: "What should I do in an emergency?",
    a: "Call 911 immediately. Health Me is not an emergency service.",
  },
];

function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="pb-16 sm:pb-28">
      <div className={`${container} max-w-[860px]`}>
        <h2 id="faq-title" className="lp-display font-semibold text-[1.75rem] sm:text-[2.25rem] leading-tight">Frequently asked questions</h2>
        <div className="mt-6 border-t border-[color:var(--line)]">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="border-b border-[color:var(--line)]"
              onToggle={(e) => e.currentTarget.open && track("landing_faq_open", { question: f.q })}
            >
              <summary className="flex items-center justify-between gap-6 py-5 min-h-[64px] text-[1.125rem] font-medium rounded-lg">
                {f.q}
                <Plus className="lp-faq-icon w-5 h-5 shrink-0 text-[color:var(--muted)] transition-transform" aria-hidden="true" />
              </summary>
              <p className="pb-6 -mt-1 pr-10 text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ ctaRef }) {
  return (
    <section aria-labelledby="final-title" className="lp-dark bg-[color:var(--brand)] text-white">
      <div className={`${container} py-20 sm:py-28 text-center`}>
        <h2 id="final-title" className="lp-display mx-auto max-w-[820px] font-semibold text-[2.25rem] leading-[1.08] sm:text-[3rem] lg:text-[3.5rem]">
          Get answers about your health today.
        </h2>
        <p className="mt-5 mx-auto max-w-[560px] text-lg sm:text-[1.1875rem] leading-relaxed text-white/85">
          Your first visit is free, and it takes about a minute to get started.
        </p>
        <div ref={ctaRef} className="mt-9 flex flex-col items-center gap-5">
          <Cta src="final" size="lp-btn--lg lp-btn--light" />
          <Assurance dark />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--ink)] text-white/70">
      <div className={`${container} py-12 grid gap-8 md:grid-cols-[1fr_auto] items-start`}>
        <div className="max-w-[560px]">
          <span className="text-white"><Wordmark /></span>
          <p className="mt-4 text-sm leading-relaxed">
            Health Me provides general health information using artificial intelligence. It is not a substitute for
            professional medical advice, diagnosis or treatment. If you are experiencing a medical emergency, call 911.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-6 text-[0.9375rem]">
          <a href="/login" className="inline-flex items-center min-h-[44px] hover:text-white">Sign in</a>
          <a href="/register?src=footer" onClick={() => track("landing_cta_click", { location: "footer" })} className="inline-flex items-center min-h-[44px] hover:text-white">Create an account</a>
        </nav>
      </div>
      <div className={`${container} pb-10 text-sm text-white/50`}>© {new Date().getFullYear()} Health Me Medical Center</div>
    </footer>
  );
}

// Shown on phones once the hero CTA scrolls away, hidden again at the final CTA.
function StickyCta({ heroRef, finalRef }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const hero = heroRef.current?.getBoundingClientRect();
      const fin = finalRef.current?.getBoundingClientRect();
      setOn(Boolean(hero && fin && hero.bottom < 0 && fin.top > window.innerHeight));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [heroRef, finalRef]);

  return (
    <div
      className="lp-sticky md:hidden fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[rgba(250,248,244,0.94)] backdrop-blur-md shadow-[0_-1px_0_var(--line)]"
      data-on={String(on)}
      aria-hidden={!on}
    >
      <a
        href="/register?src=sticky"
        tabIndex={on ? 0 : -1}
        onClick={() => track("landing_cta_click", { location: "sticky" })}
        className="lp-btn w-full"
      >
        {CTA_LABEL} <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function Landing() {
  const heroCta = useRef(null);
  const finalCta = useRef(null);

  useEffect(() => {
    document.title = "Health Me | Talk to an AI doctor 24 hours a day";
    const params = new URLSearchParams(window.location.search);
    track("landing_view", {
      referrer: document.referrer || null,
      utm_source: params.get("utm_source"),
      utm_campaign: params.get("utm_campaign"),
    });
  }, []);

  return (
    <div className="lp min-h-screen overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero ctaRef={heroCta} />
        <ServicesSection />
        <HowSection />
        <HistorySection />
        <FamilySection />
        <TrustSection />
        <PricingSection />
        <FaqSection />
        <FinalCta ctaRef={finalCta} />
      </main>
      <Footer />
      <StickyCta heroRef={heroCta} finalRef={finalCta} />
    </div>
  );
}
