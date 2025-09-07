import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Trophy,
  Users,
  ExternalLink,
  Heart,
  DollarSign,
  Clock,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dialog } from "@/components/ui/dialog";

interface Competition {
  id: string;
  title: string;
  organizer: string;
  logo: string;
  gradeEligibility: string;
  deadline: string;
  prize: string;
  status: string;
  description: string;
  applicationType: string;
  applyUrl: string;
  frequency: string;
  dates: [string, string];
  location: string;
  cost: string;
  registrationOpens?: string;
}

interface CompetitionCardProps {
  competition: Competition;
  isFavourited?: boolean;
  onFavourite?: () => void;
}

export function CompetitionCard({
  competition,
  isFavourited,
  onFavourite,
}: CompetitionCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [favourited, setFavourited] = useState(isFavourited ?? false);

  useEffect(() => {
    setFavourited(isFavourited ?? false);
  }, [isFavourited]);

  // Only show favourite button if onFavourite is provided
  const showFavourite = typeof onFavourite === "function";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "closing-soon":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getApplicationStatus = () => {
    return competition.applicationType === "external" ? "External" : "Internal";
  };

  return (
    <>
      <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col bg-white dark:bg-gray-900 border-2 border-green-200 dark:border-green-800 py-0">
        {/* Header Section with Grade Range and Deadline */}
        <CardHeader className="pb-6 pt-4 px-6 border-b border-green-200 dark:border-green-700 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className="bg-[#19613F] text-white dark:bg-[#2CA15F] dark:text-green-900 font-semibold text-sm"
            >
              {competition.gradeEligibility}
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                  Deadline
                </p>
                <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                  {formatDate(competition.deadline)}
                </p>
              </div>
              {showFavourite && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label={
                    favourited ? "Remove from favourites" : "Add to favourites"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setFavourited((prev) => !prev);
                    if (onFavourite) onFavourite();
                  }}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favourited ? "text-red-500 fill-red-500" : "text-gray-400"
                    }`}
                    fill={favourited ? "currentColor" : "none"}
                    strokeWidth={1.5}
                  />
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {/* Main Content Section */}
        <CardContent className="flex-grow space-y-4 p-6 bg-white dark:bg-gray-900">
          {/* Title */}
          <div className="bg-green-50 dark:bg-green-900/50 p-3 rounded-lg border border-green-200 dark:border-green-700 h-20 flex items-center justify-center">
            <h3 className="font-bold text-lg text-center text-gray-900 dark:text-white leading-tight line-clamp-2">
              {competition.title}
            </h3>
          </div>

          {/* Logo Section */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-green-300 dark:border-green-600 flex items-center justify-center min-h-[120px]">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-2 flex items-center justify-center">
                <Image
                  src={competition.logo || "/logos/placeholder.svg"}
                  alt={`${competition.organizer} logo`}
                  width={80}
                  height={80}
                  className="rounded-lg object-contain max-w-full max-h-full"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 h-10 flex items-center justify-center line-clamp-2">
                {competition.organizer}
              </p>
            </div>
          </div>

          {/* Competition Details Grid */}
          <div className="space-y-3">
            {/* Cost */}
            <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg border border-amber-200 dark:border-amber-700">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Cost:
                </span>
                <span className="text-sm font-bold text-amber-700 dark:text-amber-300">
                  {competition.cost}
                </span>
              </div>
            </div>

            {/* Application Type */}
            <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg border border-green-200 dark:border-green-700">
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Application:
                </span>
                <span className="text-sm font-bold text-green-700 dark:text-green-300">
                  {getApplicationStatus()}
                </span>
              </div>
            </div>

            {/* Frequency */}
            <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg border border-purple-200 dark:border-purple-700">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Frequency:
                </span>
                <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                  {competition.frequency}
                </span>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge
              className={`${getStatusColor(competition.status)} px-3 py-1 text-sm font-semibold`}
            >
              {competition.status.replace("-", " ").toUpperCase()}
            </Badge>
          </div>
        </CardContent>

        {/* Footer with Action Buttons */}
        <CardFooter className="pt-4 pb-4 mt-auto bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 border-t border-green-200 dark:border-green-700">
          <div className="flex w-full gap-3">
            <Button
              variant="outline"
              className="flex-1 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-green-300 dark:border-green-600 text-[#19613F] dark:text-green-300 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                setDialogOpen(true);
              }}
            >
              View Details
            </Button>
            {competition.applicationType === "internal" ? (
              <Link href={competition.applyUrl} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg">
                  Apply Now
                </Button>
              </Link>
            ) : (
              <a
                href={competition.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                onClick={(e) => e.stopPropagation()}
              >
                <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold shadow-lg">
                  Apply
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </a>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Detailed View Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative bg-white dark:bg-gray-900 shadow-2xl rounded-xl border-2 border-green-200 dark:border-green-700">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 h-8 w-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
            >
              ×
            </Button>

            <CardHeader className="pb-6 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg p-2 flex-shrink-0">
                  <Image
                    src={competition.logo || "/logos/placeholder.svg"}
                    alt={`${competition.organizer} logo`}
                    width={64}
                    height={64}
                    className="rounded object-contain max-w-full max-h-full"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">
                    {competition.title}
                  </h3>
                  <p className="text-base font-medium text-[#19613F] dark:text-green-300">
                    {competition.organizer}
                  </p>
                  <Badge
                    className={`${getStatusColor(competition.status)} mt-2`}
                  >
                    {competition.status.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              {/* Description */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {competition.description}
                </p>
              </div>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-[#19613F] dark:text-green-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Eligibility
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {competition.gradeEligibility}
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Prizes
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {competition.prize}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg border border-amber-200 dark:border-amber-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Cost
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {competition.cost}
                  </p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Frequency
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {competition.frequency}
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-red-600 dark:text-red-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Deadline
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {formatDate(competition.deadline)}
                  </p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Location
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {competition.location}
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Additional Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Competition Dates:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {competition.dates[0]} to {competition.dates[1]}
                    </span>
                  </div>
                  {competition.registrationOpens && (
                    <div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Registration:
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        {competition.registrationOpens}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Application Type:
                    </span>
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      {getApplicationStatus()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-4">
                {competition.applicationType === "internal" ? (
                  <Link href={competition.applyUrl} className="block w-full">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 text-lg shadow-lg">
                      Apply Now
                    </Button>
                  </Link>
                ) : (
                  <a
                    href={competition.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 text-lg shadow-lg">
                      Apply Now
                      <ExternalLink className="h-5 w-5 ml-2" />
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
