"use client"

import { ArrowLeft, Mail, Phone, MapPin, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getEmployeeById, mockProjects, mockAllocations, calculateEmployeeUtilization } from "@/lib/mock-data"
import { useRole } from "@/lib/role-context"

interface EmployeeDetailPageProps {
  employeeId?: string
  onBack?: () => void
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

export function EmployeeDetailPage({ employeeId = "1", onBack }: EmployeeDetailPageProps) {
  const { user } = useRole()
  const employee = getEmployeeById(employeeId)

  if (!employee) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <Card className="border-border/50 p-8 text-center">
          <p className="text-muted-foreground">Employee not found</p>
          <Button onClick={onBack} className="mt-4">
            Back
          </Button>
        </Card>
      </div>
    )
  }

  const utilization = calculateEmployeeUtilization(employeeId)
  const tenure = calculateTenure(employee.joinDate)
  const age = employee.dob ? calculateAge(employee.dob) : null

  const employeeProjects = employee.projects
    .map((projectId) => mockProjects.find((p) => p.id === projectId))
    .filter(Boolean)

  const currentAllocations = mockAllocations.filter((a) => {
    const today = new Date()
    const startDate = new Date(a.startDate)
    const endDate = a.endDate ? new Date(a.endDate) : null
    return a.employee === employeeId && startDate <= today && (!endDate || endDate >= today)
  })

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="mx-auto w-full px-6 py-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-primary">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Employee Profile</h1>
              <p className="mt-1 text-sm text-muted-foreground">Complete employee information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto w-full px-6 py-8">
          {/* Profile Header Card */}
          <Card className="border-border/50 mb-6 p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-6">
                <div className="h-20 w-20 rounded-lg bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
                  {employee.code.slice(-2)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{employee.name}</h2>
                  <p className="text-muted-foreground">{employee.designation}</p>
                  <p className="text-sm text-muted-foreground mt-1">{employee.code}</p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="secondary">{employee.department}</Badge>
                    <Badge variant="outline">{employee.type}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/5">
                  <p className="text-sm text-muted-foreground">Utilization</p>
                  <p className="text-2xl font-bold text-primary">{utilization}%</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/5">
                  <p className="text-sm text-muted-foreground">Tenure</p>
                  <p className="text-2xl font-bold text-accent">{tenure}y</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-chart-3/5">
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="text-2xl font-bold text-chart-3">{age}y</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Contact Info */}
                <Card className="border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <div className="space-y-3 text-sm">
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

                {/* Employment Details */}
                <Card className="border-border/50 p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Employment Details</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Department</p>
                      <p className="font-medium text-foreground">{employee.department}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Designation</p>
                      <p className="font-medium text-foreground">{employee.designation}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Employee Type</p>
                      <p className="font-medium text-foreground">{employee.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Join Date</p>
                      <p className="font-medium text-foreground">{new Date(employee.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reports To</p>
                      <p className="font-medium text-foreground">{employee.reportingTo || "N/A"}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">About</h3>
                <p className="text-foreground">{employee.bioData || employee.bio}</p>
              </Card>

              <Card className="border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Current Allocations</h3>
                {currentAllocations.length > 0 ? (
                  <div className="space-y-3">
                    {currentAllocations.map((alloc) => {
                      const project = mockProjects.find((p) => p.id === alloc.project)
                      return (
                        <div
                          key={alloc.id}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-foreground">{project?.name}</p>
                            <p className="text-sm text-muted-foreground">{alloc.notes}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-foreground">{alloc.allocationPercent}%</p>
                            <p className="text-xs text-muted-foreground">
                              {alloc.billable ? "Billable" : "Non-billable"}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No active allocations</p>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              <Card className="border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Skills & Proficiencies</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {employee.skills.map((skill, idx) => (
                    <div key={idx} className={`p-4 rounded-lg ${getProficiencyColor(skill.proficiency)}`}>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm opacity-75">{skill.proficiency}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card className="border-border/50 p-6">
                <h3 className="text-lg font-semibold text-foreground mb-6">Active Projects</h3>
                <div className="space-y-4">
                  {currentAllocations.length > 0 ? (
                    currentAllocations.map((allocation, idx) => {
                      const project = mockProjects.find((p) => p.id === allocation.projectId)
                      return (
                        <div
                          key={idx}
                          className="p-4 border border-border/50 rounded-lg hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium text-foreground">{project?.name}</p>
                            <Badge variant="secondary">{allocation.percentage}%</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{project?.description}</p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Start: {new Date(allocation.startDate).toLocaleDateString()}</span>
                            {allocation.endDate && (
                              <span>End: {new Date(allocation.endDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-muted-foreground">No active projects</p>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Personal Info Tab */}
            <TabsContent value="personal">
              <Card className="border-border/50 p-6">
                <h3 className="mb-6 text-lg font-semibold text-foreground">Personal Information</h3>
                <div className="space-y-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Date of Birth</p>
                      <p className="mt-1 font-medium text-foreground">
                        {employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
                      </p>
                      {age && <p className="text-sm text-muted-foreground mt-1">Age: {age} years</p>}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gender</p>
                      <p className="mt-1 font-medium text-foreground">{employee.gender || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Address</p>
                      <p className="mt-1 font-medium text-foreground">{employee.address || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Emergency Contact</p>
                      <p className="mt-1 font-medium text-foreground">{employee.emergencyContact || "N/A"}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-border/50">
                    <h4 className="font-semibold text-foreground mb-4">Education & Experience</h4>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground">College/University</p>
                        <p className="mt-1 font-medium text-foreground">{employee.college || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Educational Stream</p>
                        <p className="mt-1 font-medium text-foreground">{employee.educationalStream || "N/A"}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Previous Experience</p>
                        <p className="mt-1 font-medium text-foreground">{employee.previousExperience || 0} years</p>
                      </div>
                    </div>
                  </div>

                  {(employee.githubUrl || employee.picture || employee.resume) && (
                    <div className="pt-6 border-t border-border/50">
                      <h4 className="font-semibold text-foreground mb-4">Links & Documents</h4>
                      <div className="space-y-2">
                        {employee.githubUrl && (
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-primary" />
                            <a
                              href={employee.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              GitHub Profile
                            </a>
                          </div>
                        )}
                        {employee.resume && (
                          <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-primary" />
                            <a
                              href={employee.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              Resume
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
