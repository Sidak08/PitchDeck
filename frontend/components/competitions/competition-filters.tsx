"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface CompetitionFiltersProps {
  onFiltersChange: (filters: {
    searchTerm: string;
    gradeFilter: string;
    statusFilter: string;
  }) => void;
}

export function CompetitionFilters({
  onFiltersChange,
}: CompetitionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Update filters when any value changes
  React.useEffect(() => {
    onFiltersChange({
      searchTerm,
      gradeFilter,
      statusFilter,
    });
  }, [searchTerm, gradeFilter, statusFilter, onFiltersChange]);

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-border mb-8">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search competitions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={gradeFilter} onValueChange={setGradeFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Grade Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Grades</SelectItem>
            <SelectItem value="9-10">Grades 9-10</SelectItem>
            <SelectItem value="11-12">Grades 11-12</SelectItem>
            <SelectItem value="9-12">Grades 9-12</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closing-soon">Closing Soon</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="w-full lg:w-auto bg-transparent">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>
    </div>
  );
}
