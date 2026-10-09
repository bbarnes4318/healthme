import React, { useEffect, useState } from "react";
import {
  Mic, ArrowUp, ArrowRight, Pill, Check, CalendarDays, Activity, Download, Link2, Moon, Stethoscope,
  TrendingDown, HeartPulse, CircleHelp, ShieldAlert, FlaskConical, FolderOpen, LineChart,
} from "lucide-react";

// Product UI mockups for the public landing page. One illustrative patient (Jordan) runs through all of them
// so the page tells one story: headache Mon Oct 5, lisinopril 10 → 20 mg Tue Oct 6, dizziness Thu Oct 8,
// BP 146/94 Sat Oct 10, better Sun Oct 11, visit with Dr. Patel Tue Oct 13.

export function Mark({ className = "w-8 h-8" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#0369a1" />
      <path d="M13.2 8.5h5.6v4.7h4.7v5.6h-4.7v4.7h-5.6v-4.7H8.5v-5.6h4.7z" fill="#fff" />
      <circle cx="24.5" cy="7.5" r="3" fill="#34d399" />
    </svg>
  );
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

// Reveals steps 1..n once the element scrolls into view; everything is laid out up front so nothing shifts.
function useReveal(timeline, total) {
  const [el, setEl] = useState(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (!el) return;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setShown(total);
      return;
    }
    let ids = [];
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      ids = timeline.map(([t, s, ty]) => setTimeout(() => { setShown(s); setTyping(ty); }, t));
    }, { threshold: 0.35 });
    io.observe(el);
    return () => { io.disconnect(); ids.forEach(clearTimeout); };
  }, [el, timeline, total]);
  return { ref: setEl, on: (i) => String(shown >= i), typingAt: (i) => typing && shown === i - 1 };
}

const label = "text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]";
const userBubble = "bg-[color:var(--brand)] text-white rounded-[18px] rounded-br-md px-4 py-2.5 text-[0.9375rem] leading-snug max-w-[88%] ml-auto";
const aiBubble = "bg-[color:var(--paper-2)] text-[color:var(--ink)] rounded-[18px] rounded-bl-md px-4 py-2.5 text-[0.9375rem] leading-snug max-w-[94%]";

const KINDS = {
  symptom: { icon: Activity, dot: "bg-[color:var(--warn)]", tint: "bg-[color:var(--warn-bg)] text-[color:var(--warn)]" },
  med: { icon: Pill, dot: "bg-[color:var(--brand)]", tint: "bg-[color:var(--sky-wash)] text-[color:var(--brand)]" },
  vital: { icon: HeartPulse, dot: "bg-[color:var(--urgent)]", tint: "bg-[color:var(--urgent-bg)] text-[color:var(--urgent)]" },
  better: { icon: TrendingDown, dot: "bg-[color:var(--ok)]", tint: "bg-[color:var(--ok-bg)] text-[color:var(--ok)]" },
  question: { icon: CircleHelp, dot: "bg-[#7c5cd6]", tint: "bg-[#efeafd] text-[#5b3fb0]" },
  lab: { icon: FlaskConical, dot: "bg-[#0f766e]", tint: "bg-[#e3f4f1] text-[#0f766e]" },
  visit: { icon: Stethoscope, dot: "bg-[color:var(--ink)]", tint: "bg-[color:var(--ink)] text-white" },
};

function Typing() {
  return (
    <div className={`${aiBubble} absolute left-0 top-0 !p-0`} aria-hidden="true">
      <span className="lp-typing"><span /><span /><span /></span>
    </div>
  );
}

/* ---------------- The Health Me Appointment Brief: shared pieces ---------------- */

const SPARK = [128, 131, 129, 138, 141, 146, 139, 133];

function Spark({ className = "w-full h-8" }) {
  const w = 120, h = 26, min = 124, max = 148;
  const pts = SPARK.map((v, i) => [(i * w) / (SPARK.length - 1), h - ((v - min) / (max - min)) * h]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`-3 -4 ${w + 6} ${h + 8}`} className={className} aria-hidden="true">
      <path d={d} fill="none" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {[3, 4, 5, 6].map((i) => <circle key={i} cx={pts[i][0]} cy={pts[i][1]} r="3" fill="#b42318" />)}
    </svg>
  );
}

