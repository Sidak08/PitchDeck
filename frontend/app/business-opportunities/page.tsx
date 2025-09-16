"use client";

import { useState } from "react";
import { OpportunityFilters } from "@/components/business-opportunities/opportunity-filters";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { OpportunityGrid } from "@/components/business-opportunities/opportunity-grid";

export default function BusinessOpportunitiesPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    categoryFilter: "",
    formatFilter: "",
    costFilter: "",
    statusFilter: "",
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 pt-20 pb-16 px-4 sm:px-6 lg:px-8 w-full bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252]">
        <div className="w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#19613F] dark:text-white mb-4">
              Business Opportunities
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore summer programs, internships, fellowships, and other
              business opportunities designed to accelerate your career and{" "}
              <span className="text-[#2CA15F] font-semibold">
                entrepreneurial journey
              </span>
              .
            </p>
          </div>

          <OpportunityFilters onFiltersChange={setFilters} />
          <OpportunityGrid filters={filters} />
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
}
