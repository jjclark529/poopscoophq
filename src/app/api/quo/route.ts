import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "not_connected",
    message: "Connect Quo (OpenPhone) in Settings → Connections",
  });
}

export async function POST() {
  return NextResponse.json({ success: true, message: "Quo webhook processed" });
}
