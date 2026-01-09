"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, ArrowLeft, ArrowRight, Upload } from "lucide-react"
import { mockEmployees } from "@/lib/mock-data"

interface AddEmployeeFormProps {
  onSubmit?: (data: any) => void
  onCancel?: () => void
}

const departments = ["Engineering", "Product", "Design", "Marketing", "Sales", "HR", "Finance", "Operations"]
const designations = [
  "Software Engineer",
  "Senior Software Engineer",
  "Lead Software Engineer",
  "Engineering Manager",
  "Product Manager",
  "Product Designer",
  "UI/UX Designer",
  "Marketing Manager",
  "HR Manager",
  "Intern",
]
const locations = ["Bangalore", "Hyderabad", "Mumbai", "Delhi", "Pune", "Chennai", "Remote"]
const workstreams = ["Frontend", "Backend", "Full Stack", "DevOps", "Mobile", "Data Science", "QA", "Product", "Design"]
const skillsList = [
  "React", "Node.js", "TypeScript", "Python", "Java", "Go", "Kubernetes", "AWS", "Docker",
  "PostgreSQL", "MongoDB", "GraphQL", "REST API", "Microservices", "Machine Learning",
  "Data Analysis", "UI/UX Design", "Figma", "Product Management", "Agile"
]

export function AddEmployeeForm({ onSubmit, onCancel }: AddEmployeeFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Information
    code: `EMP${String(mockEmployees.length + 1).padStart(3, '0')}`,
    name: "",
    email: "",
    joinDate: new Date().toISOString().split('T')[0],
    type: "Full Time",
    status: "Active",

    // Employment Details
    department: "",
    designation: "",
    location: "",
    workstream: "",
    manager: "",

    // Personal Information
    dob: "",
    gender: "",
    phone: "",
    address: "",
    emergencyContact: "",

    // Education & Experience
    previousExperience: "",
    college: "",
    educationalStream: "",

    // Professional
    bio: "",
    githubUrl: "",
    pictureUrl: "",
    resumeUrl: "",

    // Skills
    skills: [] as { name: string; proficiency: string }[],
  })

  const [newSkill, setNewSkill] = useState({ name: "", proficiency: "Beginner" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const managers = mockEmployees.filter((emp) => 
    ["Engineering Manager", "Product Manager", "HR Manager", "Lead Software Engineer"].includes(emp.designation)
  )

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
      if (!formData.joinDate) newErrors.joinDate = "Date of joining is required"
    }

    if (step === 2) {
      if (!formData.department) newErrors.department = "Department is required"
      if (!formData.designation) newErrors.designation = "Designation is required"
      if (!formData.location) newErrors.location = "Location is required"
    }

    if (step === 3) {
      if (!formData.dob) newErrors.dob = "Date of birth is required"
      if (!formData.gender) newErrors.gender = "Gender is required"
      if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
    setErrors({})
  }

  const handleAddSkill = () => {
    if (newSkill.name && !formData.skills.find((s) => s.name === newSkill.name)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, { ...newSkill }],
      })
      setNewSkill({ name: "", proficiency: "Beginner" })
    }
  }

  const handleRemoveSkill = (skillName: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s.name !== skillName),
    })
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log("Submitting employee data:", formData)
      onSubmit?.(formData)
    }
  }

  const steps = [
    { number: 1, title: "Basic Information", description: "Core employee details" },
    { number: 2, title: "Employment Details", description: "Role and location" },
    { number: 3, title: "Personal Information", description: "Contact and personal data" },
    { number: 4, title: "Education & Experience", description: "Background information" },
    { number: 5, title: "Professional Details", description: "Bio, links, and skills" },
  ]

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  currentStep === step.number
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.number
                    ? "bg-chart-3 text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step.number}
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-semibold">{step.title}</p>
                <p className="text-xs text-muted-foreground hidden md:block">{step.description}</p>
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-border mx-2 mt-[-40px]" />
            )}
          </div>
        ))}
      </div>

      <Card className="p-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Basic Information</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="code">Employee Code *</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="bg-muted/30"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">Auto-generated</p>
              </div>

              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`bg-muted/30 ${errors.name ? 'border-destructive' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`bg-muted/30 ${errors.email ? 'border-destructive' : ''}`}
                  placeholder="john.doe@company.com"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="joinDate">Date of Joining *</Label>
                <Input
                  id="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                  className={`bg-muted/30 ${errors.joinDate ? 'border-destructive' : ''}`}
                />
                {errors.joinDate && <p className="text-xs text-destructive mt-1">{errors.joinDate}</p>}
              </div>

              <div>
                <Label htmlFor="type">Employment Type *</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full Time">Full Time</SelectItem>
                    <SelectItem value="Intern">Intern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Employment Status *</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Employment Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Employment Details</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="department">Department *</Label>
                <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                  <SelectTrigger className={`bg-muted/30 ${errors.department ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.department && <p className="text-xs text-destructive mt-1">{errors.department}</p>}
              </div>

              <div>
                <Label htmlFor="designation">Designation *</Label>
                <Select value={formData.designation} onValueChange={(v) => setFormData({ ...formData, designation: v })}>
                  <SelectTrigger className={`bg-muted/30 ${errors.designation ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select designation" />
                  </SelectTrigger>
                  <SelectContent>
                    {designations.map((desig) => (
                      <SelectItem key={desig} value={desig}>{desig}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.designation && <p className="text-xs text-destructive mt-1">{errors.designation}</p>}
              </div>

              <div>
                <Label htmlFor="location">Office Location *</Label>
                <Select value={formData.location} onValueChange={(v) => setFormData({ ...formData, location: v })}>
                  <SelectTrigger className={`bg-muted/30 ${errors.location ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
              </div>

              <div>
                <Label htmlFor="workstream">Workstream</Label>
                <Select value={formData.workstream} onValueChange={(v) => setFormData({ ...formData, workstream: v })}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue placeholder="Select workstream" />
                  </SelectTrigger>
                  <SelectContent>
                    {workstreams.map((ws) => (
                      <SelectItem key={ws} value={ws}>{ws}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="manager">Reporting Manager</Label>
                <Select value={formData.manager} onValueChange={(v) => setFormData({ ...formData, manager: v })}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {managers.map((mgr) => (
                      <SelectItem key={mgr.id} value={mgr.id}>
                        {mgr.name} ({mgr.designation})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Personal Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className={`bg-muted/30 ${errors.dob ? 'border-destructive' : ''}`}
                />
                {errors.dob && <p className="text-xs text-destructive mt-1">{errors.dob}</p>}
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select value={formData.gender} onValueChange={(v) => setFormData({ ...formData, gender: v })}>
                  <SelectTrigger className={`bg-muted/30 ${errors.gender ? 'border-destructive' : ''}`}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-xs text-destructive mt-1">{errors.gender}</p>}
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`bg-muted/30 ${errors.phone ? 'border-destructive' : ''}`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  className="bg-muted/30"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="bg-muted/30"
                  rows={3}
                  placeholder="Full residential address"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Education & Experience */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Education & Experience</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="previousExperience">Previous Experience (years)</Label>
                <Input
                  id="previousExperience"
                  type="number"
                  min="0"
                  step="0.5"
                  value={formData.previousExperience}
                  onChange={(e) => setFormData({ ...formData, previousExperience: e.target.value })}
                  className="bg-muted/30"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="educationalStream">Educational Stream</Label>
                <Input
                  id="educationalStream"
                  value={formData.educationalStream}
                  onChange={(e) => setFormData({ ...formData, educationalStream: e.target.value })}
                  className="bg-muted/30"
                  placeholder="e.g., Computer Science, MBA"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="college">College/University</Label>
                <Input
                  id="college"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="bg-muted/30"
                  placeholder="Name of college or university"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Professional Details */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Professional Details</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="bio">Bio / About</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="bg-muted/30"
                  rows={4}
                  placeholder="Brief professional summary"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="githubUrl">GitHub Profile URL</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="bg-muted/30"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <Label htmlFor="pictureUrl">Profile Picture URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="pictureUrl"
                      type="url"
                      value={formData.pictureUrl}
                      onChange={(e) => setFormData({ ...formData, pictureUrl: e.target.value })}
                      className="bg-muted/30"
                      placeholder="https://..."
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="resumeUrl">Resume URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="resumeUrl"
                      type="url"
                      value={formData.resumeUrl}
                      onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                      className="bg-muted/30"
                      placeholder="https://..."
                    />
                    <Button type="button" variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="pt-6 border-t">
                <Label className="text-lg font-semibold">Skills</Label>
                <p className="text-sm text-muted-foreground mb-4">Add technical and professional skills</p>
                
                <div className="flex gap-2 mb-4">
                  <Select value={newSkill.name} onValueChange={(v) => setNewSkill({ ...newSkill, name: v })}>
                    <SelectTrigger className="bg-muted/30 flex-1">
                      <SelectValue placeholder="Select skill" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillsList.filter(skill => !formData.skills.find(s => s.name === skill)).map((skill) => (
                        <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={newSkill.proficiency} onValueChange={(v) => setNewSkill({ ...newSkill, proficiency: v })}>
                    <SelectTrigger className="bg-muted/30 w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button type="button" onClick={handleAddSkill} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => {
                    const proficiencyColor =
                      skill.proficiency === "Expert" ? "bg-chart-3/10 text-chart-3 border-chart-3/20" :
                      skill.proficiency === "Advanced" ? "bg-primary/10 text-primary border-primary/20" :
                      skill.proficiency === "Intermediate" ? "bg-chart-4/10 text-chart-4 border-chart-4/20" :
                      "bg-muted text-muted-foreground border-border"

                    return (
                      <Badge
                        key={skill.name}
                        className={`${proficiencyColor} pl-3 pr-1 py-1 gap-2`}
                      >
                        <span>{skill.name} ({skill.proficiency})</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill.name)}
                          className="hover:bg-destructive/20 rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )
                  })}
                  {formData.skills.length === 0 && (
                    <p className="text-sm text-muted-foreground">No skills added yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 mt-6 border-t">
          <div>
            {currentStep > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevious} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            {currentStep < steps.length ? (
              <Button type="button" onClick={handleNext} className="gap-2 bg-gradient-primary text-white border-0">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} className="gap-2 bg-gradient-primary text-white border-0">
                <Save className="h-4 w-4" />
                Create Employee
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
