"use client";

import { useState } from "react";
import Link from "next/link";

const campaigns = [
  {
    id: 1, platform: "Meta", name: "Meta Lead Gen Spring 2026", status: "active",
    spend: 856, leads: 12, cpl: 32.10, ctr: 3.2,
    insight: { type: "good" as const, title: "Strong Performer", action: "Scale budget by 20%", impact: "Increase lead volume" },
  },
  {
    id: 2, platform: "Google", name: "Google Search — Brand Terms", status: "active",
    spend: 420, leads: 6, cpl: 70.00, ctr: 8.1,
    insight: { type: "warn" as const, title: "High CTR but expensive", action: "Tighten keyword match types", impact: "Lower CPC by 15%" },
  },
  {
    id: 3, platform: "Meta", name: "SDL Static Testimonial Ads", status: "active",
    spend: 380, leads: 3, cpl: 126.67, ctr: 0.9,
    insight: { type: "warn" as const, title: "High CPA — industry avg is $45", action: "Optimize creative or pause", impact: "Save $380/mo" },
  },
  {
    id: 4, platform: "Google", name: "Google Display Retargeting Q1", status: "active",
    spend: 312, leads: 2, cpl: 156.00, ctr: 0.4,
    insight: { type: "bad" as const, title: "Very low CTR and high CPL", action: "Pause and reallocate budget", impact: "Redirect $312 to Meta" },
  },
];

const PLATFORM_BADGE: Record<string, string> = {
  Meta: "bg-blue-600 text-white",
  Google: "bg-blue-500 text-white",
};

const INSIGHT_BG: Record<string, string> = {
  good: "bg-green-50 border-green-100",
  warn: "bg-yellow-50 border-yellow-100",
  bad: "bg-red-50 border-red-100",
};

const INSIGHT_DOT: Record<string, string> = {
  good: "text-green-500",
  warn: "text-yellow-500",
  bad: "text-red-500",
};

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");

  const filtered = campaigns.filter(c => {
    if (platformFilter !== "all" && c.platform.toLowerCase() !== platformFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Ad Campaigns</h1>
          <p className="text-gray-500 text-sm mt-1">View, manage, and create campaigns across all platforms</p>
        </div>
        <Link href="/dashboard/ad-builder" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
          + Create Campaign
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={platformFilter}
          onChange={e => setPlatformFilter(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Platforms</option>
          <option value="meta">Meta</option>
          <option value="google">Google</option>
        </select>
      </div>

      {/* Campaign Cards */}
      <div className="space-y-4">
        {filtered.map(c => (
          <div key={c.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Campaign Header */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${PLATFORM_BADGE[c.platform]}`}>
                  {c.platform}
                </span>
                <h3 className="text-sm font-bold text-gray-900">{c.name}</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{c.status}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Spend: <strong className="text-gray-900">${c.spend.toLocaleString()}</strong></span>
                <span>Leads: <strong className="text-gray-900">{c.leads}</strong></span>
                <span>CPL: <strong className="text-gray-900">${c.cpl.toFixed(2)}</strong></span>
                <span>CTR: <strong className="text-gray-900">{c.ctr}%</strong></span>
              </div>
            </div>

            {/* Captain Scoop Insight */}
            <div className={`mx-5 mb-4 px-4 py-3 rounded-lg border ${INSIGHT_BG[c.insight.type]}`}>
              <div className="flex items-start gap-2">
                <span className={`text-lg ${INSIGHT_DOT[c.insight.type]}`}>💩</span>
                <div>
                  <p className={`text-sm font-semibold ${c.insight.type === "good" ? "text-green-800" : c.insight.type === "warn" ? "text-yellow-800" : "text-red-800"}`}>
                    {c.insight.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">
                    <span className="font-medium">Action:</span> <em>{c.insight.action}</em>
                    <span className="ml-4 font-medium">Expected Impact:</span> <em>{c.insight.impact}</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No campaigns found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
