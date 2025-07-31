"use client";

import { useState } from "react";
import { CompetitionFilters } from "@/components/competitions/competition-filters";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CompetitionGrid } from "@/components/competitions/competition-grid";

export default function CompetitionsPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    gradeFilter: "",
    statusFilter: "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-20 pb-16 px-4 sm:px-6 lg:px-8 w-full bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252]">
        <div className="w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Case Competitions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover and apply to business case competitions from top
              institutions around the world.
            </p>
          </div>

          <CompetitionFilters onFiltersChange={setFilters} />
          <CompetitionGrid filters={filters} />
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
