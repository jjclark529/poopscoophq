"use client";

import Link from "next/link";

const topStats = [
  { label: "Active Campaigns", value: "4", icon: "📢", change: "+1 this week" },
  { label: "Leads This Month", value: "23", icon: "👥", change: "+8 vs last month" },
  { label: "Conversion Rate", value: "31%", icon: "📈", change: "+3% vs last month" },
  { label: "Marketing Spend", value: "$850", icon: "💰", change: "Under budget" },
];

const funnelSteps = [
  { stage: "Impressions", value: "12,400", color: "bg-blue-100 text-blue-700" },
  { stage: "Clicks", value: "1,860", color: "bg-indigo-100 text-indigo-700" },
  { stage: "Leads", value: "23", color: "bg-emerald-100 text-emerald-700" },
  { stage: "Customers", value: "7", color: "bg-amber-100 text-amber-700" },
];

const channels = [
  { name: "Facebook Ads", leads: 9, costPerLead: "$18.50", spend: "$166.50", trend: "up" },
  { name: "Google LSA", leads: 7, costPerLead: "$24.00", spend: "$168.00", trend: "up" },
  { name: "Door Hangers", leads: 4, costPerLead: "$12.00", spend: "$48.00", trend: "stable" },
  { name: "Referrals", leads: 3, costPerLead: "$0.00", spend: "$0.00", trend: "up" },
];

const campaigns = [
  { name: "Spring Clean-Up Blitz", status: "Active", leads: 8, spend: "$320", roi: "4.2x" },
  { name: "Neighborhood Door Hangers", status: "Active", leads: 4, spend: "$48", roi: "6.1x" },
  { name: "Google LSA - Riverside", status: "Active", leads: 7, spend: "$168", roi: "3.8x" },
  { name: "Facebook Retargeting", status: "Active", leads: 4, spend: "$120", roi: "2.9x" },
];

const recentActivity = [
  { time: "2h ago", event: "New lead from Facebook Ads — Sarah M. in Riverside" },
  { time: "5h ago", event: "Door hanger campaign completed — Corona Hills area" },
  { time: "1d ago", event: "Google LSA budget increased to $25/day" },
  { time: "1d ago", event: "New referral lead — Mike T. referred by existing client" },
  { time: "2d ago", event: "Facebook ad creative refreshed — Spring theme" },
  { time: "3d ago", event: "2 leads converted to paying customers this week" },
];

export default function MarketingOverviewPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Overview</h1>
          <p className="text-gray-500 mt-1">
            Track campaign performance, leads, and marketing ROI at a glance
          </p>
        </div>
        <Link href="/dashboard/ad-builder" className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
          + New Campaign
        </Link>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-emerald-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Funnel */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Lead Funnel
          </h2>
          <div className="space-y-3">
            {funnelSteps.map((step, i) => (
              <div key={step.stage} className="flex items-center gap-3">
                <div className="w-24 text-sm text-gray-600 font-medium">
                  {step.stage}
                </div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full ${step.color.split(" ")[0]} flex items-center justify-end pr-3`}
                    style={{
                      width: `${Math.max(
                        15,
                        100 - i * 25
                      )}%`,
                    }}
                  >
                    <span
                      className={`text-xs font-bold ${step.color.split(" ")[1]}`}
                    >
                      {step.value}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
            <span>Impressions</span>
            <span>→</span>
            <span>Clicks</span>
            <span>→</span>
            <span>Leads</span>
            <span>→</span>
            <span>Customers</span>
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            Channel Breakdown
          </h2>
          <div className="space-y-3">
            {channels.map((ch) => (
              <div
                key={ch.name}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {ch.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ch.leads} leads · {ch.costPerLead}/lead
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {ch.spend}
                  </p>
                  <span
                    className={`text-xs ${
                      ch.trend === "up"
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {ch.trend === "up" ? "↑ Trending up" : "→ Stable"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">
            Campaign Performance
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Campaign
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Leads
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Spend
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  ROI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {campaigns.map((c) => (
                <tr key={c.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {c.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {c.leads}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {c.spend}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-emerald-600">
                    {c.roi}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Recent Marketing Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-700">{a.event}</p>
                <p className="text-xs text-gray-400">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Captain Scoop's Call + Top Moves */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Captain Scoop's Call */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-5">
          <div className="flex items-center gap-3 mb-4">
            <img src="/captain-scoop.png" alt="Captain Scoop" className="w-10 h-10 object-contain" />
            <div>
              <h2 className="text-sm font-bold text-gray-900">Captain Scoop&apos;s Call</h2>
              <p className="text-xs text-gray-500">Your AI marketing advisor</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
              <p className="text-sm text-gray-800 font-medium">🎯 Focus: Canyon Crest Door Hangers</p>
              <p className="text-xs text-gray-600 mt-1">Your highest-converting zone has 6 untouched leads. A 500-unit door hanger drop could convert 3-5 new clients at $12/lead.</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
              <p className="text-sm text-gray-800 font-medium">⚡ Quick Win: Boost Review Requests</p>
              <p className="text-xs text-gray-600 mt-1">You&apos;re at 101 reviews. Push to 120 this month — each review improves your Google LSA ranking and reduces CPL.</p>
            </div>
            <div className="bg-white/70 rounded-lg p-3 border border-amber-100">
              <p className="text-sm text-gray-800 font-medium">📈 Scaling: Double Facebook Budget</p>
              <p className="text-xs text-gray-600 mt-1">Your Facebook ROI is 4.2x. At current conversion rates, doubling spend from $320 to $640 should yield 8 more leads.</p>
            </div>
          </div>
        </div>

        {/* Top Moves This Month */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-gray-900">🏆 Top Moves This Month</h2>
          </div>
          <div className="space-y-3">
            {[
              { title: "Launch neighbor referral campaign", impact: "+5 clients est.", priority: "High", color: "bg-red-100 text-red-700" },
              { title: "Refresh Facebook ad creative", impact: "+15% CTR est.", priority: "High", color: "bg-red-100 text-red-700" },
              { title: "Respond to all Google reviews", impact: "+0.2 rating est.", priority: "Medium", color: "bg-amber-100 text-amber-700" },
              { title: "Run Canyon Crest door hanger blitz", impact: "+4 leads est.", priority: "High", color: "bg-red-100 text-red-700" },
              { title: "Set up automated review follow-ups", impact: "+8 reviews/mo", priority: "Medium", color: "bg-amber-100 text-amber-700" },
            ].map((move, i) => (
              <Link key={i} href="/dashboard/missions" className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">{move.title}</p>
                  <p className="text-xs text-gray-500">{move.impact}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${move.color}`}>{move.priority}</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
