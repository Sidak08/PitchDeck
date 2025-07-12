"use client"

import { useState } from "react"
import { CompetitionGrid } from "@/components/competitions/competition-grid"
import { CompetitionFilters } from "@/components/competitions/competition-filters"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function CompetitionsPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    gradeFilter: "",
    statusFilter: "",
  })

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Case Competitions</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover and apply to business case competitions from top institutions around the world.
            </p>
          </div>

          <CompetitionFilters onFiltersChange={setFilters} />
          <CompetitionGrid filters={filters} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
