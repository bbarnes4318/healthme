import React, { useEffect, useState } from "react";
import {
  Mic, ArrowUp, FileText, Link2, Phone, Activity, ShieldAlert, Pill, Check, Clock, CalendarDays, FlaskConical, Download,
} from "lucide-react";

// Product UI mockups for the public landing page. Data shown is illustrative.

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

// Reveals steps 1..n on a timeline; everything is laid out up front so nothing shifts.
function useReveal(timeline, total) {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(total);
      return;
    }
    const ids = timeline.map(([t, s, ty]) => setTimeout(() => { setShown(s); setTyping(ty); }, t));
    return () => ids.forEach(clearTimeout);
  }, [timeline, total]);
  return { on: (i) => String(shown >= i), typingAt: (i) => typing && shown === i - 1 };
}

const userBubble = "bg-[color:var(--brand)] text-white rounded-[18px] rounded-br-md px-4 py-2.5 text-[0.9375rem] leading-snug max-w-[88%] ml-auto";
const aiBubble = "bg-[color:var(--paper-2)] text-[color:var(--ink)] rounded-[18px] rounded-bl-md px-4 py-2.5 text-[0.9375rem] leading-snug max-w-[94%]";
const label = "text-[0.6875rem] font-semibold uppercase tracking-wider text-[color:var(--muted)]";

function Typing() {
  return (
    <div className={`${aiBubble} absolute left-0 top-0 !p-0`} aria-hidden="true">
      <span className="lp-typing"><span /><span /><span /></span>
    </div>
  );
}

/* ---------------- Hero: the connected workspace ---------------- */

const SPARK = [126, 131, 128, 133, 129, 127, 130, 126, 128];

