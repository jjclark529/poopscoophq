"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LeadMap = dynamic(() => import("../../../components/LeadMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  ),
});

const existingClients = [
  { name: "Johnson Family", lat: 33.9533, lng: -117.3962 },
  { name: "Martinez Residence", lat: 33.9381, lng: -117.3743 },
  { name: "Chen Home", lat: 33.9563, lng: -117.3412 },
  { name: "Williams Property", lat: 33.9328, lng: -117.3271 },
  { name: "Brown Family", lat: 33.9465, lng: -117.3353 },
];

const mockLeads = [
  { name: "4523 Oak Ave", type: "Single Family", distance: "0.2 mi", confidence: "High" },
  { name: "4601 Oak Ave", type: "Single Family", distance: "0.3 mi", confidence: "High" },
  { name: "3891 Brockton Ave", type: "Single Family", distance: "0.1 mi", confidence: "High" },
  { name: "6745 Magnolia Ave", type: "Single Family", distance: "0.2 mi", confidence: "Medium" },
  { name: "6800 Magnolia Ave", type: "Townhouse", distance: "0.3 mi", confidence: "Medium" },
  { name: "1480 University Ave", type: "Single Family", distance: "0.1 mi", confidence: "High" },
  { name: "3625 Canyon Crest Dr", type: "Single Family", distance: "0.2 mi", confidence: "Medium" },
  { name: "2475 Iowa Ave", type: "Single Family", distance: "0.1 mi", confidence: "Low" },
];

export default function LeadGenerationPage() {
  const [selectedClient, setSelectedClient] = useState(0);
  const [blockRadius, setBlockRadius] = useState(3);
  const [leads, setLeads] = useState(mockLeads);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setLeads(mockLeads.slice(0, blockRadius * 2 + 2));
      setGenerating(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Lead Generation</h1>
        <p className="text-gray-500 text-sm">Find new customers near your existing routes.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Generate Leads</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Center on Client</label>
                <select
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {existingClients.map((c, i) => (
                    <option key={i} value={i}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Block Radius: {blockRadius} blocks (~{blockRadius * 80}m)
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={blockRadius}
                  onChange={(e) => setBlockRadius(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>1 block</span>
                  <span>10 blocks</span>
                </div>
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {generating ? "Generating..." : "🔍 Generate Leads"}
              </button>
            </div>
          </div>

          {/* Captain Scoop tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-start gap-2">
              <span className="text-lg">🎖️</span>
              <div>
                <p className="text-sm font-medium text-amber-900">Captain Scoop says:</p>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Homes within 3 blocks of existing clients convert 3x better. Focus your door hangers here!
                </p>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                📊 Export CSV
              </button>
              <button className="w-full text-left px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                📱 SMS Campaign
              </button>
              <button className="w-full text-left px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                🚪 Door Hanger Route
              </button>
              <button className="w-full text-left px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm text-gray-700 transition-colors">
                📢 Meta Ad Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Map and leads list */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden" style={{ height: 400 }}>
            <LeadMap
              clients={existingClients}
              selectedClient={selectedClient}
              radius={blockRadius}
              leads={leads}
            />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Generated Leads ({leads.length})
              </h2>
              <span className="text-xs text-gray-400">Within {blockRadius} blocks of {existingClients[selectedClient].name}</span>
            </div>
            <div className="space-y-2">
              {leads.map((lead, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-gray-50 border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                    <p className="text-xs text-gray-400">{lead.type} · {lead.distance} away</p>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    lead.confidence === "High" ? "bg-emerald-50 text-emerald-700" :
                    lead.confidence === "Medium" ? "bg-amber-50 text-amber-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {lead.confidence}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
