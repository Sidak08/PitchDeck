import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Users, Trophy, Calendar, BarChart3 } from "lucide-react"
import Link from "next/link"

// TODO: Replace with actual data from backend
const myCompetitions = [
  {
    id: 1,
    title: "Spring Business Case Challenge",
    status: "active",
    applications: 45,
    deadline: "2024-03-15",
    prize: "$5,000",
  },
  {
    id: 2,
    title: "Innovation Case Competition",
    status: "draft",
    applications: 0,
    deadline: "2024-04-20",
    prize: "$3,000",
  },
]

export function OrganizerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organizer Dashboard</h1>
          <p className="text-gray-600">Manage your case competitions and track applications.</p>
        </div>
        <Link href="/dashboard/organizer/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Competition
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">Across all competitions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">New applications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">Application to completion</p>
          </CardContent>
        </Card>
      </div>

      {/* My Competitions */}
      <Card>
        <CardHeader>
          <CardTitle>My Competitions</CardTitle>
          <CardDescription>Manage and track your case competitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myCompetitions.map((competition) => (
              <div key={competition.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{competition.title}</h4>
                  <p className="text-sm text-gray-600">
                    {competition.applications} applications • Deadline:{" "}
                    {new Date(competition.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Prize: {competition.prize}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={competition.status === "active" ? "default" : "secondary"}>
                    {competition.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link href="/dashboard/organizer/competitions">
              <Button variant="outline" className="w-full bg-transparent">
                View All Competitions
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
