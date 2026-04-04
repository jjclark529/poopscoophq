"use client";

import { useState } from "react";

interface SmsTemplate {
  id: number;
  name: string;
  category: string;
  preview: string;
  lastUsed: string;
  status: "Active" | "Draft";
}

const categories = [
  "All",
  "Review Request",
  "Appointment Reminder",
  "Follow-Up",
  "Promotion",
  "Welcome",
  "Win-Back",
];

const templates: SmsTemplate[] = [
  {
    id: 1,
    name: "Post-Service Review",
    category: "Review Request",
    preview:
      "Hi {client_name}! Thanks for choosing {company_name}. We'd love your feedback! Leave a review here: {review_link}",
    lastUsed: "2024-03-28",
    status: "Active",
  },
  {
    id: 2,
    name: "Appointment Tomorrow",
    category: "Appointment Reminder",
    preview:
      "Hi {client_name}, just a reminder that your {company_name} service is scheduled for {service_date}. See you then! 🐾",
    lastUsed: "2024-03-30",
    status: "Active",
  },
  {
    id: 3,
    name: "Follow-Up Check-In",
    category: "Follow-Up",
    preview:
      "Hi {client_name}! It's been a week since your last service. How's the yard looking? Ready to schedule again?",
    lastUsed: "2024-03-25",
    status: "Active",
  },
  {
    id: 4,
    name: "Spring Special",
    category: "Promotion",
    preview:
      "🌷 Spring Clean-Up Special! {client_name}, get 20% off your first month with {company_name}. Book today!",
    lastUsed: "2024-03-15",
    status: "Active",
  },
  {
    id: 5,
    name: "New Client Welcome",
    category: "Welcome",
    preview:
      "Welcome to {company_name}, {client_name}! 🎉 We're excited to serve you. Your first service is on {service_date}.",
    lastUsed: "2024-03-29",
    status: "Active",
  },
  {
    id: 6,
    name: "We Miss You",
    category: "Win-Back",
    preview:
      "Hey {client_name}! We miss you at {company_name}. Come back and get 15% off your next service. Book now!",
    lastUsed: "2024-02-20",
    status: "Active",
  },
  {
    id: 7,
    name: "5-Star Nudge",
    category: "Review Request",
    preview:
      "Hey {client_name}! If you loved our service, a 5-star review would mean the world! {review_link} Thank you! ⭐",
    lastUsed: "2024-03-22",
    status: "Draft",
  },
  {
    id: 8,
    name: "Referral Bonus",
    category: "Promotion",
    preview:
      "Know someone who needs yard cleanup? Refer a friend to {company_name} and you both get $10 off! 🐕",
    lastUsed: "",
    status: "Draft",
  },
];

const placeholders = [
  { variable: "{client_name}", description: "Customer's first name" },
  { variable: "{service_date}", description: "Next scheduled service date" },
  { variable: "{company_name}", description: "Your business name" },
  { variable: "{review_link}", description: "Google review link" },
];

export default function SmsTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState<SmsTemplate | null>(
    templates[0]
  );

  const filtered =
    selectedCategory === "All"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMS Templates</h1>
          <p className="text-gray-500 mt-1">
            Create and manage SMS templates for automated client communication
          </p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-sm">
          + Create Template
        </button>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-emerald-100 text-emerald-700 border border-emerald-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Last Used
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelectedTemplate(t)}
                    className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedTemplate?.id === t.id ? "bg-emerald-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-400 truncate max-w-xs">
                        {t.preview.slice(0, 60)}…
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {t.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {t.lastUsed || "Never"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          t.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Template Editor / Preview */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Template Preview
            </h3>
            {selectedTemplate ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 font-medium">
                    Name
                  </label>
                  <p className="text-sm text-gray-900 font-medium">
                    {selectedTemplate.name}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium">
                    Category
                  </label>
                  <p className="text-sm text-gray-600">
                    {selectedTemplate.category}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-medium">
                    Message
                  </label>
                  <div className="mt-1 bg-gray-50 rounded-lg p-3 text-sm text-gray-700 leading-relaxed">
                    {selectedTemplate.preview}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 px-3 py-2 bg-emerald-600 text-white rounded-lg text-xs font-medium hover:bg-emerald-700 transition-colors">
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-colors">
                    Duplicate
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                Select a template to preview
              </p>
            )}
          </div>

          {/* Placeholder Variables */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Placeholder Variables
            </h3>
            <div className="space-y-2">
              {placeholders.map((p) => (
                <div
                  key={p.variable}
                  className="flex items-center justify-between"
                >
                  <code className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded font-mono">
                    {p.variable}
                  </code>
                  <span className="text-xs text-gray-500">
                    {p.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
