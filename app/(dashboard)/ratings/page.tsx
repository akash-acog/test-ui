"use client"

import { useRole } from "@/lib/role-context"
import { PerformanceRatingsPage } from "@/components/pages/performance-ratings-page"

export default function RatingsPageRoute() {
  const { user } = useRole()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Performance Ratings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Track and manage employee performance reviews</p>
      </div>

      <PerformanceRatingsPage />
    </div>
  )
}
