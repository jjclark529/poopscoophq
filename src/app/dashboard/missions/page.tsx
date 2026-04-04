"use client";

import { useState } from "react";

const xpStats = {
  level: 7,
  title: "Turf Titan",
  currentXP: 2750,
  nextLevelXP: 3500,
  totalXP: 12750,
};

interface Mission {
  id: number;
  title: string;
  description: string;
  xp: number;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Available" | "In Progress" | "Completed";
  progress?: number;
}

const missions: Mission[] = [
  {
    id: 1,
    title: "Speed Demon",
    description: "Respond to 5 leads within 1 hour of receiving them",
    xp: 200,
    category: "Lead Response",
    difficulty: "Medium",
    status: "In Progress",
    progress: 60,
  },
  {
    id: 2,
    title: "Review Collector",
    description: "Get 3 new Google reviews this week",
    xp: 150,
    category: "Reputation",
    difficulty: "Easy",
    status: "In Progress",
    progress: 33,
  },
  {
    id: 3,
    title: "Territory Expander",
    description: "Sign up 2 new clients in an underserved zone",
    xp: 300,
    category: "Growth",
    difficulty: "Hard",
    status: "Available",
  },
  {
    id: 4,
    title: "Social Butterfly",
    description: "Schedule 5 social media posts this week",
    xp: 100,
    category: "Marketing",
    difficulty: "Easy",
    status: "Available",
  },
  {
    id: 5,
    title: "Upsell Master",
    description: "Convert 3 single-service clients to weekly plans",
    xp: 250,
    category: "Revenue",
    difficulty: "Hard",
    status: "Available",
  },
  {
    id: 6,
    title: "First Impression",
    description: "Send a welcome SMS to every new lead within 30 minutes",
    xp: 150,
    category: "Lead Response",
    difficulty: "Medium",
    status: "Completed",
  },
  {
    id: 7,
    title: "Consistency King",
    description: "Log into PoopScoop HQ 5 days in a row",
    xp: 75,
    category: "Engagement",
    difficulty: "Easy",
    status: "Completed",
  },
  {
    id: 8,
    title: "Route Master",
    description: "Optimize your routes and save 30+ minutes this week",
    xp: 200,
    category: "Operations",
    difficulty: "Medium",
    status: "Completed",
  },
];

const coachingTips = [
  {
    title: "Respond Faster, Win More",
    tip: "Leads contacted within 5 minutes are 9x more likely to convert. Enable auto-response to acknowledge leads instantly.",
    action: "Set up auto-response →",
  },
  {
    title: "Leverage Your Reviews",
    tip: "You have 4.8 stars on Google — great! Share your best reviews on social media to build trust with prospects.",
    action: "Create a review post →",
  },
  {
    title: "Underserved Zones = Gold",
    tip: "Jurupa Valley and Canyon Crest have high demand but low coverage. A targeted door hanger campaign could land 3-5 new clients.",
    action: "Launch a campaign →",
  },
  {
    title: "Quote Follow-Up",
    tip: "42% of your quotes never get a follow-up. Set a 48-hour reminder to check in on pending quotes.",
    action: "View pending quotes →",
  },
];

const difficultyColors: Record<string, string> = {
  Easy: "bg-emerald-100 text-emerald-700",
  Medium: "bg-amber-100 text-amber-700",
  Hard: "bg-red-100 text-red-700",
};

export default function MissionsCoachingPage() {
  const [filter, setFilter] = useState<"All" | "Available" | "In Progress" | "Completed">("All");
  const progressPct = Math.round(
    (xpStats.currentXP / xpStats.nextLevelXP) * 100
  );

  const filtered =
    filter === "All"
      ? missions
      : missions.filter((m) => m.status === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Missions &amp; Coaching
        </h1>
        <p className="text-gray-500 mt-1">
          Complete missions to earn XP, level up, and grow your business with AI coaching
        </p>
      </div>

      {/* XP Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow">
              {xpStats.level}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Level {xpStats.level} — {xpStats.title}
              </p>
              <p className="text-xs text-gray-400">
                {xpStats.totalXP.toLocaleString()} total XP earned
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700">
              {xpStats.currentXP.toLocaleString()} / {xpStats.nextLevelXP.toLocaleString()} XP
            </p>
            <p className="text-xs text-gray-400">to Level {xpStats.level + 1}</p>
          </div>
        </div>
        <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-full rounded-full transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Missions List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Active Missions</h2>
            <div className="flex gap-1">
              {(["All", "Available", "In Progress", "Completed"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    filter === f
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((mission) => (
              <div
                key={mission.id}
                className={`bg-white rounded-xl border p-4 ${
                  mission.status === "Completed"
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {mission.status === "Completed" && "✅ "}
                        {mission.title}
                      </h3>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColors[mission.difficulty]}`}>
                        {mission.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {mission.description}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <span className="text-sm font-bold text-emerald-600">
                      +{mission.xp} XP
                    </span>
                    <p className="text-[10px] text-gray-400">{mission.category}</p>
                  </div>
                </div>
                {mission.status === "In Progress" && mission.progress !== undefined && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-medium text-gray-600">
                        {mission.progress}%
                      </span>
                    </div>
                    <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${mission.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {mission.status === "Available" && (
                  <button className="mt-2 text-xs px-4 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    Start Mission
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Coaching Tips */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900">
            🧑‍✈️ Captain Scoop&apos;s Coaching
          </h2>
          {coachingTips.map((tip, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4"
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                {tip.title}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-2">
                {tip.tip}
              </p>
              <button className="text-xs text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                {tip.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
