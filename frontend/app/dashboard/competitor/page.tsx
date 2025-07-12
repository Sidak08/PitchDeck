import { CompetitorDashboard } from "@/components/dashboard/competitor-dashboard"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"

export default function CompetitorDashboardPage() {
  return (
    <DashboardLayout role="competitor">
      <CompetitorDashboard />
    </DashboardLayout>
  )
}
