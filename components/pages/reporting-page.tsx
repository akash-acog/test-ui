"use client"
import { mockEmployees, mockAllocations } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Download, FileText, Plus } from "lucide-react"

export function ReportingPage() {
  const utilizationData = [
    {
      name: "Mon",
      utilization: Math.round(
        mockAllocations.filter((a) => a.startDate.includes("01")).reduce((acc, a) => acc + a.allocationPercentage, 0) /
          10,
      ),
    },
    {
      name: "Tue",
      utilization: Math.round(
        mockAllocations.filter((a) => a.startDate.includes("02")).reduce((acc, a) => acc + a.allocationPercentage, 0) /
          10,
      ),
    },
    {
      name: "Wed",
      utilization: Math.round(
        mockAllocations.filter((a) => a.startDate.includes("03")).reduce((acc, a) => acc + a.allocationPercentage, 0) /
          10,
      ),
    },
    {
      name: "Thu",
      utilization: Math.round(
        mockAllocations.filter((a) => a.startDate.includes("04")).reduce((acc, a) => acc + a.allocationPercentage, 0) /
          10,
      ),
    },
    {
      name: "Fri",
      utilization: Math.round(
        mockAllocations.filter((a) => a.startDate.includes("05")).reduce((acc, a) => acc + a.allocationPercentage, 0) /
          10,
      ),
    },
  ]

  const skillMap = new Map<string, number>()
  mockEmployees.forEach((emp) => {
    emp.skills.forEach((skill) => {
      const skillName = typeof skill === "string" ? skill : skill.name
      skillMap.set(skillName, (skillMap.get(skillName) || 0) + 1)
    })
  })
  const skillData = Array.from(skillMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4)

  const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"]

  const mockReports = [
    {
      id: "1",
      name: "Employee Utilization Report",
      type: "utilization",
      createdDate: "2024-01-15",
      status: "Completed",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Project Health Report",
      type: "project",
      createdDate: "2024-01-14",
      status: "Completed",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Skill Inventory Report",
      type: "skills",
      createdDate: "2024-01-13",
      status: "Completed",
      size: "3.2 MB",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="mt-1 text-sm text-muted-foreground">View and generate comprehensive reports</p>
            </div>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Charts */}
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          {/* Utilization Chart */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Weekly Utilization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={utilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="utilization" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Skills Distribution */}
          <Card className="border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Skills Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Generated Reports */}
        <Card className="border-border bg-card p-6">
          <h3 className="mb-6 text-lg font-semibold text-foreground">Generated Reports</h3>
          <div className="space-y-3">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                <div className="flex items-center gap-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">{report.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.createdDate} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge>{report.status}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
