import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, ArrowDown, Plus, MessageCircle, Activity, Pill, FolderOpen, LineChart, HeartPulse, Users,
  ClipboardList, Phone,
} from "lucide-react";
import {
  HeroPrep, ScatteredToCaptured, BetweenTrack, WholeWeek, BetterContext, NightChat, VisitSummaryDoc, CaregiverMock, Mark,
} from "@/components/landing/Demos";
import { track } from "@/components/landing/track";
import "@/components/landing/landing.css";

const container = "mx-auto w-full max-w-[1200px] px-5 sm:px-8";
const h2 = "lp-display font-semibold text-[2rem] leading-[1.08] sm:text-[2.5rem] lg:text-[2.875rem]";
const body = "text-[1.0625rem] sm:text-lg leading-relaxed text-[color:var(--ink-2)]";
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

// Short, stacked lines read like the thoughts they describe.
function Beats({ lines, className = "" }) {
  return (
    <ul className={`space-y-1 ${className}`}>
      {lines.map((l) => <li key={l}>{l}</li>)}
    </ul>
  );
}

/* 1. Hero */
function Hero({ ctaRef }) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className={`${container} relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-12 lg:gap-10 items-center pt-6 sm:pt-12 lg:pt-2 pb-16 sm:pb-20 lg:pb-10 lg:min-h-[calc(100svh-64px)] lg:max-h-[860px]`}>
        <div className="max-w-[600px]">
          <Eyebrow>Better prepared for your next appointment</Eyebrow>
          <h1 id="hero-title" className="lp-display mt-3 font-semibold text-[2.5rem] leading-[1.04] sm:text-[3.5rem] lg:text-[3.25rem] xl:text-[3.625rem]">
            Your doctor only knows what makes it into the room.
          </h1>
          <Beats
            className="lp-serif italic mt-5 !space-y-0 text-[1.25rem] sm:text-[1.375rem] leading-[1.35] text-[color:var(--ink)]"
            lines={["Symptoms you forgot.", "Questions you meant to ask.", "Medication changes you didn't think mattered."]}
          />
          <p className="mt-4 text-[1.0625rem] sm:text-[1.125rem] leading-relaxed text-[color:var(--ink-2)]">
            Health Me helps you capture what's happening between visits and organize it before your next appointment —
            so you can walk in with a clearer picture of what has actually been going on.
          </p>
          <div ref={ctaRef} className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3">
            <Cta src="hero" size="lp-btn--lg" className="w-full sm:w-auto" />
            <a
              href="#how"
              onClick={() => track("landing_secondary_click", { location: "hero_how" })}
              className="inline-flex items-center justify-center gap-2 min-h-[56px] px-5 rounded-full font-semibold whitespace-nowrap text-[color:var(--ink)] border border-[color:var(--line)] bg-white/60 hover:bg-white transition-colors"
            >
              See How Health Me Works <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-4 text-[0.9375rem] font-medium text-[color:var(--ink)]">
            Less forgetting. Better questions. More complete conversations.
          </p>
          <p className="mt-2 text-[0.8125rem] leading-relaxed text-[color:var(--muted)] max-w-[540px]">
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
    <section aria-labelledby="problem-title" className="py-20 sm:py-28 bg-[color:var(--paper-2)]">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-14 lg:gap-16 items-center`}>
        <div className="max-w-[560px]">
          <Eyebrow>That appointment matters</Eyebrow>
          <h2 id="problem-title" className={`${h2} mt-3`}>Don't spend the drive home remembering everything you forgot to say.</h2>
          <div className={`${body} mt-6 space-y-5`}>
            <p>You've probably experienced it. You finally get in front of the doctor. They ask what's going on.</p>
            <p>
              You try to remember when the symptoms started. What changed. Which medication you're taking. Whether that
              lab result happened before or after the problem began.
            </p>
            <p>
              Then the appointment is over. And twenty minutes later:
              <em className="block mt-2 lp-serif text-[1.5rem] text-[color:var(--ink)]">&ldquo;I forgot to tell them&hellip;&rdquo;</em>
            </p>
            <p className="font-semibold text-[color:var(--ink)]">Health Me is designed to help prevent that.</p>
            <p>
              Capture what is happening while it is happening. Organize your symptoms. Keep the questions you want
              answered. Track changes. Keep medications, records, labs and vitals together. Then walk into your
              appointment with a clearer story.
            </p>
          </div>
        </div>
        <div className="flex lg:justify-end"><ScatteredToCaptured /></div>
      </div>
    </section>
  );
}

/* 3. The differentiator: your health happens between appointments */
function BetweenSection() {
  return (
    <section aria-labelledby="between-title" className="py-20 sm:py-28">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-20 items-center`}>
        <div className="max-w-[560px]">
          <Eyebrow>Your medical record isn't your whole health story</Eyebrow>
          <h2 id="between-title" className={`${h2} mt-3`}>Your health happens between appointments.</h2>
          <p className={`${body} mt-6`}>
            Your medical record may show that you had an appointment. It may show the prescription. It may show the lab
            result. But it may not capture everything you experienced in the days and weeks around it.
          </p>
          <Beats
            className="mt-5 pl-4 border-l-2 border-[color:var(--brand)] text-[1.0625rem] sm:text-lg leading-relaxed text-[color:var(--ink)]"
            lines={[
              "How you felt.",
              "What changed.",
              "What disappeared and came back.",
              "What worried you.",
              "What your spouse noticed.",
              "What happened after a new medication.",
              "What questions you meant to ask.",
            ]}
          />
          <p className="mt-6 text-[1.1875rem] font-semibold leading-snug text-[color:var(--ink)]">
            Health Me helps you capture the part of your health story that happens outside the doctor's office.
          </p>
        </div>
        <BetweenTrack />
      </div>
    </section>
  );
}

