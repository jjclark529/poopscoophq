"use client";

import { useState } from "react";

const transactions = [
  { id: "TXN-1001", customer: "Doctor Doo", amount: "$199.00", type: "subscription", status: "completed", date: "Apr 1, 2025", method: "Visa •••• 4242" },
  { id: "TXN-1002", customer: "Clean Paws LLC", amount: "$199.00", type: "subscription", status: "completed", date: "Apr 1, 2025", method: "MC •••• 5555" },
  { id: "TXN-1003", customer: "Scoop Stars", amount: "$299.00", type: "subscription", status: "completed", date: "Apr 1, 2025", method: "Visa •••• 1234" },
  { id: "TXN-1004", customer: "Yard Pros", amount: "$99.00", type: "subscription", status: "failed", date: "Apr 1, 2025", method: "MC •••• 8888" },
  { id: "TXN-1005", customer: "Doo Duty", amount: "$199.00", type: "subscription", status: "completed", date: "Apr 1, 2025", method: "Visa •••• 9999" },
  { id: "TXN-1006", customer: "Happy Tails Removal", amount: "$99.00", type: "subscription", status: "completed", date: "Apr 1, 2025", method: "Amex •••• 3456" },
  { id: "TXN-1007", customer: "Poop Patrol", amount: "$299.00", type: "subscription", status: "completed", date: "Mar 1, 2025", method: "Visa •••• 7777" },
  { id: "TXN-1008", customer: "PetClean Co", amount: "$99.00", type: "refund", status: "completed", date: "Mar 15, 2025", method: "Visa •••• 6543" },
];

export default function AdminBillingPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const filtered = statusFilter === "all" ? transactions : transactions.filter((t) => t.status === statusFilter);

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Billing & Transactions</h1>
        <p className="text-gray-500 text-sm">View payment history and transaction details.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {[
          { label: "Revenue (This Month)", value: "$47,250" },
          { label: "Successful Payments", value: "278" },
          { label: "Failed Payments", value: "6" },
          { label: "Refunds", value: "$594" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6">
        {["all", "completed", "failed", "refund"].map((f) => (
          <button key={f} onClick={() => setStatusFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === f ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-gray-500 hover:bg-gray-100"}`}>
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Transaction</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Customer</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Type</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Method</th>
              <th className="text-right px-5 py-3 font-medium text-gray-500">Amount</th>
              <th className="text-left px-5 py-3 font-medium text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-5 py-3 font-mono text-xs text-gray-500">{t.id}</td>
                <td className="px-5 py-3 font-medium text-gray-900">{t.customer}</td>
                <td className="px-5 py-3 text-gray-600 capitalize">{t.type}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    t.status === "completed" ? "bg-emerald-50 text-emerald-700" :
                    t.status === "failed" ? "bg-red-50 text-red-700" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    {t.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-gray-500 text-xs">{t.method}</td>
                <td className={`px-5 py-3 text-right font-medium ${t.type === "refund" ? "text-red-600" : "text-gray-900"}`}>
                  {t.type === "refund" ? `-${t.amount}` : t.amount}
                </td>
                <td className="px-5 py-3 text-gray-500">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
