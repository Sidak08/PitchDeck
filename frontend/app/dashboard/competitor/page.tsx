"use client";

import { useState, useEffect } from "react";
import { CompetitorDashboard } from "@/components/dashboard/competitor-dashboard";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function CompetitorDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a minimal layout until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  return (
    <DashboardLayout role="competitor">
      <CompetitorDashboard />
    </DashboardLayout>
  );
}
