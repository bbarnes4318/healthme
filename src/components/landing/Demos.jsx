import React, { useEffect, useState } from "react";
import {
  Mic, ArrowUp, Pill, Check, CalendarDays, Activity, Download, Link2, Moon, Stethoscope,
  TrendingDown, HeartPulse, CircleHelp, ShieldAlert,
} from "lucide-react";

// Product UI mockups for the public landing page. One illustrative patient (Jordan) runs through all of them
// so the page tells one story: headaches from Oct 5, lisinopril dose change Oct 6, BP 146/94 Oct 8, visit Oct 15.

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

function Typing() {
  return (
    <div className={`${aiBubble} absolute left-0 top-0 !p-0`} aria-hidden="true">
      <span className="lp-typing"><span /><span /><span /></span>
    </div>
  );
}

/* ---------------- Hero: scattered notes behind an organized visit prep ---------------- */

const SPARK = [128, 131, 129, 134, 138, 146, 141, 136];

function Spark() {
  const w = 120, h = 30, min = 124, max = 148;
  const pts = SPARK.map((v, i) => [(i * w) / (SPARK.length - 1), h - ((v - min) / (max - min)) * h]);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`-3 -4 ${w + 6} ${h + 8}`} className="w-full h-8 mt-1" aria-hidden="true">
      <path d={d} fill="none" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[5][0]} cy={pts[5][1]} r="3.5" fill="#b42318" />
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

