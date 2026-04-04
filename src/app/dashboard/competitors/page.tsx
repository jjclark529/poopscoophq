"use client";

import { useState } from "react";

/* ── Data ────────────────────────────────────────────────────────── */

const scorecard = [
  { name: "Doctor Doo", you: true, rating: 4.9, reviews: 101, price: "$35–$90", area: "Riverside Metro", years: 3, threat: null },
  { name: "ScoopMasters", you: false, rating: 4.7, reviews: 78, price: "$30–$75", area: "Riverside / Corona", years: 5, threat: "High" },
  { name: "Pooper Heroes", you: false, rating: 4.8, reviews: 45, price: "$50–$120", area: "Canyon Crest / La Sierra", years: 2, threat: "Watch" },
  { name: "Doo Duty", you: false, rating: 4.5, reviews: 156, price: "$40–$95", area: "Riverside Metro+", years: 8, threat: "High" },
  { name: "Clean Paws Co", you: false, rating: 4.3, reviews: 12, price: "$25–$65", area: "Moreno Valley", years: 1, threat: "Low" },
];

const rivalMoves = [
  { color: "bg-red-500", text: "Doo Duty posted 3 new Google posts this week", ago: "2 days ago" },
  { color: "bg-amber-400", text: "ScoopMasters launched a new Facebook ad campaign", ago: "3 days ago" },
  { color: "bg-blue-500", text: "Pooper Heroes received 3 five-star reviews this week", ago: "1 day ago" },
];

const reviewCards = [
  { name: "You", rating: 4.9, total: 101, thisMo: 8, vsLast: 3, badge: null, badgeType: null, dist: [72, 18, 6, 3, 2] },
  { name: "ScoopMasters", rating: 4.7, total: 78, thisMo: 5, vsLast: -1, badge: "You lead by 23", badgeType: "green", dist: [50, 16, 7, 3, 2] },
  { name: "Pooper Heroes", rating: 4.8, total: 45, thisMo: 3, vsLast: 0, badge: "You lead by 56", badgeType: "green", dist: [32, 8, 3, 1, 1] },
  { name: "Doo Duty", rating: 4.5, total: 156, thisMo: 2, vsLast: -4, badge: "They lead by 55", badgeType: "red", dist: [95, 30, 18, 8, 5] },
  { name: "Clean Paws Co", rating: 4.3, total: 12, thisMo: 2, vsLast: 1, badge: "You lead by 89", badgeType: "green", dist: [6, 3, 1, 1, 1] },
];

const adSpyRows = [
  { keyword: "pet waste removal riverside", ranks: [1, 3, 5, 2, null] },
  { keyword: "pooper scooper riverside", ranks: [2, 1, null, 4, null] },
  { keyword: "dog poop cleanup riverside ca", ranks: [1, 4, 7, 3, 9] },
  { keyword: "yard cleanup service riverside", ranks: [3, 2, null, 1, null] },
  { keyword: "pet waste removal corona", ranks: [5, 1, null, 3, null] },
];

const adStatus = [
  { name: "You", status: "Running", dot: "bg-green-500" },
  { name: "ScoopMasters", status: "Running", dot: "bg-red-500" },
  { name: "Pooper Heroes", status: "Not detected", dot: "bg-gray-300" },
  { name: "Doo Duty", status: "Running", dot: "bg-amber-400" },
  { name: "Clean Paws Co", status: "Not detected", dot: "bg-gray-300" },
];

const pricingRows = [
  { service: "Weekly (1 dog)", prices: [35, 30, 50, 40, 25] },
  { service: "Weekly (2 dogs)", prices: [40, 38, 60, 48, 30] },
  { service: "Bi-Weekly (1 dog)", prices: [28, 25, 40, 32, 20] },
  { service: "One-Time Cleanup", prices: [70, 65, 95, 75, 50] },
  { service: "Initial Cleanup", prices: [125, 110, 150, 130, 85] },
];

