import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Plus, Phone } from "lucide-react";
import {
  HeroPrep, ScatteredToCaptured, WholeWeek, BetterContext, IntakeFlow, NightChat, SignalsToBrief, CaregiverMock, ReadyForVisit, Mark,
} from "@/components/landing/Demos";
import { track } from "@/components/landing/track";
import "@/components/landing/landing.css";

const container = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
const section = "py-16 sm:py-24";
// Type scale: HERO > DISPLAY (manifesto, close) > STATEMENT (big idea lines) > H2 (section heads) > LEAD > SMALL.
const HERO = "lp-display font-extrabold text-[2.75rem] leading-[0.98] sm:text-[4rem] lg:text-[3.5rem] xl:text-[4.75rem] tracking-[-0.05em]";
const DISPLAY = "lp-display font-extrabold text-[2.75rem] leading-[1] sm:text-[4rem] lg:text-[5rem] tracking-[-0.05em]";
const STATEMENT = "lp-display font-extrabold text-[2.25rem] leading-[1.02] sm:text-[3.25rem] lg:text-[4rem] tracking-[-0.045em]";
const H2 = "lp-display font-bold text-[2rem] leading-[1.06] sm:text-[2.625rem] lg:text-[3.125rem] tracking-[-0.04em]";
const LEAD = "text-[1.0625rem] sm:text-[1.1875rem] leading-relaxed text-[color:var(--ink-2)]";
const SMALL = "text-[0.875rem] leading-relaxed text-[color:var(--muted)]";
// Section surfaces, alternated so each idea reads as its own moment.
const BG = {
  paper: "bg-[color:var(--paper)]",
  warm: "bg-[color:var(--paper-2)]",
  sky: "bg-[color:var(--sky-band)]",
  white: "bg-white",
};
// Preparing starts with a free profile: the CTA goes to /register.
const CTA_LABEL = "Prepare for My Next Visit";

function Cta({ src, size = "", className = "" }) {
  return (
    <a
      href={`/register?src=${src}`}
      onClick={() => track("landing_cta_click", { location: src })}
      className={`lp-btn ${size} ${className}`}
    >
      {CTA_LABEL}
      <ArrowRight className="w-[18px] h-[18px]" aria-hidden="true" />
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
      <nav aria-label="Main" className={`${container} flex items-center justify-between h-16`}>
        <a href="/" aria-label="Health Me home" className="rounded-lg"><Wordmark /></a>
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#how" className={link}>How it works</a>
          <a href="#features" className={link}>Features</a>
          <a href="#family" className={link}>Families</a>
          <a href="#faq" className={link}>FAQ</a>
          <a
            href="/login"
            onClick={() => track("landing_signin_click", { location: "nav" })}
            className="inline-flex items-center h-10 px-3 rounded-full text-[0.9375rem] font-medium whitespace-nowrap text-[color:var(--ink)] hover:bg-[color:var(--paper-2)] transition-colors"
          >
            Sign in
          </a>
          <Cta src="nav" size="lp-btn--sm" className="hidden sm:inline-flex sm:ml-1" />
        </div>
      </nav>
    </header>
  );
}

function Eyebrow({ children, dark = false, className = "" }) {
  return <p className={`lp-eyebrow ${dark ? "!text-sky-300" : ""} ${className}`}>{children}</p>;
}

function Chips({ items, className = "" }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((t) => (
        <li key={t} className="rounded-full bg-white px-3.5 py-1.5 text-[0.9375rem] text-[color:var(--ink)] shadow-[0_0_0_1px_var(--line)]">{t}</li>
      ))}
    </ul>
  );
}

