import { NextRequest, NextResponse } from "next/server";
import {
  getCompetitionById,
  updateCompetition,
  removeCompetition,
  Competition,
} from "../../../../lib/utils/competitions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const competition = getCompetitionById(params.id);

    if (!competition) {
      return NextResponse.json(
        { message: "Competition not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(competition, { status: 200 });
  } catch (error) {
    console.error("Get competition error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body: Partial<Competition> = await request.json();

    // Don't allow ID to be changed
    if (body.id && body.id !== params.id) {
      return NextResponse.json(
        { message: "Cannot change competition ID" },
        { status: 400 },
      );
    }

    const success = updateCompetition(params.id, body);

    if (!success) {
      return NextResponse.json(
        { message: "Competition not found or update failed" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Competition updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update competition error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const success = removeCompetition(params.id);

    if (!success) {
      return NextResponse.json(
        { message: "Competition not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Competition deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Delete competition error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
