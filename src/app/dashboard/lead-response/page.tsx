"use client";

import { useState } from "react";

const topStats = [
  { label: "Avg Response Time", value: "2.3 hrs", icon: "⏱️", change: "↓ 0.5 hrs vs last week" },
  { label: "Leads Awaiting Response", value: "3", icon: "📬", change: "Action needed" },
  { label: "Response Rate", value: "94%", icon: "✅", change: "+2% vs last month" },
  { label: "Conversion Rate", value: "31%", icon: "🎯", change: "+3% vs last month" },
];

interface Lead {
  id: number;
  name: string;
  source: string;
  received: string;
  responseTime: string;
  status: "New" | "Contacted" | "Qualified" | "Won" | "Lost";
}

const leads: Lead[] = [
  { id: 1, name: "Sarah Mitchell", source: "Facebook Ads", received: "30 min ago", responseTime: "—", status: "New" },
  { id: 2, name: "James Rodriguez", source: "Google LSA", received: "2 hrs ago", responseTime: "—", status: "New" },
  { id: 3, name: "Lisa Chen", source: "Referral", received: "3 hrs ago", responseTime: "—", status: "New" },
  { id: 4, name: "Mike Thompson", source: "Google LSA", received: "Yesterday", responseTime: "1.2 hrs", status: "Contacted" },
  { id: 5, name: "Amy Johnson", source: "Facebook Ads", received: "Yesterday", responseTime: "0.8 hrs", status: "Qualified" },
  { id: 6, name: "David Park", source: "Door Hanger", received: "2 days ago", responseTime: "3.1 hrs", status: "Contacted" },
  { id: 7, name: "Rachel Green", source: "Facebook Ads", received: "3 days ago", responseTime: "1.5 hrs", status: "Won" },
  { id: 8, name: "Tom Wilson", source: "Google LSA", received: "3 days ago", responseTime: "2.0 hrs", status: "Qualified" },
  { id: 9, name: "Karen Davis", source: "Referral", received: "4 days ago", responseTime: "0.5 hrs", status: "Won" },
  { id: 10, name: "Chris Martinez", source: "Door Hanger", received: "5 days ago", responseTime: "6.2 hrs", status: "Lost" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-amber-100 text-amber-700",
  Qualified: "bg-purple-100 text-purple-700",
  Won: "bg-emerald-100 text-emerald-700",
  Lost: "bg-red-100 text-red-700",
};

export default function LeadResponsePage() {
  const [autoResponse, setAutoResponse] = useState(true);
  const [responseGoal, setResponseGoal] = useState(4);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lead Response</h1>
        <p className="text-gray-500 mt-1">
          Track and manage response times to new leads
        </p>
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
            <p
              className={`text-xs mt-1 ${
                stat.label === "Leads Awaiting Response"
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Response Time Goal */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Response Time Goal
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Target:</span>
              <select
                value={responseGoal}
                onChange={(e) => setResponseGoal(Number(e.target.value))}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-700"
              >
                <option value={1}>Under 1 hour</option>
                <option value={2}>Under 2 hours</option>
                <option value={4}>Under 4 hours</option>
                <option value={8}>Under 8 hours</option>
                <option value={24}>Under 24 hours</option>
              </select>
            </div>
            <div className="flex-1">
              <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                78% of leads responded within target
              </p>
            </div>
          </div>
        </div>

        {/* Auto-Response */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Auto-Response
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Automatically send an acknowledgment SMS when a new lead comes
                in
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Uses your &ldquo;New Client Welcome&rdquo; template
              </p>
            </div>
            <button
              onClick={() => setAutoResponse(!autoResponse)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                autoResponse ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  autoResponse ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Lead Queue */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Lead Queue</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Lead Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Source
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Received
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Response Time
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {lead.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {lead.source}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {lead.received}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-medium ${
                        lead.responseTime === "—"
                          ? "text-amber-600"
                          : parseFloat(lead.responseTime) > responseGoal
                          ? "text-red-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {lead.responseTime}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        statusColors[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {lead.status === "New" ? (
                      <button className="text-xs px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                        Respond
                      </button>
                    ) : (
                      <button className="text-xs px-3 py-1.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
