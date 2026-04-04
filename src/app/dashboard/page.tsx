"use client";

import Link from "next/link";

const stats = [
  { label: "Active Clients", value: "127", change: "+12%", up: true, icon: "👥" },
  { label: "Monthly Revenue", value: "$14,850", change: "+8.3%", up: true, icon: "💰" },
  { label: "Routes Today", value: "3", change: "", up: true, icon: "🗺️" },
  { label: "Reviews This Month", value: "18", change: "+6", up: true, icon: "⭐" },
];

const recentActivity = [
  { type: "service", msg: "Service completed: Sarah Connor — 4521 Oak Ave", time: "12 min ago", icon: "✅" },
  { type: "payment", msg: "Payment received: Mike Thompson — $89.00", time: "45 min ago", icon: "💳" },
  { type: "client", msg: "New client: Amanda Reyes — 1280 Palm Dr", time: "1h ago", icon: "👤" },
  { type: "review", msg: "5-star review from David Brown on Google", time: "2h ago", icon: "⭐" },
  { type: "service", msg: "Service completed: Lisa Chen — 3892 Elm St", time: "3h ago", icon: "✅" },
];

const quickActions = [
  { label: "Optimize Routes", href: "/dashboard/route-optimizer", icon: "🗺️", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  { label: "Generate Leads", href: "/dashboard/lead-generation", icon: "📍", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { label: "Send Review Requests", href: "/dashboard/review-requests", icon: "⭐", color: "bg-amber-50 text-amber-700 border-amber-100" },
  { label: "Create an Ad", href: "/dashboard/ad-builder", icon: "📱", color: "bg-purple-50 text-purple-700 border-purple-100" },
];

const revenueData = [
  { month: "Oct", value: 10800 },
  { month: "Nov", value: 11500 },
  { month: "Dec", value: 12300 },
  { month: "Jan", value: 12900 },
  { month: "Feb", value: 13800 },
  { month: "Mar", value: 14850 },
];
const maxRevenue = Math.max(...revenueData.map((d) => d.value));

const clientGrowth = [
  { month: "Oct", value: 98 },
  { month: "Nov", value: 105 },
  { month: "Dec", value: 108 },
  { month: "Jan", value: 114 },
  { month: "Feb", value: 121 },
  { month: "Mar", value: 127 },
];
const maxClients = Math.max(...clientGrowth.map((d) => d.value));
const minClients = Math.min(...clientGrowth.map((d) => d.value));

const todayStops = [
  { time: "8:00 AM", client: "Sarah Connor", address: "4521 Oak Ave", status: "completed" },
  { time: "8:45 AM", client: "Mike Thompson", address: "5210 Magnolia Blvd", status: "completed" },
  { time: "9:30 AM", client: "Lisa Chen", address: "3892 Elm St", status: "in-progress" },
  { time: "10:15 AM", client: "David Brown", address: "7744 Cedar Ln", status: "upcoming" },
  { time: "11:00 AM", client: "Jennifer Lopez", address: "2190 Birch Dr", status: "upcoming" },
  { time: "11:45 AM", client: "Robert Williams", address: "6623 Maple Way", status: "upcoming" },
];

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">My Business</h1>
        <p className="text-gray-500 text-sm">
          Welcome back, Doctor Doo! Here&apos;s how your business is doing.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <span className="text-xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            {stat.change && (
              <p className={`text-xs mt-1 font-medium ${stat.up ? "text-emerald-600" : "text-red-600"}`}>
                {stat.up ? "↑" : "↓"} {stat.change} from last month
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-colors hover:shadow-sm ${action.color}`}
                >
                  <span className="text-lg">{action.icon}</span>
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Captain Scoop Tip */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-5">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🎖️</div>
              <div>
                <h3 className="text-sm font-semibold text-amber-900 mb-1">Captain Scoop Tip</h3>
                <p className="text-amber-800 text-sm leading-relaxed">
                  You have 3 clients within 0.5 miles of each other on different days. Consolidating them to Tuesday could save 18 minutes of drive time!
                </p>
                <Link href="/dashboard/route-optimizer" className="text-amber-700 text-xs font-medium hover:underline mt-2 inline-block">
                  View suggestion →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Center column: Activity + Schedule */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Route Stops */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Today&apos;s Route — Monday</h2>
              <span className="text-xs text-gray-400">6 stops • 3.2h est.</span>
            </div>
            <div className="space-y-0">
              {todayStops.map((stop, i) => (
                <div key={i} className={`flex items-center gap-3 py-2.5 ${i !== todayStops.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <span className="text-xs text-gray-400 w-16 flex-shrink-0 font-mono">{stop.time}</span>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    stop.status === "completed" ? "bg-emerald-400" :
                    stop.status === "in-progress" ? "bg-amber-400 animate-pulse" :
                    "bg-gray-300"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{stop.client}</p>
                    <p className="text-xs text-gray-400 truncate">{stop.address}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    stop.status === "completed" ? "bg-emerald-50 text-emerald-700" :
                    stop.status === "in-progress" ? "bg-amber-50 text-amber-700" :
                    "bg-gray-100 text-gray-500"
                  }`}>
                    {stop.status === "in-progress" ? "In Progress" : stop.status === "completed" ? "Done" : "Upcoming"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-0">
              {recentActivity.map((item, i) => (
                <div key={i} className={`flex items-start gap-3 py-3 ${i !== recentActivity.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <span className="text-lg mt-0.5">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700">{item.msg}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Revenue Trend (6 Months)</h2>
            <span className="text-xs text-emerald-600 font-medium">+37.5% growth</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {revenueData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500 font-medium">${(d.value / 1000).toFixed(1)}k</span>
                <div
                  className="w-full bg-emerald-500 rounded-t-md hover:bg-emerald-600 transition-colors relative"
                  style={{ height: `${(d.value / maxRevenue) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Growth */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Client Growth (6 Months)</h2>
            <span className="text-xs text-emerald-600 font-medium">+29 clients</span>
          </div>
          <div className="h-40 flex items-end relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-100 w-full" />
              ))}
            </div>
            {/* Bars */}
            <div className="relative flex items-end gap-3 w-full h-full">
              {clientGrowth.map((d, i) => {
                const heightPct = ((d.value - minClients + 10) / (maxClients - minClients + 20)) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 z-10">
                    <span className="text-[10px] text-gray-500 font-medium">{d.value}</span>
                    <div
                      className="w-full bg-blue-400 rounded-t-md hover:bg-blue-500 transition-colors"
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[10px] text-gray-400">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">This Week&apos;s Schedule</h2>
        <div className="grid grid-cols-5 gap-3">
          {[
            { day: "Mon", clients: 6, hours: "3.2h", active: true },
            { day: "Tue", clients: 5, hours: "2.8h", active: false },
            { day: "Wed", clients: 4, hours: "2.1h", active: false },
            { day: "Thu", clients: 3, hours: "1.5h", active: false },
            { day: "Fri", clients: 2, hours: "1.1h", active: false },
          ].map((d) => (
            <div key={d.day} className={`text-center p-3 rounded-lg ${d.active ? "bg-emerald-50 border border-emerald-200" : "bg-gray-50"}`}>
              <p className={`text-xs font-medium mb-1 ${d.active ? "text-emerald-700" : "text-gray-500"}`}>{d.day}</p>
              <p className={`text-lg font-bold ${d.active ? "text-emerald-700" : "text-gray-900"}`}>{d.clients}</p>
              <p className={`text-xs ${d.active ? "text-emerald-500" : "text-gray-400"}`}>{d.hours}</p>
              {d.active && <p className="text-[10px] text-emerald-600 font-medium mt-1">TODAY</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
