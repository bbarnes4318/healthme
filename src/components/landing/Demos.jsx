import React, { useEffect, useState } from "react";
import {
  Mic, ArrowUp, ArrowRight, Pill, Check, CalendarDays, Activity, Download, Link2, Moon, Stethoscope,
  TrendingDown, HeartPulse, CircleHelp, ShieldAlert, FlaskConical, MessageCircle, FolderOpen, LineChart, Users,
  ClipboardCheck,
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

const label = "text-[0.6875rem] font-semibold uppercase tracking-wider text-[color:var(--muted)]";
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

/* ---------------- Hero: scattered notes behind an organized visit prep ---------------- */

const SPARK = [128, 131, 129, 138, 141, 146, 139, 133];

function Spark() {
  const w = 120, h = 26, min = 124, max = 148;
  const pts = SPARK.map((v, i) => [(i * w) / (SPARK.length - 1), h - ((v - min) / (max - min)) * h]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`-3 -4 ${w + 6} ${h + 8}`} className="w-full h-7 mt-1" aria-hidden="true">
      <path d={d} fill="none" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {[3, 4, 5, 6].map((i) => <circle key={i} cx={pts[i][0]} cy={pts[i][1]} r="3" fill="#b42318" />)}
    </svg>
  );
}

function PrepBlock({ title, children, className = "" }) {
  return (
    <div className={`py-2.5 border-t border-[color:var(--line)] ${className}`}>
      <p className={label}>{title}</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

// The week, as six dots leading up to the visit.
const HERO_DAYS = [["M", "symptom"], ["T", "med"], ["T", "symptom"], ["S", "vital"], ["S", "better"], ["M", "question"]];

export function HeroPrep() {
  return (
    <div className="relative w-full max-w-[500px] mx-auto lg:mr-0 xl:pt-8">
      {/* Before: the note on your phone */}
      <div
        aria-hidden="true"
        className="lp-scrap hidden xl:block absolute -left-10 top-0 w-[200px] -rotate-[4deg] rounded-2xl px-4 pt-4 pb-6"
      >
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#8a7f6a]">Notes · tell dr</p>
        <ul className="lp-serif mt-2 space-y-1 text-[0.9375rem] leading-snug text-[#5b5344]">
          <li>headaches since…?</li>
          <li>before or after new dose??</li>
          <li>dizzy thurs</li>
          <li className="line-through decoration-[#b9ad95]">10mg or 20?</li>
          <li>BP high one day</li>
        </ul>
      </div>

      {/* After: the organized visit prep */}
      <figure className="lp-card lp-rise relative w-full max-w-[390px] ml-auto overflow-hidden" aria-label="Example Health Me visit preparation for an upcoming appointment">
        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 pt-4 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-[color:var(--sky-wash)] text-[color:var(--brand)] shrink-0">
              <CalendarDays className="w-4 h-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-[0.9375rem] leading-tight truncate">Visit prep · Dr. Patel</p>
              <p className="text-xs text-[color:var(--muted)]">Tue, Oct 13 · 10:30 AM</p>
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[color:var(--ok-bg)] text-[color:var(--ok)] text-xs font-semibold px-2.5 py-1">
            <Check className="w-3.5 h-3.5" aria-hidden="true" /> Ready
          </span>
        </div>

        <div className="px-4 sm:px-5 pb-4">
          <PrepBlock title="Main concern">
            <p className="text-[0.9375rem] font-medium leading-snug">Headaches, and now dizziness when standing</p>
            <p className="text-[0.8125rem] text-[color:var(--muted)] mt-0.5">Since Mon, Oct 5 · usually worse in the evening</p>
          </PrepBlock>
          <PrepBlock title="Timeline · last 8 days">
            <div className="relative flex items-start gap-1.5 mt-1.5" aria-label="Headache, dose change, dizziness, high reading, improving, questions ready, then the visit">
              <span aria-hidden="true" className="absolute left-3 right-3 top-[6px] h-px bg-[#d5d0c6]" />
              {HERO_DAYS.map(([d, k], i) => (
                <span key={i} className="relative flex flex-col items-center gap-1 flex-1">
                  <span className={`w-3 h-3 rounded-full ring-[3px] ring-white ${KINDS[k].dot}`} />
                  <span className="text-[0.625rem] font-semibold text-[color:var(--muted)]">{d}</span>
                </span>
              ))}
              <span className="relative flex flex-col items-center gap-1 flex-1">
                <Stethoscope className="w-3.5 h-3.5 -mt-px bg-white text-[color:var(--ink)]" aria-hidden="true" />
                <span className="text-[0.625rem] font-semibold text-[color:var(--ink)]">Visit</span>
              </span>
            </div>
          </PrepBlock>
          <PrepBlock title="What changed?">
            <p className="text-[0.9375rem] leading-snug">Lisinopril increased from 10 mg to 20 mg on Oct 6</p>
          </PrepBlock>
          <div className="grid grid-cols-2 gap-4 border-t border-[color:var(--line)]">
            <div className="py-2.5">
              <p className={label}>Medications</p>
              <ul className="mt-1 text-[0.8125rem] leading-[1.45]">
                <li>Lisinopril 20 mg</li>
                <li>Atorvastatin 20 mg</li>
                <li className="text-[color:var(--muted)]">Ibuprofen, as needed</li>
              </ul>
            </div>
            <div className="py-2.5 min-w-0">
              <p className={label}>Recent vitals</p>
              <p className="mt-1 text-[0.8125rem]"><span className="font-semibold text-[color:var(--urgent)]">4 BP readings</span> <span className="text-[color:var(--muted)]">above usual</span></p>
              <Spark />
            </div>
          </div>
          <PrepBlock title="What do I want to ask?">
            <ul className="space-y-1.5 mt-1">
              {["Could the dose change be related to the dizziness?", "Should I check my blood pressure more often?"].map((q) => (
                <li key={q} className="flex gap-2 text-[0.875rem] leading-snug">
                  <span className="mt-[3px] w-3.5 h-3.5 rounded-[4px] border-[1.5px] border-[color:var(--brand)] shrink-0" aria-hidden="true" />
                  {q}
                </li>
              ))}
            </ul>
          </PrepBlock>
        </div>
      </figure>
    </div>
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
        <span className="text-[0.9375rem] leading-snug">Organized into one visit prep for <strong className="font-semibold">Tue, Oct 13</strong></span>
        <Check className="w-5 h-5 ml-auto text-emerald-300 shrink-0" aria-hidden="true" />
      </figcaption>
    </figure>
  );
}

/* ---------------- Monday through Monday: the health timeline ---------------- */

const DAYS = [
  { day: "Monday", date: "Oct 5", kind: "symptom", title: "Headache begins", meta: "6/10, behind the eyes" },
  { day: "Tuesday", date: "Oct 6", kind: "med", title: "Medication changes", meta: "Lisinopril 10 → 20 mg" },
  { day: "Thursday", date: "Oct 8", kind: "symptom", title: "Dizziness appears", meta: "When standing up" },
  { day: "Saturday", date: "Oct 10", kind: "vital", title: "Blood pressure up", meta: "146/94, higher than usual" },
  { day: "Sunday", date: "Oct 11", kind: "better", title: "Symptoms improve", meta: "Headache down to 2/10" },
  { day: "Monday", date: "Oct 12", kind: "question", title: "Questions ready", meta: "Two saved for Dr. Patel" },
];
const VISIT = { day: "Next Tuesday", date: "Oct 13", kind: "visit", title: "Doctor appointment", meta: "Dr. Patel · 10:30 AM" };

function TimelineNode({ e, visit = false }) {
  const k = KINDS[e.kind];
  return (
    <li className={`relative flex lg:flex-col items-start gap-4 lg:gap-0 py-3 lg:py-0 ${visit ? "lg:pl-6" : "lg:pr-3"}`}>
      <span className={`relative z-10 grid place-items-center w-12 h-12 lg:w-14 lg:h-14 rounded-2xl shrink-0 ring-[6px] ring-white ${k.tint}`}>
        <k.icon className="w-5 h-5 lg:w-6 lg:h-6" aria-hidden="true" />
      </span>
      <div className="lg:mt-5 min-w-0">
        <p className={`text-[0.75rem] font-bold uppercase tracking-[0.1em] ${visit ? "text-[color:var(--ink)]" : "text-[color:var(--brand)]"}`}>
          {e.day} <span className="font-medium normal-case tracking-normal text-[color:var(--muted)]">· {e.date}</span>
        </p>
        <p className="lp-display mt-1 text-[1.125rem] lg:text-[1.1875rem] leading-snug font-semibold tracking-[-0.02em]">{e.title}</p>
        <p className="mt-0.5 text-[0.9375rem] leading-snug text-[color:var(--ink-2)]">{e.meta}</p>
      </div>
    </li>
  );
}

export function WholeWeek() {
  return (
    <figure className="lp-card overflow-hidden" aria-label="Jordan's health timeline: eight days of events before a Tuesday appointment">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[color:var(--line)]">
        <p className="flex items-center gap-2.5 font-semibold">
          <Mark className="w-7 h-7" /> Jordan's health timeline
          <span className="hidden sm:inline font-normal text-[color:var(--muted)]">· Oct 5 – Oct 13</span>
        </p>
        <div className="hidden sm:flex gap-1.5" aria-hidden="true">
          {[["symptom", "Symptoms"], ["med", "Medications"], ["vital", "Vitals"], ["question", "Questions"]].map(([k, t]) => (
            <span key={k} className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--line)] px-3 py-1 text-[0.8125rem] text-[color:var(--ink-2)]">
              <span className={`w-2 h-2 rounded-full ${KINDS[k].dot}`} />{t}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-7 pt-5 lg:pt-6 pb-6 lg:pb-8">
        {/* Who sees what */}
        <div className="hidden lg:grid grid-cols-[6fr_1.25fr] gap-0 mb-6 text-[0.875rem] font-semibold">
          <p className="flex items-center gap-2 rounded-l-full bg-[color:var(--sky-wash)] text-[color:var(--brand)] px-4 py-2">
            <Mark className="w-4 h-4" /> Health Me helps you bring Monday through Monday
          </p>
          <p className="rounded-r-full bg-[color:var(--ink)] text-white px-3 py-2 text-center whitespace-nowrap">Doctor sees Tuesday</p>
        </div>
        <p className="lg:hidden mb-2 flex items-center gap-2 text-[0.875rem] font-semibold text-[color:var(--brand)]">
          <Mark className="w-4 h-4" /> What you bring: Monday through Monday
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-[6fr_1.25fr]">
          <ol className="relative grid grid-cols-1 lg:grid-cols-6">
            <span aria-hidden="true" className="hidden lg:block absolute left-7 right-0 top-7 h-[2px] bg-[color:var(--sky-wash)]" />
            <span aria-hidden="true" className="lg:hidden absolute left-6 top-6 bottom-6 w-[2px] bg-[color:var(--sky-wash)]" />
            {DAYS.map((e) => <TimelineNode key={e.date} e={e} />)}
          </ol>
          <div className="mt-4 lg:mt-0 rounded-2xl lg:rounded-none bg-[color:var(--paper-2)] lg:bg-transparent px-3 lg:px-0 lg:border-l-2 lg:border-dashed lg:border-[color:var(--line)]">
            <p className="lg:hidden pt-3 text-[0.875rem] font-semibold">What your doctor sees</p>
            <ol><TimelineNode e={VISIT} visit /></ol>
          </div>
        </div>
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
    <figure aria-label="Example Health Me visit summary">
      <dl className="border-t border-white/15">
        {SUMMARY.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[10rem_minmax(0,1fr)] gap-3 py-3 border-b border-white/15">
            <dt className="text-[0.75rem] font-semibold uppercase tracking-wider text-white/55 pt-0.5">{k}</dt>
            <dd className="text-[1rem] sm:text-[1.0625rem] leading-snug text-white">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 rounded-2xl bg-white p-4 sm:p-5">
        <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-[color:var(--brand)]">Question for the doctor</p>
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
          <p className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.07em] text-[color:var(--brand)]">
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

/* ---------------- Everything feeds one story ---------------- */

const SOURCES = [
  [MessageCircle, "AI-guided conversations", "Think questions through while they're fresh."],
  [Activity, "Symptom tracking", "Record it when it happens."],
  [Pill, "Medications", "Doses, schedules and recent changes."],
  [FolderOpen, "Medical records", "Documents and history, easier to find."],
  [LineChart, "Labs & trends", "Supported results over time."],
  [HeartPulse, "Vitals", "Readings that add context."],
  [Users, "Family profiles", "A separate story for each person."],
];

export function StoryHub() {
  return (
    <figure aria-label="Seven kinds of health information that come together in visit preparation">
      <ul className="relative grid grid-cols-2 lg:grid-cols-7 gap-2.5 lg:gap-3">
        {SOURCES.map(([Icon, t, d]) => (
          <li key={t} className="relative rounded-2xl bg-white p-4 shadow-[0_0_0_1px_var(--line)] lg:after:absolute lg:after:left-1/2 lg:after:top-full lg:after:h-6 lg:after:w-[2px] lg:after:bg-[#c8dceb]">
            <span className="grid place-items-center w-10 h-10 rounded-xl bg-[color:var(--sky-wash)] text-[color:var(--brand)]">
              <Icon className="w-5 h-5" aria-hidden="true" />
            </span>
            <p className="lp-display mt-3 text-[1rem] font-semibold leading-tight tracking-[-0.02em]">{t}</p>
            <p className="mt-1 text-[0.875rem] leading-snug text-[color:var(--ink-2)]">{d}</p>
          </li>
        ))}
      </ul>
      {/* Rail joining every source into the one output */}
      <div aria-hidden="true" className="hidden lg:block relative h-12">
        <span className="absolute left-[7.14%] right-[7.14%] top-6 h-[2px] bg-[#c8dceb]" />
        <span className="absolute left-1/2 top-6 h-6 w-[2px] bg-[#c8dceb]" />
      </div>
      <div aria-hidden="true" className="lg:hidden flex justify-center py-3"><ArrowRight className="w-5 h-5 rotate-90 text-[color:var(--brand)]" /></div>
      <div className="mx-auto max-w-[760px] flex flex-col sm:flex-row sm:items-center gap-4 rounded-[24px] bg-[color:var(--ink)] text-white p-5 sm:p-6">
        <span className="grid place-items-center w-12 h-12 rounded-2xl bg-[color:var(--brand)] shrink-0">
          <ClipboardCheck className="w-6 h-6" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="lp-display text-[1.25rem] sm:text-[1.375rem] font-semibold tracking-[-0.02em]">Visit preparation</p>
          <p className="mt-0.5 text-white/75 leading-snug">Symptoms, questions, history and tracked health information, together before the appointment starts.</p>
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
  ["LR", "Mom", "71", "bg-[#efeafd] text-[#5b3fb0]", true],
];

const MOM_MEDS = [["Metoprolol", "25 mg · morning"], ["Amlodipine", "5 mg · evening"], ["Atorvastatin", "10 mg · night"], ["Vitamin D", "1,000 IU · daily"]];
const MOM_DIZZY = [["Oct 2", "After standing up quickly", "4/10"], ["Aug 19", "Morning, before breakfast", "3/10"], ["Jun 3", "Week after a new prescription", "5/10"]];

export function CaregiverMock() {
  return (
    <div className="lp-card w-full max-w-[540px] overflow-hidden grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)]" aria-hidden="true">
      <ul className="flex sm:flex-col gap-1 p-2.5 bg-[color:var(--paper-2)] overflow-x-auto lp-noscrollbar">
        {PEOPLE.map(([i, n, role, tone, active]) => (
          <li key={n} className={`flex items-center gap-2.5 rounded-xl px-2.5 py-2 shrink-0 ${active ? "bg-white shadow-[0_0_0_1px_var(--line)]" : ""}`}>
            <span className={`grid place-items-center w-9 h-9 rounded-full text-[0.8125rem] font-semibold shrink-0 ${tone}`}>{i}</span>
            <span className="min-w-0">
              <span className={`block text-[0.875rem] leading-tight ${active ? "font-semibold" : "text-[color:var(--ink-2)]"}`}>{n}</span>
              {role && <span className="block text-[0.75rem] text-[color:var(--muted)] whitespace-nowrap">{role}</span>}
            </span>
          </li>
        ))}
      </ul>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold leading-tight">Linda Rivera</p>
            <p className="text-[0.8125rem] text-[color:var(--muted)]">Next visit · Dr. Lee, Oct 20</p>
          </div>
          <span className="rounded-full bg-[color:var(--sky-wash)] text-[color:var(--brand)] text-xs font-semibold px-2.5 py-1">You manage</span>
        </div>

        <p className={`${label} mt-4`}>Medications (4)</p>
        <ul className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-[0.8125rem]">
          {MOM_MEDS.map(([n, d]) => (
            <li key={n} className="min-w-0"><span className="font-medium">{n}</span> <span className="block text-[color:var(--muted)] truncate">{d}</span></li>
          ))}
        </ul>

        <div className="mt-4 rounded-2xl bg-[color:var(--paper)] p-3.5 shadow-[inset_0_0_0_1px_var(--line)]">
          <p className="lp-serif italic text-[1.1875rem] leading-tight">&ldquo;Has this happened before?&rdquo;</p>
          <p className="mt-1.5 text-[0.8125rem] font-semibold text-[color:var(--warn)]">Dizziness · 3 times since June</p>
          <ul className="mt-1.5">
            {MOM_DIZZY.map(([d, n, s]) => (
              <li key={d} className="flex items-center gap-3 py-1.5 border-t border-[color:var(--line)] first:border-0 text-[0.8125rem]">
                <span className="w-12 shrink-0 font-semibold text-[color:var(--muted)]">{d}</span>
                <span className="flex-1 min-w-0 truncate">{n}</span>
                <span className="font-semibold text-[color:var(--warn)]">{s}</span>
              </li>
            ))}
          </ul>
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
    <figure className="lp-card w-full max-w-[500px] overflow-hidden" aria-label="Example visit preparation, ready for the appointment">
      <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 bg-[color:var(--ink)] text-white">
        <div className="min-w-0">
          <p className="font-semibold leading-tight">Ready for Tuesday</p>
          <p className="text-[0.8125rem] text-white/70">Dr. Patel · Oct 13 · 10:30 AM</p>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 text-emerald-300 text-xs font-semibold px-2.5 py-1">
          <Check className="w-3.5 h-3.5" aria-hidden="true" /> 6 of 6
        </span>
      </div>
      <ul className="px-5 sm:px-6 py-2">
        {READY.map(([k, v]) => (
          <li key={k} className="flex items-start gap-3 py-2.5 border-b border-[color:var(--line)] last:border-0">
            <span className="grid place-items-center w-5 h-5 mt-0.5 rounded-full bg-[color:var(--ok-bg)] text-[color:var(--ok)] shrink-0">
              <Check className="w-3 h-3" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[0.8125rem] font-semibold">{k}</p>
              <p className="text-[0.9375rem] leading-snug text-[color:var(--ink-2)]">{v}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-2 px-5 sm:px-6 pb-5" aria-hidden="true">
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--brand)] text-white text-sm font-semibold h-11">
          <Download className="w-4 h-4" /> Visit summary PDF
        </span>
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--line)] text-sm font-semibold h-11">
          <Link2 className="w-4 h-4" /> Share link
        </span>
      </div>
    </figure>
  );
}
