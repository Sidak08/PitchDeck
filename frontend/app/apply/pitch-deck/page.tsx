"use client";

import { useEffect } from "react";
import { PitchDeckApplicationForm } from "@/components/applications/pitch-deck-application-form";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function PitchDeckApplicationPage() {
  useEffect(() => {
    // Check if under construction and redirect if needed
    if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true") {
      window.location.href = "https://tally.so/r/mOxbXY";
    }
  }, []);

  // If under construction, show minimal content until redirect happens
  if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === "true") {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Redirecting to application form...
            </h1>
            <p className="text-xl text-gray-600">
              Please wait, you will be redirected to our external application
              form.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Normal display if not under construction
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Apply to The Pitch Deck Championship
            </h1>
            <p className="text-xl text-gray-600">
              Join our flagship case competition and compete for $15,000 in
              prizes.
            </p>
          </div>

          <PitchDeckApplicationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
