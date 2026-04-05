"use client";

import { useState } from "react";

const STEPS = ["Platform", "Budget", "Audience", "Creative", "Review"];

export default function AdQuickLaunchPage() {
  const [step, setStep] = useState(0);
  const [platform, setPlatform] = useState("");
  const [budget, setBudget] = useState("25.00");
  const [duration, setDuration] = useState("Ongoing");
  const [location, setLocation] = useState("Riverside, CA");
  const [radius, setRadius] = useState("5 miles");
  const [interests, setInterests] = useState("Dog owners, pet services");
  const [headline, setHeadline] = useState("Reliable Pet Waste Removal in Riverside");
  const [description, setDescription] = useState("");
  const [launched, setLaunched] = useState(false);

  const canNext = () => {
    if (step === 0) return !!platform;
    if (step === 1) return !!budget;
    if (step === 2) return !!location;
    if (step === 3) return !!headline;
    return true;
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          </svg>
          Ad Quick Launch
        </h1>
        <p className="text-gray-500 mt-1">Launch an Ad Campaign in less than 5 minutes!</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              {i < step ? (
                <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {i + 1}
                </div>
              )}
              <span className={`text-sm font-medium ${i <= step ? "text-gray-900" : "text-gray-400"}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-3 ${i < step ? "bg-emerald-400" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Choose Platform</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPlatform("google")}
                className={`p-6 rounded-xl border-2 text-left transition-all ${platform === "google" ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="text-3xl mb-2">🔍</div>
                <p className="font-semibold text-gray-900">Google Ads</p>
                <p className="text-xs text-gray-500 mt-1">Search & display ads</p>
              </button>
              <button
                onClick={() => setPlatform("meta")}
                className={`p-6 rounded-xl border-2 text-left transition-all ${platform === "meta" ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
              >
                <div className="text-3xl mb-2">📱</div>
                <p className="font-semibold text-gray-900">Meta Ads</p>
                <p className="text-xs text-gray-500 mt-1">Facebook & Instagram</p>
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Set Your Budget</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Daily Budget</label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-500">$</span>
                  <input type="text" value={budget} onChange={e => setBudget(e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Ongoing</option>
                  <option>7 days</option>
                  <option>14 days</option>
                  <option>30 days</option>
                  <option>60 days</option>
                  <option>90 days</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Define Audience</h2>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Riverside, CA" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Radius</label>
                <select value={radius} onChange={e => setRadius(e.target.value)} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>5 miles</option>
                  <option>10 miles</option>
                  <option>15 miles</option>
                  <option>25 miles</option>
                  <option>50 miles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Interests</label>
                <input type="text" value={interests} onChange={e => setInterests(e.target.value)} placeholder="Dog owners, pet services..." className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-5">Create Your Ad</h2>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Headline</label>
                <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} placeholder="Reliable Pet Waste Removal in Riverside" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Write your ad copy..." className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                <button className="text-sm text-purple-600 mt-1.5 hover:text-purple-700 font-medium">✨ Let Captain Scoop write this</button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Upload Image or Video</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer transition-colors">
                  <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-gray-600">Drop image or video here, or click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, MP4 up to 50MB</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && !launched && (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Launch!</h2>
            <p className="text-gray-500 mb-6">Captain Scoop has reviewed your campaign and everything looks good.</p>
            <button
              onClick={() => setLaunched(true)}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-bold transition-colors"
            >
              Launch Campaign
            </button>
          </div>
        )}

        {step === 4 && launched && (
          <div className="text-center py-8">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Campaign Launched!</h2>
            <p className="text-gray-500 mb-2">Your {platform === "google" ? "Google" : "Meta"} Ads campaign is now live.</p>
            <div className="bg-gray-50 rounded-lg p-4 max-w-sm mx-auto text-left text-sm mt-4 space-y-1.5">
              <div className="flex justify-between"><span className="text-gray-500">Platform</span><span className="font-semibold">{platform === "google" ? "Google Ads" : "Meta Ads"}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Daily Budget</span><span className="font-semibold">${budget}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Duration</span><span className="font-semibold">{duration}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-semibold">{location}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Headline</span><span className="font-semibold truncate ml-4">{headline}</span></div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {step > 0 ? (
          <button onClick={() => setStep(step - 1)} className="text-sm text-gray-600 hover:text-gray-900 font-medium">Back</button>
        ) : <div />}
        {step < 4 ? (
          <button
            onClick={() => canNext() && setStep(step + 1)}
            disabled={!canNext()}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 ${canNext() ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={() => { setStep(0); setPlatform(""); setLaunched(false); setDescription(""); }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
          >
            Done →
          </button>
        )}
      </div>
    </div>
  );
}
