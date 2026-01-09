"use client"

import { AllocationDashboardPage } from "@/components/pages/allocation-dashboard-page"
import { useRouter } from "next/navigation"

export default function AllocationsPage() {
  const router = useRouter()
  return <AllocationDashboardPage onViewEmployee={(id) => router.push(`/employees/${id}`)} />
}
