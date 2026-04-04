"use client";

import { useState } from "react";

const scheduledPosts = [
  { id: 1, platform: "Facebook", content: "🐕 Spring is here! Time to freshen up your yard. Book your spring cleanup today — first visit 20% off! #RiversideCA #PetWasteRemoval", date: "Apr 5, 2025", time: "10:00 AM", status: "scheduled" },
  { id: 2, platform: "Instagram", content: "Before ➡️ After 🧹 Another happy customer in Canyon Crest! We handle the mess so you can enjoy your yard. 🌿 #DoctorDoo #CleanYard", date: "Apr 7, 2025", time: "2:00 PM", status: "scheduled" },
  { id: 3, platform: "Facebook", content: "Did you know? The average dog produces 274 lbs of waste per year! 🐾 Don't let it pile up. We've got you covered. Weekly plans start at just $15!", date: "Apr 10, 2025", time: "11:00 AM", status: "draft" },
  { id: 4, platform: "Instagram", content: "Meet the Doctor Doo team! 👋 We're your local, reliable pet waste removal experts serving Riverside since 2020. 💚", date: "Apr 12, 2025", time: "3:00 PM", status: "draft" },
  { id: 5, platform: "Facebook", content: "⭐⭐⭐⭐⭐ 'Best service in Riverside!' — Thanks Mike T. for the awesome review! We appreciate our amazing customers. 🙏", date: "Mar 28, 2025", time: "9:00 AM", status: "published" },
];

export default function PostSchedulerPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? scheduledPosts : scheduledPosts.filter((p) => p.status === filter);

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Post Scheduler</h1>
          <p className="text-gray-500 text-sm">Plan and schedule your social media posts across platforms.</p>
        </div>
        <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm">
          + New Post
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {["all", "scheduled", "draft", "published"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "text-gray-500 hover:bg-gray-100"}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  post.platform === "Facebook" ? "bg-blue-50 text-blue-700" : "bg-pink-50 text-pink-700"
                }`}>
                  {post.platform}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                  post.status === "scheduled" ? "bg-emerald-50 text-emerald-700" :
                  post.status === "draft" ? "bg-amber-50 text-amber-700" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {post.status}
                </span>
              </div>
              <span className="text-xs text-gray-400">{post.date} at {post.time}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
            <div className="flex items-center gap-2 mt-3">
              <button className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded border border-gray-200 hover:bg-gray-50">Edit</button>
              {post.status === "draft" && (
                <button className="text-xs text-emerald-600 hover:text-emerald-700 px-3 py-1 rounded border border-emerald-200 hover:bg-emerald-50">Schedule</button>
              )}
              <button className="text-xs text-red-500 hover:text-red-700 px-3 py-1 rounded border border-red-200 hover:bg-red-50">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
