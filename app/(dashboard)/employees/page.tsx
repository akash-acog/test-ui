"use client"

import { useRouter } from "next/navigation"
import { useRole } from "@/lib/role-context"
import { EmployeeListPage } from "@/components/pages/employee-list-page"

export default function EmployeesPage() {
  const router = useRouter()
  const { user } = useRole()

  if (!user) return null

  const handleViewEmployee = (id: string) => {
    router.push(`/employees/${id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Employees</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your team members and their details</p>
      </div>

      <EmployeeListPage onViewEmployee={handleViewEmployee} userRole={user.role} />
    </div>
  )
}
