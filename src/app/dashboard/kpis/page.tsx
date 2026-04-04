"use client";

import { useState } from "react";

const timeRanges = ["Week", "Month", "Quarter", "Year"] as const;

interface StatCard {
  label: string;
  value: string;
  trend: string;
  positive: boolean;
}

const statsRow1: StatCard[] = [
  { label: "Total Impressions", value: "142,847", trend: "+18% vs last month", positive: true },
  { label: "Total Clicks", value: "3,421", trend: "+12% vs last month", positive: true },
  { label: "Click-Through Rate", value: "2.40%", trend: "+0.3% vs last month", positive: true },
  { label: "Conversion Rate", value: "2.02%", trend: "-0.5% vs last month", positive: false },
];

const statsRow2: StatCard[] = [
  { label: "Cost Per Click", value: "$7.48", trend: "+$1.20 vs last month", positive: true },
  { label: "Cost Per Lead", value: "$47.15", trend: "-$3.85 vs last month", positive: true },
  { label: "Total Leads", value: "16", trend: "+2 vs last month", positive: true },
  { label: "Total Spend", value: "$2,103", trend: "+$153 vs last month", positive: true },
];

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const leadsData = [8, 10, 8, 12, 13, 16];
const spendData = [1200, 1500, 1300, 1700, 1900, 2103];
const cplData = [155, 140, 135, 145, 140, 135];

const leadSources = [
  { label: "Google Search", pct: 42, color: "#3B82F6" },
  { label: "Meta Feed", pct: 28, color: "#4338CA" },
  { label: "Google Display", pct: 15, color: "#14B8A6" },
  { label: "Meta Stories", pct: 10, color: "#F43F5E" },
  { label: "Organic", pct: 5, color: "#9CA3AF" },
];

function StatCardComponent({ card }: { card: StatCard }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">{card.label}</p>
      <p className="text-2xl font-bold text-gray-900 mb-2">{card.value}</p>
      <p className={`text-xs font-medium ${card.positive ? "text-green-600" : "text-red-500"}`}>
        {card.trend}
      </p>
    </div>
  );
}

function BarChart() {
  const max = Math.max(...leadsData);
  const chartHeight = 180;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Leads Over Time</h3>
      <div className="flex items-end justify-between gap-3" style={{ height: chartHeight }}>
        {leadsData.map((val, i) => {
          const h = (val / max) * (chartHeight - 30);
          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <span className="text-[10px] text-gray-500 mb-1">{val}</span>
              <div
                className="w-full rounded-t"
                style={{ height: h, backgroundColor: "#3B82F6", minWidth: 20 }}
              />
              <span className="text-[10px] text-gray-500 mt-2">{months[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LineChart({
  title,
  data,
  color,
  yMin,
  yMax,
  formatY,
}: {
  title: string;
  data: number[];
  color: string;
  yMin: number;
  yMax: number;
  formatY?: (v: number) => string;
}) {
  const svgW = 320;
  const svgH = 180;
  const padL = 45;
  const padR = 15;
  const padT = 10;
  const padB = 30;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const points = data.map((v, i) => {
    const x = padL + (i / (data.length - 1)) * plotW;
    const y = padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;
    return { x, y, v };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

  const yTicks = 5;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => {
    const val = yMin + ((yMax - yMin) / yTicks) * i;
    return { val, y: padT + plotH - ((val - yMin) / (yMax - yMin)) * plotH };
  });

  const fmt = formatY || ((v: number) => String(Math.round(v)));

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">{title}</h3>
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ maxHeight: 200 }}>
        {/* grid lines */}
        {yLabels.map((yl, i) => (
          <g key={i}>
            <line x1={padL} y1={yl.y} x2={svgW - padR} y2={yl.y} stroke="#E5E7EB" strokeWidth={0.5} />
            <text x={padL - 5} y={yl.y + 3} textAnchor="end" fontSize={8} fill="#9CA3AF">
              {fmt(yl.val)}
            </text>
          </g>
        ))}
        {/* line */}
        <polyline fill="none" stroke={color} strokeWidth={2} points={polyline} />
        {/* dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={4} fill={color} />
        ))}
        {/* x-axis labels */}
        {points.map((p, i) => (
          <text key={i} x={p.x} y={svgH - 5} textAnchor="middle" fontSize={9} fill="#6B7280">
            {months[i]}
          </text>
        ))}
      </svg>
    </div>
  );
}

function PieChart() {
  const total = leadSources.reduce((s, src) => s + src.pct, 0);
  const cx = 100;
  const cy = 100;
  const r = 80;

  let cumulative = 0;
  const slices = leadSources.map((src) => {
    const startAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative += src.pct;
    const endAngle = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const midAngle = (startAngle + endAngle) / 2;
    const labelR = r + 25;
    const lx = cx + labelR * Math.cos(midAngle);
    const ly = cy + labelR * Math.sin(midAngle);

    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    return { ...src, d, lx, ly, midAngle };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Lead Sources</h3>
      <div className="flex items-center justify-center">
        <svg viewBox="-10 -10 240 220" className="w-full" style={{ maxHeight: 240 }}>
          {slices.map((sl, i) => (
            <path key={i} d={sl.d} fill={sl.color} stroke="white" strokeWidth={2} />
          ))}
          {slices.map((sl, i) => {
            const anchor = sl.lx > cx ? "start" : "end";
            return (
              <text
                key={i}
                x={sl.lx}
                y={sl.ly}
                textAnchor={anchor}
                fontSize={9}
                fill="#374151"
                fontWeight={500}
              >
                {sl.label}: {sl.pct}%
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function KPIsPage() {
  const [activeRange, setActiveRange] = useState<string>("Month");

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">KPIs &amp; Metrics</h1>
          <p className="text-gray-500 text-sm">Detailed performance analytics across all channels</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeRange === range
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {statsRow1.map((card) => (
          <StatCardComponent key={card.label} card={card} />
        ))}
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsRow2.map((card) => (
          <StatCardComponent key={card.label} card={card} />
        ))}
      </div>

      {/* Charts 2x2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BarChart />
        <LineChart
          title="Monthly Ad Spend"
          data={spendData}
          color="#3B82F6"
          yMin={550}
          yMax={2200}
          formatY={(v) => `$${Math.round(v).toLocaleString()}`}
        />
        <PieChart />
        <LineChart
          title="Cost Per Lead Trend"
          data={cplData}
          color="#EF4444"
          yMin={0}
          yMax={160}
          formatY={(v) => `$${Math.round(v)}`}
        />
      </div>
    </div>
  );
}
