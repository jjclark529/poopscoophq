"use client";

import { useState } from "react";

const activeGoals = [
  { id: 1, title: "Reach 150 Active Clients", current: 127, target: 150, unit: "", prefix: "", due: "Jun 2026", status: "On Track" as const },
  { id: 2, title: "Hit $18,000 MRR", current: 14835, target: 18000, unit: "", prefix: "$", due: "Jul 2026", status: "On Track" as const },
  { id: 3, title: "Achieve 97% Retention", current: 94.2, target: 97, unit: "%", prefix: "", due: "May 2026", status: "At Risk" as const },
  { id: 4, title: "Expand to 3 New Zones", current: 1, target: 3, unit: "", prefix: "", due: "Aug 2026", status: "Behind" as const },
  { id: 5, title: "Get 200 Google Reviews", current: 127, target: 200, unit: "", prefix: "", due: "Sep 2026", status: "On Track" as const },
];

const completedGoals = [
  { id: 6, title: "Launch Initial Ad Campaign", date: "Jan 2026" },
  { id: 7, title: "Hit 100 Clients", date: "Dec 2025" },
  { id: 8, title: "Achieve 50 Reviews", date: "Nov 2025" },
];

const tips = [
  { emoji: "🚀", title: "Double Down on Canyon Crest", tip: "Your best-performing zone has the highest conversion rate. Run a door-hanger campaign to capture those 6 leads." },
  { emoji: "🤝", title: "Start a Referral Program", tip: "Your customers love you — 4.9★ average! Offer a free service for every referral to hit 150 clients faster." },
  { emoji: "📍", title: "Corona Expansion Playbook", tip: "Partner with a local dog groomer or vet in Corona for cross-referrals. Low cost, high trust acquisition channel." },
  { emoji: "💡", title: "Retention Boost", tip: "Send a personal check-in message to clients who haven't scheduled in 30+ days. Personal touch reduces churn 40%." },
];

function formatValue(value: number, prefix: string, unit: string): string {
  if (prefix === "$") return `$${value.toLocaleString()}`;
  if (unit === "%") return `${value}%`;
  return value.toLocaleString();
}

