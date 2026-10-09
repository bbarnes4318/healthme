import React, { useEffect, useState } from "react";
import {
  Mic, ArrowUp, ArrowRight, Pill, Check, CalendarDays, Activity, Download, Link2, Moon, Stethoscope,
  TrendingDown, HeartPulse, CircleHelp, ShieldAlert, FlaskConical,
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
    <div className="relative w-full max-w-[560px] mx-auto lg:mr-0 xl:pt-8">
      {/* Before: the note on your phone */}
      <div
        aria-hidden="true"
        className="lp-scrap hidden xl:block absolute -left-6 top-0 w-[230px] -rotate-[4deg] rounded-2xl px-4 pt-4 pb-6"
      >
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#8a7f6a]">Notes · tell dr</p>
        <ul className="lp-serif mt-2 space-y-1.5 text-[1rem] leading-snug text-[#5b5344]">
          <li>headaches since…?</li>
          <li>before or after new dose??</li>
          <li>dizzy thurs</li>
          <li className="line-through decoration-[#b9ad95]">10mg or 20?</li>
          <li>BP high one day</li>
          <li>ibuprofen??</li>
        </ul>
      </div>

      {/* After: the organized visit prep */}
      <figure className="lp-card lp-rise relative w-full max-w-[420px] ml-auto overflow-hidden" aria-label="Example Health Me visit preparation for an upcoming appointment">
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

/* ---------------- Monday through Monday ---------------- */

const DAYS = [
  { day: "Mon", date: "Oct 5", kind: "symptom", title: "Headache begins", meta: "6/10, behind the eyes" },
  { day: "Tue", date: "Oct 6", kind: "med", title: "Medication changed", meta: "Lisinopril 10 → 20 mg" },
  { day: "Thu", date: "Oct 8", kind: "symptom", title: "Dizziness appears", meta: "When standing up" },
  { day: "Sat", date: "Oct 10", kind: "vital", title: "Blood pressure higher than usual", meta: "146/94 at 8:30 PM" },
  { day: "Sun", date: "Oct 11", kind: "better", title: "Symptoms improve", meta: "Headache down to 2/10" },
  { day: "Mon", date: "Oct 12", kind: "question", title: "Questions ready", meta: "Two for Dr. Patel" },
];

function DayCell({ e, dark = false }) {
  const k = KINDS[e.kind];
  return (
    <li className={`flex lg:flex-col items-center lg:items-start gap-3 rounded-2xl p-3 lg:p-4 ${dark ? "bg-white/10" : "bg-white shadow-[0_0_0_1px_rgba(15,30,44,0.05)]"}`}>
      <p className={`w-14 lg:w-auto shrink-0 text-[0.75rem] font-semibold uppercase tracking-[0.08em] ${dark ? "text-white/70" : "text-[color:var(--muted)]"}`}>
        {e.day}<span className="block lg:inline font-medium normal-case tracking-normal lg:before:content-['_·_']">{e.date}</span>
      </p>
      <span className={`grid place-items-center w-10 h-10 rounded-xl shrink-0 ${dark ? "bg-white text-[color:var(--ink)]" : k.tint}`}>
        <k.icon className="w-[18px] h-[18px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-[1rem] leading-snug">{e.title}</p>
        <p className={`mt-0.5 text-[0.875rem] leading-snug ${dark ? "text-white/70" : "text-[color:var(--ink-2)]"}`}>{e.meta}</p>
      </div>
    </li>
  );
}

export function WholeWeek() {
  return (
    <figure className="w-full" aria-label="Eight days of health events before a Tuesday appointment">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="lg:flex-[6] min-w-0 rounded-[24px] bg-[color:var(--sky-wash)] p-3 sm:p-4">
          <p className="flex items-center gap-2 px-1 text-[0.9375rem] font-semibold text-[color:var(--brand)]">
            <Mark className="w-5 h-5" /> What you bring with Health Me · Monday through Monday
          </p>
          <ol className="mt-3 grid grid-cols-1 lg:grid-cols-6 gap-2">
            {DAYS.map((e) => <DayCell key={e.date} e={e} />)}
          </ol>
        </div>
        <div className="lg:flex-[1.15] min-w-0 rounded-[24px] bg-[color:var(--ink)] text-white p-3 sm:p-4 flex flex-col">
          <p className="px-1 text-[0.9375rem] font-semibold text-sky-300">What the doctor sees</p>
          <ol className="mt-3 flex-1 grid">
            <DayCell dark e={{ day: "Tue", date: "Oct 13", kind: "visit", title: "The appointment", meta: "Dr. Patel · 10:30 AM" }} />
          </ol>
        </div>
      </div>
    </figure>
  );
}

/* ---------------- Same patient, better context ---------------- */

const SUMMARY = [
  ["Main concern", "Recurring dizziness and headaches"],
  ["Started", "Monday, October 5"],
  ["Pattern", "Usually worse in the evening"],
  ["Recent change", "Lisinopril increased from 10 mg to 20 mg on October 6"],
  ["Vitals", "Four blood pressure readings above usual, highest 146/94"],
];

export function BetterContext() {
  return (
    <figure className="lp-card p-5 sm:p-7 w-full" aria-label="Example Health Me visit summary">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="lp-eyebrow">With Health Me</p>
        <p className="flex items-center gap-2 text-sm font-semibold"><Mark className="w-5 h-5" /> Jordan's visit summary</p>
      </div>
      <dl className="mt-4 border-t border-[color:var(--line)]">
        {SUMMARY.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)] gap-3 py-2.5 border-b border-[color:var(--line)]">
            <dt className={`${label} pt-0.5`}>{k}</dt>
            <dd className="text-[0.9375rem] sm:text-[1rem] leading-snug">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 rounded-2xl bg-[color:var(--sky-wash)] p-4">
        <p className={`${label} !text-[color:var(--brand)]`}>Question for the doctor</p>
        <p className="lp-serif mt-1 text-[1.25rem] leading-snug">Could the symptoms be related to the medication change?</p>
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
            146/94 on Oct 10. Your doctor is the right person to sort out whether these are connected. Noting when the
            dizziness happens can help.
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

/* ---------------- Visit summary (mirrors the real PDF sections) ---------------- */

export function VisitSummaryDoc() {
  const h = "text-[0.6875rem] font-bold uppercase tracking-[0.08em]";
  return (
    <div className="w-full max-w-[460px]" aria-hidden="true">
      <div className="lp-sheet rounded-[6px] bg-white px-6 sm:px-8 pt-7 pb-6">
        <div className="flex items-start justify-between gap-4 pb-4 border-b-2 border-[color:var(--ink)]">
          <div>
            <p className="font-bold text-[1.0625rem] leading-tight">Patient Visit Summary</p>
            <p className="text-xs text-[color:var(--muted)] mt-0.5">Prepared for primary care</p>
          </div>
          <p className="text-xs text-right text-[color:var(--muted)]">Jordan Rivera<br />Generated Oct 12</p>
        </div>
        <div className="space-y-3.5 pt-4 text-[0.875rem] leading-snug">
          <div>
            <p className={`${h} text-[color:var(--urgent)]`}>Allergies &amp; conditions</p>
            <p className="mt-1">Allergy: penicillin · High blood pressure</p>
          </div>
          <div>
            <p className={`${h} text-[color:var(--ok)]`}>Current medications (3)</p>
            <p className="mt-1">1. Lisinopril 20 mg, once daily (from 10 mg on Oct 6)</p>
            <p>2. Atorvastatin 20 mg, nightly</p>
            <p>3. Ibuprofen 200 mg, as needed</p>
          </div>
          <div>
            <p className={`${h} text-[color:var(--brand)]`}>Recent vital signs</p>
            <p className="mt-1">Blood pressure: 146/94 mmHg (Oct 10), 24 readings on file</p>
          </div>
          <div>
            <p className={`${h} text-[color:var(--ink-2)]`}>Recent health conversations</p>
            <p className="mt-1">Oct 11: headaches since Oct 5, dizziness since Oct 8, after a dose change</p>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[color:var(--line)] text-sm font-semibold h-11">
          <Download className="w-4 h-4" /> Download PDF
        </span>
        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-white border border-[color:var(--line)] text-sm font-semibold h-11">
          <Link2 className="w-4 h-4" /> Share link
        </span>
      </div>
    </div>
  );
}

/* ---------------- Caring for someone else ---------------- */

const PEOPLE = [
  ["JR", "You", "bg-[#e6f3fa] text-[#0369a1]"],
  ["MR", "Maya, 7", "bg-[#fdecf3] text-[#a1345f]"],
  ["LR", "Mom, 71", "bg-[#efeafd] text-[#5b3fb0]", true],
  ["SR", "Sam", "bg-[#e7f5ec] text-[#146c43]"],
];

const PAST = [
  ["Oct 2", "After standing up quickly", "4/10"],
  ["Aug 19", "Morning, before breakfast", "3/10"],
  ["Jun 3", "Week after a new prescription", "5/10"],
];

export function CaregiverMock() {
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[460px]" aria-hidden="true">
      <div className="flex gap-2 overflow-hidden">
        {PEOPLE.map(([i, n, tone, active]) => (
          <div key={n} className={`flex-1 min-w-0 flex flex-col items-center gap-1.5 rounded-2xl py-2.5 ${active ? "bg-[color:var(--sky-wash)] ring-1 ring-[color:var(--brand)]/30" : ""}`}>
            <span className={`grid place-items-center w-10 h-10 rounded-full text-sm font-semibold ${tone}`}>{i}</span>
            <span className={`text-[0.75rem] truncate max-w-full px-1 ${active ? "font-semibold text-[color:var(--ink)]" : "text-[color:var(--muted)]"}`}>{n}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-[color:var(--line)]">
        <p className="text-sm text-[color:var(--muted)]">Linda Rivera · 4 medications · next visit Oct 20</p>
        <p className="lp-serif mt-2 text-[1.5rem] leading-tight italic">&ldquo;Has this happened before?&rdquo;</p>
        <p className="mt-3 text-[0.875rem] font-semibold">Dizziness · logged 3 times since June</p>
        <ul className="mt-2">
          {PAST.map(([d, n, s]) => (
            <li key={d} className="flex items-center gap-3 py-2 border-b border-[color:var(--line)] last:border-0">
              <span className="w-14 shrink-0 text-[0.8125rem] font-semibold text-[color:var(--muted)]">{d}</span>
              <span className="flex-1 min-w-0 text-[0.9375rem] truncate">{n}</span>
              <span className="text-[0.8125rem] font-semibold text-[color:var(--warn)]">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ---------------- Appointments vs. everything in between ---------------- */

// Evenly spaced with a fixed jitter so the render is stable and nothing overlaps.
const BETWEEN = Array.from({ length: 40 }, (_, i) => ({
  x: 2 + i * (95 / 39),
  y: [0, 2, 1, 2, 0, 1, 1][i % 7],
  kind: ["symptom", "med", "vital", "symptom", "question", "better", "vital", "symptom"][(i * 3) % 8],
}));
const VISITS = [8, 52, 96];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export function BetweenTrack() {
  return (
    <figure className="w-full" aria-label="Three appointments in a year, compared with dozens of health moments between them">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink-2)]">What your medical record sees</p>
          <div className="relative mt-3 h-12 rounded-2xl bg-white shadow-[0_0_0_1px_var(--line)]">
            {VISITS.map((x) => (
              <span key={x} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center w-8 h-8 rounded-full bg-[color:var(--ink)] text-white" style={{ left: `${Math.min(Math.max(x, 4), 96)}%` }}>
                <Stethoscope className="w-4 h-4" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink-2)]">What you live with in between</p>
          <div className="relative mt-3 h-20 rounded-2xl bg-white shadow-[0_0_0_1px_var(--line)] overflow-hidden">
            {BETWEEN.map((b, i) => (
              <span key={i} className={`absolute w-2.5 h-2.5 rounded-full ${KINDS[b.kind].dot}`} style={{ left: `${b.x}%`, top: `${22 + b.y * 22}%` }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[0.6875rem] font-medium text-[color:var(--muted)] px-1" aria-hidden="true">
            {MONTHS.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>
      <figcaption className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-[color:var(--ink-2)]">
        {[["symptom", "Symptoms"], ["med", "Medication changes"], ["vital", "Readings"], ["better", "Improvements"], ["question", "Questions"]].map(([k, t]) => (
          <span key={k} className="inline-flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-full ${KINDS[k].dot}`} aria-hidden="true" />{t}</span>
        ))}
      </figcaption>
    </figure>
  );
}
