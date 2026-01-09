"use client"

import { EmployeeListPage } from "@/components/pages/employee-list-page"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()
  return <EmployeeListPage onViewEmployee={(id) => router.push(`/employees/${id}`)} />
}
