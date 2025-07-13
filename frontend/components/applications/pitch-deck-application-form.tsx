"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export function PitchDeckApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    gpa: "",
    previousExperience: "",
    whyInterested: "",
    teamPreference: "",
    dietaryRestrictions: "",
    emergencyContact: "",
    emergencyPhone: "",
    agreeToTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Terms and conditions required", {
        description: "Please agree to the terms and conditions to continue.",
      });
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual application submission logic
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Application submitted successfully!", {
        description: "We'll review your application and get back to you soon.",
      });

      router.push("/apply/pitch-deck/success");
    } catch {
      toast.error("Submission failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Form</CardTitle>
        <CardDescription>
          Please fill out all required fields to complete your application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Academic Information</h3>

            <div>
              <Label htmlFor="school">School Name *</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => handleChange("school", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grade">Current Grade *</Label>
                <Select
                  value={formData.grade}
                  onValueChange={(value) => handleChange("grade", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="gpa">GPA (if available)</Label>
                <Input
                  id="gpa"
                  value={formData.gpa}
                  onChange={(e) => handleChange("gpa", e.target.value)}
                  placeholder="e.g., 3.8"
                />
              </div>
            </div>
          </div>

          {/* Experience and Essays */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Experience & Essays</h3>

            <div>
              <Label htmlFor="previousExperience">
                Previous Case Competition Experience
              </Label>
              <Textarea
                id="previousExperience"
                value={formData.previousExperience}
                onChange={(e) =>
                  handleChange("previousExperience", e.target.value)
                }
                placeholder="Describe any previous case competition experience..."
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="whyInterested">
                Why are you interested in The Pitch Deck Championship? *
              </Label>
              <Textarea
                id="whyInterested"
                value={formData.whyInterested}
                onChange={(e) => handleChange("whyInterested", e.target.value)}
                placeholder="Tell us why you want to participate..."
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="teamPreference">Team Formation Preference</Label>
              <Select
                value={formData.teamPreference}
                onValueChange={(value) => handleChange("teamPreference", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">
                    Compete individually
                  </SelectItem>
                  <SelectItem value="team">Form a team</SelectItem>
                  <SelectItem value="either">Either is fine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>

            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) =>
                  handleChange("emergencyContact", e.target.value)
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="dietaryRestrictions">
                Dietary Restrictions/Allergies
              </Label>
              <Textarea
                id="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={(e) =>
                  handleChange("dietaryRestrictions", e.target.value)
                }
                placeholder="Please list any dietary restrictions or allergies..."
                rows={2}
              />
            </div>
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
              I agree to the terms and conditions and privacy policy *
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Submitting Application..." : "Submit Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
