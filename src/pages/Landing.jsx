import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown, Plus, Phone } from "lucide-react";
import {
  HeroPrep, ScatteredToCaptured, WholeWeek, BetterContext, NightChat, StoryHub, CaregiverMock, ReadyForVisit, Mark,
} from "@/components/landing/Demos";
import { track } from "@/components/landing/track";
import "@/components/landing/landing.css";

const container = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
const section = "py-16 sm:py-24";
const h2 = "lp-display font-bold text-[2.125rem] leading-[1.06] sm:text-[2.75rem] lg:text-[3.25rem]";
const body = "text-[1.0625rem] sm:text-lg leading-relaxed text-[color:var(--ink-2)]";
// Section surfaces, alternated so each idea reads as its own moment.
const BG = {
  paper: "bg-[color:var(--paper)]",
  warm: "bg-[color:var(--paper-2)]",
  sky: "bg-[color:var(--sky-band)]",
  white: "bg-white",
};
// Logged-out visitors go to /register before anything else, so the one CTA names that step.
const CTA_LABEL = "Start My Health Profile";

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
      <div className={`${container} relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.85fr)] gap-12 lg:gap-8 items-center pt-6 sm:pt-12 lg:pt-2 pb-14 sm:pb-20 lg:pb-10 lg:min-h-[calc(100svh-64px)] lg:max-h-[860px]`}>
        <div>
          <Eyebrow>Better prepared for your next appointment</Eyebrow>
          <h1 id="hero-title" className="lp-display mt-3 max-w-[760px] font-bold text-[2.75rem] leading-[1] sm:text-[4rem] lg:text-[4.125rem] xl:text-[4.75rem] tracking-[-0.045em]">
            Your doctor only knows what makes it into the&nbsp;room.
          </h1>
          <ul className="lp-serif italic mt-5 text-[1.1875rem] sm:text-[1.3125rem] leading-[1.35] text-[color:var(--ink)]">
            <li>Symptoms you forgot.</li>
            <li>Questions you meant to ask.</li>
            <li>Medication changes you didn't think mattered.</li>
          </ul>
          <p className="mt-4 max-w-[580px] text-[1.0625rem] sm:text-[1.125rem] leading-relaxed text-[color:var(--ink-2)]">
            Health Me helps you capture what's happening between visits and organize it before your next appointment —
            so you can walk in with a clearer picture of what has actually been going on.
          </p>
          <div ref={ctaRef} className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <Cta src="hero" size="lp-btn--lg" className="w-full sm:w-auto" />
            <a
              href="#how"
              onClick={() => track("landing_secondary_click", { location: "hero_how" })}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] font-semibold whitespace-nowrap text-[color:var(--ink)] underline-offset-4 hover:underline"
            >
              See How Health Me Works <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 text-[0.9375rem] font-medium text-[color:var(--ink)]">
            Less forgetting. Better questions. More complete conversations.
          </p>
          <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-[color:var(--muted)] max-w-[560px]">
            Health Me provides health information and AI-guided support. It does not replace emergency care or diagnosis
            and treatment from a licensed healthcare professional.
          </p>
        </div>
        <HeroPrep />
      </div>
    </section>
  );
}

/* 2. Scattered → captured */
function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className={`${section} ${BG.warm}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-12 lg:gap-16 items-center`}>
        <div className="max-w-[540px]">
          <Eyebrow>That appointment matters</Eyebrow>
          <h2 id="problem-title" className={`${h2} mt-3`}>Don't spend the drive home remembering everything you forgot to say.</h2>
          <div className={`${body} mt-6 space-y-4`}>
            <p>
              You finally get in front of the doctor. They ask what's going on. You try to remember when it started, what
              changed, which medication you're taking, whether that lab result came before or after.
            </p>
            <p>
              Then the appointment is over. And twenty minutes later:
              <em className="block mt-2 lp-serif text-[1.625rem] leading-tight text-[color:var(--ink)]">&ldquo;I forgot to tell them&hellip;&rdquo;</em>
            </p>
            <p>
              <strong className="font-semibold text-[color:var(--ink)]">Health Me is designed to help prevent that.</strong>{" "}
              Capture what's happening while it's happening, then walk in with a clearer story.
            </p>
          </div>
        </div>
        <div className="flex lg:justify-end"><ScatteredToCaptured /></div>
      </div>
    </section>
  );
}

