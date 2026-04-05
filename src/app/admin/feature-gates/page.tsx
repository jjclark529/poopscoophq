"use client";

import { useState } from "react";

interface FeatureGate {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  tier: "all" | "pro" | "enterprise";
  rollout: number;
}

const initialGates: FeatureGate[] = [
  { id: "route_optimizer", name: "Route Optimizer", description: "AI-powered route optimization with real road data", enabled: true, tier: "all", rollout: 100 },
  { id: "turf_tracker", name: "Turf Tracker", description: "Neighborhood lead generation with interactive map", enabled: true, tier: "all", rollout: 100 },
  { id: "captain_scoop", name: "Captain Scoop AI", description: "AI business development assistant powered by GPT-4o", enabled: true, tier: "all", rollout: 100 },
  { id: "rival_radar", name: "Rival Radar", description: "Competitor monitoring, review tracking, and SWOT analysis", enabled: true, tier: "pro", rollout: 100 },
  { id: "ad_quick_launch", name: "Ad Quick Launch", description: "5-step ad campaign wizard for Google and Meta", enabled: true, tier: "pro", rollout: 100 },
  { id: "quote_builder", name: "Quote Builder", description: "Dynamic pricing calculator with per-visit and monthly quotes", enabled: true, tier: "all", rollout: 100 },
  { id: "review_automation", name: "Review Automation", description: "Automated review requests with follow-up sequences", enabled: true, tier: "pro", rollout: 100 },
  { id: "sms_templates", name: "SMS Templates", description: "Pre-built SMS templates for every customer interaction", enabled: true, tier: "pro", rollout: 100 },
  { id: "growth_goals", name: "Growth Goals & Projections", description: "AI growth modeling with client and revenue projections", enabled: true, tier: "enterprise", rollout: 100 },
  { id: "google_drive_sync", name: "Google Drive + Sheets Sync", description: "Sync data to Google Sheets and Drive automatically", enabled: false, tier: "enterprise", rollout: 0 },
  { id: "multi_location", name: "Multi-Location Support", description: "Manage multiple service areas from one account", enabled: false, tier: "enterprise", rollout: 0 },
  { id: "white_label", name: "White Label", description: "Custom branding for resellers and franchises", enabled: false, tier: "enterprise", rollout: 0 },
];

const TIER_BADGE: Record<string, string> = {
  all: "bg-emerald-100 text-emerald-700",
  pro: "bg-blue-100 text-blue-700",
  enterprise: "bg-purple-100 text-purple-700",
};

export default function FeatureGatesPage() {
  const [gates, setGates] = useState(initialGates);

  const toggleGate = (id: string) => {
    setGates(prev => prev.map(g => g.id === id ? { ...g, enabled: !g.enabled, rollout: g.enabled ? 0 : 100 } : g));
  };

  const updateRollout = (id: string, value: number) => {
    setGates(prev => prev.map(g => g.id === id ? { ...g, rollout: value } : g));
  };

  const enabledCount = gates.filter(g => g.enabled).length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Feature Gates</h1>
          <p className="text-gray-500 text-sm mt-1">Control which features are available to customers by plan tier</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-2">
          <p className="text-sm font-semibold text-emerald-700">{enabledCount}/{gates.length} Active</p>
        </div>
      </div>

      <div className="space-y-3">
        {gates.map(gate => (
          <div key={gate.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold text-gray-900">{gate.name}</h3>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${TIER_BADGE[gate.tier]}`}>
                  {gate.tier === "all" ? "All Plans" : gate.tier}
                </span>
              </div>
              <button
                onClick={() => toggleGate(gate.id)}
                className={`w-11 h-6 rounded-full transition-colors flex items-center ${gate.enabled ? "bg-emerald-500 justify-end" : "bg-gray-300 justify-start"}`}
              >
                <div className="w-5 h-5 bg-white rounded-full shadow mx-0.5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">{gate.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Rollout:</span>
              <input
                type="range"
                min={0}
                max={100}
                value={gate.rollout}
                onChange={e => updateRollout(gate.id, Number(e.target.value))}
                className="flex-1 accent-emerald-600"
                disabled={!gate.enabled}
              />
              <span className="text-xs font-semibold text-gray-700 w-10 text-right">{gate.rollout}%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors">
          💾 Save Feature Gates
        </button>
      </div>
    </div>
  );
}
