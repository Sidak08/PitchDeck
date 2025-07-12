"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Trophy, Users, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Competition {
  id: number
  title: string
  host: string
  logo: string
  gradeEligibility: string
  deadline: string
  prize: string
  status: "open" | "closing-soon" | "closed"
  description: string
  applicationType: "internal" | "external"
  applyUrl: string
}

interface CompetitionCardProps {
  competition: Competition
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800"
      case "closing-soon":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={competition.logo || "/placeholder.svg"}
              alt={`${competition.host} logo`}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div>
              <h3 className="font-semibold text-lg line-clamp-2">{competition.title}</h3>
              <p className="text-sm text-gray-600">{competition.host}</p>
            </div>
          </div>
          <Badge className={getStatusColor(competition.status)}>{competition.status.replace("-", " ")}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">{competition.description}</p>

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
        <div className="flex space-x-2 w-full">
          <Link href={`/competitions/${competition.id}`} className="flex-1">
            <Button variant="outline" className="w-full bg-transparent">
              View Details
            </Button>
          </Link>
          {competition.applicationType === "internal" ? (
            <Link href={competition.applyUrl} className="flex-1">
              <Button className="w-full">Apply Now</Button>
            </Link>
          ) : (
            <a href={competition.applyUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full">
                Apply
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