function Spark() {
  const w = 120, h = 34, min = 120, max = 136;
  const d = SPARK.map((v, i) => `${i ? "L" : "M"}${((i * w) / (SPARK.length - 1)).toFixed(1)},${(h - ((v - min) / (max - min)) * h).toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 -2 ${w} ${h + 4}`} className="w-full h-9 mt-1" aria-hidden="true">
      <path d={d} fill="none" stroke="#0369a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Tile({ icon: Icon, title, children }) {
  return (
    <div className="rounded-2xl border border-[color:var(--line)] p-3.5 min-w-0">
      <p className="flex items-center gap-1.5 text-[0.75rem] font-semibold text-[color:var(--muted)]">
        <Icon className="w-3.5 h-3.5" aria-hidden="true" /> {title}
      </p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

const HERO_TIMELINE = [[700, 1, false], [1300, 1, true], [2800, 2, false]];

export function HeroWorkspace() {
  const { on, typingAt } = useReveal(HERO_TIMELINE, 2);
  return (
    <figure className="lp-card w-full max-w-[500px] mx-auto overflow-hidden" aria-label="Example Health Me workspace">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-[color:var(--line)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="grid place-items-center w-8 h-8 rounded-full bg-[#e6f3fa] text-[#0369a1] text-xs font-semibold shrink-0">JR</span>
          <div className="min-w-0">
            <p className="font-semibold text-[0.9375rem] leading-tight truncate">Jordan Rivera</p>
            <p className="text-xs text-[color:var(--muted)]">Your health profile</p>
          </div>
        </div>
        <div className="flex -space-x-1.5 shrink-0" aria-hidden="true">
          {[["M", "bg-[#fdecf3] text-[#a1345f]"], ["S", "bg-[#e7f5ec] text-[#146c43]"], ["L", "bg-[#efeafd] text-[#5b3fb0]"]].map(([i, t]) => (
            <span key={i} className={`grid place-items-center w-7 h-7 rounded-full ring-2 ring-white text-[0.6875rem] font-semibold ${t}`}>{i}</span>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-5 grid grid-cols-2 gap-2.5">
        <Tile icon={Pill} title="Medications">
          <p className="font-semibold text-[0.9375rem]">2 of 3 taken today</p>
          <p className="text-[0.75rem] text-[color:var(--warn)] mt-0.5">Atorvastatin refill in 5 days</p>
        </Tile>
        <Tile icon={Activity} title="Blood pressure">
          <p className="font-semibold text-[0.9375rem]">128/82 <span className="font-normal text-[0.75rem] text-[color:var(--muted)]">avg, 30 days</span></p>
          <Spark />
        </Tile>
        <Tile icon={FlaskConical} title="Latest lab">
          <p className="font-semibold text-[0.9375rem] truncate">Cholesterol panel</p>
          <p className="text-[0.75rem] mt-0.5"><span className="font-semibold text-[color:var(--warn)]">LDL 162</span> <span className="text-[color:var(--muted)]">· above range</span></p>
        </Tile>
        <Tile icon={CalendarDays} title="Next appointment">
          <p className="font-semibold text-[0.9375rem] truncate">Dr. Patel</p>
          <p className="text-[0.75rem] text-[color:var(--muted)] mt-0.5">Thu, Oct 15 · 10:30 AM</p>
        </Tile>
      </div>

      <div className="px-4 sm:px-5 pb-4 space-y-2.5">
        <p className={`lp-msg ${userBubble}`} data-on={on(1)}>Can I take ibuprofen with my blood pressure medication?</p>
        <div className="relative">
          {typingAt(2) && <Typing />}
          <p className={`lp-msg ${aiBubble}`} data-on={on(2)}>
            Because you take lisinopril, regular ibuprofen can raise your blood pressure and strain your kidneys.
            Acetaminophen is often a better choice. Check with your pharmacist before using ibuprofen for more than a day or two.
          </p>
        </div>
      </div>
    </figure>
  );
}

/* ---------------- AI-guided conversation ---------------- */

const CHAT_TIMELINE = [[300, 1, false], [900, 1, true], [2200, 2, false], [3200, 3, false], [3800, 3, true], [5400, 4, false]];

export function ChatMock() {
  const { on, typingAt } = useReveal(CHAT_TIMELINE, 4);
  return (
    <figure className="lp-card w-full max-w-[480px] overflow-hidden" aria-label="Example AI-guided health conversation">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[color:var(--line)]">
        <div className="flex items-center gap-2.5">
          <Mark className="w-7 h-7" />
          <div>
            <p className="font-semibold text-[0.9375rem] leading-tight">Health conversation</p>
            <p className="text-xs text-[color:var(--muted)]">Using your medications and allergies</p>
          </div>
        </div>
      </div>
      <div className="px-4 sm:px-5 pt-4 pb-3 space-y-2.5">
        <p className={`lp-msg ${userBubble}`} data-on={on(1)}>I've had a sore throat and a fever of 101 since yesterday.</p>
        <div className="relative">
          {typingAt(2) && <Typing />}
          <p className={`lp-msg ${aiBubble}`} data-on={on(2)}>
            I'm sorry you're feeling unwell. Do you have a cough or a runny nose, and does it hurt to swallow?
          </p>
        </div>
        <p className={`lp-msg ${userBubble}`} data-on={on(3)}>No cough, but swallowing hurts a lot.</p>
        <div className="relative">
          {typingAt(4) && <Typing />}
          <div className={`lp-msg ${aiBubble} !max-w-full space-y-2.5`} data-on={on(4)}>
            <p>
              A sore throat and fever without a cough can be a sign of strep throat, which needs a quick test to confirm.
              Seek emergency care if you have trouble breathing or cannot swallow liquids.
            </p>
            <div className="lp-next lp-next--doctor">
              <div className="lp-next__label"><span className="lp-next__dot" aria-hidden="true" />Suggested next step</div>
              <p>See your doctor or an urgent care clinic today about a strep test.</p>
            </div>
          </div>
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

/* ---------------- Shared row ---------------- */

function Row({ icon: Icon, title, meta, right, done = false }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-[color:var(--line)] last:border-0">
      <span className={`grid place-items-center w-9 h-9 rounded-xl shrink-0 ${done ? "bg-[color:var(--ok-bg)] text-[color:var(--ok)]" : "bg-[color:var(--paper-2)] text-[color:var(--ink-2)]"}`}>
        <Icon className="w-4 h-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-[0.9375rem] truncate">{title}</p>
        <p className="text-[0.8125rem] text-[color:var(--muted)] truncate">{meta}</p>
      </div>
      {right}
    </div>
  );
}

/* ---------------- Medications ---------------- */

export function MedsMock() {
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[460px]" aria-hidden="true">
      <div className="flex items-baseline justify-between mb-1">
        <p className="font-semibold">Today's medications</p>
        <p className="text-sm text-[color:var(--muted)]">2 of 3 taken</p>
      </div>
      <Row icon={Check} done title="Lisinopril 10 mg" meta="Once daily · 8:00 AM with breakfast" right={<span className="text-xs font-semibold text-[color:var(--ok)]">Taken</span>} />
      <Row icon={Check} done title="Vitamin D 2,000 IU" meta="Once daily · 12:30 PM" right={<span className="text-xs font-semibold text-[color:var(--ok)]">Taken</span>} />
      <Row icon={Clock} title="Atorvastatin 20 mg" meta="Once daily · 9:00 PM" right={<span className="text-xs font-medium text-[color:var(--muted)]">Tonight</span>} />
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl bg-[color:var(--paper-2)] p-3.5">
          <p className={label}>Adherence, 14 days</p>
          <p className="mt-1 text-2xl font-semibold lp-display">93%</p>
        </div>
        <div className="rounded-2xl bg-[color:var(--warn-bg)] p-3.5">
          <p className={`${label} !text-[color:var(--warn)]`}>Refill</p>
          <p className="mt-1 text-sm font-semibold leading-snug">Atorvastatin runs out in 5 days</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Records, labs and trends ---------------- */

const BP = [128, 131, 127, 133, 130, 135, 134, 138, 137, 141, 143, 142];

export function RecordsTrendMock() {
  const w = 360, h = 120, pad = 8, min = 120, max = 150;
  const x = (i) => pad + (i * (w - pad * 2)) / (BP.length - 1);
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const d = BP.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <div className="w-full max-w-[460px] space-y-3" aria-hidden="true">
      <div className="lp-card p-5 sm:p-6">
        <p className="font-semibold mb-1">Medical records</p>
        <Row icon={FileText} title="Visit summary, Dr. Patel" meta="Uploaded PDF · March 12" right={<span className="text-xs font-semibold rounded-full px-2 py-0.5 bg-[color:var(--ok-bg)] text-[color:var(--ok)]">2 values added</span>} />
        <Row icon={FileText} title="Urgent care discharge" meta="Uploaded photo · February 2" />
      </div>
      <div className="lp-card p-5 sm:p-6">
        <div className="flex items-baseline justify-between">
          <p className="font-semibold">Blood pressure</p>
          <p className="text-sm text-[color:var(--muted)]">Last 3 weeks</p>
        </div>
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto mt-3">
          <line x1="0" x2={w} y1={y(140)} y2={y(140)} stroke="#b42318" strokeDasharray="4 5" strokeWidth="1.25" opacity="0.6" />
          <text x={4} y={y(140) - 6} textAnchor="start" fontSize="11" fill="#b42318">Your limit: 140</text>
          <path d={`${d} L${x(BP.length - 1)},${h} L${x(0)},${h} Z`} fill="#0369a1" opacity="0.07" />
          <path d={d} fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {BP.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r={i === BP.length - 1 ? 4.5 : 2.5} fill={v > 140 ? "#b42318" : "#0369a1"} />)}
        </svg>
        <p className="mt-2 text-sm text-[color:var(--ink-2)]">Readings from your log and uploaded records, in one timeline.</p>
      </div>
    </div>
  );
}

/* ---------------- Family profiles ---------------- */

const FAMILY = [
  { initials: "JR", name: "Jordan (you)", meta: "3 medications · 2 records this month", tone: "bg-[#e6f3fa] text-[#0369a1]" },
  { initials: "SR", name: "Sam", meta: "Partner · 1 medication", tone: "bg-[#e7f5ec] text-[#146c43]" },
  { initials: "MR", name: "Maya", meta: "Age 7 · checkup on Thursday", tone: "bg-[#fdecf3] text-[#a1345f]", active: true },
  { initials: "LR", name: "Linda", meta: "Age 71 · 4 medications · caregiver alerts on", tone: "bg-[#efeafd] text-[#5b3fb0]" },
];

export function FamilyMock() {
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[440px]" aria-hidden="true">
      <p className="font-semibold mb-2">Family profiles</p>
      {FAMILY.map((p) => (
        <div key={p.name} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${p.active ? "bg-[color:var(--sky-wash)]" : ""}`}>
          <span className={`grid place-items-center w-10 h-10 rounded-full text-sm font-semibold shrink-0 ${p.tone}`}>{p.initials}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-[color:var(--muted)] truncate">{p.meta}</p>
          </div>
          {p.active && <Check className="w-5 h-5 text-[color:var(--brand)] shrink-0" />}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Emergency information ---------------- */

export function EmergencyMock() {
  const field = (name, value) => (
    <div>
      <p className={label}>{name}</p>
      <p className="text-[0.9375rem] font-medium leading-snug">{value}</p>
    </div>
  );
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[440px]" aria-hidden="true">
      <div className="flex items-center gap-3 pb-4 border-b border-[color:var(--line)]">
        <span className="grid place-items-center w-11 h-11 rounded-full bg-[color:var(--paper-2)] font-semibold">JR</span>
        <div className="flex-1">
          <p className="font-semibold">Jordan Rivera</p>
          <p className="text-sm text-[color:var(--muted)]">Emergency health information</p>
        </div>
        <ShieldAlert className="w-5 h-5 text-[color:var(--urgent)]" />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 py-4">
        {field("Blood type", "O positive")}
        {field("Allergies", "Penicillin")}
        {field("Medications", "Lisinopril 10 mg")}
        {field("Conditions", "High blood pressure")}
        <div className="col-span-2">{field("Emergency contact", "Sam Rivera · (555) 014-2290")}</div>
      </div>
      <div className="flex gap-2">
        <span className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--urgent)] text-white font-semibold text-sm h-11">
          <Phone className="w-4 h-4" /> Call 911
        </span>
        <span className="flex-1 inline-flex items-center justify-center rounded-full border border-[color:var(--line)] font-semibold text-sm h-11">
          Print card
        </span>
      </div>
    </div>
  );
}

/* ---------------- Clinician sharing ---------------- */

export function SharingMock() {
  const scopes = [["Medical records", true], ["Medications", true], ["Vitals", true], ["Past health conversations", false]];
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[440px]" aria-hidden="true">
      <div className="flex items-center gap-3 pb-4 border-b border-[color:var(--line)]">
        <span className="grid place-items-center w-10 h-10 rounded-full bg-[color:var(--sky-wash)] text-[color:var(--brand)] text-sm font-semibold">AP</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold">Dr. Anita Patel</p>
          <p className="text-sm text-[color:var(--muted)]">Access expires October 15</p>
        </div>
        <span className="text-sm font-semibold text-[color:var(--brand)]">Revoke</span>
      </div>
      <p className={`${label} mt-4 mb-1`}>What she can see</p>
      {scopes.map(([s, onState]) => (
        <div key={s} className="flex items-center justify-between py-2">
          <span className="text-[0.9375rem]">{s}</span>
          <span className={`w-9 h-5 rounded-full relative ${onState ? "bg-[color:var(--brand)]" : "bg-[color:var(--line)]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow ${onState ? "left-[18px]" : "left-0.5"}`} />
          </span>
        </div>
      ))}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--line)] text-sm font-semibold h-11">
          <Download className="w-4 h-4" /> PDF summary
        </span>
        <span className="inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--line)] text-sm font-semibold h-11">
          <Link2 className="w-4 h-4" /> Share link
        </span>
      </div>
    </div>
  );
}

