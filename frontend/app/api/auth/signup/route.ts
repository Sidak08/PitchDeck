import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  connectToDatabase,
  isMongoDBConfigured,
} from "../../../../lib/config/database";
import User from "../../../../lib/models/User";
import {
  validateSignup,
  withValidation,
} from "../../../../lib/middleware/validation";
import { SignupData } from "../../../../lib/types/api";

export async function POST(request: NextRequest) {
  return withValidation<SignupData>(
    request,
    validateSignup,
    async (request, data) => {
      const {
        firstName,
        lastName,
        email,
        password,
        role,
        school,
        grade,
        approved,
        favourites = [],
      } = data;

      try {
        if (!isMongoDBConfigured()) {
          return NextResponse.json(
            {
              message: "Registration not available - MongoDB not configured",
            },
            { status: 503 },
          );
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return NextResponse.json(
            { message: "User already exists" },
            { status: 400 },
          );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          role,
          school,
          grade,
          approved,
          favourites,
        });

        await user.save();

        return NextResponse.json(
          { message: "User created successfully" },
          { status: 201 },
        );
      } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }
    },
  );
}