/* 4. Monday through Monday */
function TimelineSection() {
  return (
    <section aria-labelledby="week-title" className="py-20 sm:py-28 bg-[color:var(--paper-2)]">
      <div className={container}>
        <h2 id="week-title" className="lp-display max-w-[960px] font-semibold text-[2.25rem] leading-[1.06] sm:text-[3rem] lg:text-[3.5rem]">
          Your doctor sees Tuesday.{" "}
          <span className="text-[color:var(--brand)]">Health Me helps you bring Monday through Monday.</span>
        </h2>
        <div className="mt-10 sm:mt-14"><WholeWeek /></div>
      </div>
    </section>
  );
}

/* 5. Before / after */
function BeforeAfterSection() {
  return (
    <section aria-labelledby="context-title" className="py-20 sm:py-28">
      <div className={container}>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 lg:gap-20 items-end">
          <h2 id="context-title" className={h2}>Same patient. Better context.</h2>
          <p className={body}>
            Health Me doesn't diagnose for your doctor. It helps you walk into the conversation with more of the
            information your doctor may want to consider.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-4 lg:gap-6 items-stretch">
          <div className="rounded-[24px] border border-dashed border-[#c9c3b8] p-6 sm:p-10 flex flex-col">
            <p className="lp-eyebrow !text-[color:var(--muted)]">Without Health Me</p>
            <p className="lp-serif italic mt-6 lg:my-auto text-[2.5rem] sm:text-[3.25rem] leading-[1.05] text-[color:var(--ink-2)]">
              &ldquo;I've just felt off lately.&rdquo;
            </p>
          </div>
          <BetterContext />
        </div>
      </div>
    </section>
  );
}

/* 6. Visit preparation workflow */
const PREP = [
  {
    key: "Symptoms",
    prompts: ["What are you experiencing?", "When did it start?", "Has it changed?", "What makes it better or worse?"],
    note: "Headaches since Mon, Oct 5, up to 6/10. Dizzy when I stand up since Thu, Oct 8. Both worse in the evening. Easing by Sunday.",
  },
  {
    key: "Concerns",
    prompts: ["What are you worried about?", "What are you afraid of forgetting?", "What needs an answer?"],
    note: "Worried the higher dose isn't agreeing with me. Ask: could it be related? Don't forget to mention the ibuprofen.",
  },
  {
    key: "Medications",
    prompts: ["What are you taking?", "How much?", "When?", "What recently changed?"],
    note: "Lisinopril 20 mg each morning (10 mg until Oct 6). Atorvastatin 20 mg at night. Ibuprofen 200 mg, most days this week.",
  },
  {
    key: "History",
    prompts: ["Relevant conditions", "Previous records", "Labs", "Vitals", "Recent health events"],
    note: "High blood pressure since 2021. Cholesterol panel from March. A month of home blood pressure readings.",
  },
  {
    key: "Patterns",
    prompts: ["What has changed over time?"],
    note: "Symptoms were worse in the evenings. Four blood pressure readings were higher than usual in the week after the dose change.",
  },
];