/* 1. Hero */
function Hero({ ctaRef }) {
  return (
    <section aria-labelledby="hero-title" className={`relative overflow-hidden ${BG.paper}`}>
      <div className={`${container} relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] gap-12 lg:gap-10 items-center pt-6 sm:pt-12 lg:pt-2 pb-14 sm:pb-20 lg:pb-10 lg:min-h-[calc(100svh-64px)] lg:max-h-[860px]`}>
        <div>
          <Eyebrow>Your next appointment starts now</Eyebrow>
          <h1 id="hero-title" className={`${HERO} mt-3`}>
            <span className="block">Your health happens between appointments.</span>
            <span className="block text-[color:var(--brand)]">Bring it with you.</span>
          </h1>
          <p className="lp-serif italic mt-5 max-w-[600px] text-[1.25rem] sm:text-[1.375rem] leading-[1.35] text-[color:var(--ink)]">
            Symptoms change. Medications change. Questions come up. Details get forgotten.
          </p>
          <p className={`${LEAD} mt-3 max-w-[580px]`}>
            Health Me helps you capture what happens between visits and organize it into a clear Appointment Brief for
            your next conversation with your doctor.
          </p>
          <div ref={ctaRef} className="mt-7 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-6">
            <Cta src="hero" size="lp-btn--lg lp-btn--xl" className="w-full sm:w-auto" />
            <a
              href="#how"
              onClick={() => track("landing_secondary_click", { location: "hero_how" })}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] text-[1.0625rem] font-semibold whitespace-nowrap text-[color:var(--ink)] underline-offset-4 hover:underline"
            >
              See How Health Me Works <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-5 text-[1rem] font-medium text-[color:var(--ink)]">
            Less forgetting. Better questions. More complete conversations.
          </p>
          <p className={`mt-2 max-w-[560px] ${SMALL}`}>
            Health Me provides health information and AI-guided support. It does not replace emergency care or diagnosis
            and treatment from a licensed healthcare professional.
          </p>
        </div>
        <HeroPrep />
      </div>
    </section>
  );
}

/* 2. Emotional pain: scattered → captured */
function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className={`${section} ${BG.warm}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center`}>
        <div className="max-w-[540px]">
          <Eyebrow>That appointment matters</Eyebrow>
          <h2 id="problem-title" className={`${H2} mt-3`}>Don't spend the drive home remembering everything you forgot to say.</h2>
          <p className={`${LEAD} mt-6`}>You finally get in front of the doctor. They ask what's going on. Then it's over.</p>
          <p className="lp-serif italic mt-4 text-[1.75rem] leading-tight text-[color:var(--ink)]">&ldquo;I forgot to tell them&hellip;&rdquo;</p>
          <p className="mt-4 text-[1.125rem] font-semibold text-[color:var(--ink)]">Health Me is designed to help prevent that.</p>
        </div>
        <div className="flex lg:justify-end"><ScatteredToCaptured /></div>
      </div>
    </section>
  );
}

/* 3. The context problem */
function RoomSection() {
  return (
    <section aria-labelledby="room-title" className={`${section} ${BG.white}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-8 lg:gap-16 items-end`}>
        <h2 id="room-title" className={STATEMENT}>
          Your doctor only knows what makes it <span className="text-[color:var(--brand)]">into the&nbsp;room.</span>
        </h2>
        <div className={`${LEAD} space-y-4 lg:pb-2`}>
          <p className="text-[color:var(--ink)] font-semibold">Your doctor brings medical expertise into the room.</p>
          <p className="text-[color:var(--ink)] font-semibold">You bring the lived experience of what has happened since the last visit.</p>
          <p>Health Me helps you organize that experience so important details are less likely to disappear from the conversation.</p>
        </div>
      </div>
    </section>
  );
}

/* 4. Timeline: Monday through Monday */
function TimelineSection() {
  return (
    <section aria-labelledby="between-title" className={`${section} ${BG.sky}`}>
      <div className={container}>
        <Eyebrow>Your medical record isn't your whole health story</Eyebrow>
        <h2 id="between-title" className={`${STATEMENT} mt-3`}>
          <span className="block">Your doctor sees Tuesday.</span>
          <span className="block text-[color:var(--brand)]">Health Me helps you bring Monday through&nbsp;Monday.</span>
        </h2>
        <div className="mt-10 sm:mt-14"><WholeWeek /></div>
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <p className={`${LEAD} lg:max-w-[460px] shrink-0`}>Your record may show the appointment. It may not show what you lived through around it:</p>
          <Chips items={["How you felt", "What changed", "What came back", "What worried you", "What your spouse noticed", "Questions you meant to ask"]} />
        </div>
      </div>
    </section>
  );
}

