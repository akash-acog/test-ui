"use client"

import { useRole } from "@/lib/role-context"
import { ChecklistPage } from "@/components/pages/checklist-page"

export default function ChecklistPageRoute() {
  const { user } = useRole()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Checklist</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Track onboarding and task completion</p>
      </div>

      <ChecklistPage userRole={user.role} />
    </div>
  )
}
