"use client"

import { Card } from "@/components/ui/card"
import { Users, Briefcase, Activity, TrendingUp, ArrowUpRight } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { mockEmployees, mockProjects } from "@/lib/mock-data"

const trendsData = [
  { month: "Jan", employees: 120, projects: 12, utilization: 78 },
  { month: "Feb", employees: 128, projects: 14, utilization: 80 },
  { month: "Mar", employees: 135, projects: 16, utilization: 82 },
  { month: "Apr", employees: 140, projects: 17, utilization: 84 },
  { month: "May", employees: 142, projects: 18, utilization: 85 },
]

const getDepartmentStats = () => {
  const deptMap = new Map()
  mockEmployees.forEach((emp) => {
    if (!deptMap.has(emp.department)) {
      deptMap.set(emp.department, { name: emp.department, employees: 0, utilization: 85 })
    }
    deptMap.get(emp.department).employees++
  })
  return Array.from(deptMap.values())
}

const departmentStats = getDepartmentStats()

const kpiData = [
  {
    label: "Total Employees",
    value: mockEmployees.length.toString(),
    change: "+5%",
    icon: Users,
    bgClass: "bg-primary/10",
    iconClass: "text-primary",
  },
  {
    label: "Active Projects",
    value: mockProjects.length.toString(),
    change: "+2%",
    icon: Briefcase,
    bgClass: "bg-chart-2/10",
    iconClass: "text-chart-2",
  },
  {
    label: "Avg Utilization",
    value: "85%",
    change: "+3%",
    icon: Activity,
    bgClass: "bg-chart-3/10",
    iconClass: "text-chart-3",
  },
  {
    label: "Revenue",
    value: "$2.4M",
    change: "+12%",
    icon: TrendingUp,
    bgClass: "bg-accent/10",
    iconClass: "text-accent",
  },
]

interface AdminDashboardPageProps {
  onViewEmployee?: (id: string, from: string) => void
}

export function AdminDashboardPage({ onViewEmployee }: AdminDashboardPageProps) {
  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="mx-auto w-full px-6 py-8">
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">System overview and key metrics at a glance</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full px-6 py-8 space-y-8">
          {/* KPI Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, idx) => {
              const Icon = kpi.icon
              return (
                <Card
                  key={idx}
                  className={`border-border/50 ${kpi.bgClass} p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{kpi.label}</p>
                      <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                      <div className="flex items-center gap-1">
                        <ArrowUpRight className={`h-4 w-4 ${kpi.iconClass}`} />
                        <p className={`text-xs font-semibold ${kpi.iconClass}`}>{kpi.change}</p>
                      </div>
                    </div>
                    <Icon className={`h-8 w-8 ${kpi.iconClass}`} />
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Trends Chart */}
            <Card className="border-border/50 p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Growth Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: `1px solid var(--color-border)` }}
                  />
                  <Line
                    type="monotone"
                    dataKey="utilization"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Department Stats */}
            <Card className="border-border/50 p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">Department Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "var(--color-card)", border: `1px solid var(--color-border)` }}
                  />
                  <Bar dataKey="employees" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
