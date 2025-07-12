import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Clock, Award } from "lucide-react"
import Link from "next/link"

// TODO: Replace with actual data from backend
const recentApplications = [
  {
    id: 1,
    competition: "Harvard Business School Case Competition",
    status: "pending",
    appliedDate: "2024-01-15",
    deadline: "2024-03-15",
  },
  {
    id: 2,
    competition: "The Pitch Deck Championship",
    status: "accepted",
    appliedDate: "2024-01-10",
    deadline: "2024-04-01",
  },
]

const upcomingDeadlines = [
  {
    id: 1,
    competition: "Wharton High School Case Challenge",
    deadline: "2024-02-28",
    daysLeft: 15,
  },
  {
    id: 2,
    competition: "Stanford Business Case Competition",
    deadline: "2024-03-20",
    daysLeft: 35,
  },
]

export function CompetitorDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
        <p className="text-gray-600">Here's what's happening with your case competitions.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitions Won</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This academic year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Prize Money</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,500</div>
            <p className="text-xs text-muted-foreground">Lifetime earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
          <CardDescription>Track the status of your competition applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{application.competition}</h4>
                  <p className="text-sm text-gray-600">
                    Applied on {new Date(application.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={application.status === "accepted" ? "default" : "secondary"}>
                    {application.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/dashboard/competitor/applications">
              <Button variant="outline" className="w-full bg-transparent">
                View All Applications
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Don't miss these application deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{deadline.competition}</h4>
                  <p className="text-sm text-gray-600">Deadline: {new Date(deadline.deadline).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={deadline.daysLeft <= 7 ? "destructive" : "secondary"}>
                    {deadline.daysLeft} days left
                  </Badge>
                  <Button size="sm">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/competitions">
              <Button variant="outline" className="w-full bg-transparent">
                Browse All Competitions
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
