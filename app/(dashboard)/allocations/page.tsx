"use client"

import { AllocationDashboardPage } from "@/components/pages/allocation-dashboard-page"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return (
    <AllocationDashboardPage
      onViewEmployee={(id, from) => router.push(`/employees/${id}?from=${from}`)}
    />
  )
}
