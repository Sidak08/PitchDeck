import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Trophy, Star } from "lucide-react";

// TODO: Replace with actual data from backend
const pastWinners = [
  {
    id: 1,
    name: "Sarah Chen",
    competition: "Harvard Business School Case Competition 2023",
    image: "/images/winner1.jpg",
    prize: "$5,000",
    school: "Phillips Academy",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    competition: "Wharton High School Case Challenge",
    image: "/images/winner2.jpg",
    prize: "$3,000",
    school: "Stuyvesant High School",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    competition: "Stanford Business Case Competition",
    image: "/images/winner3.jpg",
    prize: "$4,000",
    school: "Thomas Jefferson High School",
  },
  {
    id: 4,
    name: "David Kim",
    competition: "MIT Sloan Case Competition",
    image: "/images/winner4.jpg",
    prize: "$2,500",
    school: "Bronx Science",
  },
];

export function PastWinnersSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gradient-to-br dark:from-[#152a45] dark:via-[#193252] dark:to-[#1d3a5f] dark:text-white relative">
      <div className="absolute inset-0 opacity-10 bg-[url('/images/winner-celebration.jpg')] bg-cover bg-center mix-blend-overlay"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-[#19613F] mr-3" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4 dark:text-white">
            Celebrating Our <span className="text-[#19613F]">Champions</span>
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto dark:text-gray-200">
            Meet the talented students who have excelled in case competitions
            and made their mark in the business world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pastWinners.map((winner) => (
            <Card
              key={winner.id}
              className="hover:shadow-xl transition-all duration-300 border-[#19613F]/20 hover:scale-105 bg-white dark:bg-[#1a3047]/90 dark:border-[#2CA15F]/20 dark:hover:shadow-[0_0_15px_rgba(44,161,95,0.3)]"
            >
              <CardContent className="p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 ring-4 ring-[#2CA15F] rounded-full">
                  <Image
                    src={winner.image || "/placeholder.svg"}
                    alt={winner.name}
                    fill
                    className="rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#19613F] rounded-full p-1">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-black mb-2 dark:text-white">
                  {winner.name}
                </h3>
                <p className="text-sm text-[#19613F] font-medium mb-2 dark:text-[#2CA15F]">
                  {winner.school}
                </p>
                <p className="text-sm font-medium mb-3 text-black dark:text-gray-300">
                  {winner.competition}
                </p>
                <Badge
                  variant="secondary"
                  className="bg-[#2CA15F]/20 text-[#19613F] dark:bg-[#2CA15F]/30 dark:text-white"
                >
                  <Trophy className="h-3 w-3 mr-1" /> {winner.prize} Winner
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
