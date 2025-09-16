"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  DollarSign,
  Users,
  ExternalLink,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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

interface OpportunityCardProps {
  opportunity: BusinessOpportunity;
  isFavourited?: boolean;
  onFavourite?: () => void;
}

export function OpportunityCard({
  opportunity,
  isFavourited = false,
  onFavourite,
}: OpportunityCardProps) {
  const [imageError, setImageError] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-[#2CA15F]/20 text-[#19613F] dark:bg-[#2CA15F]/30 dark:text-[#2CA15F]";
      case "upcoming":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "business academy":
        return "bg-[#19613F]/10 text-[#19613F] dark:bg-[#19613F]/20 dark:text-[#2CA15F]";
      case "leadership program":
        return "bg-[#2CA15F]/15 text-[#19613F] dark:bg-[#2CA15F]/25 dark:text-[#2CA15F]";
      case "entrepreneurship program":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200";
      case "internship":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200";
      case "fellowship":
        return "bg-[#19613F]/15 text-[#19613F] dark:bg-[#19613F]/25 dark:text-[#2CA15F]";
      case "scholarship program":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "career development":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200";
      case "conference":
        return "bg-[#2CA15F]/10 text-[#19613F] dark:bg-[#2CA15F]/20 dark:text-[#2CA15F]";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatCost = (cost: string) => {
    if (cost.toLowerCase().includes("free")) {
      return { text: "Free", color: "text-[#2CA15F] dark:text-[#2CA15F]" };
    } else if (cost.toLowerCase().includes("paid") || cost.includes("$")) {
      return { text: cost, color: "text-[#19613F] dark:text-[#2CA15F]" };
    } else {
      return { text: cost, color: "text-gray-600 dark:text-gray-400" };
    }
  };

  const costInfo = formatCost(opportunity.cost);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border border-[#19613F]/20 dark:border-[#2CA15F]/30 bg-white dark:bg-gray-800 relative overflow-hidden flex flex-col">
      {/* Favourite Button */}
      {onFavourite && (
        <button
          onClick={onFavourite}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
          aria-label={
            isFavourited ? "Remove from favourites" : "Add to favourites"
          }
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${
              isFavourited
                ? "fill-[#2CA15F] text-[#2CA15F]"
                : "text-gray-400 hover:text-[#2CA15F]"
            }`}
          />
        </button>
      )}

      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            {!imageError ? (
              <Image
                src={opportunity.logo}
                alt={`${opportunity.organizer} logo`}
                width={60}
                height={60}
                className="rounded-lg object-contain bg-white p-1"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-[60px] h-[60px] bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-xs text-center">
                  {opportunity.organizer
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 3)}
                </span>
              </div>
            )}
          </div>

          {/* Title and Status */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#19613F] dark:group-hover:text-[#2CA15F] transition-colors">
                {opportunity.title}
              </h3>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {opportunity.organizer}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <Badge className={getStatusColor(opportunity.status)}>
                {opportunity.status.charAt(0).toUpperCase() +
                  opportunity.status.slice(1)}
              </Badge>
              <Badge className={getCategoryColor(opportunity.category)}>
                {opportunity.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1">
        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {opportunity.description}
        </p>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Start Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Start:</span>{" "}
              {opportunity.startDate}
            </span>
          </div>

          {/* End Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">End:</span> {opportunity.endDate}
            </span>
          </div>

          {/* Format */}
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              {opportunity.format}
            </span>
          </div>

          {/* Cost */}
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className={`font-medium ${costInfo.color}`}>
              {costInfo.text}
            </span>
          </div>

          {/* Eligibility */}
          <div className="flex items-center gap-2 text-sm sm:col-span-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-medium">Eligibility:</span>{" "}
              {opportunity.gradeEligibility}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Footer with Apply Button */}
      <CardFooter className="pt-4 pb-4 mt-auto bg-gradient-to-r from-[#19613F]/10 to-[#2CA15F]/10 dark:from-[#19613F]/20 dark:to-[#2CA15F]/20 border-t border-[#19613F]/20 dark:border-[#2CA15F]/30">
        <Button
          onClick={() => window.open(opportunity.applyUrl, "_blank")}
          className="w-full bg-gradient-to-r from-[#19613F] to-[#2CA15F] hover:from-[#2CA15F] hover:to-[#19613F] text-white font-semibold shadow-lg transition-all duration-200"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Learn More & Apply
        </Button>
      </CardFooter>
    </Card>
  );
}
