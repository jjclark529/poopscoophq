"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PLANS = [
  { id: "starter", name: "Starter", price: "$99/mo", desc: "Up to 50 clients, route optimization, basic lead gen" },
  { id: "pro", name: "Pro", price: "$199/mo", desc: "Up to 200 clients, AI coaching, ad builder, post scheduler", popular: true },
  { id: "enterprise", name: "Enterprise", price: "$299/mo", desc: "Unlimited clients, multi-crew, API access, custom integrations" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white text-xl">💩</div>
            <span className="text-xl font-bold text-gray-900">PoopScoop HQ</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 text-sm mt-1">14-day free trial. No credit card required.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? "bg-emerald-500 text-white" : "bg-gray-200 text-gray-400"}`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-emerald-500" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Company Name</label>
                <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Doctor Doo LLC" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
              </div>
              <button onClick={() => setStep(2)} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors">
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Your Plan</h2>
              <div className="space-y-3">
                {PLANS.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${selectedPlan === plan.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{plan.name}</span>
                          {plan.popular && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Popular</span>}
                        </div>
                        <p className="text-gray-500 text-sm mt-0.5">{plan.desc}</p>
                      </div>
                      <span className="text-lg font-bold text-gray-900">{plan.price}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors">Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="bg-emerald-50 border border-emerald-100 rounded-lg px-4 py-3 text-sm text-emerald-700">
                🎉 14-day free trial — you won&apos;t be charged until the trial ends
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                <input type="text" placeholder="4242 4242 4242 4242" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">CVC</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">Back</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50">
                  {loading ? "Creating account..." : "Start Free Trial"}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          Already have an account? <Link href="/login" className="text-emerald-600 hover:text-emerald-700">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
