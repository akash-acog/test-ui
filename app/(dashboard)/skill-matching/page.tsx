"use client"

import { useRole } from "@/lib/role-context"
import { SkillMatchingPage } from "@/components/pages/skill-matching-page"

export default function SkillMatchingPageRoute() {
  const { user } = useRole()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Skill Matching</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Match skills with project requirements</p>
      </div>

      <SkillMatchingPage />
    </div>
  )
}
