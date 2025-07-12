import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Calendar, School } from "lucide-react"
import Image from "next/image"

// TODO: Replace with actual data from backend
const winners = [
  {
    id: 1,
    name: "Sarah Chen",
    school: "Phillips Academy",
    grade: "11",
    competition: "Harvard Business School Case Competition 2023",
    year: "2023",
    prize: "$5,000",
    category: "First Place",
    image: "/placeholder.svg?height=200&width=200",
    caseTitle: "Digital Transformation in Retail",
    quote:
      "This competition opened my eyes to the world of strategic consulting and helped me discover my passion for business strategy.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    school: "Stuyvesant High School",
    grade: "12",
    competition: "Wharton High School Case Challenge",
    year: "2023",
    prize: "$3,000",
    category: "First Place",
    image: "/placeholder.svg?height=200&width=200",
    caseTitle: "Sustainable Supply Chain Management",
    quote:
      "The experience taught me how to think critically about complex business problems and work effectively in a team.",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    school: "Thomas Jefferson High School",
    grade: "10",
    competition: "Stanford Business Case Competition",
    year: "2023",
    prize: "$4,000",
    category: "First Place",
    image: "/placeholder.svg?height=200&width=200",
    caseTitle: "Tech Startup Scaling Strategy",
    quote:
      "Competing against students from around the world pushed me to excel and gave me confidence in my abilities.",
  },
  {
    id: 4,
    name: "David Kim",
    school: "Bronx Science",
    grade: "11",
    competition: "MIT Sloan Case Competition",
    year: "2023",
    prize: "$2,500",
    category: "Second Place",
    image: "/placeholder.svg?height=200&width=200",
    caseTitle: "Healthcare Innovation Strategy",
    quote: "The competition connected me with mentors who continue to guide my academic and career journey.",
  },
  {
    id: 5,
    name: "Aisha Patel",
    school: "Lakeside School",
    grade: "12",
    competition: "The Pitch Deck Championship",
    year: "2022",
    prize: "$15,000",
    category: "Grand Prize Winner",
    image: "/placeholder.svg?height=200&width=200",
    caseTitle: "Global Market Entry Strategy",
    quote: "Winning The Pitch Deck Championship was a life-changing experience that opened doors to top universities.",
  },
  {
    id: 6,
    name: "James Wilson",
    school: "Exeter Academy",
    grade: "11",
    competition: "Chicago Booth Case Competition",
    year: "2022",
    prize: "$3,500",
    category: "First Place",
    image: "/placeholder.svg?height=200&width=200",
    caseTitle: "Financial Services Innovation",
    quote: "The rigorous analysis required for this competition prepared me for advanced coursework and internships.",
  },
]

const stats = [
  { label: "Total Winners", value: "150+", icon: Trophy },
  { label: "Prize Money Awarded", value: "$500K+", icon: Award },
  { label: "Competitions Hosted", value: "75+", icon: Calendar },
  { label: "Partner Schools", value: "50+", icon: School },
]

export default function WinnersPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="gradient-text">Celebrating Our Champions</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Meet the exceptional students who have excelled in case competitions and are shaping the future of business.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
                  <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Winners Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Recent Winners</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These outstanding students have demonstrated exceptional analytical skills, creativity, and leadership in
              their competitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {winners.map((winner) => (
              <Card key={winner.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={winner.image || "/placeholder.svg"}
                        alt={winner.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{winner.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {winner.school} • Grade {winner.grade}
                      </p>
                      <Badge
                        variant={winner.category === "Grand Prize Winner" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {winner.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{winner.competition}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{winner.caseTitle}</p>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{winner.year}</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{winner.prize}</span>
                    </div>

                    <blockquote className="text-sm text-gray-600 dark:text-gray-300 italic border-l-4 border-primary pl-3">
                      "{winner.quote}"
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Join Our Winners?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start your journey today by exploring our competitions and taking the first step toward business excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/competitions"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 transition-colors"
            >
              Browse Competitions
            </a>
            <a
              href="/apply/pitch-deck"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary transition-colors"
            >
              Apply to The Pitch Deck
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
