"use client";

import React from "react";
import { createClient as _createClient } from "@supabase/supabase-js";

/* ============================ SPOT MARK ============================ */

export function SpotMark({
  className = "h-14 w-9",
  pulse = false,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      {pulse && (
        <>
          <span className="spot-pulse" />
          <span className="spot-pulse spot-pulse-2" />
          <span className="spot-pulse spot-pulse-3" />
        </>
      )}
      <svg viewBox="0 0 112 176" className="relative z-10 h-full w-full drop-shadow-lg">
        <defs>
          <linearGradient id="spotGrad" x1="0.2" y1="0" x2="0.85" y2="1">
            <stop offset="0%" stopColor="#FFEE9C" />
            <stop offset="40%" stopColor="#FFD33D" />
            <stop offset="100%" stopColor="#E8B41F" />
          </linearGradient>
          <linearGradient id="spotGloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M56 5C81 5 96 21 96 43C96 69 82 106 76 120C73 129 66 134 56 134C46 134 39 129 36 120C30 106 16 69 16 43C16 21 31 5 56 5Z"
          fill="url(#spotGrad)"
          stroke="#fff"
          strokeWidth="7.5"
          strokeLinejoin="round"
        />
        <ellipse cx="39" cy="36" rx="10" ry="21" fill="url(#spotGloss)" transform="rotate(-8 39 36)" />
        <g
          fill="#082743"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontWeight="800"
          fontSize="26"
          textAnchor="middle"
        >
          <text x="56" y="46">S</text>
          <text x="56" y="74">P</text>
          <text x="56" y="102">O</text>
          <text x="56" y="127">T</text>
        </g>
        <circle cx="56" cy="157" r="15" fill="#0E0E10" stroke="#fff" strokeWidth="6.5" />
      </svg>
    </span>
  );
}

/* ============================ NAV ============================ */

