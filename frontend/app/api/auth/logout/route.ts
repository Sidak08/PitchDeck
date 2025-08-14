import { NextRequest, NextResponse } from "next/server";
import { clearAuthCookie } from "../../../../lib/middleware/auth";

export async function POST(_request: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logged out" },
      { status: 200 },
    );

    clearAuthCookie(response);

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
