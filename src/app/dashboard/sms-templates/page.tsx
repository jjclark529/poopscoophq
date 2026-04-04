"use client";

import { useState } from "react";
import Link from "next/link";

interface SmsTemplate {
  id: number;
  name: string;
  category: string;
  preview: string;
  variables: string[];
  usedCount: number;
}

const categories = ["All", "New Lead Response", "Follow Up", "Quotes", "Scheduling", "Reviews", "Reactivation", "Seasonal"];

const templates: SmsTemplate[] = [
  { id: 1, name: "Speed Lead Response", category: "New Lead Response", usedCount: 47, variables: ["name"], preview: "Hi {name}! 👋 Thanks for reaching out to Doctor Doo. I'd love to help you with pet waste removal. How many dogs do you have and what's your zip code? I'll get you a quick quote!" },
  { id: 2, name: "After-Hours Lead", category: "New Lead Response", usedCount: 12, variables: ["name"], preview: "Hi {name}! Thanks for contacting Doctor Doo. We're currently closed but I'll get back to you first thing tomorrow morning! In the meantime, check out our services at poopscoophq.com 🐕" },
  { id: 3, name: "Google Ads Lead", category: "New Lead Response", usedCount: 31, variables: ["name", "area"], preview: "Hey {name}! Saw you're interested in pet waste removal. We service the {area} area and can usually start within a few days. Want me to put together a quick quote? Just need to know # of dogs and yard size!" },
  { id: 4, name: "Referral Welcome", category: "New Lead Response", usedCount: 8, variables: ["name", "referrer"], preview: "Hi {name}! {referrer} mentioned you might need help keeping your yard clean. We'd love to take care of that for you! As a referred customer, your first cleanup is on us. 🎉" },
  { id: 5, name: "Gentle Follow Up (Day 2)", category: "Follow Up", usedCount: 38, variables: ["name"], preview: "Hey {name}! Just checking in — did you have any questions about our pet waste removal service? Happy to help! 🐾" },
  { id: 6, name: "Value Add Follow Up", category: "Follow Up", usedCount: 22, variables: ["name", "date"], preview: "Hi {name}! Quick reminder — we're currently running a special: first cleanup free with any weekly plan. Want me to get you set up? This offer ends {date}. 🍦" },
  { id: 7, name: "Last Chance Follow Up", category: "Follow Up", usedCount: 15, variables: ["name"], preview: "Hey {name}, I wanted to reach out one more time. We'd love to help keep your yard clean. If you're not interested right now, totally understand! Just know we're here whenever you need us. 👍" },
  { id: 8, name: "No Response Breakup", category: "Follow Up", usedCount: 9, variables: ["name"], preview: "Hi {name} — I've reached out a few times and want to respect your time. I'll stop texting, but if you ever need pet waste removal, we're just a text away! Have a great day. 🙏" },
  { id: 9, name: "Send Quote", category: "Quotes", usedCount: 42, variables: ["name", "service", "price", "frequency", "area", "dogs"], preview: "Hey {name}! Here's your quote:\n\n🐕 {service} — ${price}/{frequency}\n📍 {area}\n🐾 {dogs} dog(s)\n\nFirst cleanup is FREE! Want to get started? Just reply YES and I'll schedule you. 🎉" },
  { id: 10, name: "Quote Follow Up", category: "Quotes", usedCount: 25, variables: ["name"], preview: "Hey {name}! Just wanted to check if you had any questions about the quote I sent. Happy to adjust the plan or schedule a call if that's easier! 📞" },
  { id: 11, name: "Quote Accepted", category: "Quotes", usedCount: 33, variables: ["name", "date", "time"], preview: "🎉 Awesome, {name}! You're all set. Your first cleanup is scheduled for {date}. Our team will arrive between {time}. No need to be home — just make sure the gate is accessible. See you then!" },
  { id: 12, name: "Appointment Reminder", category: "Scheduling", usedCount: 56, variables: ["name", "date", "time"], preview: "Hi {name}! Friendly reminder — your yard cleanup is scheduled for tomorrow ({date}). Our crew will arrive between {time}. Any special instructions? 🐕" },
  { id: 13, name: "On The Way", category: "Scheduling", usedCount: 44, variables: ["name", "eta"], preview: "Hey {name}! Our team is heading your way — we'll be there in about {eta} minutes. 🚗💨" },
  { id: 14, name: "Job Complete", category: "Scheduling", usedCount: 51, variables: ["name"], preview: "All done, {name}! Your yard is looking great. 🐕✨ Have a wonderful day! If you ever need anything, just text us here." },
  { id: 15, name: "Review Request", category: "Reviews", usedCount: 87, variables: ["name", "review_link"], preview: "Hi {name}! 🐕 Thanks for choosing Doctor Doo. Would you mind leaving us a quick Google review? It helps other pet owners find us!\n\n⭐ {review_link}\n\nThank you so much!" },
  { id: 16, name: "Review Thank You", category: "Reviews", usedCount: 19, variables: ["name"], preview: "Hey {name}! We just saw your review — THANK YOU so much! 🙏 It really means the world to our small team. We're lucky to have customers like you! 🍦" },
  { id: 17, name: "Win Back", category: "Reactivation", usedCount: 11, variables: ["name"], preview: "Hey {name}! We miss you at Doctor Doo! 🐕 We've added some new services and would love to have you back. How about 50% off your first month? Reply DEAL to claim!" },
  { id: 18, name: "Season Restart", category: "Reactivation", usedCount: 14, variables: ["name"], preview: "Hi {name}! Spring is here and so are we! 🌸 Ready to get your yard back in shape? Your old plan is still available — just say the word and we'll get you scheduled this week." },
  { id: 19, name: "Spring Cleanup", category: "Seasonal", usedCount: 18, variables: ["name"], preview: "🌸 Spring is here, {name}! Time to get your yard fresh and clean. Book a Spring Deep Clean + weekly service and get the deep clean FREE. Limited spots — reply to claim yours!" },
  { id: 20, name: "Summer Heat Warning", category: "Seasonal", usedCount: 7, variables: ["name"], preview: "☀️ Hey {name}! Summer heat means pet waste breaks down faster and smells worse. Don't let it bake! Our weekly service keeps your yard fresh all summer. Want to start?" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "New Lead Response": "bg-blue-100 text-blue-700",
  "Follow Up": "bg-amber-100 text-amber-700",
  "Quotes": "bg-emerald-100 text-emerald-700",
  "Scheduling": "bg-purple-100 text-purple-700",
  "Reviews": "bg-yellow-100 text-yellow-700",
  "Reactivation": "bg-pink-100 text-pink-700",
  "Seasonal": "bg-teal-100 text-teal-700",
};

export default function SmsTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<SmsTemplate | null>(null);
  const smsConfigured = false; // Will be true when an SMS provider is connected

  const filtered = selectedCategory === "All" ? templates : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="p-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            SMS Templates
          </h1>
          <p className="text-gray-500 text-sm mt-1">Pre-written text messages for every customer interaction</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
          + New Template
        </button>
      </div>

      {/* SMS Provider Warning */}
      {!smsConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-amber-800">
            No SMS provider configured.{" "}
            <Link href="/dashboard/settings/connections" className="font-semibold text-blue-600 underline hover:text-blue-700">
              Set one up in Connections →
            </Link>
          </span>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat} {cat !== "All" && `(${templates.filter((t) => t.category === cat).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-2 space-y-3">
          {filtered.map((template) => (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${
                selectedTemplate?.id === template.id
                  ? "border-blue-300 ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{template.name}</h3>
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${CATEGORY_COLORS[template.category] || "bg-gray-100 text-gray-600"}`}>
                    {template.category}
                  </span>
                </div>
                <span className="text-xs text-gray-400">Used {template.usedCount}x</span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-line line-clamp-2">{template.preview}</p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-[10px] text-gray-400">Variables:</span>
                {template.variables.map((v) => (
                  <span key={v} className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono">
                    {`{${v}}`}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Sidebar: Template Preview + Variables + Actions */}
        <div className="space-y-4">
          {/* Template Preview */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Template Preview</h3>
            {selectedTemplate ? (
              <>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 whitespace-pre-line">{selectedTemplate.preview}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">Character count</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedTemplate.preview.length} characters</p>
                  {selectedTemplate.preview.length > 160 && (
                    <p className="text-xs text-amber-600 mt-0.5">⚠ Over 160 chars — may be sent as 2 messages</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    disabled={!smsConfigured}
                    className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors ${
                      smsConfigured
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {smsConfigured ? "📱 Use in Follow-Up" : "📱 Connect SMS to Use"}
                  </button>
                  <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    ✏️ Edit Template
                  </button>
                  <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    📋 Duplicate
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">Select a template to preview</p>
            )}
          </div>

          {/* Placeholder Variables */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Placeholder Variables</h3>
            <div className="space-y-2 text-xs">
              {[
                { var: "{name}", desc: "Customer's first name" },
                { var: "{area}", desc: "Service area or zip code" },
                { var: "{referrer}", desc: "Name of referring customer" },
                { var: "{date}", desc: "Appointment or offer date" },
                { var: "{time}", desc: "Appointment time window" },
                { var: "{eta}", desc: "Estimated arrival in minutes" },
                { var: "{service}", desc: "Service type (e.g. Weekly Cleanup)" },
                { var: "{price}", desc: "Quoted price amount" },
                { var: "{frequency}", desc: "Service frequency" },
                { var: "{dogs}", desc: "Number of dogs" },
                { var: "{review_link}", desc: "Google review URL" },
              ].map((v) => (
                <div key={v.var} className="flex items-center gap-2">
                  <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded font-mono text-[10px]">{v.var}</code>
                  <span className="text-gray-500">{v.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
