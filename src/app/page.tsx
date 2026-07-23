"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  BadgeCheck,
  Clock,
  MapPin,
  QrCode,
  ShieldCheck,
  Star,
  CalendarDays,
  DollarSign,
} from "lucide-react";

/* ------------------------------------------------------------------
   Supabase client — inlined on purpose.
   This project has no tsconfig path aliases, so a separate lib file
   would break the build (see V4.2 note). Keys come from Vercel env vars.
------------------------------------------------------------------- */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

/* ---------------------------- brand mark ---------------------------- */

function SpotMark({ className = "h-12 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 112 176" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="spotGrad" x1="0.2" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#FFE884" />
          <stop offset="42%" stopColor="#FFD33D" />
          <stop offset="100%" stopColor="#E5B92B" />
        </linearGradient>
      </defs>
      <path
        d="M56 5C81 5 96 21 96 43C96 69 82 106 76 120C73 129 66 134 56 134C46 134 39 129 36 120C30 106 16 69 16 43C16 21 31 5 56 5Z"
        fill="url(#spotGrad)"
        stroke="#ffffff"
        strokeWidth="7.5"
        strokeLinejoin="round"
      />
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
      <circle cx="56" cy="157" r="15" fill="#0E0E10" stroke="#ffffff" strokeWidth="6.5" />
    </svg>
  );
}

/* ---------------------------- content data ---------------------------- */

const featuredSpots = [
  {
    title: "Beach Access Premium",
    town: "Ocean City",
    hourly: 6,
    daily: 25,
    walk: "2-minute walk to the sand",
    detail: "Perfect for beach days with all the gear.",
    badge: "Verified Host",
    score: "4.9",
  },
  {
    title: "Boardwalk Parking",
    town: "Ocean City",
    hourly: 7,
    daily: 30,
    walk: "4-minute walk to the boardwalk",
    detail: "Easy access to rides, shops, and dinner.",
    badge: "Boardwalk Access",
    score: "4.7",
  },
  {
    title: "Event Exit Spot",
    town: "Cape May",
    hourly: 9,
    daily: 35,
    walk: "Quick exit route",
    detail: "Skip the post-event parking scramble.",
    badge: "Event Ready",
    score: "5.0",
  },
];

const tickerItems = [
  "🎡 Ocean City launches first",
  "⏱️ Book by the hour or take the whole day",
  "🏖️ Now signing up driveway hosts",
  "⭐ Shore Score keeps hosts and drivers accountable",
  "📅 Peak day pricing set by hosts, never an algorithm",
  "⚡ Flat 13% fee — no hidden costs",
  "🌊 Cape May & Avalon coming next",
];

const progress = [
  { label: "Host outreach", state: "done" },
  { label: "Insurance partner", state: "active" },
  { label: "Ocean City pilot talks", state: "active" },
  { label: "Payments live", state: "todo" },
  { label: "County-wide rollout", state: "todo" },
];

/* ---------------------------- waitlist form ---------------------------- */

