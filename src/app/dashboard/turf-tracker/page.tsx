"use client";

const topStats = [
  { label: "Total Territory", value: "15 mi", icon: "📍", sub: "radius from HQ" },
  { label: "Coverage", value: "62%", icon: "🗺️", sub: "of target area served" },
  { label: "Active Zones", value: "10", icon: "🟢", sub: "zones with clients" },
  { label: "Growth Opportunities", value: "4", icon: "🚀", sub: "high-potential zones" },
];

const zones = [
  { name: "Downtown Riverside", clients: 18, leads: 5, revenue: "$2,340", coverage: 85, potential: "Low" },
  { name: "Corona Hills", clients: 12, leads: 3, revenue: "$1,560", coverage: 72, potential: "Medium" },
  { name: "Moreno Valley South", clients: 9, leads: 4, revenue: "$1,170", coverage: 55, potential: "High" },
  { name: "Norco Ranch Area", clients: 7, leads: 2, revenue: "$910", coverage: 48, potential: "Medium" },
  { name: "Jurupa Valley", clients: 6, leads: 6, revenue: "$780", coverage: 38, potential: "High" },
  { name: "Woodcrest", clients: 5, leads: 1, revenue: "$650", coverage: 42, potential: "Medium" },
  { name: "Lake Mathews", clients: 4, leads: 3, revenue: "$520", coverage: 30, potential: "High" },
  { name: "Orangecrest", clients: 8, leads: 2, revenue: "$1,040", coverage: 60, potential: "Low" },
  { name: "Canyon Crest", clients: 3, leads: 2, revenue: "$390", coverage: 22, potential: "High" },
  { name: "Arlington Heights", clients: 6, leads: 1, revenue: "$780", coverage: 45, potential: "Low" },
];

const potentialColors: Record<string, string> = {
  High: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-gray-100 text-gray-600",
};

const insights = [
  "🎯 Jurupa Valley has 6 pending leads — highest lead-to-client ratio. Prioritize outreach here!",
  "📈 Moreno Valley South is 55% covered with strong demand. A door hanger campaign could fill gaps.",
  "💡 Canyon Crest is underserved (22%) but showing interest. Consider a targeted Facebook ad.",
  "🏆 Downtown Riverside is your strongest zone at 85% coverage. Focus on retention here.",
];

export default function TurfTrackerPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Turf Tracker</h1>
          <p className="text-gray-500 mt-1">
            Monitor your territory coverage and identify growth opportunities
          </p>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Map Placeholder + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Territory Map</h2>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl h-72 flex items-center justify-center border border-dashed border-emerald-200 relative overflow-hidden">
            {/* Simulated map zones */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Center marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white shadow z-10">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-40" />
                </div>
                {/* Zone circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-emerald-200 rounded-full opacity-60" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-emerald-300 rounded-full opacity-80" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-100 rounded-full opacity-60" />
                {/* Zone markers */}
                <div className="absolute top-4 left-12 w-3 h-3 bg-emerald-500 rounded-full" title="Downtown Riverside" />
                <div className="absolute top-8 right-8 w-3 h-3 bg-amber-500 rounded-full" title="Corona Hills" />
                <div className="absolute bottom-12 left-6 w-3 h-3 bg-emerald-400 rounded-full" title="Moreno Valley" />
                <div className="absolute bottom-8 right-12 w-3 h-3 bg-blue-500 rounded-full" title="Jurupa Valley" />
                <div className="absolute top-1/3 left-4 w-3 h-3 bg-amber-400 rounded-full" title="Norco" />
                <div className="absolute bottom-4 left-1/3 w-3 h-3 bg-red-400 rounded-full" title="Canyon Crest" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur rounded px-3 py-1.5 text-xs text-gray-500">
              🗺️ Interactive map coming soon
            </div>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" /> High coverage</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded-full inline-block" /> Medium coverage</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-400 rounded-full inline-block" /> Low coverage</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block" /> Growth opportunity</span>
          </div>
        </div>

        {/* Captain Scoop Insights */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              🧑‍✈️ Captain Scoop&apos;s Territory Intel
            </h3>
            <div className="space-y-3">
              {insights.map((insight, i) => (
                <div key={i} className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                  {insight}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors text-left">
                🎯 Expand Zone Coverage
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-left">
                📍 Target New Area
              </button>
              <button className="w-full px-4 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors text-left">
                📄 Run Door Hanger Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Zone Performance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Zone Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Zone Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Clients</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Leads</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Revenue</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Coverage %</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Growth Potential</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {zones.map((zone) => (
                <tr key={zone.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{zone.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{zone.clients}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{zone.leads}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{zone.revenue}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            zone.coverage >= 70
                              ? "bg-emerald-500"
                              : zone.coverage >= 40
                              ? "bg-amber-500"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${zone.coverage}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{zone.coverage}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${potentialColors[zone.potential]}`}>
                      {zone.potential}
                    </span>
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
