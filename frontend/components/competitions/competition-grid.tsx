import { CompetitionCard } from "./competition-card"

// TODO: Replace with actual data from backend
const competitions = [
  {
    id: 1,
    title: "Harvard Business School Case Competition",
    host: "Harvard Business School",
    logo: "/placeholder.svg?height=80&width=80",
    gradeEligibility: "Grades 9-12",
    deadline: "2024-03-15",
    prize: "$10,000",
    status: "open",
    description: "Annual case competition focusing on strategic business challenges.",
    applicationType: "external",
    applyUrl: "https://hbs.edu/case-competition",
  },
  {
    id: 2,
    title: "Wharton High School Case Challenge",
    host: "Wharton School",
    logo: "/placeholder.svg?height=80&width=80",
    gradeEligibility: "Grades 10-12",
    deadline: "2024-02-28",
    prize: "$5,000",
    status: "closing-soon",
    description: "Intensive 3-day case competition with real business scenarios.",
    applicationType: "external",
    applyUrl: "https://wharton.upenn.edu/case-challenge",
  },
  {
    id: 3,
    title: "The Pitch Deck Championship",
    host: "The Pitch Deck",
    logo: "/placeholder.svg?height=80&width=80",
    gradeEligibility: "Grades 9-11",
    deadline: "2024-04-01",
    prize: "$15,000",
    status: "open",
    description: "Our flagship competition featuring the most challenging business cases.",
    applicationType: "internal",
    applyUrl: "/apply/pitch-deck",
  },
  {
    id: 4,
    title: "Stanford Business Case Competition",
    host: "Stanford Graduate School of Business",
    logo: "/placeholder.svg?height=80&width=80",
    gradeEligibility: "Grades 11-12",
    deadline: "2024-03-20",
    prize: "$7,500",
    status: "open",
    description: "Focus on innovation and entrepreneurship in business strategy.",
    applicationType: "external",
    applyUrl: "https://gsb.stanford.edu/case-competition",
  },
]

interface CompetitionGridProps {
  filters: {
    searchTerm: string
    gradeFilter: string
    statusFilter: string
  }
}

export function CompetitionGrid({ filters }: CompetitionGridProps) {
  // Filter competitions based on the provided filters
  const filteredCompetitions = competitions.filter((competition) => {
    const matchesSearch =
      competition.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      competition.host.toLowerCase().includes(filters.searchTerm.toLowerCase())

    const matchesGrade =
      !filters.gradeFilter ||
      filters.gradeFilter === "all" ||
      competition.gradeEligibility.toLowerCase().includes(filters.gradeFilter.toLowerCase())

    const matchesStatus =
      !filters.statusFilter || filters.statusFilter === "all" || competition.status === filters.statusFilter

    return matchesSearch && matchesGrade && matchesStatus
  })

  if (filteredCompetitions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No competitions found matching your criteria.</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters to see more results.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCompetitions.map((competition) => (
        <CompetitionCard key={competition.id} competition={competition} />
      ))}
    </div>
  )
}
