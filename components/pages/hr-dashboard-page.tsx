"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, UserPlus, Download, Settings, AlertCircle, Briefcase, TrendingUp, FileText, Target, Star } from "lucide-react"
import { mockEmployees, mockAllocations, calculateEmployeeUtilization, mockProjects } from "@/lib/mock-data"
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
    // TODO: Call API to create employee - POST /api/employees
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

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-6 card-hover cursor-pointer" onClick={() => onNavigate?.("employees")}>
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

        <Card className="border-border/50 bg-gradient-to-br from-chart-3/10 to-chart-3/5 p-6 card-hover cursor-pointer" onClick={() => onNavigate?.("employees")}>
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

        <Card className="border-border/50 bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-6 card-hover cursor-pointer" onClick={() => employeesWithMissingData.length > 0 && onViewEmployee?.(employeesWithMissingData[0]?.id)}>
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

      {/* Department Distribution & Skills Inventory */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Distribution */}
        <Card className="border-border/50 p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Department Distribution
            </h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.("employees")}>
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {departmentData.map((dept) => {
              const percentage = Math.round((dept.count / activeEmployees.length) * 100)
              return (
                <div key={dept.department} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{dept.department}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{dept.count} employees</span>
                      <Badge variant="outline" className="text-xs">{percentage}%</Badge>
                    </div>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </Card>

        {/* Top Skills Inventory */}
        <Card className="border-border/50 p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Top Skills Inventory
            </h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.("skill-matching")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {topSkills.map((skill, index) => (
              <div
                key={skill.name}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{skill.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {skill.Expert} Expert • {skill.Advanced} Advanced
                    </p>
                  </div>
                </div>
                <Badge className="bg-primary/10 text-primary">{skill.total}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Employment Type & Incomplete Profiles */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Employment Type
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Full Time</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{employmentTypeSplit.fullTime} employees</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round((employmentTypeSplit.fullTime / activeEmployees.length) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(employmentTypeSplit.fullTime / activeEmployees.length) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Intern</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">{employmentTypeSplit.intern} employees</span>
                  <Badge variant="outline" className="text-xs">
                    {Math.round((employmentTypeSplit.intern / activeEmployees.length) * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={(employmentTypeSplit.intern / activeEmployees.length) * 100} className="h-2" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Incomplete Profiles
            </h2>
            <Badge className="bg-orange-500/10 text-orange-600">{employeesWithMissingData.length}</Badge>
          </div>
          <div className="space-y-2">
            {employeesWithMissingData.slice(0, 5).map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewEmployee?.(emp.id)}
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.designation}</p>
                </div>
                <Badge variant="outline" className="text-xs text-orange-600">Incomplete</Badge>
              </div>
            ))}
            {employeesWithMissingData.length === 0 && (
              <p className="text-center text-muted-foreground py-8">All profiles complete</p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50 p-6 card-hover bg-gradient-to-br from-primary/5 to-transparent">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <Button variant="outline" className="justify-start" onClick={() => setShowAddEmployee(true)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Employee
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("employees")}>
            <Users className="h-4 w-4 mr-2" />
            View All Employees
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("skill-matching")}>
            <Target className="h-4 w-4 mr-2" />
            Skills Analysis
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("employees")}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </Card>

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
