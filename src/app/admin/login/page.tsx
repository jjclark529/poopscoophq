"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      router.push("/admin");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-4">💩</div>
          <h1 className="text-2xl font-bold text-white">Admin Backoffice</h1>
          <p className="text-gray-400 text-sm mt-1">PoopScoop HQ Administration</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
          {error && (
            <div className="bg-red-900/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-6 border border-red-800">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@poopscoop.hq" className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" required />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In to Admin"}
            </button>
          </form>
          <p className="text-gray-500 text-xs text-center mt-4">Demo: any credentials work</p>
        </div>
      </div>
    </div>
  );
}
