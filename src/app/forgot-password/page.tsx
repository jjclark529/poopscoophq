"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1000);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(3); }, 800);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(4); }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">💩</div>
            <span className="text-xl font-bold text-gray-900">PoopScoop HQ</span>
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-5">
              <h1 className="text-xl font-bold text-gray-900">Forgot your password?</h1>
              <p className="text-gray-500 text-sm">Enter your email and we&apos;ll send you a reset code.</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" required />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                {loading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-5">
              <h1 className="text-xl font-bold text-gray-900">Check your email</h1>
              <p className="text-gray-500 text-sm">We sent a 6-digit code to <strong className="text-gray-700">{email}</strong></p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Verification code</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" maxLength={6} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" required />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500 hover:text-gray-700">← Back</button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <h1 className="text-xl font-bold text-gray-900">Set new password</h1>
              <p className="text-gray-500 text-sm">Choose a strong password for your account.</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" required />
              </div>
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          {step === 4 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Password reset!</h1>
              <p className="text-gray-500 text-sm">Your password has been successfully reset.</p>
              <Link href="/login" className="inline-block px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors">
                Back to Sign In
              </Link>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          Remember your password? <Link href="/login" className="text-emerald-600 hover:text-emerald-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
