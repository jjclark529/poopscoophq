"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // Mock auth — accept anything
    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-emerald-600 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-800" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-2xl">💩</div>
            <span className="text-xl font-bold text-white">PoopScoop HQ</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Welcome back!</h2>
          <p className="text-emerald-100 text-lg max-w-md">Log in to manage your routes, grow your customer base, and scoop smarter.</p>
        </div>
        <div className="relative z-10">
          <p className="text-emerald-200 text-sm">&quot;PoopScoop HQ saved us 6 hours a week on routing alone.&quot;</p>
          <p className="text-white font-medium text-sm mt-2">— Doctor Doo, Riverside CA</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">💩</div>
            <span className="text-xl font-bold text-gray-900">PoopScoop HQ</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign in to your account</h1>
          <p className="text-gray-500 mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">Start free trial</Link>
          </p>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-6 border border-red-100">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link href="/forgot-password" className="text-sm text-emerald-600 hover:text-emerald-700">Forgot password?</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">Demo: use any email/password to log in</p>
          </div>
        </div>
      </div>
    </div>
  );
}
