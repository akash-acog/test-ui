"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, CheckSquare, User } from "lucide-react"
import { mockEmployees } from "@/lib/mock-data"

interface EmployeeDashboardPageProps {
  currentUserId: string
}

export function EmployeeDashboardPage({ currentUserId }: EmployeeDashboardPageProps) {
  const currentEmployee = mockEmployees[0] // Alex Chen

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Welcome, {currentEmployee.name}</h1>
        <p className="text-muted-foreground">Your personal dashboard and quick access</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Briefcase className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Assigned to you</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
              <p className="text-2xl font-bold">7</p>
            </div>
            <CheckSquare className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">In your checklist</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Skills</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <User className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-muted-foreground mt-2">Listed in profile</p>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">My Projects</h2>
          <div className="space-y-3">
            {[
              { name: "Mobile App Redesign", role: "Frontend Dev", progress: 65 },
              { name: "API Integration", role: "Backend Dev", progress: 80 },
              { name: "Dashboard v2", role: "Full Stack", progress: 45 },
            ].map((proj) => (
              <div key={proj.name} className="p-3 border border-border rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{proj.name}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{proj.role}</p>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${proj.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              View Profile
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              My Checklist
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              View Projects
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              Team Members
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3 text-sm">
            {[
              { action: "Project assigned", time: "Today" },
              { action: "Task completed", time: "Yesterday" },
              { action: "Profile updated", time: "2 days ago" },
            ].map((item) => (
              <div key={item.action} className="pb-3 border-b last:border-b-0">
                <p className="font-medium">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
