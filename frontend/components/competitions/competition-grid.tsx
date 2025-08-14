import { useEffect, useState } from "react";
import { CompetitionCard } from "./competition-card";

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

interface CompetitionGridProps {
  filters: {
    searchTerm: string;
    gradeFilter: string;
    statusFilter: string;
  };
}

export function CompetitionGrid({ filters }: CompetitionGridProps) {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/competitions")
      .then((res) => res.json())
      .then((data) => {
        setCompetitions(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load competitions.");
        setLoading(false);
      });
  }, []);

  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch =
      competition.title
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase()) ||
      competition.organizer
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

    const matchesGrade =
      !filters.gradeFilter ||
      filters.gradeFilter === "all" ||
      competition.gradeEligibility
        .toLowerCase()
        .includes(filters.gradeFilter.toLowerCase());

    const matchesStatus =
      !filters.statusFilter ||
      filters.statusFilter === "all" ||
      competition.status === filters.statusFilter;

    return matchesSearch && matchesGrade && matchesStatus;
  });

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500 w-full h-[70vh] flex items-center justify-center">
        Loading competitions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 w-full h-[70vh] flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (filteredCompetitions.length === 0) {
    return (
      <div className="text-center py-12 w-full h-[70vh] flex flex-col items-center justify-center">
        <p className="text-gray-500 text-lg">
          No competitions found matching your criteria.
        </p>
        <p className="text-gray-400 text-sm mt-2">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-screen-2xl mx-auto">
      {filteredCompetitions.map((competition) => (
        <CompetitionCard
          key={competition.id}
          competition={competition}
          // No favourites in public view
        />
      ))}
    </div>
  );
}
