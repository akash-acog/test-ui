"use client"

import { useRouter } from "next/navigation"
import { useRole } from "@/lib/role-context"
import { EmployeeDetailPage } from "@/components/pages/employee-detail-page"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function EmployeeDetailPageRoute({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useRole()

  if (!user) return null

  const handleBack = () => {
    router.back()
  }

  const handleViewProject = (projectName: string) => {
    router.push("/projects")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={handleBack} className="rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Employee Details</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">View and manage employee information</p>
        </div>
      </div>

      <EmployeeDetailPage
        employeeId={params.id}
        onBack={handleBack}
        onViewProject={handleViewProject}
        userRole={user.role}
      />
    </div>
  )
}
