"use client";

import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface CompetitionFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string;
    gradeFilter: string;
    statusFilter: string;
    showFavourites?: boolean;
  }) => void;
  showFavouritesToggle?: boolean;
}

export function CompetitionFilters({
  onFiltersChange,
  showFavouritesToggle,
}: CompetitionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showFavourites, setShowFavourites] = useState(false);

  // Update filters when any value changes
  React.useEffect(() => {
    onFiltersChange({
      searchTerm,
      gradeFilter,
      statusFilter,
      showFavourites,
    });
  }, [searchTerm, gradeFilter, statusFilter, showFavourites, onFiltersChange]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-[#19613F]/20 dark:border-[#2CA15F]/30 mb-8 sticky top-16 z-30">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#19613F] dark:text-[#2CA15F] h-4 w-4" />
          <Input
            placeholder="Search competitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-full lg:w-48 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white">
            <SelectValue placeholder="Grade Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="Pre-Secondary">Pre-Secondary</SelectItem>
            <SelectItem value="9-10">Grades 9-10</SelectItem>
            <SelectItem value="11-12">Grades 11-12</SelectItem>
            <SelectItem value="9-12">Grades 9-12</SelectItem>
            <SelectItem value="Post-Secondary">Post-Secondary</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full lg:w-48 bg-white/90 border-[#19613F]/20 focus:border-[#2CA15F] dark:bg-gray-800/50 dark:border-[#2CA15F]/30 dark:text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closing-soon">Closing Soon</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        {showFavouritesToggle && (
          <button
            type="button"
            className={`px-4 py-2 rounded-md border border-[#19613F]/20 dark:border-[#2CA15F]/30 text-sm font-medium transition-colors ${
              showFavourites
                ? "bg-[#19613F] hover:bg-[#2CA15F] text-white dark:bg-[#2CA15F] dark:hover:bg-[#19613F]"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
            onClick={() => setShowFavourites((prev) => !prev)}
          >
            {showFavourites ? "Showing Favourites" : "Show Favourites"}
          </button>
        )}
      </div>
    </div>
  );
}
