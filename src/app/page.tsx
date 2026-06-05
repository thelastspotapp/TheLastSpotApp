"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bell, CalendarDays, CheckCircle2, Flame, MapPin, Menu, ShieldCheck, X, Send, QrCode } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

type ParkingSpot = {
  id?: string;
  title: string;
  town: string;
  price: number;
  description?: string | null;
  image_url?: string | null;
  available?: boolean | null;
  vehicle_size?: string | null;
  max_vehicle_length?: string | null;
  height_restriction?: string | null;
  fit_notes?: string | null;
  covered_parking?: boolean | null;
  ev_charger?: boolean | null;
  oversized_allowed?: boolean | null;
  backing_in_required?: boolean | null;
  parallel_parking_only?: boolean | null;
  vehicle_sizes?: string[] | null;
  covered?: boolean | null;
  spot_length?: string | null;
  trust_score?: number | null;
  verified_owner?: boolean | null;
  total_reviews?: number | null;
  average_rating?: number | null;

  latitude?: number | null;
  longitude?: number | null;
  near_beach?: boolean | null;
  walking_distance?: string | null;
  map_place_id?: string | null;
  formatted_address?: string | null;
  beach_distance_miles?: number | null;
  boardwalk_distance_miles?: number | null;
  walking_time_minutes?: number | null;
  directions_url?: string | null;
  map_pin_label?: string | null;
  zone_type?: string | null;
  surge_active?: boolean | null;
  base_price?: number | null;
  dynamic_price?: number | null;
  weekend_multiplier?: number | null;
  event_multiplier?: number | null;
  weather_multiplier?: number | null;
  occupancy_multiplier?: number | null;
  trust_multiplier?: number | null;
  pricing_strategy?: string | null;
  ai_recommended_price?: number | null;
  ai_demand_score?: number | null;
  ai_occupancy_forecast?: number | null;
  ai_revenue_projection?: number | null;
  ai_surge_reason?: string | null;
  ai_last_updated?: string | null;};

type BookingRequest = {
  id: string;
  spot_title: string | null;
  spot_town: string | null;
  spot_price: number | null;
  customer_name: string | null;
  customer_email: string | null;
  requested_date: string | null;
  requested_rate: string | null;
  status: string | null;
  payment_status?: string | null;
  qr_code?: string | null;
  created_at?: string | null;
};

type PaymentStatus = "unpaid" | "deposit_due" | "paid" | "refunded";

type UserProfile = {
  id?: string;
  email: string;
  full_name?: string | null;
  role?: string | null;
  trust_score?: number | null;
  verified?: boolean | null;
  total_bookings?: number | null;
  repeat_guest_count?: number | null;
  avg_rating?: number | null;
};

type Review = {
  id?: string;
  booking_id?: string | null;
  reviewer_email?: string | null;
  reviewed_email?: string | null;
  review_type?: string | null;
  rating?: number | null;
  communication_rating?: number | null;
  accuracy_rating?: number | null;
  cleanliness_rating?: number | null;
  comment?: string | null;
  created_at?: string | null;
};