/* 3. Centerpiece: between appointments, Monday through Monday */
function TimelineSection() {
  return (
    <section aria-labelledby="between-title" className={`${section} ${BG.sky}`}>
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:gap-16 items-end">
          <div>
            <Eyebrow>Your medical record isn't your whole health story</Eyebrow>
            <h2 id="between-title" className={`${h2} mt-3`}>Your health happens between appointments.</h2>
          </div>
          <div>
            <p className={body}>
              Your record may show the appointment, the prescription and the lab result. It may not show what you lived
              through around them:
            </p>
            <Chips
              className="mt-4"
              items={["How you felt", "What changed", "What came back", "What worried you", "What your spouse noticed", "Questions you meant to ask"]}
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-14"><WholeWeek /></div>

        <p className="lp-display mt-10 sm:mt-14 font-bold text-[2rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.25rem] tracking-[-0.04em]">
          <span className="block">Your doctor sees Tuesday.</span>
          <span className="block text-[color:var(--brand)]">Health Me helps you bring Monday through&nbsp;Monday.</span>
        </p>
      </div>
    </section>
  );
}

/* 4. Before / after */
function BeforeAfterSection() {
  return (
    <section aria-labelledby="context-title" className={`${section} ${BG.white}`}>
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] rounded-[32px] overflow-hidden">
          <div className="relative bg-[#ece8e1] p-7 sm:p-12 flex flex-col min-h-[280px] lg:min-h-[520px]">
            <p className="lp-eyebrow !text-[color:var(--muted)]">Without Health Me</p>
            <p className="lp-serif italic my-auto pt-8 lg:pt-0 text-[2.75rem] sm:text-[3.75rem] lg:text-[4.25rem] leading-[1] text-[#6b6458]">
              &ldquo;I've just felt off lately.&rdquo;
            </p>
          </div>
          <div className="bg-[color:var(--ink)] p-7 sm:p-12">
            <p className="lp-eyebrow !text-sky-300 mb-5 flex items-center gap-2"><Mark className="w-5 h-5" /> With Health Me</p>
            <BetterContext />
          </div>
        </div>
        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-5 lg:gap-16 items-end">
          <h2 id="context-title" className="lp-display font-bold text-[2.75rem] leading-[1] sm:text-[4rem] lg:text-[4.5rem] tracking-[-0.045em]">
            Same patient.<br /><span className="text-[color:var(--brand)]">Better context.</span>
          </h2>
          <p className={`${body} lg:pb-2`}>
            Health Me doesn't diagnose for your doctor. It helps you walk into the conversation with more of the
            information your doctor may want to consider.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 5. Visit preparation, in five short steps */
const PREP = [
  ["Symptoms", ["What, when, how bad", "Better or worse?"], "Headaches since Oct 5. Dizzy when standing."],
  ["Concerns", ["What worries you", "What needs an answer"], "Is the higher dose agreeing with me?"],
  ["Medications", ["What, how much, when", "What changed"], "Lisinopril 10 → 20 mg on Oct 6."],
  ["History", ["Conditions, records", "Labs, vitals"], "High blood pressure since 2021."],
  ["Patterns", ["What changed over time"], "Worse in the evenings."],
];

function PrepSection() {
  return (
    <section id="how" aria-labelledby="how-title" className={`${section} ${BG.warm}`}>
      <div className={container}>
        <Eyebrow>Before the appointment</Eyebrow>
        <h2 id="how-title" className={`${h2} mt-3 max-w-[900px]`}>Turn &ldquo;something feels wrong&rdquo; into a conversation your doctor can actually use.</h2>

        <ol className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PREP.map(([title, prompts, note], i) => (
            <li key={title} className="flex flex-col rounded-[22px] bg-white p-5 shadow-[0_0_0_1px_var(--line)]">
              <div className="flex items-center gap-3">
                <span className="lp-display grid place-items-center w-8 h-8 rounded-full bg-[color:var(--brand)] text-white text-[0.875rem] font-bold shrink-0">{i + 1}</span>
                <h3 className="lp-display text-[1.25rem] font-bold tracking-[-0.02em]">{title}</h3>
              </div>
              <ul className="mt-3 space-y-0.5 text-[0.9375rem] text-[color:var(--ink-2)]">
                {prompts.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <p className="lp-serif mt-4 pt-3 border-t border-[color:var(--line)] text-[1.0625rem] leading-snug text-[color:var(--ink)]">{note}</p>
            </li>
          ))}
        </ol>

        <p className="lp-display mt-12 sm:mt-16 max-w-[1000px] text-[1.75rem] sm:text-[2.25rem] lg:text-[2.75rem] leading-[1.12] font-bold tracking-[-0.035em]">
          <span className="block text-[color:var(--muted)]">The goal isn't to tell your doctor what the diagnosis&nbsp;is.</span>
          <span className="block">The goal is to make sure your doctor has a better picture of&nbsp;you.</span>
        </p>
      </div>
    </section>
  );
}

/* 6. AI positioning */
function AiSection() {
  return (
    <section aria-labelledby="ai-title" className={`${section} ${BG.white}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-center`}>
        <div className="order-2 lg:order-1 flex lg:justify-start"><NightChat /></div>
        <div className="order-1 lg:order-2 max-w-[560px]">
          <Eyebrow>AI that helps you prepare — not replace your doctor</Eyebrow>
          <h2 id="ai-title" className={`${h2} mt-3`}>Think through your health before you're sitting on the exam table.</h2>
          <p className={`${body} mt-6`}>Health questions rarely appear at the exact moment you're speaking with your doctor. They happen:</p>
          <Chips className="mt-4" items={["At home", "At night", "After a medication changes", "After a new symptom", "After a lab result arrives"]} />
          <p className={`${body} mt-5`}>
            Health Me gives you a place to work through those concerns while they're fresh, connected to the health
            information you're already tracking. Then take that context into the conversation with your healthcare
            professional.
          </p>
        </div>
      </div>
      <div className={`${container} mt-14 sm:mt-20`}>
        <div className="rounded-[32px] bg-[color:var(--sky-band)] px-7 py-10 sm:px-14 sm:py-16">
          <p className="lp-display max-w-[980px] font-bold text-[2rem] leading-[1.08] sm:text-[2.75rem] lg:text-[3.5rem] tracking-[-0.04em]">
            AI shouldn't replace the doctor&#8209;patient relationship.{" "}
            <span className="text-[color:var(--brand)]">It should help you make more of it.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* 7. Brand manifesto */
const STORY_WORDS = ["Symptoms.", "Medications.", "Questions.", "Records.", "Vitals.", "Labs.", "Changes you've noticed.", "Concerns you've been carrying around."];

function BrandStatement() {
  return (
    <section aria-labelledby="brand-title" className="lp-dark relative overflow-hidden bg-[color:var(--ink)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ background: "radial-gradient(60% 80% at 85% 10%, rgba(14,165,233,0.22), transparent 60%)" }} />
      <div className={`${container} relative py-24 sm:py-32`}>
        <h2 id="brand-title" className="lp-display max-w-[1060px] font-bold text-[2.75rem] leading-[1.02] sm:text-[4rem] lg:text-[5.25rem] tracking-[-0.045em]">
          Don't replace your doctor. Bring them a better&#8209;prepared patient.
        </h2>
        <div className="mt-12 sm:mt-16 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-8 lg:gap-20">
          <p className="text-lg sm:text-[1.25rem] leading-relaxed text-white/75 max-w-[440px]">
            Health Me helps you capture what happens between appointments so your next healthcare conversation can
            start with more context.
          </p>
          <div>
            <p className="lp-display text-[1.5rem] sm:text-[2rem] leading-[1.3] font-semibold">
              {STORY_WORDS.map((w, i) => (
                <span key={w} className="text-white" style={{ opacity: 0.45 + (i / (STORY_WORDS.length - 1)) * 0.55 }}>{w} </span>
              ))}
            </p>
            <p className="mt-8 pt-8 border-t border-white/15 lp-display text-[1.5rem] sm:text-[2rem] font-semibold text-white">
              One place. Ready when the appointment starts.
            </p>
          </div>
        </div>
        <p className="lp-serif italic mt-16 sm:mt-24 text-[3.5rem] sm:text-[5.5rem] lg:text-[7.5rem] leading-[0.95] tracking-[-0.02em] text-sky-300">
          Bring the whole story.
        </p>
      </div>
    </section>
  );
}

/* 8. Features as one connected story */
function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className={`${section} ${BG.warm}`}>
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-4 lg:gap-16 items-end">
          <div>
            <Eyebrow>One place to build the story</Eyebrow>
            <h2 id="features-title" className={`${h2} mt-3`}>Everything your next health conversation may depend on.</h2>
          </div>
          <p className={body}>Each piece is useful on its own. Together, they become one story you can bring to the appointment.</p>
        </div>
        <div className="mt-10 sm:mt-12"><StoryHub /></div>
      </div>
    </section>
  );
}

/* 9. Family and caregiving */
function FamilySection() {
  return (
    <section id="family" aria-labelledby="family-title" className={`${section} ${BG.white}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-12 lg:gap-20 items-center`}>
        <div className="order-2 lg:order-1 flex lg:justify-start"><CaregiverMock /></div>
        <div className="order-1 lg:order-2 max-w-[520px]">
          <Eyebrow>When you're speaking for someone else</Eyebrow>
          <h2 id="family-title" className={`${h2} mt-3`}>It's even harder when the patient isn't&nbsp;you.</h2>
          <p className="lp-display mt-5 text-[1.375rem] leading-snug font-semibold text-[color:var(--ink)]">
            A child. An aging parent. A spouse. Someone you help care for.
          </p>
          <p className={`${body} mt-4`}>
            Now you're remembering someone else's medications, symptoms, appointments and history. Health Me keeps each
            person's story separate, so when a healthcare professional asks{" "}
            <span className="lp-serif italic text-[1.1875rem] text-[color:var(--ink)]">&ldquo;Has this happened before?&rdquo;</span>{" "}
            you don't have to rely entirely on memory.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 10. Doctor communication */
function DoctorSection() {
  return (
    <section aria-labelledby="doctor-title" className={`${section} ${BG.sky}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-center`}>
        <div className="max-w-[540px]">
          <Eyebrow>Better context. Better conversations.</Eyebrow>
          <h2 id="doctor-title" className={`${h2} mt-3`}>A better appointment starts before you walk into the&nbsp;office.</h2>
          <p className={`${body} mt-6`}>
            Instead of reconstructing weeks of health information from memory, walk in with the important pieces already
            organized. Download a visit summary to bring with you, or share records through a link that expires on the
            date you choose.
          </p>
        </div>
        <div className="flex lg:justify-end"><ReadyForVisit /></div>
      </div>
      <div className={`${container} mt-14 sm:mt-20`}>
        <div className="grid sm:grid-cols-2 rounded-[28px] overflow-hidden shadow-[0_0_0_1px_var(--line)]">
          <p className="bg-white p-7 sm:p-10 lp-display text-[1.625rem] sm:text-[2.125rem] leading-[1.15] font-bold tracking-[-0.035em]">
            Your doctor brings the medical expertise.
          </p>
          <p className="bg-[color:var(--brand)] text-white p-7 sm:p-10 lp-display text-[1.625rem] sm:text-[2.125rem] leading-[1.15] font-bold tracking-[-0.035em]">
            You bring a better picture of what you've been experiencing.
          </p>
        </div>
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
    <section id="faq" aria-labelledby="faq-title" className={`py-14 sm:py-20 ${BG.white}`}>
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] gap-6 lg:gap-16`}>
        <div>
          <h2 id="faq-title" className="lp-display font-bold text-[1.75rem] sm:text-[2.25rem] leading-tight tracking-[-0.035em]">Questions</h2>
          <p className="mt-4 hidden lg:flex gap-2.5 text-[0.9375rem] leading-snug text-[color:var(--ink-2)]">
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
              <summary className="flex items-center justify-between gap-6 py-4 min-h-[56px] text-[1.0625rem] font-semibold rounded-lg">
                {f.q}
                <Plus className="lp-faq-icon w-5 h-5 shrink-0 text-[color:var(--brand)] transition-transform" aria-hidden="true" />
              </summary>
              <p className="pb-5 -mt-1 pr-8 text-[1rem] leading-relaxed text-[color:var(--ink-2)]">{f.a}</p>
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

/* 11. Final CTA */
function FinalCta({ ctaRef }) {
  return (
    <section aria-labelledby="final-title" className="lp-dark relative overflow-hidden bg-[color:var(--brand)] text-white">
      <div className={`${container} relative py-20 sm:py-28 text-center`}>
        <Eyebrow dark className="!text-sky-200">The next appointment is too important to wing it.</Eyebrow>
        <h2 id="final-title" className="lp-display mt-4 mx-auto max-w-[900px] font-bold text-[2.75rem] leading-[1] sm:text-[4rem] lg:text-[4.75rem] tracking-[-0.045em]">
          Walk in knowing what you need to&nbsp;say.
        </h2>
        <p className="mt-6 mx-auto max-w-[560px] text-lg sm:text-[1.25rem] leading-relaxed text-white/85">
          You can have a better conversation when you're not trying to remember everything on the spot. Health Me helps
          you prepare.
        </p>
        <div ref={ctaRef} className="mt-9 flex flex-col items-center gap-4">
          <Cta src="final" size="lp-btn--lg lp-btn--light" />
          <p className="text-[0.9375rem] text-white/80">Capture what's happening now. Bring the whole story later.</p>
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
    document.title = "Health Me | Bring the Whole Story to Your Next Doctor Visit";
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
