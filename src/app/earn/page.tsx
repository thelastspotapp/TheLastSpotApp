"use client";

import React from "react";
import { Nav, Ticker, Footer, SpotMark } from "../_components";

const steps = [
  ["🏡", "List your space", "Driveway, parking pad, or private lot. Takes a few minutes and costs nothing."],
  ["💵", "Set your rates", "You pick hourly and daily prices. Raise them for event weekends — your call, never ours."],
  ["📆", "Get paid weekly", "Flat 13% platform fee. No listing fees, no monthly charges, no surprises."],
];

const faqs = [
  ["What if I need my spot?", "You control your own availability and can block any date. Your driveway is yours first."],
  ["What if nobody books?", "Listing is free. You only ever pay the 13% when you actually earn."],
  ["How do I get paid?", "Payments are handled securely and tracked in your host dashboard, paid out weekly."],
  ["Do I need to meet drivers?", "No. Drivers get clear instructions and check in by QR. Most hosts never come outside."],
];

const perks = [
  ["💰", "Earn from unused space", "That empty driveway is the most valuable thing on your block in July."],
  ["🛡️", "Verified reservations", "Every booking is tied to a real, verified account — no strangers guessing."],
  ["🎛️", "You stay in control", "Set availability, pause anytime, block dates. Nothing happens without you."],
  ["⚡", "Live in minutes", "Simple setup. No dashboard overload, no training required."],
];

export default function EarnPage() {
  return (
    <main className="bg-[#FFF8EB]">
      <Nav active="earn" />

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFE9A8] via-[#FFF3CE] to-[#D8F0FF]">
        <div className="sun-glow pointer-events-none absolute -left-24 top-4 h-80 w-80 rounded-full bg-[#FFD33D] blur-3xl opacity-60" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <span className="inline-flex rotate-2 items-center gap-2 rounded-full border-[3px] border-[#082743] bg-white px-5 py-2.5 text-xs font-black uppercase tracking-wider shadow-[4px_4px_0_#082743]">
              🏖️ Host with The Last Spot&trade;
            </span>

            <h1 className="mt-8 text-[3rem] font-black leading-[0.94] tracking-[-0.03em] text-[#082743] sm:text-6xl lg:text-7xl">
              Turn your
              <br />
              driveway into
              <br />
              <span className="text-[#1697D6]">income.</span>
            </h1>

            <p className="mt-7 max-w-md text-lg font-semibold text-[#0d3557] sm:text-xl">
              Earn from the space you already own. You set the price, you set the hours, and you
              can block any date you want it back.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/#join"
                className="rounded-2xl border-[4px] border-[#082743] bg-[#FFD33D] px-8 py-4 text-base font-black uppercase tracking-wide text-[#082743] shadow-[6px_6px_0_#082743] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#082743]"
              >
                Join as a host
              </a>
              <a
                href="/#spots"
                className="rounded-2xl border-[4px] border-[#082743] bg-white px-8 py-4 text-base font-black uppercase tracking-wide text-[#082743] shadow-[6px_6px_0_#082743] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#082743]"
              >
                See how it looks
              </a>
            </div>
          </div>

          {/* earnings card */}
          <div className="relative">
            <div className="spot-float pointer-events-none absolute -right-4 -top-14 hidden lg:block">
              <SpotMark className="h-32 w-20" pulse />
            </div>

            <div className="rounded-3xl border-[4px] border-[#082743] bg-white p-8 shadow-[10px_10px_0_#082743]">
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#1697D6]">
                What a driveway can do
              </p>
              <p className="mt-4 text-sm font-semibold text-slate-600">
                An example, not a promise — your rates and how often you list are entirely up to
                you.
              </p>

              <div className="mt-7 space-y-4">
                <RateRow label="Weekday, all day" value="$25" />
                <RateRow label="Summer weekend, all day" value="$35" />
                <RateRow label="Event weekend, all day" value="$45" highlight />
              </div>

              <div className="mt-7 rounded-2xl border-[3px] border-[#082743] bg-[#FFD33D] p-5 text-center">
                <p className="text-[10px] font-black uppercase tracking-wider text-[#082743]/70">
                  You keep
                </p>
                <p className="mt-1 text-4xl font-black tracking-tight">87%</p>
                <p className="mt-1 text-xs font-bold text-[#082743]/70">
                  Flat 13% platform fee. Nothing else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Ticker />

      {/* ---------------- STEPS ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1697D6]">
          Three steps
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Easier than renting a beach chair.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map(([emoji, title, body], i) => (
            <div
              key={title}
              className="rounded-3xl border-[4px] border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743] transition hover:-translate-y-2 hover:shadow-[12px_12px_0_#082743]"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-[3px] border-[#082743] bg-[#FFF8EB] text-3xl">
                  {emoji}
                </div>
                <span className="text-5xl font-black text-[#FFD33D]">{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-black tracking-tight">{title}</h3>
              <p className="mt-2.5 text-sm font-medium text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- PERKS ---------------- */}
      <section className="border-y-4 border-[#082743] bg-[#04182B] px-5 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD33D]">
            Why hosts sign up
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Your space. Your rules.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(([emoji, title, body]) => (
              <div
                key={title}
                className="rounded-3xl border-[4px] border-[#FFD33D] bg-[#082743] p-7"
              >
                <div className="text-3xl">{emoji}</div>
                <h3 className="mt-4 text-base font-black uppercase tracking-wide">{title}</h3>
                <p className="mt-2 text-sm font-medium text-white/70">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#1697D6]">
          Host questions
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          The stuff everyone asks.
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {faqs.map(([q, a]) => (
            <div
              key={q}
              className="rounded-3xl border-[4px] border-[#082743] bg-white p-7 shadow-[6px_6px_0_#082743]"
            >
              <h3 className="text-lg font-black tracking-tight text-[#1697D6]">{q}</h3>
              <p className="mt-2.5 text-sm font-medium text-slate-600">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="border-t-4 border-[#082743] bg-[#FFD33D] px-5 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SpotMark className="h-24 w-16" pulse />
          </div>
          <h2 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl">
            Ocean City hosts first.
          </h2>
          <p className="mt-5 text-lg font-semibold text-[#082743]/80">
            We&rsquo;re signing up our founding driveways now. Get on the list and you&rsquo;ll be
            among the first live when we open.
          </p>
          <a
            href="/#join"
            className="mt-9 inline-block rounded-2xl border-[4px] border-[#082743] bg-[#082743] px-10 py-5 text-lg font-black uppercase tracking-wide text-[#FFD33D] shadow-[6px_6px_0_rgba(8,39,67,0.35)] transition hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            List my space
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function RateRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border-[3px] border-[#082743] px-5 py-3.5 ${
        highlight ? "bg-[#1697D6] text-white" : "bg-[#FFF8EB]"
      }`}
    >
      <span className="text-sm font-bold">{label}</span>
      <span className="text-xl font-black">{value}</span>
    </div>
  );
}