/* SVG Chart: compound growth (blue) vs goal pace (green dashed) */
function GrowthProjectionChart() {
  // Chart dimensions
  const w = 700, h = 300, pad = { top: 20, right: 30, bottom: 40, left: 50 };
  const cw = w - pad.left - pad.right;
  const ch = h - pad.top - pad.bottom;

  // X-axis: months from Apr 2026 to Jun 2027 (15 months)
  const labels = ["Apr 26", "Jun 26", "Aug 26", "Oct 26", "Dec 26", "Feb 27", "Apr 27", "Jun 27"];
  const monthOffsets = [0, 2, 4, 6, 8, 10, 12, 14]; // months from start
  const totalMonths = 14;

  // Y-axis: 0 to 1000
  const yMax = 1000;
  const yTicks = [0, 250, 500, 750, 1000];

  const toX = (m: number) => pad.left + (m / totalMonths) * cw;
  const toY = (v: number) => pad.top + ch - (v / yMax) * ch;

  // Current pace: compound growth at 5.2%/mo starting from 425
  const currentPacePoints: string[] = [];
  for (let m = 0; m <= totalMonths; m++) {
    const v = 425 * Math.pow(1.052, m);
    currentPacePoints.push(`${toX(m).toFixed(1)},${toY(Math.min(v, yMax)).toFixed(1)}`);
  }

  // Goal pace: linear from 425 to 100 by month 6 (Oct 26), then stays at 100
  // Actually the target is 100 clients by Oct 2026 — the "goal pace" line shows where you need to be
  // Since target < current, the green line goes down from 425 toward 100
  const goalPacePoints: string[] = [];
  for (let m = 0; m <= totalMonths; m++) {
    let v: number;
    if (m <= 6) {
      v = 425 + ((100 - 425) / 6) * m; // linear interpolation from 425 to 100 over 6 months
    } else {
      v = 100; // stays at target after goal date
    }
    goalPacePoints.push(`${toX(m).toFixed(1)},${toY(Math.max(v, 0)).toFixed(1)}`);
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: 320 }}>
      {/* Grid lines */}
      {yTicks.map((t) => (
        <g key={t}>
          <line x1={pad.left} y1={toY(t)} x2={w - pad.right} y2={toY(t)} stroke="#e5e7eb" strokeWidth={1} />
          <text x={pad.left - 8} y={toY(t) + 4} textAnchor="end" fontSize={11} fill="#9ca3af">{t}</text>
        </g>
      ))}

      {/* X-axis labels */}
      {labels.map((l, i) => (
        <text key={l} x={toX(monthOffsets[i])} y={h - 8} textAnchor="middle" fontSize={11} fill="#9ca3af">{l}</text>
      ))}

      {/* Current Pace line (solid blue) */}
      <polyline
        points={currentPacePoints.join(" ")}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />

      {/* Goal Pace line (dashed green) */}
      <polyline
        points={goalPacePoints.join(" ")}
        fill="none"
        stroke="#10b981"
        strokeWidth={2.5}
        strokeDasharray="8,5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GrowthGoalsPage() {
  const [targetClients, setTargetClients] = useState(100);
  const [targetIncome, setTargetIncome] = useState("");
  const [goalDate, setGoalDate] = useState("2026-10-04");

  return (
    <div className="p-8 max-w-7xl">
      {/* ─── Header ─── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">📈 Growth Goals</h1>
        <p className="text-gray-500 text-sm">Set targets and get an AI-powered growth plan</p>
      </div>

      {/* ─── Top Stats ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Active Clients */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
          <div className="absolute top-4 right-4 text-gray-300">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
          </div>
          <p className="text-xs text-gray-500 mb-1">Active Clients</p>
          <p className="text-2xl font-bold text-gray-900">425</p>
          <p className="text-xs text-emerald-600 mt-1">5.2%/mo growth</p>
        </div>

        {/* Monthly Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
          <div className="absolute top-4 right-4 text-gray-300">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-xs text-gray-500 mb-1">Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900">$12,800</p>
          <p className="text-xs text-emerald-600 mt-1">11.3%/mo growth</p>
        </div>

        {/* Avg Rev / Client */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
          <div className="absolute top-4 right-4 text-gray-300">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>
          </div>
          <p className="text-xs text-gray-500 mb-1">Avg Rev / Client</p>
          <p className="text-2xl font-bold text-gray-900">$30.12</p>
          <p className="text-xs text-gray-400 mt-1">per month</p>
        </div>

        {/* Growth Trajectory */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 relative">
          <div className="absolute top-4 right-4 text-gray-300">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
          </div>
          <p className="text-xs text-gray-500 mb-1">Growth Trajectory</p>
          <p className="text-2xl font-bold text-gray-900">Healthy</p>
          <p className="text-xs text-emerald-600 mt-1">Compound growth active</p>
        </div>
      </div>

      {/* ─── Set Your Growth Goals ─── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-5">⊙ Set Your Growth Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Target Clients */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Target Clients</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              </span>
              <input
                type="number"
                value={targetClients}
                onChange={(e) => setTargetClients(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Target Monthly Income */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Target Monthly Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
              <input
                type="number"
                value={targetIncome}
                onChange={(e) => setTargetIncome(e.target.value)}
                placeholder="e.g. 25000"
                className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Goal Date */}
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Goal Date</label>
            <div className="relative">
              <input
                type="date"
                value={goalDate}
                onChange={(e) => setGoalDate(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
          ✦ Calculate Growth Plan
        </button>
      </div>

      {/* ─── Growth Projection ─── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-1">📈 Growth Projection</h2>
        <p className="text-xs text-gray-400 mb-4">Current trajectory (blue) vs goal pace (green) — clients</p>
        <GrowthProjectionChart />
        <div className="flex gap-6 mt-3">
          <span className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="inline-block w-5 h-0.5 bg-blue-500 rounded" /> Current Pace
          </span>
          <span className="text-xs text-gray-500 flex items-center gap-1.5">
            <span className="inline-block w-5 h-0.5 rounded" style={{ backgroundImage: "repeating-linear-gradient(90deg, #10b981 0, #10b981 4px, transparent 4px, transparent 7px)" }} /> Goal Pace
          </span>
        </div>
      </div>

      {/* ─── Gap Analysis ─── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-5">📊 Gap Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Clients Needed / Month</p>
            <p className="text-xl font-bold text-gray-900">+0</p>
            <p className="text-xs text-gray-400 mt-1">vs current +22/mo</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">Required Growth Rate</p>
            <p className="text-xl font-bold text-red-500">-11.4%</p>
            <p className="text-xs text-gray-400 mt-1">vs current 5.2%/mo</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">ETA at Current Pace</p>
            <p className="text-xl font-bold text-gray-900">April 2026</p>
            <p className="text-xs text-emerald-600 mt-1">✅ On track to hit goal early!</p>
          </div>
        </div>
      </div>

      {/* ─── Recommended Strategies ─── */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
        <h2 className="text-sm font-semibold text-gray-900 mb-5">💡 Recommended Strategies</h2>
        <div className="space-y-5">
          {/* Strategy 1 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#3b82f6" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-2 cursor-pointer">
                Improve conversion rate by 0.0 percentage points <span className="text-gray-400">›</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Optimising landing pages, follow-up speed, and offer clarity can convert 0 more visitors into clients each month.</p>
            </div>
            <span className="text-sm font-semibold text-blue-600 flex-shrink-0">+0 clients/mo</span>
          </div>

          {/* Strategy 2 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#8b5cf6" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-2 cursor-pointer">
                Launch a referral program targeting 3 referrals/month <span className="text-gray-400">›</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Incentivise existing happy clients with discounts or credits for every successful referral they bring in.</p>
            </div>
            <span className="text-sm font-semibold text-emerald-600 flex-shrink-0">+3 clients/mo</span>
          </div>

          {/* Strategy 3 */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#ec4899" strokeWidth={2}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 underline decoration-gray-300 underline-offset-2 cursor-pointer">
                Expand service area or add new service tiers <span className="text-gray-400">›</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">Broadening geographic reach or offering premium/budget tiers opens new market segments and increases average revenue per client.</p>
            </div>
            <span className="text-sm font-semibold text-blue-600 flex-shrink-0">+$0/mo revenue</span>
          </div>
        </div>
      </div>

      {/* ─── Disclaimer Banner ─── */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-10 flex items-start gap-3">
        <span className="text-lg flex-shrink-0">⚠️</span>
        <p className="text-xs text-amber-800 italic">
          These projections use compound growth modelling based on your current metrics. Actual results will vary based on market conditions, seasonality, and execution. Update your metrics regularly for more accurate forecasts.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* Existing Content Below — Active Goals, Completed Goals, Tips  */}
      {/* ════════════════════════════════════════════════════════════════ */}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-1">Your Goals</h2>
          <p className="text-gray-500 text-sm">Strategic objectives to scale your business sustainably.</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
          + Add New Goal
        </button>
      </div>

      {/* Active Goals */}
      <h2 className="text-sm font-semibold text-gray-900 mb-4">🎯 Active Goals</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {activeGoals.map((goal) => {
          const progress = Math.min((goal.current / goal.target) * 100, 100);
          const barColor = goal.status === "Behind" ? "bg-red-500" : goal.status === "At Risk" ? "bg-amber-500" : "bg-emerald-500";
          const badgeColor = goal.status === "On Track" ? "bg-emerald-50 text-emerald-700" : goal.status === "At Risk" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700";
          return (
            <div key={goal.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">{goal.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badgeColor}`}>
                  {goal.status}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${progress}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{formatValue(goal.current, goal.prefix, goal.unit)} / {formatValue(goal.target, goal.prefix, goal.unit)}</span>
                <span>{progress.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-gray-400">Due: {goal.due}</p>
            </div>
          );
        })}
      </div>

      {/* Completed Goals */}
      <h2 className="text-sm font-semibold text-gray-900 mb-4">✅ Completed Goals</h2>
      <div className="space-y-3 mb-10">
        {completedGoals.map((goal) => (
          <div key={goal.id} className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3 opacity-70">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold">✓</span>
            <span className="text-sm text-gray-400 line-through flex-1">{goal.title}</span>
            <span className="text-xs text-gray-300">{goal.date}</span>
          </div>
        ))}
      </div>

      {/* Captain Scoop Tips */}
      <h2 className="text-sm font-semibold text-gray-900 mb-4">🐕 Captain Scoop&apos;s Growth Tips</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((tip) => (
          <div key={tip.title} className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{tip.emoji}</span>
              <h3 className="text-sm font-semibold text-emerald-800">{tip.title}</h3>
            </div>
            <p className="text-sm text-emerald-700">{tip.tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
