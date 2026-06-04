"use client";

import Link from "next/link";

function Logo() {
  return (
    <div className="inline-flex items-center gap-3 rounded-3xl border-4 border-[#082743] bg-[#1697D6] px-5 py-4 shadow-[6px_6px_0_#082743]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#082743] bg-[#FFD33D] text-2xl font-black text-[#082743]">
        P
      </div>
      <div className="leading-none">
        <p className="text-sm font-black italic text-white">The</p>
        <p className="text-2xl font-black uppercase text-white">Last</p>
        <p className="text-2xl font-black uppercase text-[#FFD33D]">Spot</p>
      </div>
    </div>
  );
}

export default function EarnPage() {
  return (
    <main className="min-h-screen bg-[#FFF8EB] text-[#082743]">
      <header className="border-b-4 border-[#082743] bg-[#FFF8EB] px-5 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Link href="/" aria-label="Back to The Last Spot home">
            <Logo />
          </Link>

          <Link
            href="/"
            className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase shadow-[4px_4px_0_#082743]"
          >
            Find Parking
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-[2.5rem] border-4 border-[#082743] bg-white p-7 shadow-[8px_8px_0_#082743] md:p-10">
          <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
            Less Searching. More Enjoying.™
          </p>

          <h1 className="mt-3 max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Turn Your Driveway Into Income
          </h1>

          <p className="mt-5 max-w-3xl text-lg font-bold text-slate-700 md:text-2xl">
            List your driveway, parking pad, or private lot and earn money from the space you already own.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["🏠", "List", "Add your parking space, location, and availability."],
              ["💲", "Price", "Use ShorePrice™ or set your own rate."],
              ["💰", "Earn", "Accept reservations and get paid."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="rounded-3xl border-4 border-[#082743] bg-[#FFF3D6] p-5 shadow">
                <p className="text-4xl">{icon}</p>
                <h2 className="mt-3 text-3xl font-black">{title}</h2>
                <p className="mt-2 font-bold text-slate-700">{desc}</p>
              </div>
            ))}
          </div>

          <div id="list-my-spot" className="mt-8 rounded-[2rem] border-4 border-[#082743] bg-[#FFD33D] p-6 shadow-[5px_5px_0_#082743]">
            <h2 className="text-3xl font-black">Ready to list your spot?</h2>
            <p className="mt-2 font-bold">
              Start with your address, availability, and a few details about the space. The goal is simple: list, price, earn.
            </p>
            <button className="mt-5 rounded-full border-4 border-[#082743] bg-white px-6 py-4 font-black uppercase shadow-[4px_4px_0_#082743]">
              Start Host Setup
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["💰", "Earn Extra Income", "Make money from an unused space."],
            ["🛡️", "Verified Reservations", "Reservations are tracked and tied to real booking details."],
            ["📅", "You Stay In Control", "Set availability, pause listings, or block dates."],
            ["⚡", "List In Minutes", "Simple setup without dashboard overload."],
          ].map(([icon, title, desc]) => (
            <div key={title} className="rounded-3xl border-4 border-[#082743] bg-white p-5 shadow">
              <p className="text-3xl">{icon}</p>
              <h3 className="mt-3 text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm font-bold text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white shadow-[8px_8px_0_#1697D6]">
          <h2 className="text-4xl font-black">Host Questions</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["What if I need my spot?", "You control your availability and can block dates when needed."],
              ["What if nobody books?", "Listing is free. You only earn when a reservation is made."],
              ["How do I get paid?", "Payments are handled securely and tracked through your host account."],
              ["Do I need to meet drivers?", "No. The platform is designed for clear instructions and simple reservations."],
            ].map(([q, a]) => (
              <div key={q} className="rounded-2xl bg-white/10 p-5">
                <h3 className="text-xl font-black text-[#FFD33D]">{q}</h3>
                <p className="mt-2 font-bold text-white/80">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t-4 border-[#082743] bg-[#082743] px-5 py-8 text-center text-white">
        <p className="text-3xl font-black">The Last Spot™</p>
        <p className="mt-2 font-black text-[#FFD33D]">Less Searching. More Enjoying.™</p>
      </footer>
    </main>
  );
}
