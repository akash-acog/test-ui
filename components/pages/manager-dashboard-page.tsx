"use client"

import { Card } from "@/components/ui/card"
import { Users, Briefcase, TrendingUp, AlertTriangle } from "lucide-react"
import { mockEmployees, mockProjects } from "@/lib/mock-data"

interface ManagerDashboardPageProps {
  onViewEmployee?: (id: string) => void
}

export function ManagerDashboardPage({ onViewEmployee }: ManagerDashboardPageProps) {
  const teamMembers = mockEmployees.filter((emp) => emp.manager === "John Manager")
  const teamProjects = mockProjects.filter((proj) => proj.status === "active")

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Manager Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Monitor your team's performance and projects</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <p className="text-3xl font-bold text-foreground">{teamMembers.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold text-foreground">{teamProjects.length}</p>
            </div>
            <Briefcase className="h-8 w-8 text-chart-2" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Team Utilization</p>
              <p className="text-3xl font-bold text-foreground">87%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-chart-3" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
              <p className="text-3xl font-bold text-foreground">3</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-chart-4" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Team Members</h2>
          <div className="space-y-3">
            {teamMembers.slice(0, 5).map((emp) => (
              <div
                key={emp.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent cursor-pointer transition-colors"
                onClick={() => onViewEmployee?.(emp.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {emp.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.designation}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{emp.allocation}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Recent Projects</h2>
          <div className="space-y-3">
            {teamProjects.slice(0, 5).map((project) => (
              <div key={project.id} className="p-3 rounded-lg hover:bg-accent transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-foreground">{project.name}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{project.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
