"use client"

import { useRouter } from "next/navigation"
import { useRole } from "@/lib/role-context"
import { AllocationDashboardPage } from "@/components/pages/allocation-dashboard-page"

export default function AllocationsPage() {
  const router = useRouter()
  const { user } = useRole()

  if (!user) return null

  const handleViewEmployee = (id: string) => {
    router.push(`/employees/${id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Allocations</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Resource allocation and utilization overview</p>
      </div>

      <AllocationDashboardPage onViewEmployee={handleViewEmployee} userRole={user.role} />
    </div>
  )
}
