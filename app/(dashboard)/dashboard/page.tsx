"use client"

import { useRole } from "@/lib/role-context"
import { AdminDashboardPage } from "@/components/pages/admin-dashboard-page"
import { HRDashboardPage } from "@/components/pages/hr-dashboard-page"
import { ManagerDashboardPage } from "@/components/pages/manager-dashboard-page"
import { EmployeeDashboardPage } from "@/components/pages/employee-dashboard-page"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user } = useRole()
  const router = useRouter()

  if (!user) return null

  const handleViewEmployee = (id: string) => {
    router.push(`/employees/${id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Welcome back, {user.name}</p>
      </div>

      {user.role === "admin" && <AdminDashboardPage onViewEmployee={handleViewEmployee} />}
      {user.role === "hr" && <HRDashboardPage />}
      {user.role === "manager" && <ManagerDashboardPage onViewEmployee={handleViewEmployee} />}
      {user.role === "employee" && <EmployeeDashboardPage currentUserId={user.id} />}
    </div>
  )
}
