"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CompetitionFilters } from "@/components/competitions/competition-filters";
import { CompetitionCard } from "@/components/competitions/competition-card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Competition {
  _id: string;
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
  frequency?: string;
  dates?: [string, string];
  location?: string;
  cost?: string;
}

export function CompetitorDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    gradeFilter: "",
    statusFilter: "",
    showFavourites: false,
  });
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    setIsMounted(true);

    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => {
        setFirstName(res.data.user?.firstName || "");
        // Fetch favourites after user is loaded
        axios
          .get("http://localhost:5000/api/auth/favourites", {
            withCredentials: true,
          })
          .then((favRes) => {
            setFavourites(
              favRes.data.favourites.map((fav: { _id: string }) => fav._id),
            );
          })
          .catch(() => {
            setFavourites([]);
          });
      })
      .catch((err) => {
        setFirstName("");
        if (err.response?.status === 401 || err.response?.status === 403) {
          router.push("/");
        }
      });
    axios
      .get("http://localhost:5000/api/competitions")
      .then((res) => {
        setCompetitions(res.data);
      })
      .catch(() => {
        setCompetitions([]);
      });
  }, [router]);

  const filteredCompetitions = competitions.filter((comp) => {
    const matchesSearch =
      comp.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      comp.organizer.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesGrade =
      !filters.gradeFilter ||
      filters.gradeFilter === "all" ||
      comp.gradeEligibility === filters.gradeFilter;
    const matchesStatus =
      !filters.statusFilter ||
      filters.statusFilter === "all" ||
      comp.status === filters.statusFilter;
    const matchesFavourites =
      !filters.showFavourites || favourites.includes(comp._id);
    return matchesSearch && matchesGrade && matchesStatus && matchesFavourites;
  });

  const handleFavourite = async (competitionId: string) => {
    setFavourites((prev) =>
      prev.includes(competitionId)
        ? prev.filter((id) => id !== competitionId)
        : [...prev, competitionId],
    );
    // Sync with backend
    try {
      await axios.post(
        "http://localhost:5000/api/auth/favourites",
        { competitionId },
        { withCredentials: true },
      );
    } catch {
      toast.error("Failed to update favourites. Please try again.");
    }
  };

  // Return a loading state or empty div until client-side hydration is complete
  if (!isMounted) {
    return <div className="space-y-6"></div>;
  }

  return (
    <div className="space-y-6" suppressHydrationWarning>
      <div className="relative z-20 py-4 bg-[#D9D9D9] dark:bg-gradient-to-br dark:from-[#102338] dark:via-[#152a45] dark:to-[#193252]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {`Welcome back${firstName ? ", " + firstName : ""}!`}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Here&apos;s what&apos;s happening with your case competitions.
          </p>
        </div>
      </div>
      <CompetitionFilters
        onFiltersChange={setFilters}
        showFavouritesToggle={true}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompetitions.map((comp) => (
          <CompetitionCard
            key={comp._id}
            competition={{
              id: comp._id,
              title: comp.title,
              organizer: comp.organizer,
              logo: comp.logo,
              gradeEligibility: comp.gradeEligibility,
              deadline: comp.deadline,
              prize: comp.prize,
              status: comp.status,
              description: comp.description,
              applicationType: comp.applicationType,
              applyUrl: comp.applyUrl,
              frequency: comp.frequency ?? "N/A",
              dates:
                Array.isArray(comp.dates) && comp.dates.length === 2
                  ? comp.dates
                  : ["N/A", "N/A"],
              location: comp.location ?? "N/A",
              cost: comp.cost ?? "N/A",
            }}
            isFavourited={favourites.includes(comp._id)}
            onFavourite={() => handleFavourite(comp._id)}
          />
        ))}
      </div>
    </div>
  );
}
