import React, { useEffect, useRef, useState } from "react";
import { Mic, ArrowUp, FileText, Link2, Phone, Activity, ShieldAlert, FolderOpen, Pill, Check, Clock, Bell } from "lucide-react";
import { track } from "./track";

const NEXT_LABEL = {
  home: "Treat at home",
  doctor: "Call your doctor",
  er: "Get emergency care",
};

export function NextStep({ level, children }) {
  return (
    <div className={`lp-next lp-next--${level}`}>
      <div className="lp-next__label">
        <span className="lp-next__dot" aria-hidden="true" />
        Next step: {NEXT_LABEL[level]}
      </div>
      <p className="text-[color:var(--ink)]">{children}</p>
    </div>
  );
}

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

const userBubble = "bg-[color:var(--brand)] text-white rounded-[18px] rounded-br-md px-4 py-2.5 text-[0.9375rem] leading-snug max-w-[86%] ml-auto";
const aiBubble = "bg-[color:var(--paper-2)] text-[color:var(--ink)] rounded-[18px] rounded-bl-md px-4 py-2.5 text-[0.9375rem] leading-snug max-w-[92%]";

/* ---------------- Hero: an AI doctor visit ---------------- */

// [delay ms, messages shown, typing indicator on]
const HERO_TIMELINE = [[400, 1, false], [1000, 1, true], [2300, 2, false], [3300, 3, false], [3900, 3, true], [5600, 4, false]];

function Typing() {
  return (
    <div className={`${aiBubble} absolute left-0 top-0 !p-0`} aria-hidden="true">
      <span className="lp-typing"><span /><span /><span /></span>
    </div>
  );
}

export function HeroVisit() {
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(4);
      return;
    }
    const ids = HERO_TIMELINE.map(([t, s, ty]) => setTimeout(() => { setShown(s); setTyping(ty); }, t));
    return () => ids.forEach(clearTimeout);
  }, []);

  const on = (i) => String(shown >= i);
  const typingAt = (i) => typing && shown === i - 1;

  return (
    <figure className="lp-card w-full max-w-[480px] mx-auto overflow-hidden" aria-label="Example AI doctor visit">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[color:var(--line)]">
        <div className="flex items-center gap-2.5">
          <Mark className="w-7 h-7" />
          <div>
            <p className="font-semibold text-[0.9375rem] leading-tight">AI Doctor</p>
            <p className="text-xs text-[color:var(--muted)]">Health Me</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[color:var(--ok)]">
          <span className="w-2 h-2 rounded-full bg-[color:var(--ok)]" aria-hidden="true" />
          Available now
        </span>
      </div>

      <div className="px-4 sm:px-5 pt-4 pb-3 space-y-2.5">
        <p className={`lp-msg ${userBubble}`} data-on={on(1)}>
          I've had a sore throat and a fever of 101 since yesterday.
        </p>
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
              A sore throat and fever without a cough can be a sign of strep throat, which needs a quick test to
              confirm. Go to the emergency room if you have trouble breathing or cannot swallow liquids.
            </p>
            <NextStep level="doctor">See your doctor or an urgent care clinic today for a strep test.</NextStep>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4" aria-hidden="true">
        <div className="flex items-center gap-2 rounded-full border border-[color:var(--line)] pl-4 pr-1.5 py-1.5 text-sm text-[color:var(--muted)]">
          <span className="flex-1 truncate">Describe your symptoms…</span>
          <Mic className="w-4 h-4" />
          <span className="grid place-items-center w-8 h-8 rounded-full bg-[color:var(--ink)] text-white"><ArrowUp className="w-4 h-4" /></span>
        </div>
      </div>
    </figure>
  );
}

/* ---------------- Example visits ---------------- */