function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [town, setTown] = useState("Ocean City");
  const [role, setRole] = useState<"driver" | "host">("driver");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("sending");
    setMessage("");

    if (!supabase) {
      setStatus("error");
      setMessage("Signup isn't connected yet. Email hello@thelastspotapp.com and we'll add you.");
      return;
    }

    const { error } = await supabase.from("waitlist").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      town,
      role,
    });

    if (error) {
      // 23505 = unique violation, i.e. this email already joined
      if (error.code === "23505") {
        setStatus("done");
        setMessage("You're already on the list — we've got you.");
        return;
      }
      setStatus("error");
      setMessage("Something went wrong. Try again, or email hello@thelastspotapp.com.");
      return;
    }

    setStatus("done");
    setMessage("");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-7 text-center shadow-xl ring-1 ring-black/5">
        <SpotMark className="mx-auto h-16 w-11" />
        <h3 className="mt-4 text-xl font-black text-[#082743]">You&rsquo;re on the list.</h3>
        <p className="mt-2 text-sm text-slate-600">
          {message || "We'll email you the moment Ocean City opens for real bookings."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5 sm:p-7"
    >
      <h3 className="text-lg font-black text-[#082743]">Get your spot early</h3>
      <p className="mt-1 text-sm text-slate-600">
        Join the list — no fake countdowns, just a real seat when we open.
      </p>

      <div className="mt-5 flex rounded-xl bg-[#FFF8EB] p-1">
        <button
          type="button"
          onClick={() => setRole("driver")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
            role === "driver" ? "bg-[#082743] text-white" : "text-slate-500"
          }`}
        >
          I need parking
        </button>
        <button
          type="button"
          onClick={() => setRole("host")}
          className={`flex-1 rounded-lg px-3 py-2 text-sm font-bold transition ${
            role === "host" ? "bg-[#082743] text-white" : "text-slate-500"
          }`}
        >
          I have a space
        </button>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label htmlFor="wl-name" className="block text-xs font-bold text-slate-600">
            Name
          </label>
          <input
            id="wl-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#1697D6] focus:ring-2 focus:ring-[#1697D6]/30"
          />
        </div>

        <div>
          <label htmlFor="wl-email" className="block text-xs font-bold text-slate-600">
            Email
          </label>
          <input
            id="wl-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-[#1697D6] focus:ring-2 focus:ring-[#1697D6]/30"
          />
        </div>

        <div>
          <label htmlFor="wl-town" className="block text-xs font-bold text-slate-600">
            Shore town
          </label>
          <select
            id="wl-town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#1697D6] focus:ring-2 focus:ring-[#1697D6]/30"
          >
            <option>Ocean City</option>
            <option>Cape May</option>
            <option>Sea Isle City</option>
            <option>Avalon</option>
            <option>Stone Harbor</option>
            <option>Somewhere else nearby</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-xl bg-[#FFD33D] px-4 py-3 text-sm font-black uppercase tracking-wide text-[#082743] transition hover:brightness-105 disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : "Join the waitlist"}
      </button>

      {status === "error" && (
        <p className="mt-3 text-xs font-semibold text-[#C8443B]">{message}</p>
      )}
    </form>
  );
}

/* ---------------------------- page ---------------------------- */

export default function HomePage() {
  return (
    <main className="bg-[#FFF8EB] text-[#082743]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-black/5 bg-[#FFF8EB]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <SpotMark className="h-11 w-7" />
            <span className="leading-none">
              <span className="block text-lg font-black tracking-tight sm:text-xl">
                The Last Spot&trade;
              </span>
              <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.16em] text-[#1697D6]">
                Less Searching. More Enjoying.&trade;
              </span>
            </span>
          </a>
          <div className="hidden gap-7 text-sm font-semibold sm:flex">
            <a href="#spots" className="hover:text-[#1697D6]">Spots</a>
            <a href="#score" className="hover:text-[#1697D6]">Shore Score</a>
            <a href="#progress" className="hover:text-[#1697D6]">Progress</a>
            <a href="/earn" className="hover:text-[#1697D6]">Host</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="bg-gradient-to-br from-[#DDF3FF] via-[#FFF8EB] to-[#FFE9B8]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <span className="inline-block rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide shadow-sm">
              Building for Ocean City, NJ
            </span>
            <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Find your spot.
              <br />
              <span className="text-[#1697D6]">Enjoy the shore.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-slate-700">
              Reserve trusted parking near the beach, boardwalk, and local events before you ever
              pull out of the driveway.
            </p>
            <p className="mt-4 max-w-md text-sm text-slate-500">
              Ocean City opens first. Cape May and Avalon are next.
            </p>
          </div>

          <div id="join">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="flex overflow-hidden border-y-4 border-[#FFD33D] bg-[#082743] text-white">
        <div className="flex shrink-0 items-center gap-2 bg-[#FF8A3D] px-5 text-[11px] font-black uppercase tracking-wide">
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
          Shore Network
        </div>
        <div className="flex overflow-hidden">
          <div className="ticker-track flex whitespace-nowrap py-3">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={i} className="px-7 text-sm text-white/85">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED SPOTS */}
      <section id="spots" className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1697D6]">
          Reserve before you arrive
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">Book by the hour, or take the day.</h2>
        <p className="mt-3 max-w-xl text-slate-600">
          Three-hour minimum on hourly. Hosts set their own rates and can raise them for event
          weekends.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featuredSpots.map((spot) => (
            <article
              key={spot.title}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-[#FFF8EB] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#1697D6]">
                  {spot.badge}
                </span>
                <span className="flex items-center gap-1 text-sm font-black text-[#082743]">
                  <Star className="h-4 w-4 fill-[#FFD33D] text-[#FFD33D]" />
                  {spot.score}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-black">{spot.title}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-[#1697D6]" />
                {spot.town} &middot; {spot.walk}
              </p>
              <p className="mt-3 text-sm text-slate-600">{spot.detail}</p>

              <div className="mt-5 flex overflow-hidden rounded-xl border border-slate-200">
                <div className="flex-1 px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                    Hourly
                  </div>
                  <div className="text-xl font-black">
                    ${spot.hourly}
                    <span className="text-xs font-medium text-slate-400">/hr</span>
                  </div>
                </div>
                <div className="flex-1 border-l border-slate-200 bg-[#FFF8EB] px-4 py-3">
                  <div className="text-[10px] font-black uppercase tracking-wide text-slate-400">
                    All day
                  </div>
                  <div className="text-xl font-black">${spot.daily}</div>
                </div>
              </div>

              <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                3-hour minimum
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* SHORE SCORE */}
      <section id="score" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1697D6]">
            Shore Score&trade;
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Trust runs both ways.</h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Every host and every driver carries a Shore Score. Treat people well and your score
            climbs — better scores get seen first and booked faster.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-[#082743] p-7 text-white">
              <h3 className="text-sm font-black uppercase tracking-wide">Hosts earn it by</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/85">
                <li>Listing a spot that&rsquo;s exactly where and what you said</li>
                <li>Being easy to find, easy to pull in and out of</li>
                <li>Staying available when you said you would</li>
                <li>Answering quickly and kindly</li>
              </ul>
              <p className="mt-6 text-[11px] font-black uppercase tracking-wide text-[#FFD33D]">
                High score = top of search results
              </p>
            </div>

            <div className="rounded-2xl bg-[#1697D6] p-7 text-white">
              <h3 className="text-sm font-black uppercase tracking-wide">Drivers earn it by</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-white/90">
                <li>Arriving and leaving on time</li>
                <li>Parking where you&rsquo;re supposed to</li>
                <li>Leaving the space how you found it</li>
                <li>Respecting the host&rsquo;s property and neighbors</li>
              </ul>
              <p className="mt-6 text-[11px] font-black uppercase tracking-wide text-[#082743]">
                High score = first pick of peak spots
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1697D6]">How it works</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight">Simple on both sides.</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
            <h3 className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              For drivers
            </h3>
            <div className="mt-5 space-y-5">
              <Step icon={<MapPin className="h-5 w-5" />} title="Find">
                Search your shore town for verified spots near where you&rsquo;re headed.
              </Step>
              <Step icon={<Clock className="h-5 w-5" />} title="Reserve">
                Pick hourly or all day, pay securely, and get confirmed before you leave.
              </Step>
              <Step icon={<QrCode className="h-5 w-5" />} title="Park">
                Pull in with a quick QR check-in. No circling the block.
              </Step>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-black/5">
            <h3 className="text-sm font-black uppercase tracking-wide text-[#1697D6]">For hosts</h3>
            <div className="mt-5 space-y-5">
              <Step icon={<BadgeCheck className="h-5 w-5" />} title="List">
                Share your driveway or unused space in a few minutes.
              </Step>
              <Step icon={<CalendarDays className="h-5 w-5" />} title="Price">
                Set your hourly and daily rates. Raise them for event weekends.
              </Step>
              <Step icon={<DollarSign className="h-5 w-5" />} title="Earn">
                Get paid weekly, minus a flat 13% platform fee. No hidden costs.
              </Step>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRESS */}
      <section id="progress" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1697D6]">Progress</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Where we actually are.</h2>
          <p className="mt-3 max-w-xl text-slate-600">
            No fake countdowns. Here&rsquo;s what&rsquo;s done and what&rsquo;s left before Ocean
            City opens.
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl bg-[#082743] p-7 sm:grid-cols-5">
            {progress.map((item) => (
              <div key={item.label} className="text-center">
                <div
                  className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
                    item.state === "done"
                      ? "bg-[#FFD33D] text-[#082743]"
                      : item.state === "active"
                      ? "border-2 border-dashed border-[#FFD33D] text-[#FFD33D]"
                      : "border-2 border-white/25 text-white/40"
                  }`}
                >
                  {item.state === "done" ? "✓" : item.state === "active" ? "◐" : "○"}
                </div>
                <p className="mt-2.5 text-xs font-semibold text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#1697D6]">
          Before we open
        </p>
        <p className="mt-4 text-xl font-semibold leading-relaxed">
          We missed our first launch date on purpose. Insurance, local rules, and getting the
          details right for our first hosts mattered more than a date on a calendar. We&rsquo;re
          building this hand-in-hand with Ocean City — our hometown — so that when it opens, it
          opens right.
        </p>
        <p className="mt-5 text-xs font-black uppercase tracking-wide text-slate-500">
          — The Last Spot&trade; team
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#082743] px-5 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <SpotMark className="h-11 w-7" />
            <span className="text-lg font-black">The Last Spot&trade;</span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/75">
            <a href="#join" className="hover:text-white">Join waitlist</a>
            <a href="#score" className="hover:text-white">Shore Score</a>
            <a href="/earn" className="hover:text-white">Host</a>
            <a href="mailto:hello@thelastspotapp.com" className="hover:text-white">Contact</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-xs text-white/50">
          <span className="flex flex-wrap items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            &copy; The Last Spot&trade; &middot; Ocean City &middot; Cape May &middot; The Jersey
            Shore
          </span>
        </div>
      </footer>
    </main>
  );
}

function Step({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF8EB] text-[#1697D6]">
        {icon}
      </div>
      <div>
        <p className="font-black">{title}</p>
        <p className="mt-0.5 text-sm text-slate-600">{children}</p>
      </div>
    </div>
  );
}
