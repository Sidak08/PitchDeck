import { OrganizerDashboard } from "@/components/dashboard/organizer-dashboard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function OrganizerDashboardPage() {
  return (
    <DashboardLayout role="organizer">
      <OrganizerDashboard />
    </DashboardLayout>
  )
}
