"use client";

import { useState } from "react";

export default function AdminProfilePage() {
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@poopscoop.hq");

  const admins = [
    { name: "Admin User", email: "admin@poopscoop.hq", role: "Super Admin", lastLogin: "Apr 4, 2025" },
    { name: "Jackie", email: "jackie@poopscoop.hq", role: "Admin", lastLogin: "Apr 3, 2025" },
  ];

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Profile</h1>
        <p className="text-gray-500 text-sm">Manage your admin account and team.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 space-y-5">
        <h2 className="text-sm font-semibold text-gray-900">Your Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
          </div>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors">
          Save Changes
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Change Password</h2>
        <div className="space-y-4 max-w-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
          </div>
          <button className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors">
            Update Password
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-900">Admin Users</h2>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors">
            + Add Admin
          </button>
        </div>
        <div className="space-y-3">
          {admins.map((admin) => (
            <div key={admin.email} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-400">{admin.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">{admin.role}</span>
                <span className="text-xs text-gray-400">Last login: {admin.lastLogin}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
