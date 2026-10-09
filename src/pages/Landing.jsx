import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowDown, Check, Plus, Phone, MessageCircle, FolderOpen, Pill, LineChart, Users, Activity, ShieldPlus,
  UserRoundCheck, Stethoscope, Syringe, HeartPulse, Brain, ScanFace, Smile, Eye, Ear, PersonStanding, Medal, Leaf,
  Dumbbell, HeartHandshake, Baby, PawPrint, Share2, Clock, KeyRound,
} from "lucide-react";
import {
  HeroWorkspace, ChatMock, MedsMock, RecordsTrendMock, FamilyMock, EmergencyMock, SharingMock, Mark,
} from "@/components/landing/Demos";
import { track } from "@/components/landing/track";
import "@/components/landing/landing.css";

const container = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
const h2 = "lp-display font-semibold text-[1.875rem] leading-[1.1] sm:text-[2.375rem] lg:text-[2.625rem]";
const body = "text-lg leading-relaxed text-[color:var(--ink-2)]";
const CTA_LABEL = "Start Your Health Profile";

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
      <span className="lp-display text-[1.125rem] sm:text-[1.1875rem] font-bold tracking-[-0.02em] whitespace-nowrap">Health Me</span>
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
          <a href="#how" className={link}>How it works</a>
          <a href="#features" className={link}>Features</a>
          <a href="#family" className={link}>Family</a>
          <a href="#faq" className={link}>FAQ</a>
          <a
            href="/login"
            onClick={() => track("landing_signin_click", { location: "nav" })}
            className="inline-flex items-center h-10 px-2 sm:px-3 rounded-full text-[0.9375rem] font-medium whitespace-nowrap text-[color:var(--ink)] hover:bg-[color:var(--paper-2)] transition-colors"
          >
            Sign in
          </a>
          <Cta src="nav" size="lp-btn--sm" className="sm:ml-1 !px-4 sm:!px-[1.125rem]">
            <span className="sm:hidden">Get Started</span>
            <span className="hidden sm:inline">{CTA_LABEL}</span>
          </Cta>
        </div>
      </nav>
    </header>
  );
}

function Eyebrow({ children, dark = false }) {
  return <p className={`lp-eyebrow ${dark ? "!text-sky-300" : ""}`}>{children}</p>;
}

/* 1. Hero */
function Hero({ ctaRef }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-10%] w-[70%] h-[120%] hidden lg:block"
        style={{ background: "radial-gradient(closest-side, rgba(14,165,233,0.10), rgba(14,165,233,0) 70%)" }}
      />
      <div className={`${container} relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-12 items-center pt-6 sm:pt-12 lg:pt-2 pb-16 sm:pb-20 lg:pb-10 lg:min-h-[calc(100svh-72px)]`}>
        <div className="max-w-[600px]">
          <Eyebrow>Your health. Connected.</Eyebrow>
          <h1 id="hero-title" className="lp-display [text-wrap:wrap] mt-3 font-semibold text-[2.625rem] leading-[1.05] sm:text-[3.5rem] lg:text-[3.25rem] xl:text-[3.5rem]">
            Your health, finally in one place.
          </h1>
          <p className="mt-5 text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-[color:var(--ink-2)]">
            Health Me brings your health conversations, medications, medical records, lab results, vitals, family care
            and ongoing health tracking together in one intelligent workspace — so you can understand what is happening
            and know what to do next.
          </p>
          <div ref={ctaRef} className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
            <Cta src="hero" size="lp-btn--lg" className="w-full sm:w-auto" />
            <a
              href="#how"
              onClick={() => track("landing_secondary_click", { location: "hero_explore" })}
              className="inline-flex items-center justify-center gap-2 min-h-[56px] px-6 rounded-full font-semibold text-[color:var(--ink)] border border-[color:var(--line)] bg-white/60 hover:bg-white transition-colors"
            >
              Explore Health Me <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-5 text-[0.9375rem] font-medium text-[color:var(--ink-2)]">
            AI-guided health support • Records • Medications • Vitals • Family Care
          </p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-[color:var(--muted)] max-w-[540px]">
            Health Me provides health information and AI-guided support and is not a substitute for emergency care or
            diagnosis and treatment from a licensed healthcare professional.
          </p>
        </div>
        <HeroWorkspace />
      </div>
    </section>
  );
}

