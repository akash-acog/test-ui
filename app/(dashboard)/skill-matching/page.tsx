"use client"

import { SkillMatchingPage } from "@/components/pages/skill-matching-page"
import { useRouter } from "next/navigation"

export default function SkillMatchingPage() {
  const router = useRouter()
  return <SkillMatchingPage onViewEmployee={(id) => router.push(`/employees/${id}`)} />
}
