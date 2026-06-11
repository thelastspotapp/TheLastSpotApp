"use client";

import React, { useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  HelpCircle,
  Home,
  MapPin,
  Menu,
  Navigation,
  QrCode,
  ShieldCheck,
  Sparkles,
  Star,
  Umbrella,
  X,
} from "lucide-react";

const featuredSpots = [
  {
    title: "Beach Access Premium",
    town: "Ocean City",
    price: 25,
    walk: "2-minute walk",
    detail: "Perfect for beach days with family gear.",
    badge: "Verified Host",
    accent: "from-[#8FE3FF] via-[#DDF7FF] to-[#FFF1BD]",
  },
  {
    title: "Boardwalk Parking",
    town: "Ocean City",
    price: 30,
    walk: "4-minute walk",
    detail: "Easy access to shops, rides, and dinner.",
    badge: "Boardwalk Access",
    accent: "from-[#A7E8D0] via-[#E9FFF6] to-[#FFE5B8]",
  },
  {
    title: "Event Exit Spot",
    town: "Cape May",
    price: 35,
    walk: "Quick exit route",
    detail: "Skip the post-event parking scramble.",
    badge: "Event Ready",
    accent: "from-[#FFD1A3] via-[#FFF3D6] to-[#BFEFFF]",
  },
];

const tickerItems = [
  "🎡 Boardwalk demand rising near 9th Street",
  "🚗 18 spots available near beach entrances",
  "☀️ Ocean City beach traffic moderate today",
  "⚡ New premium spot listed in Cape May",
  "🎆 July 4th inventory filling quickly",
  "🏖️ Family-friendly spots available now",
  "🎟️ Event parking demand increasing",
  "🌊 More shore towns coming soon",
];

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <SpotMark size="logo" />
      {!compact && (
        <div className="leading-none">
          <div className="text-xl font-black tracking-tight text-[#082743] sm:text-2xl">The Last Spot™</div>
          <div className="mt-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#1697D6]">Less Searching. More Enjoying.™</div>
        </div>
      )}
    </div>
  );
}

