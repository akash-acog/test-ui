"use client"

import { Card } from "@/components/ui/card"
import { Briefcase, Calendar, TrendingUp, Award } from "lucide-react"
import { mockEmployees, mockProjects } from "@/lib/mock-data"

interface EmployeeDashboardPageProps {
  currentUserId: string
}

export function EmployeeDashboardPage({ currentUserId }: EmployeeDashboardPageProps) {
  const currentEmployee = mockEmployees.find((emp) => emp.id === currentUserId)
  const myProjects = mockProjects.filter((proj) => 
    proj.team?.some((member) => member.id === currentUserId)
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">My Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">Welcome back, {currentEmployee?.name}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold text-foreground">{myProjects.length}</p>
            </div>
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">My Allocation</p>
              <p className="text-3xl font-bold text-foreground">{currentEmployee?.allocation}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-chart-2" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
              <p className="text-3xl font-bold text-foreground">2</p>
            </div>
            <Calendar className="h-8 w-8 text-chart-3" />
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Performance</p>
              <p className="text-3xl font-bold text-foreground">A+</p>
            </div>
            <Award className="h-8 w-8 text-chart-4" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">My Projects</h2>
          <div className="space-y-3">
            {myProjects.slice(0, 5).map((project) => (
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

        <Card className="p-6 bg-card border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">My Skills</h2>
          <div className="space-y-3">
            {currentEmployee?.skills.slice(0, 5).map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">{skill}</span>
                  <span className="text-sm text-muted-foreground">Expert</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
