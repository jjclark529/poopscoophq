"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import type { Zone } from "../../../components/ServiceAreaMap";

const ServiceAreaMap = dynamic(
  () => import("../../../components/ServiceAreaMap"),
  { ssr: false, loading: () => <div className="w-full min-h-[500px] bg-gray-50 rounded-xl animate-pulse" /> }
);

const stats = [
  { label: "Active Customers", value: "127", icon: "👥" },
  { label: "Active Leads", value: "42", icon: "🎯" },
  { label: "Service Zones", value: "10", icon: "📍" },
  { label: "Service Radius", value: "15 mi", icon: "📏" },
];

const zones: Zone[] = [
  { name: "Canyon Crest", lat: 33.9328, lng: -117.3271, customers: 24, leads: 6, revenue: "$1,120", density: "High" },
  { name: "Arlington Heights", lat: 33.919, lng: -117.4132, customers: 18, leads: 4, revenue: "$840", density: "High" },
  { name: "La Sierra", lat: 33.938, lng: -117.458, customers: 15, leads: 3, revenue: "$700", density: "Medium" },
  { name: "Downtown Riverside", lat: 33.9533, lng: -117.3962, customers: 12, leads: 5, revenue: "$560", density: "Medium" },
  { name: "Orangecrest", lat: 33.889, lng: -117.362, customers: 14, leads: 3, revenue: "$650", density: "Medium" },
  { name: "Woodcrest", lat: 33.878, lng: -117.335, customers: 10, leads: 2, revenue: "$470", density: "Medium" },
  { name: "Moreno Valley", lat: 33.9375, lng: -117.2295, customers: 8, leads: 4, revenue: "$375", density: "Low" },
  { name: "Corona", lat: 33.8753, lng: -117.5664, customers: 5, leads: 8, revenue: "$235", density: "Low" },
  { name: "Norco", lat: 33.9311, lng: -117.5486, customers: 4, leads: 2, revenue: "$185", density: "Low" },
  { name: "Jurupa Valley", lat: 33.9903, lng: -117.4855, customers: 3, leads: 1, revenue: "$120", density: "Low" },
];

const insights = [
  {
    emoji: "🎯",
    type: "Opportunity",
    zone: "Canyon Crest",
    message:
      "Canyon Crest has 6 leads but only 24 customers — high conversion potential. Consider targeted Meta ads.",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-800",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    emoji: "⚡",
    type: "Optimization",
    zone: "Moreno Valley / Jurupa Valley",
    message:
      "Moreno Valley + Jurupa Valley could be combined into one route day to improve efficiency.",
    color: "bg-amber-50 border-amber-200",
    textColor: "text-amber-800",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    emoji: "📍",
    type: "Coverage Gap",
    zone: "Eastvale",
    message:
      "No presence in Eastvale area despite being adjacent to your Norco coverage. 12,000+ households with dogs.",
    color: "bg-red-50 border-red-200",
    textColor: "text-red-800",
    badgeColor: "bg-red-100 text-red-700",
  },
  {
    emoji: "🏆",
    type: "Winner",
    zone: "Canyon Crest",
    message:
      "Canyon Crest is your most efficient zone — highest revenue per customer at $46.67/mo avg.",
    color: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-800",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
];

const DENSITY_DOT: Record<string, string> = {
  High: "bg-emerald-500",
  Medium: "bg-amber-400",
  Low: "bg-red-400",
};

const TREND: Record<string, { arrow: string; color: string }> = {
  High: { arrow: "↑", color: "text-emerald-600" },
  Medium: { arrow: "→", color: "text-amber-600" },
  Low: { arrow: "↓", color: "text-red-500" },
};

export default function ServiceAreaPage() {
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Service Area Map</h1>
        <p className="text-gray-500 mt-1">
          Visualize customer density, lead sources, and coverage gaps
        </p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{stat.icon}</span>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content: Map + Zones List */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column: Map (~60%) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <ServiceAreaMap
            zones={zones}
            selectedZone={selectedZone}
            onZoneSelect={setSelectedZone}
          />
        </div>

        {/* Right Column: Service Zones (~40%) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Service Zones
          </h2>
          <div className="flex-1 overflow-y-auto max-h-[500px] space-y-2 pr-1">
            {zones.map((zone, i) => {
              const isSelected = selectedZone === i;
              const trend = TREND[zone.density];
              return (
                <button
                  key={zone.name}
                  onClick={() => setSelectedZone(i)}
                  className={`w-full text-left rounded-lg border p-3 transition-colors ${
                    isSelected
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${DENSITY_DOT[zone.density]}`}
                      />
                      <span className="font-medium text-gray-900 text-sm">
                        {zone.name}
                      </span>
                    </div>
                    <span className={`text-xs font-semibold ${trend.color}`}>
                      {trend.arrow}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-4 text-xs text-gray-500 pl-[18px]">
                    <span>{zone.customers} customers</span>
                    <span>{zone.leads} leads</span>
                    <span className="font-semibold text-gray-700">
                      {zone.revenue}/mo
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Captain Scoop's Area Insights */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          🍦 Captain Scoop&apos;s Area Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div
              key={insight.type + insight.zone}
              className={`rounded-xl border p-5 ${insight.color}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{insight.emoji}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${insight.badgeColor}`}
                >
                  {insight.type}
                </span>
                <span className="text-xs text-gray-500 ml-auto">
                  {insight.zone}
                </span>
              </div>
              <p className={`text-sm ${insight.textColor}`}>
                {insight.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