function ButtonLink({ href, children, variant = "primary" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" }) {
  const styles =
    variant === "primary"
      ? "bg-[#FFD33D] text-[#082743] shadow-[0_14px_30px_rgba(255,211,61,.35)] hover:bg-[#ffe066]"
      : "bg-white text-[#082743] shadow-[0_14px_30px_rgba(8,39,67,.10)] hover:bg-[#FFF8EB]";
  return (
    <a href={href} className={`inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-black uppercase tracking-wide transition hover:-translate-y-0.5 ${styles}`}>
      {children}
    </a>
  );
}

function SectionShell({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-[92%] max-w-7xl py-12 md:py-16 ${className}`}>
      {children}
    </section>
  );
}


function SpotMark({ size = "button" }: { size?: "button" | "panel" | "logo" | "mini" }) {
  const shellSize = {
    button: "h-16 w-16",
    panel: "h-12 w-12",
    logo: "h-12 w-12 shrink-0 rounded-2xl",
    mini: "h-7 w-7",
  }[size];

  const letterStyles = {
    button: {
      wrap: "-mt-0.5",
      s: "text-[23px] leading-[17px]",
      p: "text-[20px] leading-[15px]",
      o: "text-[17px] leading-[13px]",
      t: "text-[14px] leading-[11px]",
      dot: "mt-1 h-2.5 w-2.5",
      ring: "ring-4",
      inner: "inset-[6px]",
    },
    panel: {
      wrap: "-mt-0.5",
      s: "text-[18px] leading-[14px]",
      p: "text-[16px] leading-[12px]",
      o: "text-[13px] leading-[10px]",
      t: "text-[11px] leading-[9px]",
      dot: "mt-0.5 h-2 w-2",
      ring: "ring-4",
      inner: "inset-[5px]",
    },
    logo: {
      wrap: "-mt-0.5",
      s: "text-[17px] leading-[13px]",
      p: "text-[15px] leading-[11px]",
      o: "text-[12px] leading-[9px]",
      t: "text-[10px] leading-[8px]",
      dot: "mt-0.5 h-2 w-2",
      ring: "ring-4",
      inner: "inset-[5px]",
    },
    mini: {
      wrap: "-mt-[1px]",
      s: "text-[10px] leading-[8px]",
      p: "text-[9px] leading-[7px]",
      o: "text-[8px] leading-[6px]",
      t: "text-[7px] leading-[5px]",
      dot: "mt-[2px] h-1.5 w-1.5",
      ring: "ring-2",
      inner: "inset-[3px]",
    },
  }[size];

  return (
    <div
      className={`relative grid ${shellSize} place-items-center overflow-hidden bg-gradient-to-br from-[#FFE66D] via-[#FFD33D] to-[#F5B800] text-[#082743] shadow-[0_16px_40px_rgba(8,39,67,.25)] ${letterStyles.ring} ring-white`}
      aria-hidden="true"
    >
      <div className={`absolute ${letterStyles.inner} rounded-full border border-white/35`} />
      <div className="absolute -left-3 -top-5 h-10 w-16 rotate-[-20deg] rounded-full bg-white/25 blur-sm" />
      <div className={`relative flex flex-col items-center font-black tracking-[-0.04em] text-[#082743] ${letterStyles.wrap}`}>
        <span className={letterStyles.s}>S</span>
        <span className={letterStyles.p}>P</span>
        <span className={letterStyles.o}>O</span>
        <span className={letterStyles.t}>T</span>
        <span className={`${letterStyles.dot} rounded-full bg-[#082743] shadow-[inset_0_-1px_0_rgba(255,255,255,.25)]`} />
      </div>
    </div>
  );
}

function TrustItem({ icon: Icon, title, copy }: { icon: typeof ShieldCheck; title: string; copy: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-6 shadow-[0_18px_45px_rgba(8,39,67,.08)] ring-1 ring-[#DCEBF2]">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#E8F7FC] text-[#1697D6]">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-black text-[#082743]">{title}</h3>
      <p className="mt-2 font-semibold leading-relaxed text-[#526A7E]">{copy}</p>
    </div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<(typeof featuredSpots)[number] | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);

  const navItems = [
    ["Find Parking", "#find"],
    ["List Your Spot", "#host"],
    ["How It Works", "#how-it-works"],
    ["Contact", "#contact"],
  ];

  return (
    <main id="top" className="min-h-screen overflow-x-hidden bg-[#FFF8EB] text-[#082743]">
      <style jsx global>{`
        @keyframes spotPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 16px 28px rgba(8,39,67,.20)); }
          50% { transform: scale(1.045); filter: drop-shadow(0 20px 34px rgba(8,39,67,.28)); }
        }
        .spot-pulse {
          animation: spotPulse 4.6s ease-in-out infinite;
        }
        .spot-pulse:hover {
          animation-play-state: paused;
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b border-[#D7E6EC] bg-[#FFF8EB]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#top" aria-label="The Last Spot home">
            <BrandMark />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-black uppercase tracking-wide text-[#082743] transition hover:text-[#1697D6]">
                {label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="#find">Find Parking</ButtonLink>
          </div>

          <button onClick={() => setMenuOpen(true)} className="grid h-12 w-12 place-items-center rounded-2xl bg-[#FFD33D] text-[#082743] shadow-[0_10px_25px_rgba(8,39,67,.18)] lg:hidden" aria-label="Open menu">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[70] bg-[#082743]/70 p-5 backdrop-blur-sm lg:hidden">
          <div className="rounded-[2rem] bg-[#FFF8EB] p-6 shadow-[0_25px_80px_rgba(0,0,0,.28)]">
            <div className="mb-8 flex items-center justify-between">
              <BrandMark />
              <button onClick={() => setMenuOpen(false)} className="grid h-12 w-12 place-items-center rounded-full bg-[#FF8A3D] text-white shadow-lg" aria-label="Close menu">
                <X />
              </button>
            </div>
            <div className="grid gap-3">
              {navItems.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMenuOpen(false)} className="rounded-2xl bg-white px-5 py-4 text-lg font-black shadow-[0_12px_35px_rgba(8,39,67,.08)] ring-1 ring-[#DCEBF2]">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_20%_15%,#BFEFFF_0,#BFEFFF_25%,transparent_46%),radial-gradient(circle_at_80%_25%,#FFE08A_0,#FFE08A_18%,transparent_40%)] opacity-70" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-[#082743] shadow-[0_15px_35px_rgba(8,39,67,.10)] ring-1 ring-[#DCEBF2]">
              <SpotMark size="mini" />
              Launching Ocean City • July 1, 2026
            </div>
            <h1 className="max-w-4xl text-6xl font-black leading-[.9] tracking-tight text-[#082743] md:text-8xl">
              FIND YOUR SPOT.
              <span className="block text-[#1697D6]">ENJOY THE SHORE.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-bold leading-relaxed text-[#435D72] md:text-2xl">
              Reserve trusted parking near the beach, boardwalk, and local events before you arrive.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#find">Find Parking</ButtonLink>
              <ButtonLink href="#host" variant="secondary">List Your Spot</ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[430px]">
            <div className="absolute -left-5 top-10 hidden rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#082743] shadow-[0_18px_45px_rgba(8,39,67,.15)] ring-1 ring-[#DCEBF2] sm:block">
              <MapPin className="mr-2 inline text-[#1697D6]" size={18} /> 2 min walk
            </div>
            <div className="rounded-[2.4rem] bg-[#082743] p-4 shadow-[0_30px_90px_rgba(8,39,67,.28)]">
              <div className="rounded-[2rem] bg-[#F5FBFF] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <BrandMark compact />
                  <span className="rounded-full bg-[#FFD33D] px-4 py-2 text-xs font-black uppercase">Ocean City</span>
                </div>
                <div className="rounded-[1.5rem] bg-white p-4 shadow-[0_14px_35px_rgba(8,39,67,.08)]">
                  <p className="text-xs font-black uppercase tracking-wide text-[#1697D6]">Spot Found!</p>
                  <h3 className="mt-2 text-2xl font-black">Beach Access Premium</h3>
                  <p className="mt-1 font-bold text-[#607486]">2-minute walk • Verified Host</p>
                  <div className="mt-5 rounded-2xl bg-[#FFF4D8] p-4">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs font-black uppercase text-[#607486]">Today</p>
                        <p className="text-3xl font-black">$25</p>
                      </div>
                      <button onClick={() => setSelectedSpot(featuredSpots[0])} className="rounded-full bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase text-[#082743]">Reserve</button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-black uppercase text-[#526A7E]">
                  <div className="rounded-2xl bg-white p-3 shadow-sm">QR Access</div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm">Secure Pay</div>
                  <div className="rounded-2xl bg-white p-3 shadow-sm">Local</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell id="find">
        <div className="rounded-[2rem] bg-[#082743] p-6 text-white shadow-[0_28px_80px_rgba(8,39,67,.20)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#FFD33D]">Live Shore Network™</p>
              <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Real-time parking energy across the shore.</h2>
              <p className="mt-5 text-lg font-bold leading-relaxed text-white/75">Ocean City launches first. Cape May and more shore towns are next.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black text-[#FFD33D]">247</p><p className="font-black uppercase text-white/70">Spots Today</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black text-[#FFD33D]">2</p><p className="font-black uppercase text-white/70">Launch Towns</p></div>
                <div className="rounded-2xl bg-white/10 p-4"><p className="text-3xl font-black text-[#FFD33D]">Live</p><p className="font-black uppercase text-white/70">Ticker</p></div>
              </div>
            </div>
            <div className="rounded-[1.6rem] bg-white p-5 text-[#082743]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-2xl font-black">Market Pulse</h3>
                <span className="rounded-full bg-[#FFD33D] px-4 py-2 text-xs font-black uppercase">Live</span>
              </div>
              <div className="grid gap-3">
                {["Ocean City", "Cape May", "Avalon"].map((town, index) => (
                  <div key={town} className="flex items-center justify-between rounded-2xl bg-[#F5FBFF] p-4">
                    <div className="font-black">{town}</div>
                    <div className="text-sm font-black uppercase text-[#1697D6]">{index === 2 ? "Coming Soon" : index === 0 ? "Available Now" : "Preview"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 overflow-hidden rounded-full bg-white/10 py-4">
            <div className="ticker-track flex w-max gap-8 whitespace-nowrap text-sm font-black uppercase tracking-wide text-white/90">
              {[...tickerItems, ...tickerItems].map((item, i) => <span key={`${item}-${i}`}>{item}</span>)}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="how-it-works">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1697D6]">How It Works</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Simple for drivers. Simple for hosts.</h2>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_50px_rgba(8,39,67,.08)] ring-1 ring-[#DCEBF2]">
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">Drivers</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {["Find", "Reserve", "Park"].map((step, i) => (
                <div key={step} className="rounded-2xl bg-[#FFF4D8] p-5">
                  <p className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#FFD33D] font-black">{i + 1}</p>
                  <p className="text-lg font-black">{step}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] bg-white p-7 shadow-[0_18px_50px_rgba(8,39,67,.08)] ring-1 ring-[#DCEBF2]">
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">Hosts</p>
            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              {["List", "Price", "Earn"].map((step, i) => (
                <div key={step} className="rounded-2xl bg-[#FFF4D8] p-5">
                  <p className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#FFD33D] font-black">{i + 1}</p>
                  <p className="text-lg font-black">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1697D6]">Featured Spots</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">Reserve before you arrive.</h2>
          </div>
          <ButtonLink href="#find" variant="secondary">View All Spots</ButtonLink>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredSpots.map((spot) => (
            <article key={spot.title} className="overflow-hidden rounded-[2rem] bg-white shadow-[0_22px_60px_rgba(8,39,67,.10)] ring-1 ring-[#DCEBF2]">
              <div className={`h-40 bg-gradient-to-br ${spot.accent} p-5`}>
                <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase text-[#082743]">{spot.badge}</span>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-black">{spot.title}</h3>
                    <p className="mt-1 font-bold text-[#607486]"><MapPin className="mr-1 inline" size={16} />{spot.town} • {spot.walk}</p>
                  </div>
                  <div className="rounded-2xl bg-[#FFD33D] px-4 py-2 text-xl font-black">${spot.price}</div>
                </div>
                <p className="mt-4 font-semibold leading-relaxed text-[#526A7E]">{spot.detail}</p>
                <button onClick={() => setSelectedSpot(spot)} className="mt-6 w-full rounded-full bg-[#082743] px-5 py-4 text-sm font-black uppercase tracking-wide text-white transition hover:-translate-y-0.5">
                  Reserve Spot
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="host">
        <div className="grid gap-8 rounded-[2rem] bg-[#FFF0C2] p-7 shadow-[0_22px_70px_rgba(8,39,67,.10)] md:p-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1697D6]">Host With The Last Spot™</p>
            <h2 className="mt-3 text-5xl font-black leading-none md:text-7xl">Turn Your Driveway Into Income.</h2>
            <p className="mt-5 max-w-2xl text-xl font-bold leading-relaxed text-[#435D72]">Earn extra income by sharing your unused parking space during peak shore season.</p>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/earn">Start Hosting</ButtonLink>
              <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
                <p className="text-xs font-black uppercase text-[#607486]">Average summer host earnings</p>
                <p className="text-2xl font-black text-[#082743]">$800–$2,500+</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              [Home, "Use space you already own"],
              [DollarSign, "Weekly payout roadmap"],
              [Clock, "Flexible availability"],
            ].map(([Icon, label]) => {
              const I = Icon as typeof Home;
              return <div key={label as string} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm"><I className="text-[#1697D6]" /><p className="text-lg font-black">{label as string}</p></div>;
            })}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#1697D6]">Why The Last Spot?</p>
          <h2 className="mt-3 text-4xl font-black md:text-6xl">Built for trust before you arrive.</h2>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-5">
          <TrustItem icon={BadgeCheck} title="Verified Hosts" copy="Clear listings from trusted property owners." />
          <TrustItem icon={CreditCard} title="Secure Payments" copy="Simple, transparent reservation flow." />
          <TrustItem icon={CheckCircle2} title="Instant Confirmation" copy="Know where you are parking before you go." />
          <TrustItem icon={QrCode} title="QR Access" copy="Clean check-in experience for launch." />
          <TrustItem icon={HelpCircle} title="Local Support" copy="Built for shore towns, not generic parking." />
        </div>
      </SectionShell>

      <SectionShell id="contact" className="pb-20">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-[0_22px_70px_rgba(8,39,67,.10)] ring-1 ring-[#DCEBF2] md:p-12">
          <div className="mx-auto mb-5 flex justify-center"><SpotMark /></div>
          <h2 className="text-4xl font-black md:text-6xl">Need help getting started?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-bold leading-relaxed text-[#526A7E]">Questions about finding parking, listing your spot, or joining the Ocean City launch?</p>
          <div className="mt-7"><ButtonLink href="mailto:hello@thelastspotapp.com">Contact Us</ButtonLink></div>
        </div>
      </SectionShell>

      <div className="group fixed bottom-5 right-5 z-40">
        <div className="pointer-events-none absolute bottom-3 right-[4.7rem] hidden rounded-full bg-[#082743] px-4 py-2 text-sm font-black uppercase tracking-wide text-white shadow-[0_12px_30px_rgba(8,39,67,.22)] group-hover:block">
          Ask Spot
        </div>
        <button
          onClick={() => setHelpOpen(true)}
          className="spot-pulse rounded-full transition hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-[#1697D6]/40"
          aria-label="Ask Spot, The Last Spot parking concierge"
        >
          <SpotMark />
        </button>
      </div>

      <footer className="bg-[#082743] px-5 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <BrandMark />
            <p className="mt-5 max-w-2xl text-lg font-bold leading-relaxed text-white/70">Reserve trusted parking near the beach, boardwalk, and local events before you arrive.</p>
            <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#FFD33D]">Ocean City • Cape May • The Jersey Shore</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-black uppercase tracking-wide text-white/80">
            <a href="#find">Find Parking</a>
            <a href="#host">List Your Spot</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/15 pt-6 text-sm font-bold text-white/50">© The Last Spot™. All rights reserved.</div>
      </footer>


      {helpOpen && (
        <div className="fixed inset-0 z-[90] grid place-items-end bg-[#082743]/55 p-4 backdrop-blur-sm sm:place-items-end">
          <div className="w-full max-w-sm rounded-[2rem] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,.28)] ring-1 ring-[#DCEBF2]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <SpotMark size="panel" />
                <div>
                  <h2 className="text-2xl font-black text-[#082743]">Hi, I'm Spot.</h2>
                  <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">Your parking concierge</p>
                </div>
              </div>
              <button onClick={() => setHelpOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-[#FF8A3D] text-white" aria-label="Close helper"><X size={20} /></button>
            </div>
            <div className="grid gap-3">
              <a onClick={() => setHelpOpen(false)} href="#find" className="rounded-2xl bg-[#FFF4D8] px-5 py-4 text-lg font-black text-[#082743]">🚗 Find Parking</a>
              <a onClick={() => setHelpOpen(false)} href="#host" className="rounded-2xl bg-[#F5FBFF] px-5 py-4 text-lg font-black text-[#082743]">🏡 Become a Host</a>
              <a onClick={() => setHelpOpen(false)} href="#find" className="rounded-2xl bg-white px-5 py-4 text-lg font-black text-[#082743] ring-1 ring-[#DCEBF2]">📅 Reservation Questions</a>
              <a onClick={() => setHelpOpen(false)} href="mailto:hello@thelastspotapp.com" className="rounded-2xl bg-[#082743] px-5 py-4 text-lg font-black text-white">📞 Contact Support</a>
            </div>
          </div>
        </div>
      )}

      {selectedSpot && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-[#082743]/75 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-[2rem] bg-white p-6 shadow-[0_30px_90px_rgba(0,0,0,.28)]">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-black">Reserve With The Last Spot™</h2>
              <button onClick={() => setSelectedSpot(null)} className="grid h-11 w-11 place-items-center rounded-full bg-[#FF8A3D] text-white" aria-label="Close reservation"><X /></button>
            </div>
            <div className="rounded-2xl bg-[#FFF4D8] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#1697D6]">Spot Found!</p>
              <h3 className="mt-2 text-2xl font-black">{selectedSpot.title}</h3>
              <p className="mt-1 font-bold text-[#506579]">{selectedSpot.town} • {selectedSpot.walk}</p>
              <div className="mt-4 rounded-full bg-[#FFD33D] px-5 py-3 text-center text-2xl font-black">Reserve for ${selectedSpot.price}/day</div>
            </div>
            <div className="mt-5 grid gap-3">
              <input className="rounded-2xl border border-[#DCEBF2] bg-[#F8FCFD] px-4 py-4 text-lg font-bold outline-none focus:ring-2 focus:ring-[#1697D6]" placeholder="Your name" />
              <input className="rounded-2xl border border-[#DCEBF2] bg-[#F8FCFD] px-4 py-4 text-lg font-bold outline-none focus:ring-2 focus:ring-[#1697D6]" placeholder="Email" />
              <input className="rounded-2xl border border-[#DCEBF2] bg-[#F8FCFD] px-4 py-4 text-lg font-bold outline-none focus:ring-2 focus:ring-[#1697D6]" placeholder="Requested date" />
              <select className="rounded-2xl border border-[#DCEBF2] bg-[#F8FCFD] px-4 py-4 text-lg font-bold outline-none focus:ring-2 focus:ring-[#1697D6]">
                <option>1 hour</option>
                <option>2 hours</option>
                <option>3 hours</option>
                <option>4 hours</option>
                <option>Half day</option>
                <option>Full day</option>
                <option>Event parking</option>
              </select>
              <button className="rounded-full bg-[#FFD33D] px-8 py-4 text-lg font-black uppercase text-[#082743] shadow-[0_14px_30px_rgba(255,211,61,.35)]">Complete Reservation!</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