/* 5. Proof: same patient, better context */
function BeforeAfterSection() {
  return (
    <section aria-labelledby="context-title" className={`${section} ${BG.white}`}>
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:gap-16 items-end">
          <h2 id="context-title" className={STATEMENT}>
            <span className="block">Same patient.</span>
            <span className="block text-[color:var(--brand)]">Better context.</span>
          </h2>
          <p className={`${LEAD} lg:pb-2`}>
            Health Me doesn't diagnose for your doctor. It helps you walk into the conversation with more of the
            information your doctor may want to consider.
          </p>
        </div>
        <div className="relative mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] gap-5 lg:gap-8 items-stretch">
          <span aria-hidden="true" className="hidden lg:grid absolute z-10 left-[37.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 place-items-center w-14 h-14 rounded-full bg-[color:var(--brand)] text-white ring-8 ring-white">
            <ArrowRight className="w-6 h-6" />
          </span>
          <div className="rounded-[28px] bg-[#ece8e1] p-7 sm:p-10 flex flex-col justify-center">
            <p className="lp-eyebrow !text-[color:var(--muted)]">Without Health Me</p>
            <p className="lp-serif italic mt-5 text-[2.75rem] sm:text-[3.5rem] leading-[1] text-[#6b6458]">&ldquo;I've just felt off lately.&rdquo;</p>
            <ul aria-hidden="true" className="lp-serif italic mt-6 space-y-1 text-[1.125rem] text-[#a39b8d]">
              <li>&hellip;started a week ago? Maybe two?</li>
              <li>&hellip;I think something changed with my pills?</li>
            </ul>
          </div>
          <div>
            <p className="lp-eyebrow mb-3 lg:hidden">With Health Me</p>
            <BetterContext />
          </div>
        </div>
      </div>
    </section>
  );
}

/* 6. Guided intake */
function PrepSection() {
  return (
    <section id="how" aria-labelledby="how-title" className={`${section} ${BG.warm}`}>
      <div className={container}>
        <Eyebrow>Before the appointment</Eyebrow>
        <h2 id="how-title" className={`${H2} mt-3 max-w-[900px]`}>Turn &ldquo;something feels wrong&rdquo; into a conversation your doctor can actually use.</h2>
        <div className="mt-10 sm:mt-14"><IntakeFlow /></div>
        <p className={`${H2} !font-extrabold mt-14 sm:mt-20 pt-10 sm:pt-14 border-t border-[color:var(--ink)]/20 max-w-[1100px]`}>
          <span className="block text-[color:var(--muted)]">The goal isn't to tell your doctor what the diagnosis&nbsp;is.</span>
          <span className="block">The goal is to make sure your doctor has a better picture of&nbsp;you.</span>
        </p>
      </div>
    </section>
  );
}

