"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Award } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#D9D9D9] via-white to-[#D9D9D9] dark:from-[#0c1a2e] dark:via-[#102338] dark:to-[#152a45] dark:text-white relative">
      <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-pattern.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-bold text-black mb-6 dark:text-card-foreground">
            <span className="gradient-text">The All-in-One Platform</span>
            <br />
            for Case Competitions
          </h1>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto dark:text-gray-300">
            Discover, apply to, and host business case competitions. Connect
            with top high school talent and compete for amazing prizes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Link href="/competitions">
              <Button
                size="lg"
                className="text-lg px-8 py-3 bg-[#19613F] hover:bg-[#2CA15F] dark:shadow-[0_0_15px_rgba(44,161,95,0.4)]"
              >
                Explore Cases
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/apply/pitch-deck">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-transparent border-[#19613F] text-[#19613F] hover:bg-[#19613F] hover:text-white"
              >
                Sign Up for The Pitch Deck&apos;s Competition
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="text-center p-5 bg-white/50 dark:bg-[#1a3047]/70 rounded-lg shadow-sm backdrop-blur-sm dark:border dark:border-[#2CA15F]/20">
              <div className="flex justify-center mb-4">
                <Trophy className="h-12 w-12 text-[#19613F]" />
              </div>
              <h3 className="text-3xl font-bold text-[#2CA15F] mb-2 dark:text-card-foreground">
                50+
              </h3>
              <p className="text-black dark:text-gray-300">
                Active Competitions
              </p>
            </div>
            <div className="text-center p-5 bg-white/50 dark:bg-[#1a3047]/70 rounded-lg shadow-sm backdrop-blur-sm dark:border dark:border-[#2CA15F]/20">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-[#19613F]" />
              </div>
              <h3 className="text-3xl font-bold text-[#2CA15F] mb-2 dark:text-card-foreground">
                5,000+
              </h3>
              <p className="text-black dark:text-gray-300">
                Student Competitors
              </p>
            </div>
            <div className="text-center p-5 bg-white/50 dark:bg-[#1a3047]/70 rounded-lg shadow-sm backdrop-blur-sm dark:border dark:border-[#2CA15F]/20">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-[#19613F]" />
              </div>
              <h3 className="text-3xl font-bold text-[#2CA15F] mb-2 dark:text-card-foreground">
                $250K+
              </h3>
              <p className="text-black dark:text-gray-300">Total Prize Money</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
