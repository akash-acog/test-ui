"use client"

import { useState } from "react"
import { RoleProvider, useRole } from "@/lib/role-context"
import { Navigation } from "@/components/layout/navigation"
import { RoleSelector } from "@/components/layout/role-selector"
import { EmployeeListPage } from "@/components/pages/employee-list-page"
import { EmployeeDetailPage } from "@/components/pages/employee-detail-page"
import { ProjectManagementPage } from "@/components/pages/project-management-page"
import { AllocationDashboardPage } from "@/components/pages/allocation-dashboard-page"
import { ReportingPage } from "@/components/pages/reporting-page"
import { AdminDashboardPage } from "@/components/pages/admin-dashboard-page"
import { HRDashboardPage } from "@/components/pages/hr-dashboard-page"
import { ManagerDashboardPage } from "@/components/pages/manager-dashboard-page"
import { EmployeeDashboardPage } from "@/components/pages/employee-dashboard-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { ChecklistPage } from "@/components/pages/checklist-page"
import { SettingsPage } from "@/components/pages/settings-page"
import { canAccessPage } from "@/lib/role-config"
import { PerformanceRatingsPage } from "@/components/pages/performance-ratings-page"
import { SkillMatchingPage } from "@/components/pages/skill-matching-page"

const SHARED_EMPLOYEES = [
  {
    id: "1",
    code: "EMP001",
    name: "Sarah Anderson",
    email: "sarah.anderson@company.com",
    designation: "Senior Developer",
    department: "Engineering",
    location: "New York",
    type: "Full-time",
    joinDate: "2021-03-15",
    status: "Active",
    avatar: "SA",
  },
  {
    id: "2",
    code: "EMP002",
    name: "John Mitchell",
    email: "john.mitchell@company.com",
    designation: "Product Manager",
    department: "Product",
    location: "San Francisco",
    type: "Full-time",
    joinDate: "2022-06-20",
    status: "Active",
    avatar: "JM",
  },
  {
    id: "3",
    code: "EMP003",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@company.com",
    designation: "UX Designer",
    department: "Design",
    location: "Austin",
    type: "Full-time",
    joinDate: "2022-01-10",
    status: "Active",
    avatar: "ER",
  },
  {
    id: "4",
    code: "EMP004",
    name: "Alex Chen",
    email: "alex.chen@company.com",
    designation: "Junior Developer",
    department: "Engineering",
    location: "New York",
    type: "Full-time",
    joinDate: "2023-09-01",
    status: "Active",
    avatar: "AC",
  },
  {
    id: "5",
    code: "EMP005",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    designation: "HR Manager",
    department: "HR",
    location: "Boston",
    type: "Full-time",
    joinDate: "2021-11-15",
    status: "Active",
    avatar: "LT",
  },
]

function AppContent() {
  const { user } = useRole()
  const [currentPage, setCurrentPage] = useState<string>("dashboard")
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const [breadcrumb, setBreadcrumb] = useState<Array<{ label: string; page: string }>>([])

  const handleNavigate = (page: string) => {
    if (user && canAccessPage(user.role, page)) {
      setCurrentPage(page)
      setSelectedEmployeeId(null)
      setBreadcrumb([])
    }
  }

  const handleViewEmployee = (id: string, from?: string) => {
    if (user && canAccessPage(user.role, "employee-detail")) {
      setSelectedEmployeeId(id)
      setCurrentPage("employee-detail")
      if (from) {
        setBreadcrumb([{ label: from, page: from }])
      }
    }
  }

  const handleBack = () => {
    if (breadcrumb.length > 0) {
      setCurrentPage(breadcrumb[0].page)
      setBreadcrumb([])
    } else {
      setCurrentPage("employees")
    }
    setSelectedEmployeeId(null)
  }

  if (!user) return null

  const PageRenderer = () => {
    switch (currentPage) {
      case "dashboard":
        if (user.role === "admin") return <AdminDashboardPage onViewEmployee={handleViewEmployee} />
        if (user.role === "hr") return <HRDashboardPage />
        if (user.role === "manager") return <ManagerDashboardPage onViewEmployee={handleViewEmployee} />
        if (user.role === "employee") return <EmployeeDashboardPage currentUserId={user.id} />
        break
      case "employees":
        return <EmployeeListPage onViewEmployee={handleViewEmployee} userRole={user.role} />
      case "employee-detail":
        if (selectedEmployeeId)
          return (
            <EmployeeDetailPage
              employeeId={selectedEmployeeId}
              onBack={handleBack}
              onViewProject={(projectName) => {
                setCurrentPage("projects")
                setBreadcrumb([{ label: "Back to Employee", page: "employee-detail" }])
              }}
              userRole={user.role}
            />
          )
        break
      case "projects":
        return <ProjectManagementPage onViewEmployee={handleViewEmployee} userRole={user.role} />
      case "allocations":
        return <AllocationDashboardPage onViewEmployee={handleViewEmployee} userRole={user.role} />
      case "reporting":
        return <ReportingPage userRole={user.role} />
      case "ratings":
        return <PerformanceRatingsPage />
      case "skill-matching":
        return <SkillMatchingPage />
      case "profile":
        return <ProfilePage userRole={user.role} currentUserId={user.id} />
      case "checklist":
        return <ChecklistPage userRole={user.role} />
      case "settings":
        return <SettingsPage userRole={user.role} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} userRole={user.role} />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <div className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center px-6 lg:px-8 sticky top-0 z-40">
          <div className="flex-1 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Employee Management System</h1>
            <RoleSelector />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            <PageRenderer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <RoleProvider>
      <AppContent />
    </RoleProvider>
  )
}
