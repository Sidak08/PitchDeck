import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, ExternalLink, Heart } from "lucide-react";
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
        return "bg-green-100 text-green-800";
      case "closing-soon":
        return "bg-yellow-100 text-yellow-800";
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={competition.logo || "/placeholder.svg"}
                alt={`${competition.organizer} logo`}
                width={48}
                height={48}
                className="rounded-lg"
              />
              <div>
                <h3 className="font-semibold text-lg line-clamp-2">
                  {competition.title}
                </h3>
                <p className="text-sm text-gray-600">{competition.organizer}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(competition.status)}>
                {competition.status.replace("-", " ")}
              </Badge>
              {showFavourite && (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={
                    favourited ? "Remove from favourites" : "Add to favourites"
                  }
                  onClick={() => {
                    setFavourited((prev) => !prev);
                    if (onFavourite) onFavourite();
                  }}
                >
                  <Heart
                    className={`h-5 w-5 ${
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

        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {competition.description}
          </p>

          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{competition.gradeEligibility}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>{competition.prize}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>Deadline: {formatDate(competition.deadline)}</span>
          </div>
        </CardContent>

        <CardFooter className="pt-4">
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={() => setDialogOpen(true)}
            >
              View Details
            </Button>
            {competition.applicationType === "internal" ? (
              <Link href={competition.applyUrl} className="flex-1">
                <Button className="w-full">Apply Now</Button>
              </Link>
            ) : (
              <a
                href={competition.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full">
                  Apply
                  <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
              </a>
            )}
          </div>
        </CardFooter>
      </Card>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50 animate-fade-in animate-scale-up bg-white dark:bg-card text-card-foreground dark:text-card-foreground rounded-xl shadow-xl">
          <Card className="max-w-lg w-full p-6 relative bg-white dark:bg-card text-card-foreground dark:text-card-foreground">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
            >
              ×
            </Button>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Image
                  src={competition.logo || "/placeholder.svg"}
                  alt={`${competition.organizer} logo`}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {competition.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {competition.organizer}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {competition.description}
              </p>
              <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <strong>Frequency:</strong> {competition.frequency}
                </div>
                <div>
                  <strong>Dates:</strong> {competition.dates[0]} to{" "}
                  {competition.dates[1]}
                </div>
                <div>
                  <strong>Location:</strong> {competition.location}
                </div>
                <div>
                  <strong>Cost:</strong> {competition.cost}
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{competition.gradeEligibility}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4" />
                  <span>{competition.prize}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4" />
                <span>Deadline: {formatDate(competition.deadline)}</span>
              </div>
            </CardContent>
          </Card>
        </Dialog.Content>
      </Dialog>
    </>
  );
}
