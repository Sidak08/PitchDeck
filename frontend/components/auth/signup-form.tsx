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
    agreeToTerms: false,
  });
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

    if (!formData.agreeToTerms) {
      toast.error("Terms not accepted", {
        description: "You must agree to the terms and conditions to continue.",
      });
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual registration logic
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Account created successfully!", {
        description: "Welcome to The Pitch Deck.",
      });

      // Redirect based on role
      switch (formData.role) {
        case "competitor":
          router.push("/dashboard/competitor");
          break;
        case "organizer":
          router.push("/dashboard/organizer");
          break;
        default:
          router.push("/dashboard/competitor");
      }
    } catch {
      toast.error("Registration failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            required
            placeholder="John"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            required
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          required
          placeholder="john@example.com"
        />
      </div>

      <div>
        <Label htmlFor="school">School</Label>
        <Input
          id="school"
          value={formData.school}
          onChange={(e) => handleChange("school", e.target.value)}
          required
          placeholder="Your High School"
        />
      </div>

      <div>
        <Label htmlFor="grade">Grade</Label>
        <Select
          value={formData.grade}
          onValueChange={(value) => handleChange("grade", value)}
          required
        >
          <SelectTrigger>
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

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) => handleChange("role", value)}
          required
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="competitor">Competitor</SelectItem>
            <SelectItem value="organizer">Organizer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
          required
          placeholder="Create a password"
        />
      </div>

      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          required
          placeholder="Confirm your password"
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="agreeToTerms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) =>
            handleChange("agreeToTerms", checked as boolean)
          }
        />
        <Label htmlFor="agreeToTerms" className="text-sm">
          I agree to the{" "}
          <Link href="/terms" className="text-primary hover:underline">
            terms and conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            privacy policy
          </Link>{" "}
          *
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
