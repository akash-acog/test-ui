"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin } from "lucide-react"
import { getEmployeeById, calculateEmployeeUtilization, getEmployeeAvailability } from "@/lib/mock-data"
import type { UserRole } from "@/lib/role-config"

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
    Expert: "bg-chart-3/20 text-chart-3",
    Advanced: "bg-primary/20 text-primary",
    Intermediate: "bg-accent/20 text-accent",
    Beginner: "bg-muted text-muted-foreground",
  }
  return colors[proficiency as keyof typeof colors] || colors.Beginner
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

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-primary to-primary/70 px-8 py-12 text-primary-foreground">
        <div className="mx-auto w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-primary-foreground/20 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                {employee.code.slice(-2)}
              </div>
              <div>
                <h1 className="text-4xl font-bold">{employee.name}</h1>
                <p className="text-primary-foreground/80">{employee.designation}</p>
                <p className="text-sm text-primary-foreground/60 mt-1">Employee Code: {employee.code}</p>
                <Badge className="mt-2 bg-primary-foreground text-primary">{employee.status}</Badge>
              </div>
            </div>

            <div className="flex gap-6 text-primary-foreground">
              <div className="text-center">
                <p className="text-sm opacity-80">Utilization</p>
                <p className="text-3xl font-bold">{utilization}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">Availability</p>
                <p className="text-3xl font-bold">{100 - utilization}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-80">Tenure</p>
                <p className="text-3xl font-bold">{tenure}y</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full px-8 py-8">
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            {/* Contact Info */}
            <Card className="border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{employee.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{employee.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{employee.location}</span>
                </div>
              </div>
            </Card>

            {/* Employment Info */}
            <Card className="border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Employment</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium text-foreground">{employee.department}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{employee.type}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-medium text-foreground">{new Date(employee.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </Card>

            {/* Skills Summary */}
            <Card className="border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {employee.skills.slice(0, 5).map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className={getProficiencyColor(skill.proficiency)}>
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Full Skills Display */}
          <Card className="border-border/50 p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">All Skills & Proficiencies</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {employee.skills.map((skill, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${getProficiencyColor(skill.proficiency)}`}>
                  <p className="font-medium">{skill.name}</p>
                  <p className="text-sm opacity-75">{skill.proficiency}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
