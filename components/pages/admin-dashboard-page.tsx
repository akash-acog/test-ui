"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Users, Briefcase, Activity, Settings, UserPlus, FolderPlus, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { mockEmployees, mockProjects, mockAllocations, calculateEmployeeUtilization } from "@/lib/mock-data"
import { AddEmployeeForm } from "@/components/forms/add-employee-form"
import { AddProjectForm } from "@/components/forms/add-project-form"

interface AdminDashboardPageProps {
  onNavigate?: (page: string) => void
  onViewEmployee?: (id: string) => void
}

export function AdminDashboardPage({ onNavigate, onViewEmployee }: AdminDashboardPageProps) {
  const [showAddEmployee, setShowAddEmployee] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)

  // Calculate stats
  const activeEmployees = mockEmployees.filter((emp) => emp.status === "Active").length
  const totalEmployees = mockEmployees.length
  
  const projectsByStatus = {
    planned: mockProjects.filter((p) => p.status === "Planned").length,
    active: mockProjects.filter((p) => p.status === "Active").length,
    completed: mockProjects.filter((p) => p.status === "Completed").length,
  }

  // Allocation overview
  const allocationStats = mockEmployees.reduce(
    (acc, emp) => {
      const utilization = calculateEmployeeUtilization(emp.id)
      if (utilization === 0) acc.free++
      else if (utilization === 100) acc.fullyAllocated++
      else acc.partiallyAllocated++
      return acc
    },
    { free: 0, partiallyAllocated: 0, fullyAllocated: 0 }
  )

  // Recent activity (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  
  const recentAllocations = mockAllocations
    .filter((a) => new Date(a.startDate) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 5)

  const recentEmployees = mockEmployees
    .filter((emp) => new Date(emp.joinDate) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime())
    .slice(0, 3)

  const recentProjects = mockProjects
    .filter((p) => p.status === "Completed" && p.endDate && new Date(p.endDate) >= sevenDaysAgo)
    .sort((a, b) => new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime())
    .slice(0, 3)

  const handleEmployeeSubmit = (data: any) => {
    console.log("Creating new employee:", data)
    // TODO: Call API - POST /api/employees
    setShowAddEmployee(false)
    // TODO: Show success toast
    // TODO: Refresh employee list
  }

  const handleProjectSubmit = (data: any) => {
    console.log("Creating new project:", data)
    // TODO: Call API - POST /api/projects
    setShowAddProject(false)
    // TODO: Show success toast
    // TODO: Refresh project list
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">System overview and quick access to management functions</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAddEmployee(true)} className="gap-2 bg-gradient-primary text-white border-0">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
          <Button onClick={() => setShowAddProject(true)} variant="outline" className="gap-2">
            <FolderPlus className="h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Key Metrics - Total Employees & Projects */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-6 card-hover cursor-pointer" onClick={() => onNavigate?.("employees")}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Employees</p>
              <p className="text-4xl font-bold text-foreground">{activeEmployees}</p>
              <p className="text-xs text-muted-foreground">Active workforce</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-3/10 to-chart-3/5 p-6 card-hover cursor-pointer" onClick={() => onNavigate?.("projects")}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Active Projects</p>
              <p className="text-4xl font-bold text-foreground">{projectsByStatus.active}</p>
              <div className="flex gap-2 text-xs">
                <span className="text-muted-foreground">{projectsByStatus.planned} Planned</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{projectsByStatus.completed} Done</span>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-4/10 to-chart-4/5 p-6 card-hover cursor-pointer" onClick={() => onNavigate?.("projects")}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Total Projects</p>
              <p className="text-4xl font-bold text-foreground">{mockProjects.length}</p>
              <div className="flex gap-3 text-xs">
                <Badge variant="outline" className="text-xs">
                  <Activity className="h-3 w-3 mr-1" />
                  {projectsByStatus.active} Active
                </Badge>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-chart-4" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">System Health</p>
              <p className="text-4xl font-bold text-chart-3">Good</p>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-chart-3" />
            </div>
          </div>
        </Card>
      </div>

      {/* Allocation Overview */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          Allocation Overview
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-border/50 p-6 card-hover bg-chart-3/5 cursor-pointer" onClick={() => onNavigate?.("allocations")}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Free (0% Utilization)</p>
                <CheckCircle className="h-5 w-5 text-chart-3" />
              </div>
              <p className="text-3xl font-bold text-chart-3">{allocationStats.free}</p>
              <p className="text-xs text-muted-foreground">Employees ready for allocation</p>
            </div>
          </Card>

          <Card className="border-border/50 p-6 card-hover bg-primary/5 cursor-pointer" onClick={() => onNavigate?.("allocations")}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Partially Allocated</p>
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <p className="text-3xl font-bold text-primary">{allocationStats.partiallyAllocated}</p>
              <p className="text-xs text-muted-foreground">Employees with 1-99% utilization</p>
            </div>
          </Card>

          <Card className="border-border/50 p-6 card-hover bg-chart-4/5 cursor-pointer" onClick={() => onNavigate?.("allocations")}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Fully Allocated</p>
                <AlertCircle className="h-5 w-5 text-chart-4" />
              </div>
              <p className="text-3xl font-bold text-chart-4">{allocationStats.fullyAllocated}</p>
              <p className="text-xs text-muted-foreground">Employees at 100% capacity</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 p-6 card-hover">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            User Management
          </h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setShowAddEmployee(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Employee
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate?.("settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Assign Roles & Permissions
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate?.("employees")}
            >
              <Users className="h-4 w-4 mr-2" />
              Manage All Users
            </Button>
          </div>
        </Card>

        <Card className="border-border/50 p-6 card-hover">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Project Management
          </h3>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setShowAddProject(true)}
            >
              <FolderPlus className="h-4 w-4 mr-2" />
              Create New Project
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate?.("projects")}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              View All Projects
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => onNavigate?.("allocations")}
            >
              <Activity className="h-4 w-4 mr-2" />
              Manage Allocations
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border/50 p-6 card-hover">
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-primary" />
          Recent Activity
          <Badge variant="secondary" className="ml-2">Last 7 Days</Badge>
        </h2>

        <div className="space-y-6">
          {/* Recent Allocations */}
          {recentAllocations.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Latest Allocations
              </h3>
              <div className="space-y-2">
                {recentAllocations.map((alloc) => {
                  const employee = mockEmployees.find((e) => e.id === alloc.employee)
                  const project = mockProjects.find((p) => p.id === alloc.project)
                  return (
                    <div
                      key={alloc.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            <span className="text-primary cursor-pointer hover:underline" onClick={() => onViewEmployee?.(alloc.employee)}>
                              {employee?.name}
                            </span>
                            {" "}allocated to{" "}
                            <span className="text-primary">{project?.name}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alloc.allocationPercent}% • {new Date(alloc.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge variant={alloc.billable ? "default" : "secondary"}>
                        {alloc.billable ? "Billable" : "Non-billable"}
                      </Badge>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Recent Employees */}
          {recentEmployees.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                New Employees
              </h3>
              <div className="space-y-2">
                {recentEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onViewEmployee?.(emp.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                        <UserPlus className="h-4 w-4 text-chart-3" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {emp.designation} • {emp.department}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(emp.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Completed Projects */}
          {recentProjects.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Completed Projects
              </h3>
              <div className="space-y-2">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => onNavigate?.("projects")}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-chart-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{project.name}</p>
                        <p className="text-xs text-muted-foreground">{project.code}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {project.endDate && new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recentAllocations.length === 0 && recentEmployees.length === 0 && recentProjects.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No recent activity in the last 7 days</p>
          )}
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

      {/* Add Project Dialog */}
      <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <AddProjectForm
            onSubmit={handleProjectSubmit}
            onCancel={() => setShowAddProject(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
