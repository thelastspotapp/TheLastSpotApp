"use client";

import React, { useState } from "react";
import { Building2, CheckCircle2, Church, Clock, DollarSign, Home, MapPin, Menu, ShieldCheck, Sparkles, X } from "lucide-react";

const spots = [
  {
    title: "2 Blocks From Beach",
    town: "Ocean City",
    price: 25,
    tag: "Family Friendly",
    walk: "4 min walk",
    trust: "Verified Spot",
  },
  {
    title: "Boardwalk Event Parking",
    town: "Ocean City",
    price: 40,
    tag: "Event Ready",
    walk: "6 min walk",
    trust: "Trusted Host",
  },
  {
    title: "Cape May Beach Access",
    town: "Cape May",
    price: 32,
    tag: "Easy Exit",
    walk: "5 min walk",
    trust: "Verified Spot",
  },
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-14 w-14 place-items-center rounded-2xl border-[4px] border-[#082743] bg-[#FFD33D] text-3xl font-black text-[#082743] shadow-[5px_5px_0_#082743]">
        !
      </div>
      {!compact && (
        <div className="leading-none">
          <div className="text-2xl font-black tracking-tight text-[#082743]">The Last Spot™</div>
          <div className="mt-1 text-xs font-black uppercase tracking-wide text-[#1697D6]">TLS! Parking</div>
        </div>
      )}
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border-[3px] border-[#082743] bg-white px-4 py-2 text-sm font-black uppercase text-[#082743] shadow-[3px_3px_0_#082743]">
      {children}
    </span>
  );
}

function SectionCard({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto w-[92%] max-w-7xl rounded-[2rem] border-[5px] border-[#082743] bg-white p-6 shadow-[10px_10px_0_#082743] md:p-10 ${className}`}>
      {children}
    </section>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<(typeof spots)[number] | null>(null);

  const navItems = [
    ["Find Parking", "#find"],
    ["List Your Spot", "#host"],
    ["Community", "#community"],
    ["How It Works", "#how-it-works"],
    ["Contact", "#contact"],
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FFF4D8] text-[#082743]">
      <header className="sticky top-0 z-50 border-b-[5px] border-[#082743] bg-[#FFF8EB]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" aria-label="The Last Spot home">
            <BrandMark />
          </a>

          <nav className="hidden items-center gap-3 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="rounded-full border-[3px] border-[#082743] bg-white px-5 py-2 text-sm font-black uppercase shadow-[3px_3px_0_#082743] transition hover:-translate-y-0.5 hover:bg-[#FFD33D]">
                {label}
              </a>
            ))}
          </nav>

          <a href="#find" className="hidden rounded-full border-[4px] border-[#082743] bg-[#FFD33D] px-6 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#082743] md:inline-flex">
            Find Parking
          </a>

          <button onClick={() => setMenuOpen(true)} className="rounded-2xl border-[4px] border-[#082743] bg-[#FFD33D] p-3 shadow-[4px_4px_0_#082743] lg:hidden" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#082743]/80 p-5 lg:hidden">
          <div className="rounded-[2rem] border-[5px] border-[#082743] bg-[#FFF8EB] p-6 shadow-[8px_8px_0_#FFD33D]">
            <div className="mb-6 flex items-center justify-between">
              <BrandMark />
              <button onClick={() => setMenuOpen(false)} className="rounded-full border-[4px] border-[#082743] bg-[#FF8A3D] p-3 text-white shadow-[4px_4px_0_#082743]" aria-label="Close menu">
                <X />
              </button>
            </div>
            <div className="grid gap-3">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-2xl border-[3px] border-[#082743] bg-white px-5 py-4 text-lg font-black shadow-[4px_4px_0_#082743]">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <section id="top" className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 md:grid-cols-[1.05fr_.95fr] md:py-20">
        <div>
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border-[4px] border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase shadow-[5px_5px_0_#082743]">
            <span>🏖️</span> Live Parking Network™
          </div>
          <h1 className="max-w-3xl text-6xl font-black leading-[.9] tracking-tight text-[#082743] md:text-8xl">
            Your Spot Is Waiting.
          </h1>
          <p className="mt-7 max-w-2xl text-xl font-bold leading-relaxed text-[#26445f] md:text-2xl">
            Reserve trusted parking near the beach before you leave home. Less circling, less stress, more shore time.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#find" className="rounded-full border-[5px] border-[#082743] bg-[#FFD33D] px-8 py-4 text-center text-lg font-black uppercase shadow-[6px_6px_0_#082743] transition hover:-translate-y-1">
              Find Parking
            </a>
            <a href="#host" className="rounded-full border-[5px] border-[#082743] bg-white px-8 py-4 text-center text-lg font-black uppercase shadow-[6px_6px_0_#082743] transition hover:-translate-y-1">
              List Your Spot
            </a>
          </div>
        </div>

        <div className="rounded-[2.5rem] border-[6px] border-[#082743] bg-white p-5 shadow-[12px_12px_0_#082743]">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#BFEFFF] to-[#FFDDA3] p-5">
            <div className="mb-4 flex items-center justify-between">
              <BrandMark compact />
              <Pill>Ocean City</Pill>
            </div>
            <div className="rounded-[1.7rem] border-[4px] border-[#082743] bg-white p-4">
              <div className="mb-4 rounded-2xl bg-[#082743] px-4 py-3 text-center text-sm font-black uppercase tracking-wide text-white">Featured Spots</div>
              <div className="grid gap-4">
                {spots.slice(0, 2).map((spot) => (
                  <button key={spot.title} onClick={() => setSelectedSpot(spot)} className="rounded-2xl border-[3px] border-[#082743] bg-[#FFF8EB] p-4 text-left shadow-[4px_4px_0_#082743] transition hover:-translate-y-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-lg font-black">{spot.title}</div>
                        <div className="mt-1 text-sm font-bold text-[#4a6174]">{spot.town} • {spot.walk}</div>
                      </div>
                      <div className="text-2xl font-black">${spot.price}<span className="text-sm">/day</span></div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-[#EAF7F7] px-3 py-1 text-xs font-black uppercase">{spot.tag}</span>
                      <span className="rounded-full bg-[#FFD33D] px-3 py-1 text-xs font-black uppercase">{spot.trust}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="find" className="py-8">
        <SectionCard>
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">Live Parking Network™</p>
              <h2 className="mt-2 text-4xl font-black md:text-6xl">Find parking before the beach.</h2>
              <p className="mt-4 max-w-2xl text-lg font-bold text-[#3a5369]">Choose trusted private spots by town, walking distance, event demand, and price.</p>
            </div>
            <Pill>Reserve Before You Arrive</Pill>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {spots.map((spot) => (
              <article key={spot.title} className="rounded-[1.7rem] border-[4px] border-[#082743] bg-[#F7FBFC] p-5 shadow-[6px_6px_0_#082743]">
                <div className="mb-5 h-32 rounded-[1.2rem] bg-gradient-to-br from-[#86D8F6] via-[#BDEEFF] to-[#FFF0C7]" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{spot.title}</h3>
                    <p className="mt-1 font-bold text-[#4f6375]"><MapPin className="mr-1 inline" size={16} />{spot.town} • {spot.walk}</p>
                  </div>
                  <div className="rounded-full bg-[#FFD33D] px-4 py-2 text-xl font-black">${spot.price}</div>
                </div>
                <div className="mt-5 grid gap-2 text-sm font-black uppercase">
                  <div className="rounded-xl bg-white px-4 py-3">{spot.trust}</div>
                  <div className="rounded-xl bg-white px-4 py-3">{spot.tag}</div>
                </div>
                <button onClick={() => setSelectedSpot(spot)} className="mt-5 w-full rounded-full border-[4px] border-[#082743] bg-[#FFD33D] px-5 py-4 text-lg font-black uppercase shadow-[5px_5px_0_#082743]">
                  Reserve Spot
                </button>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <div id="how-it-works" className="py-8">
        <SectionCard>
          <h2 className="text-4xl font-black md:text-5xl">How It Works</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-[#FFF4D8] p-6">
              <p className="text-sm font-black uppercase text-[#1697D6]">Drivers</p>
              <h3 className="mt-2 text-3xl font-black">Find → Reserve → Park</h3>
              <p className="mt-3 font-bold text-[#4c6276]">Book a trusted shore parking spot before you arrive.</p>
            </div>
            <div className="rounded-2xl bg-[#FFF4D8] p-6">
              <p className="text-sm font-black uppercase text-[#1697D6]">Hosts</p>
              <h3 className="mt-2 text-3xl font-black">List → Price → Earn</h3>
              <p className="mt-3 font-bold text-[#4c6276]">Turn unused driveway, lot, or parking pad space into income.</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <div id="host" className="py-8">
        <SectionCard className="bg-[#FFF8EB]">
          <div className="grid gap-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">Host With The Last Spot™</p>
              <h2 className="mt-2 text-5xl font-black leading-none md:text-7xl">Turn Your Driveway Into Income.</h2>
              <p className="mt-5 text-xl font-bold text-[#415a70]">List your driveway, parking pad, private lot, church lot, or business space and earn from parking you already have.</p>
              <a href="/earn" className="mt-7 inline-flex rounded-full border-[5px] border-[#082743] bg-[#FFD33D] px-8 py-4 text-lg font-black uppercase shadow-[6px_6px_0_#082743]">List Your Spot</a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Home, "Residential Hosts", "Driveways and private spaces."],
                [Church, "Community Partners", "Churches and local organizations."],
                [Building2, "Commercial Lots", "Businesses with unused inventory."],
                [DollarSign, "Weekly Payouts", "Clear earnings and simple statements."],
              ].map(([Icon, title, copy]) => {
                const I = Icon as typeof Home;
                return (
                  <div key={title as string} className="rounded-2xl border-[3px] border-[#082743] bg-white p-5 shadow-[4px_4px_0_#082743]">
                    <I className="mb-3 text-[#1697D6]" />
                    <h3 className="text-xl font-black">{title as string}</h3>
                    <p className="mt-2 font-bold text-[#51677a]">{copy as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      </div>

      <div id="community" className="py-8">
        <SectionCard className="bg-[#082743] text-white shadow-[10px_10px_0_#1697D6]">
          <p className="text-sm font-black uppercase tracking-wide text-[#FFD33D]">Community</p>
          <h2 className="mt-2 text-4xl font-black md:text-6xl">Built for the shore communities we love.</h2>
          <p className="mt-5 max-w-3xl text-xl font-bold text-white/80">The Last Spot™ connects drivers, homeowners, churches, businesses, and local organizations into one trusted parking network.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/10 p-5"><ShieldCheck className="mb-3 text-[#FFD33D]" /><h3 className="text-2xl font-black">Trusted Spots</h3><p className="mt-2 font-bold text-white/75">Clear details, verification, and simple booking.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><CheckCircle2 className="mb-3 text-[#FFD33D]" /><h3 className="text-2xl font-black">Local Partners</h3><p className="mt-2 font-bold text-white/75">Community inventory from organizations and businesses.</p></div>
            <div className="rounded-2xl bg-white/10 p-5"><Sparkles className="mb-3 text-[#FFD33D]" /><h3 className="text-2xl font-black">Less Searching</h3><p className="mt-2 font-bold text-white/75">More time at the beach, boardwalk, dinner, and events.</p></div>
          </div>
        </SectionCard>
      </div>

      <div id="contact" className="py-8 pb-16">
        <SectionCard>
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-4xl font-black md:text-5xl">Ready for easier shore parking?</h2>
              <p className="mt-3 text-lg font-bold text-[#4c6276]">Questions about hosting, partnerships, Ocean City, Cape May, or launch opportunities?</p>
            </div>
            <a href="mailto:hello@thelastspotapp.com" className="rounded-full border-[5px] border-[#082743] bg-[#FFD33D] px-8 py-4 text-center text-lg font-black uppercase shadow-[6px_6px_0_#082743]">Contact Us</a>
          </div>
        </SectionCard>
      </div>

      <button className="fixed bottom-5 right-5 z-40 grid h-16 w-16 place-items-center rounded-full border-[5px] border-[#082743] bg-[#FFD33D] text-4xl font-black text-[#082743] shadow-[6px_6px_0_#082743]" aria-label="Need help">
        !
      </button>

      <footer className="bg-[#082743] px-5 py-12 text-center text-white">
        <h2 className="text-4xl font-black">The Last Spot™</h2>
        <p className="mt-3 text-xl font-black text-[#FFD33D]">Less Searching. More Enjoying.™</p>
        <p className="mx-auto mt-5 max-w-2xl font-bold text-white/75">Connecting drivers, homeowners, businesses, and communities across the Jersey Shore.</p>
        <p className="mt-6 text-sm font-black uppercase tracking-wide text-white/60">Ocean City • Cape May • More Coming Soon</p>
      </footer>

      {selectedSpot && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-[#082743]/80 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-[2rem] border-[5px] border-[#082743] bg-white p-6 shadow-[10px_10px_0_#FFD33D]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-black">The Last Spot™</h2>
              <button onClick={() => setSelectedSpot(null)} className="rounded-full border-[4px] border-[#082743] bg-[#FF8A3D] p-3 text-white shadow-[4px_4px_0_#082743]" aria-label="Close reservation"><X /></button>
            </div>
            <div className="rounded-2xl bg-[#FFF4D8] p-5">
              <h3 className="text-2xl font-black">{selectedSpot.title}</h3>
              <p className="mt-1 font-bold text-[#506579]">{selectedSpot.town} • {selectedSpot.walk}</p>
              <div className="mt-4 rounded-full bg-[#FFD33D] px-5 py-3 text-center text-2xl font-black">Reserve for ${selectedSpot.price}/day</div>
            </div>
            <div className="mt-5 grid gap-3">
              <input className="rounded-2xl border-[3px] border-[#082743] px-4 py-4 text-lg font-bold" placeholder="Your name" />
              <input className="rounded-2xl border-[3px] border-[#082743] px-4 py-4 text-lg font-bold" placeholder="Email" />
              <input className="rounded-2xl border-[3px] border-[#082743] px-4 py-4 text-lg font-bold" placeholder="Requested date" />
              <select className="rounded-2xl border-[3px] border-[#082743] px-4 py-4 text-lg font-bold">
                <option>2 hours</option>
                <option>Half day</option>
                <option>Full day</option>
              </select>
              <button className="rounded-full border-[5px] border-[#082743] bg-[#FFD33D] px-8 py-4 text-lg font-black uppercase shadow-[6px_6px_0_#082743]">Complete Reservation</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
