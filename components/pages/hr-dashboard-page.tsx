"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, UserPlus, Download, Settings, AlertCircle, Briefcase, TrendingUp, FileText } from "lucide-react"
import { mockEmployees, mockAllocations, calculateEmployeeUtilization } from "@/lib/mock-data"

interface HRDashboardPageProps {
  onNavigate?: (page: string) => void
  onViewEmployee?: (id: string) => void
}

export function HRDashboardPage({ onNavigate, onViewEmployee }: HRDashboardPageProps) {
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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">HR Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Workforce planning and employee data management</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate?.("employees")} className="gap-2 bg-gradient-primary text-white border-0">
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

      {/* Missing Data Alert */}
      {employeesWithMissingData.length > 0 && (
        <Card className="border-orange-500/50 bg-orange-500/5 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">Missing Employee Data</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {employeesWithMissingData.length} employee(s) have incomplete profiles. Please update their information.
              </p>
              <div className="space-y-2">
                {employeesWithMissingData.slice(0, 5).map((emp) => {
                  const missingFields = []
                  if (!emp.phone) missingFields.push("Phone")
                  if (!emp.dob) missingFields.push("DOB")
                  if (!emp.address) missingFields.push("Address")
                  if (!emp.emergencyContact) missingFields.push("Emergency Contact")
                  if (emp.skills.length === 0) missingFields.push("Skills")

                  return (
                    <div
                      key={emp.id}
                      className="flex items-center justify-between p-3 bg-background rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => onViewEmployee?.(emp.id)}
                    >
                      <div>
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.code} • {emp.department}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 justify-end">
                        {missingFields.map((field) => (
                          <Badge key={field} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Employee Count by Department */}
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Employee Count by Department
          </h2>
          <div className="space-y-4">
            {departmentData.map((dept) => {
              const percentage = Math.round((dept.count / activeEmployees.length) * 100)
              return (
                <div key={dept.department} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{dept.department}</span>
                      <Badge variant="outline" className="text-xs">{dept.count}</Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </Card>

        {/* Employment Type Split */}
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Employment Type Split
          </h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Full Time</span>
                <span className="text-2xl font-bold text-primary">{employmentTypeSplit.fullTime}</span>
              </div>
              <Progress value={(employmentTypeSplit.fullTime / activeEmployees.length) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {Math.round((employmentTypeSplit.fullTime / activeEmployees.length) * 100)}% of workforce
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Interns</span>
                <span className="text-2xl font-bold text-chart-4">{employmentTypeSplit.intern}</span>
              </div>
              <Progress value={(employmentTypeSplit.intern / activeEmployees.length) * 100} className="h-3" />
              <p className="text-xs text-muted-foreground">
                {Math.round((employmentTypeSplit.intern / activeEmployees.length) * 100)}% of workforce
              </p>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Total Active</span>
                <span className="text-xl font-bold text-foreground">{activeEmployees.length}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Skills Inventory Summary */}
      <Card className="border-border/50 p-6 card-hover">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Skills Inventory Summary
          </h2>
          <Button variant="outline" size="sm" onClick={() => onNavigate?.("settings")}>
            Manage Taxonomy
          </Button>
        </div>
        <div className="space-y-4">
          {topSkills.map((skill) => (
            <div key={skill.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{skill.name}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-chart-3">Expert: {skill.Expert}</span>
                  <span className="text-primary">Adv: {skill.Advanced}</span>
                  <span className="text-chart-4">Int: {skill.Intermediate}</span>
                  <span className="text-muted-foreground">Beg: {skill.Beginner}</span>
                  <Badge variant="outline" className="ml-2">{skill.total}</Badge>
                </div>
              </div>
              <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                <div className="bg-chart-3" style={{ width: `${(skill.Expert / skill.total) * 100}%` }} />
                <div className="bg-primary" style={{ width: `${(skill.Advanced / skill.total) * 100}%` }} />
                <div className="bg-chart-4" style={{ width: `${(skill.Intermediate / skill.total) * 100}%` }} />
                <div className="bg-muted-foreground/30" style={{ width: `${(skill.Beginner / skill.total) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Unallocated Employees */}
        <Card className="border-border/50 p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              Unallocated Employees
            </h2>
            <Badge className="bg-chart-3/10 text-chart-3">{unallocatedEmployees.length}</Badge>
          </div>
          <div className="space-y-3">
            {unallocatedEmployees.slice(0, 6).map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewEmployee?.(emp.id)}
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.designation} • {emp.department}</p>
                </div>
                <Badge className="bg-chart-3/10 text-chart-3">0% Utilized</Badge>
              </div>
            ))}
            {unallocatedEmployees.length === 0 && (
              <p className="text-center text-muted-foreground py-8">All employees are allocated</p>
            )}
          </div>
        </Card>

        {/* New Joiners */}
        <Card className="border-border/50 p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-primary" />
              New Joiners
              <Badge variant="secondary" className="ml-2">Last 30 Days</Badge>
            </h2>
          </div>
          <div className="space-y-3">
            {newJoiners.map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => onViewEmployee?.(emp.id)}
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {emp.designation} • {emp.department}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(emp.joinDate).toLocaleDateString()}
                </span>
              </div>
            ))}
            {newJoiners.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No new joiners in the last 30 days</p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-border/50 p-6 card-hover bg-gradient-to-br from-primary/5 to-transparent">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("employees")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Employee
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("employees")}>
            <Users className="h-4 w-4 mr-2" />
            Update Employee Details
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("employees")}>
            <Download className="h-4 w-4 mr-2" />
            Export Employee List
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("settings")}>
            <Settings className="h-4 w-4 mr-2" />
            Manage Skills Taxonomy
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("allocations")}>
            <Briefcase className="h-4 w-4 mr-2" />
            View Allocation Reports
          </Button>
        </div>
      </Card>
    </div>
  )
}
