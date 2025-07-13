import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// TODO: Replace with actual data from backend
const pastWinners = [
  {
    id: 1,
    name: "Sarah Chen",
    competition: "Harvard Business School Case Competition 2023",
    image: "/placeholder.svg?height=200&width=200",
    prize: "$5,000",
    school: "Phillips Academy",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    competition: "Wharton High School Case Challenge",
    image: "/placeholder.svg?height=200&width=200",
    prize: "$3,000",
    school: "Stuyvesant High School",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    competition: "Stanford Business Case Competition",
    image: "/placeholder.svg?height=200&width=200",
    prize: "$4,000",
    school: "Thomas Jefferson High School",
  },
  {
    id: 4,
    name: "David Kim",
    competition: "MIT Sloan Case Competition",
    image: "/placeholder.svg?height=200&width=200",
    prize: "$2,500",
    school: "Bronx Science",
  },
];

export function PastWinnersSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 dark:text-card-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 dark:text-card-foreground">
            Celebrating Our Champions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
            Meet the talented students who have excelled in case competitions
            and made their mark in the business world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pastWinners.map((winner) => (
            <Card
              key={winner.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <Image
                    src={winner.image || "/placeholder.svg"}
                    alt={winner.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {winner.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{winner.school}</p>
                <p className="text-sm font-medium text-primary mb-3">
                  {winner.competition}
                </p>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  {winner.prize} Winner
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
