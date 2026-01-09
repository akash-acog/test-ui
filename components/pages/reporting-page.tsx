"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/ui/stats-card"
import {
  Users,
  FolderKanban,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Target,
} from "lucide-react"
import {
  mockEmployees,
  mockProjects,
  getDepartmentStats,
  getLocationStats,
  getProjectStats,
  getUtilizationStats,
  getBudgetStats,
  getSkillsDistribution,
  getMonthlyHiringTrend,
} from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function ReportingPage() {
  const departmentStats = getDepartmentStats()
  const locationStats = getLocationStats()
  const projectStats = getProjectStats()
  const utilizationStats = getUtilizationStats()
  const budgetStats = getBudgetStats()
  const skillsDistribution = getSkillsDistribution()
  const hiringTrend = getMonthlyHiringTrend()

  const activeEmployees = mockEmployees.filter((emp) => emp.status === "Active").length
  const activeProjects = projectStats.active
  const avgUtilization = utilizationStats.average

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gradient">Reports & Analytics</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Comprehensive insights into workforce, projects, and resource utilization
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Employees"
          value={activeEmployees}
          description="Active workforce"
          icon={Users}
          variant="primary"
          trend={{ value: 12, label: "vs last quarter" }}
        />
        <StatsCard
          title="Active Projects"
          value={activeProjects}
          description={`${projectStats.planned} planned, ${projectStats.completed} completed`}
          icon={FolderKanban}
          variant="success"
          trend={{ value: 8, label: "this quarter" }}
        />
        <StatsCard
          title="Avg Utilization"
          value={`${avgUtilization}%`}
          description={`${utilizationStats.available} employees available`}
          icon={Activity}
          variant={avgUtilization > 85 ? "warning" : "primary"}
        />
        <StatsCard
          title="Budget Used"
          value={`${budgetStats.utilizationPercent}%`}
          description={`$${(budgetStats.spent / 1000).toFixed(0)}K of $${(budgetStats.total / 1000).toFixed(0)}K`}
          icon={DollarSign}
          variant={budgetStats.utilizationPercent > 90 ? "danger" : "success"}
        />
      </div>

      {/* Department & Location Distribution */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-primary" />
              Department Distribution
            </CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((stat) => {
                const percentage = Math.round((stat.count / activeEmployees) * 100)
                return (
                  <div key={stat.department} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{stat.department}</span>
                        <Badge variant="outline" className="text-xs">
                          {stat.count}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Location Distribution
            </CardTitle>
            <CardDescription>Employee count by location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {locationStats.map((stat) => {
                const percentage = Math.round((stat.count / activeEmployees) * 100)
                return (
                  <div key={stat.location} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{stat.location}</span>
                        <Badge variant="outline" className="text-xs">
                          {stat.count}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">{percentage}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Utilization Breakdown */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Employee Utilization Breakdown
          </CardTitle>
          <CardDescription>Current allocation status across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-muted-foreground">Over-allocated</p>
              <p className="text-3xl font-bold text-destructive">{utilizationStats.overAllocated}</p>
              <p className="text-xs text-muted-foreground">Employees &gt;100%</p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-chart-4/10 border border-chart-4/20">
              <p className="text-sm text-muted-foreground">Fully Allocated</p>
              <p className="text-3xl font-bold text-chart-4">{utilizationStats.fullyAllocated}</p>
              <p className="text-xs text-muted-foreground">Employees at 100%</p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">Partial</p>
              <p className="text-3xl font-bold text-primary">{utilizationStats.partiallyAllocated}</p>
              <p className="text-xs text-muted-foreground">0-99% allocated</p>
            </div>
            <div className="space-y-2 p-4 rounded-xl bg-chart-3/10 border border-chart-3/20">
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-3xl font-bold text-chart-3">{utilizationStats.available}</p>
              <p className="text-xs text-muted-foreground">Ready for work</p>
            </div>
          </div>

          {/* Top Utilized Employees */}
          <div className="mt-6">
            <h4 className="font-semibold mb-4">Top Utilized Employees</h4>
            <div className="space-y-3">
              {utilizationStats.data
                .sort((a, b) => b.utilization - a.utilization)
                .slice(0, 5)
                .map((emp) => (
                  <div key={emp.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{emp.name}</p>
                      <p className="text-xs text-muted-foreground">{emp.department}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={emp.utilization} className="w-24 h-2" />
                      <Badge
                        className={
                          emp.utilization > 100
                            ? "bg-destructive/10 text-destructive"
                            : emp.utilization === 100
                              ? "bg-chart-4/10 text-chart-4"
                              : "bg-primary/10 text-primary"
                        }
                      >
                        {emp.utilization}%
                      </Badge>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Distribution */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Top Skills Distribution
          </CardTitle>
          <CardDescription>Most common skills across the organization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillsDistribution.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-chart-3">Expert: {skill.byLevel.Expert}</span>
                    <span className="text-primary">Adv: {skill.byLevel.Advanced}</span>
                    <span className="text-chart-4">Int: {skill.byLevel.Intermediate}</span>
                    <span className="text-muted-foreground">Beg: {skill.byLevel.Beginner}</span>
                  </div>
                </div>
                <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-muted">
                  <div
                    className="bg-chart-3"
                    style={{ width: `${(skill.byLevel.Expert / skill.total) * 100}%` }}
                  />
                  <div
                    className="bg-primary"
                    style={{ width: `${(skill.byLevel.Advanced / skill.total) * 100}%` }}
                  />
                  <div
                    className="bg-chart-4"
                    style={{ width: `${(skill.byLevel.Intermediate / skill.total) * 100}%` }}
                  />
                  <div
                    className="bg-muted-foreground/30"
                    style={{ width: `${(skill.byLevel.Beginner / skill.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Overview */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            Budget Overview
          </CardTitle>
          <CardDescription>Financial tracking across all projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold text-foreground">
                  ${(budgetStats.total / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold text-chart-4">
                  ${(budgetStats.spent / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-chart-3">
                  ${(budgetStats.remaining / 1000).toFixed(0)}K
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Budget Utilization</span>
                <span className="font-semibold">{budgetStats.utilizationPercent}%</span>
              </div>
              <Progress value={budgetStats.utilizationPercent} className="h-3" />
            </div>

            {/* Project Budget Breakdown */}
            <div className="mt-6">
              <h4 className="font-semibold mb-4">Project Budget Status</h4>
              <div className="space-y-3">
                {mockProjects
                  .filter((p) => p.status === "Active")
                  .map((project) => {
                    const utilization = Math.round((project.spent / project.budget) * 100)
                    return (
                      <div key={project.id} className="p-3 bg-muted/30 rounded-lg space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{project.name}</p>
                            <p className="text-xs text-muted-foreground">
                              ${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K
                            </p>
                          </div>
                          <Badge
                            className={
                              utilization > 90
                                ? "bg-destructive/10 text-destructive"
                                : utilization > 75
                                  ? "bg-chart-4/10 text-chart-4"
                                  : "bg-chart-3/10 text-chart-3"
                            }
                          >
                            {utilization}%
                          </Badge>
                        </div>
                        <Progress value={utilization} className="h-2" />
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hiring Trend */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Hiring Trend (2025)
          </CardTitle>
          <CardDescription>Monthly new employee onboarding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between gap-2">
            {hiringTrend.map((month) => {
              const maxHires = Math.max(...hiringTrend.map((m) => m.hires), 1)
              const height = (month.hires / maxHires) * 100
              return (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t-lg transition-all hover:from-primary hover:to-primary/70 relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded px-2 py-1 text-xs font-semibold whitespace-nowrap">
                      {month.hires} hires
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{month.month}</span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
