"use client"

import { ProfilePage } from "@/components/pages/profile-page"
import { useRole } from "@/lib/role-context"

export default function Page() {
  const { user } = useRole()
  return <ProfilePage userRole={user?.role || "employee"} currentUserId={user?.id || "1"} />
}
