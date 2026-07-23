"use client";

import React from "react";

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
