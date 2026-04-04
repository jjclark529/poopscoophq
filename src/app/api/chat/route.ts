import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message } = body as { message?: string };
  const lower = (message || "").toLowerCase();

  let reply = "I'm Captain Scoop, your AI business development assistant! Ask me about market research, growth strategy, lead generation, competitor analysis, customer retention, or budget planning.";

  if (lower.includes("research") || lower.includes("market")) {
    reply = "I've analyzed the Riverside pet waste removal market. The market size is approximately 15,000 single-family homes with dogs. Current penetration is about 2% — massive growth opportunity! Focus on Canyon Crest and Arlington Heights.";
  } else if (lower.includes("strateg") || lower.includes("growth")) {
    reply = "Here's your 90-day growth plan: Month 1 — optimize routes and launch referral program. Month 2 — target Canyon Crest with door hangers and Facebook ads. Month 3 — hire part-time help and expand to Moreno Valley.";
  } else if (lower.includes("lead") || lower.includes("prospect")) {
    reply = "To generate 50+ leads this month: neighbor radius targeting (10-15 leads), door hangers in Canyon Crest (15-20 leads), Facebook lookalike ads (10-15 leads), referral program (5-10 leads), and Google LSA setup (5-10 leads).";
  }

  return NextResponse.json({ reply, timestamp: new Date().toISOString() });
}
