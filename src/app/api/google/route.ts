import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "connected",
    profile: {
      name: "Doctor Doo Pet Waste Removal",
      rating: 4.8,
      reviews: 127,
      views: 1247,
      calls: 34,
    },
  });
}

export async function POST() {
  return NextResponse.json({ success: true, message: "Google profile update queued" });
}
