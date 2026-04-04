"use client";

import { useState } from "react";

const allCustomers = [
  { id: 1, name: "Doctor Doo", email: "doctor@doctordoo.com", plan: "Pro", status: "Active", mrr: "$199", joined: "Jan 2024", lastLogin: "Today" },
  { id: 2, name: "Clean Paws LLC", email: "info@cleanpaws.com", plan: "Pro", status: "Active", mrr: "$199", joined: "Mar 2024", lastLogin: "Yesterday" },
  { id: 3, name: "Scoop Stars", email: "hello@scoopstars.com", plan: "Enterprise", status: "Active", mrr: "$299", joined: "Feb 2024", lastLogin: "2 days ago" },
  { id: 4, name: "Happy Tails Removal", email: "owner@happytails.com", plan: "Starter", status: "Trial", mrr: "$0", joined: "Apr 2025", lastLogin: "Today" },
  { id: 5, name: "PetClean Co", email: "admin@petclean.co", plan: "Starter", status: "Churned", mrr: "$0", joined: "Jun 2024", lastLogin: "3 weeks ago" },
  { id: 6, name: "Doo Duty", email: "team@dooduty.com", plan: "Pro", status: "Active", mrr: "$199", joined: "Aug 2024", lastLogin: "3 days ago" },
  { id: 7, name: "Yard Pros", email: "billing@yardpros.net", plan: "Starter", status: "Paused", mrr: "$0", joined: "Nov 2024", lastLogin: "1 week ago" },
  { id: 8, name: "Poop Patrol", email: "info@pooppatrol.com", plan: "Enterprise", status: "Active", mrr: "$299", joined: "May 2024", lastLogin: "Today" },
  { id: 9, name: "Scoop Masters Inc", email: "ops@scoopmasters.com", plan: "Enterprise", status: "Active", mrr: "$299", joined: "Mar 2025", lastLogin: "Yesterday" },
  { id: 10, name: "Yard Angels", email: "hi@yardangels.co", plan: "Pro", status: "Active", mrr: "$199", joined: "Mar 2025", lastLogin: "4 days ago" },
  { id: 11, name: "PetWaste Pro", email: "support@petwastepro.com", plan: "Starter", status: "Active", mrr: "$99", joined: "Mar 2025", lastLogin: "Yesterday" },
  { id: 12, name: "The Poop Fairy", email: "magic@poopfairy.com", plan: "Pro", status: "Active", mrr: "$199", joined: "Jan 2025", lastLogin: "Today" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Trial: "bg-blue-50 text-blue-700",
  Churned: "bg-red-50 text-red-700",
  Paused: "bg-amber-50 text-amber-700",
};

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = allCustomers.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active", count: 38 },
          { label: "Trial", count: 5 },
          { label: "Paused", count: 3 },
          { label: "Churned", count: 1 },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-xl font-bold text-gray-900">{s.count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="paused">Paused</option>
          <option value="churned">Churned</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Customer</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Plan</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">MRR</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Joined</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Last Login</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs font-bold flex-shrink-0">
                      {c.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-gray-600">{c.plan}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[c.status]}`}>
                    {c.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-900 font-medium">{c.mrr}</td>
                <td className="px-5 py-3 text-gray-500">{c.joined}</td>
                <td className="px-5 py-3 text-gray-500">{c.lastLogin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
