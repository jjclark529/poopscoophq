"use client";

import { useState } from "react";

const recentRequests = [
  { id: 1, name: "Lisa Park", phone: "(520) 555-0573", sent: "Mar 27, 2026", status: "waiting", statusLabel: "Sent — Waiting", followUps: "0/2 sent", followUpExtra: "", rating: null, canResend: true },
  { id: 2, name: "Mike Torres", phone: "(520) 555-0287", sent: "Mar 26, 2026", status: "reviewed", statusLabel: "Review Posted!", followUps: "0/2 sent", followUpExtra: "Complete", rating: 5, canResend: false },
  { id: 3, name: "Sarah Chen", phone: "(951) 555-0142", sent: "Mar 25, 2026", status: "clicked", statusLabel: "Link Clicked", followUps: "1/2 sent", followUpExtra: "Stopped", rating: null, canResend: true },
  { id: 4, name: "David Johnson", phone: "(951) 555-0391", sent: "Mar 24, 2026", status: "followup", statusLabel: "Follow-Up #1 Sent", followUps: "1/2 sent", followUpExtra: "", rating: null, canResend: false },
  { id: 5, name: "Amy Rodriguez", phone: "(951) 555-0456", sent: "Mar 23, 2026", status: "reviewed", statusLabel: "Review Posted!", followUps: "2/2 sent", followUpExtra: "Complete", rating: 4, canResend: false },
  { id: 6, name: "Tom Williams", phone: "(951) 555-0789", sent: "Mar 22, 2026", status: "expired", statusLabel: "Expired", followUps: "2/2 sent", followUpExtra: "", rating: null, canResend: true },
  { id: 7, name: "Rachel Kim", phone: "(951) 555-0234", sent: "Mar 21, 2026", status: "reviewed", statusLabel: "Review Posted!", followUps: "1/2 sent", followUpExtra: "Complete", rating: 5, canResend: false },
  { id: 8, name: "James Brown", phone: "(951) 555-0567", sent: "Mar 20, 2026", status: "waiting", statusLabel: "Sent — Waiting", followUps: "0/2 sent", followUpExtra: "", rating: null, canResend: true },
];

const templates = [
  { name: "Standard (After Job)", desc: "After completed job (Sweep&Go webhook) • 2 hours after completion", badges: [{ label: "Active", color: "green" }], active: true },
  { name: "Follow-up #1", desc: "After first request with no review & no link click • 5 days after initial", badges: [{ label: "Stops if clicked", color: "amber" }, { label: "Active", color: "green" }], active: true },
  { name: "Follow-up #2", desc: "After follow-up #1 with no review & no link click • 10 days after follow-up #1 (day 15)", badges: [{ label: "Stops if clicked", color: "amber" }, { label: "Active", color: "green" }], active: true },
  { name: "Milestone (10th Cleanup)", desc: "After 10th completed job • Immediate", badges: [{ label: "Inactive", color: "gray" }], active: false },
];

