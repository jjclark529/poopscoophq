"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";

const TurfMap = dynamic(() => import("../../../components/TurfMap"), {
  ssr: false,
  loading: () => <div className="w-full min-h-[500px] bg-gray-50 rounded-xl animate-pulse" />,
});

const CRM_CLIENTS = [
  { id: "c1", name: "Johnson Family", address: "3842 Brockton Ave, Riverside, CA", lat: 33.9533, lng: -117.3962 },
  { id: "c2", name: "Martinez Residence", address: "6721 Magnolia Ave, Riverside, CA", lat: 33.9381, lng: -117.3743 },
  { id: "c3", name: "Chen Home", address: "1455 University Ave, Riverside, CA", lat: 33.9563, lng: -117.3412 },
  { id: "c4", name: "Williams Property", address: "3601 Canyon Crest Dr, Riverside, CA", lat: 33.9328, lng: -117.3271 },
  { id: "c5", name: "Brown Family", address: "2450 Iowa Ave, Riverside, CA", lat: 33.9465, lng: -117.3353 },
  { id: "c6", name: "Davis Yard", address: "4025 Market St, Riverside, CA", lat: 33.9612, lng: -117.3756 },
  { id: "c7", name: "Garcia Estate", address: "8245 Arlington Ave, Riverside, CA", lat: 33.9190, lng: -117.4132 },
  { id: "c8", name: "Taylor House", address: "6380 Day St, Riverside, CA", lat: 33.9284, lng: -117.3520 },
];

type HouseholdStatus = "none" | "door_knocked" | "flyer_left" | "dog_verified" | "not_interested" | "converted";

const STATUS_CONFIG: Record<HouseholdStatus, { label: string; color: string; bg: string }> = {
  none: { label: "—", color: "text-gray-400", bg: "bg-gray-100" },
  door_knocked: { label: "Door Knocked", color: "text-blue-700", bg: "bg-blue-100" },
  flyer_left: { label: "Flyer Left", color: "text-purple-700", bg: "bg-purple-100" },
  dog_verified: { label: "Dog Verified", color: "text-amber-700", bg: "bg-amber-100" },
  not_interested: { label: "Not Interested", color: "text-red-700", bg: "bg-red-100" },
  converted: { label: "Converted!", color: "text-emerald-700", bg: "bg-emerald-100" },
};

const STATUS_OPTIONS: HouseholdStatus[] = ["none", "door_knocked", "flyer_left", "dog_verified", "not_interested", "converted"];

const STREETS = ["Oak St", "Elm Ave", "Pine Dr", "Maple Ln", "Cedar Way", "Birch Ct", "Spruce Rd", "Walnut Blvd", "Ash Pl", "Willow Dr", "Poplar Way", "Juniper Ct"];

function generateHouseholds(clientLat: number, clientLng: number, radius: number) {
  const count = Math.round(radius * 4.7);
  const households: Array<{ id: string; address: string; lat: number; lng: number; type: "high" | "medium" | "low" }> = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = (Math.random() * 0.8 + 0.2) * radius * 0.0007;
    const types: Array<"high" | "medium" | "low"> = ["high", "high", "medium", "medium", "medium", "low"];
    households.push({
      id: `h-${i}`,
      address: `${Math.floor(Math.random() * 9000 + 1000)} ${STREETS[Math.floor(Math.random() * STREETS.length)]}`,
      lat: clientLat + Math.sin(angle) * dist,
      lng: clientLng + Math.cos(angle) * dist,
      type: types[Math.floor(Math.random() * types.length)],
    });
  }
  return households;
}

const SCOOP_TIPS = [
  { emoji: "🎯", title: "High-Density Cluster", tip: "12 homes with dogs within 2 blocks of this client. Door hangers here would be highly efficient." },
  { emoji: "🏘️", title: "Neighbor Targeting", tip: "3 neighbors have shown interest in pet services. Personal referral ask could convert 1-2." },
  { emoji: "📍", title: "Untapped Street", tip: "Cedar Way has 8 dog-owning households and zero current clients. Adjacent to existing route." },
  { emoji: "💡", title: "HOA Opportunity", tip: "Canyon Crest HOA newsletter reaches 400 homes. Sponsored mention costs $50, generates 3-5 leads." },
  { emoji: "🚗", title: "Route Efficiency", tip: "Adding clients from this radius adds only ~4 minutes to your Monday route." },
  { emoji: "⭐", title: "Social Proof", tip: "Your client here has a 5-star review mentioning the neighborhood. Reference it in door hangers." },
];

