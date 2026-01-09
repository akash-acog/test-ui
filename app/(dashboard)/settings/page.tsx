"use client"

import { useRole } from "@/lib/role-context"
import { SettingsPage } from "@/components/pages/settings-page"

export default function SettingsPageRoute() {
  const { user } = useRole()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Configure application preferences and options</p>
      </div>

      <SettingsPage userRole={user.role} />
    </div>
  )
}
