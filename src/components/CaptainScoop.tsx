"use client";

import { useState, useRef, useEffect } from "react";

/* eslint-disable @next/next/no-img-element */

const quickChips = [
  "📚 Research",
  "🎯 Strategy",
  "💡 Lead Ideas",
  "📈 Growth",
];

const mockResponses: Record<string, string> = {
  "research": "🎖️ **Market Research — Riverside, CA**\n\nI've analyzed the Riverside pet waste removal market:\n\n• **Market size**: ~15,000 single-family homes with dogs in your service area\n• **Current penetration**: ~2% (you + 5 competitors serve ~300 homes total)\n• **Growth opportunity**: 98% of the market is untapped!\n• **Avg household spend**: $85-120/month on pet services\n• **Top neighborhoods**: Canyon Crest, Arlington Heights, La Sierra\n\n**My recommendation**: Focus on the Canyon Crest area — high income, lots of large yards, and only 1 competitor currently serving it. You could add 20-30 clients there within 60 days with targeted door hangers.",
  "strategy": "🎖️ **Growth Strategy for Doctor Doo**\n\nBased on your current metrics, here's my 90-day plan:\n\n**Month 1: Optimize**\n• Consolidate cross-day routes (save ~45 min/week)\n• Set up automated review requests\n• Launch neighbor referral program ($25 credit per referral)\n\n**Month 2: Expand**\n• Target Canyon Crest with door hangers (500 units)\n• Launch Facebook lookalike audience ad ($300 budget)\n• Add bi-weekly service tier to capture price-sensitive clients\n\n**Month 3: Scale**\n• Hire part-time helper for Tuesday/Thursday\n• Expand to Moreno Valley (unserved market)\n• Launch email nurture campaign for leads\n\n**Projected result**: 25-35 new clients, $3,000-4,500 additional MRR.",
  "lead": "🎖️ **Lead Generation Strategy**\n\nHere's how to generate 50+ leads this month:\n\n1. **Neighbor radius** (10-15 leads): Use the Lead Gen tool to target homes within 3 blocks of your best clients\n2. **Door hangers** (15-20 leads): Print 500 door hangers for Canyon Crest & Arlington Heights\n3. **Facebook ads** (10-15 leads): Lookalike audience targeting dog owners in Riverside\n4. **Referral program** (5-10 leads): Offer existing clients $25 credit per successful referral\n5. **Google Local Services** (5-10 leads): Set up a Google LSA — you'll rank #1 with your 4.8 rating\n\nWant me to set up any of these campaigns?",
  "competitor": "🎖️ **Competitor Intel Report**\n\nI've analyzed your top 5 competitors:\n\n🏆 **You (Doctor Doo)**: 4.8★, 127 reviews — MARKET LEADER\n\n⚠️ **Threats**:\n• Paws & Claws is growing fast (+12 reviews last month)\n• The Poop Fairy has great social media presence\n\n✅ **Your advantages**:\n• Highest rating and most reviews\n• Most competitive pricing ($15-25 vs. market avg $20-30)\n• Best route efficiency (87%)\n\n💡 **Action items**:\n• Increase posting to 3x/week to match The Poop Fairy\n• Respond to all Google reviews within 24h\n• Launch a \"price match guarantee\" to defend against Yard Guard",
  "customer": "🎖️ **Customer Retention Playbook**\n\nYour current retention rate is 94.2% — good but let's get it to 97%+:\n\n1. **Onboarding sequence**: Send welcome email + first-service checklist\n2. **Service notes**: Leave a door hanger after each visit (\"We were here!\")\n3. **Quarterly check-ins**: Personal text to top clients\n4. **Loyalty rewards**: Free service after 6 months, yard sign discount\n5. **Win-back campaign**: Contact churned clients with a 50% off return offer\n\nThe clients most at risk of churning are those on monthly plans — they have the weakest habit loop. Consider offering them a discount to switch to bi-weekly.",
  "budget": "🎖️ **Budget Planning**\n\nHere's your recommended monthly marketing budget:\n\n• Facebook Ads — $300 — 8-12 leads\n• Door Hangers — $150 — 5-8 leads\n• Google LSA — $200 — 6-10 leads\n• Referral Rewards — $150 — 4-6 leads\n• Review Management — $50 — Brand trust\n• **Total: $850 — 23-36 leads**\n\nAt your $117 avg revenue per client and 94% retention, each new client is worth ~$1,400/year. Even at a conservative 30% conversion rate, that's 7-11 new clients = $9,800-15,400 annual revenue from $850/mo spend.\n\n**ROI: 960-1,500%** 🚀",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("research") || lower.includes("market")) return mockResponses.research;
  if (lower.includes("strateg") || lower.includes("growth") || lower.includes("plan")) return mockResponses.strategy;
  if (lower.includes("lead") || lower.includes("generat") || lower.includes("prospect")) return mockResponses.lead;
  if (lower.includes("compet") || lower.includes("rival")) return mockResponses.competitor;
  if (lower.includes("customer") || lower.includes("retain") || lower.includes("churn")) return mockResponses.customer;
  if (lower.includes("budget") || lower.includes("spend") || lower.includes("cost")) return mockResponses.budget;
  return "🎖️ I'm Captain Scoop, your AI business development assistant! I can help with:\n\n• Market research\n• Growth strategy\n• Lead generation\n• Competitor analysis\n• Customer retention\n• Budget planning\n\nJust ask me anything about growing your poop scoop business!";
}

