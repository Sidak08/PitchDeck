import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  connectToDatabase,
  isMongoDBConfigured,
} from "../../../../lib/config/database";
import User from "../../../../lib/models/User";
import {
  validateLogin,
  withValidation,
} from "../../../../lib/middleware/validation";
import { signToken, setAuthCookie } from "../../../../lib/middleware/auth";
import { LoginData } from "../../../../lib/types/api";

export async function POST(request: NextRequest) {
  return withValidation<LoginData>(
    request,
    validateLogin,
    async (_request, data) => {
      const { email, password } = data;

      try {
        if (!isMongoDBConfigured()) {
          return NextResponse.json(
            {
              message: "Authentication not available - MongoDB not configured",
            },
            { status: 503 },
          );
        }

        await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 400 },
          );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 400 },
          );
        }

        const { password: _, ...userData } = user.toObject();

        // Create JWT
        const token = signToken({ id: user._id.toString(), email: user.email });

        const response = NextResponse.json(
          { message: "Login successful", user: userData },
          { status: 200 },
        );

        setAuthCookie(response, token);

        return response;
      } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
      }
    },
  );
}
