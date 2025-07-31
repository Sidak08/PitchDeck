"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement newsletter signup API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Successfully subscribed!", {
        description:
          "You'll receive updates about new competitions and opportunities.",
      });
      setEmail("");
    } catch {
      toast.error("Subscription failed", {
        description: "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#19613F] dark:bg-[#102338] dark:text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('/images/newsletter-bg.jpg')] bg-cover bg-center mix-blend-overlay"></div>

      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#2CA15F]/20 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#2CA15F]/10 blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-[#2CA15F]/15 blur-2xl -translate-y-1/2"></div>
      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-[#2CA15F]/20 blur-xl"></div>
      <div className="absolute top-1/4 right-1/3 w-16 h-16 rounded-full bg-[#2CA15F]/25 blur-lg"></div>

      {/* Dark mode shapes */}
      <div className="hidden dark:block absolute top-0 right-0 w-72 h-72 rounded-full bg-[#193252]/30 blur-3xl -translate-y-1/3 translate-x-1/4"></div>
      <div className="hidden dark:block absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#193252]/20 blur-3xl translate-y-1/4"></div>
      <div className="hidden dark:block absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-[#193252]/25 blur-2xl"></div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-[#D9D9D9]/10 rounded-full">
            <Mail className="h-12 w-12 text-[#D9D9D9]" />
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-sm">
          Stay in the{" "}
          <span className="text-white relative inline-block after:absolute after:bottom-1 after:left-0 after:w-full after:h-1 after:bg-[#2CA15F]/60 after:-z-10">
            Loop
          </span>
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          Get notified about new competitions, application deadlines, and
          exclusive opportunities for case competitors.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20 shadow-xl relative z-10"
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/90 border-0 focus:border-0 focus-visible:ring-2 focus-visible:ring-[#2CA15F] focus-visible:ring-offset-1 dark:bg-[#1a3047]/90 dark:text-white rounded-lg h-11"
          />
          <Button
            type="submit"
            disabled={isLoading}
            variant="secondary"
            className="bg-[#2CA15F] text-white hover:bg-[#19613F] shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-medium h-11 px-6 dark:shadow-[0_0_15px_rgba(44,161,95,0.4)]"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        <div className="mt-8 flex items-center justify-center text-white/90">
          <span className="text-sm backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
            We respect your privacy and will never share your information
          </span>
        </div>
      </div>
    </section>
  );
}