type HostSubmission = {
  id: string;
  host_name: string | null;
  host_email: string | null;
  host_phone: string | null;
  spot_title: string | null;
  town: string | null;
  address: string | null;
  daily_price: number | null;
  weekly_price: number | null;
  monthly_price: number | null;
  description: string | null;
  verification_method?: string | null;
  owner_attestation?: boolean | null;
  document_note?: string | null;
  photo_note?: string | null;
  vehicle_size?: string | null;
  max_vehicle_length?: string | null;
  height_restriction?: string | null;
  fit_notes?: string | null;
  covered_parking?: boolean | null;
  ev_charger?: boolean | null;
  oversized_allowed?: boolean | null;
  backing_in_required?: boolean | null;
  parallel_parking_only?: boolean | null;
  status: string | null;
  created_at?: string | null;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

const fallbackSpots: ParkingSpot[] = [
  { title: "2 Blocks From Beach", town: "Ocean City", price: 25, description: "Walkable beach access near boardwalk. Great for full beach days and weekends.", image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", available: true, vehicle_size: "SUV Friendly", max_vehicle_length: "Up to 18 ft", height_restriction: "No height restriction", fit_notes: "Fits sedans and most SUVs.", covered_parking: false, ev_charger: false, oversized_allowed: false },
  { title: "Boardwalk Event Parking", town: "Ocean City", price: 40, description: "Premium parking near events, concerts, and summer nightlife.", image_url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80", available: true, vehicle_size: "SUV Friendly", max_vehicle_length: "Up to 18 ft", height_restriction: "No height restriction", fit_notes: "Fits sedans and most SUVs.", covered_parking: false, ev_charger: false, oversized_allowed: false },
  { title: "Cape May Cottage Spot", town: "Cape May", price: 35, description: "Quiet residential parking close to shopping, dining, and beach access.", image_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80", available: true, vehicle_size: "SUV Friendly", max_vehicle_length: "Up to 18 ft", height_restriction: "No height restriction", fit_notes: "Fits sedans and most SUVs.", covered_parking: false, ev_charger: false, oversized_allowed: false },
];

const events = ["Night in Venice", "Spring Block Party", "First Night", "Cape May Wedding Weekend"];



function ShorePriceAIPanel() {
  return (
    <section id="shoreprice-ai" className="mx-auto max-w-7xl px-5 py-8">
      <div className="rounded-[2.5rem] border-4 border-[#082743] bg-[#FFF3D6] p-6 shadow-[8px_8px_0_#082743] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Host Pricing Intelligence
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#082743] md:text-5xl">
              ShorePrice™ AI
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Smart pricing recommendations for shore parking hosts based on
              demand, location, duration, vehicle fit, events, and occupancy.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                ["Demand", "Live area pressure"],
                ["Duration", "1 hr to full day"],
                ["Events", "Weekend + venue boosts"],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-2xl border-4 border-[#082743] bg-white p-4 shadow">
                  <p className="text-xl font-black text-[#082743]">
                    {title}
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-600">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-5 shadow-[6px_6px_0_#082743]">
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Example Host Recommendation
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#F4F7FB] p-4 text-center">
                <p className="text-xs font-black uppercase text-slate-500">
                  Current
                </p>
                <p className="text-4xl font-black text-[#082743]">
                  $28
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFD33D] p-4 text-center">
                <p className="text-xs font-black uppercase text-[#082743]">
                  Suggested
                </p>
                <p className="text-4xl font-black text-[#082743]">
                  $34
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border-4 border-[#082743] bg-[#EAF7F6] p-4">
              <p className="text-sm font-black uppercase text-[#1697D6]">
                Why
              </p>
              <p className="mt-2 font-bold text-slate-700">
                High boardwalk demand, strong ShoreScore™, 2-hour booking window,
                and weekend beach traffic support a higher host rate.
              </p>
            </div>

            <a
              href="#host-center"
              className="mt-5 block rounded-full border-4 border-[#082743] bg-[#082743] px-6 py-4 text-center font-black uppercase text-white shadow-[4px_4px_0_#FFD33D]"
            >
              Open Host Center
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function UnifiedParkingHero() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-6 pb-10">
      <div className="overflow-hidden rounded-[2.5rem] border-4 border-[#082743] bg-gradient-to-br from-[#082743] via-[#0f3d63] to-[#1697D6] shadow-[10px_10px_0_#082743]">
        <div className="grid gap-10 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border-2 border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wide text-white backdrop-blur">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[#FFD33D]" />
              Live Shore Parking Network
            </div>

            <h1 className="mt-6 max-w-3xl text-3xl md:text-5xl font-black leading-tight text-white lg:text-7xl">
              Find Parking Fast.
            </h1>

            <p className="mt-5 max-w-2xl text-lg font-bold text-slate-200">
              Real-time parking availability, live demand zones, smart recommendations,
              and premium shore parking all in one intelligent parking platform.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-8 py-4 text-lg font-black uppercase tracking-wide text-[#082743] shadow-[5px_5px_0_#021524] transition hover:-translate-y-1">
                Find Parking Now
              </button>

              <button className="rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-lg font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20">
                Open Live Map
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Live Availability",
                "AI Guidance",
                "Verified Parking",
                "Fast Exit Routes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-black text-white backdrop-blur"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border-4 border-white/20 bg-white/10 backdrop-blur">
            <div className="absolute inset-0 opacity-15">
              <div className="grid h-full w-full grid-cols-5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="border border-white/30" />
                ))}
              </div>
            </div>

            {[
              ["18%", "25%", "bg-green-500"],
              ["38%", "55%", "bg-yellow-400"],
              ["58%", "72%", "bg-red-500"],
              ["70%", "35%", "bg-orange-500"],
            ].map(([top, left, color], i) => (
              <div key={i} className="absolute" style={{ top, left }}>
                <div className={`h-7 w-7 rounded-full border-4 border-white ${color} animate-pulse shadow-2xl`} />
              </div>
            ))}

            <div className="absolute bottom-4 left-4 right-4 rounded-2xl border-2 border-white/20 bg-[#082743]/80 p-4 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-[#FFD33D]">
                    Live Shore Activity
                  </p>

                  <p className="mt-1 text-sm font-bold text-white">
                    Premium spots filling quickly near the boardwalk.
                  </p>
                </div>

                <div className="rounded-full bg-[#FFD33D] px-3 py-1 text-[10px] font-black uppercase text-[#082743]">
                  Live
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`${small ? "h-10 w-10" : "h-16 w-16"} relative rounded-2xl border-[3px] border-[#082743] bg-gradient-to-br from-[#FFD33D] to-[#FF8A3D] shadow-[4px_4px_0_#082743]`}>
        <MapPin className={`${small ? "h-7 w-7" : "h-11 w-11"} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#082743]`} />
        <span className="absolute left-1/2 top-[49%] -translate-x-1/2 -translate-y-1/2 text-xs font-black text-white">P</span>
      </div>
      <div className="leading-[0.86]">
        <p className={`${small ? "text-xs" : "text-sm"} font-black italic text-white drop-shadow-[2px_2px_0_#082743]`}>The</p>
        <p className={`${small ? "text-xl" : "text-4xl"} font-black uppercase text-white drop-shadow-[3px_3px_0_#082743]`}>Last</p>
        <p className={`${small ? "text-xl" : "text-4xl"} font-black uppercase text-[#FFD33D] drop-shadow-[3px_3px_0_#082743]`}>Spot</p>
      </div>
    </div>
  );
}






function HostCenterCompactPanel() {
  return (
    <section id="host-center" className="mx-auto max-w-7xl px-5 py-8">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-6 shadow-[8px_8px_0_#082743] md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">Host Center</p>
            <h2 className="mt-2 text-4xl font-black text-[#082743]">Turn Your Spot Into Income</h2>
            <p className="mt-3 max-w-2xl font-bold text-slate-700">
              List your driveway, set availability, and use ShorePrice™ AI to make smarter pricing decisions during beach weekends and events.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="/earn" className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-6 py-4 text-center font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]">
                List My Spot
              </a>
              <a href="#shoreprice-ai" className="rounded-full border-4 border-[#082743] bg-white px-6 py-4 text-center font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]">
                ShorePrice™ AI
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-5 shadow">
            <p className="text-xs font-black uppercase tracking-wide text-[#1697D6]">Host Snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[["Listings", "Manage spots"], ["Bookings", "Track stays"], ["Earnings", "See revenue"], ["Pricing", "Optimize rates"]].map(([title, desc]) => (
                <div key={title} className="rounded-2xl bg-[#FFF3D6] p-4">
                  <p className="font-black text-[#082743]">{title}</p>
                  <p className="text-xs font-bold text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



function Nav() {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const desktopGroups: { title: string; items: [string, string][] }[] = [
    {
      title: "Explore",
      items: [
        ["Find Parking", "#interactive-map"],
        ["Reserve Spot", "#reserve-now"],
        ["Checkout", "#smart-checkout"],
      ],
    },
    {
      title: "Host",
      items: [
        ["Earn With Your Spot", "/earn"],
        ["Host Center", "/earn"],
      ],
    },
  ];

  const desktopLinks: [string, string][] = [
    ["How It Works", "#how-it-works"],
    ["Contact", "#contact"],
  ];

  const mobileMenuItems: [string, string][] = [
    ["🚗 Find Parking", "#interactive-map"],
    ["💰 Earn With Your Spot", "/earn"],
    ["❓ How It Works", "#how-it-works"],
    ["📞 Contact", "#contact"],
  ];

  const bottomItems: [string, string, string][] = [
    ["🔍", "Find", "#interactive-map"],
    ["📍", "Reserve", "#reserve-now"],
    ["💳", "Checkout", "#smart-checkout"],
    ["💰", "Earn", "/earn"],
  ];

  return (
    <>
      <nav className="sticky top-0 z-[300] border-b-4 border-[#082743] bg-[#FFF8EB]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-visible">
          <a
            href="#top"
            className="shrink-0 rounded-2xl border-4 border-[#082743] bg-gradient-to-br from-[#1697D6] to-[#082743] px-3 py-2 shadow-[4px_4px_0_#082743]"
          >
            <Logo small />
          </a>

          <div className="hidden flex-1 items-center gap-3 overflow-visible whitespace-nowrap px-2 py-2 md:flex">
            {desktopGroups.map((group) => (
              <div key={group.title} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setOpenGroup(openGroup === group.title ? null : group.title)}
                  className="rounded-full border-2 border-[#082743] bg-white px-4 py-2 text-xs font-black uppercase text-[#082743] shadow-[2px_2px_0_#082743] transition hover:bg-[#FFD33D]"
                >
                  {group.title} ▾
                </button>

                {openGroup === group.title && (
                  <div className="absolute left-0 top-full z-[9999] mt-3 min-w-[240px] rounded-3xl border-4 border-[#082743] bg-[#FFF8EB] p-3 shadow-[6px_6px_0_#082743]">
                    <div className="grid gap-2">
                      {group.items.map(([label, href]) => (
                        <a
                          key={label}
                          href={href}
                          onClick={() => setOpenGroup(null)}
                          className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-[#082743] shadow transition hover:bg-[#FFD33D]"
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {desktopLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="rounded-full border-2 border-[#082743] bg-white px-4 py-2 text-xs font-black uppercase text-[#082743] shadow-[2px_2px_0_#082743] transition hover:bg-[#FFD33D]"
              >
                {label}
              </a>
            ))}
          </div>

          <a
            href="#interactive-map"
            className="ml-auto hidden shrink-0 rounded-xl border-4 border-[#082743] bg-[#FFD33D] px-4 py-3 text-sm font-black uppercase shadow-[3px_3px_0_#082743] md:inline-flex"
          >
            Get Started
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="ml-auto rounded-xl border-4 border-[#082743] bg-[#FFD33D] px-4 py-3 text-sm font-black uppercase shadow-[3px_3px_0_#082743] md:hidden"
            aria-label="Open mobile menu"
          >
            ☰ Menu
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border-4 border-[#082743] bg-white p-3 shadow-[5px_5px_0_#082743] md:hidden">
            {mobileMenuItems.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl bg-[#FFF3D6] px-4 py-3 text-base font-black text-[#082743] shadow transition hover:bg-[#FFD33D]"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {openGroup && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpenGroup(null)}
          className="fixed inset-0 z-[250] hidden bg-transparent md:block"
        />
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-[#082743] bg-[#FFF8EB] px-2 py-2 shadow-[0_-4px_0_#082743] md:hidden">
        <div className="grid grid-cols-4 gap-1">
          {bottomItems.map(([icon, label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-2xl bg-white px-1 py-2 text-center text-[10px] font-black uppercase text-[#082743] shadow"
            >
              <span className="block text-lg leading-none">{icon}</span>
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}


function Stat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-3xl border-4 border-[#082743] bg-white p-5 text-center shadow-[6px_6px_0_#082743]"><p className="text-4xl font-black text-[#1697D6]">{value}</p><p className="text-sm font-black uppercase">{label}</p></div>;
}


function ReviewModal({ booking, onClose, onSaved }: { booking: BookingRequest; onClose: () => void; onSaved: () => void }) {
  const [reviewType, setReviewType] = useState("renter_to_owner");
  const [rating, setRating] = useState(5);
  const [communicationRating, setCommunicationRating] = useState(5);
  const [accuracyRating, setAccuracyRating] = useState(5);
  const [cleanlinessRating, setCleanlinessRating] = useState(5);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function submitReview() {
    setStatus("saving");

    if (!supabase) {
      setStatus("error");
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      booking_id: booking.id,
      reviewer_email: "admin@thelastspotapp.com",
      reviewed_email: booking.customer_email,
      review_type: reviewType,
      rating,
      communication_rating: communicationRating,
      accuracy_rating: accuracyRating,
      cleanliness_rating: cleanlinessRating,
      comment,
    });

    if (error) {
      console.error("Review insert failed:", error);
      setStatus("error");
      return;
    }

    setStatus("saved");
    onSaved();
    setTimeout(onClose, 900);
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-[#082743]/70 p-4 backdrop-blur">
      <div className="w-full max-w-lg rounded-[2rem] border-4 border-[#082743] bg-[#FFF8EB] p-5 shadow-[10px_10px_0_#082743]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Shore Trust Review</p>
            <h2 className="text-3xl font-black">Rate this booking</h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-white px-3 py-2 font-black shadow">×</button>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow">
          <p className="font-black">{booking.spot_title}</p>
          <p className="text-sm font-bold text-slate-600">{booking.customer_name} — {booking.customer_email}</p>
        </div>

        <div className="mt-4 grid gap-3">
          <select value={reviewType} onChange={(e) => setReviewType(e.target.value)} className="rounded-xl border-2 border-[#082743] p-3 font-bold">
            <option value="renter_to_owner">Renter reviewing owner/spot</option>
            <option value="owner_to_renter">Owner reviewing renter</option>
          </select>

          {[
            ["Overall Rating", rating, setRating],
            ["Communication", communicationRating, setCommunicationRating],
            ["Accuracy / Instructions", accuracyRating, setAccuracyRating],
            ["Cleanliness / Respect", cleanlinessRating, setCleanlinessRating],
          ].map(([label, value, setter]: any) => (
            <label key={label} className="rounded-xl bg-white p-3 font-bold shadow">
              <span>{label}: {value}/5</span>
              <input type="range" min="1" max="5" value={value} onChange={(e) => setter(Number(e.target.value))} className="mt-2 w-full" />
            </label>
          ))}

          <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Review comment..." className="min-h-[100px] rounded-xl border-2 border-[#082743] p-3 font-bold" />
        </div>

        <button onClick={submitReview} disabled={status === "saving" || status === "saved"} className="mt-4 w-full rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-4 font-black uppercase shadow-[4px_4px_0_#082743]">
          {status === "saved" ? "Review Saved" : status === "saving" ? "Saving..." : "Submit Review"}
        </button>
        {status === "error" && <p className="mt-3 rounded-xl bg-orange-100 p-3 font-bold">Review failed. Check reviews table permissions.</p>}
      </div>
    </div>
  );
}



function SpotModal({ spot, onClose }: { spot: ParkingSpot; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [rate, setRate] = useState("2_hours");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submitRequest() {
    setStatus("sending");

    if (supabase) {
      const { error } = await supabase.from("booking_requests").insert({
        spot_title: spot.title,
        spot_town: spot.town,
        spot_price: spot.price,
        customer_name: name,
        customer_email: email,
        requested_date: date,
        requested_duration: rate,
        status: "pending",
      });

      if (error) {
        console.error(error);
        setStatus("error");
        return;
      }
    }

    setStatus("sent");
  }

  function goHomeFromModal() {
    onClose();

    if (typeof window !== "undefined") {
      window.location.hash = "top";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#082743]/80 backdrop-blur"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex h-[100dvh] w-full flex-col bg-[#FFF8EB] md:mx-auto md:max-w-2xl md:border-x-4 md:border-[#082743]">
        <div className="sticky top-0 z-20 border-b-4 border-[#082743] bg-white px-4 py-3 shadow">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border-4 border-[#082743] bg-[#FFF3D6] px-4 py-2 text-sm font-black text-[#082743] shadow-[3px_3px_0_#082743]"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={goHomeFromModal}
              className="rounded-2xl px-2 py-1 text-center text-sm font-black uppercase text-[#082743]"
            >
              The Last Spot
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close reservation"
              className="rounded-full border-4 border-[#082743] bg-[#FF8A3D] px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0_#082743]"
            >
              X
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-28 pt-4">
          <div className="overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-white shadow-[6px_6px_0_#082743]">
            <img
              src={spot.image_url || fallbackSpots[0].image_url!}
              className="h-36 w-full object-cover md:h-52"
              alt={spot.title}
            />

            <div className="p-4">
              <p className="text-xs font-black uppercase text-[#1697D6]">
                Verified Spot
              </p>

              <h2 className="mt-1 text-3xl font-black text-[#082743]">
                {spot.title}
              </h2>

              <p className="mt-2 rounded-2xl bg-[#FFF3D6] p-3 text-sm font-bold text-slate-700">
                {spot.description || "Verified local parking spot."}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-2xl bg-[#FFF3D6] p-3 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-500">Town</p>
                  <p className="text-sm font-black text-[#082743]">{spot.town}</p>
                </div>

                <div className="rounded-2xl bg-[#FFF3D6] p-3 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-500">Price</p>
                  <p className="text-sm font-black text-[#082743]">${spot.price}/day</p>
                </div>

                <div className="rounded-2xl bg-[#FFF3D6] p-3 text-center">
                  <p className="text-[10px] font-black uppercase text-slate-500">Access</p>
                  <p className="text-sm font-black text-[#082743]">QR</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border-4 border-[#082743] bg-[#EAF7F6] p-4">
                <p className="text-xs font-black uppercase text-[#1697D6]">
                  Vehicle Fit
                </p>

                <p className="mt-1 text-xl font-black text-[#082743]">
                  {spot.vehicle_size || "Vehicle fit available on request"}
                </p>

                <div className="mt-3 grid gap-2 text-sm font-bold text-slate-700">
                  <p>Max length: {spot.max_vehicle_length || "Not listed"}</p>
                  <p>Height: {spot.height_restriction || "Not listed"}</p>
                  <p>Covered: {spot.covered_parking ? "Yes" : "No"}</p>
                  <p>EV charger: {spot.ev_charger ? "Yes" : "No"}</p>
                </div>

                {spot.fit_notes && (
                  <p className="mt-3 rounded-xl bg-white p-3 text-sm font-bold">
                    {spot.fit_notes}
                  </p>
                )}
              </div>

              <div className="mt-4 rounded-2xl border-4 border-[#082743] bg-white p-4 shadow">
                <p className="text-xs font-black uppercase text-[#1697D6]">
                  Shore Trust Score
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FFD33D] px-4 py-2 text-xl font-black text-[#082743]">
                    {spot.trust_score || 80}/100
                  </span>

                  {spot.verified_owner && (
                    <span className="rounded-full bg-[#EAF7F6] px-4 py-2 text-xs font-black uppercase">
                      Verified Owner
                    </span>
                  )}

                  {(spot.average_rating || 0) > 0 && (
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase shadow">
                      ⭐ {spot.average_rating} ({spot.total_reviews || 0})
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border-4 border-[#082743] bg-white p-4">
                <h3 className="text-xl font-black text-[#082743]">
                  Reserve this spot
                </h3>

                <div className="mt-3 grid gap-3">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="rounded-xl border-2 border-[#082743] p-3 font-bold"
                  />

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="rounded-xl border-2 border-[#082743] p-3 font-bold"
                  />

                  <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Requested date e.g. July 12"
                    className="rounded-xl border-2 border-[#082743] p-3 font-bold"
                  />

                  <select
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="rounded-xl border-2 border-[#082743] p-3 font-bold"
                  >
                    <option value="1_hour">1 hour</option>
                    <option value="2_hours">2 hours</option>
                    <option value="4_hours">4 hours</option>
                    <option value="6_hours">6 hours</option>
                    <option value="full_day">Full day</option>
                    <option value="event">Event parking</option>
                  </select>
                </div>

                <button
                  disabled={status === "sending" || status === "sent"}
                  onClick={submitRequest}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-4 font-black uppercase shadow-[4px_4px_0_#082743]"
                >
                  <Send className="h-5 w-5" />
                  {status === "sent"
                    ? "Request Sent"
                    : status === "sending"
                    ? "Sending..."
                    : "Reserve Spot"}
                </button>

                {status === "error" && (
                  <p className="mt-3 rounded-xl bg-orange-100 p-3 text-sm font-bold">
                    Booking table not created yet. The UI works; create the booking_requests table next.
                  </p>
                )}

                {status === "sent" && (
                  <p className="mt-3 rounded-xl bg-green-100 p-3 text-sm font-bold">
                    Success. Your booking request was saved.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 z-20 border-t-4 border-[#082743] bg-white p-4 shadow-[0_-4px_0_#082743]">
          <button
            type="button"
            onClick={submitRequest}
            disabled={status === "sending" || status === "sent"}
            className="w-full rounded-full border-4 border-[#082743] bg-[#FFD33D] px-6 py-4 text-lg font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]"
          >
            {status === "sent"
              ? "Request Sent"
              : status === "sending"
              ? "Sending..."
              : `Reserve for $${spot.price}/day`}
          </button>
        </div>
      </div>
    </div>
  );
}

function PhonePreview({ spots, loading, selectedTown, setSelectedTown, onSpotClick, onMenuClick, onNotificationsClick }: {
  spots: ParkingSpot[];
  loading: boolean;
  selectedTown: string;
  setSelectedTown: (town: string) => void;
  onSpotClick: (spot: ParkingSpot) => void;
  onMenuClick: () => void;
  onNotificationsClick: () => void;
}) {
  const visible = spots.filter((spot) => spot.town === selectedTown && spot.available !== false);
  return (
    <div className="mx-auto w-full max-w-[355px] rounded-[2.8rem] border-[10px] border-[#111827] bg-[#111827] shadow-2xl">
      <div className="min-h-[620px] overflow-hidden rounded-[2rem] bg-[#FFF8EB]">
        <div className="relative h-56 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" className="h-full w-full object-cover" alt="Beach" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082743]/10 to-[#FFF8EB]" />
          
          <a
            href="#top"
            aria-label="Back to home"
            className="absolute left-2 top-2 z-40 scale-75 rounded-2xl transition hover:scale-80"
          >
            <Logo small />
          </a>

          
        </div>
        <div className="-mt-10 rounded-t-[2rem] bg-[#FFF3D6] p-4 pt-5">
          <button
            type="button"
            onClick={() => visible[0] && onSpotClick(visible[0])}
            className="mb-3 w-full rotate-[-2deg] rounded-full border-4 border-[#082743] bg-[#FF8A3D] px-4 py-2 text-center font-black uppercase text-white shadow-[5px_5px_0_#082743] transition hover:scale-[1.02]"
          >
            Tap a spot to reserve.
          </button>
          <h2 className="text-center text-4xl font-black uppercase leading-none">Find your shore spot.</h2>
          <p className="mt-2 text-center text-sm font-black text-[#1697D6]">Now using your live Supabase listings.</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {["Ocean City", "Cape May"].map((town) => (
              <button key={town} onClick={() => setSelectedTown(town)} className={`rounded-2xl border-2 border-[#082743] px-3 py-3 text-left text-sm font-black shadow-[3px_3px_0_#082743] ${selectedTown === town ? "bg-[#FFD33D]" : "bg-white"}`}>
                {town === "Ocean City" ? "🎡" : "🏠"} {town}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {loading && <div className="rounded-2xl bg-white p-4 text-center font-black shadow-md">Loading live spots...</div>}
            {!loading && visible.length === 0 && <div className="rounded-2xl bg-white p-4 text-center font-black shadow-md">No live spots yet in {selectedTown}.</div>}
            {!loading && visible.slice(0, 3).map((spot) => (
              <button key={`${spot.id || spot.title}`} onClick={() => onSpotClick(spot)} className="flex w-full gap-3 rounded-2xl bg-white p-2 text-left shadow-md transition hover:scale-[1.01]">
                <img src={spot.image_url || fallbackSpots[0].image_url!} className="h-20 w-20 rounded-xl object-cover" alt={spot.title} />
                <div>
                  <p className="font-black">{spot.title}</p>
                  <p className="text-xs font-bold text-slate-500">{spot.town} • Tap to view</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <p className="w-fit rounded-full bg-[#EAF7F6] px-2 py-1 text-[10px] font-black uppercase">{spot.vehicle_size || "Vehicle fit listed"}</p>
                    {spot.verified_owner && <p className="w-fit rounded-full bg-[#FFD33D] px-2 py-1 text-[10px] font-black uppercase">Verified Owner</p>}
                    <p className="w-fit rounded-full bg-white px-2 py-1 text-[10px] font-black uppercase shadow">Trust {spot.trust_score || 80}</p>
                  </div>
                  <p className="text-xl font-black">${spot.price}<span className="text-xs">/day</span></p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}




















function MobileQuickActions({
  onMenuClick,
  onNotificationsClick,
}: {
  onMenuClick: () => void;
  onNotificationsClick: () => void;
}) {
  return null;
}


function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const links = [
    ["Find Parking", "#interactive-map"],
    ["Reserve Spot", "#reserve-now"],
    ["Checkout", "#smart-checkout"],
    ["Host Center", "#host-center"],
    ["My Session", "#smart-checkout"],
    ["Parking History", "#smart-checkout"],
    ["Profile", "#top"],
  ];

  return (
    <div onClick={onClose} className="fixed inset-0 z-[999] bg-black/60 p-3">
      <div onClick={(e) => e.stopPropagation()} className="mx-auto max-h-[calc(100dvh-24px)] w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b-4 border-[#082743] bg-[#FFF3D6] p-4">
          <p className="text-3xl font-black text-[#082743]">Menu</p>
          <button type="button" onClick={onClose} aria-label="Close menu" className="rounded-full border-4 border-[#082743] bg-[#FF8A3D] px-4 py-2 font-black text-white shadow-[3px_3px_0_#082743]">
            X
          </button>
        </div>

        <div className="grid max-h-[calc(100dvh-120px)] gap-3 overflow-y-auto p-4 pb-8">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={onClose} className="rounded-2xl bg-[#FFF3D6] p-4 font-black text-[#082743] shadow">
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


function NotificationsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  const notifications = [
    "New booking request received",
    "Beach demand increasing this weekend",
    "QR reservation successfully verified",
    "AI pricing recommendation available",
  ];

  return (
    <div onClick={onClose} className="fixed inset-0 z-[1000] bg-black/60 p-3">
      <div onClick={(e) => e.stopPropagation()} className="mx-auto max-h-[calc(100dvh-24px)] w-full max-w-sm overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b-4 border-[#082743] bg-[#FFF3D6] p-4">
          <p className="text-2xl font-black text-[#082743]">Notifications</p>
          <button type="button" onClick={onClose} aria-label="Close notifications" className="rounded-full border-4 border-[#082743] bg-[#FF8A3D] px-4 py-2 font-black text-white shadow-[3px_3px_0_#082743]">
            X
          </button>
        </div>

        <div className="grid max-h-[calc(100dvh-120px)] gap-3 overflow-y-auto p-4 pb-8">
          {notifications.map((item) => (
            <div key={item} className="rounded-2xl bg-[#F4F4F4] p-4 font-bold text-[#082743]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}









function LiveActivityEnginePanel() {
  
  const activities = [
    "🚨 Boardwalk 92% Full",
    "⚡ 3 Spots Left • Downtown",
    "♻️ Spot Available Again • 11th Street",
    "🏖️ Beach Access Parking Available",
    "🔥 Event Parking Filling Fast",
    "📍 Premium Spot Available • 12th Street",
    "🎵 Event Parking Nearly Full",
    "🚗 North End Parking Available",
  ];


  return (
    <section id="live-activity" className="mx-auto max-w-7xl px-5 py-6">
      <div className="overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#082743] shadow-[8px_8px_0_#082743]">
        <div className="flex items-center gap-4 border-b-4 border-[#1697D6] bg-[#FFD33D] px-5 py-3">
          <div className="h-3 w-3 animate-pulse rounded-full bg-red-500" />

          <p className="text-sm font-black uppercase tracking-wide text-[#082743]">
            Live Parking Marketplace
          </p>

          <div className="rounded-full bg-[#082743] px-3 py-1 text-[10px] font-black uppercase text-white">
            Live Spots
          </div>
        </div>

        <div className="relative overflow-hidden py-4">
          <div className="ticker-track flex min-w-max items-center gap-6 whitespace-nowrap px-6">
            {[...activities, ...activities].map((activity, index) => (
              <div
                key={`${activity}-${index}`}
                className="flex items-center gap-3 rounded-full border-2 border-white/20 bg-white/10 px-5 py-3 text-sm font-black text-white backdrop-blur"
              >
                <div className="h-2 w-2 rounded-full bg-[#FFD33D]" />
                {activity}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .ticker-track {
            animation: tickerScroll 45s linear infinite;
          }

          @keyframes tickerScroll {
            0% {
              transform: translateX(0%);
            }

            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </div>
    </section>
  );
}







function InteractiveParkingMapPanel() {
  const mapPins = [
    {
      top: "18%",
      left: "22%",
      color: "bg-green-500",
      label: "Open",
    },
    {
      top: "35%",
      left: "48%",
      color: "bg-yellow-400",
      label: "Moderate",
    },
    {
      top: "50%",
      left: "70%",
      color: "bg-orange-500",
      label: "High Demand",
    },
    {
      top: "65%",
      left: "30%",
      color: "bg-red-500",
      label: "Almost Full",
    },
    {
      top: "28%",
      left: "78%",
      color: "bg-green-500",
      label: "New Spot",
    },
  ];

  return (
    <section id="interactive-map" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 41
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Interactive Live Parking Map
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Explore live parking activity, demand heat zones, and real-time
              availability through an intelligent interactive parking network.
            </p>
          </div>

          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]">
            Live Map Active
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-gradient-to-br from-[#1697D6] via-[#8ad7ff] to-[#dff6ff]">
            <div className="absolute inset-0 opacity-20">
              <div className="grid h-full w-full grid-cols-6">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="border border-white/40" />
                ))}
              </div>
            </div>

            <div className="absolute left-[8%] top-[8%] rounded-full bg-[#082743] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
              Ocean City Live Parking Network
            </div>

            {mapPins.map((pin, index) => (
              <div
                key={index}
                className="absolute"
                style={{
                  top: pin.top,
                  left: pin.left,
                }}
              >
                <div className="relative flex flex-col items-center">
                  <div className={`h-6 w-6 rounded-full border-4 border-white ${pin.color} animate-pulse shadow-xl`} />

                  <div className="mt-2 rounded-full border-2 border-[#082743] bg-white px-3 py-1 text-[10px] font-black uppercase text-[#082743] shadow">
                    {pin.label}
                  </div>
                </div>
              </div>
            ))}

            <div className="absolute bottom-5 left-5 right-5 grid gap-3 md:grid-cols-4">
              {[
                ["Green", "Easy Parking"],
                ["Yellow", "Moderate Demand"],
                ["Orange", "High Demand"],
                ["Red", "Almost Full"],
              ].map(([color, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border-2 border-[#082743] bg-white/90 p-3 backdrop-blur"
                >
                  <div className="hidden md:flex items-center gap-3">
                    <div
                      className={`h-4 w-4 rounded-full ${
                        color === "Green"
                          ? "bg-green-500"
                          : color === "Yellow"
                          ? "bg-yellow-400"
                          : color === "Orange"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    />

                    <div>
                      <p className="text-xs font-black uppercase text-[#082743]">
                        {color}
                      </p>

                      <p className="text-[11px] font-bold text-slate-700">
                        {label}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
              <p className="text-2xl font-black">
                Smart Zone Intelligence
              </p>

              <div className="mt-5 grid gap-3">
                {[
                  "Fastest beach access",
                  "Low traffic exits",
                  "Family-friendly parking",
                  "Event congestion alerts",
                  "Premium availability",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 p-3 font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFD33D] p-6 text-[#082743]">
              <p className="text-2xl font-black">
                Real-Time Marketplace
              </p>

              <p className="mt-4 font-bold">
                Dynamic parking activity updates help users instantly visualize
                parking demand and availability across the shore.
              </p>
            </div>

            <div className="rounded-[2rem] border-4 border-[#082743] bg-[#1697D6] p-6 text-white">
              <p className="text-2xl font-black">
                AI Navigation Layer
              </p>

              <p className="mt-4 font-bold text-slate-100">
                Future-ready foundation for predictive parking routing,
                intelligent recommendations, and smart city integrations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AISmartParkingAssistantPanel() {
  const recommendations = [
    {
      title: "Best Beach Access",
      desc: "2-minute walk to boardwalk with moderate demand.",
    },
    {
      title: "Fast Exit Route",
      desc: "Recommended for avoiding post-event traffic congestion.",
    },
    {
      title: "Budget Friendly",
      desc: "Lowest pricing within walking distance tonight.",
    },
    {
      title: "Family Friendly",
      desc: "Well-lit area near restrooms and food vendors.",
    },
  ];

  const predictions = [
    "Boardwalk inventory expected to tighten in 25 minutes",
    "Rain forecast increasing premium parking demand",
    "Concert traffic likely to spike after 6:30 PM",
    "North-end lots projected to fill before sunset",
  ];

  return (
    <section id="ai-assistant" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 40
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              AI Smart Parking Assistant
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              The Last Spot now introduces intelligent parking recommendations,
              predictive demand insights, and personalized mobility guidance.
            </p>
          </div>

          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]">
            AI Guidance Active
          </div>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-6">
            <p className="text-3xl font-black text-[#082743]">
              Smart Recommendations
            </p>

            <div className="mt-5 grid gap-4">
              {recommendations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border-4 border-[#082743] bg-white p-4 shadow"
                >
                  <p className="text-xl font-black text-[#082743]">
                    {item.title}
                  </p>

                  <p className="mt-2 font-bold text-slate-700">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
            <p className="text-3xl font-black">
              Predictive Demand Signals
            </p>

            <div className="mt-5 grid gap-3">
              {predictions.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 font-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border-4 border-[#082743] bg-[#1697D6] p-6 text-white">
          <p className="text-3xl font-black">
            AI Parking Guidance
          </p>

          <div className="mt-5 grid gap-3">
            {[
              "Best parking near the beach right now?",
              "Cheapest parking near tonight's concert?",
              "Safest area for family parking?",
              "Fastest exit route after the event?",
            ].map((question) => (
              <div
                key={question}
                className="rounded-2xl bg-white/10 p-4 font-black"
              >
                {question}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SmartTrustSignalsPanel() {
  const notifications = [
    "Reservation confirmed near Ocean City boardwalk",
    "Only 2 premium spots remaining nearby",
    "Verified host responded instantly",
    "Weekend demand surge detected",
    "QR parking pass activated successfully",
  ];

  const trustSignals = [
    { title: "Verified Host", desc: "Identity and parking ownership confirmed" },
    { title: "98% Check-In Success", desc: "Trusted operational parking history" },
    { title: "Active Today", desc: "Recently active host with live availability" },
    { title: "Top Rated Zone", desc: "High booking satisfaction and reliability" },
  ];

  return (
    <section id="trust-signals" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 39</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">Smart Notifications + Trust Signals</h2>
            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              The Last Spot now reinforces marketplace confidence using smart alerts,
              verified-host indicators, demand urgency, and operational trust signals.
            </p>
          </div>
          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]">
            Trust Layer Active
          </div>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
            <p className="text-3xl font-black">Smart Notification Feed</p>
            <div className="mt-5 grid gap-3">
              {notifications.map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-4 font-black">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-6">
            <p className="text-3xl font-black text-[#082743]">Marketplace Trust Signals</p>
            <div className="mt-5 grid gap-4">
              {trustSignals.map((signal) => (
                <div key={signal.title} className="rounded-2xl border-4 border-[#082743] bg-white p-4 shadow">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xl font-black text-[#082743]">{signal.title}</p>
                    <div className="shrink-0 rounded-full border-2 border-[#082743] bg-[#1697D6] px-3 py-1 text-[10px] font-black uppercase text-white">
                      Trusted
                    </div>
                  </div>
                  <p className="mt-2 font-bold text-slate-700">{signal.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#1697D6] p-6 text-white">
            <p className="text-2xl font-black">User Confidence</p>
            <p className="mt-3 font-bold text-slate-100">Visible trust systems improve booking confidence and retention.</p>
          </div>
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFD33D] p-6 text-[#082743]">
            <p className="text-2xl font-black">Marketplace Urgency</p>
            <p className="mt-3 font-bold">Smart alerts create healthy demand pressure and engagement.</p>
          </div>
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
            <p className="text-2xl font-black">Host Reputation</p>
            <p className="mt-3 font-bold text-slate-200">Reliable hosts become more visible and valuable over time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}



function HostOnboardingDashboardPanel() {
  return (
    <section id="host-onboarding" className="mx-auto max-w-7xl px-5 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
          <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
            Become A Host
          </p>

          <h2 className="mt-3 text-4xl font-black text-[#082743]">
            List Your Parking Spot
          </h2>

          <p className="mt-3 font-bold text-slate-700">
            Start with the basics. This form creates the clean host onboarding path
            that will later connect to Supabase and Stripe payouts.
          </p>

          <div className="mt-6 grid gap-4">
            <input
              className="rounded-2xl border-4 border-[#082743] bg-[#FFF8EB] px-4 py-3 font-bold outline-none"
              placeholder="Spot address or cross street"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <input
                className="rounded-2xl border-4 border-[#082743] bg-[#FFF8EB] px-4 py-3 font-bold outline-none"
                placeholder="Town"
              />

              <input
                className="rounded-2xl border-4 border-[#082743] bg-[#FFF8EB] px-4 py-3 font-bold outline-none"
                placeholder="Daily price"
              />
            </div>

            <textarea
              className="min-h-[120px] rounded-2xl border-4 border-[#082743] bg-[#FFF8EB] px-4 py-3 font-bold outline-none"
              placeholder="Describe the spot, access notes, vehicle size, gate code rules, or event availability"
            />

            <button
              type="button"
              className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-8 py-4 text-lg font-black uppercase tracking-wide text-[#082743] shadow-[5px_5px_0_#082743] transition hover:-translate-y-1"
            >
              Submit Spot For Review
            </button>
          </div>
        </div>

        <div id="host-dashboard" className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-8 text-white shadow-[8px_8px_0_#082743]">
          <p className="text-sm font-black uppercase tracking-wide text-[#FFD33D]">
            Host Dashboard
          </p>

          <h2 className="mt-3 text-4xl font-black">
            Earnings Snapshot
          </h2>

          <div className="mt-6 grid gap-4">
            {[
              ["$4,250", "Projected monthly top-host revenue"],
              ["34%", "Event weekend earnings boost"],
              ["92", "AI host opportunity score"],
              ["98%", "Successful check-in rate"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <p className="text-3xl font-black text-[#FFD33D]">
                  {value}
                </p>

                <p className="mt-1 font-bold text-slate-200">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function UnifiedIntelligenceLayer() {
  return (
    <section id="intelligence" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2.5rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Intelligent Parking Network
            </p>

            <h2 className="mt-2 text-3xl md:text-5xl font-black text-[#082743]">
              Smarter Shore Parking
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Live demand tracking, AI parking recommendations, verified hosts,
              and real-time availability — all designed to make parking faster,
              easier, and less stressful.
            </p>
          </div>

          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#082743] shadow-[4px_4px_0_#082743]">
            AI + Live Marketplace
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {[
            ["AI Recommendations","Best-value parking, fastest exits, and smart beach access suggestions.","#1697D6"],
            ["Verified Inventory","Trusted parking hosts and live availability across the shore.","#FFD33D"],
            ["Live Demand","Real-time parking pressure and event activity updates.","#082743"],
            ["Faster Parking","Reduce stress and find parking in seconds instead of circling blocks.","#1E9E74"],
          ].map(([title, desc, color]) => (
            <div
              key={title}
              className="rounded-[2rem] border-4 border-[#082743] bg-white p-5 shadow"
            >
              <div
                className="inline-flex rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white"
                style={{ backgroundColor: color }}
              >
                Active
              </div>

              <p className="mt-4 text-2xl font-black text-[#082743]">
                {title}
              </p>

              <p className="mt-3 font-bold text-slate-700">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function InstantReservationFlowPanel() {
  const spots = [
    {
      title: "Premium Boardwalk Spot",
      shoreScore: "94",
      shoreTier: "Elite Shore Spot",
      price: "$28",
      walk: "2 min walk to beach",
      status: "Only 2 Left",
      color: "bg-red-500",
    },
    {
      title: "Family Beach Access",
      price: "$18",
      walk: "5 min walk",
      status: "Available Now",
      color: "bg-green-500",
    },
    {
      title: "Concert Exit Parking",
      price: "$35",
      walk: "Fast Exit",
      status: "High Demand",
      color: "bg-orange-500",
    },
  ];

  return (
    <section id="reserve-now" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2.5rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Phase 44
            </p>

            <h2 className="mt-2 text-3xl md:text-5xl font-black text-[#082743]">
              Instant Reservation Flow
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Faster booking, cleaner parking selection, and mobile-first reservation design.
            </p>
          </div>

          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#082743] shadow-[4px_4px_0_#082743]">
            Instant Booking Active
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {spots.map((spot) => (
            <div
              key={spot.title}
              className="rounded-[2rem] border-4 border-[#082743] bg-[#F9FBFD] p-6 shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-[#082743]">
                    {spot.title}
                  </p>

                  {"shoreScore" in spot && (
                    <div className="mt-3 rounded-2xl border-2 border-[#082743] bg-[#FFF3D6] px-4 py-3">
                      <p className="text-lg font-black text-[#082743]">
                        🏖️ ShoreScore™ {spot.shoreScore}
                      </p>
                      <p className="text-xs font-black uppercase tracking-wide text-slate-600">
                        {spot.shoreTier}
                      </p>
                    </div>
                  )}

                  <p className="mt-3 font-bold text-slate-600">
                    {spot.walk}
                  </p>
                </div>

                <div className={`h-4 w-4 rounded-full ${spot.color} animate-pulse`} />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
                    Reserve Now
                  </p>

                  <p className="text-4xl font-black text-[#082743]">
                    {spot.price}
                  </p>
                </div>

                <div className="rounded-full border-2 border-[#082743] bg-[#FFF3D6] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#082743]">
                  {spot.status}
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-full border-4 border-[#082743] bg-[#FFD33D] px-6 py-4 text-lg font-black uppercase tracking-wide text-[#082743] shadow-[5px_5px_0_#082743] transition hover:-translate-y-1"
              >
                Reserve Spot
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



function SmartCheckoutExperiencePanel() {
  const details = [
    {
      title: "Beachfront Premium",
      walk: "2 min walk to beach",
      price: "$32",
      tag: "Best Beach Access",
      notes: [
        "Verified host",
        "SUV friendly",
        "Fast QR entry",
      ],
    },
    {
      title: "Concert Exit Zone",
      walk: "Fastest post-event exit",
      price: "$38",
      tag: "Quick Exit",
      notes: [
        "Low traffic route",
        "Live availability",
        "Highly rated access",
      ],
    },
  ];

  return (
    <section id="smart-checkout" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2.5rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Phase 45
            </p>

            <h2 className="mt-2 text-3xl md:text-5xl font-black text-[#082743]">
              Smart Checkout Experience
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Cleaner reservation confidence, smarter spot selection,
              and frictionless parking checkout built for stressed users.
            </p>
          </div>

          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#082743] shadow-[4px_4px_0_#082743]">
            Smart Checkout Active
          </div>
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 lg:grid-cols-2">
          {details.map((spot) => (
            <div
              key={spot.title}
              className="overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#F9FBFD] shadow"
            >
              <div className="h-32 md:h-48 bg-gradient-to-br from-[#1697D6] via-[#8ad7ff] to-[#dff6ff]" />

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-3xl font-black text-[#082743]">
                      {spot.title}
                    </p>

                    <p className="mt-2 font-bold text-slate-600">
                      {spot.walk}
                    </p>
                  </div>

                  <div className="rounded-full border-2 border-[#082743] bg-[#FFD33D] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#082743]">
                    {spot.tag}
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
                      Reserve Spot
                    </p>

                    <p className="text-3xl md:text-5xl font-black text-[#082743]">
                      {spot.price}
                    </p>
                  </div>

                  <div className="rounded-full bg-[#082743] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                    Verified
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  {spot.notes.map((note) => (
                    <div
                      key={note}
                      className="rounded-2xl border-2 border-[#082743]/10 bg-white px-4 py-3 text-sm font-black text-[#082743]"
                    >
                      {note}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[2rem] border-4 border-[#082743] bg-white p-5">
                  <p className="text-lg font-black text-[#082743]">
                    Reservation Summary
                  </p>

                  <div className="mt-4 grid gap-2 text-sm font-bold text-slate-700">
                    <div className="flex justify-between">
                      <span>Parking</span>
                      <span>{spot.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Service Fee</span>
                      <span>$3</span>
                    </div>

                    <div className="flex justify-between">
                      <span>QR Access</span>
                      <span>Included</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mt-5 w-full rounded-full border-4 border-[#082743] bg-[#FFD33D] px-6 py-4 text-lg font-black uppercase tracking-wide text-[#082743] shadow-[5px_5px_0_#082743] transition hover:-translate-y-1"
                  >
                    Complete Reservation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-[#F8FAFC] p-5">
          <div className="grid gap-3 text-sm font-bold text-slate-600 md:grid-cols-4">
            {[
              "Free cancellation",
              "Secure payments",
              "Instant confirmation",
              "QR pass for easy entry",
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2">
                <span className="text-lg text-green-600">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




function RealActivityTickerPanel() {
  const [activities, setActivities] = useState<string[]>([
    "🚗 Ocean City Spot Available • Tap to Reserve",
    "📍 Boardwalk Spot Available • Tap to Reserve",
    "♻️ Premium Spot Reopened • Tap to Reserve",
    "🔥 Event Parking Available • Tap to Reserve",
  ]);

  const [latestSession, setLatestSession] = useState<any>(null);
  const [hostAlerts, setHostAlerts] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState("Live");

  async function loadLiveSessionData() {
    if (!supabase) return;

    const activityResult = await supabase
      .from("session_activity")
      .select("activity_message, created_at")
      .order("created_at", { ascending: false })
      .limit(8);

    if (activityResult.data && activityResult.data.length > 0) {
      setActivities(activityResult.data.map((item: any) => item.activity_message));
    }

    const sessionResult = await supabase
      .from("parking_sessions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (sessionResult.data) {
      setLatestSession(sessionResult.data);
    }

    const alertResult = await supabase
      .from("host_alerts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(4);

    if (alertResult.data) {
      setHostAlerts(alertResult.data);
    }
  }

  useEffect(() => {
    loadLiveSessionData();
    const interval = setInterval(loadLiveSessionData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!latestSession?.end_time) return;

    const updateCountdown = () => {
      const end = new Date(latestSession.end_time).getTime();
      const now = Date.now();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("Grace Period");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 30000);
    return () => clearInterval(interval);
  }, [latestSession]);

  return (
    <section id="real-live-activity" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2.5rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743] md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Phase 48
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#082743] md:text-5xl">
              Real Activity + Live Countdown
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              The ticker, active session, and host alerts now read from live Supabase data.
            </p>
          </div>

          <button
            type="button"
            onClick={loadLiveSessionData}
            className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]"
          >
            Refresh Live Data
          </button>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#082743]">
          <div className="bg-[#FFD33D] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#082743]">
            Live Marketplace Ticker
          </div>

          <div className="overflow-hidden py-3">
            <div className="ticker-track flex min-w-max gap-4 whitespace-nowrap px-4 text-sm font-black text-white">
              {[...activities, ...activities].map((item, index) => (
                <a key={`${item}-${index}`} href="#reserve-now" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" aria-label={`View and reserve ${item}`}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <style jsx>{`
            .ticker-track {
              animation: realTicker 38s linear infinite;
            }

            @keyframes realTicker {
              0% {
                transform: translateX(0%);
              }

              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF8EB] p-5 shadow">
            <p className="text-xs font-black uppercase tracking-wide text-[#1697D6]">
              Latest Active Session
            </p>

            <h3 className="mt-2 text-3xl font-black text-[#082743]">
              {latestSession?.spot_title || "No active session loaded yet"}
            </h3>

            <p className="mt-2 font-bold text-slate-600">
              {latestSession?.spot_town || "Start a session to populate live data"}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border-4 border-[#082743] bg-white p-4 text-center">
                <p className="text-xs font-black uppercase text-slate-500">Time Left</p>
                <p className="text-3xl font-black text-[#082743]">{timeLeft}</p>
              </div>

              <div className="rounded-2xl border-4 border-[#082743] bg-white p-4 text-center">
                <p className="text-xs font-black uppercase text-slate-500">Status</p>
                <p className="text-2xl font-black text-[#082743]">
                  {latestSession?.session_status || "Waiting"}
                </p>
              </div>

              <div className="rounded-2xl border-4 border-[#082743] bg-white p-4 text-center">
                <p className="text-xs font-black uppercase text-slate-500">Extensions</p>
                <p className="text-3xl font-black text-[#082743]">
                  {latestSession?.extended_count ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-5 text-white shadow">
            <p className="text-2xl font-black">Host Alerts</p>

            <div className="mt-4 grid gap-3">
              {(hostAlerts.length ? hostAlerts : [
                { alert_message: "No live host alerts yet." },
              ]).map((alert: any, index: number) => (
                <div key={index} className="rounded-2xl bg-white/10 p-4 font-black">
                  {alert.alert_message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveSessionIntegrationPanel() {
  const [sessionStatus, setSessionStatus] = useState("active");
  const [sessionMessage, setSessionMessage] = useState("");

  async function createDemoSession() {
    setSessionMessage("Creating live parking session...");

    if (!supabase) {
      setSessionMessage("Supabase is not connected in this environment.");
      return;
    }

    const endTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

    const { error } = await supabase.from("parking_sessions").insert({
      spot_title: "Premium Boardwalk Spot",
      spot_town: "Ocean City",
      customer_name: "Demo Driver",
      customer_email: "driver@thelastspotapp.com",
      session_status: "active",
      end_time: endTime,
    });

    if (error) {
      console.error(error);
      setSessionMessage("Session table is ready, but the insert failed. Check Supabase policies.");
      return;
    }

    await supabase.from("session_activity").insert({
      activity_type: "session_started",
      activity_message: "🚗 Ocean City Spot Available • Tap to Reserve",
      spot_title: "Premium Boardwalk Spot",
      town: "Ocean City",
    });

    setSessionStatus("active");
    setSessionMessage("Live parking session created.");
  }

  async function extendDemoSession(hours: number) {
    setSessionMessage(`Extending session by ${hours} hour${hours > 1 ? "s" : ""}...`);

    if (!supabase) {
      setSessionMessage("Supabase is not connected in this environment.");
      return;
    }

    await supabase.from("session_activity").insert({
      activity_type: "session_extended",
      activity_message: `⏳ Session extended ${hours} hour${hours > 1 ? "s" : ""} • Ocean City`,
      spot_title: "Premium Boardwalk Spot",
      town: "Ocean City",
    });

    setSessionStatus("extended");
    setSessionMessage(`Session extension logged for ${hours} hour${hours > 1 ? "s" : ""}.`);
  }

  async function reportOccupiedSpot() {
    setSessionMessage("Submitting parking protection report...");

    if (!supabase) {
      setSessionMessage("Supabase is not connected in this environment.");
      return;
    }

    const { error } = await supabase.from("parking_incidents").insert({
      incident_type: "spot_occupied",
      description: "Driver reported the reserved spot was occupied.",
      resolution_status: "open",
    });

    if (error) {
      console.error(error);
      setSessionMessage("Incident table exists, but report failed. Check Supabase policies.");
      return;
    }

    await supabase.from("host_alerts").insert({
      alert_type: "spot_occupied",
      alert_message: "Reserved spot was reported occupied by a driver.",
      resolved: false,
    });

    await supabase.from("session_activity").insert({
      activity_type: "spot_occupied",
      activity_message: "⚠️ Spot occupied report submitted • Ocean City",
      spot_title: "Premium Boardwalk Spot",
      town: "Ocean City",
    });

    setSessionStatus("protection");
    setSessionMessage("Parking Protection report submitted.");
  }

  async function startGracePeriod() {
    setSessionMessage("Starting grace period...");

    if (!supabase) {
      setSessionMessage("Supabase is not connected in this environment.");
      return;
    }

    await supabase.from("session_activity").insert({
      activity_type: "grace_period",
      activity_message: "⚠️ Grace period active • Premium Spot",
      spot_title: "Premium Boardwalk Spot",
      town: "Ocean City",
    });

    await supabase.from("host_alerts").insert({
      alert_type: "grace_period",
      alert_message: "A parking session has entered its grace period.",
      resolved: false,
    });

    setSessionStatus("grace");
    setSessionMessage("Grace period activity logged.");
  }

  return (
    <section id="live-session-integration" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2.5rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743] md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Phase 47
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#082743] md:text-5xl">
              Live Session Integration
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Parking sessions, extensions, grace periods, protection reports,
              activity feeds, and host alerts now connect to the live database foundation.
            </p>
          </div>

          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase text-[#082743] shadow-[4px_4px_0_#082743]">
            Database Connected
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF8EB] p-5 shadow">
            <p className="text-xs font-black uppercase tracking-wide text-[#1697D6]">
              Driver Session Controls
            </p>

            <h3 className="mt-2 text-3xl font-black text-[#082743]">
              Premium Boardwalk Spot
            </h3>

            <p className="mt-2 font-bold text-slate-600">
              Status: {sessionStatus.toUpperCase()}
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2">
              <button onClick={createDemoSession} type="button" className="rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-4 py-3 font-black uppercase text-[#082743] shadow-[3px_3px_0_#082743]">
                Start Session
              </button>

              <button onClick={() => extendDemoSession(1)} type="button" className="rounded-2xl border-4 border-[#082743] bg-white px-4 py-3 font-black uppercase text-[#082743] shadow">
                Extend 1 Hour
              </button>

              <button onClick={() => extendDemoSession(2)} type="button" className="rounded-2xl border-4 border-[#082743] bg-white px-4 py-3 font-black uppercase text-[#082743] shadow">
                Extend 2 Hours
              </button>

              <button onClick={startGracePeriod} type="button" className="rounded-2xl border-4 border-[#082743] bg-[#FF8A3D] px-4 py-3 font-black uppercase text-white shadow">
                Grace Period
              </button>
            </div>

            {sessionMessage && (
              <div className="mt-5 rounded-2xl border-4 border-[#082743] bg-white p-4 font-black text-[#082743]">
                {sessionMessage}
              </div>
            )}
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-5 text-white shadow">
              <p className="text-2xl font-black">Parking Protection</p>

              <p className="mt-2 font-bold text-slate-200">
                If a driver arrives and the reserved spot is occupied, create a live incident and host alert.
              </p>

              <button onClick={reportOccupiedSpot} type="button" className="mt-5 w-full rounded-2xl border-4 border-white bg-[#FFD33D] px-4 py-4 font-black uppercase text-[#082743] shadow">
                Report Spot Occupied
              </button>
            </div>

            <div className="rounded-[2rem] border-4 border-[#082743] bg-[#EAF7F6] p-5 text-[#082743] shadow">
              <p className="text-2xl font-black">Host Alert System</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Active session created",
                  "Extension logged",
                  "Grace period started",
                  "Occupied spot report submitted",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-3 font-black shadow">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-5 text-white">
          <p className="text-xl font-black">Live Data Tables Now Used</p>

          <p className="mt-2 font-bold text-slate-200">
            parking_sessions • parking_incidents • session_activity • host_alerts
          </p>
        </div>
      </div>
    </section>
  );
}

function ParkingSessionEnginePanel() {
  const extensionOptions = ["Extend 1 Hour", "Extend 2 Hours", "Extend Until End of Day"];

  return (
    <section id="parking-session" className="mx-auto max-w-7xl px-5 py-10">
      <div className="rounded-[2.5rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743] md:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
              Phase 46
            </p>

            <h2 className="mt-2 text-4xl font-black text-[#082743] md:text-5xl">
              Parking Session Engine
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Simple session controls for drivers, fair grace periods, easy extensions,
              and protection workflows if a reserved spot is occupied.
            </p>
          </div>

          <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#082743] shadow-[4px_4px_0_#082743]">
            Session Active
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF8EB] p-5 shadow">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-[#1697D6]">
                  Active Parking Session
                </p>

                <h3 className="mt-1 text-3xl font-black text-[#082743]">
                  Premium Boardwalk Spot
                </h3>

                <p className="mt-2 font-bold text-slate-600">
                  12th Street • Ocean City • QR Verified
                </p>
              </div>

              <div className="rounded-2xl border-4 border-[#082743] bg-white px-5 py-4 text-center shadow">
                <p className="text-xs font-black uppercase text-slate-500">
                  Time Left
                </p>

                <p className="text-4xl font-black text-[#082743]">
                  2h 14m
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {extensionOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-4 py-3 text-sm font-black uppercase text-[#082743] shadow-[3px_3px_0_#082743] transition hover:-translate-y-1"
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border-4 border-[#082743] bg-white p-4">
                <p className="text-sm font-black uppercase text-[#1697D6]">
                  Grace Period
                </p>

                <p className="mt-2 text-2xl font-black text-[#082743]">
                  15 minutes
                </p>

                <p className="mt-2 text-sm font-bold text-slate-600">
                  If time expires, drivers get a short grace period before overstay fees begin.
                </p>
              </div>

              <div className="rounded-2xl border-4 border-[#082743] bg-white p-4">
                <p className="text-sm font-black uppercase text-[#1697D6]">
                  Overstay Protection
                </p>

                <p className="mt-2 text-2xl font-black text-[#082743]">
                  Host Alert
                </p>

                <p className="mt-2 text-sm font-bold text-slate-600">
                  Hosts are notified before support or towing is ever considered.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-5 text-white shadow">
              <p className="text-2xl font-black">
                Parking Protection
              </p>

              <p className="mt-2 font-bold text-slate-200">
                If a driver arrives and the reserved spot is occupied, they can report it in seconds.
              </p>

              <div className="mt-5 grid gap-3">
                {[
                  "Spot Available",
                  "Spot Occupied",
                  "Upload Photo",
                  "Get Replacement / Credit / Refund",
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-2xl bg-white/10 px-4 py-3 text-left font-black"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFD33D] p-5 text-[#082743] shadow">
              <p className="text-2xl font-black">
                Host Session Snapshot
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  ["8", "Active"],
                  ["3", "Ending Soon"],
                  ["2", "Extended"],
                  ["1", "Overstay Alert"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 text-center shadow">
                    <p className="text-3xl font-black">{value}</p>
                    <p className="text-xs font-black uppercase text-slate-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#082743]">
          <div className="bg-[#FFD33D] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#082743]">
            Mobile Marketplace Ticker
          </div>

          <div className="overflow-hidden py-3">
            <div className="ticker-track flex min-w-max gap-4 whitespace-nowrap px-4 text-sm font-black text-white">
              {[
                "🚗 Spot Reserved • 12th & Asbury",
                "📍 Spot Opened • Boardwalk",
                "⏳ Session Extended • Ocean City",
                "⚠️ Grace Period Active • Premium Spot",
                "⭐ New Host Verified • North End",
                "🔥 Event Parking Filling Fast",
                "🚗 Spot Reserved • 12th & Asbury",
                "📍 Spot Opened • Boardwalk",
                "⏳ Session Extended • Ocean City",
                "⚠️ Grace Period Active • Premium Spot",
                "⭐ New Host Verified • North End",
                "🔥 Event Parking Filling Fast",
              ].map((item, index) => (
                <a key={`${item}-${index}`} href="#reserve-now" className="rounded-full bg-white/10 px-4 py-2 transition hover:bg-white/20" aria-label={`View and reserve ${item}`}>
                  {item}
                </a>
              ))}
            </div>
          </div>

          <style jsx>{`
            .ticker-track {
              animation: sessionTicker 38s linear infinite;
            }

            @keyframes sessionTicker {
              0% {
                transform: translateX(0%);
              }

              100% {
                transform: translateX(-50%);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

function UnifiedHostEarningsPanel() {
  return (
    <section id="host-earnings" className="mx-auto max-w-7xl px-5 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-8 text-white shadow-[8px_8px_0_#082743]">
          <p className="text-sm font-black uppercase tracking-wide text-[#FFD33D]">
            Host Marketplace
          </p>

          <h2 className="mt-3 text-3xl md:text-5xl font-black">
            Turn Your Parking Spot Into Income
          </h2>

          <p className="mt-5 max-w-2xl font-bold text-slate-200">
            List your driveway, property, or private parking space in minutes
            and start earning during beach weekends, concerts, and high-demand events.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#host-onboarding"
              className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-8 py-4 text-center text-lg font-black uppercase tracking-wide text-[#082743] shadow-[5px_5px_0_#021524] transition hover:-translate-y-1"
            >
              Become A Host
            </a>

            <a
              href="#host-dashboard"
              className="rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-center text-lg font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/20"
            >
              Host Center
            </a>
          </div>

          <div id="host-earnings-summary" className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["$4,250", "Top Monthly Host"],
              ["98%", "Host Satisfaction"],
              ["24/7", "Marketplace Visibility"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <p className="text-3xl font-black text-[#FFD33D]">
                  {value}
                </p>

                <p className="mt-2 text-sm font-bold text-slate-200">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
          <p className="text-sm font-black uppercase tracking-wide text-[#1697D6]">
            Smart Host Insights
          </p>

          <div className="mt-6 grid gap-4">
            {[
              "Weekend shore demand increasing",
              "Concert event pricing activated",
              "Premium driveway inventory filling quickly",
              "AI suggests increasing pricing near boardwalk",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border-4 border-[#082743] bg-[#FFF3D6] p-4 font-black text-[#082743]"
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[2rem] border-4 border-[#082743] bg-[#1697D6] p-5 text-white">
            <p className="text-xl font-black">
              AI Revenue Optimization
            </p>

            <p className="mt-3 font-bold text-slate-100">
              Future-ready pricing intelligence helps maximize host earnings automatically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompactFeatureVault() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groups: { title: string; items: string[] }[] = [
    {
      title: "Operations",
      items: [
        "Reservation State Engine",
        "QR Countdown Enforcement",
        "Stripe Lock + Auto Release",
        "Secure Access Messaging",
      ],
    },
    {
      title: "Marketplace",
      items: [
        "Host Analytics",
        "Revenue Engine",
        "Stripe Checkout",
        "Owner Dashboard",
      ],
    },
    {
      title: "Intelligence",
      items: [
        "AI Marketplace Engine",
        "Dynamic Pricing",
        "Event Marketplace",
        "Live Heatmaps",
      ],
    },
    {
      title: "Platform",
      items: [
        "Real Auth",
        "Mobile UX",
        "Grouped Navigation",
        "Responsive Dashboard Hub",
      ],
    },
  ];

  return null;
}

function LiveQREnforcementPanel() {
  const enforcementSteps = [
    ["Hold Started", "15-minute reservation countdown begins"],
    ["Payment Confirmed", "QR parking pass activates"],
    ["Arrival Scan", "Host scans or validates QR"],
    ["Checked In", "Reservation changes to active parking"],
    ["Expired", "QR becomes invalid after booking window"],
    ["Auto Release", "Unpaid holds return to available inventory"],
  ];

  return (
    <section id="qr-enforcement" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">
          Phase 34
        </p>

        <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
          Live QR Verification + Countdown Enforcement
        </h2>

        <p className="mt-4 max-w-3xl font-bold text-slate-700">
          The Last Spot now has the operational foundation for timed reservation holds,
          expiring QR passes, live check-in validation, and anti-reuse parking enforcement.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {enforcementSteps.map(([label, desc]) => (
            <div
              key={label}
              className="rounded-3xl border-4 border-[#082743] bg-[#FFF3D6] p-5 shadow"
            >
              <p className="text-2xl font-black text-[#082743]">
                {label}
              </p>

              <p className="mt-2 font-bold text-slate-700">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
            <p className="text-3xl font-black">
              Countdown Hold Logic
            </p>

            <div className="mt-5 grid gap-3">
              {[
                "15-minute unpaid reservation holds",
                "Auto-release when timer expires",
                "Live availability state updates",
                "Payment confirmation lock",
                "Host emergency override",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 font-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-6">
            <p className="text-3xl font-black text-[#082743]">
              QR Verification Rules
            </p>

            <div className="mt-5 grid gap-3">
              {[
                "QR token tied to booking",
                "QR expires after reservation",
                "Scan attempts tracked",
                "Reuse prevention groundwork",
                "Checked-in state validation",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white p-4 font-black text-[#082743] shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border-4 border-[#082743] bg-[#EAF7F6] p-6">
          <p className="text-2xl font-black text-[#082743]">
            Enforcement Impact
          </p>

          <p className="mt-2 font-bold text-slate-700">
            This phase connects the digital reservation to real-world parking control:
            users get expiring QR access, hosts get verification tools, and unpaid holds
            can be released back into inventory.
          </p>
        </div>
      </div>
    </section>
  );
}

function UniversalLogoHomePanel() {
  return (
    <section id="logo-home" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-8 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">Phase 33.6</p>
        <h2 className="text-3xl md:text-5xl font-black text-[#082743]">Universal Logo Home</h2>
        <p className="mt-4 max-w-3xl font-bold text-slate-700">
          Logo clicks now return users home and close open app windows without relying on out-of-scope functions.
        </p>
      </div>
    </section>
  );
}

function ReservationStatePanel() {
  const states = [
    ["Available", "Green", "Ready to reserve"],
    ["Pending", "Yellow", "Reservation hold active"],
    ["Reserved", "Orange", "Payment confirmed"],
    ["Checked In", "Blue", "QR verified arrival"],
    ["Active", "Purple", "Vehicle currently parked"],
    ["Expired", "Gray", "Reservation ended"],
  ];

  return (
    <section id="reservation-engine" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">
          Phase 33
        </p>

        <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
          Reservation State Engine
        </h2>

        <p className="mt-4 max-w-3xl font-bold text-slate-700">
          The Last Spot now supports real reservation lifecycle states,
          countdown reservation holds, live availability logic,
          and operational booking infrastructure.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {states.map(([label, color, desc]) => (
            <div
              key={label}
              className="rounded-3xl border-4 border-[#082743] bg-[#FFF3D6] p-5 shadow"
            >
              <p className="text-xs font-black uppercase text-[#1697D6]">
                {color} State
              </p>

              <p className="mt-2 text-3xl font-black text-[#082743]">
                {label}
              </p>

              <p className="mt-2 font-bold text-slate-700">
                {desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
            <p className="text-3xl font-black">
              Operational Controls
            </p>

            <div className="mt-5 grid gap-3">
              {[
                "Countdown reservation timers",
                "Auto-release unpaid reservations",
                "Emergency host lock controls",
                "Manual event pricing overrides",
                "Dynamic availability updates",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 font-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-6">
            <p className="text-3xl font-black text-[#082743]">
              QR Enforcement Layer
            </p>

            <div className="mt-5 grid gap-3">
              {[
                "Reservation-linked QR codes",
                "Expiration timestamps",
                "Check-in validation state",
                "Anti-screenshot groundwork",
                "Live reservation verification",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white p-4 font-black text-[#082743] shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function UXPolishPanel() {
  return (
    <section id="ux-polish" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">Phase 32</p>
        <h2 className="text-3xl md:text-5xl font-black text-[#082743]">Mobile UX Polish</h2>
        <p className="mt-4 max-w-3xl font-bold text-slate-700">
          The app now has cleaner mobile header spacing, clickable brand-home behavior, and better visual separation between navigation controls and booking actions.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            "Logo returns home",
            "Cleaner phone header",
            "Raised menu + bell",
            "Better mobile readability",
          ].map((item) => (
            <div key={item} className="rounded-3xl border-4 border-[#082743] bg-[#FFF3D6] p-5 text-center font-black text-[#082743] shadow">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GroupedNavigationPanel() {
  return (
    <section id="grouped-nav" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-8 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">
          Phase 31
        </p>

        <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
          Grouped Navigation System
        </h2>

        <p className="mt-4 max-w-3xl font-bold text-slate-700">
          Navigation is now organized into dropdown groups for cleaner UX,
          better scalability, and a more premium marketplace experience.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            "Find Parking",
            "Host Tools",
            "AI + Events",
            "Account Center",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border-4 border-[#082743] bg-white p-5 text-center font-black text-[#082743] shadow"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResponsiveNavigationPanel() {
  return (
    <section id="responsive-nav" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">Phase 30</p>
        <h2 className="text-3xl md:text-5xl font-black text-[#082743]">Responsive Navigation System</h2>
        <p className="mt-4 max-w-3xl font-bold text-slate-700">
          The app now uses scrollable desktop tabs and a mobile bottom navigation bar so the growing feature set stays clean, usable, and phone-friendly.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {["Scrollable desktop tabs", "Mobile bottom nav", "Feature grouping", "No more overflow"].map((item) => (
            <div key={item} className="rounded-3xl border-4 border-[#082743] bg-[#FFF3D6] p-5 text-center font-black text-[#082743] shadow">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealStripeCheckoutPanel() {
  return (
    <section id="stripe-checkout" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 29
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Real Stripe Checkout Flow
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              The Last Spot is now structured for real paid reservations,
              deposits, platform fees, receipts, payout tracking, refunds,
              and marketplace payment operations.
            </p>
          </div>

          <div className="rounded-3xl border-4 border-[#082743] bg-[#FFD33D] p-6 shadow">
            <p className="text-xs font-black uppercase text-[#082743]">
              Commerce Status
            </p>

            <p className="mt-2 text-3xl md:text-5xl font-black text-[#082743]">
              READY
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            "Stripe Checkout",
            "Deposit Holds",
            "Platform Fees",
            "Refund Tracking",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border-4 border-[#082743] bg-[#FFF3D6] p-5 text-center font-black text-[#082743] shadow"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
            <p className="text-3xl font-black">
              Payment Flow
            </p>

            <div className="mt-5 grid gap-4">
              {[
                "Renter requests spot",
                "Admin or host approves",
                "Stripe checkout session created",
                "Renter pays deposit or full amount",
                "QR parking pass activates",
                "Host payout becomes scheduled",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white/10 p-4 font-black"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-6">
            <p className="text-3xl font-black text-[#082743]">
              Transaction Controls
            </p>

            <div className="mt-5 grid gap-4">
              {[
                "Cancellation windows",
                "Refund eligibility",
                "Payout delay controls",
                "Dispute tracking",
                "Receipt history",
                "Fraud review flags",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-white p-4 font-black shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-[#EAF7F6] p-6">
          <p className="text-2xl font-black text-[#082743]">
            Stripe Setup Note
          </p>
          <p className="mt-2 font-bold text-slate-700">
            This phase adds the app and database infrastructure for real checkout.
            To process real cards, add Stripe secret keys through secure server
            functions/API routes in the next production-hardening pass.
          </p>
        </div>
      </div>
    </section>
  );
}

function MessagingSecurityPanel() {
  return (
    <section id="messaging-security" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 28
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Messaging + Secure Access
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Hosts and renters can coordinate arrivals,
              share event details, send secure gate instructions,
              and use expiring access infrastructure for safer reservations.
            </p>
          </div>

          <div className="rounded-3xl border-4 border-[#082743] bg-[#FFD33D] p-6 shadow">
            <p className="text-xs font-black uppercase text-[#082743]">
              Secure Access
            </p>

            <p className="mt-2 text-3xl md:text-5xl font-black text-[#082743]">
              ACTIVE
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            "Host Messaging",
            "Arrival Coordination",
            "Expiring Gate Codes",
            "Secure QR Access",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border-4 border-[#082743] bg-white p-5 text-center font-black text-[#082743] shadow"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6">
            <p className="text-3xl font-black text-[#082743]">
              Secure Access Features
            </p>

            <div className="mt-5 grid gap-4">
              {[
                "Temporary gate codes",
                "Reservation-tied QR access",
                "Auto-expiring access instructions",
                "One-time reveal security",
                "Booking-based access windows",
                "Sensitive message protection",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-[#FFF3D6] p-4 font-black shadow"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white">
            <p className="text-3xl font-black">
              Marketplace Communication
            </p>

            <div className="mt-5 space-y-4">
              {[
                ["Arrival ETA", "Real-time coordination"],
                ["Host Instructions", "Parking guidance"],
                ["Event Alerts", "Traffic updates"],
                ["Issue Resolution", "Support escalation"],
              ].map(([label, desc]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/10 p-4"
                >
                  <p className="font-black text-[#FFD33D]">
                    {label}
                  </p>

                  <p className="mt-1 font-bold text-white/80">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HostAnalyticsDashboardPanel({
  spots,
}: {
  spots: ParkingSpot[];
}) {
  const activeSpots = spots.length;
  const projectedRevenue = activeSpots * 420;
  const occupancy = Math.min(96, 55 + activeSpots * 4);

  return (
    <section id="host-analytics" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 27
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Host Earnings Dashboard
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Empower hosts with live revenue analytics,
              AI pricing recommendations, occupancy intelligence,
              and event-based earnings forecasting.
            </p>
          </div>

          <div className="rounded-3xl border-4 border-[#082743] bg-[#FFD33D] p-6 shadow">
            <p className="text-xs font-black uppercase text-[#082743]">
              Projected Monthly Revenue
            </p>

            <p className="mt-2 text-3xl md:text-5xl font-black text-[#082743]">
              ${projectedRevenue}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#082743] p-6 text-white">
            <p className="text-xs font-black uppercase text-[#FFD33D]">
              Active Spots
            </p>

            <p className="mt-3 text-3xl md:text-5xl font-black">
              {activeSpots}
            </p>
          </div>

          <div className="rounded-3xl bg-[#1697D6] p-6 text-white">
            <p className="text-xs font-black uppercase">
              Occupancy
            </p>

            <p className="mt-3 text-3xl md:text-5xl font-black">
              {occupancy}%
            </p>
          </div>

          <div className="rounded-3xl bg-[#FF8A3D] p-6 text-white">
            <p className="text-xs font-black uppercase">
              Event Boost
            </p>

            <p className="mt-3 text-3xl md:text-5xl font-black">
              +34%
            </p>
          </div>

          <div className="rounded-3xl bg-[#E63946] p-6 text-white">
            <p className="text-xs font-black uppercase">
              AI Score
            </p>

            <p className="mt-3 text-3xl md:text-5xl font-black">
              92
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StripeRevenueEnginePanel({
  spots,
}: {
  spots: ParkingSpot[];
}) {
  const premium = spots.filter((spot) => spot.surge_active).length;
  const projectedRevenue = premium * 240 + spots.length * 38;

  return (
    <section id="stripe-revenue" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 26
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Stripe Revenue Engine
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              The Last Spot now supports monetization infrastructure,
              payout architecture, host revenue tracking,
              and production-ready Stripe marketplace logic.
            </p>
          </div>

          <div className="rounded-3xl border-4 border-[#082743] bg-[#FFD33D] p-6 shadow">
            <p className="text-xs font-black uppercase text-[#082743]">
              Projected Marketplace Revenue
            </p>

            <p className="mt-2 text-3xl md:text-5xl font-black text-[#082743]">
              ${projectedRevenue}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            "Stripe Checkout",
            "Host Payouts",
            "Platform Fees",
            "Revenue Analytics",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border-4 border-[#082743] bg-white p-5 text-center font-black text-[#082743] shadow"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-[#082743] p-6 text-white">
            <p className="text-sm font-black uppercase text-[#FFD33D]">
              Host Earnings
            </p>

            <p className="mt-3 text-3xl md:text-5xl font-black">
              $4,820
            </p>

            <p className="mt-2 font-bold text-white/80">
              Estimated active host payouts.
            </p>
          </div>

          <div className="rounded-3xl bg-[#1697D6] p-6 text-white">
            <p className="text-sm font-black uppercase">
              Platform Fees
            </p>

            <p className="mt-3 text-3xl md:text-5xl font-black">
              15%
            </p>

            <p className="mt-2 font-bold text-white/80">
              Dynamic marketplace commission model.
            </p>
          </div>

          <div className="rounded-3xl bg-[#FF8A3D] p-6 text-white">
            <p className="text-sm font-black uppercase">
              Live Payouts
            </p>

            <p className="mt-3 text-3xl md:text-5xl font-black">
              READY
            </p>

            <p className="mt-2 font-bold text-white/80">
              Stripe Connect compatible infrastructure.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LiveOccupancyHeatmapPanel({
  spots,
}: {
  spots: ParkingSpot[];
}) {
  const highDemand = spots.filter((spot) => spot.ai_demand_score && spot.ai_demand_score > 80);
  const beachZones = spots.filter((spot) => spot.zone_type === "beach");

  return (
    <section id="heatmaps" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 25
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Live Occupancy Heatmaps
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              Visualize live parking demand, beach congestion,
              premium event activity, and AI-powered occupancy forecasting
              across shore towns in real time.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-3xl border-4 border-[#082743] bg-[#FFD33D] p-5 text-center shadow">
              <p className="text-xs font-black uppercase text-[#082743]">
                High Demand Zones
              </p>

              <p className="text-3xl md:text-5xl font-black text-[#082743]">
                {highDemand.length}
              </p>
            </div>

            <div className="rounded-3xl border-4 border-[#082743] bg-[#FF8A3D] p-5 text-center shadow">
              <p className="text-xs font-black uppercase text-white">
                Beach Zones
              </p>

              <p className="text-3xl md:text-5xl font-black text-white">
                {beachZones.length}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6">
          <div className="grid grid-cols-6 gap-3">
            {Array.from({ length: 36 }).map((_, i) => {
              const intensity = i % 5;

              const colors = [
                "bg-[#EAF7F6]",
                "bg-[#FFD33D]",
                "bg-[#FFB347]",
                "bg-[#FF8A3D]",
                "bg-[#E63946]",
              ];

              return (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl border-2 border-white/20 ${colors[intensity]} shadow`}
                />
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#EAF7F6]" />
              <span className="font-black">Low Demand</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#FFD33D]" />
              <span className="font-black">Moderate</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#FF8A3D]" />
              <span className="font-black">High Demand</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-[#E63946]" />
              <span className="font-black">Surge Zone</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EventMarketplacePanel({
  spots,
}: {
  spots: ParkingSpot[];
}) {
  const eventSpots = spots.filter((spot) => spot.zone_type === "event");
  const premiumCount = spots.filter((spot) => spot.surge_active).length;

  return (
    <section id="event-marketplace" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">
              Phase 24
            </p>

            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Event Marketplace Engine
            </h2>

            <p className="mt-4 max-w-3xl font-bold text-slate-700">
              The Last Spot now supports event-driven parking demand,
              premium surge pricing zones, shore traffic forecasting,
              and destination-specific event parking experiences.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-3xl border-4 border-[#082743] bg-white p-5 text-center shadow">
              <p className="text-xs font-black uppercase text-[#1697D6]">
                Event Zones
              </p>
              <p className="text-3xl md:text-5xl font-black text-[#082743]">
                {eventSpots.length}
              </p>
            </div>

            <div className="rounded-3xl border-4 border-[#082743] bg-[#FFD33D] p-5 text-center shadow">
              <p className="text-xs font-black uppercase text-[#082743]">
                Surge Active
              </p>
              <p className="text-3xl md:text-5xl font-black text-[#082743]">
                {premiumCount}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            "Concert Parking",
            "Boardwalk Events",
            "Beach Concert Zones",
            "Festival Traffic AI",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border-4 border-[#082743] bg-white p-5 text-center font-black text-[#082743] shadow"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIMarketplaceEnginePanel({
  spots,
  bookings,
}: {
  spots: ParkingSpot[];
  bookings: BookingRequest[];
}) {
  const eventSpots = spots.filter((spot) => spot.zone_type === "event");
  const premiumSpots = spots.filter((spot) => spot.surge_active);

  const projectedDemand = bookings.length * 12 + premiumSpots.length * 8;

  return (
    <section id="ai-marketplace" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 23</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              AI Marketplace Engine
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              The Last Spot now includes intelligent marketplace forecasting,
              pricing recommendations, occupancy prediction, and event-demand insights.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              AI Demand Score
            </p>
            <p className="mt-2 text-3xl md:text-5xl font-black">
              {projectedDemand}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RealAuthIntegrationPanel({
  loggedInUser,
}: {
  loggedInUser: UserProfile | null;
}) {
  return (
    <section id="real-auth" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 22</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Real Authentication + Protected Accounts
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              The Last Spot is now structured for Supabase Auth, Google login,
              Apple login, protected renter/owner dashboards, verified reviews,
              and role-based marketplace controls.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              Session Status
            </p>
            <p className="mt-2 text-3xl font-black">
              {loggedInUser ? "SIGNED IN" : "AUTH READY"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-8 shadow-[6px_6px_0_#082743]">
            <p className="text-3xl font-black text-[#082743]">
              Account Protection Layer
            </p>

            <div className="mt-6 grid gap-4">
              {[
                ["Renter Accounts", "Booking history, QR passes, reviews, favorites"],
                ["Owner Accounts", "Listings, payouts, verification, earnings"],
                ["Admin Accounts", "Approvals, disputes, pricing, trust moderation"],
                ["Verified Reviews", "Only real booking participants can review"],
                ["Protected Payments", "Stripe actions tied to authenticated users"],
                ["Role-Based Access", "Different tools for renters, owners, and admins"],
              ].map(([label, desc]) => (
                <div key={label} className="rounded-2xl bg-white p-4 shadow">
                  <p className="font-black">{label}</p>
                  <p className="mt-1 text-sm font-bold text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-[#082743] p-6 text-white">
              <p className="text-2xl font-black">Supabase Auth Roadmap</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Email magic-link login",
                  "Google OAuth",
                  "Apple OAuth ready",
                  "Persistent sessions",
                  "Protected dashboards",
                  "Admin-only actions",
                  "Owner-only listing tools",
                  "Authenticated Stripe checkout",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 font-black">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#F4F4F4] p-6">
              <p className="text-2xl font-black">Security Status</p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">Auth</p>
                  <p className="mt-2 text-4xl font-black">READY</p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">Roles</p>
                  <p className="mt-2 text-4xl font-black">LIVE</p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">Admin Lock</p>
                  <p className="mt-2 text-4xl font-black">NEXT</p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">OAuth</p>
                  <p className="mt-2 text-4xl font-black">SET</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-[#EAF7F6] p-6">
          <p className="text-2xl font-black">Important Production Note</p>
          <p className="mt-2 font-bold text-slate-700">
            This phase adds the account/security architecture and database fields needed for real Supabase Auth.
            The next deployment can wire actual OAuth buttons after Google/Apple provider settings are enabled inside Supabase.
          </p>
        </div>
      </div>
    </section>
  );
}


function DynamicPricingEnginePanel({
  spots,
}: {
  spots: ParkingSpot[];
}) {
  const premiumSpots = spots.filter(
    (spot) => spot.zone_type === "beach" || spot.zone_type === "event"
  );

  return (
    <section id="dynamic-pricing" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 21</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Dynamic Pricing Engine
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              The Last Spot now supports intelligent pricing infrastructure
              based on beach demand, events, weather, occupancy, weekends,
              and premium parking zones.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              Premium Zone Spots
            </p>
            <p className="mt-2 text-3xl md:text-5xl font-black">
              {premiumSpots.length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-8 shadow-[6px_6px_0_#082743]">
            <p className="text-3xl font-black text-[#082743]">
              Smart Price Adjustments
            </p>

            <div className="mt-6 grid gap-4">
              {[
                ["Memorial Day Weekend", "+45%"],
                ["Beach Concert Event", "+30%"],
                ["Rainy Weekday", "-20%"],
                ["High Occupancy", "+18%"],
                ["Trusted Host Bonus", "+10%"],
                ["Premium Boardwalk Zone", "+25%"],
              ].map(([label, change]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-2xl bg-white p-4 shadow"
                >
                  <div>
                    <p className="font-black">{label}</p>
                  </div>

                  <div className="rounded-full bg-[#082743] px-4 py-2 text-sm font-black text-[#FFD33D]">
                    {change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-[#082743] p-6 text-white">
              <p className="text-2xl font-black">Pricing Variables</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Weekend demand",
                  "Holiday traffic",
                  "Beach weather",
                  "Event parking demand",
                  "Nearby occupancy",
                  "Shore Trust Score",
                  "Vehicle-size compatibility",
                  "Walking distance",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 p-4 font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#F4F4F4] p-6">
              <p className="text-2xl font-black">Marketplace Revenue Intelligence</p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Dynamic Pricing
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    LIVE
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Surge Events
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    READY
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Premium Zones
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    {premiumSpots.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Revenue AI
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    NEXT
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Weekend Surge</p>
            <p className="mt-2 text-4xl font-black">ON</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Event Pricing</p>
            <p className="mt-2 text-4xl font-black">LIVE</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Premium Zones</p>
            <p className="mt-2 text-4xl font-black">
              {premiumSpots.length}
            </p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">AI Pricing</p>
            <p className="mt-2 text-4xl font-black">READY</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function RealMapAPIIntegrationPanel({
  spots,
}: {
  spots: ParkingSpot[];
}) {
  const geoReadySpots = spots.filter((spot) => spot.latitude != null && spot.longitude != null);

  return (
    <section id="real-maps" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 20</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Real Maps + Live Navigation
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              The Last Spot is now structured for Google Maps or Mapbox integration,
              real walking distance, near-me search, live pins, and beach-radius discovery.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              Geo-Ready Spots
            </p>
            <p className="mt-2 text-3xl md:text-5xl font-black">
              {geoReadySpots.length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="relative min-h-[560px] overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#1697D6] shadow-[8px_8px_0_#082743]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,#1697D6,#082743)]" />

            <div className="absolute left-0 top-0 h-full w-full opacity-40">
              <div className="absolute left-[10%] top-[20%] h-[2px] w-[80%] rotate-12 bg-white" />
              <div className="absolute left-[5%] top-[55%] h-[2px] w-[90%] -rotate-6 bg-white" />
              <div className="absolute left-[35%] top-[0%] h-full w-[2px] rotate-6 bg-white" />
              <div className="absolute left-[68%] top-[0%] h-full w-[2px] -rotate-3 bg-white" />
            </div>

            <div className="absolute left-6 top-6 rounded-2xl bg-white/90 p-4 font-black text-[#082743] backdrop-blur">
              Ocean City / Cape May Map Layer
            </div>

            {spots.slice(0, 8).map((spot, index) => {
              const positions = [
                "left-[18%] top-[26%]",
                "left-[56%] top-[34%]",
                "left-[34%] top-[64%]",
                "left-[72%] top-[58%]",
                "left-[44%] top-[18%]",
                "left-[14%] top-[74%]",
                "left-[80%] top-[28%]",
                "left-[62%] top-[78%]",
              ];

              return (
                <div
                  key={spot.id || spot.title}
                  className={`absolute ${positions[index]} group`}
                >
                  <div className="rounded-full border-4 border-[#082743] bg-[#FFD33D] px-4 py-3 font-black shadow-[4px_4px_0_#082743]">
                    ${spot.price}
                  </div>

                  <div className="absolute left-1/2 top-14 hidden w-56 -translate-x-1/2 rounded-2xl bg-white p-3 text-sm font-bold shadow-xl group-hover:block">
                    <p className="font-black">{spot.title}</p>
                    <p>{spot.town}</p>
                    <p>{spot.walking_distance || "Walking distance pending"}</p>
                    <p>{spot.near_beach ? "Near beach" : "Geo pending"}</p>
                  </div>
                </div>
              );
            })}

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 font-black text-[#082743] backdrop-blur">
              API-ready map shell. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY or Mapbox token when ready for real map rendering.
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-[#082743] p-6 text-white">
              <p className="text-2xl font-black">Live Navigation Features</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Near me parking",
                  "Walking directions",
                  "Beach radius search",
                  "Boardwalk ETA",
                  "Premium event zones",
                  "Geo-verified driveways",
                  "Map pin price bubbles",
                  "Vehicle-size map filters",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 p-4 font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#FFF3D6] p-6">
              <p className="text-2xl font-black">API Setup Checklist</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Create Google Maps API key",
                  "Enable Maps JavaScript API",
                  "Enable Places API",
                  "Enable Directions API",
                  "Restrict key to domain",
                  "Add key to Vercel env vars",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white p-4 font-black shadow"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Near Me</p>
            <p className="mt-2 text-4xl font-black">READY</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Directions</p>
            <p className="mt-2 text-4xl font-black">API</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Geo Pins</p>
            <p className="mt-2 text-4xl font-black">{spots.length}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Beach Radius</p>
            <p className="mt-2 text-4xl font-black">LIVE</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function MobileExperiencePanel({
  bookings,
}: {
  bookings: BookingRequest[];
}) {
  const favoritesCount = Math.max(3, bookings.length);

  return (
    <section id="mobile" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 19</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Mobile Experience + Notifications
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              The Last Spot is now evolving into a true mobile-first marketplace
              optimized for beach weekends, events, weddings, and last-minute parking.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              Mobile Ready
            </p>
            <p className="mt-2 text-3xl md:text-5xl font-black">
              YES
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#FFF3D6] p-6 shadow-[6px_6px_0_#082743]">
            <div className="mx-auto w-full max-w-[300px] rounded-[3rem] border-[12px] border-[#082743] bg-black p-3 shadow-2xl">
              <div className="overflow-hidden rounded-[2rem] bg-white">
                <div className="bg-[#082743] p-4 text-white">
                  <p className="text-lg font-black">The Last Spot</p>
                  <p className="text-xs font-bold text-[#FFD33D]">
                    Mobile Marketplace Experience
                  </p>
                </div>

                <div className="space-y-3 p-4">
                  <div className="rounded-2xl bg-[#F4F4F4] p-3">
                    <p className="font-black">2 Blocks From Beach</p>
                    <p className="text-sm font-bold text-slate-600">
                      Ocean City • SUV Friendly
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded-full bg-[#FFD33D] px-3 py-1 text-xs font-black">
                        VERIFIED
                      </span>

                      <span className="font-black">$25/day</span>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#082743] p-3 text-white">
                    <p className="font-black">Upcoming Reservation</p>
                    <p className="text-sm font-bold text-[#FFD33D]">
                      QR Pass Ready
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#F4F4F4] p-3">
                    <p className="font-black">Push Notifications</p>
                    <p className="text-sm font-bold text-slate-600">
                      Booking alerts + event parking
                    </p>
                  </div>
                </div>

                <div className="sticky bottom-0 flex items-center justify-between bg-[#082743] p-4 text-white">
                  <span className="font-black">Reserve Spot</span>
                  <button className="rounded-full bg-[#FFD33D] px-4 py-2 text-sm font-black text-[#082743]">
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-[#082743] p-6 text-white">
              <p className="text-2xl font-black">Mobile Features</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Sticky booking bar",
                  "Push notifications",
                  "Saved favorites",
                  "Touch-first booking flow",
                  "Apple Wallet groundwork",
                  "Fast event reservations",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 p-4 font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#FFF3D6] p-6">
              <p className="text-2xl font-black">Mobile Metrics</p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Saved Favorites
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    {favoritesCount}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Push Ready
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    LIVE
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Mobile Bookings
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    {bookings.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow">
                  <p className="text-sm font-black uppercase">
                    Wallet Ready
                  </p>

                  <p className="mt-2 text-4xl font-black">
                    ✓
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Push Alerts</p>
            <p className="mt-2 text-4xl font-black">READY</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Favorites</p>
            <p className="mt-2 text-4xl font-black">{favoritesCount}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Mobile UX</p>
            <p className="mt-2 text-4xl font-black">A+</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Wallet Ready</p>
            <p className="mt-2 text-4xl font-black">YES</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function QRCheckInPanel({
  bookings,
}: {
  bookings: BookingRequest[];
}) {
  const approved = bookings.filter((b) => b.status === "approved");

  return (
    <section id="qr-checkin" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 18</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              QR Check-In + Verified Parking
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              Every approved reservation can now generate a verified QR parking pass
              for arrivals, event parking, and driveway validation.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              Verified Reservations
            </p>
            <p className="mt-2 text-3xl md:text-5xl font-black">
              {approved.length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border-4 border-[#082743] bg-[#F4F4F4] p-8">
            <p className="text-2xl font-black">Verified Parking Pass</p>

            <div className="mt-6 rounded-[2rem] border-4 border-dashed border-[#082743] bg-white p-8 text-center shadow-[6px_6px_0_#082743]">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-3xl border-4 border-[#082743] bg-[#FFF3D6] text-center text-xl font-black">
                QR<br />PASS
              </div>

              <p className="mt-5 text-3xl font-black text-[#082743]">
                THE LAST SPOT
              </p>

              <p className="mt-2 font-bold text-slate-600">
                Scan for verified parking check-in
              </p>

              <div className="mt-5 inline-flex rounded-full bg-[#082743] px-5 py-3 text-sm font-black uppercase text-[#FFD33D]">
                VERIFIED RESERVATION
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-[#082743] p-6 text-white">
              <p className="text-2xl font-black">QR Capabilities</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Arrival confirmation",
                  "Driveway verification",
                  "Anti-fraud validation",
                  "Event parking scanning",
                  "Occupancy tracking",
                  "Printable parking signs",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-white/10 p-4 font-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#FFF3D6] p-6">
              <p className="text-2xl font-black">Recent QR Reservations</p>

              <div className="mt-4 grid gap-3">
                {approved.slice(0, 4).map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl bg-white p-4 shadow"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-black">{booking.customer_name}</p>
                        <p className="text-sm font-bold text-slate-600">
                          {booking.spot_title}
                        </p>
                      </div>

                      <div className="rounded-full bg-[#082743] px-3 py-2 text-xs font-black uppercase text-[#FFD33D]">
                        {booking.qr_code || "QR Ready"}
                      </div>
                    </div>
                  </div>
                ))}

                {approved.length === 0 && (
                  <div className="rounded-2xl bg-white p-4 font-bold shadow">
                    No approved QR reservations yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">QR Enabled</p>
            <p className="mt-2 text-4xl font-black">YES</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Verified Spots</p>
            <p className="mt-2 text-4xl font-black">{approved.length}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Anti-Fraud</p>
            <p className="mt-2 text-4xl font-black">✓</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Event Ready</p>
            <p className="mt-2 text-4xl font-black">LIVE</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function LiveMapPanel({
  spots,
}: {
  spots: ParkingSpot[];
}) {
  return (
    <section id="live-map" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 17</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Live Maps + Geolocation
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              Discover parking visually across Ocean City, Cape May, Wildwood,
              and future shore markets.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              Active Shore Spots
            </p>
            <p className="mt-2 text-3xl md:text-5xl font-black">
              {spots.length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[500px] overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#1697D6] shadow-[8px_8px_0_#082743]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#FFD33D_0,transparent_20%),radial-gradient(circle_at_70%_40%,#FF8A3D_0,transparent_18%),radial-gradient(circle_at_50%_80%,#082743_0,transparent_25%),linear-gradient(135deg,#1697D6,#082743)]" />

            {spots.slice(0, 6).map((spot, index) => {
              const positions = [
                "left-[18%] top-[22%]",
                "left-[58%] top-[35%]",
                "left-[35%] top-[68%]",
                "left-[72%] top-[62%]",
                "left-[48%] top-[18%]",
                "left-[12%] top-[72%]",
              ];

              return (
                <div
                  key={spot.id}
                  className={`absolute ${positions[index]} rounded-full border-4 border-[#082743] bg-[#FFD33D] px-4 py-3 font-black shadow-[4px_4px_0_#082743]`}
                >
                  ${spot.price}
                </div>
              );
            })}

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 font-black text-[#082743] backdrop-blur">
              Interactive shore map prototype — next upgrade connects Google Maps or Mapbox APIs.
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl bg-[#F4F4F4] p-6">
              <p className="text-2xl font-black">Geo Discovery Engine</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Nearest beach parking",
                  "Boardwalk radius search",
                  "Event parking clusters",
                  "Walking distance estimates",
                  "Vehicle-fit filtering",
                  "Premium zone detection",
                ].map((item) => (
                  <div key={item} className="rounded-2xl bg-white p-3 font-black shadow">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#082743] p-6 text-white">
              <p className="text-2xl font-black">Shore Expansion Targets</p>

              <div className="mt-4 grid gap-3">
                {[
                  "Ocean City",
                  "Cape May",
                  "Wildwood",
                  "Sea Isle",
                  "Avalon",
                  "Stone Harbor",
                ].map((town) => (
                  <div
                    key={town}
                    className="rounded-2xl bg-white/10 p-4 font-black"
                  >
                    {town}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Near Beach</p>
            <p className="mt-2 text-4xl font-black">✓</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Walking Radius</p>
            <p className="mt-2 text-4xl font-black">0.3mi</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Map Pins</p>
            <p className="mt-2 text-4xl font-black">{spots.length}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Geo Ready</p>
            <p className="mt-2 text-4xl font-black">YES</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function PaymentsInfrastructurePanel({
  bookings,
}: {
  bookings: BookingRequest[];
}) {
  const paidBookings = bookings.filter((b) => b.payment_status === "paid");
  const depositDue = bookings.filter((b) => b.payment_status === "deposit_due");

  const grossRevenue = paidBookings.reduce(
    (sum, booking) => sum + Number(booking.spot_price || 0),
    0
  );

  const estimatedPlatformRevenue = Math.round(grossRevenue * 0.15);
  const estimatedHostPayouts = grossRevenue - estimatedPlatformRevenue;

  return (
    <section id="payments" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 16</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Stripe + Payment Infrastructure
            </h2>
            <p className="mt-3 max-w-3xl font-bold text-slate-600">
              The Last Spot is now preparing for real payments, deposits,
              host payouts, platform fees, and cancellation protection.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">
              Marketplace Revenue
            </p>
            <p className="mt-2 text-3xl md:text-5xl font-black">
              ${grossRevenue}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Paid Bookings</p>
            <p className="mt-2 text-4xl font-black">{paidBookings.length}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Deposit Due</p>
            <p className="mt-2 text-4xl font-black">{depositDue.length}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Platform Revenue</p>
            <p className="mt-2 text-4xl font-black">
              ${estimatedPlatformRevenue}
            </p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Host Payouts</p>
            <p className="mt-2 text-4xl font-black">
              ${estimatedHostPayouts}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-3xl bg-[#F4F4F4] p-6">
            <p className="text-2xl font-black">Stripe Roadmap</p>

            <div className="mt-4 grid gap-3">
              {[
                "Secure card payments",
                "Automatic host payouts",
                "Cancellation protection",
                "Escrow-style deposits",
                "Platform fee collection",
                "Refund management",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-3 font-black shadow">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white">
            <p className="text-2xl font-black">Payment Statuses</p>

            <div className="mt-4 grid gap-3">
              {bookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="rounded-2xl bg-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-black">{booking.customer_name}</p>
                      <p className="text-sm font-bold">
                        {booking.spot_title}
                      </p>
                    </div>

                    <span className="rounded-full bg-[#FFD33D] px-3 py-2 text-xs font-black text-[#082743]">
                      {booking.payment_status || "unpaid"}
                    </span>
                  </div>
                </div>
              ))}

              {bookings.length === 0 && (
                <div className="rounded-2xl bg-white/10 p-4 font-bold">
                  No payment activity yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function OwnerDashboard({
  user,
  bookings,
}: {
  user: UserProfile | null;
  bookings: BookingRequest[];
}) {
  const ownerBookings = bookings.filter((b) => b.status === "approved");
  const earnings = ownerBookings.reduce((sum, b) => sum + Number(b.spot_price || 0), 0);

  return (
    <section id="owner-dashboard" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 15</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Owner Dashboard
            </h2>
            <p className="mt-3 max-w-2xl font-bold text-slate-600">
              Hosts can now manage listings, monitor earnings, track bookings,
              and prepare for full marketplace operations.
            </p>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white shadow-xl">
            <p className="text-sm uppercase font-black text-[#FFD33D]">Logged In As</p>
            <p className="text-2xl font-black">{user?.full_name || "Guest"}</p>
            <p className="font-bold">{user?.role || "visitor"}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Approved Bookings</p>
            <p className="mt-2 text-4xl font-black">{ownerBookings.length}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Projected Earnings</p>
            <p className="mt-2 text-4xl font-black">${earnings}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Trust Score</p>
            <p className="mt-2 text-4xl font-black">{user?.trust_score || 80}</p>
          </div>

          <div className="rounded-3xl bg-[#FFF3D6] p-5">
            <p className="text-sm font-black uppercase">Verification</p>
            <p className="mt-2 text-2xl font-black">
              {user?.verified ? "Verified" : "Pending"}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-5 grid-cols-1 lg:grid-cols-2">
          <div className="rounded-3xl bg-[#F4F4F4] p-6">
            <p className="text-2xl font-black">Upcoming Marketplace Powers</p>

            <div className="mt-4 grid gap-3">
              {[
                "Edit parking spots",
                "Block unavailable dates",
                "Manage host payouts",
                "Track repeat renters",
                "View review history",
                "Respond to disputes",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-3 font-black shadow">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[#082743] p-6 text-white">
            <p className="text-2xl font-black">Recent Approved Requests</p>

            <div className="mt-4 grid gap-3">
              {ownerBookings.slice(0, 4).map((booking) => (
                <div key={booking.id} className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xl font-black">{booking.spot_title}</p>
                  <p className="font-bold">{booking.customer_name}</p>
                  <p className="font-bold text-[#FFD33D]">
                    ${booking.spot_price}
                  </p>
                </div>
              ))}

              {ownerBookings.length === 0 && (
                <div className="rounded-2xl bg-white/10 p-4 font-bold">
                  No approved bookings yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function AuthDashboard({
  user,
  onSignOut,
  onDemoLogin,
}: {
  user: UserProfile | null;
  onSignOut: () => void;
  onDemoLogin: (email: string) => void;
}) {
  const [loginEmail, setLoginEmail] = useState("");

  return (
    <section className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-8 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Phase 14</p>
            <h2 className="text-3xl md:text-5xl font-black text-[#082743]">
              Authentication Foundation
            </h2>
            <p className="mt-3 max-w-2xl font-bold text-slate-600">
              The Last Spot is now preparing for real renter and owner accounts,
              secure dashboards, Google login, and protected marketplace actions.
            </p>
          </div>

          {user ? (
            <div className="rounded-3xl bg-[#082743] p-5 text-white shadow-xl">
              <p className="text-2xl font-black">{user.full_name}</p>
              <p className="font-bold">{user.email}</p>
              <p className="mt-2 text-[#FFD33D] font-black uppercase">
                {user.role}
              </p>
              <button
                onClick={onSignOut}
                className="mt-4 rounded-2xl bg-[#FFD33D] px-5 py-3 font-black text-[#082743]"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#FFF3D6] p-5 shadow-xl">
              <p className="font-black text-xl">Demo Login</p>
              <input
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Enter your profile email"
                className="mt-3 rounded-xl border-2 border-[#082743] p-3 font-bold"
              />
              <button
                onClick={() => onDemoLogin(loginEmail)}
                className="mt-3 w-full rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 font-black shadow-[4px_4px_0_#082743]"
              >
                LOGIN
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          {[
            ["Google Auth", "Next phase integration"],
            ["Apple Login", "iOS-ready identity layer"],
            ["Protected Dashboards", "Owner + Admin access"],
            ["Session Persistence", "Stay logged in securely"],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-3xl bg-[#F4F4F4] p-5">
              <p className="text-xl font-black">{title}</p>
              <p className="mt-2 font-bold text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function AccountPortal({
  profile,
  email,
  name,
  role,
  setEmail,
  setName,
  setRole,
  onSaveProfile,
}: {
  profile: UserProfile | null;
  email: string;
  name: string;
  role: string;
  setEmail: (value: string) => void;
  setName: (value: string) => void;
  setRole: (value: string) => void;
  onSaveProfile: () => void;
}) {
  return (
    <section id="account" className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#082743] p-8 text-white shadow-xl">
          <p className="font-black uppercase text-[#FFD33D]">Account System</p>
          <h2 className="mt-2 text-4xl font-black">Renter + Owner profiles.</h2>
          <p className="mt-4 font-bold text-white/80">
            This is the bridge toward Google/Apple login, host dashboards, renter history, protected admin tools, and real trust scores.
          </p>

          <div className="mt-6 grid gap-3">
            {[
              "Create renter/owner profile",
              "Track role and trust score",
              "Store verified account status",
              "Prepare for Supabase Auth",
              "Future Google + Apple sign-in",
            ].map((item) => (
              <p key={item} className="flex items-center gap-2 font-black">
                <CheckCircle2 className="h-5 w-5 text-[#FFD33D]" /> {item}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743]">
          <h3 className="text-3xl font-black">Create Test Profile</h3>
          <p className="mt-2 font-bold text-slate-600">
            MVP profile creator. Later this gets replaced by Supabase Auth login.
          </p>

          <div className="mt-5 grid gap-3">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-xl border-2 border-[#082743] p-3 font-bold">
              <option value="renter">Renter</option>
              <option value="owner">Owner / Host</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button onClick={onSaveProfile} className="mt-5 w-full rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-4 font-black uppercase shadow-[4px_4px_0_#082743]">
            Save Profile
          </button>

          {profile && (
            <div className="mt-5 rounded-2xl bg-[#FFF3D6] p-4 font-bold shadow">
              <p className="text-xl font-black">{profile.full_name}</p>
              <p>{profile.email}</p>
              <p className="mt-2">Role: {profile.role || role}</p>
              <p>Shore Trust Score: {profile.trust_score || 80}/100</p>
              <p>Verified: {profile.verified ? "Yes" : "Not yet"}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function SecurityRoadmapPanel() {
  return (
    <section id="security" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">Production Hardening Roadmap</p>
        <h2 className="text-4xl font-black">From MVP mode to secure marketplace.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Supabase Auth", "Google, Apple, and email login for renters and owners."],
            ["Role-Based Access", "Admins approve; owners manage spots; renters book and review."],
            ["Protected Dashboards", "Move admin buttons behind authenticated admin role."],
            ["Stripe Connect", "Deposits, full payments, platform fees, and host payouts."],
            ["Verified Identity", "Profile verification, owner docs, and trust score inputs."],
            ["Audit Trail", "Track approvals, status changes, disputes, and refunds."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-[#FFF3D6] p-5 shadow-md">
              <p className="text-xl font-black">{title}</p>
              <p className="mt-2 font-bold text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function ShoreTrustPanel({ reviews }: { reviews: Review[] }) {
  const reviewCount = reviews.length;
  const avgRating =
    reviewCount > 0
      ? (reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviewCount).toFixed(1)
      : "0.0";
  const shoreTrustScore = Math.min(100, Math.round(80 + reviewCount * 2 + Number(avgRating) * 2));

  return (
    <section id="trust" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">Proprietary Trust Layer</p>
        <h2 className="text-4xl font-black">Shore Trust Score</h2>
        <p className="mt-2 font-bold text-slate-600">
          A marketplace reputation system for owners, renters, and verified parking spots.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-[#FFD33D] p-5 text-center shadow-md">
            <p className="text-3xl md:text-5xl font-black">{shoreTrustScore}</p>
            <p className="text-sm font-black uppercase">Platform Trust</p>
          </div>
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-3xl md:text-5xl font-black">{avgRating}</p>
            <p className="text-sm font-black uppercase">Avg Rating</p>
          </div>
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-3xl md:text-5xl font-black">{reviewCount}</p>
            <p className="text-sm font-black uppercase">Reviews</p>
          </div>
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-3xl md:text-5xl font-black">✓</p>
            <p className="text-sm font-black uppercase">Verified Badges</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Verified Owner", "Property ownership/authority confirmed before going live."],
            ["Trusted Renter", "Clean history, completed bookings, good owner reviews."],
            ["Top Rated Spot", "High rating, accurate listing, easy access, few issues."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-[#EAF7F6] p-5 shadow-md">
              <p className="text-xl font-black">{title}</p>
              <p className="mt-2 font-bold text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-2xl font-black">Recent Reviews</h3>
          {reviews.length === 0 && <p className="rounded-2xl bg-[#FFF3D6] p-4 font-bold">No reviews yet. Use the Review button on an approved booking.</p>}
          {reviews.slice(0, 4).map((review) => (
            <div key={review.id} className="rounded-2xl border-2 border-[#082743] bg-[#FFF8EB] p-4 shadow-[4px_4px_0_#082743]">
              <p className="font-black">⭐ {review.rating}/5 — {review.review_type}</p>
              <p className="text-sm font-bold text-slate-600">Reviewed: {review.reviewed_email}</p>
              <p className="mt-2 font-bold">{review.comment || "No comment provided."}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function GrowthRoadmapPanel() {
  return (
    <section id="growth-stack" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743]">
        <p className="text-sm font-black uppercase text-[#1697D6]">V11 Growth Stack</p>
        <h2 className="text-4xl font-black">Revenue + Operations Layer</h2>
        <p className="mt-2 font-bold text-slate-600">
          These modules prepare The Last Spot for payments, QR passes, image verification, maps, dynamic pricing, and host earnings.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Stripe Ready", "Deposit/full-payment statuses and checkout-ready booking flow."],
            ["QR Passes", "Approved bookings can move toward arrival/departure scan validation."],
            ["Image Verification", "Host submissions include photo/document notes now; storage upload comes next."],
            ["Map View Ready", "Spot detail data is structured for pins, walkability, and beach proximity."],
            ["Dynamic Pricing", "Event mode, weather demand, and vehicle fit can influence pricing."],
            ["Host Earnings", "Booking values and statuses now support owner earnings dashboards."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-[#FFF3D6] p-5 shadow-md">
              <p className="text-xl font-black">{title}</p>
              <p className="mt-2 font-bold text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HostEarningsPanel({ bookings }: { bookings: BookingRequest[] }) {
  const approved = bookings.filter((booking) => booking.status === "approved");
  const paid = bookings.filter((booking) => booking.payment_status === "paid");
  const approvedValue = approved.reduce((sum, booking) => sum + Number(booking.spot_price || 0), 0);
  const platformFee = Math.round(approvedValue * 0.15);
  const estimatedHostPayout = approvedValue - platformFee;

  return (
    <section id="earnings" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] bg-[#082743] p-6 text-white shadow-xl">
        <p className="text-sm font-black uppercase text-[#FFD33D]">Host Earnings Dashboard</p>
        <h2 className="text-4xl font-black">Weekend revenue snapshot.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-3xl bg-white/10 p-5 text-center">
            <p className="text-4xl font-black text-[#FFD33D]">{approved.length}</p>
            <p className="text-sm font-black uppercase">Approved Bookings</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 text-center">
            <p className="text-4xl font-black text-[#FFD33D]">{paid.length}</p>
            <p className="text-sm font-black uppercase">Paid</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 text-center">
            <p className="text-4xl font-black text-[#FFD33D]">${approvedValue}</p>
            <p className="text-sm font-black uppercase">Gross Value</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 text-center">
            <p className="text-4xl font-black text-[#FFD33D]">${estimatedHostPayout}</p>
            <p className="text-sm font-black uppercase">Est. Host Payout</p>
          </div>
        </div>
        <p className="mt-5 rounded-2xl bg-white/10 p-4 font-bold text-white/80">
          Assumes a 15% platform fee. Later this will connect to Stripe Connect for automated host payouts.
        </p>
      </div>
    </section>
  );
}

function MapPreviewPanel() {
  return (
    <section id="map" className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] border-4 border-[#082743] bg-[#1697D6] shadow-[8px_8px_0_#082743]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#FFD33D_0,transparent_18%),radial-gradient(circle_at_70%_60%,#FF8A3D_0,transparent_16%),linear-gradient(135deg,#1697D6,#082743)]" />
          <div className="absolute left-[18%] top-[28%] rounded-full border-4 border-[#082743] bg-[#FFD33D] px-4 py-3 font-black shadow-[4px_4px_0_#082743]">P $25</div>
          <div className="absolute left-[58%] top-[38%] rounded-full border-4 border-[#082743] bg-white px-4 py-3 font-black shadow-[4px_4px_0_#082743]">P $40</div>
          <div className="absolute left-[42%] top-[68%] rounded-full border-4 border-[#082743] bg-[#FF8A3D] px-4 py-3 font-black text-white shadow-[4px_4px_0_#082743]">Event</div>
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 font-black text-[#082743] backdrop-blur">
            Map preview placeholder — next version can connect Google Maps/Mapbox pins.
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-md">
          <p className="text-sm font-black uppercase text-[#1697D6]">Map + Demand Intelligence</p>
          <h2 className="mt-2 text-3xl font-black">Pins, events, walkability, and surge zones.</h2>
          <div className="mt-5 space-y-3 font-bold">
            <p>✓ Beach/boardwalk distance</p>
            <p>✓ Event hot zones</p>
            <p>✓ Vehicle-size filtering</p>
            <p>✓ Verified QR sign locations</p>
            <p>✓ Weather/event pricing overlays</p>
          </div>
        </div>
      </div>
    </section>
  );
}


function HostPortal() {
  const [hostName, setHostName] = useState("");
  const [hostEmail, setHostEmail] = useState("");
  const [hostPhone, setHostPhone] = useState("");
  const [spotTitle, setSpotTitle] = useState("");
  const [town, setTown] = useState("Ocean City");
  const [address, setAddress] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [weeklyPrice, setWeeklyPrice] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [description, setDescription] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("Tax bill / public record");
  const [documentNote, setDocumentNote] = useState("");
  const [photoNote, setPhotoNote] = useState("");
  const [ownerAttestation, setOwnerAttestation] = useState(false);
  const [vehicleSize, setVehicleSize] = useState("SUV Friendly");
  const [maxVehicleLength, setMaxVehicleLength] = useState("");
  const [heightRestriction, setHeightRestriction] = useState("");
  const [fitNotes, setFitNotes] = useState("");
  const [coveredParking, setCoveredParking] = useState(false);
  const [evCharger, setEvCharger] = useState(false);
  const [oversizedAllowed, setOversizedAllowed] = useState(false);
  const [backingInRequired, setBackingInRequired] = useState(false);
  const [parallelParkingOnly, setParallelParkingOnly] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submitHostSpot() {
    setStatus("sending");

    if (supabase) {
      const { error } = await supabase.from("host_submissions").insert({
        host_name: hostName,
        host_email: hostEmail,
        host_phone: hostPhone,
        spot_title: spotTitle,
        town,
        address,
        daily_price: Number(dailyPrice || 0),
        weekly_price: Number(weeklyPrice || 0),
        monthly_price: Number(monthlyPrice || 0),
        description,
        verification_method: verificationMethod,
        document_note: documentNote,
        photo_note: photoNote,
        owner_attestation: ownerAttestation,
        vehicle_size: vehicleSize,
        max_vehicle_length: maxVehicleLength,
        height_restriction: heightRestriction,
        fit_notes: fitNotes,
        covered_parking: coveredParking,
        ev_charger: evCharger,
        oversized_allowed: oversizedAllowed,
        backing_in_required: backingInRequired,
        parallel_parking_only: parallelParkingOnly,
        status: "pending_verification",
      });

      if (error) {
        console.error("Host submission failed:", error);
        setStatus("error");
        return;
      }
    }

    setStatus("sent");
  }

  return (
    <section id="host-portal" className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[2rem] bg-[#082743] p-8 text-white shadow-xl">
          <p className="font-black uppercase text-[#FFD33D]">Host Submission Portal</p>
          <h2 className="mt-2 text-4xl font-black">List your spot. We’ll handle the rest.</h2>
          <p className="mt-4 font-bold text-white/80">
            Homeowners can now submit their driveway or private parking spot for review. Admin approval comes next.
          </p>
          <div className="mt-6 space-y-3">
            {["Submit address + pricing", "Upload/confirm ownership proof", "Admin verifies photos + documents", "Optional mailed-code verification", "Spot goes live after approval", "QR sign installed for check-in"].map((item) => (
              <p key={item} className="flex items-center gap-2 font-black">
                <CheckCircle2 className="h-5 w-5 text-[#FFD33D]" /> {item}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743]">
          <h3 className="text-3xl font-black">Submit a Parking Spot</h3>
          <div className="mt-5 grid gap-3">
            <input value={hostName} onChange={(e) => setHostName(e.target.value)} placeholder="Host name" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            <input value={hostEmail} onChange={(e) => setHostEmail(e.target.value)} placeholder="Host email" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            <input value={hostPhone} onChange={(e) => setHostPhone(e.target.value)} placeholder="Host phone" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            <input value={spotTitle} onChange={(e) => setSpotTitle(e.target.value)} placeholder="Spot title e.g. 2 Blocks from Beach" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            <select value={town} onChange={(e) => setTown(e.target.value)} className="rounded-xl border-2 border-[#082743] p-3 font-bold">
              <option>Ocean City</option>
              <option>Cape May</option>
              <option>Sea Isle</option>
              <option>Avalon</option>
              <option>Stone Harbor</option>
              <option>Wildwood</option>
            </select>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Property address" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            <div className="grid gap-3 md:grid-cols-3">
              <input value={dailyPrice} onChange={(e) => setDailyPrice(e.target.value)} placeholder="Daily $" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
              <input value={weeklyPrice} onChange={(e) => setWeeklyPrice(e.target.value)} placeholder="Weekly $" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
              <input value={monthlyPrice} onChange={(e) => setMonthlyPrice(e.target.value)} placeholder="Monthly $" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
            </div>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the spot, access notes, nearby beach/boardwalk, vehicle size, etc." className="min-h-[110px] rounded-xl border-2 border-[#082743] p-3 font-bold" />

            <div className="rounded-2xl border-4 border-[#082743] bg-[#EAF7F6] p-4">
              <p className="text-sm font-black uppercase text-[#1697D6]">Vehicle Fit + Access Details</p>
              <p className="mt-1 text-sm font-bold text-slate-600">This prevents bad bookings and helps renters know whether their car, SUV, truck, or trailer will fit.</p>

              <select value={vehicleSize} onChange={(e) => setVehicleSize(e.target.value)} className="mt-3 w-full rounded-xl border-2 border-[#082743] p-3 font-bold">
                <option>Compact Car</option>
                <option>Sedan</option>
                <option>SUV Friendly</option>
                <option>Full-Size Truck</option>
                <option>Van</option>
                <option>Boat Trailer</option>
                <option>Multiple Cars</option>
                <option>Oversized Vehicle Approved</option>
              </select>

              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <input value={maxVehicleLength} onChange={(e) => setMaxVehicleLength(e.target.value)} placeholder="Max vehicle length e.g. 18 ft, Suburban OK" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
                <input value={heightRestriction} onChange={(e) => setHeightRestriction(e.target.value)} placeholder="Height restrictions e.g. low branches, garage height" className="rounded-xl border-2 border-[#082743] p-3 font-bold" />
              </div>

              <textarea value={fitNotes} onChange={(e) => setFitNotes(e.target.value)} placeholder="Fit notes e.g. Fits Tahoe/Suburban, tight fit, backing in required, parallel parking only, Tesla charger available..." className="mt-3 min-h-[90px] w-full rounded-xl border-2 border-[#082743] p-3 font-bold" />

              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {[
                  ["Covered parking", coveredParking, setCoveredParking],
                  ["EV charger available", evCharger, setEvCharger],
                  ["Oversized vehicle approved", oversizedAllowed, setOversizedAllowed],
                  ["Backing in required", backingInRequired, setBackingInRequired],
                  ["Parallel parking only", parallelParkingOnly, setParallelParkingOnly],
                ].map(([label, checked, setter]: any) => (
                  <label key={label} className="flex items-center gap-2 rounded-xl bg-white p-3 text-sm font-black">
                    <input type="checkbox" checked={checked} onChange={(e) => setter(e.target.checked)} className="h-5 w-5" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border-4 border-[#082743] bg-[#FFF8EB] p-4">
              <p className="text-sm font-black uppercase text-[#1697D6]">Ownership Verification</p>
              <p className="mt-1 text-sm font-bold text-slate-600">Spots do not go live until ownership or listing authority is verified.</p>

              <select value={verificationMethod} onChange={(e) => setVerificationMethod(e.target.value)} className="mt-3 w-full rounded-xl border-2 border-[#082743] p-3 font-bold">
                <option>Tax bill / public record</option>
                <option>Deed or closing document</option>
                <option>Mortgage statement</option>
                <option>Homeowners insurance declaration</option>
                <option>Utility bill matching property</option>
                <option>Property manager authorization</option>
              </select>

              <input value={documentNote} onChange={(e) => setDocumentNote(e.target.value)} placeholder="Document note e.g. tax bill ready, deed available, PM authorization" className="mt-3 w-full rounded-xl border-2 border-[#082743] p-3 font-bold" />
              <input value={photoNote} onChange={(e) => setPhotoNote(e.target.value)} placeholder="Photo note e.g. house number visible, driveway photos ready" className="mt-3 w-full rounded-xl border-2 border-[#082743] p-3 font-bold" />

              <label className="mt-3 flex items-start gap-3 rounded-xl bg-white p-3 text-sm font-bold">
                <input type="checkbox" checked={ownerAttestation} onChange={(e) => setOwnerAttestation(e.target.checked)} className="mt-1 h-5 w-5" />
                <span>I confirm I own this property or am authorized to list this parking space. I understand The Last Spot may require documentation, photo verification, or mailed-code verification before the spot goes live.</span>
              </label>
            </div>
          </div>

          <button onClick={submitHostSpot} disabled={status === "sending" || status === "sent"} className="mt-5 w-full rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-4 font-black uppercase shadow-[4px_4px_0_#082743]">
            {status === "sent" ? "Spot Submitted" : status === "sending" ? "Submitting..." : "Submit Spot for Review"}
          </button>

          {status === "sent" && <p className="mt-3 rounded-xl bg-green-100 p-3 font-bold">Success. Your spot was submitted for ownership verification and admin review.</p>}
          {status === "error" && <p className="mt-3 rounded-xl bg-orange-100 p-3 font-bold">Host submission table is not ready yet. Run the V7 SQL table setup.</p>}
        </div>
      </div>
    </section>
  );
}

function HostSubmissionsDashboard({ submissions, loading, onRefresh, onUpdateHostStatus }: { submissions: HostSubmission[]; loading: boolean; onRefresh: () => void; onUpdateHostStatus: (id: string, status: string) => void }) {
  const pending = submissions.filter((submission) => submission.status === "pending").length;

  return (
    <section id="host-submissions" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Supply Pipeline</p>
            <h2 className="text-4xl font-black">Host Submissions</h2>
            <p className="mt-2 font-bold text-slate-600">Review new homeowners who want to list their parking spots.</p>
          </div>
          <button onClick={onRefresh} className="rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 font-black uppercase shadow-[4px_4px_0_#082743]">
            Refresh
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-4xl font-black text-[#1697D6]">{submissions.length}</p>
            <p className="text-sm font-black uppercase">Total Submissions</p>
          </div>
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-4xl font-black text-[#FF8A3D]">{pending}</p>
            <p className="text-sm font-black uppercase">Pending Review</p>
          </div>
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-4xl font-black text-[#1697D6]">QR</p>
            <p className="text-sm font-black uppercase">Sign Workflow</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {loading && <div className="rounded-2xl bg-[#FFF3D6] p-4 text-center font-black">Loading host submissions...</div>}

          {!loading && submissions.length === 0 && (
            <div className="rounded-2xl bg-[#FFF3D6] p-4 text-center font-black">
              No host submissions yet. Submit a test spot from the Host Portal.
            </div>
          )}

          {!loading && submissions.map((submission) => (
            <div key={submission.id} className="rounded-2xl border-2 border-[#082743] bg-[#FFF8EB] p-4 shadow-[4px_4px_0_#082743]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xl font-black">{submission.spot_title}</p>
                  <p className="font-bold text-slate-600">{submission.town} • ${submission.daily_price}/day • ${submission.weekly_price}/week • ${submission.monthly_price}/mo</p>
                  <p className="mt-2 font-bold">Address: {submission.address || "Not provided"}</p>
                  <p className="font-bold">Host: {submission.host_name || "N/A"} — {submission.host_email || "N/A"} — {submission.host_phone || "N/A"}</p>
                  <p className="mt-2 font-bold text-slate-600">{submission.description}</p>
                  <div className="mt-3 rounded-xl bg-[#EAF7F6] p-3 text-sm font-bold">
                    <p className="font-black uppercase text-[#1697D6]">Vehicle Fit</p>
                    <p>Size: {submission.vehicle_size || "Not listed"}</p>
                    <p>Max length: {submission.max_vehicle_length || "N/A"}</p>
                    <p>Height restriction: {submission.height_restriction || "N/A"}</p>
                    <p>Notes: {submission.fit_notes || "N/A"}</p>
                    <p>Covered: {submission.covered_parking ? "Yes" : "No"} • EV: {submission.ev_charger ? "Yes" : "No"} • Oversized: {submission.oversized_allowed ? "Yes" : "No"}</p>
                    <p>Access: {submission.backing_in_required ? "Backing in required" : submission.parallel_parking_only ? "Parallel parking only" : "Standard/Not specified"}</p>
                  </div>
                  <div className="mt-3 rounded-xl bg-white p-3 text-sm font-bold">
                    <p>Verification method: {submission.verification_method || "Not selected"}</p>
                    <p>Document note: {submission.document_note || "N/A"}</p>
                    <p>Photo note: {submission.photo_note || "N/A"}</p>
                    <p>Owner attestation: {submission.owner_attestation ? "Confirmed" : "Not confirmed"}</p>
                  </div>
                </div>
                <span className="w-fit rounded-full bg-[#FFD33D] px-4 py-2 text-xs font-black uppercase text-[#082743]">
                  {submission.status || "pending"}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => onUpdateHostStatus(submission.id, "verified")} className="rounded-xl bg-[#082743] px-4 py-2 text-sm font-black uppercase text-white">Verify Owner</button>
                <button onClick={() => onUpdateHostStatus(submission.id, "approved")} className="rounded-xl bg-[#1697D6] px-4 py-2 text-sm font-black uppercase text-white">Approve Live</button>
                <a href={`mailto:${submission.host_email || ""}?subject=The Last Spot Host Submission`} className="rounded-xl bg-white px-4 py-2 text-sm font-black uppercase text-[#082743] shadow">Contact Host</a>
                <button onClick={() => onUpdateHostStatus(submission.id, "rejected")} className="rounded-xl bg-[#FF8A3D] px-4 py-2 text-sm font-black uppercase text-white">Suspend/Reject</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function AdminDashboard({ bookings, loading, onRefresh, onUpdateBookingStatus, onMarkPaid, onReviewBooking }: { bookings: BookingRequest[]; loading: boolean; onRefresh: () => void; onUpdateBookingStatus: (id: string, status: string) => void; onMarkPaid: (id: string) => void; onReviewBooking: (booking: BookingRequest) => void }) {
  const pending = bookings.filter((booking) => booking.status === "pending").length;
  const totalValue = bookings.reduce((sum, booking) => sum + Number(booking.spot_price || 0), 0);

  return (
    <section id="admin" className="mx-auto max-w-6xl px-5 py-10">
      <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[8px_8px_0_#082743]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-[#1697D6]">Owner / Admin Dashboard</p>
            <h2 className="text-4xl font-black">Booking Requests</h2>
            <p className="mt-2 font-bold text-slate-600">Live reservation requests from Supabase.</p>
          </div>
          <button onClick={onRefresh} className="rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 font-black uppercase shadow-[4px_4px_0_#082743]">
            Refresh
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-4xl font-black text-[#1697D6]">{bookings.length}</p>
            <p className="text-sm font-black uppercase">Total Requests</p>
          </div>
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-4xl font-black text-[#FF8A3D]">{pending}</p>
            <p className="text-sm font-black uppercase">Pending</p>
          </div>
          <div className="rounded-3xl bg-[#FFF3D6] p-5 text-center shadow-md">
            <p className="text-4xl font-black text-[#1697D6]">${totalValue}</p>
            <p className="text-sm font-black uppercase">Requested Value</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {loading && <div className="rounded-2xl bg-[#FFF3D6] p-4 text-center font-black">Loading booking requests...</div>}

          {!loading && bookings.length === 0 && (
            <div className="rounded-2xl bg-[#FFF3D6] p-4 text-center font-black">
              No booking requests yet. Submit a test booking from the app.
            </div>
          )}

          {!loading && bookings.map((booking) => (
            <div key={booking.id} className="rounded-2xl border-2 border-[#082743] bg-[#FFF8EB] p-4 shadow-[4px_4px_0_#082743]">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xl font-black">{booking.spot_title}</p>
                  <p className="font-bold text-slate-600">{booking.spot_town} • ${booking.spot_price}/day • {booking.requested_rate}</p>
                  <p className="mt-2 font-bold">Requested date: {booking.requested_date || "Not provided"}</p>
                  <p className="font-bold">Customer: {booking.customer_name || "N/A"} — {booking.customer_email || "N/A"}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="w-fit rounded-full bg-[#FFD33D] px-4 py-2 text-xs font-black uppercase text-[#082743]">
                    {booking.status || "pending"}
                  </span>
                  <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-[#082743] shadow">
                    Payment: {booking.payment_status || "unpaid"}
                  </span>
                  {booking.qr_code && (
                    <span className="w-fit rounded-full bg-[#EAF7F6] px-4 py-2 text-xs font-black uppercase text-[#082743]">
                      QR: {booking.qr_code}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={() => onUpdateBookingStatus(booking.id, "approved")} className="rounded-xl bg-[#082743] px-4 py-2 text-sm font-black uppercase text-white">Approve Booking</button>
                <button onClick={() => onMarkPaid(booking.id)} className="rounded-xl bg-[#1697D6] px-4 py-2 text-sm font-black uppercase text-white">Mark Paid</button>
                <button onClick={() => onReviewBooking(booking)} className="rounded-xl bg-[#FFD33D] px-4 py-2 text-sm font-black uppercase text-[#082743]">Review</button>
                <a href={`mailto:${booking.customer_email || ""}?subject=The Last Spot Booking Request`} className="rounded-xl bg-white px-4 py-2 text-sm font-black uppercase text-[#082743] shadow">Contact</a>
                <button onClick={() => onUpdateBookingStatus(booking.id, "declined")} className="rounded-xl bg-[#FF8A3D] px-4 py-2 text-sm font-black uppercase text-white">Decline Booking</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function HomePage() {
  
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

const [spots, setSpots] = useState<ParkingSpot[]>(fallbackSpots);
  const [loading, setLoading] = useState(true);
  const [selectedTown, setSelectedTown] = useState("Ocean City");
  const [usingLiveData, setUsingLiveData] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [adminMessage, setAdminMessage] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewBooking, setReviewBooking] = useState<BookingRequest | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [profileEmail, setProfileEmail] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileRole, setProfileRole] = useState("renter");
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(null);
  const [authView, setAuthView] = useState<"signin" | "dashboard">("signin");

  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [hostSubmissions, setHostSubmissions] = useState<HostSubmission[]>([]);
  const [hostSubmissionsLoading, setHostSubmissionsLoading] = useState(true);

  async function loadHostSubmissions() {
    if (!supabase) {
      setHostSubmissions([]);
      setHostSubmissionsLoading(false);
      return;
    }

    setHostSubmissionsLoading(true);
    const { data, error } = await supabase
      .from("host_submissions")
      .select("id,host_name,host_email,host_phone,spot_title,town,address,daily_price,weekly_price,monthly_price,description,verification_method,owner_attestation,document_note,photo_note,vehicle_size,max_vehicle_length,height_restriction,fit_notes,covered_parking,ev_charger,oversized_allowed,backing_in_required,parallel_parking_only,status,created_at")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Host submissions fetch failed:", error);
      setHostSubmissions([]);
    } else {
      setHostSubmissions(data as HostSubmission[]);
    }
    setHostSubmissionsLoading(false);
  }

  useEffect(() => {
    loadHostSubmissions();
  }, []);

  
  async function signInDemo(email: string) {
    if (!supabase) {
      setAdminMessage("Supabase not connected.");
      return;
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      setAdminMessage("Profile not found. Create one first.");
      return;
    }

    setLoggedInUser(data as UserProfile);
    setAuthView("dashboard");
    setAdminMessage("Signed in successfully.");
  }

  function signOutDemo() {
    setLoggedInUser(null);
    setAuthView("signin");
    setAdminMessage("Signed out.");
  }

async function saveProfile() {
    if (!supabase) {
      setAdminMessage("Supabase is not connected.");
      return;
    }

    if (!profileEmail) {
      setAdminMessage("Add an email before saving profile.");
      return;
    }

    const payload = {
      email: profileEmail,
      full_name: profileName,
      role: profileRole,
      trust_score: profileRole === "admin" ? 100 : 80,
      verified: profileRole === "admin",
    };

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert(payload, { onConflict: "email" })
      .select()
      .single();

    if (error) {
      console.error("Profile save failed:", error);
      setAdminMessage("Profile save failed. Run the V13 SQL.");
      return;
    }

    setProfile(data as UserProfile);
    setAdminMessage("Profile saved.");
  }

  async function loadReviews() {
    if (!supabase) {
      setReviews([]);
      return;
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("id,booking_id,reviewer_email,reviewed_email,review_type,rating,communication_rating,accuracy_rating,cleanliness_rating,comment,created_at")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Reviews fetch failed:", error);
      setReviews([]);
    } else {
      setReviews(data as Review[]);
    }
  }

  async function loadBookings() {
    if (!supabase) {
      setBookings([]);
      setBookingsLoading(false);
      return;
    }

    setBookingsLoading(true);
    const { data, error } = await supabase
      .from("booking_requests")
      .select("id,spot_title,spot_town,spot_price,customer_name,customer_email,requested_date,requested_rate,status,payment_status,qr_code,created_at")
      .order("created_at", { ascending: false });

    if (error || !data) {
      console.error("Booking requests fetch failed:", error);
      setBookings([]);
    } else {
      setBookings(data as BookingRequest[]);
    }
    setBookingsLoading(false);
  }

  async function updateBookingStatus(id: string, status: string) {
    if (!supabase) {
      setAdminMessage("Supabase is not connected.");
      return;
    }

    const updatePayload: any = { status };
    if (status === "approved") {
      updatePayload.payment_status = "deposit_due";
      updatePayload.qr_code = `TLS-${id.slice(0, 6).toUpperCase()}`;
    }
    if (status === "declined") {
      updatePayload.payment_status = "unpaid";
    }

    const { data, error } = await supabase
      .from("booking_requests")
      .update(updatePayload)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Booking status update failed:", error);
      setAdminMessage("Booking update failed. Check the V11 SQL update policy.");
      return;
    }

    setBookings((current) =>
      current.map((booking) => (booking.id === id ? { ...booking, ...updatePayload } : booking))
    );
    setAdminMessage(status === "approved" ? "Booking approved. Deposit is now due and QR pass created." : `Booking marked ${status}.`);
    await loadBookings();
  }

  async function markBookingPaid(id: string) {
    if (!supabase) return;
    const { error } = await supabase.from("booking_requests").update({ payment_status: "paid" }).eq("id", id);
    if (error) {
      setAdminMessage("Payment status update failed.");
      return;
    }
    setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, payment_status: "paid" } : booking)));
    setAdminMessage("Booking marked paid.");
    await loadBookings();
  }

  async function updateHostSubmissionStatus(id: string, status: string) {
    if (!supabase) {
      setAdminMessage("Supabase is not connected.");
      return;
    }

    const { data, error } = await supabase
      .from("host_submissions")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Host submission status update failed:", error);
      setAdminMessage("Host update failed. Check the V9 SQL update policy.");
      return;
    }

    setHostSubmissions((current) =>
      current.map((submission) => (submission.id === id ? { ...submission, status } : submission))
    );
    setAdminMessage(`Host submission marked ${status}.`);
    await loadHostSubmissions();
  }

  useEffect(() => {
    loadBookings();
    loadReviews();
  }, []);

  useEffect(() => {
    async function loadSpots() {
      if (!supabase) { setSpots(fallbackSpots); setUsingLiveData(false); setLoading(false); return; }
      const { data, error } = await supabase.from("parking_spots").select("id,title,town,price,description,image_url,available,vehicle_size,max_vehicle_length,height_restriction,fit_notes,covered_parking,ev_charger,oversized_allowed,backing_in_required,parallel_parking_only,vehicle_sizes,covered,spot_length,trust_score,verified_owner,total_reviews,average_rating").eq("available", true).order("price", { ascending: true });
      if (error || !data || data.length === 0) { console.error("Supabase fetch failed:", error); setSpots(fallbackSpots); setUsingLiveData(false); }
      else { setSpots(data as ParkingSpot[]); setUsingLiveData(true); }
      setLoading(false);
    }
    loadSpots();
  }, []);

  const oceanCityCount = useMemo(() => spots.filter((s) => s.town === "Ocean City" && s.available !== false).length, [spots]);
  const capeMayCount = useMemo(() => spots.filter((s) => s.town === "Cape May" && s.available !== false).length, [spots]);


  useEffect(() => {
    if (!adminMessage) return;

    const timer = setTimeout(() => {
      setAdminMessage("");
    }, 3500);

    return () => clearTimeout(timer);
  }, [adminMessage]);


  // Universal logo-home reset handler.
  useEffect(() => {
    const handleLogoHomeClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const homeLink = target?.closest('a[href="#top"]');

      if (!homeLink) return;

      setMobileMenuOpen(false);
      setNotificationsOpen(false);
      setSelectedSpot(null);
      setReviewBooking(null);
      setAdminMessage("");

      if (typeof window !== "undefined") {
        window.setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);
      }
    };

    document.addEventListener("click", handleLogoHomeClick);
    return () => document.removeEventListener("click", handleLogoHomeClick);
  }, []);

  return (
    <main id="top" className="min-h-screen pb-24 bg-[linear-gradient(to_bottom,_#FFF8EB,_#FFD99B)] text-[#082743]">
      <Nav />
      {/* MobileQuickActions temporarily removed for build stability */}
      <MobileMenuDrawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <NotificationsDrawer open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />

      {selectedSpot && <SpotModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />}
      {reviewBooking && <ReviewModal booking={reviewBooking} onClose={() => setReviewBooking(null)} onSaved={loadReviews} />}
      {adminMessage && (
        <div className="mx-auto my-4 max-w-md rounded-2xl border-4 border-[#082743] bg-[#FFD33D] px-5 py-3 text-center font-black text-[#082743] shadow-[5px_5px_0_#082743]">
          {adminMessage}
        </div>
      )}
      <section className="relative overflow-hidden px-5 py-10 md:py-16">
        <div className="absolute right-10 top-8 h-72 w-72 rounded-full bg-[#FFB22C] opacity-70 blur-3xl" />
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[#1697D6] opacity-30 blur-3xl" />
</div>
        </div>
      </section>


      <section id="contact" className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-[2rem] border-4 border-[#082743] bg-[#082743] p-6 text-white shadow-[6px_6px_0_#1697D6]">
          <h2 className="text-4xl font-black">Contact The Last Spot</h2>
          <p className="mt-3 font-bold text-white/80">
            Questions about hosting, partnerships, Ocean City, Cape May, or launch opportunities?
          </p>
          <a
            href="mailto:ladd.ryan7@gmail.com"
            className="mt-5 inline-block rounded-full border-4 border-white bg-[#FFD33D] px-6 py-4 font-black uppercase text-[#082743] shadow-[4px_4px_0_#1697D6]"
          >
            Contact Us
          </a>
        </div>
      </section>


      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-[2rem] border-4 border-[#082743] bg-white p-6 shadow-[6px_6px_0_#082743]">
          <h2 className="text-4xl font-black text-[#082743]">How It Works</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-[#FFF3D6] p-5">
              <p className="text-sm font-black uppercase text-[#1697D6]">Drivers</p>
              <p className="mt-2 text-2xl font-black">Find → Reserve → Checkout</p>
            </div>
            <div className="rounded-2xl bg-[#FFF3D6] p-5">
              <p className="text-sm font-black uppercase text-[#1697D6]">Hosts</p>
              <p className="mt-2 text-2xl font-black">List → Price → Earn</p>
            </div>
          </div>
        </div>
      </section>

</main>
  );
}