export function HeroPrep() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:mr-0 xl:pt-10">
      {/* Before: the note on your phone */}
      <div
        aria-hidden="true"
        className="lp-scrap hidden xl:block absolute -left-4 top-0 w-[250px] -rotate-[4deg] rounded-2xl px-4 pt-4 pb-6"
      >
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[#8a7f6a]">Notes · tell dr</p>
        <ul className="lp-serif mt-2 space-y-1.5 text-[1rem] leading-snug text-[#5b5344]">
          <li>headaches since…?</li>
          <li>2 wks??</li>
          <li className="line-through decoration-[#b9ad95]">10mg or 20?</li>
          <li>BP high one day</li>
          <li>ask about mornings</li>
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
              <p className="text-xs text-[color:var(--muted)]">Thu, Oct 15 · 10:30 AM</p>
            </div>
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-[color:var(--ok-bg)] text-[color:var(--ok)] text-xs font-semibold px-2.5 py-1">
            <Check className="w-3.5 h-3.5" aria-hidden="true" /> Ready
          </span>
        </div>

        <div className="px-4 sm:px-5 pb-4">
          <PrepBlock title="What I've been experiencing">
            <p className="text-[0.9375rem] font-medium leading-snug">Headaches behind the eyes, worst in the morning</p>
            <p className="text-[0.8125rem] text-[color:var(--muted)] mt-0.5">Since Mon, Oct 5 · up to 6/10 · improving by Oct 10</p>
          </PrepBlock>
          <PrepBlock title="What changed">
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
              <p className={label}>Blood pressure</p>
              <p className="mt-1 text-[0.8125rem]"><span className="font-semibold text-[color:var(--urgent)]">146/94</span> <span className="text-[color:var(--muted)]">on Oct 8</span></p>
              <Spark />
            </div>
          </div>
          <PrepBlock title="Questions for Dr. Patel">
            <ul className="space-y-1.5 mt-1">
              {["Could the dose change be related to the headaches?", "Should I check my blood pressure more often at home?"].map((q) => (
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

/* ---------------- The appointment, and the drive home ---------------- */

const MOMENTS = [
  { time: "9:41 AM", where: "Waiting room", text: "Okay. The headaches, the new dose, that high reading…" },
  { time: "10:02 AM", where: "Exam room", text: "“So, what's been going on?” — “Um… I've just been getting these headaches.”" },
  { time: "10:14 AM", where: "Appointment ends", text: "“Anything else?” — “No, I think that's it.”" },
];

const FORGOT = ["…that they started right around the dose change", "…the 146/94 reading on Thursday", "…I've been taking ibuprofen most days"];

export function DriveHome() {
  return (
    <div className="w-full max-w-[480px]" aria-hidden="true">
      <ol className="relative pl-7">
        <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[color:var(--line)]" />
        {MOMENTS.map((m) => (
          <li key={m.time} className="relative pb-6">
            <span className="absolute -left-7 top-1.5 w-[15px] h-[15px] rounded-full bg-[color:var(--paper)] border-2 border-[#c9c3b8]" />
            <p className="text-[0.8125rem] font-semibold text-[color:var(--muted)]">{m.time} <span className="font-normal">· {m.where}</span></p>
            <p className="mt-1 text-[1rem] leading-snug text-[color:var(--ink-2)]">{m.text}</p>
          </li>
        ))}
        <li className="relative">
          <span className="absolute -left-7 top-5 w-[15px] h-[15px] rounded-full bg-[color:var(--warn)] ring-4 ring-[color:var(--warn-bg)]" />
          <div className="lp-card p-5 sm:p-6">
            <p className="text-[0.8125rem] font-semibold text-[color:var(--muted)]">10:36 AM <span className="font-normal">· Driving home</span></p>
            <p className="lp-serif mt-2 text-[2rem] sm:text-[2.25rem] leading-[1.1] text-[color:var(--ink)] italic">&ldquo;I forgot to tell them&hellip;&rdquo;</p>
            <ul className="mt-4 space-y-2">
              {FORGOT.map((f) => (
                <li key={f} className="rounded-xl border border-dashed border-[#d9c7a6] bg-[color:var(--warn-bg)]/60 px-3.5 py-2 text-[0.9375rem] text-[color:var(--ink-2)]">{f}</li>
              ))}
            </ul>
          </div>
        </li>
      </ol>
    </div>
  );
}

/* ---------------- Capture a symptom while it's happening ---------------- */

export function QuickLog() {
  const chip = "rounded-full px-3 py-1.5 text-[0.8125rem] font-medium border";
  return (
    <div className="lp-phone w-full max-w-[340px] mx-auto" aria-hidden="true">
      <div className="lp-card !rounded-[34px] p-2.5">
        <div className="rounded-[26px] bg-white px-5 pt-6 pb-5">
          <p className="text-xs font-semibold text-[color:var(--muted)]">Mon, Oct 5 · 7:12 AM</p>
          <p className="lp-display mt-1.5 text-[1.375rem] leading-tight font-semibold">What have you been experiencing?</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className={`${chip} bg-[color:var(--brand)] border-[color:var(--brand)] text-white`}>Headache</span>
            <span className={`${chip} border-[color:var(--line)] text-[color:var(--ink-2)]`}>Dizziness</span>
            <span className={`${chip} border-[color:var(--line)] text-[color:var(--ink-2)]`}>Fatigue</span>
            <span className={`${chip} border-dashed border-[color:var(--line)] text-[color:var(--muted)]`}>+ Other</span>
          </div>

          <p className={`${label} mt-5`}>Where</p>
          <p className="mt-1 text-[0.9375rem] font-medium">Head · behind the eyes</p>

          <p className={`${label} mt-4`}>How bad, 1 to 10</p>
          <div className="mt-2 grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }, (_, i) => (
              <span key={i} className={`h-7 rounded-md grid place-items-center text-[0.6875rem] font-semibold ${i < 6 ? "bg-[color:var(--warn-bg)] text-[color:var(--warn)]" : "bg-[color:var(--paper-2)] text-[color:var(--muted)]"} ${i === 5 ? "!bg-[color:var(--warn)] !text-white" : ""}`}>{i + 1}</span>
            ))}
          </div>

          <p className={`${label} mt-4`}>Notes</p>
          <p className="mt-1 text-[0.9375rem] leading-snug text-[color:var(--ink-2)]">Woke up with it. Worse after a bad night's sleep.</p>

          <span className="mt-5 flex items-center justify-center h-11 rounded-full bg-[color:var(--ink)] text-white text-sm font-semibold">Save to my health story</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- A week between visits ---------------- */

const KINDS = {
  symptom: { icon: Activity, dot: "bg-[color:var(--warn)]", tint: "bg-[color:var(--warn-bg)] text-[color:var(--warn)]" },
  med: { icon: Pill, dot: "bg-[color:var(--brand)]", tint: "bg-[color:var(--sky-wash)] text-[color:var(--brand)]" },
  vital: { icon: HeartPulse, dot: "bg-[color:var(--urgent)]", tint: "bg-[color:var(--urgent-bg)] text-[color:var(--urgent)]" },
  better: { icon: TrendingDown, dot: "bg-[color:var(--ok)]", tint: "bg-[color:var(--ok-bg)] text-[color:var(--ok)]" },
  visit: { icon: Stethoscope, dot: "bg-[color:var(--ink)]", tint: "bg-[color:var(--ink)] text-white" },
};

export const WEEK = [
  { day: "Monday", date: "Oct 5", kind: "symptom", title: "Headache started", meta: "6/10, behind the eyes" },
  { day: "Tuesday", date: "Oct 6", kind: "med", title: "Medication changed", meta: "Lisinopril 10 → 20 mg" },
  { day: "Thursday", date: "Oct 8", kind: "vital", title: "Blood pressure elevated", meta: "146/94 at 8:30 PM" },
  { day: "Saturday", date: "Oct 10", kind: "better", title: "Headache improved", meta: "Down to 2/10" },
  { day: "Next week", date: "Oct 15", kind: "visit", title: "Doctor appointment", meta: "Dr. Patel · 10:30 AM" },
];

export function WeekTimeline() {
  return (
    <div className="w-full" aria-label="Example week of health events between appointments">
      <ol className="relative grid grid-cols-1 md:grid-cols-5 gap-0 md:gap-4">
        <span aria-hidden="true" className="hidden md:block absolute left-[10%] right-[10%] top-[26px] h-px bg-[color:var(--line)]" />
        <span aria-hidden="true" className="md:hidden absolute left-[25px] top-6 bottom-6 w-px bg-[color:var(--line)]" />
        {WEEK.map((e) => {
          const k = KINDS[e.kind];
          return (
            <li key={e.day} className="relative flex md:flex-col md:items-center gap-4 md:gap-0 md:text-center py-3 md:py-0">
              <span className={`relative z-10 grid place-items-center w-[52px] h-[52px] rounded-2xl shrink-0 ring-[6px] ring-[color:var(--paper)] ${k.tint}`}>
                <k.icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <div className="md:mt-4">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-[color:var(--muted)]">{e.day} <span className="font-medium normal-case tracking-normal">· {e.date}</span></p>
                <p className="mt-1 font-semibold text-[1.0625rem] leading-snug">{e.title}</p>
                <p className="mt-0.5 text-[0.9375rem] text-[color:var(--ink-2)]">{e.meta}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function StoryCard() {
  return (
    <figure className="lp-card p-5 sm:p-7 w-full" aria-label="The week, organized into one story for the appointment">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-semibold"><Mark className="w-6 h-6" /> The story so far</p>
        <p className="text-sm text-[color:var(--muted)]">Ready for Thursday's appointment</p>
      </div>
      <p className="lp-serif mt-4 text-[1.375rem] sm:text-[1.625rem] leading-[1.35] text-[color:var(--ink)]">
        Headaches began <mark className="lp-hl lp-hl--warn">Monday, Oct 5</mark>. Lisinopril went from 10 to 20 mg on
        {" "}<mark className="lp-hl lp-hl--brand">Oct 6</mark>. Blood pressure read <mark className="lp-hl lp-hl--urgent">146/94</mark> on
        Oct 8. Headaches <mark className="lp-hl lp-hl--ok">eased to 2/10</mark> by Oct 10.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {WEEK.slice(0, 4).map((e) => (
          <span key={e.day} className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--paper-2)] px-3 py-1 text-[0.8125rem] text-[color:var(--ink-2)]">
            <span className={`w-2 h-2 rounded-full ${KINDS[e.kind].dot}`} aria-hidden="true" /> {e.title}
          </span>
        ))}
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
          My headaches started right around when my blood pressure medication changed. Is that worth bringing up on Thursday?
        </p>
        <div className="relative">
          {typingAt(2) && <Typing />}
          <p className={`lp-msg ${aiBubble}`} data-on={on(2)}>
            Yes, it's worth mentioning. Your profile shows your lisinopril went from 10 to 20 mg on Oct 6, and a reading of
            146/94 on Oct 8. Your doctor is the right person to sort out whether these are connected. Noting when the
            headaches happen and how strong they are can help.
          </p>
        </div>
        <div className={`lp-msg rounded-2xl border border-[color:var(--line)] p-3.5`} data-on={on(3)}>
          <p className="flex items-center gap-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.07em] text-[color:var(--brand)]">
            <CircleHelp className="w-3.5 h-3.5" aria-hidden="true" /> Questions you may want to ask
          </p>
          <ul className="mt-1.5 space-y-1 text-[0.875rem] leading-snug">
            <li>Could the higher dose be related to the headaches?</li>
            <li>Is 146/94 something to watch more closely at home?</li>
          </ul>
          <p className="mt-3 flex gap-2 rounded-xl bg-[color:var(--urgent-bg)] px-3 py-2 text-[0.8125rem] leading-snug text-[color:var(--ink)]">
            <ShieldAlert className="w-4 h-4 text-[color:var(--urgent)] shrink-0 mt-px" aria-hidden="true" />
            A sudden, severe headache, or one with confusion, weakness or vision changes, needs emergency care. Call 911.
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
          <p className="text-xs text-right text-[color:var(--muted)]">Jordan Rivera<br />Generated Oct 14</p>
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
            <p className="mt-1">Blood pressure: 146/94 mmHg (Oct 8), 24 readings on file</p>
          </div>
          <div>
            <p className={`${h} text-[color:var(--ink-2)]`}>Recent health conversations</p>
            <p className="mt-1">Oct 13: headaches since Oct 5, around a medication change</p>
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
const DOT = { symptom: "bg-[color:var(--warn)]", med: "bg-[color:var(--brand)]", vital: "bg-[color:var(--urgent)]", better: "bg-[color:var(--ok)]", question: "bg-[#7c5cd6]" };
const VISITS = [8, 52, 96];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];

export function BetweenTrack() {
  return (
    <figure className="w-full" aria-label="Three appointments in a year, compared with dozens of health moments between them">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-semibold text-[color:var(--ink-2)]">What appointments see</p>
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
              <span key={i} className={`absolute w-2.5 h-2.5 rounded-full ${DOT[b.kind]}`} style={{ left: `${b.x}%`, top: `${22 + b.y * 22}%` }} />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[0.6875rem] font-medium text-[color:var(--muted)] px-1" aria-hidden="true">
            {MONTHS.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>
      <figcaption className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-[color:var(--ink-2)]">
        {[["symptom", "Symptoms"], ["med", "Medication changes"], ["vital", "Readings"], ["better", "Improvements"], ["question", "Questions"]].map(([k, t]) => (
          <span key={k} className="inline-flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-full ${DOT[k]}`} aria-hidden="true" />{t}</span>
        ))}
      </figcaption>
    </figure>
  );
}
