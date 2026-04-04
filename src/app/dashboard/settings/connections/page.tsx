"use client";

import { useState } from "react";

const connections = [
  { id: "sweepandgo", name: "Sweep&Go", desc: "Pet waste CRM with client management and scheduling", status: "disconnected", icon: "🧹" },
  { id: "jobber", name: "Jobber", desc: "Field service management software", status: "disconnected", icon: "📋" },
  { id: "google", name: "Google Business Profile", desc: "Manage your Google listing, reviews, and insights", status: "connected", icon: "🔍" },
  { id: "meta", name: "Meta (Facebook/Instagram)", desc: "Run ads and manage social media presence", status: "disconnected", icon: "📘" },
  { id: "quo", name: "Quo (OpenPhone)", desc: "Business phone system with SMS and call tracking", status: "disconnected", icon: "📱" },
  { id: "stripe", name: "Stripe", desc: "Payment processing and billing", status: "connected", icon: "💳" },
  { id: "mailchimp", name: "Mailchimp", desc: "Email marketing and automation", status: "disconnected", icon: "📧" },
];

export default function ConnectionsPage() {
  const [conns, setConns] = useState(connections);

  const toggleConnection = (id: string) => {
    setConns((prev) => prev.map((c) =>
      c.id === id ? { ...c, status: c.status === "connected" ? "disconnected" : "connected" } : c
    ));
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Connections</h1>
        <p className="text-gray-500 text-sm">Connect your tools and services to PoopScoop HQ.</p>
      </div>

      <div className="space-y-4">
        {conns.map((conn) => (
          <div key={conn.id} className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-2xl border border-gray-100">
                {conn.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{conn.name}</h3>
                <p className="text-sm text-gray-500">{conn.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                conn.status === "connected" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
              }`}>
                {conn.status === "connected" ? "✓ Connected" : "Not connected"}
              </span>
              <button
                onClick={() => toggleConnection(conn.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                  conn.status === "connected"
                    ? "border-red-200 text-red-600 hover:bg-red-50"
                    : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {conn.status === "connected" ? "Disconnect" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-blue-900 mb-1">💡 Need a different integration?</h3>
        <p className="text-sm text-blue-700">We&apos;re always adding new integrations. Contact support or request one from the Help page.</p>
      </div>
    </div>
  );
}
