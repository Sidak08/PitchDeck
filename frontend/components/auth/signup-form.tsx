"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import axios from "axios";

export function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    school: "",
    grade: "",
    approved: true,
    favourites: [],
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password mismatch", {
        description: "Please make sure your passwords match.",
      });
      return;
    }

    if (!agreeToTerms) {
      toast.error("Terms not accepted", {
        description: "You must agree to the terms and conditions to continue.",
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("/api/auth/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        school: formData.school,
        grade: formData.grade,
        approved: formData.approved,
        favourites: formData.favourites,
      });
      toast.success("Account created successfully!", {
        description: "Welcome to The Pitch Deck.",
      });
      switch (formData.role) {
        case "competitor":
          router.push("/dashboard/competitor");
          break;
        case "organizer":
          router.push("/");
          break;
        default:
          router.push("/dashboard/competitor");
      }
    } catch (err) {
      let errorMsg = "Please try again later.";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMsg = err.response.data.message;
      }
      toast.error("Registration failed", {
        description: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
          >
            First Name
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            placeholder="John"
            className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            placeholder="Doe"
            className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>
      </div>

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
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          placeholder="john@example.com"
          className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="school"
          className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
        >
          School
        </Label>
        <Input
          id="school"
          value={formData.school}
          onChange={(e) => handleChange("school", e.target.value)}
          required
          placeholder="Your High School"
          className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="grade"
          className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
        >
          Grade
        </Label>
        <Select
          value={formData.grade}
          onValueChange={(value) => handleChange("grade", value)}
          required
        >
          <SelectTrigger className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white">
            <SelectValue placeholder="Select your grade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9">Grade 9</SelectItem>
            <SelectItem value="10">Grade 10</SelectItem>
            <SelectItem value="11">Grade 11</SelectItem>
            <SelectItem value="12">Grade 12</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="role"
          className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
        >
          Role
        </Label>
        <Select
          value={formData.role}
          onValueChange={(value) => {
            handleChange("role", value);
            handleChange("approved", value === "organizer" ? false : true);
          }}
          required
        >
          <SelectTrigger className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white">
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="competitor">Competitor</SelectItem>
            <SelectItem value="organizer">Organizer</SelectItem>
          </SelectContent>
        </Select>
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
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          placeholder="Create a password"
          className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="block mb-1 text-[#19613F] dark:text-[#2CA15F] font-medium"
        >
          Confirm Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          required
          placeholder="Confirm your password"
          className="mt-1 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start space-x-3 mt-4 text-sm">
        <Checkbox
          id="agreeToTerms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
          required
          className="mt-0.5"
        />
        <Label
          htmlFor="agreeToTerms"
          className="text-sm leading-tight text-gray-700 dark:text-gray-300"
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="text-[#19613F] hover:text-[#2CA15F] dark:text-[#2CA15F] dark:hover:text-[#3dd67f] hover:underline"
          >
            T&C
          </Link>
          {" and "}
          <Link
            href="/privacy"
            className="text-[#19613F] hover:text-[#2CA15F] dark:text-[#2CA15F] dark:hover:text-[#3dd67f] hover:underline"
          >
            privacy policy
          </Link>
        </Label>
      </div>
      {formData.role === "organizer" && (
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-md text-sm my-4 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-200">
          If you want to be an organizer, you must contact us at{" "}
          <a href="mailto:example@site.com" className="underline font-medium">
            example@site.com
          </a>{" "}
          to get approved for an account.
        </div>
      )}
      <Button
        type="submit"
        className="w-full mt-6 bg-[#19613F] hover:bg-[#2CA15F] dark:bg-[#2CA15F] dark:hover:bg-[#19613F] transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