function PrepSection() {
  const [active, setActive] = useState(0);
  const step = PREP[active];
  return (
    <section id="how" aria-labelledby="how-title" className="py-20 sm:py-28 bg-[#eef5f9]">
      <div className={container}>
        <div className="max-w-[760px]">
          <Eyebrow>Before the appointment</Eyebrow>
          <h2 id="how-title" className={`${h2} mt-3`}>Turn &ldquo;something feels wrong&rdquo; into a conversation your doctor can actually use.</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-6 lg:gap-10 items-stretch">
          <div role="tablist" aria-label="Visit preparation steps" className="flex lg:flex-col gap-2 overflow-x-auto lp-noscrollbar -mx-5 px-5 lg:mx-0 lg:px-0">
            {PREP.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.key}
                  role="tab"
                  id={`prep-tab-${i}`}
                  aria-selected={on}
                  aria-controls="prep-panel"
                  onClick={() => setActive(i)}
                  className={`group shrink-0 flex items-center gap-4 rounded-2xl text-left px-4 lg:px-5 py-3 lg:py-4 transition-colors ${
                    on ? "bg-white shadow-[0_0_0_1px_rgba(15,30,44,0.06),0_14px_30px_-20px_rgba(15,30,44,0.4)]" : "hover:bg-white/60"
                  }`}
                >
                  <span className={`lp-display grid place-items-center w-9 h-9 rounded-full text-[0.9375rem] font-semibold shrink-0 ${on ? "bg-[color:var(--brand)] text-white" : "bg-white text-[color:var(--ink-2)] shadow-[0_0_0_1px_var(--line)]"}`}>{i + 1}</span>
                  <span className="min-w-0">
                    <span className="lp-display block text-[1.0625rem] lg:text-[1.1875rem] font-semibold tracking-[-0.02em] whitespace-nowrap">{p.key}</span>
                    <span className="hidden lg:block text-[0.875rem] text-[color:var(--muted)] truncate">{p.prompts[0]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div id="prep-panel" role="tabpanel" aria-labelledby={`prep-tab-${active}`} className="lp-card p-6 sm:p-8 lg:p-10 flex flex-col">
            <div key={step.key} className="lp-fade grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 flex-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--muted)]">Ask yourself</p>
                <ul className="mt-4 space-y-3">
                  {step.prompts.map((q) => (
                    <li key={q} className="text-[1.125rem] sm:text-[1.1875rem] leading-snug font-semibold text-[color:var(--ink)]">{q}</li>
                  ))}
                </ul>
              </div>
              <div className="self-start rounded-2xl bg-[color:var(--paper)] p-5 sm:p-6 shadow-[inset_0_0_0_1px_var(--line)]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">Jordan's prep · {step.key}</p>
                <p className="lp-serif mt-3 text-[1.25rem] leading-[1.45] text-[color:var(--ink)]">{step.note}</p>
              </div>
            </div>
            <div className="mt-8 flex items-center gap-2" aria-hidden="true">
              {PREP.map((p, i) => <span key={p.key} className={`h-1.5 rounded-full transition-all ${i <= active ? "bg-[color:var(--brand)] w-8" : "bg-[color:var(--line)] w-4"}`} />)}
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 grid lg:grid-cols-[auto_minmax(0,1fr)] gap-4 lg:gap-10 items-baseline">
          <span className="lp-display text-sm font-semibold uppercase tracking-[0.08em] text-[color:var(--brand)]">The goal</span>
          <p className="lp-display text-[1.75rem] sm:text-[2.25rem] lg:text-[2.625rem] leading-[1.15] font-semibold">
            <span className="text-[color:var(--muted)]">The goal isn't to tell your doctor what the diagnosis is.</span>{" "}
            The goal is to make sure your doctor has a better picture of you.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 7. AI positioning */
function AiSection() {
  return (
    <section aria-labelledby="ai-title" className="py-20 sm:py-28">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-center`}>
        <div className="max-w-[580px]">
          <Eyebrow>AI that helps you prepare — not replace your doctor</Eyebrow>
          <h2 id="ai-title" className={`${h2} mt-3`}>Think through your health before you're sitting on the exam table.</h2>
          <div className={`${body} mt-6 space-y-5`}>
            <p>Health questions rarely appear at the exact moment you're speaking with your doctor. They happen:</p>
            <Beats
              className="pl-4 border-l-2 border-[color:var(--line)] text-[color:var(--ink)]"
              lines={[
                "at home.",
                "at night.",
                "after a medication changes.",
                "after a new symptom appears.",
                "after a lab result arrives.",
                "after you suddenly remember something you wish you had mentioned.",
              ]}
            />
            <p>
              Health Me gives you a place to work through those concerns while they are fresh. Use AI-guided health
              conversations to help organize what you're experiencing, explore questions worth discussing, and connect
              your concerns with the health information you're already tracking.
            </p>
            <p>Then take that context into the conversation with your healthcare professional.</p>
          </div>
        </div>
        <div className="flex lg:justify-end"><NightChat /></div>
      </div>
      <div className={`${container} mt-16 sm:mt-24`}>
        <p className="lp-display max-w-[980px] text-[1.875rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.12] font-semibold">
          AI shouldn't replace the doctor-patient relationship.{" "}
          <span className="text-[color:var(--brand)]">It should help you make more of it.</span>
        </p>
      </div>
    </section>
  );
}

/* 8. Brand statement */
const STORY_WORDS = ["Symptoms.", "Medications.", "Questions.", "Records.", "Vitals.", "Labs.", "Changes you've noticed.", "Concerns you've been carrying around."];

function BrandStatement() {
  return (
    <section aria-labelledby="brand-title" className="lp-dark relative overflow-hidden bg-[color:var(--ink)] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ background: "radial-gradient(60% 80% at 85% 10%, rgba(14,165,233,0.22), transparent 60%)" }} />
      <div className={`${container} relative py-24 sm:py-32`}>
        <h2 id="brand-title" className="lp-display max-w-[1000px] font-semibold text-[2.5rem] leading-[1.04] sm:text-[3.5rem] lg:text-[4.5rem]">
          Don't replace your doctor. Bring them a better-prepared patient.
        </h2>
        <div className="mt-12 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-10 lg:gap-20">
          <p className="text-lg sm:text-[1.25rem] leading-relaxed text-white/75 max-w-[460px]">
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
        <p className="lp-serif italic mt-16 sm:mt-24 text-[3.25rem] sm:text-[5rem] lg:text-[6.5rem] leading-none tracking-[-0.02em] text-sky-300">
          Bring the whole story.
        </p>
      </div>
    </section>
  );
}

/* 9. Features, only once the story is established */
const FEATURES = [
  [MessageCircle, "AI-guided health conversations", "Capture concerns and think through questions while they're fresh."],
  [Activity, "Symptom & health tracking", "Record what happened instead of relying on memory weeks later."],
  [Pill, "Medication management", "Keep medications, dosages, schedules and recent changes organized."],
  [FolderOpen, "Medical records", "Keep important health information and documents easier to find."],
  [LineChart, "Labs & trends", "Follow supported lab information and measurements over time."],
  [HeartPulse, "Vitals", "Track supported measurements that may provide additional context."],
  [Users, "Family & caregiver profiles", "Keep health information organized for the people who depend on you."],
  [ClipboardList, "Visit preparation", "Bring symptoms, questions, history and tracked health information together before the appointment starts."],
];

function FeaturesSection() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 sm:py-28 bg-[color:var(--paper-2)]">
      <div className={container}>
        <Eyebrow>One place to build the story</Eyebrow>
        <h2 id="features-title" className={`${h2} mt-3 max-w-[760px]`}>Everything your next health conversation may depend on.</h2>
        <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-10 border-t border-[color:var(--ink)]/80">
          {FEATURES.map(([Icon, t, d]) => (
            <li key={t} className="flex lg:flex-col gap-4 lg:gap-3 py-5 sm:py-7 border-b border-[color:var(--line)]">
              <Icon className="w-5 h-5 mt-1 text-[color:var(--brand)] shrink-0" aria-hidden="true" />
              <div>
                <h3 className="lp-display text-[1.1875rem] font-semibold tracking-[-0.02em]">{t}</h3>
                <p className="mt-1.5 text-[1rem] leading-relaxed text-[color:var(--ink-2)]">{d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 10. Family and caregiving */
function FamilySection() {
  return (
    <section id="family" aria-labelledby="family-title" className="py-20 sm:py-28">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-center`}>
        <div className="max-w-[560px]">
          <Eyebrow>When you're speaking for someone else</Eyebrow>
          <h2 id="family-title" className={`${h2} mt-3`}>It's even harder when the patient isn't you.</h2>
          <Beats
            className="mt-6 lp-display text-[1.375rem] font-semibold text-[color:var(--ink)]"
            lines={["A child.", "An aging parent.", "A spouse.", "Someone you help care for."]}
          />
          <div className={`${body} mt-6 space-y-5`}>
            <p>
              Now you're trying to remember someone else's medications, symptoms, appointments, questions and history.
              Health Me helps families and caregivers keep that information organized separately for each person.
            </p>
            <p>
              So when a healthcare professional asks{" "}
              <span className="lp-serif italic text-[1.1875rem] text-[color:var(--ink)]">&ldquo;Has this happened before?&rdquo;</span>{" "}
              you don't have to rely entirely on memory.
            </p>
          </div>
        </div>
        <div className="flex lg:justify-end"><CaregiverMock /></div>
      </div>
    </section>
  );
}

/* 11. Doctor communication */
const ARRIVE_WITH = [
  "Current concerns", "Symptoms and changes", "Questions to ask", "Current medications", "Relevant records",
  "Supported lab information", "Vitals", "Health history", "What happened between visits",
];

function DoctorSection() {
  return (
    <section aria-labelledby="doctor-title" className="py-20 sm:py-28 bg-[color:var(--paper-2)]">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-center`}>
        <div className="flex lg:justify-start order-2 lg:order-1"><VisitSummaryDoc /></div>
        <div className="order-1 lg:order-2 max-w-[580px]">
          <Eyebrow>Better context. Better conversations.</Eyebrow>
          <h2 id="doctor-title" className={`${h2} mt-3`}>A better appointment starts before you walk into the office.</h2>
          <div className={`${body} mt-6 space-y-5`}>
            <p>
              Instead of trying to reconstruct weeks or months of health information from memory, Health Me helps you
              keep the important pieces organized before the appointment begins.
            </p>
            <p>
              Download a visit summary to bring with you, or share records through a link that expires on the date you
              choose.
            </p>
          </div>
          <ul className="mt-7 flex flex-wrap gap-2">
            {ARRIVE_WITH.map((t) => (
              <li key={t} className="rounded-full bg-white px-3.5 py-1.5 text-[0.9375rem] text-[color:var(--ink)] shadow-[0_0_0_1px_var(--line)]">{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`${container} mt-16 sm:mt-24`}>
        <div className="grid sm:grid-cols-2 rounded-[28px] overflow-hidden shadow-[0_0_0_1px_var(--line)]">
          <p className="bg-white p-7 sm:p-10 lp-display text-[1.5rem] sm:text-[2rem] leading-[1.2] font-semibold">
            Your doctor brings the medical expertise.
          </p>
          <p className="bg-[color:var(--brand)] text-white p-7 sm:p-10 lp-display text-[1.5rem] sm:text-[2rem] leading-[1.2] font-semibold">
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
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
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
        <p className="mt-8 flex gap-3 rounded-2xl bg-[color:var(--urgent-bg)] px-4 py-3.5 text-[1rem] text-[color:var(--ink)]">
          <Phone className="w-5 h-5 text-[color:var(--urgent)] shrink-0 mt-0.5" aria-hidden="true" />
          For life-threatening symptoms or emergencies, call 911 or your local emergency services.
        </p>
      </div>
    </section>
  );
}

/* 12. Final CTA */
function FinalCta({ ctaRef }) {
  return (
    <section aria-labelledby="final-title" className="lp-dark bg-[color:var(--brand)] text-white">
      <div className={`${container} py-20 sm:py-28 text-center`}>
        <Eyebrow dark className="!text-sky-200">The next appointment is too important to wing it.</Eyebrow>
        <h2 id="final-title" className="lp-display mt-4 mx-auto max-w-[860px] font-semibold text-[2.5rem] leading-[1.04] sm:text-[3.5rem] lg:text-[4rem]">
          Walk in knowing what you need to say.
        </h2>
        <div className="mt-6 mx-auto max-w-[620px] text-lg sm:text-[1.1875rem] leading-relaxed text-white/85 space-y-3">
          <p>Your healthcare professional can have a more informed conversation when they have better context.</p>
          <p>You can have a better conversation when you're not trying to remember everything on the spot.</p>
          <p className="text-white font-medium">Health Me helps you prepare.</p>
        </div>
        <div ref={ctaRef} className="mt-10 flex flex-col items-center gap-4">
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
        <BetweenSection />
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
