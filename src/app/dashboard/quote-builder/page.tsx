"use client";

import { useState } from "react";

const YARD_SIZES = [
  "1–1,000", "1,001–2,000", "2,001–3,000", "3,001–4,000", "4,001–5,000", 
  "5,001–6,000", "6,001–7,000", "7,001–8,000", "8,001–9,000", "9,001–10,000", "10,001+"
];

export default function QuoteBuilderPage() {
  const [yardSize, setYardSize] = useState(YARD_SIZES[0]);
  const [dogs, setDogs] = useState(1);
  const [frequency, setFrequency] = useState("Weekly");
  const [tier, setTier] = useState("Basic");
  const [pricingModal, setPricingModal] = useState(false);

  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Quote Builder</h1>
          <p className="text-gray-500 text-sm">Configure your service quote for new clients.</p>
        </div>
        <button onClick={() => setPricingModal(true)} className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
          ⚙️ Pricing Settings
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Panel: Quote Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quote Configuration</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Yard Size (sqft)</label>
                <select value={yardSize} onChange={(e) => setYardSize(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  {YARD_SIZES.map(s => <option key={s} value={s}>{s} sqft</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Number of Dogs</label>
                <select value={dogs} onChange={(e) => setDogs(Number(e.target.value))} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}{n === 4 ? "+" : ""}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Frequency</label>
                <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                  {["Weekly", "Bi-Weekly", "Twice a Week", "Once a Month", "One-Time"].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Service Tier</label>
                <div className="flex gap-2">
                  {["Basic", "Premium"].map(t => (
                    <button key={t} onClick={() => setTier(t)} className={`flex-1 py-2.5 border rounded-lg text-sm font-semibold transition-colors ${tier === t ? "bg-emerald-50 border-emerald-500 text-emerald-700" : "bg-white border-gray-300 text-gray-600"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Price Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Live Price Preview</h2>
            <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Base Price ({tier})</span>
                <span className="font-semibold text-gray-900">$20.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Dog Surcharge ({dogs} dogs)</span>
                <span className="font-semibold text-gray-900">$6.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Freq. Adjustment</span>
                <span className="font-semibold text-gray-900">+$0.00</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline mb-6">
              <span className="text-lg font-bold text-gray-900">Total Per Visit</span>
              <span className="text-3xl font-bold text-emerald-600">$26.00</span>
            </div>
            <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors">
              Generate Quote
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      {pricingModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Pricing Settings</h2>
              <button onClick={() => setPricingModal(false)} className="text-gray-500 hover:text-gray-700">✕</button>
            </div>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold">Manual Input</button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">Upload Pricing</button>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Basic Tier Pricing</h3>
                <div className="grid grid-cols-4 gap-2 text-center text-xs text-gray-500">
                  <span>Size</span>
                  <span>Small</span>
                  <span>Medium</span>
                  <span>Large</span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  <input className="w-full px-2 py-1.5 border rounded text-sm text-center" defaultValue="$15" />
                  <input className="w-full px-2 py-1.5 border rounded text-sm text-center" defaultValue="$20" />
                  <input className="w-full px-2 py-1.5 border rounded text-sm text-center" defaultValue="$25" />
                  <input className="w-full px-2 py-1.5 border rounded text-sm text-center" defaultValue="$30" />
                </div>
              </div>
              <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold">Save Pricing</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
