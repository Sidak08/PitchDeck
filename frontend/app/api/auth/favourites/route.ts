import { NextRequest, NextResponse } from "next/server";
import {
  connectToDatabase,
  isMongoDBConfigured,
} from "../../../../lib/config/database";
import User from "../../../../lib/models/User";
import { withAuth } from "../../../../lib/middleware/auth";
import { FavouritesData } from "../../../../lib/types/api";

export async function GET(request: NextRequest) {
  return withAuth(request, async (_request, user) => {
    try {
      if (!isMongoDBConfigured()) {
        return NextResponse.json(
          {
            favourites: [],
            message: "Favourites not available - using local storage",
          },
          { status: 200 },
        );
      }

      await connectToDatabase();

      const userWithFavourites = await User.findById(
        (user as any)._id,
      ).populate("favourites");

      if (!userWithFavourites) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(
        { favourites: userWithFavourites.favourites },
        { status: 200 },
      );
    } catch (error) {
      console.error("Get favourites error:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  });
}

export async function POST(request: NextRequest) {
  return withAuth(request, async (req, user) => {
    try {
      const body: FavouritesData = await req.json();
      const { competitionId } = body;

      if (!competitionId) {
        return NextResponse.json(
          { message: "Competition ID required" },
          { status: 400 },
        );
      }

      if (!isMongoDBConfigured()) {
        return NextResponse.json(
          {
            message: "Favourites not available - MongoDB not configured",
          },
          { status: 503 },
        );
      }

      await connectToDatabase();

      const userDoc = await User.findById((user as any)._id);

      if (!userDoc) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 },
        );
      }

      // Add/remove favourite
      const idx = userDoc.favourites.findIndex(
        (id) => id.toString() === competitionId,
      );

      if (idx === -1) {
        userDoc.favourites.push(competitionId);
      } else {
        userDoc.favourites.splice(idx, 1);
      }

      await userDoc.save();

      return NextResponse.json(
        { favourites: userDoc.favourites },
        { status: 200 },
      );
    } catch (error) {
      console.error("Update favourites error:", error);
      return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
  });
}
