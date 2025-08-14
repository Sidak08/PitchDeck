import { NextRequest, NextResponse } from "next/server";
import {
  getCompetitionsSortedByDeadline,
  addCompetition,
  Competition,
} from "../../../lib/utils/competitions";

export async function GET() {
  try {
    const competitions = getCompetitionsSortedByDeadline();
    return NextResponse.json(competitions, { status: 200 });
  } catch (error) {
    console.error("Get competitions error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: Competition = await request.json();

    // Basic validation
    if (!body.id || !body.title || !body.organizer) {
      return NextResponse.json(
        { message: "Missing required fields: id, title, organizer" },
        { status: 400 },
      );
    }

    const success = addCompetition(body);

    if (!success) {
      return NextResponse.json(
        { message: "Failed to add competition. ID may already exist." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Competition added successfully", competition: body },
      { status: 201 },
    );
  } catch (error) {
    console.error("Post competition error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