// The eight days before the visit: headache, dose change, dizziness, high reading, better, questions.
const HERO_DAYS = [["M", "symptom"], ["T", "med"], ["T", "symptom"], ["S", "vital"], ["S", "better"], ["M", "question"]];

function MiniTimeline() {
  return (
    <div className="relative flex items-start gap-1.5 mt-1.5" aria-label="Headache, dose change, dizziness, high reading, improving, questions ready, then the visit">
      <span aria-hidden="true" className="absolute left-3 right-3 top-[7px] h-[2px] bg-[#d5d0c6]" />
      {HERO_DAYS.map(([d, k], i) => (
        <span key={i} className="relative flex flex-col items-center gap-1 flex-1">
          <span className={`w-3.5 h-3.5 rounded-full ring-[3px] ring-white ${KINDS[k].dot}`} />
          <span className="text-[0.75rem] font-semibold text-[color:var(--muted)]">{d}</span>
        </span>
      ))}
      <span className="relative flex flex-col items-center gap-1 flex-1">
        <Stethoscope className="w-4 h-4 bg-white text-[color:var(--ink)]" aria-hidden="true" />
        <span className="text-[0.75rem] font-bold text-[color:var(--ink)]">Visit</span>
      </span>
    </div>
  );
}

function Ready({ children = "Ready" }) {
  return (
    <span className="shrink-0 hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 text-emerald-300 text-[0.8125rem] font-semibold px-3 py-1">
      <Check className="w-3.5 h-3.5" aria-hidden="true" /> {children}
    </span>
  );
}

// One header for every Appointment Brief on the page, so it reads as one named feature.
function BriefHeader({ meta, big = false, status }) {
  return (
    <div className={`flex items-center justify-between gap-3 px-5 sm:px-7 ${big ? "py-5" : "py-4"} bg-[color:var(--ink)] text-white`}>
      <div className="flex items-center gap-3 min-w-0">
        <Mark className={`${big ? "w-10 h-10" : "w-9 h-9"} shrink-0`} />
        <div className="min-w-0">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.12em] text-sky-300 leading-none">Health Me</p>
          <p className={`lp-display mt-1 font-extrabold leading-none tracking-[-0.025em] ${big ? "text-[1.375rem] sm:text-[1.75rem]" : "text-[1.3125rem]"}`}>Appointment Brief</p>
          {meta && <p className="mt-1.5 text-[0.875rem] text-white/70 truncate">{meta}</p>}
        </div>
      </div>
      {status !== null && <Ready>{status}</Ready>}
    </div>
  );
}

function Field({ title, children, className = "" }) {
  return (
    <div className={`py-3.5 border-t border-[color:var(--line)] ${className}`}>
      <p className={label}>{title}</p>
      <div className="mt-1.5 text-[1rem] leading-snug text-[color:var(--ink)]">{children}</div>
    </div>
  );
}

