"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, Users, Award } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-card-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 dark:text-card-foreground">
            <span className="gradient-text">The All-in-One Platform</span>
            <br />
            for Case Competitions
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-300">
            Discover, apply to, and host business case competitions. Connect
            with top high school talent and compete for amazing prizes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <Link href="/competitions">
              <Button size="lg" className="text-lg px-8 py-3">
                Explore Cases
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/apply/pitch-deck">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 bg-transparent"
              >
                Sign Up for The Pitch Deck&apos;s Competition
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 dark:text-card-foreground">
                x
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Active Competitions
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 dark:text-card-foreground">
                y
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Student Competitors
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2 dark:text-card-foreground">
                $z
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Total Prize Money
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
