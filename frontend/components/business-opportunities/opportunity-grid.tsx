"use client";

import { useState, useEffect, useMemo } from "react";
import { OpportunityCard } from "./opportunity-card";
import { Loader2, AlertCircle } from "lucide-react";

interface BusinessOpportunity {
  id: string;
  title: string;
  organizer: string;
  logo: string;
  gradeEligibility: string;
  startDate: string;
  endDate: string;
  cost: string;
  format: string;
  status: string;
  description: string;
  applicationType: string;
  applyUrl: string;
  category: string;
}

interface OpportunityGridProps {
  filters: {
    searchTerm: string;
    categoryFilter: string;
    formatFilter: string;
    costFilter: string;
    statusFilter: string;
  };
}

export function OpportunityGrid({ filters }: OpportunityGridProps) {
  const [opportunities, setOpportunities] = useState<BusinessOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favourites, setFavourites] = useState<Set<string>>(new Set());

  // Load opportunities data
  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/business-opportunities.json");
        if (!response.ok) {
          throw new Error("Failed to load opportunities");
        }
        const data = await response.json();
        setOpportunities(data);
        setError(null);
      } catch (err) {
        console.error("Error loading opportunities:", err);
        setError(
          "Failed to load business opportunities. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadOpportunities();
  }, []);

  // Load favourites from localStorage
  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourite-opportunities");
    if (savedFavourites) {
      try {
        const favouriteIds = JSON.parse(savedFavourites);
        setFavourites(new Set(favouriteIds));
      } catch (err) {
        console.error("Error loading favourites:", err);
      }
    }
  }, []);

  // Save favourites to localStorage
  const saveFavourites = (newFavourites: Set<string>) => {
    localStorage.setItem(
      "favourite-opportunities",
      JSON.stringify(Array.from(newFavourites)),
    );
    setFavourites(newFavourites);
  };

  // Handle favourite toggle
  const handleFavourite = (opportunityId: string) => {
    const newFavourites = new Set(favourites);
    if (newFavourites.has(opportunityId)) {
      newFavourites.delete(opportunityId);
    } else {
      newFavourites.add(opportunityId);
    }
    saveFavourites(newFavourites);
  };

  // Filter opportunities based on current filters
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opportunity) => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesSearch =
          opportunity.title.toLowerCase().includes(searchLower) ||
          opportunity.organizer.toLowerCase().includes(searchLower) ||
          opportunity.description.toLowerCase().includes(searchLower) ||
          opportunity.category.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (
        filters.categoryFilter &&
        opportunity.category !== filters.categoryFilter
      ) {
        return false;
      }

      // Format filter
      if (filters.formatFilter) {
        if (filters.formatFilter === "In-person and Virtual") {
          if (opportunity.format !== "In-person and Virtual") return false;
        } else if (opportunity.format !== filters.formatFilter) {
          return false;
        }
      }

      // Cost filter
      if (filters.costFilter) {
        const costLower = opportunity.cost.toLowerCase();
        switch (filters.costFilter) {
          case "free":
            if (!costLower.includes("free")) return false;
            break;
          case "paid":
            if (!costLower.includes("$") && !costLower.includes("paid"))
              return false;
            break;
          case "unspecified":
            if (
              !costLower.includes("does not specify") &&
              !costLower.includes("varies")
            )
              return false;
            break;
        }
      }

      // Status filter
      if (filters.statusFilter && opportunity.status !== filters.statusFilter) {
        return false;
      }

      return true;
    });
  }, [opportunities, filters]);

  // Sort opportunities: open first, then upcoming, then closed
  const sortedOpportunities = useMemo(() => {
    return [...filteredOpportunities].sort((a, b) => {
      const statusOrder = { open: 1, upcoming: 2, closed: 3 };
      const aOrder = statusOrder[a.status as keyof typeof statusOrder] || 4;
      const bOrder = statusOrder[b.status as keyof typeof statusOrder] || 4;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      // Secondary sort by title
      return a.title.localeCompare(b.title);
    });
  }, [filteredOpportunities]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#2CA15F] dark:text-[#2CA15F]" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">
          Loading opportunities...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-[#19613F] dark:text-white mb-2">
          Error Loading Opportunities
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">{error}</p>
      </div>
    );
  }

  if (sortedOpportunities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-24 h-24 bg-[#19613F]/10 dark:bg-[#2CA15F]/20 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-[#19613F] dark:text-[#2CA15F]" />
        </div>
        <h3 className="text-lg font-semibold text-[#19613F] dark:text-white mb-2">
          No Opportunities Found
        </h3>
        <p className="text-gray-600 dark:text-gray-300 max-w-md">
          {opportunities.length === 0
            ? "There are currently no business opportunities available."
            : "No opportunities match your current filters. Try adjusting your search criteria."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Showing{" "}
          <span className="text-[#2CA15F] font-semibold">
            {sortedOpportunities.length}
          </span>{" "}
          of{" "}
          <span className="text-[#19613F] dark:text-[#2CA15F] font-semibold">
            {opportunities.length}
          </span>{" "}
          opportunities
        </p>
      </div>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedOpportunities.map((opportunity) => (
          <OpportunityCard
            key={opportunity.id}
            opportunity={opportunity}
            isFavourited={favourites.has(opportunity.id)}
            onFavourite={() => handleFavourite(opportunity.id)}
          />
        ))}
      </div>
    </div>
  );
}
