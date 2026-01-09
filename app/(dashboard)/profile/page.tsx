"use client"

import { ProfilePage } from "@/components/pages/profile-page"
import { useRole } from "@/lib/role-context"

export default function ProfilePageRoute() {
  const { user } = useRole()
  if (!user) return null
  return <ProfilePage currentUserId={user.id} />
}
