"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );

      const user = res.data.user;
      // Redirect based on user.role
      switch (user.role) {
        case "competitor":
          router.push("/dashboard/competitor");
          break;
        case "organizer":
          router.push("/dashboard/organizer");
          break;
        default:
          router.push("/dashboard/competitor");
      }
      toast.success("Login successful!", {
        description: "Welcome back to The Pitch Deck.",
      });
    } catch (err) {
      let errorMsg = "Please check your credentials and try again.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      toast.error("Login failed", {
        description: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label
          htmlFor="email"
          className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
          className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
        >
          Password
        </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-6 bg-[#19613F] hover:bg-[#2CA15F] dark:bg-[#2CA15F] dark:hover:bg-[#19613F] transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
