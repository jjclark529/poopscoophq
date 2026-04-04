"use client";

import { useState } from "react";

/* ──────────────────────────── data ──────────────────────────── */

const statsRow1 = [
  { label: "Total Monthly Revenue", icon: "💵", value: "$12,800", change: "+11.3%", up: true },
  { label: "Ad Spend (Total)", icon: "📢", value: "$2,103", change: "+7.8%", up: false },
  { label: "Net Profit", icon: "📈", value: "$10,697", change: "+12.0%", up: true },
  { label: "Overall ROI", icon: "🎯", value: "508%", change: "+15pts", up: true },
];

const statsRow2 = [
  { label: "Customer LTV", icon: "👤", value: "$1,840", change: "+$120", up: true },
  { label: "Payback Period", icon: "⏱️", value: "1.2 mo", change: "-0.3 mo", up: true },
  { label: "Cost Per Acquisition", icon: "🏷️", value: "$47.15", change: "+$5.15", up: false },
  { label: "Active Customers", icon: "👥", value: "428", change: "+17", up: true },
];

const revenueData = [7000, 7500, 8200, 9800, 11200, 12800];
const adSpendData = [1200, 1400, 1500, 1700, 1900, 2103];
const netProfitData = [5800, 6100, 6700, 8100, 9300, 10697];
const chartMonths = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const chartMax = 14000;

const funnelStages = [
  { label: "Impressions", value: "142,847", rate: null },
  { label: "Clicks", value: "3,421", rate: "2.4% conv." },
  { label: "Leads", value: "19", rate: "0.47% conv." },
  { label: "Quotes Sent", value: "12", rate: "63.2% conv." },
  { label: "Customers Won", value: "11", rate: "91.7% conv." },
];

const platformData = [
  { platform: "Sweep&Go", active: 234, newM: 6, churned: -2, revenue: "$5,800", net: 4 },
  { platform: "HubSpot", active: 89, newM: 4, churned: -1, revenue: "$3,200", net: 3 },
  { platform: "Jobber", active: 67, newM: 3, churned: 0, revenue: "$2,400", net: 3 },
  { platform: "Pipeline", active: 23, newM: 1, churned: 0, revenue: "$900", net: 1 },
  { platform: "GoHighLevel", active: 12, newM: 0, churned: -1, revenue: "$500", net: -1 },
];

const platformTotal = { platform: "Total", active: 425, newM: 14, churned: -4, revenue: "$12,800", net: 10 };

const yoy2025Monthly = [6000, 6200, 6500, 6800, 7000, 7200, 7400, 7600, 7800, 7500, 7200, 7700];
const yoy2026Monthly = [11000, 12000, 14000];
const yoyMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const yoyTable = [
  { metric: "Total Revenue", v2025: "$89,900", v2026: "$35,220", change: "-60.8%", good: false },
  { metric: "Total Ad Spend", v2025: "$14,150", v2026: "$5,853", change: "-58.6%", good: true },
  { metric: "Net Profit", v2025: "$75,750", v2026: "$29,367", change: "-61.2%", good: false },
  { metric: "New Customers", v2025: "197", v2026: "43", change: "-78.2%", good: false },
  { metric: "Avg Cost Per Lead", v2025: "$71.83", v2026: "$43.98", change: "-38.8%", good: true },
  { metric: "Ending Customers", v2025: "385", v2026: "428", change: "+11.2%", good: true },
  { metric: "ROI", v2025: "535%", v2026: "502%", change: "-6.3%", good: false },
];

const newCust2026 = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 14 },
  { month: "Mar", value: 17 },
];

const platformTabs = ["All", "Sweep&Go", "HubSpot", "Jobber", "Pipeline", "GoHighLevel"];

/* ──────────────────────────── component ──────────────────────────── */

