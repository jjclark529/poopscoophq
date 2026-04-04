"use client";

const stats = [
  { label: "MRR", value: "$14,835", change: "+12%", icon: "💰" },
  { label: "ARR", value: "$178,020", change: "+18%", icon: "📈" },
  { label: "Active Customers", value: "47", change: "+5", icon: "👥" },
  { label: "Churn Rate", value: "3.2%", change: "-0.5%", icon: "📉" },
];

const revenueByPlan = [
  { plan: "Starter ($99/mo)", customers: 18, revenue: "$1,782/mo", pct: 21, color: "bg-gray-400" },
  { plan: "Pro ($199/mo)", customers: 22, revenue: "$4,378/mo", pct: 54, color: "bg-blue-500" },
  { plan: "Enterprise ($299/mo)", customers: 7, revenue: "$2,093/mo", pct: 25, color: "bg-purple-500" },
];

const recentSignups = [
  { name: "Happy Tails Removal", plan: "Starter", date: "Apr 3, 2025", status: "Active" },
  { name: "Clean Paws LLC", plan: "Pro", date: "Apr 1, 2025", status: "Trial" },
  { name: "Scoop Masters Inc", plan: "Enterprise", date: "Mar 28, 2025", status: "Active" },
  { name: "Yard Angels", plan: "Pro", date: "Mar 25, 2025", status: "Active" },
  { name: "PetWaste Pro", plan: "Starter", date: "Mar 22, 2025", status: "Trial" },
];

const activity = [
  { msg: "New signup: Clean Paws LLC (Pro plan)", time: "2h ago", icon: "🆕" },
  { msg: "Payment received: $199.00 from Doctor Doo", time: "3h ago", icon: "💳" },
  { msg: "Plan upgraded: Scoop Stars → Enterprise", time: "5h ago", icon: "⬆️" },
  { msg: "New signup: Happy Tails Removal (Starter)", time: "8h ago", icon: "🆕" },
  { msg: "Support ticket opened: Poop Patrol (#4528)", time: "1d ago", icon: "🎫" },
  { msg: "Payment received: $299.00 from Scoop Masters", time: "1d ago", icon: "💳" },
  { msg: "Plan upgraded: PetWaste Pro → Pro", time: "2d ago", icon: "⬆️" },
  { msg: "Subscription cancelled: PetClean Co", time: "2d ago", icon: "❌" },
  { msg: "Payment failed: $99.00 from Yard Pros (retry)", time: "3d ago", icon: "⚠️" },
  { msg: "Support ticket resolved: Scoop Stars (#4521)", time: "3d ago", icon: "✅" },
];

const mrrHistory = [
  { month: "Oct", value: 10200 },
  { month: "Nov", value: 11400 },
  { month: "Dec", value: 12100 },
  { month: "Jan", value: 12800 },
  { month: "Feb", value: 13600 },
  { month: "Mar", value: 14835 },
];
const maxMRR = Math.max(...mrrHistory.map((d) => d.value));

const statusBadge: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Trial: "bg-blue-50 text-blue-700",
};

const planBadge: Record<string, string> = {
  Enterprise: "bg-purple-50 text-purple-700",
  Pro: "bg-blue-50 text-blue-700",
  Starter: "bg-gray-100 text-gray-600",
};

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">PoopScoop HQ platform overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">{s.label}</p>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <span className={`text-xs font-medium ${s.label === "Churn Rate" ? "text-emerald-600" : "text-emerald-600"}`}>
              {s.label === "Churn Rate" ? "↓" : "↑"} {s.change}
            </span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* MRR Trend */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">MRR Trend (6 Months)</h2>
            <span className="text-xs font-medium text-emerald-600">+45.4% growth</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {mrrHistory.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500 font-medium">${(d.value / 1000).toFixed(1)}k</span>
                <div
                  className="w-full bg-emerald-500 rounded-t-md hover:bg-emerald-600 transition-colors"
                  style={{ height: `${(d.value / maxMRR) * 100}%` }}
                />
                <span className="text-[10px] text-gray-400">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Plan */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Revenue by Plan</h2>
          <div className="flex h-6 rounded-full overflow-hidden mb-4">
            {revenueByPlan.map((item) => (
              <div key={item.plan} className={`${item.color} h-full`} style={{ width: `${item.pct}%` }} />
            ))}
          </div>
          <div className="space-y-3">
            {revenueByPlan.map((item) => (
              <div key={item.plan} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.plan}</p>
                    <p className="text-xs text-gray-400">{item.customers} customers</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Signups */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Signups</h2>
          <div className="space-y-3">
            {recentSignups.map((s, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{s.name}</p>
                  <p className="text-xs text-gray-400">{s.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${planBadge[s.plan] || "bg-gray-100 text-gray-600"}`}>
                    {s.plan}
                  </span>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge[s.status] || "bg-gray-100 text-gray-600"}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Activity Feed</h2>
          <div className="space-y-3">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <span className="text-base mt-0.5">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{item.msg}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
