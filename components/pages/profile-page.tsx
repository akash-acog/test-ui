"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Briefcase, Calendar, Award, TrendingUp, Target, User } from "lucide-react"
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

const calculateAge = (dob: string): number => {
  const birth = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

const getProficiencyColor = (proficiency: string) => {
  const colors = {
    Expert: "bg-chart-3/20 text-chart-3 border-chart-3/30",
    Advanced: "bg-primary/20 text-primary border-primary/30",
    Intermediate: "bg-chart-4/20 text-chart-4 border-chart-4/30",
    Beginner: "bg-muted text-muted-foreground border-border",
  }
  return colors[proficiency as keyof typeof colors] || colors.Beginner
}

const getProficiencyIcon = (proficiency: string) => {
  switch (proficiency) {
    case "Expert":
      return "🏆"
    case "Advanced":
      return "⭐"
    case "Intermediate":
      return "📈"
    default:
      return "🌱"
  }
}

export function ProfilePage({ userRole, currentUserId }: ProfilePageProps) {
  const employee = getEmployeeById(currentUserId) || getEmployeeById("1")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(employee)

  const utilization = calculateEmployeeUtilization(currentUserId)
  const availability = getEmployeeAvailability(currentUserId)
  const tenure = calculateTenure(employee.joinDate)
  const age = employee.dob ? calculateAge(employee.dob) : null

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const canEdit = userRole === "employee" || userRole === "admin"
  const initials = employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()

  return (
    <div className="flex-1 flex flex-col bg-background animate-fade-in">
      {/* Beautiful gradient header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-8 py-16 text-white relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        
        <div className="mx-auto w-full relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Large gradient avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl" />
                <div className="relative h-32 w-32 rounded-3xl bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center text-4xl font-bold text-white shadow-2xl border-2 border-white/20">
                  {initials}
                </div>
                {/* Status badge */}
                <div className="absolute -bottom-2 -right-2 bg-chart-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white">
                  {employee.status}
                </div>
              </div>
              
              <div>
                <h1 className="text-5xl font-bold mb-2">{employee.name}</h1>
                <p className="text-white/90 text-xl mb-2">{employee.designation}</p>
                <p className="text-sm text-white/70 font-mono bg-white/10 px-3 py-1 rounded-full inline-block">
                  {employee.code}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm opacity-90">Utilization</p>
                <p className="text-4xl font-bold mt-1">{utilization}%</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Target className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm opacity-90">Available</p>
                <p className="text-4xl font-bold mt-1">{100 - utilization}%</p>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Award className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm opacity-90">Tenure</p>
                <p className="text-4xl font-bold mt-1">{tenure}y</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full px-8 py-8 -mt-8 relative z-20">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {/* Contact Info */}
            <Card className="border-border bg-card p-6 card-hover shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{employee.location}</span>
                </div>
              </div>
            </Card>

            {/* Employment Info */}
            <Card className="border-border bg-card p-6 card-hover shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-chart-3" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Employment</h3>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Department</p>
                  <p className="font-semibold text-foreground">{employee.department}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <Badge className="bg-primary/10 text-primary border-primary/20">{employee.type}</Badge>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Joined</p>
                  <p className="font-semibold text-foreground">{new Date(employee.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            {/* Skills Summary */}
            <Card className="border-border bg-card p-6 card-hover shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-chart-4" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Top Skills</h3>
              </div>
              <div className="space-y-2">
                {employee.skills.slice(0, 5).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-lg">{getProficiencyIcon(skill.proficiency)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <Badge variant="secondary" className={getProficiencyColor(skill.proficiency) + " text-xs"}>
                          {skill.proficiency}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Full Skills Display */}
          <Card className="border-border bg-card p-6 shadow-lg card-hover">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">All Skills & Proficiencies ({employee.skills.length})</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {employee.skills.map((skill, idx) => (
                <div key={idx} className={`p-4 rounded-xl border transition-all hover:scale-105 hover:shadow-md ${getProficiencyColor(skill.proficiency)}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getProficiencyIcon(skill.proficiency)}</span>
                    <p className="font-semibold text-lg">{skill.name}</p>
                  </div>
                  <Badge className={getProficiencyColor(skill.proficiency) + " text-xs"}>
                    {skill.proficiency}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
