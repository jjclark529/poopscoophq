"use client";

import { useState } from "react";

const completedMissions = [
  { title: "Review Underperforming Campaigns", date: "Mar 15", pp: 100 },
  { title: "Enable Revenue Tracking for True ROAS", date: "Mar 12", pp: 100 },
];

const coachingTips = [
  {
    priority: "high" as const,
    category: "Budget",
    title: "Redistribute Budget from Display to Meta",
    insight: "Your Google Display campaign is spending $312/mo with a $156 CPL. Meanwhile, your Meta Lead Gen is producing leads at $32 each.",
    action: "Move $200 from Display to Meta Lead Gen and monitor for 2 weeks.",
    impact: "Estimated 5-6 additional leads per month",
  },
  {
    priority: "medium" as const,
    category: "Creative",
    title: "Refresh Your Top Ad Creative",
    insight: "Your best-performing Meta ad has been running for 45 days. Ad fatigue typically sets in around day 30.",
    action: "Create 2-3 new ad variations using your recent testimonials.",
    impact: "Prevent CTR decline and maintain lead flow",
  },
  {
    priority: "high" as const,
    category: "Landing Page",
    title: "Reduce Form Fields",
    insight: "Your landing page form has 7 fields. Industry data shows reducing to 3-4 fields can increase conversions by 25-50%.",
    action: 'Remove company name, address, and "how did you hear about us" fields.',
    impact: "Potential 25% increase in conversion rate",
  },
  {
    priority: "low" as const,
    category: "SEO",
    title: "Add Location Pages for Neighboring Areas",
    insight: 'You rank well for "pet waste removal Riverside" but have no pages for Corona, Moreno Valley, or Norco.',
    action: "Create dedicated landing pages for each neighboring city.",
    impact: "Capture organic traffic from adjacent markets",
  },
];

const PRIORITY_COLORS = {
  high: "bg-red-100 text-red-700 border-red-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  low: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function MissionsPage() {
  const [expandedTip, setExpandedTip] = useState<number | null>(0);

  const totalPP = 250;
  const level = "Apprentice";
  const missionsComplete = 2;
  const totalMissions = 20;
  const ppToNext = 55;
  const progressPct = ((totalPP % 305) / 305) * 100;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mission Control</h1>
        <p className="text-gray-500 mt-1">Complete Marketing Missions. Earn PooPower (PP). Out-scoop the competition.</p>
      </div>

      {/* XP / Level Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">
              💩
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{level}</p>
              <p className="text-sm text-gray-500">{totalPP} PP</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-900 font-semibold">{missionsComplete}/{totalMissions} missions</p>
            <p className="text-xs text-gray-400">{ppToNext} PP to next level</p>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Completed Missions */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">✅ Completed</h2>
        <div className="space-y-2">
          {completedMissions.map((m, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-900">{m.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-400">{m.date}</span>
                <span className="text-xs font-bold text-emerald-600">+{m.pp} PP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* This Week's Focus */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-blue-900 mb-2">📋 This Week&apos;s Focus</h2>
        <p className="text-sm text-blue-800">
          Your CPL is 12% above target. The two biggest opportunities this week are pausing your underperforming Display campaign and refreshing your Meta ad creative. Combined, these moves could save you $380/mo and bring CPL back under target.
        </p>
      </div>

      {/* AI Coaching Tips */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Coaching Tips</h2>
        <div className="space-y-3">
          {coachingTips.map((tip, i) => {
            const isExpanded = expandedTip === i;
            const colors = PRIORITY_COLORS[tip.priority];
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedTip(isExpanded ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${colors}`}>
                      {tip.priority} priority
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{tip.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{tip.title}</span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <p className="text-[10px] font-bold text-blue-600 uppercase mb-1.5">💡 INSIGHT</p>
                        <p className="text-sm text-blue-900">{tip.insight}</p>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1.5">⚡ ACTION</p>
                        <p className="text-sm text-emerald-900">{tip.action}</p>
                      </div>
                      <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                        <p className="text-[10px] font-bold text-purple-600 uppercase mb-1.5">📈 IMPACT</p>
                        <p className="text-sm text-purple-900">{tip.impact}</p>
                      </div>
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