function StatusBadge({ status, label }: { status: string; label: string }) {
  const styles: Record<string, string> = {
    waiting: "bg-orange-50 text-orange-700",
    reviewed: "bg-emerald-50 text-emerald-700",
    clicked: "bg-blue-50 text-blue-700",
    followup: "bg-amber-50 text-amber-700",
    expired: "bg-gray-100 text-gray-500",
  };
  const dots: Record<string, string> = {
    waiting: "bg-orange-400",
    reviewed: "bg-emerald-500",
    clicked: "bg-blue-500",
    followup: "bg-amber-500",
    expired: "bg-gray-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-500"}`}>
      {status === "reviewed" ? (
        <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      ) : (
        <span className={`w-2 h-2 rounded-full ${dots[status] || "bg-gray-400"}`} />
      )}
      {label}
    </span>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${checked ? "bg-emerald-500" : "bg-gray-300"}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export default function ReviewRequestsPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [autoSend, setAutoSend] = useState(true);
  const [stopOnClick, setStopOnClick] = useState(true);
  const [reviewLink, setReviewLink] = useState("https://g.page/r/scoopHQ/review");
  const [delay, setDelay] = useState("2");
  const [followUp1Days, setFollowUp1Days] = useState(5);
  const [followUp2Days, setFollowUp2Days] = useState(10);

  const totalFollowUp2 = followUp1Days + followUp2Days;

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">☆ Review Requests</h1>
          <p className="text-gray-500 text-sm">Automatically request Google reviews after completed jobs</p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`inline-flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${showSettings ? "border-blue-300 bg-blue-50 text-blue-700" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </button>
      </div>

      {/* Top Stats — 5 cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {/* Avg Rating */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-emerald-400">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Avg Rating</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold text-emerald-600">4.9</span>
            <span className="text-lg">⭐</span>
          </div>
        </div>
        {/* Total Reviews */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-blue-400">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Reviews</p>
          <span className="text-2xl font-bold text-gray-900">101</span>
        </div>
        {/* Requests Sent */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-purple-400">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Requests Sent</p>
          <span className="text-2xl font-bold text-gray-900">87</span>
        </div>
        {/* Response Rate */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-amber-400">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Response Rate</p>
          <span className="text-2xl font-bold text-gray-900">42%</span>
        </div>
        {/* 5-Star This Month */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 border-l-4 border-l-emerald-500">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">5-Star This Month</p>
          <span className="text-2xl font-bold text-gray-900">5</span>
        </div>
      </div>

      {/* Auto-Send Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6 flex items-center justify-between">
        <div className="flex items-start gap-3">
          <span className="text-emerald-600 mt-0.5">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </span>
          <div>
            <p className="font-semibold text-emerald-800 text-sm">✅ Auto-Send Active</p>
            <p className="text-emerald-700 text-sm mt-0.5">Review requests are sent automatically 2 hours after each completed job via Sweep&Go. Follow-ups at 5 and 15 days (stop if link clicked).</p>
          </div>
        </div>
        <Toggle checked={autoSend} onChange={setAutoSend} />
      </div>

      {/* Settings Panel — conditionally rendered */}
      {showSettings && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Review Request Settings</h2>

          {/* Google Review Link */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Google Review Link</label>
            <input
              type="text"
              value={reviewLink}
              onChange={(e) => setReviewLink(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
            <p className="text-xs text-gray-400 mt-1">Get this from Google Business Profile → Share → Review link</p>
          </div>

          {/* Delay After Job Completion */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Delay After Job Completion</label>
            <select
              value={delay}
              onChange={(e) => setDelay(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="4">4 hours</option>
              <option value="8">8 hours</option>
              <option value="24">24 hours</option>
            </select>
          </div>

          {/* Follow-Up Scheduling */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <h3 className="text-sm font-semibold text-gray-900">Follow-Up Scheduling</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Follow-Up #1 — Days After Initial Send</label>
                <input
                  type="number"
                  value={followUp1Days}
                  onChange={(e) => setFollowUp1Days(Number(e.target.value))}
                  min={1}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">First reminder sent {followUp1Days} days after the original review request</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Follow-Up #2 — Days After Follow-Up #1</label>
                <input
                  type="number"
                  value={followUp2Days}
                  onChange={(e) => setFollowUp2Days(Number(e.target.value))}
                  min={1}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
                <p className="text-xs text-gray-400 mt-1">Second reminder sent {followUp2Days} days after follow-up #1 (day {totalFollowUp2} total)</p>
              </div>
            </div>
          </div>

          {/* Follow-Up Timeline Preview */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <h3 className="text-sm font-semibold text-gray-900">Follow-Up Timeline Preview</h3>
            </div>
            <div className="flex items-center justify-center gap-0 py-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-center">
                <p className="text-xs font-semibold text-purple-700">Day 0</p>
                <p className="text-xs text-purple-600">Initial Request</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-0.5 bg-purple-300" />
                <svg className="w-4 h-4 text-purple-400 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-center">
                <p className="text-xs font-semibold text-purple-700">Day {followUp1Days}</p>
                <p className="text-xs text-purple-600">Follow-Up #1</p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-0.5 bg-purple-300" />
                <svg className="w-4 h-4 text-purple-400 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 text-center">
                <p className="text-xs font-semibold text-purple-700">Day {totalFollowUp2}</p>
                <p className="text-xs text-purple-600">Follow-Up #2</p>
              </div>
            </div>
          </div>

          {/* Stop Follow-Ups When Review Link Is Clicked */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Stop Follow-Ups When Review Link Is Clicked</h3>
                <p className="text-xs text-gray-500 mt-0.5">If a customer clicks the Google review link, all remaining follow-up messages will be cancelled automatically.</p>
              </div>
              <Toggle checked={stopOnClick} onChange={setStopOnClick} />
            </div>
            {stopOnClick && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                <p className="text-xs text-blue-700">
                  <span className="font-medium">ℹ Active</span> — Follow-ups will automatically stop for any customer who clicks the review link. This prevents over-messaging customers who have already engaged.
                </p>
              </div>
            )}
          </div>

          {/* Save Settings */}
          <div className="flex justify-end">
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      )}

      {/* Message Templates */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">📋</span>
          <h2 className="text-lg font-semibold text-gray-900">Message Templates</h2>
        </div>
        <div className="space-y-3">
          {templates.map((t) => (
            <div key={t.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-3">
                <span className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${t.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {t.badges.map((b) => {
                  const badgeColors: Record<string, string> = {
                    green: "bg-emerald-50 text-emerald-700",
                    amber: "bg-amber-50 text-amber-700",
                    gray: "bg-gray-100 text-gray-500",
                  };
                  return (
                    <span key={b.label} className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColors[b.color] || "bg-gray-100 text-gray-500"}`}>
                      {b.label}
                    </span>
                  );
                })}
                <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Customer</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Sent</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Follow-Ups</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Rating</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-3">
                    <p className="font-medium text-gray-900">{req.name}</p>
                    <p className="text-xs text-gray-400">{req.phone}</p>
                  </td>
                  <td className="px-5 py-3 text-gray-600">{req.sent}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={req.status} label={req.statusLabel} />
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-gray-700">{req.followUps}</span>
                    {req.followUpExtra && (
                      <span className={`ml-1.5 text-xs font-medium ${req.followUpExtra === "Complete" ? "text-emerald-600" : req.followUpExtra === "Stopped" ? "text-red-500" : "text-gray-500"}`}>
                        {req.followUpExtra}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-900">
                    {req.rating ? "⭐".repeat(req.rating) : "—"}
                  </td>
                  <td className="px-5 py-3">
                    {req.canResend ? (
                      <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Resend</button>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