function Questions({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((q) => (
        <li key={q} className="flex gap-2.5">
          <span className="mt-[3px] w-4 h-4 rounded-[5px] border-2 border-[color:var(--brand)] shrink-0" aria-hidden="true" />
          {q}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Hero: the Appointment Brief, at a glance ---------------- */

export function HeroPrep() {
  return (
    <figure className="lp-card lp-rise w-full max-w-[440px] mx-auto lg:mr-0 overflow-hidden" aria-label="Example Health Me Appointment Brief for an upcoming visit">
      <BriefHeader meta="Dr. Patel · Tue, Oct 13 · 10:30 AM" status={null} />
      <div className="px-5 sm:px-7 pb-4">
        <Field title="Main concern" className="!border-0 !pt-4">
          <p className="lp-display text-[1.25rem] font-bold leading-tight tracking-[-0.02em]">Recurring headaches and dizziness</p>
        </Field>
        <Field title="Symptoms">Headache up to 6/10 · dizzy when standing</Field>
        <Field title="Timeline · last 8 days"><MiniTimeline /></Field>
        <Field title="Medication change"><span className="font-semibold">Lisinopril 10 → 20 mg</span> on Oct 6</Field>
        <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3 items-center py-3.5 border-t border-[color:var(--line)]">
          <div>
            <p className={label}>Recent vitals</p>
            <p className="mt-1.5 text-[1rem] leading-snug"><span className="font-semibold text-[color:var(--urgent)]">4 readings</span> above usual</p>
          </div>
          <Spark />
        </div>
        <Field title="Questions for Dr. Patel"><Questions items={["Could the dose change be related?", "Should I check my blood pressure more often?"]} /></Field>
      </div>
    </figure>
  );
}

/* ---------------- Scattered thoughts, captured ---------------- */

const SORTED = [
  ["Started last week?", "symptom", "Headache began", "Mon, Oct 5 · 6/10"],
  ["Was it before my medication changed?", "med", "Lisinopril 10 → 20 mg", "Tue, Oct 6 · the day after"],
  ["I forgot the dizziness.", "symptom", "Dizziness when standing", "Logged Thu, Oct 8"],
  ["What was that lab result?", "lab", "Cholesterol panel", "Mar 2 · in your records"],
  ["I meant to ask about this.", "question", "Saved for Dr. Patel", "Could the new dose be related?"],
];

export function ScatteredToCaptured() {
  return (
    <figure className="w-full max-w-[560px]" aria-label="Scattered thoughts before an appointment, each captured as a dated entry in Health Me">
      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1.1fr)] items-center gap-x-2 sm:gap-x-4 gap-y-3">
        <p className={label}>Scattered thoughts</p>
        <span />
        <p className={`${label} !text-[color:var(--brand)]`}>Captured in Health Me</p>
        {SORTED.map(([thought, kind, title, meta], i) => {
          const k = KINDS[kind];
          return (
            <React.Fragment key={thought}>
              <p
                className="lp-scrap lp-serif italic rounded-xl px-3 py-2 text-[0.9375rem] sm:text-[1.0625rem] leading-snug text-[#5b5344]"
                style={{ transform: `rotate(${i % 2 ? 1 : -1.25}deg)` }}
              >
                &ldquo;{thought}&rdquo;
              </p>
              <ArrowRight className="w-4 h-4 text-[color:var(--muted)]" aria-hidden="true" />
              <div className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 sm:px-3 py-2 shadow-[0_0_0_1px_var(--line)]">
                <span className={`hidden sm:grid place-items-center w-8 h-8 rounded-lg shrink-0 ${k.tint}`}>
                  <k.icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-[0.875rem] sm:text-[0.9375rem] leading-tight">{title}</p>
                  <p className="text-[0.75rem] sm:text-[0.8125rem] text-[color:var(--muted)] leading-snug mt-0.5">{meta}</p>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <figcaption className="mt-5 flex items-center gap-3 rounded-2xl bg-[color:var(--ink)] text-white px-4 py-3.5">
        <Mark className="w-7 h-7 shrink-0" />
        <span className="text-[0.9375rem] leading-snug">Organized into your Appointment Brief for <strong className="font-semibold">Tue, Oct 13</strong></span>
        <Check className="w-5 h-5 ml-auto text-emerald-300 shrink-0" aria-hidden="true" />
      </figcaption>
    </figure>
  );
}

/* ---------------- Monday through Monday: the health timeline ---------------- */

const DAYS = [
  { day: "Monday", date: "Oct 5", kind: "symptom", title: "Headache begins", meta: "6/10, behind the eyes" },
  { day: "Tuesday", date: "Oct 6", kind: "med", title: "Medication changed", meta: "Lisinopril 10 → 20 mg" },
  { day: "Thursday", date: "Oct 8", kind: "symptom", title: "Dizziness appears", meta: "When standing up" },
  { day: "Saturday", date: "Oct 10", kind: "vital", title: "Blood pressure elevated", meta: "146/94 at 8:30 PM" },
  { day: "Sunday", date: "Oct 11", kind: "better", title: "Symptoms improve", meta: "Headache down to 2/10" },
  { day: "Monday", date: "Oct 12", kind: "question", title: "Questions ready", meta: "Two saved for Dr. Patel" },
];

export function WholeWeek() {
  return (
    <figure className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_256px] gap-8 xl:gap-6" aria-label="Eight days of health events, then one Tuesday appointment">
      <div className="lp-card overflow-hidden flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[color:var(--line)]">
          <p className="flex items-center gap-2.5 font-semibold">
            <Mark className="w-7 h-7" /> Jordan's health timeline
          </p>
          <p className="text-[0.9375rem] font-semibold text-[color:var(--brand)]">What you lived · Monday through Monday</p>
        </div>
        <ol className="relative flex-1 content-center grid grid-cols-1 xl:grid-cols-6 px-5 sm:px-7 pt-5 xl:pt-8 pb-6 xl:pb-9">
          <span aria-hidden="true" className="xl:hidden absolute left-[45px] top-8 bottom-8 w-[3px] rounded-full bg-[color:var(--sky-wash)]" />
          {DAYS.map((e, i) => {
            const k = KINDS[e.kind];
            const last = i === DAYS.length - 1;
            return (
              <li key={e.date} className="relative flex xl:flex-col items-start gap-4 xl:gap-0 py-2.5 xl:py-0 xl:pr-3">
                {/* Connector to the next event; darkens toward the appointment */}
                <span
                  aria-hidden="true"
                  className={`hidden xl:block absolute left-16 top-[31px] h-[3px] bg-[color:var(--brand)] ${last ? "-right-7" : "right-0"}`}
                  style={{ opacity: 0.2 + i * 0.16 }}
                />
                <span className={`relative z-10 grid place-items-center w-12 h-12 xl:w-16 xl:h-16 rounded-2xl shrink-0 ring-[6px] ring-white ${k.tint}`}>
                  <k.icon className="w-5 h-5 xl:w-7 xl:h-7" aria-hidden="true" />
                </span>
                <div className="xl:mt-5 min-w-0">
                  <p className="text-[0.75rem] xl:text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-[color:var(--brand)]">
                    {e.day} <span className="xl:block font-medium normal-case tracking-normal text-[color:var(--muted)]"><span className="xl:hidden">· </span>{e.date}</span>
                  </p>
                  <p className="lp-display mt-1 text-[1.1875rem] xl:text-[1.375rem] leading-[1.15] font-bold tracking-[-0.025em]">{e.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-snug text-[color:var(--ink-2)]">{e.meta}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="relative rounded-[28px] bg-[color:var(--ink)] text-white p-6 xl:p-7 flex flex-col ring-4 ring-[color:var(--brand)] shadow-[0_30px_60px_-20px_rgba(3,105,161,0.55)]">
        <span aria-hidden="true" className="absolute z-10 left-1/2 -top-5 -translate-x-1/2 xl:left-0 xl:top-[143px] grid place-items-center w-10 h-10 rounded-full bg-[color:var(--brand)] text-white ring-4 ring-[color:var(--sky-band)]">
          <ArrowRight className="w-5 h-5 rotate-90 xl:rotate-0" />
        </span>
        <p className="inline-flex self-start items-center gap-1.5 rounded-full bg-sky-400/15 px-3 py-1 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-sky-300">The appointment</p>
        <p className="mt-3 text-[0.9375rem] font-semibold text-white/80">What the doctor sees</p>
        <div className="flex xl:flex-col items-start gap-4 xl:gap-0 mt-5 xl:mt-auto">
          <span className="grid place-items-center w-14 h-14 xl:w-20 xl:h-20 rounded-2xl bg-white text-[color:var(--ink)] shrink-0">
            <Stethoscope className="w-6 h-6 xl:w-9 xl:h-9" aria-hidden="true" />
          </span>
          <div className="xl:mt-5">
            <p className="text-[0.75rem] xl:text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-white/70">Next Tuesday <span className="xl:block font-medium normal-case tracking-normal"><span className="xl:hidden">· </span>Oct 13</span></p>
            <p className="lp-display mt-1 text-[1.5rem] xl:text-[1.875rem] leading-[1.05] font-extrabold tracking-[-0.03em]">Doctor appointment</p>
            <p className="mt-1 text-[0.9375rem] text-white/70">Dr. Patel · 10:30 AM</p>
          </div>
        </div>
        <p className="mt-5 pt-4 border-t border-white/15 flex items-center gap-2 text-[0.9375rem] font-semibold leading-snug text-white">
          <Mark className="w-5 h-5 shrink-0" /> Arrives with an Appointment Brief
        </p>
      </div>
    </figure>
  );
}

/* ---------------- Same patient, better context ---------------- */

const SUMMARY = [
  ["Main concern", "Recurring dizziness and headaches"],
  ["Started", "Monday, October 5"],
  ["Pattern", "Mostly worse in the evening"],
  ["Medication change", "Lisinopril raised from 10 to 20 mg on October 6"],
  ["Vitals", "Four elevated blood pressure readings"],
];

export function BetterContext() {
  return (
    <figure className="lp-card overflow-hidden h-full flex flex-col" aria-label="Example Health Me Appointment Brief">
      <BriefHeader big meta="Jordan Rivera · Dr. Patel · Tue, Oct 13" />
      <dl className="px-5 sm:px-7 pt-1 flex-1">
        {SUMMARY.map(([k, v], i) => (
          <div key={k} className={`grid grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[10rem_minmax(0,1fr)] gap-3 py-3.5 ${i ? "border-t border-[color:var(--line)]" : ""}`}>
            <dt className={`${label} pt-1`}>{k}</dt>
            <dd className="text-[1.0625rem] sm:text-[1.125rem] leading-snug font-medium text-[color:var(--ink)]">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mx-5 sm:mx-7 mb-6 mt-2 rounded-2xl bg-[color:var(--sky-wash)] p-4 sm:p-5">
        <p className={`${label} !text-[color:var(--brand)]`}>Question</p>
        <p className="lp-serif mt-1 text-[1.25rem] sm:text-[1.375rem] leading-snug text-[color:var(--ink)]">Could this relate to the medication change?</p>
      </div>
    </figure>
  );
}

/* ---------------- Thinking it through at night ---------------- */

const CHAT_TIMELINE = [[300, 1, false], [900, 1, true], [2400, 2, false], [3300, 3, false]];

export function NightChat() {
  const { ref, on, typingAt } = useReveal(CHAT_TIMELINE, 3);
  return (
    <figure ref={ref} className="lp-card w-full max-w-[480px] overflow-hidden" aria-label="Example AI-guided health conversation the night before an appointment">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[color:var(--line)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <Mark className="w-7 h-7" />
          <div className="min-w-0">
            <p className="font-semibold text-[0.9375rem] leading-tight">Health conversation</p>
            <p className="text-xs text-[color:var(--muted)] truncate">Using Jordan's medications and vitals</p>
          </div>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--ink)] text-white text-xs font-medium px-2.5 py-1">
          <Moon className="w-3 h-3" aria-hidden="true" /> 11:42 PM
        </span>
      </div>
      <div className="px-4 sm:px-5 pt-4 pb-3 space-y-2.5">
        <p className={`lp-msg ${userBubble}`} data-on={on(1)}>
          I've been dizzy when I stand up since my blood pressure medication went up. Is that worth bringing up on Tuesday?
        </p>
        <div className="relative">
          {typingAt(2) && <Typing />}
          <p className={`lp-msg ${aiBubble}`} data-on={on(2)}>
            Yes, it's worth mentioning. Your profile shows your lisinopril went from 10 to 20 mg on Oct 6, and a reading of
            146/94 on Oct 10. Your doctor is the right person to sort out whether these are connected.
          </p>
        </div>
        <div className={`lp-msg rounded-2xl border border-[color:var(--line)] p-3.5`} data-on={on(3)}>
          <p className="flex items-center gap-1.5 text-[0.75rem] font-bold uppercase tracking-[0.07em] text-[color:var(--brand)]">
            <CircleHelp className="w-3.5 h-3.5" aria-hidden="true" /> Questions you may want to ask
          </p>
          <ul className="mt-1.5 space-y-1 text-[0.875rem] leading-snug">
            <li>Could the higher dose be related to the dizziness?</li>
            <li>Is 146/94 something to watch more closely at home?</li>
          </ul>
          <p className="mt-3 flex gap-2 rounded-xl bg-[color:var(--urgent-bg)] px-3 py-2 text-[0.8125rem] leading-snug text-[color:var(--ink)]">
            <ShieldAlert className="w-4 h-4 text-[color:var(--urgent)] shrink-0 mt-px" aria-hidden="true" />
            Fainting, chest pain, or a sudden severe headache needs emergency care. Call 911.
          </p>
        </div>
      </div>
      <div className="px-4 sm:px-5 pb-4" aria-hidden="true">
        <div className="flex items-center gap-2 rounded-full border border-[color:var(--line)] pl-4 pr-1.5 py-1.5 text-sm text-[color:var(--muted)]">
          <span className="flex-1 min-w-0 truncate">Describe a symptom or ask a question…</span>
          <Mic className="w-4 h-4" />
          <span className="grid place-items-center w-8 h-8 rounded-full bg-[color:var(--ink)] text-white"><ArrowUp className="w-4 h-4" /></span>
        </div>
      </div>
    </figure>
  );
}

/* ---------------- Guided intake: one concern, five stages, one brief ---------------- */

const INTAKE = [
  ["Symptoms", "symptom", ["What are you feeling?", "When did it start?", "Has it changed?"], "Headaches since Mon, Oct 5, up to 6/10. Dizzy when standing since Thu, Oct 8."],
  ["Concerns", "question", ["What are you worried about?", "What don't you want to forget?"], "Is the higher dose agreeing with me? Mention the ibuprofen."],
  ["Medications", "med", ["What are you taking?", "Did anything recently change?"], "Lisinopril 20 mg, raised from 10 mg on Oct 6. Atorvastatin. Ibuprofen as needed."],
  ["History", "lab", ["Relevant conditions, labs, records, vitals"], "High blood pressure since 2021. Cholesterol panel from March. 24 home readings."],
  ["Patterns", "vital", ["What keeps happening?", "What changed over time?"], "Worse in the evenings. Four readings above usual since the dose change."],
];

export function IntakeFlow() {
  return (
    <figure aria-label="A vague concern answered in five stages, each filling the same visit brief">
      <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_56px_minmax(0,1.1fr)]">
        <div className="mb-6 lg:mb-0 lg:pb-6 flex items-end">
          <p className="lp-scrap lp-serif italic rounded-2xl rounded-bl-md px-5 py-3.5 text-[1.25rem] sm:text-[1.375rem] leading-snug text-[#5b5344] max-w-[420px]">
            &ldquo;Something feels wrong, but I don't know how to explain it.&rdquo;
          </p>
        </div>
        <span className="hidden lg:block" />
        <div className="hidden lg:flex items-center justify-between gap-3 self-end rounded-t-[28px] bg-[color:var(--ink)] text-white px-6 py-4">
          <p className="flex items-center gap-2.5 font-semibold"><Mark className="w-6 h-6" /> Health Me Appointment Brief</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-semibold px-2.5 py-1">
            <Check className="w-3.5 h-3.5" aria-hidden="true" /> 5 of 5 complete
          </span>
        </div>

        {INTAKE.map(([title, kind, prompts, note], i) => {
          const k = KINDS[kind];
          const last = i === INTAKE.length - 1;
          return (
            <React.Fragment key={title}>
              <div className="relative flex gap-4 lg:py-5">
                {!last && <span aria-hidden="true" className="hidden lg:block absolute left-[21px] top-[72px] -bottom-5 w-[2px] bg-[#cfc8bb]" />}
                <span className={`lp-display grid place-items-center w-11 h-11 rounded-full text-[1.0625rem] font-extrabold shrink-0 ${k.tint}`}>{i + 1}</span>
                <div className="min-w-0 pt-1">
                  <h3 className="lp-display text-[1.5rem] sm:text-[1.625rem] font-extrabold leading-tight tracking-[-0.03em]">{title}</h3>
                  <ul className="mt-2 text-[1.0625rem] leading-snug font-medium text-[color:var(--ink-2)] space-y-1">
                    {prompts.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              </div>
              <div className="hidden lg:flex items-center justify-center text-[color:var(--muted)]">
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </div>
              <div
                className={`mt-3 mb-7 lg:m-0 bg-white px-5 lg:px-6 py-4 lg:py-5 rounded-2xl lg:rounded-none shadow-[0_0_0_1px_var(--line)] lg:shadow-none lg:border-x lg:border-b lg:border-[color:var(--line)] ${
                  last ? "lg:rounded-b-[28px] lg:shadow-[0_24px_48px_-24px_rgba(15,30,44,0.3)]" : ""
                }`}
              >
                <p className={`flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.08em] ${k.tint.split(" ").find((c) => c.startsWith("text-"))}`}>
                  <k.icon className="w-4 h-4" aria-hidden="true" /> {title}
                </p>
                <p className="lp-serif mt-1.5 text-[1.1875rem] sm:text-[1.3125rem] leading-snug text-[color:var(--ink)]">{note}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </figure>
  );
}

/* ---------------- Many signals → one Appointment Brief ---------------- */

const SIGNALS = [
  [Activity, "Symptoms", "symptom"],
  [Pill, "Medications", "med"],
  [CircleHelp, "Questions", "question"],
  [FolderOpen, "Records", "lab"],
  [FlaskConical, "Labs", "lab"],
  [HeartPulse, "Vitals", "vital"],
  [LineChart, "Health trends", "med"],
  [CalendarDays, "Recent changes", "better"],
];

export function SignalsToBrief() {
  return (
    <figure aria-label="Eight kinds of health information flowing into one Health Me Appointment Brief">
      <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3">
        {SIGNALS.map(([Icon, t, kind]) => (
          <li key={t} className="flex sm:flex-col items-center gap-3 sm:gap-2 rounded-2xl bg-white px-3 sm:px-1.5 py-2.5 sm:py-4 sm:text-center shadow-[0_0_0_1px_var(--line)]">
            <span className={`grid place-items-center w-11 h-11 rounded-xl ${KINDS[kind].tint}`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
            <span className="text-[1rem] font-semibold leading-tight">{t}</span>
          </li>
        ))}
      </ul>
      {/* Every source flows into the brief */}
      <svg aria-hidden="true" viewBox="0 0 800 80" preserveAspectRatio="none" className="hidden lg:block w-full h-20">
        {SIGNALS.map((_, i) => {
          const x = 50 + i * 100;
          return <path key={i} d={`M${x} 0 C${x} 46 400 34 400 80`} fill="none" stroke="#9fc4dd" strokeWidth="2" vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
      <div aria-hidden="true" className="lg:hidden flex justify-center py-4"><ArrowRight className="w-6 h-6 rotate-90 text-[color:var(--brand)]" /></div>

      <div className="mx-auto max-w-[940px] lp-card overflow-hidden ring-1 ring-[color:var(--brand)]/15">
        <BriefHeader big meta="Jordan Rivera · Dr. Patel · Tue, Oct 13 · 10:30 AM" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 px-5 sm:px-8 pb-6">
          <Field title="Why I'm going" className="!border-0 !pt-5">Blood pressure follow-up, plus new dizziness</Field>
          <Field title="Main concern" className="sm:!border-0 sm:!pt-5">
            <span className="lp-display text-[1.25rem] font-bold leading-tight tracking-[-0.02em]">Recurring dizziness and headaches</span>
          </Field>
          <Field title="Symptoms">Headache up to 6/10 · dizzy when standing</Field>
          <Field title="When it started">Headache Mon, Oct 5 · dizziness Thu, Oct 8</Field>
          <Field title="Medication changes"><span className="font-semibold">Lisinopril 10 → 20 mg</span> on Oct 6</Field>
          <Field title="Recent changes">Symptoms easing since Sun, Oct 11</Field>
          <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3 items-center py-3.5 border-t border-[color:var(--line)]">
            <div>
              <p className={label}>Recent vitals</p>
              <p className="mt-1.5 text-[1rem] leading-snug"><span className="font-semibold text-[color:var(--urgent)]">4 readings</span> above usual, highest 146/94</p>
            </div>
            <Spark />
          </div>
          <Field title="Relevant labs">Cholesterol panel, March</Field>
          <Field title="Health timeline" className="sm:col-span-2"><MiniTimeline /></Field>
          <Field title="Questions I want to ask"><Questions items={["Could the symptoms be related to the medication change?", "Should I check my blood pressure more often?"]} /></Field>
          <Field title="Things I'm worried about">Whether the higher dose is agreeing with me</Field>
        </div>
      </div>
    </figure>
  );
}

/* ---------------- Caring for someone else ---------------- */

const PEOPLE = [
  ["JR", "You", "", "bg-[#e6f3fa] text-[#0369a1]"],
  ["SR", "Sam", "Spouse", "bg-[#e7f5ec] text-[#146c43]"],
  ["MR", "Maya", "Daughter, 7", "bg-[#fdecf3] text-[#a1345f]"],
  ["LR", "Mom", "Linda, 71", "bg-[#efeafd] text-[#5b3fb0]", true],
];

const MOM_MEDS = [["Metoprolol", "25 mg · morning"], ["Amlodipine", "5 mg · evening"], ["Atorvastatin", "10 mg · night"], ["Vitamin D", "1,000 IU · daily"]];
const MOM_DIZZY = [["Oct 2", "After standing up quickly", "4/10"], ["Aug 19", "Morning, before breakfast", "3/10"], ["Jun 3", "Week after a new prescription", "5/10"]];

export function CaregiverMock() {
  return (
    <div className="lp-card overflow-hidden grid grid-cols-1 lg:grid-cols-[210px_minmax(0,1fr)_minmax(0,1.15fr)]" aria-hidden="true">
      <ul className="flex lg:flex-col gap-1.5 p-3 bg-[color:var(--paper-2)] overflow-x-auto lp-noscrollbar">
        {PEOPLE.map(([i, n, role, tone, active]) => (
          <li key={n} className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 shrink-0 ${active ? "bg-white shadow-[0_0_0_1px_var(--line)]" : ""}`}>
            <span className={`grid place-items-center w-10 h-10 rounded-full text-[0.875rem] font-semibold shrink-0 ${tone}`}>{i}</span>
            <span className="min-w-0">
              <span className={`block text-[1rem] leading-tight ${active ? "font-semibold" : "text-[color:var(--ink-2)]"}`}>{n}</span>
              {role && <span className="block text-[0.875rem] text-[color:var(--muted)] whitespace-nowrap">{role}</span>}
            </span>
          </li>
        ))}
      </ul>

      <div className="p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-[color:var(--line)]">
        <p className="lp-display text-[1.375rem] font-bold leading-tight tracking-[-0.02em]">Mom's profile</p>
        <p className="mt-1 text-[0.9375rem] text-[color:var(--muted)]">You manage this profile · Next visit Dr. Lee, Oct 20</p>
        <p className={`${label} mt-5`}>Medications (4)</p>
        <ul className="mt-1.5">
          {MOM_MEDS.map(([n, d]) => (
            <li key={n} className="flex items-baseline justify-between gap-3 py-2.5 border-t border-[color:var(--line)] first:border-0">
              <span className="text-[1rem] font-semibold">{n}</span>
              <span className="text-[0.9375rem] text-[color:var(--ink-2)]">{d}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-5 sm:p-7">
        <p className="lp-serif italic text-[1.5rem] leading-tight">&ldquo;Has this happened before?&rdquo;</p>
        <p className="mt-2 text-[1rem] font-semibold text-[color:var(--warn)]">Dizziness · logged 3 times since June</p>
        <ul className="mt-2">
          {MOM_DIZZY.map(([d, n, s]) => (
            <li key={d} className="flex items-center gap-3 py-2.5 border-t border-[color:var(--line)] first:border-0 text-[0.9375rem]">
              <span className="w-14 shrink-0 font-semibold text-[color:var(--muted)]">{d}</span>
              <span className="flex-1 min-w-0">{n}</span>
              <span className="font-semibold text-[color:var(--warn)]">{s}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 rounded-2xl bg-[color:var(--sky-wash)] p-4">
          <p className={`${label} !text-[color:var(--brand)]`}>Caregiver note</p>
          <p className="mt-1 text-[1rem] leading-snug">Ask Dr. Lee whether the June prescription could be related.</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Ready for the appointment ---------------- */

const READY = [
  ["Concerns", "Dizziness and headaches since the dose change"],
  ["Questions", "2 saved for Dr. Patel"],
  ["Symptoms", "Headache since Oct 5 · dizziness since Oct 8"],
  ["Medications", "Lisinopril 20 mg, atorvastatin, ibuprofen"],
  ["Vitals", "4 blood pressure readings above usual"],
  ["Recent changes", "Lisinopril raised from 10 to 20 mg, Oct 6"],
];

export function ReadyForVisit() {
  return (
    <figure className="lp-card w-full max-w-[560px] overflow-hidden" aria-label="Example Health Me Appointment Brief, ready for the visit">
      <BriefHeader big meta="Dr. Patel · Tue, Oct 13 · 10:30 AM" status="6 of 6 ready" />
      <ul className="px-5 sm:px-7 py-2">
        {READY.map(([k, v]) => (
          <li key={k} className="flex items-start gap-3.5 py-3.5 border-b border-[color:var(--line)] last:border-0">
            <span className="grid place-items-center w-6 h-6 mt-0.5 rounded-full bg-[color:var(--ok-bg)] text-[color:var(--ok)] shrink-0">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className={label}>{k}</p>
              <p className="mt-0.5 text-[1.0625rem] leading-snug text-[color:var(--ink)]">{v}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-2.5 px-5 sm:px-7 pb-6" aria-hidden="true">
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] text-white text-[0.9375rem] font-semibold h-12">
          <Download className="w-4 h-4" /> Download PDF
        </span>
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--line)] text-[0.9375rem] font-semibold h-12">
          <Link2 className="w-4 h-4" /> Share link
        </span>
      </div>
    </figure>
  );
}
