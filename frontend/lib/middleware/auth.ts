import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "../models/User";
import { connectToDatabase, isMongoDBConfigured } from "../config/database";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface JWTPayload {
  id: string;
  email: string;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: "/",
  });
}

export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

export async function getAuthenticatedUser(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    if (!isMongoDBConfigured()) {
      // Return a mock user object when MongoDB is not configured
      return {
        _id: decoded.id,
        email: decoded.email,
        firstName: "Local",
        lastName: "User",
        role: "competitor",
      };
    }

    await connectToDatabase();
    const user = await User.findById(decoded.id);

    if (!user) {
      return null;
    }

    // Return user without password
    const { password: _, ...userData } = user.toObject();
    return userData;
  } catch {
    return null;
  }
}

export async function withAuth(
  request: NextRequest,
  handler: (_request: NextRequest, user: unknown) => Promise<NextResponse>,
): Promise<NextResponse> {
  const user = await getAuthenticatedUser(request);

  if (!user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  return await handler(request, user);
}
