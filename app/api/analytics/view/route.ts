import { NextResponse } from "next/server";

// Simple in-memory tracker for serverless runtime instance caching
let todayViewsCount = 1280;
let lastResetDate = new Date().toISOString().slice(0, 10);

export async function GET() {
  const currentDate = new Date().toISOString().slice(0, 10);
  if (currentDate !== lastResetDate) {
    todayViewsCount = 0;
    lastResetDate = currentDate;
  }

  return NextResponse.json({
    todayViewsCount,
    success: true,
  });
}

export async function POST() {
  const currentDate = new Date().toISOString().slice(0, 10);
  if (currentDate !== lastResetDate) {
    todayViewsCount = 0;
    lastResetDate = currentDate;
  }

  todayViewsCount += 1;

  return NextResponse.json({
    todayViewsCount,
    success: true,
  });
}