const QUESTIONS = [
  {
    id: "headache",
    q: "I've had a headache since this morning. Should I be worried?",
    answer: "Most headaches like this are caused by tension, poor sleep or dehydration, and they usually improve within a few hours with rest, water and an over-the-counter pain reliever.",
    watchTitle: "Call 911 if you notice any of the following:",
    watch: [
      "A sudden, severe headache that feels like the worst of your life",
      "Fever with a stiff neck, confusion or a new rash",
      "Weakness, numbness, slurred speech or changes in your vision",
    ],
    level: "home",
    next: "Rest and drink fluids. Check in again if the headache has not improved by this evening.",
  },
  {
    id: "meds",
    q: "Can I take ibuprofen with my blood pressure medication?",
    answer: "Because you take lisinopril, regular use of ibuprofen can raise your blood pressure, make your medication less effective and put strain on your kidneys. An occasional dose is usually safe for most people.",
    watchTitle: "Good to know:",
    watch: [
      "Acetaminophen (Tylenol) is often a better choice for pain if you take blood pressure medication",
      "Avoid taking ibuprofen every day for more than a few days without medical advice",
    ],
    level: "doctor",
    next: "Ask your pharmacist or doctor before taking ibuprofen for more than a day or two.",
  },
  {
    id: "labs",
    q: "My LDL cholesterol came back at 162. What does that mean?",
    answer: "An LDL level of 162 mg/dL is considered high (the high range is 160 to 189). It is not an emergency, but it is worth making a plan with your doctor, especially if you also have high blood pressure or a family history of heart disease.",
    watchTitle: "What usually happens next:",
    watch: [
      "Your doctor will consider your overall risk of heart disease, not only this number",
      "Changes to diet and exercise, and sometimes medication, can lower it",
      "A repeat test in a few months will show whether those changes are working",
    ],
    level: "home",
    next: "Discuss the result at your next checkup. Your visit report can be saved as a PDF for your doctor.",
  },
  {
    id: "child",
    q: "My daughter has a fever of 101.8 and a sore throat. What should I do?",
    answer: "A fever and sore throat without a cough can be a sign of strep throat, which needs a quick test to confirm. A fever at this level is not dangerous on its own.",
    watchTitle: "Get help right away if she:",
    watch: [
      "Has trouble breathing, is drooling or cannot swallow",
      "Has a stiff neck or is very difficult to wake",
      "Has not urinated in eight hours",
    ],
    level: "doctor",
    next: "Call her pediatrician today and ask about a strep test.",
  },
];

