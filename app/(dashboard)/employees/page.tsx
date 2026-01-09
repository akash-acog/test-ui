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

  return <EmployeeListPage onViewEmployee={handleViewEmployee} userRole={user.role} />
}
