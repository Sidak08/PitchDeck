import { NextRequest, NextResponse } from "next/server";
import { getCompetitionsStats } from "../../../../lib/utils/competitions";

export async function GET() {
  try {
    const stats = getCompetitionsStats();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Get competition stats error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