const strategies = [
  {
    title: "Promote enhanced introductory offer",
    difficulty: "Easy",
    diffColor: "bg-green-100 text-green-800",
    why: "ScoopMasters offers first cleanup free — match and exceed",
    how: "Offer first 2 cleanups free with weekly plan signup",
    impact: "Est. 4–6 new signups/month",
  },
  {
    title: "Highlight trust and transparency",
    difficulty: "Easy",
    diffColor: "bg-green-100 text-green-800",
    why: "",
    how: "",
    impact: "",
  },
  {
    title: "Target competitor keywords with conquest ads",
    difficulty: "Medium",
    diffColor: "bg-amber-100 text-amber-800",
    why: "",
    how: "",
    impact: "",
  },
  {
    title: "Deploy geo-fenced mobile ads",
    difficulty: "Hard",
    diffColor: "bg-red-100 text-red-800",
    why: "",
    how: "",
    impact: "",
  },
];

const swotData = [
  {
    name: "ScoopMasters",
    strengths: [
      "5 years in market — established brand",
      "Aggressive pricing undercuts most competitors",
      "Strong presence in Corona",
    ],
    weaknesses: [
      "Reviews mention inconsistent service quality",
      "No online booking system",
      "Website is outdated",
    ],
    opportunities: [
      "They don't serve Moreno Valley or Jurupa Valley yet",
      "No social media presence beyond Facebook",
      "No premium tier offering",
    ],
    threats: [
      "Growing fast in your core Riverside market",
      "Recently started running Google Ads",
      "Offering free first cleanup to new customers",
    ],
  },
  { name: "Doo Duty", strengths: [], weaknesses: [], opportunities: [], threats: [] },
  { name: "Pooper Heroes", strengths: [], weaknesses: [], opportunities: [], threats: [] },
];

/* ── Helpers ──────────────────────────────────────────────────────── */

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: full }).map((_, i) => (
        <span key={i}>★</span>
      ))}
      {half && <span>★</span>}
    </span>
  );
}

