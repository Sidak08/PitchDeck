"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Trophy, Download, Eye } from "lucide-react"

// TODO: Replace with actual data from backend
const pitchDeckApplications = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@email.com",
    school: "Phillips Academy",
    grade: "11",
    submittedDate: "2024-01-20",
    status: "pending",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@email.com",
    school: "Stuyvesant High School",
    grade: "12",
    submittedDate: "2024-01-18",
    status: "reviewed",
  },
]

export function AdminDashboard() {
  const handleExportApplications = () => {
    // TODO: Implement CSV export functionality
    console.log("Exporting applications...")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage The Pitch Deck platform and applications.</p>
        </div>
        <Button onClick={handleExportApplications}>
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Across all organizers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pitch Deck Applications</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">For our competition</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23%</div>
            <p className="text-xs text-muted-foreground">User registration</p>
          </CardContent>
        </Card>
      </div>

      {/* Pitch Deck Applications */}
      <Card>
        <CardHeader>
          <CardTitle>The Pitch Deck Competition Applications</CardTitle>
          <CardDescription>Review and manage applications for our flagship competition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pitchDeckApplications.map((application) => (
              <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">{application.name}</h4>
                  <p className="text-sm text-gray-600">{application.email}</p>
                  <p className="text-sm text-gray-600">
                    {application.school} • Grade {application.grade} • Submitted{" "}
                    {new Date(application.submittedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={application.status === "reviewed" ? "default" : "secondary"}>
                    {application.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex space-x-3">
            <Button variant="outline" className="flex-1 bg-transparent">
              View All Applications
            </Button>
            <Button onClick={handleExportApplications} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export Applications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