/* 7. AI preparation */
function AiSection() {
  return (
    <section aria-labelledby="ai-title" className={`${section} ${BG.white}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-center`}>
        <div className="order-2 lg:order-1 flex lg:justify-start"><NightChat /></div>
        <div className="order-1 lg:order-2 max-w-[560px]">
          <Eyebrow>AI that helps you prepare — not replace your doctor</Eyebrow>
          <h2 id="ai-title" className={`${H2} mt-3`}>Think through your health before you're sitting on the exam table.</h2>
          <p className={`${LEAD} mt-6`}>Health questions rarely appear at the exact moment you're speaking with your doctor. They happen:</p>
          <Chips className="mt-4" items={["At home", "At night", "After a medication changes", "After a new symptom", "After a lab result arrives"]} />
          <p className={`${LEAD} mt-5`}>
            Work through those concerns while they're fresh, connected to the health information you're already
            tracking. Then take that context to your healthcare professional.
          </p>
        </div>
      </div>
      <div className={`${container} mt-14 sm:mt-20`}>
        <div className="rounded-[28px] bg-[color:var(--sky-band)] px-7 py-10 sm:px-14 sm:py-14">
          <p className={`${STATEMENT} max-w-[1000px]`}>
            AI shouldn't replace the doctor&#8209;patient relationship.{" "}
            <span className="text-[color:var(--brand)]">It should help you make more of it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* 8. Brand manifesto */
const STORY_WORDS = ["Symptoms.", "Medications.", "Questions.", "Records.", "Vitals.", "Labs.", "Changes you've noticed.", "Concerns you've been carrying around."];

function BrandStatement() {
  return (
    <section aria-labelledby="brand-title" className="lp-dark relative overflow-hidden bg-[color:var(--ink)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ background: "radial-gradient(60% 80% at 85% 10%, rgba(14,165,233,0.22), transparent 60%)" }} />
      <div className={`${container} relative py-20 sm:py-28`}>
        <h2 id="brand-title" className={`${DISPLAY} max-w-[1060px]`}>
          Don't replace your doctor. Bring them a better&#8209;prepared patient.
        </h2>
        <div className="mt-10 sm:mt-14 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-8 lg:gap-20">
          <p className="text-lg sm:text-[1.25rem] leading-relaxed text-white/75 max-w-[440px]">
            Health Me helps you capture what happens between appointments so your next healthcare conversation can
            start with more context.
          </p>
          <p className="lp-display text-[1.5rem] sm:text-[2rem] leading-[1.3] font-semibold">
            {STORY_WORDS.map((w, i) => (
              <span key={w} className="text-white" style={{ opacity: 0.45 + (i / (STORY_WORDS.length - 1)) * 0.55 }}>{w} </span>
            ))}
          </p>
        </div>
        <div className="mt-12 sm:mt-16 pt-10 sm:pt-14 border-t border-white/15 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-6 lg:gap-20 items-end">
          <p className="lp-display text-[1.25rem] sm:text-[1.5rem] font-semibold text-white/80 lg:pb-5">One place. Ready when the appointment starts.</p>
          <p className="lp-serif italic text-[3.75rem] sm:text-[5.5rem] lg:text-[7rem] leading-[0.92] tracking-[-0.025em] text-sky-300">
            <span className="sm:block">Bring the </span><span className="sm:block">whole story.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* 9. Many signals → one Appointment Brief */
function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className={`${section} ${BG.warm}`}>
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-4 lg:gap-16 items-end">
          <div>
            <Eyebrow>One place to build the story</Eyebrow>
            <h2 id="features-title" className={`${H2} mt-3`}>Everything your next health conversation may depend on.</h2>
          </div>
          <p className={`${LEAD} lg:pb-1`}>Different pieces of your health, organized into one Health Me Appointment Brief.</p>
        </div>
        <div className="mt-10 sm:mt-14"><SignalsToBrief /></div>
      </div>
    </section>
  );
}

/* 10. Family and caregiving */
function FamilySection() {
  return (
    <section id="family" aria-labelledby="family-title" className={`${section} ${BG.white}`}>
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:gap-16 items-end">
          <div>
            <Eyebrow>When you're speaking for someone else</Eyebrow>
            <h2 id="family-title" className={`${H2} mt-3`}>It's even harder when the patient isn't&nbsp;you.</h2>
          </div>
          <p className={`${LEAD} lg:pb-1`}>
            A child. An aging parent. A spouse. Health Me keeps each person's medications, symptoms and history separate,
            so you don't have to rely entirely on memory.
          </p>
        </div>
        <div className="mt-10 sm:mt-12"><CaregiverMock /></div>
      </div>
    </section>
  );
}

/* 11. Better appointment */
function DoctorSection() {
  return (
    <section aria-labelledby="doctor-title" className={`${section} ${BG.sky}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center`}>
        <div className="max-w-[520px]">
          <Eyebrow>Better context. Better conversations.</Eyebrow>
          <h2 id="doctor-title" className={`${H2} mt-3`}>A better appointment starts before you walk into the&nbsp;office.</h2>
          <p className={`${LEAD} mt-6`}>
            Walk in with the important pieces already organized. Download your brief as a PDF, or share records through a
            link that expires on the date you choose.
          </p>
          <div className="mt-8 space-y-3 border-l-[3px] border-[color:var(--brand)] pl-5">
            <p className="lp-display text-[1.375rem] sm:text-[1.5rem] leading-snug font-bold tracking-[-0.02em]">Your doctor brings the medical expertise.</p>
            <p className="lp-display text-[1.375rem] sm:text-[1.5rem] leading-snug font-bold tracking-[-0.02em] text-[color:var(--brand)]">You bring a better picture of what you've been experiencing.</p>
          </div>
        </div>
        <div className="flex lg:justify-end"><ReadyForVisit /></div>
      </div>
    </section>
  );
}

/* FAQ */
const FAQ = [
  {
    q: "Is Health Me a replacement for my doctor?",
    a: "No. Health Me helps you organize health information, track what happens between appointments and prepare questions, so your conversations with healthcare professionals can start with more context. It does not replace emergency care or diagnosis and treatment from a licensed healthcare professional.",
  },
  {
    q: "What can I bring to my appointment?",
    a: "You can download a visit summary PDF with your allergies and conditions, current medications, recent vital signs and recent health conversations. You can also fill out intake forms with your main concern, how long it has been going on, your history and the questions you want to ask, and share records through links that expire.",
  },
  {
    q: "Can I keep track of someone else's health?",
    a: "Yes. You can create separate profiles for children, partners, parents and other people you help care for, so their medications, symptoms, records and appointments stay organized for the right person.",
  },
  {
    q: "Can I upload medical records or lab information?",
    a: "Yes. You can upload medical records, including PDFs and photos of documents. Health Me reads the document and can pull out supported measurements such as blood pressure, heart rate, blood sugar, oxygen level, weight and temperature so they appear in your health trends. You can also enter measurements yourself.",
  },
  {
    q: "What should I do in an emergency?",
    a: "Health Me is not an emergency-response service. If you believe you are experiencing a medical emergency, call 911 or your local emergency services immediately.",
  },
];

function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={`py-12 sm:py-16 ${BG.white}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-6 lg:gap-16`}>
        <div>
          <h2 id="faq-title" className={H2}>Questions</h2>
          <p className="mt-5 hidden lg:flex gap-2.5 text-[1rem] leading-snug text-[color:var(--ink-2)]">
            <Phone className="w-4 h-4 mt-0.5 text-[color:var(--urgent)] shrink-0" aria-hidden="true" />
            For life-threatening symptoms or emergencies, call 911 or your local emergency services.
          </p>
        </div>
        <div className="space-y-2">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="lp-faq rounded-2xl bg-[color:var(--paper)] px-5"
              onToggle={(e) => e.currentTarget.open && track("landing_faq_open", { question: f.q })}
            >
              <summary className="flex items-center justify-between gap-6 py-4 min-h-[60px] text-[1.125rem] font-semibold rounded-lg">
                {f.q}
                <Plus className="lp-faq-icon w-5 h-5 shrink-0 text-[color:var(--brand)] transition-transform" aria-hidden="true" />
              </summary>
              <p className="pb-5 -mt-1 pr-8 text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">{f.a}</p>
            </details>
          ))}
          <p className="lg:hidden pt-3 flex gap-2.5 text-[0.9375rem] leading-snug text-[color:var(--ink-2)]">
            <Phone className="w-4 h-4 mt-0.5 text-[color:var(--urgent)] shrink-0" aria-hidden="true" />
            For life-threatening symptoms or emergencies, call 911 or your local emergency services.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 13. Final CTA */
