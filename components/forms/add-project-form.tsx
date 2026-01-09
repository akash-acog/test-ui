"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save } from "lucide-react"
import { mockEmployees, mockProjects } from "@/lib/mock-data"

interface AddProjectFormProps {
  onSubmit?: (data: any) => void
  onCancel?: () => void
}

const skillsList = [
  "React", "Node.js", "TypeScript", "Python", "Java", "Go", "Kubernetes", "AWS", "Docker",
  "PostgreSQL", "MongoDB", "GraphQL", "REST API", "Microservices", "Machine Learning",
  "Data Analysis", "UI/UX Design", "Figma", "Product Management", "Agile"
]

export function AddProjectForm({ onSubmit, onCancel }: AddProjectFormProps) {
  const [formData, setFormData] = useState({
    code: `PRJ${String(mockProjects.length + 1).padStart(3, '0')}`,
    name: "",
    description: "",
    status: "Planned",
    priority: "Medium",
    type: "Billable",
    startDate: new Date().toISOString().split('T')[0],
    endDate: "",
    manager: "",
    budget: "",
    teamSize: "5",
    requiredSkills: [] as { name: string; proficiency: string }[],
  })

  const [newSkill, setNewSkill] = useState({ name: "", proficiency: "Intermediate" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Get potential project managers (managers and senior engineers)
  const potentialManagers = mockEmployees.filter((emp) => 
    [
      "Engineering Manager",
      "Product Manager",
      "Lead Software Engineer",
      "Senior Software Engineer"
    ].includes(emp.designation)
  )

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Project name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.manager) newErrors.manager = "Project manager is required"
    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      newErrors.budget = "Valid budget amount is required"
    }

    // Validate end date is after start date
    if (formData.endDate && formData.startDate) {
      if (new Date(formData.endDate) <= new Date(formData.startDate)) {
        newErrors.endDate = "End date must be after start date"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddSkill = () => {
    if (newSkill.name && !formData.requiredSkills.find((s) => s.name === newSkill.name)) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, { ...newSkill }],
      })
      setNewSkill({ name: "", proficiency: "Intermediate" })
    }
  }

  const handleRemoveSkill = (skillName: string) => {
    setFormData({
      ...formData,
      requiredSkills: formData.requiredSkills.filter((s) => s.name !== skillName),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const projectData = {
        ...formData,
        budget: parseFloat(formData.budget),
        teamSize: parseInt(formData.teamSize),
        spent: 0, // Initial spent amount
      }
      console.log("Submitting project data:", projectData)
      onSubmit?.(projectData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Create New Project</h2>
            <p className="text-sm text-muted-foreground mt-1">Fill in all the project details below</p>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Basic Information</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="code">Project Code *</Label>
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
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`bg-muted/30 ${errors.name ? 'border-destructive' : ''}`}
                  placeholder="E-commerce Platform"
                />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`bg-muted/30 ${errors.description ? 'border-destructive' : ''}`}
                  rows={3}
                  placeholder="Detailed project description, objectives, and scope"
                />
                {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Project Classification */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Classification</h3>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Label htmlFor="status">Status *</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planned">Planned</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority *</Label>
                <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Project Type *</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger className="bg-muted/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Billable">Billable</SelectItem>
                    <SelectItem value="Non-billable">Non-billable</SelectItem>
                    <SelectItem value="Internal">Internal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Timeline & Budget */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Timeline & Budget</h3>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className={`bg-muted/30 ${errors.startDate ? 'border-destructive' : ''}`}
                />
                {errors.startDate && <p className="text-xs text-destructive mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className={`bg-muted/30 ${errors.endDate ? 'border-destructive' : ''}`}
                />
                {errors.endDate && <p className="text-xs text-destructive mt-1">{errors.endDate}</p>}
                <p className="text-xs text-muted-foreground mt-1">Optional - Leave empty for ongoing projects</p>
              </div>

              <div>
                <Label htmlFor="budget">Budget (USD) *</Label>
                <Input
                  id="budget"
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className={`bg-muted/30 ${errors.budget ? 'border-destructive' : ''}`}
                  placeholder="100000"
                />
                {errors.budget && <p className="text-xs text-destructive mt-1">{errors.budget}</p>}
              </div>

              <div>
                <Label htmlFor="teamSize">Expected Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  className="bg-muted/30"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Team Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Team Management</h3>
            
            <div>
              <Label htmlFor="manager">Project Manager *</Label>
              <Select value={formData.manager} onValueChange={(v) => setFormData({ ...formData, manager: v })}>
                <SelectTrigger className={`bg-muted/30 ${errors.manager ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select project manager" />
                </SelectTrigger>
                <SelectContent>
                  {potentialManagers.map((mgr) => (
                    <SelectItem key={mgr.id} value={mgr.id}>
                      {mgr.name} - {mgr.designation} ({mgr.department})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.manager && <p className="text-xs text-destructive mt-1">{errors.manager}</p>}
              <p className="text-xs text-muted-foreground mt-1">
                The manager will be responsible for team allocations and performance reviews
              </p>
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">Required Skills</h3>
            <p className="text-sm text-muted-foreground">
              Define the skills needed for this project. This will help with skill matching and team allocation.
            </p>
            
            <div className="flex gap-2">
              <Select value={newSkill.name} onValueChange={(v) => setNewSkill({ ...newSkill, name: v })}>
                <SelectTrigger className="bg-muted/30 flex-1">
                  <SelectValue placeholder="Select skill" />
                </SelectTrigger>
                <SelectContent>
                  {skillsList
                    .filter(skill => !formData.requiredSkills.find(s => s.name === skill))
                    .map((skill) => (
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

            {/* Skills Display */}
            <div className="space-y-2">
              {formData.requiredSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.requiredSkills.map((skill) => {
                    const proficiencyColor =
                      skill.proficiency === "Expert" ? "bg-chart-3/10 text-chart-3 border-chart-3/20" :
                      skill.proficiency === "Advanced" ? "bg-primary/10 text-primary border-primary/20" :
                      skill.proficiency === "Intermediate" ? "bg-chart-4/10 text-chart-4 border-chart-4/20" :
                      "bg-muted text-muted-foreground border-border"

                    return (
                      <Badge
                        key={skill.name}
                        className={`${proficiencyColor} pl-3 pr-1 py-1.5 gap-2 text-sm`}
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
                </div>
              ) : (
                <div className="p-6 bg-muted/30 rounded-lg border-2 border-dashed border-border text-center">
                  <p className="text-sm text-muted-foreground">No skills added yet</p>
                  <p className="text-xs text-muted-foreground mt-1">Add required skills to enable better team matching</p>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Project Summary</h4>
            <div className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Project Code:</span>
                <span className="font-medium">{formData.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="outline">{formData.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Priority:</span>
                <Badge
                  className={
                    formData.priority === "Critical" ? "bg-destructive/10 text-destructive" :
                    formData.priority === "High" ? "bg-orange-500/10 text-orange-600" :
                    formData.priority === "Medium" ? "bg-primary/10 text-primary" :
                    "bg-muted text-muted-foreground"
                  }
                >
                  {formData.priority}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="outline">{formData.type}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget:</span>
                <span className="font-medium">${formData.budget ? parseFloat(formData.budget).toLocaleString() : '0'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Required Skills:</span>
                <span className="font-medium">{formData.requiredSkills.length} skills</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2 bg-gradient-primary text-white border-0">
              <Save className="h-4 w-4" />
              Create Project
            </Button>
          </div>
        </div>
      </Card>
    </form>
  )
}