export function AskExplorer() {
  const [active, setActive] = useState(QUESTIONS[0].id);
  const tabRefs = useRef([]);
  const panelRef = useRef(null);
  const item = QUESTIONS.find((x) => x.id === active);

  const select = (id) => {
    setActive(id);
    track("landing_demo_question", { question: id });
  };

  // On phones the answer sits below the list, so bring it into view on tap.
  const onTap = (id) => {
    select(id);
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: "start", behavior: prefersReducedMotion() ? "auto" : "smooth" }));
    }
  };

  const onKey = (e, i) => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + QUESTIONS.length) % QUESTIONS.length;
    tabRefs.current[n]?.focus();
    select(QUESTIONS[n].id);
  };

  return (
    <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 lg:gap-10 items-start">
      <div role="tablist" aria-label="Example visits" aria-orientation="vertical" className="flex flex-col gap-1.5">
        {QUESTIONS.map((x, i) => {
          const selected = x.id === active;
          return (
            <button
              key={x.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`ask-tab-${x.id}`}
              aria-selected={selected}
              aria-controls="ask-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => onTap(x.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`text-left rounded-2xl px-5 py-4 min-h-[64px] text-[1.0625rem] sm:text-lg font-medium leading-snug transition-colors ${
                selected
                  ? "bg-[color:var(--surface)] text-[color:var(--ink)] shadow-[0_0_0_1px_rgba(15,30,44,0.07),0_8px_24px_-12px_rgba(15,30,44,0.25)]"
                  : "text-[color:var(--ink-2)] hover:bg-white/60"
              }`}
            >
              &ldquo;{x.q}&rdquo;
            </button>
          );
        })}
      </div>

      <div
        id="ask-panel"
        ref={panelRef}
        role="tabpanel"
        aria-labelledby={`ask-tab-${item.id}`}
        aria-live="polite"
        className="lp-card p-5 sm:p-7 lg:min-h-[460px]"
      >
        <div key={item.id} className="lp-fade space-y-4">
          <p className={`${userBubble} !max-w-[92%]`}>{item.q}</p>
          <p className="text-[1.0625rem] leading-relaxed text-[color:var(--ink)]">{item.answer}</p>
          <div>
            <p className="text-sm font-semibold text-[color:var(--muted)] mb-1.5">{item.watchTitle}</p>
            <ul className="space-y-1.5">
              {item.watch.map((w) => (
                <li key={w} className="flex gap-2.5 text-[0.9375rem] leading-snug text-[color:var(--ink-2)]">
                  <span aria-hidden="true" className="mt-[0.45em] w-1.5 h-1.5 rounded-full bg-[color:var(--muted)] shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
          <NextStep level={item.level}>{item.next}</NextStep>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Health history tour ---------------- */

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

function RecordsMock() {
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[440px]">
      <p className="font-semibold mb-1">Medical records</p>
      <Row icon={FileText} title="Cholesterol panel" meta="March 12 · Quest Diagnostics" right={<span className="text-xs font-semibold rounded-full px-2 py-0.5 bg-[color:var(--warn-bg)] text-[color:var(--warn)]">LDL high</span>} />
      <Row icon={FileText} title="Urgent care visit" meta="February 2 · Sinus infection" />
      <Row icon={FileText} title="MRI of the left knee" meta="January 18 · Uploaded photo" />
      <div className="mt-4 rounded-2xl border border-[color:var(--line)] p-3.5">
        <p className="text-[0.8125rem] text-[color:var(--muted)] mb-1">What this means</p>
        <p className="text-sm leading-snug">Your LDL cholesterol is above the healthy range. All other results on this panel are normal.</p>
      </div>
      <div className="mt-3 flex items-center gap-2.5 text-sm">
        <Link2 className="w-4 h-4 text-[color:var(--brand)] shrink-0" aria-hidden="true" />
        <span className="flex-1 min-w-0 truncate">Shared with Dr. Patel until October 15</span>
        <span className="font-semibold text-[color:var(--brand)]">Revoke</span>
      </div>
    </div>
  );
}

function MedsMock() {
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[440px]">
      <div className="flex items-baseline justify-between mb-1">
        <p className="font-semibold">Today's medications</p>
        <p className="text-sm text-[color:var(--muted)]">2 of 3 taken</p>
      </div>
      <Row icon={Check} done title="Lisinopril 10 mg" meta="8:00 AM with breakfast" right={<span className="text-xs font-semibold text-[color:var(--ok)]">Taken</span>} />
      <Row icon={Check} done title="Vitamin D 2,000 IU" meta="12:30 PM" right={<span className="text-xs font-semibold text-[color:var(--ok)]">Taken</span>} />
      <Row icon={Clock} title="Atorvastatin 20 mg" meta="9:00 PM · Reminder set" right={<span className="text-xs font-medium text-[color:var(--muted)]">Tonight</span>} />
      <div className="mt-4 flex gap-3 rounded-2xl bg-[color:var(--warn-bg)] p-3.5">
        <Bell className="w-4 h-4 mt-0.5 text-[color:var(--warn)] shrink-0" aria-hidden="true" />
        <p className="text-sm leading-snug"><span className="font-semibold">Your atorvastatin will run out in 5 days.</span> We will email you a reminder to request a refill.</p>
      </div>
    </div>
  );
}

const BP = [128, 131, 127, 133, 130, 135, 134, 138, 137, 141, 143, 142];

function VitalsMock() {
  const w = 360, h = 150, pad = 8, min = 120, max = 150;
  const x = (i) => pad + (i * (w - pad * 2)) / (BP.length - 1);
  const y = (v) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const d = BP.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[440px]">
      <div className="flex items-baseline justify-between">
        <p className="font-semibold">Blood pressure</p>
        <p className="text-sm text-[color:var(--muted)]">Last 3 weeks</p>
      </div>
      <p className="mt-1 text-3xl font-semibold tracking-tight lp-display">142<span className="text-[color:var(--muted)]">/90</span></p>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto mt-3" role="img" aria-label="Systolic blood pressure rising from 128 to 142 over three weeks, crossing a limit of 140">
        <line x1="0" x2={w} y1={y(140)} y2={y(140)} stroke="#b42318" strokeDasharray="4 5" strokeWidth="1.25" opacity="0.6" />
        <text x={w - 4} y={y(140) - 6} textAnchor="end" fontSize="11" fill="#b42318">Your limit: 140</text>
        <path d={`${d} L${x(BP.length - 1)},${h} L${x(0)},${h} Z`} fill="#0369a1" opacity="0.07" />
        <path d={d} fill="none" stroke="#0369a1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {BP.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r={i === BP.length - 1 ? 4.5 : 2.5} fill={v > 140 ? "#b42318" : "#0369a1"} />
        ))}
      </svg>
      <div className="mt-3 flex gap-3 rounded-2xl bg-[color:var(--urgent-bg)] p-3.5">
        <Activity className="w-4 h-4 mt-0.5 text-[color:var(--urgent)] shrink-0" aria-hidden="true" />
        <p className="text-sm leading-snug"><span className="font-semibold">Three readings were above your limit this week.</span> We sent you an email each time.</p>
      </div>
    </div>
  );
}

function EmergencyMock() {
  const field = (label, value) => (
    <div>
      <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-[color:var(--muted)]">{label}</p>
      <p className="text-[0.9375rem] font-medium leading-snug">{value}</p>
    </div>
  );
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[440px]">
      <div className="flex items-center gap-3 pb-4 border-b border-[color:var(--line)]">
        <span className="grid place-items-center w-11 h-11 rounded-full bg-[color:var(--paper-2)] font-semibold">JR</span>
        <div className="flex-1">
          <p className="font-semibold">Jordan Rivera</p>
          <p className="text-sm text-[color:var(--muted)]">Emergency profile</p>
        </div>
        <ShieldAlert className="w-5 h-5 text-[color:var(--urgent)]" aria-hidden="true" />
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
          <Phone className="w-4 h-4" aria-hidden="true" /> Call 911
        </span>
        <span className="flex-1 inline-flex items-center justify-center rounded-full border border-[color:var(--line)] font-semibold text-sm h-11">
          Print card
        </span>
      </div>
    </div>
  );
}

const TOUR = [
  {
    id: "records", icon: FolderOpen, Mock: RecordsMock,
    title: "Lab results explained in plain English.",
    body: "Upload a lab report or medical record, and Health Me will explain what it means. You can share it with your doctor through a link that expires automatically.",
  },
  {
    id: "meds", icon: Pill, Mock: MedsMock,
    title: "Medication reminders and refill alerts.",
    body: "Health Me reminds you when to take each medication and emails you before a prescription runs out.",
  },
  {
    id: "vitals", icon: Activity, Mock: VitalsMock,
    title: "Your vital signs, tracked over time.",
    body: "Record your blood pressure, blood sugar and weight to see how they change. If a reading goes above a limit you set, you will receive an email.",
  },
  {
    id: "emergency", icon: ShieldAlert, Mock: EmergencyMock,
    title: "Critical information, ready in an emergency.",
    body: "Keep your blood type, allergies, medications and emergency contacts in one place. One tap calls 911 and emails your location to your emergency contacts.",
  },
];

export function ProductTour() {
  const [active, setActive] = useState(TOUR[0].id);
  const tabRefs = useRef([]);
  const panelRef = useRef(null);
  const item = TOUR.find((t) => t.id === active);

  const select = (id) => {
    setActive(id);
    track("landing_tour_tab", { tab: id });
  };

  const onTap = (id) => {
    select(id);
    if (window.innerWidth < 1024) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: "nearest", behavior: prefersReducedMotion() ? "auto" : "smooth" }));
    }
  };

  const onKey = (e, i) => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + TOUR.length) % TOUR.length;
    tabRefs.current[n]?.focus();
    select(TOUR[n].id);
  };

  return (
    <div className="rounded-[32px] bg-[color:var(--paper-2)] p-3 sm:p-6 lg:p-10 grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] gap-6 lg:gap-12 items-center">
      <div role="tablist" aria-label="Health history features" aria-orientation="vertical" className="flex flex-col gap-1.5">
        {TOUR.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`tour-tab-${t.id}`}
              aria-selected={selected}
              aria-controls="tour-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => onTap(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`text-left rounded-2xl p-4 sm:p-5 transition-colors ${
                selected ? "bg-white shadow-[0_0_0_1px_rgba(15,30,44,0.06),0_8px_24px_-12px_rgba(15,30,44,0.25)]" : "hover:bg-white/60"
              }`}
            >
              <span className="flex items-center gap-3.5">
                <span className={`grid place-items-center w-9 h-9 rounded-xl shrink-0 transition-colors ${selected ? "bg-[color:var(--brand)] text-white" : "bg-white text-[color:var(--ink-2)]"}`}>
                  <t.icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className={`lp-display font-semibold text-[1.125rem] sm:text-[1.25rem] tracking-[-0.02em] ${selected ? "text-[color:var(--ink)]" : "text-[color:var(--ink-2)]"}`}>
                  {t.title}
                </span>
              </span>
              {selected && (
                <span className="lp-fade block mt-2 pl-[3.125rem] text-[1rem] sm:text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">{t.body}</span>
              )}
            </button>
          );
        })}
      </div>

      <div id="tour-panel" ref={panelRef} role="tabpanel" aria-labelledby={`tour-tab-${item.id}`} className="flex justify-center items-center lg:min-h-[480px]">
        <div key={item.id} className="lp-fade w-full flex justify-center" aria-hidden="true">
          <item.Mock />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Family profiles ---------------- */

const FAMILY = [
  { initials: "JR", name: "Jordan (you)", meta: "Age 42", tone: "bg-[#e6f3fa] text-[#0369a1]" },
  { initials: "SR", name: "Sam", meta: "Age 44", tone: "bg-[#e7f5ec] text-[#146c43]" },
  { initials: "MR", name: "Maya", meta: "Age 7", tone: "bg-[#fdecf3] text-[#a1345f]" },
  { initials: "LR", name: "Linda", meta: "Age 71", tone: "bg-[#efeafd] text-[#5b3fb0]" },
];

export function FamilyMock() {
  return (
    <div className="lp-card p-5 sm:p-6 w-full max-w-[420px]" aria-hidden="true">
      <p className="font-semibold mb-2">Whose health are you asking about?</p>
      {FAMILY.map((p, i) => (
        <div key={p.name} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${i === 2 ? "bg-[color:var(--sky-wash)]" : ""}`}>
          <span className={`grid place-items-center w-10 h-10 rounded-full text-sm font-semibold shrink-0 ${p.tone}`}>{p.initials}</span>
          <div className="flex-1">
            <p className="font-medium">{p.name}</p>
            <p className="text-sm text-[color:var(--muted)]">{p.meta}</p>
          </div>
          {i === 2 && <Check className="w-5 h-5 text-[color:var(--brand)]" />}
        </div>
      ))}
    </div>
  );
}