function RankCell({ rank }: { rank: number | null }) {
  if (rank === null) return <td className="px-4 py-3 text-center text-gray-300">—</td>;
  let cls = "text-red-600 bg-red-50";
  if (rank === 1) cls = "text-green-700 bg-green-50";
  else if (rank <= 3) cls = "text-amber-700 bg-amber-50";
  return (
    <td className="px-4 py-3 text-center">
      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${cls}`}>#{rank}</span>
    </td>
  );
}

function PriceCell({ yours, theirs }: { yours: number; theirs: number }) {
  let bg = "";
  if (theirs < yours) bg = "bg-green-50 text-green-800";
  else if (theirs > yours) bg = "bg-red-50 text-red-700";
  return <td className={`px-4 py-3 text-center font-medium ${bg}`}>${theirs}</td>;
}

const barColors = ["bg-green-500", "bg-amber-400", "bg-orange-400", "bg-orange-500", "bg-red-500"];

function DistBars({ dist }: { dist: number[] }) {
  const max = Math.max(...dist);
  return (
    <div className="mt-3 space-y-1">
      {dist.map((count, i) => {
        const pct = max > 0 ? (count / max) * 100 : 0;
        return (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-4 text-right text-gray-500">{5 - i}</span>
            <span className={`w-2 h-2 rounded-full ${barColors[i]}`} />
            <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className={`h-full rounded-full ${barColors[i]}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="w-6 text-right text-gray-500">{count}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Section header helper ───────────────────────────────────────── */

function SectionHeader({ icon, title, extra }: { icon: string; title: string; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl">{icon}</span>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      {extra}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */

export default function CompetitorsPage() {
  const [openStrategy, setOpenStrategy] = useState<number | null>(0);
  const [openSwot, setOpenSwot] = useState<number | null>(0);

  return (
    <div className="p-8 max-w-7xl space-y-8">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span>◎</span> Rival Radar
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track competitors, monitor reviews, spy on ads, and get AI counter-strategies
          </p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1">
          + Add Competitor
        </button>
      </div>

      {/* ── 1. Competitor Scorecard ─────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader icon="🏆" title="Competitor Scorecard" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pr-4">Company</th>
                <th className="pb-3 px-4">Rating</th>
                <th className="pb-3 px-4">Reviews</th>
                <th className="pb-3 px-4">Price Range</th>
                <th className="pb-3 px-4">Service Area</th>
                <th className="pb-3 px-4">Years</th>
                <th className="pb-3 px-4">Threat</th>
              </tr>
            </thead>
            <tbody>
              {scorecard.map((r) => (
                <tr
                  key={r.name}
                  className={`border-b border-gray-50 ${r.you ? "bg-emerald-50/60" : "hover:bg-gray-50"}`}
                >
                  <td className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                    {r.name}
                    {r.you && (
                      <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800 uppercase">
                        You
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {r.rating} <Stars rating={r.rating} />
                  </td>
                  <td className="py-3 px-4">{r.reviews}</td>
                  <td className="py-3 px-4">{r.price}</td>
                  <td className="py-3 px-4">{r.area}</td>
                  <td className="py-3 px-4">{r.years}</td>
                  <td className="py-3 px-4">
                    {r.threat === null && <span className="text-gray-300">—</span>}
                    {r.threat === "High" && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                        🔴 High
                      </span>
                    )}
                    {r.threat === "Watch" && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                        🟡 Watch
                      </span>
                    )}
                    {r.threat === "Low" && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        🟢 Low
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── 2. This Week's Rival Moves ─────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader icon="⚠️" title="This Week's Rival Moves" />
        <div className="space-y-4">
          {rivalMoves.map((m, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${m.color}`} />
                <span className="text-sm text-gray-800">{m.text}</span>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{m.ago}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Review Monitoring ────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader icon="⭐" title="Review Monitoring" />
        <div className="grid md:grid-cols-3 gap-4">
          {reviewCards.slice(0, 3).map((c) => (
            <ReviewCard key={c.name} card={c} />
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {reviewCards.slice(3).map((c) => (
            <ReviewCard key={c.name} card={c} />
          ))}
        </div>
      </div>

      {/* ── 4. Ad Spy & Search Presence ─────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader icon="🔍" title="Ad Spy & Search Presence" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pr-4">Keyword</th>
                <th className="pb-3 px-4 text-center">You</th>
                <th className="pb-3 px-4 text-center">ScoopMasters</th>
                <th className="pb-3 px-4 text-center">Pooper Heroes</th>
                <th className="pb-3 px-4 text-center">Doo Duty</th>
                <th className="pb-3 px-4 text-center">Clean Paws</th>
              </tr>
            </thead>
            <tbody>
              {adSpyRows.map((row) => (
                <tr key={row.keyword} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 pr-4 text-gray-800 font-medium whitespace-nowrap">
                    &ldquo;{row.keyword}&rdquo;
                  </td>
                  {row.ranks.map((r, i) => (
                    <RankCell key={i} rank={r} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Google Ads */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Active Google Ads</h3>
          <div className="flex flex-wrap items-center gap-5">
            {adStatus.map((a) => (
              <div key={a.name} className="flex items-center gap-2 text-sm">
                <span className={`w-2.5 h-2.5 rounded-full ${a.dot}`} />
                <span className="font-medium text-gray-800">{a.name}</span>
                <span className="text-gray-400">{a.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. Pricing Intelligence ─────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader icon="💲" title="Pricing Intelligence" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="pb-3 pr-4">Service</th>
                <th className="pb-3 px-4 text-center">You</th>
                <th className="pb-3 px-4 text-center">ScoopMasters</th>
                <th className="pb-3 px-4 text-center">Pooper Heroes</th>
                <th className="pb-3 px-4 text-center">Doo Duty</th>
                <th className="pb-3 px-4 text-center">Clean Paws</th>
              </tr>
            </thead>
            <tbody>
              {pricingRows.map((row) => {
                const yours = row.prices[0];
                return (
                  <tr key={row.service} className="border-b border-gray-50">
                    <td className="py-3 pr-4 font-medium text-gray-800 whitespace-nowrap">{row.service}</td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-900">${yours}</td>
                    {row.prices.slice(1).map((p, i) => (
                      <PriceCell key={i} yours={yours} theirs={p} />
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-900">
          📊 <strong>Your Position:</strong> You are the 2nd most affordable for weekly service. Clean Paws
          undercuts on price but has far fewer reviews (12 vs your 101). Your value proposition is strong.
        </div>
      </div>

      {/* ── 6. AI Counter-Strategies ────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">🧠</span>
          <h2 className="text-lg font-bold text-gray-900">AI Counter-Strategies</h2>
          <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 uppercase">
            Captain Scoop
          </span>
        </div>
        <div className="space-y-3">
          {strategies.map((s, idx) => {
            const isOpen = openStrategy === idx;
            return (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  onClick={() => setOpenStrategy(isOpen ? null : idx)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${s.diffColor}`}>
                      {s.difficulty}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{s.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && s.why && (
                  <div className="grid md:grid-cols-3 gap-0 border-t border-gray-100">
                    <div className="p-4 bg-blue-50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-1">Why</p>
                      <p className="text-sm text-blue-900">{s.why}</p>
                    </div>
                    <div className="p-4 bg-green-50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-green-500 mb-1">How</p>
                      <p className="text-sm text-green-900">{s.how}</p>
                    </div>
                    <div className="p-4 bg-purple-50">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-500 mb-1">
                        Impact
                      </p>
                      <p className="text-sm text-purple-900">{s.impact}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 7. Competitor SWOT Analysis ─────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <SectionHeader icon="ℹ️" title="Competitor SWOT Analysis" />
        <div className="space-y-3">
          {swotData.map((comp, idx) => {
            const isOpen = openSwot === idx;
            return (
              <div key={comp.name} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                  onClick={() => setOpenSwot(isOpen ? null : idx)}
                >
                  <span className="text-sm font-semibold text-gray-900">{comp.name}</span>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isOpen && comp.strengths.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-0 border-t border-gray-100">
                    {/* Strengths */}
                    <div className="p-4 bg-green-50 border-b md:border-b-0 md:border-r border-gray-100">
                      <p className="text-xs font-bold text-green-700 mb-2">💪 STRENGTHS</p>
                      <ul className="space-y-1">
                        {comp.strengths.map((s, i) => (
                          <li key={i} className="text-sm text-green-900 flex items-start gap-1.5">
                            <span className="text-green-400 mt-0.5">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Weaknesses */}
                    <div className="p-4 bg-red-50 border-b md:border-b-0 border-gray-100">
                      <p className="text-xs font-bold text-red-700 mb-2">⚠️ WEAKNESSES</p>
                      <ul className="space-y-1">
                        {comp.weaknesses.map((s, i) => (
                          <li key={i} className="text-sm text-red-900 flex items-start gap-1.5">
                            <span className="text-red-400 mt-0.5">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Opportunities */}
                    <div className="p-4 bg-blue-50 border-r border-gray-100">
                      <p className="text-xs font-bold text-blue-700 mb-2">💡 OPPORTUNITIES</p>
                      <ul className="space-y-1">
                        {comp.opportunities.map((s, i) => (
                          <li key={i} className="text-sm text-blue-900 flex items-start gap-1.5">
                            <span className="text-blue-400 mt-0.5">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Threats */}
                    <div className="p-4 bg-yellow-50">
                      <p className="text-xs font-bold text-yellow-700 mb-2">🔥 THREATS</p>
                      <ul className="space-y-1">
                        {comp.threats.map((s, i) => (
                          <li key={i} className="text-sm text-yellow-900 flex items-start gap-1.5">
                            <span className="text-yellow-500 mt-0.5">•</span>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Review Card Component ───────────────────────────────────────── */

function ReviewCard({
  card,
}: {
  card: {
    name: string;
    rating: number;
    total: number;
    thisMo: number;
    vsLast: number;
    badge: string | null;
    badgeType: string | null;
    dist: number[];
  };
}) {
  const vsSign = card.vsLast > 0 ? "+" : "";
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-900 text-sm">{card.name}</span>
        {card.badge && (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              card.badgeType === "green"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {card.badge}
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-3xl font-bold text-gray-900">{card.rating}</span>
        <Stars rating={card.rating} />
      </div>
      <p className="text-xs text-gray-500 mb-1">
        {card.total} total · +{card.thisMo} this mo · ↗ {vsSign}
        {card.vsLast} vs last
      </p>
      <DistBars dist={card.dist} />
    </div>
  );
}
