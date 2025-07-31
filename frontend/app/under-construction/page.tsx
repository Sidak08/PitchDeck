"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction, AlertCircle } from "lucide-react";
import Link from "next/link";
// import { motion } from "framer-motion";

export default function UnderConstructionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#D9D9D9]">
      {/* Header */}
      <header className="w-full bg-[#19613F] py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-white">The Pitch Deck</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <Construction className="h-24 w-24 text-[#19613F] mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
              <span className="text-[#19613F]">Under</span> Construction
            </h1>
            <div className="flex items-center justify-center mb-6 p-4 bg-[#2CA15F]/10 rounded-lg border border-[#2CA15F]">
              <AlertCircle className="h-5 w-5 text-[#19613F] mr-2" />
              <p className="text-black">
                We're currently working on this page. Please check back soon!
              </p>
            </div>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
              Our team is actively developing this section of the platform to
              provide you with the best possible experience. Thank you for your
              patience.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#19613F]/20 mb-8">
              <h2 className="text-xl font-semibold text-[#19613F] mb-4">
                What to Expect
              </h2>
              <ul className="text-left text-black space-y-3">
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-[#2CA15F] flex-shrink-0 mt-1 mr-3"></div>
                  <span>Personalized dashboard experience</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-[#2CA15F] flex-shrink-0 mt-1 mr-3"></div>
                  <span>Track your competition applications</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-[#2CA15F] flex-shrink-0 mt-1 mr-3"></div>
                  <span>Manage your team members</span>
                </li>
                <li className="flex items-start">
                  <div className="h-5 w-5 rounded-full bg-[#2CA15F] flex-shrink-0 mt-1 mr-3"></div>
                  <span>Access exclusive resources</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <Link href="/">
              <Button className="bg-[#19613F] hover:bg-[#2CA15F] text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#19613F] py-6 px-6 text-center">
        <p className="text-[#D9D9D9]">
          &copy; {new Date().getFullYear()} The Pitch Deck. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
