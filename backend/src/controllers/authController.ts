import User from "../models/User";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
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
  } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const { password: _, ...userData } = user.toObject();
    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: string;
      email: string;
    };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...userData } = user.toObject();
    res.status(200).json({ user: userData });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const updateFavourites = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: string;
      email: string;
    };
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { competitionId } = req.body;
    if (!competitionId) {
      return res.status(400).json({ message: "Competition ID required" });
    }
    // Add/remove favourite
    const idx = user.favourites.findIndex(
      (id) => id.toString() === competitionId
    );
    if (idx === -1) {
      user.favourites.push(competitionId);
    } else {
      user.favourites.splice(idx, 1);
    }
    await user.save();
    res.status(200).json({ favourites: user.favourites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFavourites = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: string;
      email: string;
    };
    const user = await User.findById(decoded.id).populate("favourites");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ favourites: user.favourites });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