function FinalCta({ ctaRef }) {
  return (
    <section aria-labelledby="final-title" className="lp-dark relative overflow-hidden bg-[color:var(--brand)] text-white">
      <div className={`${container} relative py-24 sm:py-32 text-center`}>
        <Eyebrow dark className="!text-sky-200">The next appointment is too important to wing it.</Eyebrow>
        <h2 id="final-title" className="lp-display mt-5 mx-auto max-w-[1040px] font-extrabold text-[3rem] leading-[0.96] sm:text-[4.75rem] lg:text-[6rem] tracking-[-0.05em]">
          Walk in knowing what you need to&nbsp;say.
        </h2>
        <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-5">
          <Cta src="final" size="lp-btn--lg lp-btn--xl lp-btn--light" />
          <p className="text-[1.0625rem] leading-snug text-white/85">Capture what's happening now.<br />Bring the whole story later.</p>
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
          <a href="/register?src=footer" onClick={() => track("landing_cta_click", { location: "footer" })} className="inline-flex items-center min-h-[44px] hover:text-white">{CTA_LABEL}</a>
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
    document.title = "Health Me | Your Health Happens Between Appointments";
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
        <ProblemSection />
        <RoomSection />
        <TimelineSection />
        <BeforeAfterSection />
        <PrepSection />
        <AiSection />
        <BrandStatement />
        <FeaturesSection />
        <FamilySection />
        <DoctorSection />
        <FaqSection />
        <FinalCta ctaRef={finalCta} />
      </main>
      <Footer />
      <StickyCta heroRef={heroCta} finalRef={finalCta} />
    </div>
  );
}