interface Message {
  role: "user" | "captain";
  text: string;
}

export default function CaptainScoop() {
  const [open, setOpen] = useState(false);
  const [model, setModel] = useState("gpt-4o");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "captain", text: "Hey! I'm Captain Scoop 🍦 — your business development assistant. I can help with market research, marketing strategy, lead generation, competitor analysis, customer insights, and growth planning. What would you like to work on?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), model }),
      });
      const data = await res.json();
      const captainMsg: Message = { role: "captain", text: data.reply || getResponse(text) };
      setMessages((prev) => [...prev, captainMsg]);
    } catch {
      // Fallback to mock responses
      const captainMsg: Message = { role: "captain", text: getResponse(text) };
      setMessages((prev) => [...prev, captainMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating toggle button - always visible on right edge */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 px-2 py-3 rounded-l-xl shadow-lg transition-all duration-300 ${
          open
            ? "bg-gray-200 text-gray-600 hover:bg-gray-300 translate-x-0 right-[320px]"
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
        title={open ? "Close Captain Scoop" : "Open Captain Scoop"}
      >
        <div className="flex flex-col items-center gap-1">
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            <>
              <img src="/captain-scoop.png" alt="Captain Scoop" className="w-6 h-6 object-contain" />
              <span className="text-[10px] font-bold writing-mode-vertical" style={{ writingMode: "vertical-rl" }}>
                Captain Scoop
              </span>
            </>
          )}
        </div>
      </button>

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-[320px] bg-white border-l border-gray-200 shadow-xl z-40 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <img src="/captain-scoop.png" alt="Captain Scoop" className="w-10 h-10 object-contain" />
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-bold text-gray-900">Captain Scoop</h2>
              <p className="text-[10px] text-gray-500">Business Development Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-400">Model:</span>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="text-[10px] border border-gray-200 rounded px-1.5 py-0.5 text-gray-600 bg-white"
            >
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            </select>
            <span className="text-[10px] text-gray-400 ml-auto">Apr 2026</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                  msg.role === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-50 border border-gray-200 text-gray-700"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl px-3.5 py-2.5 text-xs text-gray-400">
                Captain Scoop is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick chips */}
        <div className="px-3 pb-2 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full text-[10px] font-medium transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
              placeholder="Ask Captain Scoop..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            />
            <button
              onClick={() => handleSend(input)}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