export default function TurfTrackerPage() {
  const [selectedClient, setSelectedClient] = useState("c1");
  const [blockRadius, setBlockRadius] = useState(5);
  const [statuses, setStatuses] = useState<Record<string, HouseholdStatus>>({});
  const [filterStatus, setFilterStatus] = useState<HouseholdStatus | "all">("all");

  const client = CRM_CLIENTS.find(c => c.id === selectedClient) || CRM_CLIENTS[0];
  const households = useMemo(() => generateHouseholds(client.lat, client.lng, blockRadius), [client.lat, client.lng, blockRadius]);

  const leads = households.map(h => ({ lat: h.lat, lng: h.lng, type: h.type, address: h.address }));

  const filteredHouseholds = filterStatus === "all"
    ? households
    : households.filter(h => (statuses[h.id] || "none") === filterStatus);

  const statusCounts = {
    total: households.length,
    door_knocked: households.filter(h => statuses[h.id] === "door_knocked").length,
    flyer_left: households.filter(h => statuses[h.id] === "flyer_left").length,
    dog_verified: households.filter(h => statuses[h.id] === "dog_verified").length,
    not_interested: households.filter(h => statuses[h.id] === "not_interested").length,
    converted: households.filter(h => statuses[h.id] === "converted").length,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📍 Turf Tracker</h1>
        <p className="text-gray-500 mt-1">Generate leads around your existing clients. Knock doors. Track conversions.</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Select Client (from CRM)</label>
            <select value={selectedClient} onChange={e => setSelectedClient(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm">
              {CRM_CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name} — {c.address}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1.5 block font-medium">Block Radius: {blockRadius} blocks (~{(blockRadius * 80).toLocaleString()}m)</label>
            <input type="range" min={1} max={10} value={blockRadius} onChange={e => setBlockRadius(Number(e.target.value))} className="w-full accent-emerald-600" />
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5"><span>1</span><span>5</span><span>10</span></div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold text-emerald-700">{households.length}</p>
            <p className="text-xs text-emerald-600">Nearby Households</p>
          </div>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-6 gap-3">
        {[
          { label: "Total", count: statusCounts.total, color: "bg-gray-50 border-gray-200" },
          { label: "Door Knocked", count: statusCounts.door_knocked, color: "bg-blue-50 border-blue-200" },
          { label: "Flyer Left", count: statusCounts.flyer_left, color: "bg-purple-50 border-purple-200" },
          { label: "Dog Verified", count: statusCounts.dog_verified, color: "bg-amber-50 border-amber-200" },
          { label: "Not Interested", count: statusCounts.not_interested, color: "bg-red-50 border-red-200" },
          { label: "Converted", count: statusCounts.converted, color: "bg-emerald-50 border-emerald-200" },
        ].map(s => (
          <div key={s.label} className={`rounded-lg border p-3 text-center ${s.color}`}>
            <p className="text-lg font-bold text-gray-900">{s.count}</p>
            <p className="text-[10px] text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Map + Household List */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ minHeight: 500 }}>
          <TurfMap leads={leads} center={[client.lat, client.lng]} zoom={14} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Export CSV", icon: "📥", color: "bg-blue-50 text-blue-700 border-blue-200" },
                { label: "SMS Campaign", icon: "💬", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { label: "Door Hanger Route", icon: "🚪", color: "bg-amber-50 text-amber-700 border-amber-200" },
                { label: "Meta Ad", icon: "📱", color: "bg-purple-50 text-purple-700 border-purple-200" },
              ].map(a => (
                <button key={a.label} className={`p-3 rounded-lg border text-xs font-semibold hover:shadow-sm transition ${a.color}`}>
                  <span className="text-lg block mb-1">{a.icon}</span>{a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Household List with Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Nearby Households ({filteredHouseholds.length})</h3>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value as HouseholdStatus | "all")} className="text-xs border border-gray-200 rounded px-2 py-1">
                <option value="all">All</option>
                {STATUS_OPTIONS.filter(s => s !== "none").map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>)}
                <option value="none">Untagged</option>
              </select>
            </div>
            <div className="max-h-[400px] overflow-y-auto space-y-1.5">
              {filteredHouseholds.map(h => {
                const status = statuses[h.id] || "none";
                const cfg = STATUS_CONFIG[status];
                return (
                  <div key={h.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 border border-gray-100">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${h.type === "high" ? "bg-emerald-500" : h.type === "medium" ? "bg-amber-400" : "bg-blue-400"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 truncate">{h.address}</p>
                    </div>
                    <select
                      value={status}
                      onChange={e => setStatuses(prev => ({ ...prev, [h.id]: e.target.value as HouseholdStatus }))}
                      className={`text-[10px] font-semibold rounded px-1.5 py-0.5 border-0 ${cfg.bg} ${cfg.color} cursor-pointer`}
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{STATUS_CONFIG[s].label === "—" ? "Tag..." : STATUS_CONFIG[s].label}</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Captain Scoop Tips */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🍦 Captain Scoop&apos;s Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCOOP_TIPS.map((tip, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-sm transition">
              <div className="flex items-center gap-2 mb-2"><span className="text-xl">{tip.emoji}</span><h3 className="text-sm font-semibold text-gray-900">{tip.title}</h3></div>
              <p className="text-xs text-gray-600">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