export function Nav({ active }: { active?: "home" | "earn" }) {
  const [open, setOpen] = React.useState(false);

  const links = [
    { href: "/#spots", label: "Spots" },
    { href: "/#score", label: "Shore Score" },
    { href: "/#progress", label: "Progress" },
    { href: "/earn", label: "Host" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b-4 border-[#082743] bg-[#FFF8EB]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <a href="/" className="flex items-center gap-3">
          <SpotMark className="h-12 w-8" />
          <span className="leading-none">
            <span className="block text-lg font-black tracking-tight text-[#082743] sm:text-xl">
              The Last Spot&trade;
            </span>
            <span className="mt-1 block text-[9px] font-black uppercase tracking-[0.18em] text-[#1697D6] sm:text-[10px]">
              Less Searching. More Enjoying.&trade;
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-black uppercase tracking-wide transition hover:text-[#1697D6] ${
                (active === "earn" && l.label === "Host") ? "text-[#1697D6]" : "text-[#082743]"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#join"
            className="rounded-xl border-[3px] border-[#082743] bg-[#FFD33D] px-5 py-2.5 text-sm font-black uppercase tracking-wide text-[#082743] shadow-[4px_4px_0_#082743] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#082743]"
          >
            Join Waitlist
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="rounded-xl border-[3px] border-[#082743] bg-[#FFD33D] px-3 py-2 shadow-[3px_3px_0_#082743] md:hidden"
        >
          <span className="block h-0.5 w-5 bg-[#082743]" />
          <span className="mt-1 block h-0.5 w-5 bg-[#082743]" />
          <span className="mt-1 block h-0.5 w-5 bg-[#082743]" />
        </button>
      </div>

      {open && (
        <div className="border-t-4 border-[#082743] bg-[#FFF8EB] px-5 py-4 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-base font-black uppercase text-[#082743]"
            >
              {l.label}
            </a>
          ))}
          <a
            href="/#join"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-xl border-[3px] border-[#082743] bg-[#FFD33D] px-5 py-3 text-center text-sm font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]"
          >
            Join Waitlist
          </a>
        </div>
      )}
    </nav>
  );
}

/* ============================ TICKER ============================ */

const tickerItems = [
  "🎡 Ocean City launches first",
  "⏱️ Book by the hour or take the whole day",
  "🏖️ Now signing up driveway hosts",
  "⭐ Shore Score keeps hosts and drivers honest",
  "📅 Peak day pricing set by hosts, never an algorithm",
  "⚡ Flat 13% fee — no hidden costs",
  "🌊 Cape May & Avalon coming next",
];

export function Ticker() {
  return (
    <div className="flex overflow-hidden border-y-4 border-[#082743] bg-[#04182B]">
      <div className="flex shrink-0 items-center gap-2 border-r-4 border-[#082743] bg-[#FF8A3D] px-4 text-[11px] font-black uppercase tracking-wider text-[#082743] sm:px-6">
        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#082743]" />
        <span className="hidden sm:inline">Shore Network</span>
        <span className="sm:hidden">Live</span>
      </div>
      <div className="flex overflow-hidden">
        <div className="ticker-track flex whitespace-nowrap py-3.5">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="px-8 text-sm font-semibold text-[#FFD33D]">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================ FOOTER ============================ */

export function Footer() {
  return (
    <footer className="border-t-4 border-[#FFD33D] bg-[#04182B] px-5 py-14 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <SpotMark className="h-16 w-11" pulse />
            <div>
              <div className="text-2xl font-black">The Last Spot&trade;</div>
              <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#FFD33D]">
                Less Searching. More Enjoying.&trade;
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold">
            <a href="/#spots" className="text-white/70 transition hover:text-[#FFD33D]">Spots</a>
            <a href="/#score" className="text-white/70 transition hover:text-[#FFD33D]">Shore Score</a>
            <a href="/earn" className="text-white/70 transition hover:text-[#FFD33D]">Host</a>
            <a href="mailto:hello@thelastspotapp.com" className="text-white/70 transition hover:text-[#FFD33D]">Contact</a>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-wider text-white/40">
          &copy; The Last Spot&trade; &middot; Ocean City &middot; Cape May &middot; The Jersey Shore
        </div>
      </div>
    </footer>
  );
}

/* ============================ SPOT ASSISTANT ============================ */


const _URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const _KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const _sb = _URL && _KEY ? _createClient(_URL, _KEY) : null;

type SpotView = "menu" | "ask" | "sent";

export function SpotAssistant() {
  const [open, setOpen] = React.useState(false);
  const [view, setView] = React.useState<SpotView>("menu");
  const [question, setQuestion] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState("");

  /* ---- proactive nudge ---- */
  const [nudge, setNudge] = React.useState("");
  const spentRef = React.useRef(false);   // one nudge per visit, ever
  const openRef = React.useRef(false);
  openRef.current = open;

  React.useEffect(() => {
    // respect reduced motion / do-not-disturb preferences
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let hideTimer: ReturnType<typeof setTimeout>;
    let idleTimer: ReturnType<typeof setTimeout>;

    function fire(msg: string) {
      if (spentRef.current || openRef.current) return;
      spentRef.current = true;
      setNudge(msg);
      hideTimer = setTimeout(() => setNudge(""), 15000);
    }

    // 1. been here a while without engaging
    const dwellTimer = setTimeout(
      () => fire("Still looking? I can point you the right way."),
      50000
    );

    // 2. read most of the page — they're interested but haven't acted
    function onScroll() {
      const max = document.body.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.6) {
        fire("You've seen the whole tour. Want me to narrow it down?");
      }
      // 3. scrolled, then stopped dead — usually means stuck
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (window.scrollY > 500) {
          fire("Question I can answer? A real person reads these.");
        }
      }, 25000);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(dwellTimer);
      clearTimeout(hideTimer);
      clearTimeout(idleTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function close() {
    setOpen(false);
    setTimeout(() => {
      setView("menu");
      setQuestion("");
      setEmail("");
      setErr("");
    }, 250);
  }

  function openPanel() {
    setNudge("");
    spentRef.current = true;
    setOpen(true);
  }

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  async function submitQuestion(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim()) return;
    setBusy(true);
    setErr("");

    if (!_sb) {
      setErr("Not connected yet — email hello@thelastspotapp.com and we'll get right back to you.");
      setBusy(false);
      return;
    }

    const { error } = await _sb.from("spot_questions").insert({
      question: question.trim(),
      email: email.trim().toLowerCase() || null,
    });

    setBusy(false);
    if (error) {
      setErr("Couldn't send that one. Try hello@thelastspotapp.com instead?");
      return;
    }
    setView("sent");
  }

  const actions = [
    { emoji: "\u{1F697}", label: "Find parking", href: "/#spots" },
    { emoji: "\u{1F3E1}", label: "Become a host", href: "/earn" },
    { emoji: "\u{1F39F}\uFE0F", label: "Join the waitlist", href: "/#join" },
  ];

  return (
    <>
      {/* floating button + nudge */}
      {!open && (
        <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
          {nudge && (
            <div className="spot-nudge relative max-w-[15rem] rounded-2xl rounded-br-sm border-[3px] border-[#082743] bg-white px-4 py-3 shadow-[5px_5px_0_#082743]">
              <button
                onClick={() => setNudge("")}
                aria-label="Dismiss"
                className="absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full border-[2px] border-[#082743] bg-[#FF8A3D] text-xs font-black text-white"
              >
                &times;
              </button>
              <button onClick={openPanel} className="text-left">
                <p className="text-sm font-bold leading-snug text-[#082743]">{nudge}</p>
                <p className="mt-1.5 text-[10px] font-black uppercase tracking-wider text-[#1697D6]">
                  Tap to ask &rarr;
                </p>
              </button>
            </div>
          )}

          <button
            onClick={openPanel}
            aria-label="Ask Spot"
            className="group flex flex-col items-center gap-2"
          >
            <span className="spot-float block transition group-hover:scale-110">
              <SpotMark className="h-20 w-14 sm:h-24 sm:w-16" pulse />
            </span>
            <span className="rounded-full border-[3px] border-[#082743] bg-[#FFD33D] px-4 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#082743] shadow-[3px_3px_0_#082743]">
              Ask Spot
            </span>
          </button>
        </div>
      )}

      {/* panel */}
      {open && (
        <>
          <div onClick={close} className="fixed inset-0 z-[60] bg-[#04182B]/40 backdrop-blur-sm" />
          <div
            role="dialog"
            aria-label="Spot assistant"
            className="fixed bottom-0 right-0 z-[70] w-full p-3 sm:bottom-6 sm:right-6 sm:w-[400px] sm:p-0"
          >
            <div className="overflow-hidden rounded-3xl border-[4px] border-[#082743] bg-[#FFF8EB] shadow-[10px_10px_0_rgba(8,39,67,0.45)]">
              <div className="flex items-center gap-4 border-b-[4px] border-[#082743] bg-white p-5">
                <SpotMark className="h-16 w-11" pulse />
                <div className="flex-1">
                  <p className="text-xl font-black leading-none tracking-tight">Hi, I&rsquo;m Spot.</p>
                  <p className="mt-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-[#1697D6]">
                    Your parking concierge
                  </p>
                </div>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#082743] bg-[#FF8A3D] text-xl font-black text-white"
                >
                  &times;
                </button>
              </div>

              <div className="p-5">
                {view === "menu" && (
                  <>
                    <p className="mb-4 text-sm font-semibold text-slate-600">
                      We&rsquo;re still pre-launch, so I can&rsquo;t book you a spot yet — but I can
                      point you the right way.
                    </p>
                    <div className="space-y-3">
                      {actions.map((a) => (
                        <a
                          key={a.label}
                          href={a.href}
                          onClick={close}
                          className="flex items-center gap-4 rounded-2xl border-[3px] border-[#082743] bg-white px-5 py-4 font-black shadow-[4px_4px_0_#082743] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#082743]"
                        >
                          <span className="text-2xl">{a.emoji}</span>
                          {a.label}
                        </a>
                      ))}
                      <button
                        onClick={() => setView("ask")}
                        className="flex w-full items-center gap-4 rounded-2xl border-[3px] border-[#082743] bg-[#082743] px-5 py-4 font-black text-[#FFD33D] shadow-[4px_4px_0_rgba(8,39,67,0.4)] transition hover:translate-x-[2px] hover:translate-y-[2px]"
                      >
                        <span className="text-2xl">&#128172;</span>
                        Ask me anything
                      </button>
                    </div>
                  </>
                )}

                {view === "ask" && (
                  <form onSubmit={submitQuestion}>
                    <p className="mb-4 text-sm font-semibold text-slate-600">
                      Fire away. A real person reads these — usually same day.
                    </p>
                    <textarea
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      required
                      rows={4}
                      placeholder="Where do I park for the Night in Venice?"
                      className="w-full rounded-2xl border-[3px] border-[#082743] bg-white px-4 py-3 font-semibold outline-none focus:border-[#1697D6]"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email (so we can reply)"
                      className="mt-3 w-full rounded-2xl border-[3px] border-[#082743] bg-white px-4 py-3 font-semibold outline-none focus:border-[#1697D6]"
                    />
                    {err && (
                      <p className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
                        {err}
                      </p>
                    )}
                    <div className="mt-4 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setView("menu")}
                        className="rounded-2xl border-[3px] border-[#082743] bg-white px-5 py-3 text-sm font-black uppercase"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={busy}
                        className="flex-1 rounded-2xl border-[3px] border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase shadow-[4px_4px_0_#082743] disabled:opacity-60"
                      >
                        {busy ? "Sending\u2026" : "Send to Spot"}
                      </button>
                    </div>
                  </form>
                )}

                {view === "sent" && (
                  <div className="py-6 text-center">
                    <div className="flex justify-center">
                      <SpotMark className="h-20 w-14" pulse />
                    </div>
                    <p className="mt-5 text-2xl font-black tracking-tight">Got it!</p>
                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      We&rsquo;ll get back to you{email ? " by email" : ""} shortly.
                    </p>
                    <button
                      onClick={close}
                      className="mt-6 rounded-2xl border-[3px] border-[#082743] bg-[#FFD33D] px-7 py-3 text-sm font-black uppercase shadow-[4px_4px_0_#082743]"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
