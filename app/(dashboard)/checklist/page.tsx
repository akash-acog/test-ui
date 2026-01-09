"use client"

import { ChecklistPage } from "@/components/pages/checklist-page"
import { useRole } from "@/lib/role-context"

export default function Page() {
  const { user } = useRole()
  return <ChecklistPage userRole={user?.role || "employee"} />
}
