"use client"

import { Card } from "@/components/ui/card"
import { Users, Briefcase, Activity, TrendingUp, ArrowUpRight } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { mockEmployees, mockProjects } from "@/lib/mock-data"
import { useTheme } from "next-themes"

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
    bgClass: "bg-primary/10 dark:bg-primary/20",
    iconClass: "text-primary",
  },
  {
    label: "Active Projects",
    value: mockProjects.length.toString(),
    change: "+2%",
    icon: Briefcase,
    bgClass: "bg-chart-2/10 dark:bg-chart-2/20",
    iconClass: "text-chart-2",
  },
  {
    label: "Avg Utilization",
    value: "85%",
    change: "+3%",
    icon: Activity,
    bgClass: "bg-chart-3/10 dark:bg-chart-3/20",
    iconClass: "text-chart-3",
  },
  {
    label: "Revenue",
    value: "$2.4M",
    change: "+12%",
    icon: TrendingUp,
    bgClass: "bg-chart-4/10 dark:bg-chart-4/20",
    iconClass: "text-chart-4",
  },
]

interface AdminDashboardPageProps {
  onViewEmployee?: (id: string, from: string) => void
}

export function AdminDashboardPage({ onViewEmployee }: AdminDashboardPageProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  // Theme-aware chart colors
  const chartColors = {
    primary: isDark ? "hsl(263.4 70% 50.4%)" : "hsl(262.1 83.3% 57.8%)",
    secondary: isDark ? "hsl(280 65% 60%)" : "hsl(263.4 70% 50.4%)",
    tertiary: isDark ? "hsl(291 47.1% 50.8%)" : "hsl(280 60% 55%)",
    border: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
    text: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    cardBg: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(0 0% 100%)",
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">System overview and key metrics at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Card
              key={idx}
              className={`border-border/50 ${kpi.bgClass} p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-card`}
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
        <Card className="border-border/50 p-6 bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">Growth Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} opacity={0.5} />
              <XAxis 
                dataKey="month" 
                stroke={chartColors.text}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={chartColors.text}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: chartColors.cardBg,
                  border: `1px solid ${chartColors.border}`,
                  borderRadius: '6px',
                  color: chartColors.text
                }}
                labelStyle={{ color: chartColors.text }}
              />
              <Legend 
                wrapperStyle={{ color: chartColors.text }}
              />
              <Line
                type="monotone"
                dataKey="utilization"
                stroke={chartColors.primary}
                strokeWidth={3}
                dot={{ fill: chartColors.primary, r: 5 }}
                activeDot={{ r: 7 }}
                name="Utilization %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Department Stats */}
        <Card className="border-border/50 p-6 bg-card">
          <h2 className="text-xl font-bold text-foreground mb-4">Department Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} opacity={0.5} />
              <XAxis 
                dataKey="name" 
                stroke={chartColors.text}
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke={chartColors.text}
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: chartColors.cardBg,
                  border: `1px solid ${chartColors.border}`,
                  borderRadius: '6px',
                  color: chartColors.text
                }}
                labelStyle={{ color: chartColors.text }}
              />
              <Legend 
                wrapperStyle={{ color: chartColors.text }}
              />
              <Bar 
                dataKey="employees" 
                fill={chartColors.primary}
                radius={[6, 6, 0, 0]}
                name="Employees"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  )
}
