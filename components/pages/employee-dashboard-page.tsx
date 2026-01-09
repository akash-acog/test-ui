"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User, Briefcase, TrendingUp, Star, Edit, Save, X, Calendar, Award, Phone, MapPin, AlertCircle } from "lucide-react"
import { mockEmployees, mockProjects, mockAllocations, calculateEmployeeUtilization } from "@/lib/mock-data"

interface EmployeeDashboardPageProps {
  employeeId?: string
}

export function EmployeeDashboardPage({ employeeId = "1" }: EmployeeDashboardPageProps) {
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editedData, setEditedData] = useState({
    phone: "",
    address: "",
    emergencyContact: "",
    bio: "",
    githubUrl: "",
  })

  // Get employee data
  const employee = mockEmployees.find((emp) => emp.id === employeeId)
  if (!employee) return <div>Employee not found</div>

  // Initialize editable data
  if (!editedData.phone && employee) {
    setEditedData({
      phone: employee.phone || "",
      address: employee.address || "",
      emergencyContact: employee.emergencyContact || "",
      bio: employee.bio || "",
      githubUrl: employee.githubUrl || "",
    })
  }

  // Current utilization and allocations
  const utilization = calculateEmployeeUtilization(employee.id)
  const availability = 100 - utilization

  const today = new Date()
  const currentAllocations = mockAllocations.filter((a) => {
    const startDate = new Date(a.startDate)
    const endDate = a.endDate ? new Date(a.endDate) : null
    return a.employee === employee.id && startDate <= today && (!endDate || endDate >= today)
  })

  const currentProjects = currentAllocations.map((alloc) => ({
    ...alloc,
    project: mockProjects.find((p) => p.id === alloc.project),
  }))

  // Project history (past projects)
  const pastAllocations = mockAllocations.filter((a) => {
    const endDate = a.endDate ? new Date(a.endDate) : null
    return a.employee === employee.id && endDate && endDate < today
  })

  const projectHistory = pastAllocations.map((alloc) => ({
    ...alloc,
    project: mockProjects.find((p) => p.id === alloc.project),
  }))

  // Calculate tenure
  const joinDate = new Date(employee.joinDate)
  const tenureMonths = Math.floor((today.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
  const tenureYears = Math.floor(tenureMonths / 12)
  const remainingMonths = tenureMonths % 12
  const tenureText = tenureYears > 0 ? `${tenureYears}y ${remainingMonths}m` : `${remainingMonths}m`

  // Mock performance ratings (would come from API)
  const performanceRatings = [
    { projectName: "E-commerce Platform", rating: 4.5, remarks: "Excellent work on frontend development", date: "2025-11-15" },
    { projectName: "Mobile App Redesign", rating: 4.0, remarks: "Good collaboration and timely delivery", date: "2025-09-20" },
    { projectName: "Analytics Dashboard", rating: 5.0, remarks: "Outstanding performance and initiative", date: "2025-07-10" },
  ]

  const handleSaveProfile = () => {
    // Here you would call an API to update the employee profile
    console.log("Saving profile:", editedData)
    setIsEditingProfile(false)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient">My Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">View your profile, projects, and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Tenure</p>
              <p className="text-4xl font-bold text-foreground">{tenureText}</p>
              <p className="text-xs text-muted-foreground">Since {joinDate.toLocaleDateString()}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-3/10 to-chart-3/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Current Projects</p>
              <p className="text-4xl font-bold text-foreground">{currentProjects.length}</p>
              <p className="text-xs text-muted-foreground">Active allocations</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-3/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-chart-4/10 to-chart-4/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Utilization</p>
              <p className="text-4xl font-bold text-foreground">{utilization}%</p>
              <Progress value={utilization} className="h-2 mt-2" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-chart-4/20 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-chart-4" />
            </div>
          </div>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-6 card-hover">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Avg Rating</p>
              <p className="text-4xl font-bold text-foreground">
                {(performanceRatings.reduce((sum, r) => sum + r.rating, 0) / performanceRatings.length).toFixed(1)}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Star className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Personal Profile */}
        <Card className="border-border/50 p-6 card-hover lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Personal Profile
            </h2>
            {!isEditingProfile ? (
              <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(true)} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveProfile} className="gap-2 bg-gradient-primary text-white border-0">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsEditingProfile(false)} className="gap-2">
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Basic Info - Read Only */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-xs text-muted-foreground">Employee Code</Label>
                <p className="font-semibold text-foreground mt-1">{employee.code}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Full Name</Label>
                <p className="font-semibold text-foreground mt-1">{employee.name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Email</Label>
                <p className="font-semibold text-foreground mt-1">{employee.email}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Date of Joining</Label>
                <p className="font-semibold text-foreground mt-1">{joinDate.toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Department</Label>
                <p className="font-semibold text-foreground mt-1">{employee.department}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Designation</Label>
                <p className="font-semibold text-foreground mt-1">{employee.designation}</p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">Editable Information</h3>
              
              {!isEditingProfile ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone
                    </Label>
                    <p className="font-semibold text-foreground mt-1">{employee.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      Address
                    </Label>
                    <p className="font-semibold text-foreground mt-1">{employee.address || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      Emergency Contact
                    </Label>
                    <p className="font-semibold text-foreground mt-1">{employee.emergencyContact || "Not provided"}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">GitHub URL</Label>
                    <p className="font-semibold text-foreground mt-1">
                      {employee.githubUrl ? (
                        <a href={employee.githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          {employee.githubUrl}
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs text-muted-foreground">Bio</Label>
                    <p className="font-semibold text-foreground mt-1">{employee.bio || "Not provided"}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={editedData.phone}
                        onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                        className="bg-muted/30"
                      />
                    </div>
                    <div>
                      <Label>Emergency Contact</Label>
                      <Input
                        value={editedData.emergencyContact}
                        onChange={(e) => setEditedData({ ...editedData, emergencyContact: e.target.value })}
                        className="bg-muted/30"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={editedData.address}
                      onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                      className="bg-muted/30"
                    />
                  </div>
                  <div>
                    <Label>GitHub URL</Label>
                    <Input
                      value={editedData.githubUrl}
                      onChange={(e) => setEditedData({ ...editedData, githubUrl: e.target.value })}
                      placeholder="https://github.com/username"
                      className="bg-muted/30"
                    />
                  </div>
                  <div>
                    <Label>Bio</Label>
                    <Textarea
                      value={editedData.bio}
                      onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                      rows={3}
                      className="bg-muted/30"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* My Skills */}
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            My Skills
          </h2>
          <div className="space-y-3">
            {employee.skills.map((skill, idx) => {
              const proficiencyColor =
                skill.proficiency === "Expert" ? "bg-chart-3/10 text-chart-3" :
                skill.proficiency === "Advanced" ? "bg-primary/10 text-primary" :
                skill.proficiency === "Intermediate" ? "bg-chart-4/10 text-chart-4" :
                "bg-muted text-muted-foreground"

              return (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="font-medium text-sm">{skill.name}</span>
                  <Badge className={proficiencyColor}>{skill.proficiency}</Badge>
                </div>
              )
            })}
            {employee.skills.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No skills added yet</p>
            )}
          </div>
        </Card>
      </div>

      {/* Current Projects */}
      <Card className="border-border/50 p-6 card-hover">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Current Projects
          </h2>
          <Badge className="bg-primary/10 text-primary">{currentProjects.length} Active</Badge>
        </div>
        <div className="space-y-4">
          {currentProjects.map((proj) => (
            <div key={proj.id} className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{proj.project?.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{proj.project?.code}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className="bg-primary/10 text-primary">{proj.allocationPercent}% Allocated</Badge>
                  {proj.billable && <Badge variant="outline" className="text-xs">Billable</Badge>}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Started: {new Date(proj.startDate).toLocaleDateString()}</span>
                {proj.endDate && <span>Ends: {new Date(proj.endDate).toLocaleDateString()}</span>}
              </div>
            </div>
          ))}
          {currentProjects.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No active project allocations</p>
          )}
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project History */}
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Project History
          </h2>
          <div className="space-y-3">
            {projectHistory.slice(0, 5).map((proj) => {
              const startDate = new Date(proj.startDate)
              const endDate = proj.endDate ? new Date(proj.endDate) : null
              const durationMonths = endDate
                ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))
                : 0

              return (
                <div key={proj.id} className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-sm">{proj.project?.name}</p>
                    <Badge variant="outline" className="text-xs">{durationMonths}m</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {startDate.toLocaleDateString()} - {endDate?.toLocaleDateString()}
                  </p>
                </div>
              )
            })}
            {projectHistory.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No project history</p>
            )}
          </div>
        </Card>

        {/* Performance Ratings */}
        <Card className="border-border/50 p-6 card-hover">
          <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Performance Ratings
          </h2>
          <div className="space-y-4">
            {performanceRatings.map((rating, idx) => (
              <div key={idx} className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-sm">{rating.projectName}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-primary">{rating.rating}</span>
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{rating.remarks}</p>
                <p className="text-xs text-muted-foreground">{new Date(rating.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