/* 2. Core value proposition */
const SCATTERED = ["Patient portals", "Pharmacy apps", "Lab reports", "Wearable dashboards", "Paper notes", "Your memory"];

function ValueSection() {
  return (
    <section aria-labelledby="value-title" className="py-16 sm:py-24 bg-[color:var(--paper-2)]">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start`}>
        <div>
          <Eyebrow>One place for your health</Eyebrow>
          <h2 id="value-title" className={`${h2} mt-3`}>Your health should not live in ten different places.</h2>
          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Where health information usually lives">
            {SCATTERED.map((s) => (
              <li key={s} className="rounded-full border border-dashed border-[#c9c3b8] px-3.5 py-1.5 text-[0.9375rem] text-[color:var(--muted)]">{s}</li>
            ))}
          </ul>
        </div>
        <div className={`${body} space-y-5 lg:pt-10`}>
          <p>
            Most people manage their health through a collection of disconnected portals, pharmacy apps, lab reports,
            notes, wearable dashboards and memories.
          </p>
          <p className="font-semibold text-[color:var(--ink)]">Health Me brings those pieces together.</p>
          <p>
            Ask health questions. Keep medications organized. Store records. Follow lab results and vitals over time.
            Manage family members. Track recovery. Prepare for appointments. And keep the health information that
            matters accessible when you need it.
          </p>
        </div>
      </div>
      <CardGrid />
    </section>
  );
}

/* 3. Value prop cards */
const CARDS = [
  { icon: MessageCircle, title: "Start with what you're feeling", text: "Describe a symptom, concern or health question and begin an AI-guided health conversation using the information available in your Health Me profile." },
  { icon: FolderOpen, title: "Keep your medical history together", text: "Organize records, important health information and previous health activity in one place instead of searching through multiple portals every time you need it." },
  { icon: Pill, title: "Understand your medications", text: "Track active medications, dosage information, schedules, adherence and refill needs from one centralized medication workspace." },
  { icon: LineChart, title: "See what is changing over time", text: "Follow vitals, health measurements and supported lab results across time so individual numbers become a more useful health picture." },
  { icon: Users, title: "Manage more than just yourself", text: "Create health profiles for family members and keep important medications, records, health activity and care information organized without mixing everyone's information together." },
  { icon: Activity, title: "Keep recovery on track", text: "Track recovery milestones, symptoms, pain, mobility and other health information after procedures or injuries so progress is easier to understand and communicate." },
  { icon: ShieldPlus, title: "Be prepared when health information matters most", text: "Keep important emergency health information accessible, including the details someone may need when you cannot explain everything yourself." },
  { icon: UserRoundCheck, title: "Bring better context to real healthcare", text: "Keep important health information organized so appointments and conversations with healthcare professionals can begin with more context and less time reconstructing your history." },
];

function CardGrid() {
  return (
    <div id="features" className={`${container} mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4`}>
        {CARDS.map((c) => (
          <div key={c.title} className="flex gap-4 sm:block rounded-[20px] bg-white p-5 sm:p-6 shadow-[0_0_0_1px_rgba(15,30,44,0.06),0_12px_28px_-20px_rgba(15,30,44,0.35)]">
            <span className="grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[color:var(--sky-wash)] text-[color:var(--brand)] shrink-0">
              <c.icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="lp-display sm:mt-5 text-[1.0625rem] sm:text-[1.1875rem] leading-snug font-semibold tracking-[-0.02em]">{c.title}</h3>
              <p className="mt-1.5 sm:mt-2 text-[0.9375rem] leading-relaxed text-[color:var(--ink-2)]">{c.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

/* 4. Workflow */
const STEPS = [
  { title: "Tell Health Me what's going on", text: "Start with a symptom, question, medication concern, new result or something you want to track." },
  { title: "Build your connected health picture", text: "Your medications, records, health profile, vitals, labs and ongoing activity give you a more organized view of your health over time." },
  { title: "Use AI-guided support", text: "Health Me helps you explore your health information, ask questions and understand possible next steps using the context available in your profile." },
  { title: "Keep the story going", text: "Save important information, monitor changes, prepare for appointments and continue building a health history you can actually use." },
];

function WorkflowSection() {
  return (
    <section id="how" aria-labelledby="how-title" className="py-16 sm:py-24">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center`}>
        <div>
          <Eyebrow>How Health Me works</Eyebrow>
          <h2 id="how-title" className={`${h2} mt-3`}>From a health question to a clearer next step.</h2>
          <ol className="mt-10 space-y-7">
            {STEPS.map((s, i) => (
              <li key={s.title} className="flex gap-5">
                <span className="grid place-items-center w-10 h-10 rounded-full bg-[color:var(--brand)] text-white font-semibold shrink-0">{i + 1}</span>
                <div>
                  <h3 className="lp-display text-[1.1875rem] font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-1.5 text-[1rem] leading-relaxed text-[color:var(--ink-2)]">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex lg:justify-end">
          <ChatMock />
        </div>
      </div>
    </section>
  );
}

/* 5. Specialties */
const AREAS = [
  [Stethoscope, "General health"], [Syringe, "Nursing support"], [HeartPulse, "Cardiology"], [Brain, "Neurology"],
  [ScanFace, "Dermatology"], [Smile, "Dental health"], [Eye, "Eye health"], [Ear, "ENT"],
  [PersonStanding, "Physical therapy"], [Medal, "Sports medicine"], [Leaf, "Wellness"], [Dumbbell, "Fitness"],
  [HeartHandshake, "Senior care"], [Baby, "Newborn and family care"], [PawPrint, "Veterinary health"],
];

function AreasSection() {
  return (
    <section aria-labelledby="areas-title" className="py-16 sm:py-24 bg-[color:var(--paper-2)]">
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">
          <div>
            <Eyebrow>Health guidance across more of your life</Eyebrow>
            <h2 id="areas-title" className={`${h2} mt-3`}>One starting point for more of your health questions.</h2>
          </div>
          <p className={body}>
            Health is rarely limited to one category. Health Me includes AI-guided experiences and dedicated health tools
            across multiple areas of care so your information can stay connected instead of starting from zero every time.
          </p>
        </div>
        <h3 className="mt-12 text-sm font-semibold text-[color:var(--muted)]">Explore Health Me's health tools</h3>
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {AREAS.map(([Icon, name]) => (
            <li key={name} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 shadow-[0_0_0_1px_rgba(15,30,44,0.06)]">
              <Icon className="w-5 h-5 text-[color:var(--brand)] shrink-0" aria-hidden="true" />
              <span className="text-[0.9375rem] font-medium leading-snug">{name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Shared two-column feature layout */
function Feature({ id, eyebrow, title, children, visual, reverse = false, className = "" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-16 sm:py-24 ${className}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
        <div className={reverse ? "lg:order-2" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id={`${id}-title`} className={`${h2} mt-3`}>{title}</h2>
          <div className={`mt-5 ${body} space-y-4`}>{children}</div>
        </div>
        <div className={`flex ${reverse ? "lg:order-1 lg:justify-start" : "lg:justify-end"}`}>{visual}</div>
      </div>
    </section>
  );
}

function CheckList({ items }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 pt-2">
      {items.map((t) => (
        <li key={t} className="flex gap-2.5 text-[1rem] text-[color:var(--ink)]">
          <Check className="w-5 h-5 text-[color:var(--ok)] shrink-0 mt-0.5" aria-hidden="true" />
          {t}
        </li>
      ))}
    </ul>
  );
}

/* 11. Product-scope callouts */
const CALLOUTS = [
  ["24/7", "AI-guided health access"],
  ["One Workspace", "Records, medications, vitals and health activity"],
  ["Whole Family", "Separate profiles for the people you care for"],
  ["Ongoing", "A health history that becomes more useful over time"],
];

function CalloutBand() {
  return (
    <section aria-label="What Health Me covers" className="lp-dark bg-[color:var(--ink)] text-white py-14 sm:py-16">
      <dl className={`${container} grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10`}>
        {CALLOUTS.map(([k, v]) => (
          <div key={k} className="border-l-2 border-sky-400/60 pl-5">
            <dt className="lp-display text-[1.625rem] sm:text-[2rem] font-semibold tracking-[-0.02em]">{k}</dt>
            <dd className="mt-1.5 text-[0.9375rem] leading-snug text-white/75">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* 12. Security / control */
const CONTROLS = [
  [Share2, "Choose what you share", "Decide whether a clinician can see your records, medications, vitals or past health conversations."],
  [Clock, "Access that expires", "Clinician access and shared record links end on the date you set."],
  [KeyRound, "Revoke at any time", "See who currently has access to your information and turn it off whenever you want."],
];

function ControlSection() {
  return (
    <section aria-labelledby="control-title" className="py-16 sm:py-24 border-t border-[color:var(--line)]">
      <div className={container}>
        <div className="max-w-[760px]">
          <h2 id="control-title" className={h2}>Your health information. Your account. Your control.</h2>
          <p className={`mt-5 ${body}`}>
            Keep your health information organized in one private workspace and control the information you choose to
            add and share.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {CONTROLS.map(([Icon, t, d]) => (
            <div key={t} className="border-t border-[color:var(--line)] pt-6">
              <Icon className="w-5 h-5 text-[color:var(--brand)]" aria-hidden="true" />
              <h3 className="lp-display mt-3 text-[1.1875rem] font-semibold tracking-[-0.02em]">{t}</h3>
              <p className="mt-2 text-[1rem] leading-relaxed text-[color:var(--ink-2)]">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 13. FAQ */
const FAQ = [
  {
    q: "Is Health Me a replacement for my doctor?",
    a: "No. Health Me is designed to help you organize health information, track ongoing health activity and access AI-guided health information. It does not replace emergency care or diagnosis and treatment from a licensed healthcare professional.",
  },
  {
    q: "What can I use Health Me for?",
    a: "Health Me brings together AI-guided health conversations, medications, records, supported lab information, vitals, health tracking, family profiles and other health-management tools in one place.",
  },
  {
    q: "Can I manage family members?",
    a: "Yes. Health Me includes family-profile functionality that allows health information to stay organized separately for different people in your household or care.",
  },
  {
    q: "Can I keep track of medications?",
    a: "Yes. Health Me includes medication-management tools for keeping medication names, dosages, schedules and related medication activity organized.",
  },
  {
    q: "Can I upload medical records or lab information?",
    a: "Yes. You can upload medical records, including PDFs and photos of documents. Health Me reads the document and can pull out supported measurements such as blood pressure, heart rate, blood sugar, oxygen level, weight and temperature so they appear in your health trends. You can also enter measurements yourself.",
  },
  {
    q: "What should I do in an emergency?",
    a: "Health Me can help keep important health information accessible, but it is not an emergency-response service. If you believe you are experiencing a medical emergency, call 911 or your local emergency services immediately.",
  },
];

function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pb-16 sm:pb-24">
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

/* Final CTA */
function FinalCta({ ctaRef }) {
  return (
    <section aria-labelledby="final-title" className="lp-dark bg-[color:var(--brand)] text-white">
      <div className={`${container} py-20 sm:py-28 text-center`}>
        <Eyebrow dark>Your health story is already happening</Eyebrow>
        <h2 id="final-title" className="lp-display mt-3 mx-auto max-w-[820px] font-semibold text-[2.5rem] leading-[1.06] sm:text-[3.25rem] lg:text-[3.75rem]">
          Give it one place to live.
        </h2>
        <p className="mt-5 mx-auto max-w-[640px] text-lg sm:text-[1.1875rem] leading-relaxed text-white/85">
          Start building a clearer, more useful picture of your health with your records, medications, health questions,
          measurements and ongoing care in one connected workspace.
        </p>
        <div ref={ctaRef} className="mt-9 flex flex-col items-center gap-4">
          <Cta src="final" size="lp-btn--lg lp-btn--light" />
          <p className="text-[0.9375rem] text-white/80">Set up your profile and begin bringing your health information together.</p>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[color:var(--ink)] text-white/70">
      <div className={`${container} py-12 grid gap-8 md:grid-cols-[1fr_auto] items-start`}>
        <div className="max-w-[640px]">
          <span className="text-white"><Wordmark /></span>
          <p className="mt-4 text-sm leading-relaxed">
            Health Me Medical Center provides health-management tools and AI-generated informational guidance.
            Information provided through Health Me is not a substitute for professional medical advice, diagnosis or
            treatment. Always seek the advice of a qualified healthcare professional regarding medical concerns. For
            emergencies, call 911 or your local emergency services.
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
    document.title = "Health Me | Your health, finally in one place";
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
        <ValueSection />
        <WorkflowSection />
        <AreasSection />

        <Feature
          id="medications"
          eyebrow="Medication management"
          title="Your medications deserve more than a list in your phone."
          visual={<MedsMock />}
          className="bg-[#eef6fb]"
        >
          <p>Health Me gives you one place to keep track of what you take, how you take it and what needs attention.</p>
          <p>
            Track medication names, dosages, schedules and refill information while keeping medication activity connected
            to the rest of your health profile.
          </p>
          <CheckList items={["Active medication tracking", "Dosage and schedule information", "Refill organization", "Medication history", "Adherence tracking", "Medication information and interaction tools"]} />
        </Feature>

        <Feature
          id="history"
          reverse
          eyebrow="Your health history"
          title="Stop treating every health result like an isolated event."
          visual={<RecordsTrendMock />}
        >
          <p>A lab value, blood-pressure reading or medical record is more useful when you can see it in context.</p>
          <p>
            Health Me helps organize records and supported health measurements so you can follow changes across time
            rather than relying on memory or scattered paperwork.
          </p>
          <p className="border-l-2 border-[color:var(--brand)] pl-4 font-medium text-[color:var(--ink)]">
            One result tells you what happened today. A health history helps you see what is changing.
          </p>
        </Feature>

        <Feature
          id="family"
          eyebrow="Built for real families"
          title="One account. Separate health stories."
          visual={<FamilyMock />}
          className="bg-[color:var(--paper-2)]"
        >
          <p>
            Managing your own health can be difficult enough. Helping a child, spouse, parent or other family member should
            not mean mixing everyone's information together.
          </p>
          <p>
            Health Me supports individual family profiles so medications, records, health activity and care information can
            remain organized for the right person.
          </p>
          <dl className="grid sm:grid-cols-3 gap-5 pt-2">
            {[
              ["Parents", "Keep children's health information and ongoing care organized."],
              ["Partners", "Maintain separate profiles without losing the convenience of one household health platform."],
              ["Caregivers", "Keep important information for aging parents or dependents easier to access and follow."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="font-semibold text-[color:var(--ink)]">{t}</dt>
                <dd className="mt-1 text-[0.9375rem] leading-relaxed">{d}</dd>
              </div>
            ))}
          </dl>
        </Feature>

        <Feature
          id="emergency"
          reverse
          eyebrow="When information matters"
          title="Important health information should not be buried in an app when you need it most."
          visual={<EmergencyMock />}
        >
          <p>
            Health Me includes tools for keeping critical health information easier to access, helping you stay more
            prepared for urgent situations and healthcare conversations.
          </p>
          <p className="flex gap-3 rounded-2xl bg-[color:var(--urgent-bg)] px-4 py-3.5 text-[1rem] text-[color:var(--ink)]">
            <Phone className="w-5 h-5 text-[color:var(--urgent)] shrink-0 mt-0.5" aria-hidden="true" />
            For life-threatening symptoms or emergencies, call 911 or your local emergency services.
          </p>
        </Feature>

        <Feature
          id="context"
          eyebrow="Better context"
          title="Walk into your next healthcare conversation with more of the story."
          visual={<SharingMock />}
          className="bg-[#eef6fb]"
        >
          <p>
            Medication lists, health notes, tracked measurements, lab information and previous health activity are much
            more useful when they are organized before the appointment begins.
          </p>
          <p>
            Health Me helps you keep that context together so you can spend less time trying to remember everything and
            more time discussing what matters.
          </p>
          <p>
            You can download PDF summaries, share records through links that expire, and give a clinician time-limited
            access to the parts of your profile you choose.
          </p>
        </Feature>

        <CalloutBand />
        <ControlSection />
        <FaqSection />
        <FinalCta ctaRef={finalCta} />
      </main>
      <Footer />
      <StickyCta heroRef={heroCta} finalRef={finalCta} />
    </div>
  );
}
