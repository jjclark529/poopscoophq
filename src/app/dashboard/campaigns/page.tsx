"use client";

import { useState } from "react";

const campaigns = [
  { id: 1, name: "Spring Cleanup Special", status: "active", type: "Email", sent: 342, opened: 187, clicks: 45, conversions: 12, budget: "$250", startDate: "Mar 1, 2025" },
  { id: 2, name: "Neighbor Referral Program", status: "active", type: "SMS", sent: 128, opened: 98, clicks: 34, conversions: 8, budget: "$150", startDate: "Feb 15, 2025" },
  { id: 3, name: "New Move-In Welcome", status: "active", type: "Door Hanger", sent: 500, opened: 0, clicks: 0, conversions: 15, budget: "$400", startDate: "Jan 20, 2025" },
  { id: 4, name: "Holiday Discount", status: "completed", type: "Email", sent: 890, opened: 456, clicks: 89, conversions: 23, budget: "$300", startDate: "Dec 1, 2024" },
  { id: 5, name: "Facebook Lookalike", status: "paused", type: "Meta Ad", sent: 12500, opened: 0, clicks: 340, conversions: 18, budget: "$500", startDate: "Feb 1, 2025" },
];

export default function CampaignsPage() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? campaigns : campaigns.filter((c) => c.status === filter);

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Campaigns</h1>
          <p className="text-gray-500 text-sm">Manage your marketing campaigns and track performance.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
          + New Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {["all", "active", "paused", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {[
          { label: "Total Campaigns", value: campaigns.length },
          { label: "Active", value: campaigns.filter((c) => c.status === "active").length },
          { label: "Total Conversions", value: campaigns.reduce((a, c) => a + c.conversions, 0) },
          { label: "Total Budget", value: "$1,600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Campaign</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Type</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Sent</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Clicks</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Conversions</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Budget</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-5 py-3">
                  <p className="font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.startDate}</p>
                </td>
                <td className="px-5 py-3 text-gray-600">{c.type}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    c.status === "active" ? "bg-emerald-50 text-emerald-700" :
                    c.status === "paused" ? "bg-amber-50 text-amber-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right text-gray-600">{c.sent.toLocaleString()}</td>
                <td className="px-5 py-3 text-right text-gray-600">{c.clicks}</td>
                <td className="px-5 py-3 text-right font-medium text-gray-900">{c.conversions}</td>
                <td className="px-5 py-3 text-right text-gray-600">{c.budget}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
