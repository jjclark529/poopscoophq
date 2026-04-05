"use client";

import { useState } from "react";

interface Connection {
  id: string;
  icon: string;
  name: string;
  description: string;
  category: string;
  connected: boolean;
  apiKeyField?: string;
  apiKeyValue?: string;
}

const connections: Connection[] = [
  { id: "ga4", icon: "📊", name: "Google Analytics (GA4)", description: "Website traffic, conversions, user behavior", category: "Analytics & Tracking", connected: false },
  { id: "gsc", icon: "🔍", name: "Search Console", description: "Search rankings, clicks, impressions", category: "Analytics & Tracking", connected: false },
  { id: "gads", icon: "💰", name: "Google Ads", description: "Campaign performance, spend, conversions", category: "Advertising", connected: false },
  { id: "fbads", icon: "📘", name: "Facebook Ads", description: "Ad performance, reach, engagement", category: "Advertising", connected: false },
  { id: "igads", icon: "📸", name: "Instagram Ads", description: "Story ads, feed ads, reels performance", category: "Advertising", connected: false },
  { id: "quo", icon: "📞", name: "Quo", description: "Calls, texts, voicemails, transcriptions", category: "Communication", connected: false },
  { id: "dialpad", icon: "☎️", name: "Dialpad", description: "Business phone, SMS, call analytics", category: "Communication", connected: false },
  { id: "ringcentral", icon: "📱", name: "RingCentral", description: "Cloud phone, SMS, team messaging", category: "Communication", connected: false },
  { id: "sweepandgo", icon: "🧹", name: "Sweep&Go", description: "Clients, subscriptions, jobs, payments", category: "Sales CRM", connected: false },
  { id: "hubspot", icon: "🔗", name: "HubSpot", description: "Contacts, deals, pipeline via Make", category: "Sales CRM", connected: false },
  { id: "jobber", icon: "🔧", name: "Jobber", description: "Jobs, invoices, clients, quotes", category: "Sales CRM", connected: false },
  { id: "pipeline", icon: "📊", name: "Pipeline CRM", description: "Deals, contacts, pipeline stages", category: "Sales CRM", connected: false },
  { id: "ghl", icon: "🚀", name: "GoHighLevel", description: "Contacts, opportunities, campaigns", category: "Sales CRM", connected: false },
];

const categories = ["Analytics & Tracking", "Advertising", "Communication", "Sales CRM"];

export default function ConnectionsPage() {
  const [conns, setConns] = useState(connections);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [apiInputs, setApiInputs] = useState<Record<string, string>>({});

  const handleConnect = (id: string) => {
    setConns(prev => prev.map(c => c.id === id ? { ...c, connected: true } : c));
    setExpandedId(null);
  };

  const handleDisconnect = (id: string) => {
    setConns(prev => prev.map(c => c.id === id ? { ...c, connected: false } : c));
  };

  const connectedCount = conns.filter(c => c.connected).length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🔗 Connections</h1>
          <p className="text-gray-500 text-sm mt-1">Connect your tools and platforms to power PoopScoop HQ</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
          <p className="text-sm font-semibold text-emerald-700">{connectedCount}/{conns.length} Connected</p>
        </div>
      </div>

      <div className="space-y-8">
        {categories.map(cat => {
          const items = conns.filter(c => c.category === cat);
          return (
            <div key={cat}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{cat}</h2>
              <div className="space-y-2">
                {items.map(conn => {
                  const isExpanded = expandedId === conn.id;
                  return (
                    <div key={conn.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <div className="flex items-center justify-between px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{conn.icon}</span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{conn.name}</p>
                            <p className="text-xs text-gray-500">{conn.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {conn.connected ? (
                            <>
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                Connected
                              </span>
                              <button
                                onClick={() => handleDisconnect(conn.id)}
                                className="text-xs text-red-500 hover:text-red-700 font-medium"
                              >
                                Disconnect
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : conn.id)}
                              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors"
                            >
                              Connect
                            </button>
                          )}
                        </div>
                      </div>

                      {isExpanded && !conn.connected && (
                        <div className="px-5 pb-4 border-t border-gray-100 pt-4">
                          <div className="max-w-md">
                            <label className="block text-xs text-gray-500 mb-1.5 font-medium">
                              {conn.id === "hubspot" ? "Make (Integromat) Webhook URL" :
                               conn.id === "sweepandgo" || conn.id === "jobber" ? "API Token" :
                               conn.id === "quo" || conn.id === "dialpad" || conn.id === "ringcentral" ? "API Key" :
                               "OAuth / API Key"}
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="password"
                                value={apiInputs[conn.id] || ""}
                                onChange={e => setApiInputs(prev => ({ ...prev, [conn.id]: e.target.value }))}
                                placeholder={conn.id === "hubspot" ? "https://hook.make.com/..." : "Enter your API key or token"}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                              <button
                                onClick={() => handleConnect(conn.id)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors"
                              >
                                Save & Connect
                              </button>
                            </div>
                            {(conn.id === "gads" || conn.id === "fbads" || conn.id === "igads" || conn.id === "ga4" || conn.id === "gsc") && (
                              <p className="text-xs text-gray-400 mt-2">
                                Requires OAuth authentication. Click Connect to authorize via {conn.id.includes("g") ? "Google" : "Meta"}.
                              </p>
                            )}
                            {conn.id === "hubspot" && (
                              <p className="text-xs text-gray-400 mt-2">
                                HubSpot connects via Make (Integromat) workflows. Create a scenario in Make and paste the webhook URL here.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
