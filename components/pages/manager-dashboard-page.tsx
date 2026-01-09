"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Briefcase, TrendingUp, AlertTriangle, Plus, Calendar, Target, Star, UserPlus, Clock } from "lucide-react"
import { mockEmployees, mockProjects, mockAllocations, calculateEmployeeUtilization } from "@/lib/mock-data"

interface ManagerDashboardPageProps {
  onNavigate?: (page: string) => void
  onViewEmployee?: (id: string) => void
  managerId?: string
}

export function ManagerDashboardPage({ onNavigate, onViewEmployee, managerId = "1" }: ManagerDashboardPageProps) {
  // Get manager's projects
  const myProjects = mockProjects.filter((p) => p.manager === managerId)
  const activeProjects = myProjects.filter((p) => p.status === "Active")
  const criticalProjects = myProjects.filter((p) => ["High", "Critical"].includes(p.priority))
  
  // Get team members (employees reporting to this manager)
  const teamMembers = mockEmployees.filter((emp) => emp.reportingManagerId === managerId)
  
  // Calculate team allocation
  const teamAllocationStats = teamMembers.map((emp) => ({
    employee: emp,
    utilization: calculateEmployeeUtilization(emp.id),
    allocations: mockAllocations.filter((a) => {
      const today = new Date()
      const startDate = new Date(a.startDate)
      const endDate = a.endDate ? new Date(a.endDate) : null
      return a.employee === emp.id && startDate <= today && (!endDate || endDate >= today)
    }),
  }))

  const availableEmployees = teamAllocationStats.filter((t) => t.utilization < 100)
  const avgTeamUtilization = teamMembers.length > 0
    ? Math.round(teamAllocationStats.reduce((sum, t) => sum + t.utilization, 0) / teamMembers.length)
    : 0

  // Upcoming project completions (within 30 days)
  const thirtyDaysFromNow = new Date()
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
  const upcomingCompletions = myProjects.filter((p) => {
    if (!p.endDate || p.status === "Completed") return false
    const endDate = new Date(p.endDate)
    return endDate <= thirtyDaysFromNow && endDate >= new Date()
  })

  // Pending performance ratings (completed projects without ratings)
  const completedProjects = myProjects.filter((p) => p.status === "Completed")
  // For demo, assuming 3 pending ratings
  const pendingRatings = 3

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Quick Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Manager Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">Project management and resource allocation oversight</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => onNavigate?.("projects")} className="gap-2 bg-gradient-primary text-white border-0">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
          <Button onClick={() => onNavigate?.("allocations")} variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            Allocate Resource
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Team Members</p>
              <p className="text-4xl font-bold text-foreground">{teamMembers.length}</p>
              <p className="text-xs text-muted-foreground">{availableEmployees.length} available</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-3/10 to-chart-3/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">My Projects</p>
              <p className="text-4xl font-bold text-foreground">{activeProjects.length}</p>
              <div className="flex gap-2 text-xs">
                <Badge variant="outline" className="text-xs bg-chart-3/10">
                  {myProjects.length} Total
                </Badge>
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-4/10 to-chart-4/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Team Utilization</p>
              <p className="text-4xl font-bold text-foreground">{avgTeamUtilization}%</p>
              <Progress value={avgTeamUtilization} className="h-2 mt-2" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-chart-4" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-orange-500/10 to-orange-500/5 p-6 card-hover cursor-pointer" onClick={() => onNavigate?.("performance")}>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Pending Ratings</p>
              <p className="text-4xl font-bold text-orange-600">{pendingRatings}</p>
              <p className="text-xs text-muted-foreground">Projects awaiting review</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Critical Projects Alert */}
      {criticalProjects.length > 0 && (
        <Card className="border-destructive/50 bg-destructive/5 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">Critical Priority Projects</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {criticalProjects.length} project(s) require immediate attention
              </p>
              <div className="space-y-2">
                {criticalProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground">{project.code}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                        {project.priority}
                      </Badge>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* My Projects List */}
        <Card className="border-border/50 p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              My Projects
            </h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.("projects")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {myProjects.slice(0, 5).map((project) => {
              const teamSize = mockAllocations.filter((a) => a.project === project.id).length
              const priorityColor = 
                project.priority === "Critical" ? "bg-destructive/10 text-destructive" :
                project.priority === "High" ? "bg-orange-500/10 text-orange-600" :
                project.priority === "Medium" ? "bg-primary/10 text-primary" :
                "bg-muted text-muted-foreground"
              
              return (
                <div
                  key={project.id}
                  className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{project.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{project.code}</p>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Badge className={priorityColor}>{project.priority}</Badge>
                      <Badge variant="outline" className="text-xs">{project.status}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {teamSize} members
                    </span>
                    {project.endDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Ends {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
            {myProjects.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No projects assigned</p>
            )}
          </div>
        </Card>

        {/* Team Allocation */}
        <Card className="border-border/50 p-6 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Team Allocation
            </h2>
            <Button variant="outline" size="sm" onClick={() => onNavigate?.("allocations")}>
              Manage
            </Button>
          </div>
          <div className="space-y-3">
            {teamAllocationStats.slice(0, 6).map((stat) => {
              const isOverallocated = stat.utilization > 100
              const isFullyAllocated = stat.utilization === 100
              const isFree = stat.utilization === 0
              
              return (
                <div
                  key={stat.employee.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => onViewEmployee?.(stat.employee.id)}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">
                      {stat.employee.code.slice(-2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{stat.employee.name}</p>
                      <p className="text-xs text-muted-foreground">{stat.employee.designation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20">
                      <Progress value={Math.min(stat.utilization, 100)} className="h-2" />
                    </div>
                    <Badge
                      className={
                        isOverallocated ? "bg-destructive/10 text-destructive" :
                        isFullyAllocated ? "bg-chart-4/10 text-chart-4" :
                        isFree ? "bg-chart-3/10 text-chart-3" :
                        "bg-primary/10 text-primary"
                      }
                    >
                      {stat.utilization}%
                    </Badge>
                  </div>
                </div>
              )
            })}
            {teamMembers.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No team members</p>
            )}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Employee Availability */}
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Employee Availability
          </h2>
          <div className="space-y-3">
            {availableEmployees.slice(0, 5).map((stat) => {
              const availabilityPercent = 100 - stat.utilization
              return (
                <div
                  key={stat.employee.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => onViewEmployee?.(stat.employee.id)}
                >
                  <div>
                    <p className="font-medium text-foreground text-sm">{stat.employee.name}</p>
                    <p className="text-xs text-muted-foreground">{stat.employee.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-chart-3">{availabilityPercent}%</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
              )
            })}
            {availableEmployees.length === 0 && (
              <p className="text-center text-muted-foreground py-8">All team members fully allocated</p>
            )}
          </div>
        </Card>

        {/* Upcoming Completions */}
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Completions
            <Badge variant="secondary" className="ml-2">Next 30 Days</Badge>
          </h2>
          <div className="space-y-3">
            {upcomingCompletions.map((project) => {
              const daysRemaining = Math.ceil(
                (new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              )
              return (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{project.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ends on {new Date(project.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={daysRemaining <= 7 ? "bg-orange-500/10 text-orange-600" : "bg-primary/10 text-primary"}>
                    {daysRemaining}d left
                  </Badge>
                </div>
              )
            })}
            {upcomingCompletions.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No projects completing soon</p>
            )}
          </div>
        </Card>
      </div>

      {/* Quick Actions Summary */}
      <Card className="border-border/50 p-6 card-hover bg-gradient-to-br from-primary/5 to-transparent">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("projects")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Project
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("allocations")}>
            <UserPlus className="h-4 w-4 mr-2" />
            Allocate Employee
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("skill-matching")}>
            <Target className="h-4 w-4 mr-2" />
            Fit Analysis
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("performance")}>
            <Star className="h-4 w-4 mr-2" />
            Rate Performance
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => onNavigate?.("projects")}>
            <Briefcase className="h-4 w-4 mr-2" />
            Update Status
          </Button>
        </div>
      </Card>
    </div>
  )
}
