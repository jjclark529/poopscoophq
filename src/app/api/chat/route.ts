import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are Captain Scoop, an AI business development assistant for pet waste removal (pooper scooper) companies. You help with market research, marketing strategy, lead generation, competitor analysis, customer insights, and growth planning.

You are currently assisting Doctor Doo, a pet waste removal business in Riverside, CA. They have approximately 127 active clients, $14,835 monthly revenue, and a 4.9 Google rating with 101 reviews.

Be helpful, specific, and action-oriented. Use data when possible. Format responses with bullet points and bold text for key items. Keep responses concise but thorough.`;

// Mock responses as fallback when no API key is configured
const mockResponses: Record<string, string> = {
  research: "🎖️ **Market Research — Riverside, CA**\n\nI've analyzed the Riverside pet waste removal market:\n\n• **Market size**: ~15,000 single-family homes with dogs in your service area\n• **Current penetration**: ~2% (you + 5 competitors serve ~300 homes total)\n• **Growth opportunity**: 98% of the market is untapped!\n• **Avg household spend**: $85-120/month on pet services\n• **Top neighborhoods**: Canyon Crest, Arlington Heights, La Sierra\n\n**My recommendation**: Focus on the Canyon Crest area — high income, lots of large yards, and only 1 competitor currently serving it.",
  strategy: "🎖️ **Growth Strategy for Doctor Doo**\n\nBased on your current metrics, here's my 90-day plan:\n\n**Month 1: Optimize**\n• Consolidate cross-day routes (save ~45 min/week)\n• Set up automated review requests\n• Launch neighbor referral program ($25 credit per referral)\n\n**Month 2: Expand**\n• Target Canyon Crest with door hangers (500 units)\n• Launch Facebook lookalike audience ad ($300 budget)\n• Add bi-weekly service tier to capture price-sensitive clients\n\n**Month 3: Scale**\n• Hire part-time helper for Tuesday/Thursday\n• Expand to Moreno Valley (unserved market)\n• Launch email nurture campaign for leads\n\n**Projected result**: 25-35 new clients, $3,000-4,500 additional MRR.",
  lead: "🎖️ **Lead Generation Strategy**\n\nHere's how to generate 50+ leads this month:\n\n1. **Neighbor radius** (10-15 leads): Target homes within 3 blocks of your best clients\n2. **Door hangers** (15-20 leads): Print 500 for Canyon Crest & Arlington Heights\n3. **Facebook ads** (10-15 leads): Lookalike audience targeting dog owners in Riverside\n4. **Referral program** (5-10 leads): Offer $25 credit per successful referral\n5. **Google Local Services** (5-10 leads): Set up a Google LSA — you'll rank #1 with your 4.9 rating",
  growth: "🎖️ **Growth Opportunities**\n\n• **Expand to Corona/Norco**: Adjacent market with 12,000+ dog-owning households and minimal competition\n• **Add premium tier**: Deodorizing + brown spot treatment upsell ($15-20/visit increase)\n• **Launch referral program**: Your 94% retention rate means happy clients — leverage them\n• **Commercial accounts**: Pet daycares, dog parks, apartment complexes\n• **Seasonal deep cleans**: Spring/fall yard restoration packages at $150-250",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("research") || lower.includes("market")) return mockResponses.research;
  if (lower.includes("strateg") || lower.includes("plan")) return mockResponses.strategy;
  if (lower.includes("lead") || lower.includes("generat") || lower.includes("prospect")) return mockResponses.lead;
  if (lower.includes("growth") || lower.includes("grow") || lower.includes("expand")) return mockResponses.growth;
  return "I'm Captain Scoop 🍦 — your AI business development assistant! I can help with:\n\n• Market research\n• Growth strategy\n• Lead generation\n• Competitor analysis\n• Customer retention\n• Budget planning\n\nJust ask me anything about growing your poop scoop business!";
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message, model = "gpt-4o" } = body as { message?: string; model?: string };

  if (!message) {
    return NextResponse.json({ reply: "Please send a message.", timestamp: new Date().toISOString() });
  }

  // Try OpenAI if API key is configured
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content || getMockResponse(message);
        return NextResponse.json({ reply, source: "openai", model, timestamp: new Date().toISOString() });
      }
    } catch {
      // Fall through to mock response
    }
  }

  // Fallback to mock responses
  const reply = getMockResponse(message);
  return NextResponse.json({ reply, source: "mock", model: "mock", timestamp: new Date().toISOString() });
}
