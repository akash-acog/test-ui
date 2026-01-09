"use client"

import { getProjectsByRole, mockAllocations, getEmployeesByRole, calculateEmployeeUtilization } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Users, Activity, TrendingUp } from "lucide-react"

interface ManagerDashboardPageProps {
  onViewEmployee: (id: string, from: string) => void
}

export function ManagerDashboardPage({ onViewEmployee }: ManagerDashboardPageProps) {
  const projects = getProjectsByRole("manager")
  const employees = getEmployeesByRole("manager")
  const allocations = mockAllocations

  const activeProjects = projects.filter((p) => p.status === "In Progress").length
  const teamSize = employees.length
  const teamUtilization = Math.round(
    employees.reduce((acc, emp) => acc + calculateEmployeeUtilization(emp.id), 0) / (employees.length || 1),
  )
  const pendingTasks = allocations.filter((a) => a.status === "pending").length

  const skillMap = new Map<string, number>()
  employees.forEach((emp) => {
    emp.skills.forEach((skill) => {
      const skillName = typeof skill === "string" ? skill : skill.name
      skillMap.set(skillName, (skillMap.get(skillName) || 0) + 1)
    })
  })
  const topSkills = Array.from(skillMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)

  const overAllocatedEmployees = employees.filter((emp) => {
    const utilization = calculateEmployeeUtilization(emp.id)
    return utilization > 100
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="text-muted-foreground">Project and resource management overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold">{activeProjects}</p>
            </div>
            <Briefcase className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <p className="text-3xl font-bold">{teamSize}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Utilization</p>
              <p className="text-3xl font-bold">{teamUtilization}%</p>
            </div>
            <Activity className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
              <p className="text-3xl font-bold">{pendingTasks}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Active Projects</h2>
          <div className="space-y-2">
            {projects.slice(0, 3).map((proj) => {
              const projAllocations = allocations.filter((a) => a.projectId === proj.id)
              const progress = projAllocations.length > 0 ? 65 : 0
              return (
                <div key={proj.id} className="pb-3 border-b last:border-b-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{proj.name}</span>
                    <span className="text-xs text-muted-foreground">{proj.status}</span>
                  </div>
                  {progress > 0 && (
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Team Skills</h2>
          <div className="space-y-2">
            {topSkills.map(([skill, count]) => (
              <div key={skill} className="flex justify-between text-sm">
                <span>{skill}</span>
                <span className="text-muted-foreground">{count} members</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Resource Conflicts</h2>
          <div className="space-y-2">
            {overAllocatedEmployees.length > 0 ? (
              overAllocatedEmployees.slice(0, 2).map((emp) => (
                <div key={emp.id} className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">Over 100% allocated</p>
                  <Button
                    variant="link"
                    size="sm"
                    className="mt-2 h-auto p-0"
                    onClick={() => onViewEmployee(emp.id, "dashboard")}
                  >
                    View Details
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No resource conflicts detected</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
