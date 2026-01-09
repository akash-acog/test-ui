"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, UserPlus, Download, Settings, AlertCircle, Briefcase, TrendingUp, FileText } from "lucide-react"
import { mockEmployees, mockAllocations, calculateEmployeeUtilization } from "@/lib/mock-data"
import { AddEmployeeForm } from "@/components/forms/add-employee-form"

interface HRDashboardPageProps {
  onNavigate?: (page: string) => void
  onViewEmployee?: (id: string) => void
}

export function HRDashboardPage({ onNavigate, onViewEmployee }: HRDashboardPageProps) {
  const [showAddEmployee, setShowAddEmployee] = useState(false)

  // Employee counts
  const activeEmployees = mockEmployees.filter((emp) => emp.status === "Active")
  const totalEmployees = mockEmployees.length

  // Department breakdown
  const departmentStats = activeEmployees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const departmentData = Object.entries(departmentStats)
    .map(([dept, count]) => ({ department: dept, count }))
    .sort((a, b) => b.count - a.count)

  // Skills inventory summary
  const skillsInventory = activeEmployees.reduce((acc, emp) => {
    emp.skills.forEach((skill) => {
      if (!acc[skill.name]) {
        acc[skill.name] = { total: 0, Expert: 0, Advanced: 0, Intermediate: 0, Beginner: 0 }
      }
      acc[skill.name].total++
      acc[skill.name][skill.proficiency as keyof typeof acc[string]]++
    })
    return acc
  }, {} as Record<string, { total: number; Expert: number; Advanced: number; Intermediate: number; Beginner: number }>)

  const topSkills = Object.entries(skillsInventory)
    .map(([name, stats]) => ({ name, ...stats }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  // Unallocated employees (0% utilization)
  const unallocatedEmployees = activeEmployees.filter((emp) => calculateEmployeeUtilization(emp.id) === 0)

  // New joiners (last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const newJoiners = activeEmployees.filter((emp) => new Date(emp.joinDate) >= thirtyDaysAgo)

  // Employment type split
  const employmentTypeSplit = activeEmployees.reduce(
    (acc, emp) => {
      if (emp.type === "Full Time") acc.fullTime++
      else if (emp.type === "Intern") acc.intern++
      return acc
    },
    { fullTime: 0, intern: 0 }
  )

  // Missing data - employees with incomplete profiles
  const employeesWithMissingData = activeEmployees.filter((emp) => {
    return (
      !emp.phone ||
      !emp.dob ||
      !emp.address ||
      !emp.emergencyContact ||
      emp.skills.length === 0
    )
  })

  const handleEmployeeSubmit = (data: any) => {
    console.log("Creating new employee:", data)
    // TODO: Call API to create employee
    // POST /api/employees
    setShowAddEmployee(false)
    // TODO: Show success toast
    // TODO: Refresh employees list
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">HR Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Workforce planning and employee data management</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddEmployee(true)} className="gap-2 bg-gradient-primary text-white border-0">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
          <Button onClick={() => onNavigate?.("employees")} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export List
          </Button>
        </div>
      </div>

      {/* Rest of the dashboard content... */}
      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Employees</p>
              <p className="text-4xl font-bold text-foreground">{activeEmployees.length}</p>
              <p className="text-xs text-muted-foreground">Active workforce</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-3/10 to-chart-3/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Unallocated</p>
              <p className="text-4xl font-bold text-foreground">{unallocatedEmployees.length}</p>
              <p className="text-xs text-muted-foreground">Available for projects</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-4/10 to-chart-4/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">New Joiners</p>
              <p className="text-4xl font-bold text-foreground">{newJoiners.length}</p>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-chart-4" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-6 card-hover cursor-pointer" onClick={() => onViewEmployee?.(employeesWithMissingData[0]?.id)}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Incomplete Profiles</p>
              <p className="text-4xl font-bold text-orange-600">{employeesWithMissingData.length}</p>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Rest of widgets unchanged... */}

      {/* Add Employee Dialog */}
      <Dialog open={showAddEmployee} onOpenChange={setShowAddEmployee}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <AddEmployeeForm
            onSubmit={handleEmployeeSubmit}
            onCancel={() => setShowAddEmployee(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
