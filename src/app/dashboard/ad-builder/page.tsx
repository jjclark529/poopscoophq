"use client";

import { useState } from "react";

const templates = [
  { id: 1, name: "Spring Cleanup", platform: "Facebook", preview: "🐕 Spring is here! Time for a fresh start — and a clean yard. Professional pet waste removal starting at just $15/week. Book your FREE quote today!" },
  { id: 2, name: "Neighbor Special", platform: "Facebook", preview: "👋 Hi neighbor! We're already serving families on your street. Get 20% off your first month when you mention this ad. Clean yards, happy dogs!" },
  { id: 3, name: "Google Local", platform: "Google", preview: "Professional Pet Waste Removal | Riverside, CA | ⭐ 4.8 Rating | Weekly service from $15/week | Free quotes | Licensed & insured" },
  { id: 4, name: "New Homeowner", platform: "Facebook", preview: "🏠 Just moved in? Congrats! One less thing to worry about — we'll handle the yard cleanup. First-time customer discount available." },
];

export default function AdBuilderPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [platform, setPlatform] = useState("facebook");
  const [headline, setHeadline] = useState("");
  const [body, setBody] = useState("");
  const [budget, setBudget] = useState("25");
  const [duration, setDuration] = useState("7");

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Ad Builder</h1>
        <p className="text-gray-500 text-sm">Create professional ads for Facebook and Google in minutes.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Build panel */}
        <div className="space-y-6">
          {/* Templates */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Start from a Template</h2>
            <div className="space-y-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setSelectedTemplate(t.id); setHeadline(t.name); setBody(t.preview); setPlatform(t.platform.toLowerCase()); }}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${selectedTemplate === t.id ? "border-emerald-500 bg-emerald-50" : "border-gray-200 hover:bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 text-sm">{t.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{t.platform}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-gray-900">Customize Your Ad</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform</label>
              <div className="flex gap-2">
                {["facebook", "google", "instagram"].map((p) => (
                  <button key={p} onClick={() => setPlatform(p)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${platform === p ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Headline</label>
              <input type="text" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Eye-catching headline" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Ad Copy</label>
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} placeholder="Write your ad copy..." className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Daily Budget ($)</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Duration (days)</label>
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-8">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Ad Preview</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm">💩</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Doctor Doo Pet Waste Removal</p>
                    <p className="text-xs text-gray-400">Sponsored · {platform}</p>
                  </div>
                </div>
                {headline && <p className="font-semibold text-gray-900 mb-2">{headline}</p>}
                <p className="text-sm text-gray-700 leading-relaxed">{body || "Your ad copy will appear here..."}</p>
                <div className="mt-4 bg-emerald-50 rounded-lg p-4 text-center">
                  <div className="text-4xl mb-2">🐕</div>
                  <p className="text-sm font-medium text-gray-700">Professional Pet Waste Removal</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">Get Quote</button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">Learn More</button>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500">
                Estimated reach: <strong className="text-gray-700">2,500-5,000</strong> people · 
                Total budget: <strong className="text-gray-700">${Number(budget) * Number(duration)}</strong>
              </p>
            </div>
            <button className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors">
              🚀 Launch Ad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
