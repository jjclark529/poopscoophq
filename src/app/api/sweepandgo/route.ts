import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "received",
    message: "Sweep&Go webhook processed",
  });
}
