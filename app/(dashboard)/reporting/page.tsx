"use client"

import { useRole } from "@/lib/role-context"
import { ReportingPage } from "@/components/pages/reporting-page"

export default function ReportingPageRoute() {
  const { user } = useRole()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reporting</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Generate and view comprehensive reports</p>
      </div>

      <ReportingPage userRole={user.role} />
    </div>
  )
}
