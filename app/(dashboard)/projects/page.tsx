"use client"

import { ProjectManagementPage } from "@/components/pages/project-management-page"
import { useRouter } from "next/navigation"

export default function ProjectsPage() {
  const router = useRouter()
  return <ProjectManagementPage onViewEmployee={(id) => router.push(`/employees/${id}`)} />
}