export default function RevenuePage() {
  const [timeRange, setTimeRange] = useState("6M");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [yoyYears, setYoyYears] = useState<string[]>(["2025", "2026"]);
  const [custYear, setCustYear] = useState("2026");

  const toggleYoyYear = (y: string) => {
    setYoyYears((prev) =>
      prev.includes(y) ? prev.filter((x) => x !== y) : [...prev, y]
    );
  };

  const filteredPlatforms =
    platformFilter === "All"
      ? platformData
      : platformData.filter((p) => p.platform === platformFilter);

  /* ─── SVG helpers for Revenue vs Ad Spend ─── */
  const svgW = 600;
  const svgH = 220;
  const padL = 50;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const toX = (i: number) => padL + (i / (revenueData.length - 1)) * plotW;
  const toY = (v: number) => padT + plotH - (v / chartMax) * plotH;

  const makeAreaPath = (data: number[], baseline: number[]) => {
    let d = `M${toX(0)},${toY(data[0])}`;
    data.forEach((v, i) => {
      if (i > 0) d += ` L${toX(i)},${toY(v)}`;
    });
    for (let i = baseline.length - 1; i >= 0; i--) {
      d += ` L${toX(i)},${toY(baseline[i])}`;
    }
    d += " Z";
    return d;
  };

  const makeLinePath = (data: number[]) => {
    let d = `M${toX(0)},${toY(data[0])}`;
    data.forEach((v, i) => {
      if (i > 0) d += ` L${toX(i)},${toY(v)}`;
    });
    return d;
  };

  const zeroBaseline = revenueData.map(() => 0);

  /* ─── YoY chart helpers ─── */
  const yoySvgW = 600;
  const yoySvgH = 200;
  const yoyPadL = 50;
  const yoyPadR = 10;
  const yoyPadT = 10;
  const yoyPadB = 30;
  const yoyPlotW = yoySvgW - yoyPadL - yoyPadR;
  const yoyPlotH = yoySvgH - yoyPadT - yoyPadB;
  const yoyMax = 14000;

  const yoyToX = (i: number) => yoyPadL + (i / 11) * yoyPlotW;
  const yoyToY = (v: number) => yoyPadT + yoyPlotH - (v / yoyMax) * yoyPlotH;

  const yoyLine2025 = yoy2025Monthly
    .map((v, i) => `${i === 0 ? "M" : "L"}${yoyToX(i)},${yoyToY(v)}`)
    .join(" ");
  const yoyLine2026 = yoy2026Monthly
    .map((v, i) => `${i === 0 ? "M" : "L"}${yoyToX(i)},${yoyToY(v)}`)
    .join(" ");

  return (
    <div className="space-y-6">
      {/* ──────── Header ──────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">💲 Revenue &amp; ROI</h1>
          <p className="text-gray-500 mt-1">
            Unified view of revenue, conversions, and ROI from all CRM integrations
          </p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {["3M", "6M", "1Y", "All"].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                timeRange === r
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* ──────── Stats Row 1 ──────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow1.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">{s.label}</p>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <span className={`text-sm font-medium ${s.up ? "text-emerald-600" : "text-red-500"}`}>
              {s.up ? "↑" : "↓"} {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* ──────── Stats Row 2 ──────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsRow2.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-500">{s.label}</p>
              <span className="text-lg">{s.icon}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <span className={`text-sm font-medium ${s.up ? "text-emerald-600" : "text-red-500"}`}>
              {s.up ? "↑" : "↓"} {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* ──────── Revenue vs Ad Spend Chart ──────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue vs Ad Spend</h2>
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ minWidth: 400 }}>
            {/* Y-axis grid lines & labels */}
            {[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000].map((v) => (
              <g key={v}>
                <line
                  x1={padL}
                  y1={toY(v)}
                  x2={svgW - padR}
                  y2={toY(v)}
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                />
                <text x={padL - 5} y={toY(v) + 4} textAnchor="end" fontSize={10} fill="#6b7280">
                  {v === 0 ? "$0" : `$${(v / 1000).toFixed(0)}k`}
                </text>
              </g>
            ))}

            {/* Revenue area (emerald) */}
            <path d={makeAreaPath(revenueData, zeroBaseline)} fill="#10b98133" />
            <path d={makeLinePath(revenueData)} fill="none" stroke="#10b981" strokeWidth={2} />

            {/* Ad Spend area (red) */}
            <path d={makeAreaPath(adSpendData, zeroBaseline)} fill="#ef444433" />
            <path d={makeLinePath(adSpendData)} fill="none" stroke="#ef4444" strokeWidth={2} />

            {/* Net Profit line (green dashed) */}
            <path
              d={makeLinePath(netProfitData)}
              fill="none"
              stroke="#22c55e"
              strokeWidth={2}
              strokeDasharray="6,3"
            />

            {/* Data points */}
            {revenueData.map((v, i) => (
              <circle key={`r${i}`} cx={toX(i)} cy={toY(v)} r={3} fill="#10b981" />
            ))}
            {adSpendData.map((v, i) => (
              <circle key={`a${i}`} cx={toX(i)} cy={toY(v)} r={3} fill="#ef4444" />
            ))}
            {netProfitData.map((v, i) => (
              <circle key={`n${i}`} cx={toX(i)} cy={toY(v)} r={3} fill="#22c55e" />
            ))}

            {/* X-axis labels */}
            {chartMonths.map((m, i) => (
              <text
                key={m}
                x={toX(i)}
                y={svgH - 5}
                textAnchor="middle"
                fontSize={11}
                fill="#6b7280"
              >
                {m}
              </text>
            ))}
          </svg>
        </div>
        {/* Legend */}
        <div className="flex gap-6 mt-3 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Revenue
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" /> Ad Spend
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block" /> Net Profit
          </span>
        </div>
      </div>

      {/* ──────── Conversion Funnel ──────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Funnel</h2>
        <div className="space-y-3">
          {funnelStages.map((stage, i) => {
            const widths = [100, 60, 20, 14, 12];
            return (
              <div key={stage.label} className="flex items-center gap-4">
                <div className="w-32 text-sm text-gray-600 text-right font-medium shrink-0">
                  {stage.label}
                </div>
                <div className="flex-1 flex items-center">
                  <div
                    className="bg-blue-500 rounded-md h-10 flex items-center justify-center transition-all"
                    style={{ width: `${widths[i]}%`, minWidth: 80 }}
                  >
                    <span className="text-white font-bold text-sm">{stage.value}</span>
                  </div>
                </div>
                <div className="w-24 text-xs text-gray-500 shrink-0">
                  {stage.rate || ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ──────── Customer Metrics by Platform ──────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Customer Metrics by Platform</h2>
          <div className="flex gap-1 flex-wrap bg-gray-100 rounded-lg p-1">
            {platformTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setPlatformFilter(tab)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  platformFilter === tab
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-3 font-semibold text-gray-500">Platform</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">Active Customers</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">New This Month</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">Churned</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">Monthly Revenue</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">Net Growth</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlatforms.map((p) => (
                <tr key={p.platform} className="border-b border-gray-50">
                  <td className="py-3 text-gray-900 font-medium">{p.platform}</td>
                  <td className="py-3 text-gray-900 text-right">{p.active}</td>
                  <td className={`py-3 text-right font-medium ${p.newM > 0 ? "text-emerald-600" : "text-gray-500"}`}>
                    +{p.newM}
                  </td>
                  <td className={`py-3 text-right font-medium ${p.churned < 0 ? "text-red-500" : "text-gray-500"}`}>
                    {p.churned}
                  </td>
                  <td className="py-3 text-gray-900 font-semibold text-right">{p.revenue}</td>
                  <td className={`py-3 text-right font-medium ${p.net > 0 ? "text-emerald-600" : p.net < 0 ? "text-red-500" : "text-gray-500"}`}>
                    {p.net > 0 ? `+${p.net}` : p.net}
                  </td>
                </tr>
              ))}
              {platformFilter === "All" && (
                <tr className="border-t-2 border-gray-200 font-bold">
                  <td className="py-3 text-gray-900">{platformTotal.platform}</td>
                  <td className="py-3 text-gray-900 text-right">{platformTotal.active}</td>
                  <td className="py-3 text-emerald-600 text-right">+{platformTotal.newM}</td>
                  <td className="py-3 text-red-500 text-right">{platformTotal.churned}</td>
                  <td className="py-3 text-gray-900 text-right">{platformTotal.revenue}</td>
                  <td className="py-3 text-emerald-600 text-right">+{platformTotal.net}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ──────── Year-over-Year Comparison ──────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">📅 Year-over-Year Comparison</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {["2024", "2025", "2026"].map((y) => (
              <button
                key={y}
                onClick={() => toggleYoyYear(y)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  yoyYears.includes(y)
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {/* YoY Line Chart */}
        <p className="text-sm text-gray-500 mb-2">Monthly Revenue by Year</p>
        <div className="w-full overflow-x-auto">
          <svg viewBox={`0 0 ${yoySvgW} ${yoySvgH}`} className="w-full" style={{ minWidth: 400 }}>
            {/* Y grid */}
            {[0, 2000, 4000, 6000, 8000, 10000, 12000, 14000].map((v) => (
              <g key={v}>
                <line
                  x1={yoyPadL}
                  y1={yoyToY(v)}
                  x2={yoySvgW - yoyPadR}
                  y2={yoyToY(v)}
                  stroke="#e5e7eb"
                  strokeWidth={0.5}
                />
                <text x={yoyPadL - 5} y={yoyToY(v) + 4} textAnchor="end" fontSize={10} fill="#6b7280">
                  {v === 0 ? "$0k" : `$${(v / 1000).toFixed(0)}k`}
                </text>
              </g>
            ))}

            {/* 2025 line (dashed blue) */}
            {yoyYears.includes("2025") && (
              <path
                d={yoyLine2025}
                fill="none"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="6,4"
              />
            )}
            {yoyYears.includes("2025") &&
              yoy2025Monthly.map((v, i) => (
                <circle key={`y25-${i}`} cx={yoyToX(i)} cy={yoyToY(v)} r={2.5} fill="#3b82f6" />
              ))}

            {/* 2026 line (solid green) */}
            {yoyYears.includes("2026") && (
              <path d={yoyLine2026} fill="none" stroke="#22c55e" strokeWidth={2.5} />
            )}
            {yoyYears.includes("2026") &&
              yoy2026Monthly.map((v, i) => (
                <circle key={`y26-${i}`} cx={yoyToX(i)} cy={yoyToY(v)} r={3} fill="#22c55e" />
              ))}

            {/* X-axis labels */}
            {yoyMonths.map((m, i) => (
              <text
                key={m}
                x={yoyToX(i)}
                y={yoySvgH - 5}
                textAnchor="middle"
                fontSize={10}
                fill="#6b7280"
              >
                {m}
              </text>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-2 mb-6 text-sm">
          <span className="flex items-center gap-1.5">
            <span className="w-6 border-t-2 border-dashed border-blue-500 inline-block" /> 2025
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-6 border-t-2 border-green-500 inline-block" /> 2026
          </span>
        </div>

        {/* YoY Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="pb-3 font-semibold text-gray-500">Metric</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">2025</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">2026 (YTD)</th>
                <th className="pb-3 font-semibold text-gray-500 text-right">YoY Change</th>
              </tr>
            </thead>
            <tbody>
              {yoyTable.map((row) => (
                <tr key={row.metric} className="border-b border-gray-50">
                  <td className="py-3 text-gray-900 font-medium">{row.metric}</td>
                  <td className="py-3 text-gray-600 text-right">{row.v2025}</td>
                  <td className="py-3 text-gray-900 font-semibold text-right">{row.v2026}</td>
                  <td className={`py-3 text-right font-medium ${row.good ? "text-emerald-600" : "text-red-500"}`}>
                    {row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ──────── New Customers per Month ──────── */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">New Customers per Month</h2>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {["2024", "2025", "2026"].map((y) => (
              <button
                key={y}
                onClick={() => setCustYear(y)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  custYear === y
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-6 h-48">
          {newCust2026.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-sm font-bold text-gray-700 mb-1">{d.value}</span>
              <div
                className="w-full max-w-[80px] bg-emerald-500 rounded-t-md transition-all"
                style={{ height: `${(d.value / 20) * 100}%` }}
              />
              <span className="text-xs text-gray-500 mt-2">{d.month}</span>
            </div>
          ))}
        </div>
        {/* Y-axis hint */}
        <div className="flex justify-between text-xs text-gray-400 mt-1 px-2">
          <span>0</span>
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>20</span>
        </div>
      </div>
    </div>
  );
}
