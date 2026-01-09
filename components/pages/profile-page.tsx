"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Briefcase, Calendar, Award, TrendingUp, Target } from "lucide-react"
import { getEmployeeById, calculateEmployeeUtilization, getEmployeeAvailability } from "@/lib/mock-data"
import type { UserRole } from "@/lib/role-config"
import { Progress } from "@/components/ui/progress"

interface ProfilePageProps {
  userRole: UserRole
  currentUserId: string
}

const calculateTenure = (joinDate: string): number => {
  const join = new Date(joinDate)
  const today = new Date()
  return Math.floor((today.getTime() - join.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
}

const getProficiencyColor = (proficiency: string) => {
  const colors = { Expert: "bg-chart-3/20 text-chart-3 border-chart-3/30", Advanced: "bg-primary/20 text-primary border-primary/30", Intermediate: "bg-chart-4/20 text-chart-4 border-chart-4/30", Beginner: "bg-muted text-muted-foreground border-border" }
  return colors[proficiency as keyof typeof colors] || colors.Beginner
}

export function ProfilePage({ userRole, currentUserId }: ProfilePageProps) {
  const employee = getEmployeeById(currentUserId) || getEmployeeById("1")
  const utilization = calculateEmployeeUtilization(currentUserId)
  const availability = getEmployeeAvailability(currentUserId)
  const tenure = calculateTenure(employee.joinDate)
  const initials = employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Compact header */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white shadow-2xl border-4 border-background">{initials}</div>
          </div>
        </div>
        <div className="pt-16 px-6 pb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{employee.name}</h1>
              <p className="text-muted-foreground mt-1">{employee.designation} • {employee.department}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">{employee.code}</Badge>
                <Badge className="bg-chart-3/10 text-chart-3">{employee.status}</Badge>
                <Badge variant="outline">{employee.type}</Badge>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-muted/50 rounded-lg p-3"><TrendingUp className="h-5 w-5 mx-auto mb-1 text-primary" /><p className="text-2xl font-bold">{utilization}%</p><p className="text-xs text-muted-foreground">Utilization</p></div>
              <div className="bg-muted/50 rounded-lg p-3"><Target className="h-5 w-5 mx-auto mb-1 text-chart-3" /><p className="text-2xl font-bold">{100 - utilization}%</p><p className="text-xs text-muted-foreground">Available</p></div>
              <div className="bg-muted/50 rounded-lg p-3"><Award className="h-5 w-5 mx-auto mb-1 text-chart-4" /><p className="text-2xl font-bold">{tenure}y</p><p className="text-xs text-muted-foreground">Tenure</p></div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Contact */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b"><Mail className="h-5 w-5 text-primary" /><h3 className="font-semibold">Contact</h3></div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2"><Mail className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" /><span className="text-muted-foreground break-all">{employee.email}</span></div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" /><span className="text-muted-foreground">{employee.phone}</span></div>
            <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{employee.location}</span></div>
          </div>
        </Card>

        {/* Employment */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b"><Briefcase className="h-5 w-5 text-primary" /><h3 className="font-semibold">Employment</h3></div>
          <div className="space-y-3">
            <div><p className="text-xs text-muted-foreground mb-1">Department</p><p className="font-semibold text-sm">{employee.department}</p></div>
            <div><p className="text-xs text-muted-foreground mb-1">Type</p><Badge variant="outline" className="text-xs">{employee.type}</Badge></div>
            <div><p className="text-xs text-muted-foreground mb-1">Joined</p><p className="font-semibold text-sm">{new Date(employee.joinDate).toLocaleDateString()}</p></div>
          </div>
        </Card>

        {/* Quick Stats */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b"><Award className="h-5 w-5 text-primary" /><h3 className="font-semibold">Skills Summary</h3></div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Skills</span><span className="font-bold">{employee.skills.length}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Expert Level</span><span className="font-bold text-chart-3">{employee.skills.filter(s => s.proficiency === "Expert").length}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Advanced</span><span className="font-bold text-primary">{employee.skills.filter(s => s.proficiency === "Advanced").length}</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Intermediate</span><span className="font-bold text-chart-4">{employee.skills.filter(s => s.proficiency === "Intermediate").length}</span></div>
          </div>
        </Card>
      </div>

      {/* Skills Table */}
      <Card className="overflow-hidden">
        <div className="bg-muted/50 border-b p-4 flex items-center gap-2"><Award className="h-5 w-5 text-primary" /><h3 className="font-semibold">All Skills ({employee.skills.length})</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b">
              <tr className="text-left text-sm"><th className="p-3 font-semibold">Skill Name</th><th className="p-3 font-semibold">Proficiency Level</th><th className="p-3 font-semibold">Category</th></tr>
            </thead>
            <tbody>
              {employee.skills.map((skill, idx) => (
                <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                  <td className="p-3"><span className="font-medium text-sm">{skill.name}</span></td>
                  <td className="p-3"><Badge className={getProficiencyColor(skill.proficiency)}>{skill.proficiency}</Badge></td>
                  <td className="p-3"><span className="text-sm text-muted-foreground">{skill.proficiency === "Expert" ? "Core Competency" : skill.proficiency === "Advanced" ? "Strong" : skill.proficiency === "Intermediate" ? "Competent" : "Learning"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
