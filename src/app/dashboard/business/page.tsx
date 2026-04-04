"use client";

const companyInfo = {
  name: "Doctor Doo Pet Waste Removal",
  owner: "Derek \"Doctor Doo\" Douglas",
  phone: "(951) 555-0187",
  email: "derek@doctordoo.com",
  website: "doctordoo.com",
  address: "Riverside, CA 92501",
  founded: "2021",
  license: "CA-PWR-2021-4892",
};

const serviceStats = [
  { label: "Active Clients", value: "78", icon: "👥", change: "+5 this month" },
  { label: "Weekly Services", value: "142", icon: "🗓️", change: "Avg per week" },
  { label: "Monthly Revenue", value: "$12,480", icon: "💰", change: "+12% vs last month" },
  { label: "Client Retention", value: "94%", icon: "🔒", change: "Excellent" },
];

const services = [
  { name: "Weekly Scoop", price: "$15/visit", clients: 52, pct: 67 },
  { name: "Bi-Weekly Scoop", price: "$20/visit", clients: 18, pct: 23 },
  { name: "One-Time Clean", price: "$45-95", clients: 5, pct: 6 },
  { name: "Deodorizing Add-On", price: "+$10/visit", clients: 3, pct: 4 },
];

const crew = [
  { name: "Derek Douglas", role: "Owner / Lead Tech", status: "Active", zones: "Downtown, Corona Hills" },
  { name: "Marcus Rivera", role: "Field Tech", status: "Active", zones: "Moreno Valley, Norco" },
  { name: "Jasmine Lee", role: "Field Tech", status: "Active", zones: "Jurupa Valley, Woodcrest" },
  { name: "Alex Thompson", role: "Part-Time Tech", status: "Active", zones: "Orangecrest, Canyon Crest" },
];

const equipment = [
  { name: "2022 Ford Transit Connect", type: "Vehicle", status: "Good", notes: "Primary service vehicle" },
  { name: "2019 Honda CR-V", type: "Vehicle", status: "Good", notes: "Backup / overflow" },
  { name: "Pooper Scooper Pro Kit x4", type: "Tools", status: "Good", notes: "One per crew member" },
  { name: "Waste Disposal Bags (bulk)", type: "Supplies", status: "Reorder Soon", notes: "~2 weeks remaining" },
  { name: "Yard Deodorizer Spray x6", type: "Supplies", status: "Good", notes: "3-month supply" },
];

export default function MyBusinessPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Business</h1>
        <p className="text-gray-500 mt-1">
          Your business at a glance — company info, services, crew, and equipment
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceStats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-xs text-emerald-600 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Company Information</h2>
          <div className="space-y-3">
            {Object.entries(companyInfo).map(([key, val]) => (
              <div key={key} className="flex items-start justify-between">
                <span className="text-xs text-gray-400 font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <span className="text-sm text-gray-900 font-medium text-right">
                  {val}
                </span>
              </div>
            ))}
          </div>
          <button className="mt-4 w-full px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium hover:bg-gray-50 transition-colors">
            Edit Info
          </button>
        </div>

        {/* Services */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Service Breakdown</h2>
          <div className="space-y-3">
            {services.map((svc) => (
              <div key={svc.name} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{svc.name}</p>
                  <p className="text-xs text-gray-500">{svc.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{svc.clients} clients</p>
                  <p className="text-xs text-gray-400">{svc.pct}% of total</p>
                </div>
                <div className="w-20">
                  <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${svc.pct}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Crew */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Crew Members</h2>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">
            {crew.length} active
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Zones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {crew.map((member) => (
                <tr key={member.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{member.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{member.role}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                      {member.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{member.zones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Equipment */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Equipment &amp; Supplies</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Item</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {equipment.map((item) => (
                <tr key={item.name} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      item.status === "Good"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
