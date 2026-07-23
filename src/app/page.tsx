"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Nav, Ticker, Footer, SpotMark } from "./_components";

/* Supabase client — inlined (no tsconfig path aliases in this project) */
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase =
  SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

/* ------------------------------------------------------------------
   SPOTS
   To use a real photo: drop a jpg in /public and set  image: "/oc-beach.jpg"
   Leave image undefined and the gradient scene shows instead.
------------------------------------------------------------------- */
const featuredSpots = [
  {
    title: "Beach Access Premium",
    town: "Ocean City",
    hourly: 6,
    daily: 25,
    walk: "2-min walk to the sand",
    detail: "Perfect for beach days with all the gear.",
    badge: "Verified Host",
    score: "4.9",
    image: undefined as string | undefined,
    scene: "sunrise",
  },
  {
    title: "Boardwalk Parking",
    town: "Ocean City",
    hourly: 7,
    daily: 30,
    walk: "4-min walk to the boards",
    detail: "Rides, shops, and dinner all right there.",
    badge: "Boardwalk Access",
    score: "4.7",
    image: undefined as string | undefined,
    scene: "day",
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
    image: undefined as string | undefined,
    scene: "sunset",
  },
];

const scenes: Record<string, string> = {
  sunrise: "from-[#FFD9A0] via-[#FFF1C9] to-[#BFE9FF]",
  day: "from-[#9FE0FF] via-[#DDF5FF] to-[#FFEFC0]",
  sunset: "from-[#FF9E6B] via-[#FFD08A] to-[#8FD4F0]",
};

