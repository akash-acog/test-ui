"use client"

import { useRole } from "@/lib/role-context"
import { ProfilePage } from "@/components/pages/profile-page"

export default function ProfilePageRoute() {
  const { user } = useRole()

  if (!user) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Profile</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your personal information and preferences</p>
      </div>

      <ProfilePage userRole={user.role} currentUserId={user.id} />
    </div>
  )
}
