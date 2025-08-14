import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
  return NextResponse.redirect("http://localhost:3000/dashboard/competitions");
}
