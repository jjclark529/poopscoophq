"use client";

export default function GoogleProfilePage() {
  const completeness = 80;
  const checklistItems = [
    { label: "Business name", done: true },
    { label: "Address", done: true },
    { label: "Phone number", done: true },
    { label: "Website", done: true },
    { label: "Business category", done: true },
    { label: "Business hours", done: true },
    { label: "Photos", done: false },
    { label: "Reviews (5+)", done: true },
    { label: "Business description", done: false },
    { label: "Services listed", done: false },
  ];

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (completeness / 100) * circumference;

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Google Business Profile</h1>
          <p className="text-gray-500 text-sm">
            Your listing&apos;s status, profile completeness, reviews, and what to do next
          </p>
        </div>
        <a
          href="/dashboard/settings/connections"
          className="px-5 py-2.5 border-2 border-amber-400 text-amber-700 hover:bg-amber-50 rounded-lg text-sm font-semibold transition-colors"
        >
          Add Google Maps URL in Connections
        </a>
      </div>

      {/* Profile Info + Completeness — two columns */}
      <div className="grid md:grid-cols-5 gap-6 mb-6">
        {/* Left: Profile Info (3 cols) */}
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center">
              <img src="/logo.png" alt="Doctor Doo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Doctor Doo Pet Waste Removal</h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-amber-500 font-bold text-sm">4.9</span>
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-gray-500 text-sm">127 reviews</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Phone:</span>{" "}
              <span className="text-gray-900">(951) 555-0123</span>
            </div>
            <div>
              <span className="text-gray-500">Website:</span>{" "}
              <span className="text-emerald-600">poopscoophq.com</span>
            </div>
            <div>
              <span className="text-gray-500">Category:</span>{" "}
              <span className="text-gray-900">Pet Waste Removal</span>
            </div>
            <div>
              <span className="text-gray-500">Hours:</span>{" "}
              <span className="text-gray-900">Mon-Sat 7am-6pm</span>
            </div>
          </div>
        </div>

        {/* Right: Profile Completeness (2 cols) */}
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-gray-900 text-center mb-4">Profile Completeness</h3>
          
          {/* Circular progress */}
          <div className="flex justify-center mb-5">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{completeness}%</span>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {checklistItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                {item.done ? (
                  <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  </svg>
                )}
                <span className={item.done ? "text-gray-900" : "text-gray-400"}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {[
          { label: "Google Rating", value: "4.9 ⭐", sub: "127 reviews" },
          { label: "Profile Views", value: "1,247", sub: "Last 30 days" },
          { label: "Direction Requests", value: "89", sub: "Last 30 days" },
          { label: "Phone Calls", value: "34", sub: "Last 30 days" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className="text-xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent reviews */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {[
            { name: "Sarah M.", rating: 5, text: "Absolutely love this service! They are reliable, thorough, and my yard has never looked better. Worth every penny.", date: "Mar 15, 2026" },
            { name: "Mike T.", rating: 5, text: "Great service. Always on time, yard is spotless. Highly recommend to any pet owner in Riverside.", date: "Mar 12, 2026" },
            { name: "Jennifer L.", rating: 4, text: "Been using them for 6 months now. Consistent quality and great communication.", date: "Mar 8, 2026" },
            { name: "David R.", rating: 5, text: "Professional and thorough. My dogs make a mess and these guys handle it perfectly every week.", date: "Mar 3, 2026" },
            { name: "Lisa K.", rating: 5, text: "Finally found a reliable scooping service! On time every week, yard looks great.", date: "Feb 28, 2026" },
          ].map((review, i) => (
            <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-gray-900">{review.name}</span>
                  <span className="text-amber-400 text-sm">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
