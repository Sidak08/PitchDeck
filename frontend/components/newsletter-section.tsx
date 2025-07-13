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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary dark:bg-gray-900 dark:text-card-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Mail className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 dark:text-card-foreground">
          Stay in the Loop
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto dark:text-gray-300">
          Get notified about new competitions, application deadlines, and
          exclusive opportunities for case competitors.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white"
          />
          <Button
            type="submit"
            disabled={isLoading}
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100"
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  );
}