/* ============================ WAITLIST ============================ */

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
      setMessage("Signup isn't connected yet — email hello@thelastspotapp.com and we'll add you.");
      return;
    }

    const { error } = await supabase.from("waitlist").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      town,
      role,
    });

    if (error) {
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
      <div className="rounded-3xl border-[4px] border-[#082743] bg-white p-9 text-center shadow-[10px_10px_0_#082743]">
        <div className="flex justify-center">
          <SpotMark className="h-24 w-16" pulse />
        </div>
        <h3 className="mt-5 text-3xl font-black tracking-tight text-[#082743]">
          You&rsquo;re on the list!
        </h3>
        <p className="mt-3 text-slate-600">
          {message || "We'll email you the second Ocean City opens for real bookings."}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border-[4px] border-[#082743] bg-white p-6 shadow-[10px_10px_0_#082743] sm:p-8"
    >
      <div className="flex items-center gap-3">
        <SpotMark className="h-12 w-8" />
        <div>
          <h3 className="text-xl font-black leading-none tracking-tight">Get your spot early</h3>
          <p className="mt-1.5 text-xs font-bold uppercase tracking-wide text-[#1697D6]">
            No fake countdowns. Just a real seat.
          </p>
        </div>
      </div>

      <div className="mt-6 flex gap-2 rounded-2xl border-[3px] border-[#082743] bg-[#FFF8EB] p-1.5">
        {(["driver", "host"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 rounded-xl px-3 py-2.5 text-sm font-black uppercase tracking-wide transition ${
              role === r ? "bg-[#082743] text-white" : "text-slate-500 hover:text-[#082743]"
            }`}
          >
            {r === "driver" ? "Need parking" : "Have a space"}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-4">
        <Field id="wl-name" label="Name">
          <input
            id="wl-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border-[3px] border-[#082743] bg-[#FFFDF7] px-4 py-3 font-semibold outline-none focus:border-[#1697D6]"
          />
        </Field>

        <Field id="wl-email" label="Email">
          <input
            id="wl-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border-[3px] border-[#082743] bg-[#FFFDF7] px-4 py-3 font-semibold outline-none focus:border-[#1697D6]"
          />
        </Field>

        <Field id="wl-town" label="Shore town">
          <select
            id="wl-town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
            className="w-full rounded-xl border-[3px] border-[#082743] bg-[#FFFDF7] px-4 py-3 font-semibold outline-none focus:border-[#1697D6]"
          >
            <option>Ocean City</option>
            <option>Cape May</option>
            <option>Sea Isle City</option>
            <option>Avalon</option>
            <option>Stone Harbor</option>
            <option>Somewhere else nearby</option>
          </select>
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-2xl border-[4px] border-[#082743] bg-[#FFD33D] px-6 py-4 text-lg font-black uppercase tracking-wide text-[#082743] shadow-[6px_6px_0_#082743] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#082743] disabled:opacity-60"
      >
        {status === "sending" ? "Joining…" : "Join the waitlist"}
      </button>

      {status === "error" && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {message}
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-black uppercase tracking-wide text-[#082743]">
        {label}
      </label>
      {children}
    </div>
  );
}

/* ============================ PAGE ============================ */

export default function HomePage() {
  return (
    <main className="bg-[#FFF8EB]">
      <Nav active="home" />

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#8FD8FF] via-[#D8F0FF] to-[#FFE9A8]">
        {/* sun */}
        <div className="sun-glow pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-[#FFD33D] blur-3xl opacity-60" />
        {/* water band */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FFDF9E] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <span className="inline-flex -rotate-2 items-center gap-2 rounded-full border-[3px] border-[#082743] bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0_#082743]">
              🏖️ Building for Ocean City, NJ
            </span>

            <h1 className="mt-8 text-[3.25rem] font-black leading-[0.92] tracking-[-0.03em] text-[#082743] sm:text-7xl lg:text-8xl">
              Find your
              <br />
              spot.
              <br />
              <span className="text-[#1697D6]">Enjoy the</span>
              <br />
              <span className="text-[#1697D6]">shore.</span>
            </h1>

            <p className="mt-7 max-w-md text-lg font-semibold text-[#0d3557] sm:text-xl">
              Reserve trusted parking near the beach, boardwalk, and local events —
              before you ever pull out of the driveway.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#join"
                className="rounded-2xl border-[4px] border-[#082743] bg-[#FFD33D] px-8 py-4 text-base font-black uppercase tracking-wide text-[#082743] shadow-[6px_6px_0_#082743] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#082743]"
              >
                Get my spot
              </a>
              <a
                href="/earn"
                className="rounded-2xl border-[4px] border-[#082743] bg-white px-8 py-4 text-base font-black uppercase tracking-wide text-[#082743] shadow-[6px_6px_0_#082743] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#082743]"
              >
                List my space
              </a>
            </div>

            <p className="mt-6 text-sm font-bold text-[#0d3557]/70">
              Ocean City opens first. Cape May &amp; Avalon are next.
            </p>
          </div>

          <div id="join" className="relative">
            <div className="spot-float pointer-events-none absolute -left-6 -top-16 hidden lg:block">
              <SpotMark className="h-32 w-20" pulse />
            </div>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <Ticker />

      {/* ---------------- SPOTS ---------------- */}
      <section id="spots" className="mx-auto max-w-7xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1697D6]">
              Reserve before you arrive
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Book by the hour.
              <br />
              Or take the whole day.
            </h2>
          </div>
          <p className="max-w-sm font-semibold text-slate-600">
            Three-hour minimum on hourly. Hosts set their own rates and can raise them for
            event weekends.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {featuredSpots.map((spot) => (
            <article
              key={spot.title}
              className="overflow-hidden rounded-3xl border-[4px] border-[#082743] bg-white shadow-[8px_8px_0_#082743] transition hover:-translate-y-2 hover:shadow-[12px_12px_0_#082743]"
            >
              {/* scene / photo */}
              <div
                className={`relative h-40 border-b-[4px] border-[#082743] bg-gradient-to-br ${
                  scenes[spot.scene]
                }`}
              >
                {spot.image && (
                  <img src={spot.image} alt="" className="h-full w-full object-cover" />
                )}
                <span className="absolute left-4 top-4 rounded-full border-[3px] border-[#082743] bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wide">
                  {spot.badge}
                </span>
                <span className="absolute right-4 top-4 flex h-12 w-12 rotate-6 items-center justify-center rounded-full border-[3px] border-[#082743] bg-[#FFD33D] text-sm font-black">
                  {spot.score}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-black tracking-tight">{spot.title}</h3>
                <p className="mt-1.5 text-sm font-bold text-[#1697D6]">
                  📍 {spot.town} &middot; {spot.walk}
                </p>
                <p className="mt-3 text-sm font-medium text-slate-600">{spot.detail}</p>

                <div className="mt-6 flex overflow-hidden rounded-2xl border-[3px] border-[#082743]">
                  <div className="flex-1 px-4 py-3">
                    <div className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                      Hourly
                    </div>
                    <div className="text-2xl font-black leading-tight">
                      ${spot.hourly}
                      <span className="text-xs font-bold text-slate-400">/hr</span>
                    </div>
                  </div>
                  <div className="flex-1 border-l-[3px] border-[#082743] bg-[#FFD33D] px-4 py-3">
                    <div className="text-[9px] font-black uppercase tracking-wider text-[#082743]/60">
                      All day
                    </div>
                    <div className="text-2xl font-black leading-tight">${spot.daily}</div>
                  </div>
                </div>

                <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  3-hour minimum
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- SHORE SCORE ---------------- */}
      <section id="score" className="border-y-4 border-[#082743] bg-[#04182B] px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD33D]">
            Shore Score&trade;
          </p>
          <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
            Trust runs both ways.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-semibold text-white/70">
            Every host <em>and</em> every driver carries a Shore Score. Treat people well and it
            climbs — better scores get seen first and booked faster.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <ScoreCard
              tone="yellow"
              title="Hosts earn it by"
              caption="High score = top of search results"
              items={[
                "Listing a spot that's exactly where and what you said",
                "Being easy to find, easy to pull in and out of",
                "Staying available when you said you would",
                "Answering quickly and kindly",
              ]}
            />
            <ScoreCard
              tone="blue"
              title="Drivers earn it by"
              caption="High score = first pick of peak spots"
              items={[
                "Arriving and leaving on time",
                "Parking where you're supposed to",
                "Leaving the space how you found it",
                "Respecting the host's property and neighbors",
              ]}
            />
          </div>
        </div>
      </section>

      {/* ---------------- HOW IT WORKS ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1697D6]">How it works</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Simple on both sides.</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <StepCard
            label="For drivers"
            steps={[
              ["🔍", "Find", "Search your shore town for verified spots near where you're headed."],
              ["🎟️", "Reserve", "Pick hourly or all day, pay securely, confirmed before you leave."],
              ["🅿️", "Park", "Pull in with a quick QR check-in. No circling the block."],
            ]}
          />
          <StepCard
            label="For hosts"
            accent
            steps={[
              ["🏡", "List", "Share your driveway or unused space in a few minutes."],
              ["💵", "Price", "Set hourly and daily rates. Raise them for event weekends."],
              ["📆", "Earn", "Get paid weekly, minus a flat 13% fee. No hidden costs."],
            ]}
          />
        </div>
      </section>

      {/* ---------------- PROGRESS ---------------- */}
      <section
        id="progress"
        className="border-y-4 border-[#082743] bg-[#FFD33D] px-5 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#082743]/60">Progress</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Where we actually are.
          </h2>
          <p className="mt-5 max-w-xl text-lg font-semibold text-[#082743]/80">
            No fake countdowns. Here&rsquo;s what&rsquo;s done and what&rsquo;s left before Ocean
            City opens.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["✓", "Host outreach", "done"],
              ["◐", "Insurance partner", "active"],
              ["◐", "Ocean City pilot talks", "active"],
              ["○", "Payments live", "todo"],
              ["○", "County-wide rollout", "todo"],
            ].map(([icon, label, state]) => (
              <div
                key={label}
                className={`rounded-2xl border-[4px] border-[#082743] p-6 text-center shadow-[6px_6px_0_#082743] ${
                  state === "done"
                    ? "bg-[#082743] text-white"
                    : state === "active"
                    ? "bg-white"
                    : "bg-[#FFF8EB]"
                }`}
              >
                <div className="text-3xl font-black">{icon}</div>
                <div className="mt-3 text-sm font-black uppercase tracking-wide">{label}</div>
                <div
                  className={`mt-2 text-[10px] font-black uppercase tracking-wider ${
                    state === "done" ? "text-[#FFD33D]" : "text-slate-400"
                  }`}
                >
                  {state === "done" ? "Underway" : state === "active" ? "In review" : "Not yet"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FOUNDER ---------------- */}
      <section className="bg-[#FFF8EB] px-5 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SpotMark className="h-24 w-16" pulse />
          </div>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-[#1697D6]">
            Before we open
          </p>
          <p className="mt-5 text-2xl font-black leading-snug tracking-tight sm:text-3xl">
            &ldquo;We missed our first launch date on purpose. Insurance, local rules, and getting
            it right for our first hosts mattered more than a date on a calendar.&rdquo;
          </p>
          <p className="mt-6 text-lg font-semibold text-slate-600">
            We&rsquo;re building this hand-in-hand with Ocean City — our hometown — so that when it
            opens, it opens right.
          </p>
          <p className="mt-8 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            — The Last Spot&trade; team
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

/* ---------------- small pieces ---------------- */

function ScoreCard({
  tone,
  title,
  items,
  caption,
}: {
  tone: "yellow" | "blue";
  title: string;
  items: string[];
  caption: string;
}) {
  return (
    <div
      className={`rounded-3xl border-[4px] p-8 shadow-[8px_8px_0_rgba(255,255,255,0.15)] ${
        tone === "yellow"
          ? "border-[#FFD33D] bg-[#082743]"
          : "border-white/30 bg-[#1697D6]"
      }`}
    >
      <h3 className="text-lg font-black uppercase tracking-wide">{title}</h3>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] font-semibold text-white/90">
            <span className="text-[#FFD33D]">✓</span>
            {item}
          </li>
        ))}
      </ul>
      <p
        className={`mt-8 rounded-xl px-4 py-3 text-center text-[11px] font-black uppercase tracking-wider ${
          tone === "yellow" ? "bg-[#FFD33D] text-[#082743]" : "bg-[#082743] text-[#FFD33D]"
        }`}
      >
        {caption}
      </p>
    </div>
  );
}

function StepCard({
  label,
  steps,
  accent = false,
}: {
  label: string;
  steps: string[][];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border-[4px] border-[#082743] p-8 shadow-[8px_8px_0_#082743] ${
        accent ? "bg-[#1697D6] text-white" : "bg-white"
      }`}
    >
      <h3
        className={`text-sm font-black uppercase tracking-[0.15em] ${
          accent ? "text-[#FFD33D]" : "text-[#1697D6]"
        }`}
      >
        {label}
      </h3>
      <div className="mt-7 space-y-7">
        {steps.map(([emoji, title, body]) => (
          <div key={title} className="flex gap-5">
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[3px] border-[#082743] text-2xl ${
                accent ? "bg-white" : "bg-[#FFF8EB]"
              }`}
            >
              {emoji}
            </div>
            <div>
              <p className="text-lg font-black tracking-tight">{title}</p>
              <p
                className={`mt-1 text-sm font-medium ${
                  accent ? "text-white/80" : "text-slate-600"
                }`}
              >
                {body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
