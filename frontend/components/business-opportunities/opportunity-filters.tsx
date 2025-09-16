"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface OpportunityFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string;
    categoryFilter: string;
    formatFilter: string;
    costFilter: string;
    statusFilter: string;
  }) => void;
}

export function OpportunityFilters({
  onFiltersChange,
}: OpportunityFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [formatFilter, setFormatFilter] = useState("");
  const [costFilter, setCostFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (
    updates: Partial<{
      searchTerm: string;
      categoryFilter: string;
      formatFilter: string;
      costFilter: string;
      statusFilter: string;
    }>,
  ) => {
    const newFilters = {
      searchTerm,
      categoryFilter,
      formatFilter,
      costFilter,
      statusFilter,
      ...updates,
    };

    setSearchTerm(newFilters.searchTerm);
    setCategoryFilter(newFilters.categoryFilter);
    setFormatFilter(newFilters.formatFilter);
    setCostFilter(newFilters.costFilter);
    setStatusFilter(newFilters.statusFilter);

    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    updateFilters({
      searchTerm: "",
      categoryFilter: "",
      formatFilter: "",
      costFilter: "",
      statusFilter: "",
    });
  };

  const hasActiveFilters =
    searchTerm || categoryFilter || formatFilter || costFilter || statusFilter;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-[#19613F]/20 dark:border-[#2CA15F]/30 p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#19613F]/60 dark:text-[#2CA15F]/60 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search opportunities by title, organizer, or description..."
          value={searchTerm}
          onChange={(e) => updateFilters({ searchTerm: e.target.value })}
          className="pl-10 pr-4 py-2 w-full border-[#19613F]/20 dark:border-[#2CA15F]/30 focus:border-[#2CA15F] dark:focus:border-[#2CA15F]"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 border-[#19613F]/20 dark:border-[#2CA15F]/30 text-[#19613F] dark:text-[#2CA15F] hover:bg-[#19613F]/5 dark:hover:bg-[#2CA15F]/10"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <Select
              value={categoryFilter}
              onValueChange={(value) =>
                updateFilters({ categoryFilter: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Business Academy">
                  Business Academy
                </SelectItem>
                <SelectItem value="Leadership Program">
                  Leadership Program
                </SelectItem>
                <SelectItem value="Entrepreneurship Program">
                  Entrepreneurship Program
                </SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Fellowship">Fellowship</SelectItem>
                <SelectItem value="Scholarship Program">
                  Scholarship Program
                </SelectItem>
                <SelectItem value="Career Development">
                  Career Development
                </SelectItem>
                <SelectItem value="Conference">Conference</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Format Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format
            </label>
            <Select
              value={formatFilter}
              onValueChange={(value) => updateFilters({ formatFilter: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Formats" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Formats</SelectItem>
                <SelectItem value="In-person">In-person</SelectItem>
                <SelectItem value="Virtual">Virtual</SelectItem>
                <SelectItem value="In-person and Virtual">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cost Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cost
            </label>
            <Select
              value={costFilter}
              onValueChange={(value) => updateFilters({ costFilter: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Costs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Costs</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unspecified">Not Specified</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status
            </label>
            <Select
              value={statusFilter}
              onValueChange={(value) => updateFilters({ statusFilter: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <div className="flex items-center gap-1 bg-[#2CA15F]/10 dark:bg-[#2CA15F]/20 text-[#19613F] dark:text-[#2CA15F] px-3 py-1 rounded-full text-sm">
                <span>Search: "{searchTerm}"</span>
                <button
                  onClick={() => updateFilters({ searchTerm: "" })}
                  className="ml-1 hover:bg-[#2CA15F]/20 dark:hover:bg-[#2CA15F]/30 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {categoryFilter && (
              <div className="flex items-center gap-1 bg-[#19613F]/10 dark:bg-[#19613F]/20 text-[#19613F] dark:text-[#2CA15F] px-3 py-1 rounded-full text-sm">
                <span>Category: {categoryFilter}</span>
                <button
                  onClick={() => updateFilters({ categoryFilter: "" })}
                  className="ml-1 hover:bg-[#19613F]/20 dark:hover:bg-[#19613F]/30 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {formatFilter && (
              <div className="flex items-center gap-1 bg-[#2CA15F]/20 dark:bg-[#2CA15F]/30 text-[#19613F] dark:text-[#2CA15F] px-3 py-1 rounded-full text-sm">
                <span>Format: {formatFilter}</span>
                <button
                  onClick={() => updateFilters({ formatFilter: "" })}
                  className="ml-1 hover:bg-[#2CA15F]/30 dark:hover:bg-[#2CA15F]/40 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {costFilter && (
              <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-sm">
                <span>Cost: {costFilter}</span>
                <button
                  onClick={() => updateFilters({ costFilter: "" })}
                  className="ml-1 hover:bg-amber-200 dark:hover:bg-amber-800/40 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            {statusFilter && (
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                <span>Status: {statusFilter}</span>
                <button
                  onClick={() => updateFilters({ statusFilter: "" })}
                  className="ml-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
