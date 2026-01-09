"use client"

import { Card } from "@/components/ui/card"
import { Users, Briefcase, TrendingUp, CheckSquare } from "lucide-react"
import { mockEmployees, mockProjects } from "@/lib/mock-data"

export function HRDashboardPage() {
  const getDepartmentStats = () => {
    const deptMap = new Map()
    mockEmployees.forEach((emp) => {
      if (!deptMap.has(emp.department)) {
        deptMap.set(emp.department, { name: emp.department, count: 0 })
      }
      deptMap.get(emp.department).count++
    })
    return Array.from(deptMap.values())
  }

  const departmentStats = getDepartmentStats()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">HR Dashboard</h1>
        <p className="text-muted-foreground">Employee management and organizational overview</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-3xl font-bold">{mockEmployees.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-3xl font-bold">{mockProjects.length}</p>
            </div>
            <Briefcase className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Departments</p>
              <p className="text-3xl font-bold">{departmentStats.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Skills Listed</p>
              <p className="text-3xl font-bold">156</p>
            </div>
            <CheckSquare className="h-8 w-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Department Distribution</h2>
          <div className="space-y-3">
            {departmentStats.map((dept) => (
              <div key={dept.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{dept.name}</span>
                  <span className="text-sm text-muted-foreground">{dept.count}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(dept.count / mockEmployees.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              "View All Employees",
              "Manage Departments",
              "Upload Bulk Employees",
              "Generate Report",
              "View Skills Directory",
            ].map((action) => (
              <button
                key={action}
                className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
              >
                {action}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
