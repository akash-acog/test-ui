"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit2, Trash2, TrendingUp, ChevronDown, ChevronUp, Users, Calendar, DollarSign, Target, Layers } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import { getProjectsByRole, getEmployeeById, mockEmployees } from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface ProjectManagementPageProps {
  onViewEmployee?: (id: string, from: string) => void
  userRole?: string
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Active: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    Planned: "bg-primary/10 text-primary border-primary/20",
    Completed: "bg-muted text-muted-foreground border-muted-foreground/20",
  }
  return colors[status] || "bg-muted text-muted-foreground"
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    Critical: "bg-destructive/10 text-destructive border-destructive/20",
    High: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    Medium: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    Low: "bg-primary/10 text-primary border-primary/20",
  }
  return colors[priority] || "bg-muted text-muted-foreground"
}

const getProficiencyColor = (proficiency: string) => {
  const colors: Record<string, string> = {
    Expert: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    Advanced: "bg-primary/10 text-primary border-primary/20",
    Intermediate: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    Beginner: "bg-muted text-muted-foreground border-muted-foreground/20",
  }
  return colors[proficiency] || "bg-muted text-muted-foreground"
}

// Project type icons and gradients
const projectTypeConfig: Record<string, { icon: any; gradient: string }> = {
  Billable: { icon: DollarSign, gradient: "from-green-500 to-emerald-600" },
  "Non-billable": { icon: Target, gradient: "from-blue-500 to-cyan-600" },
  Internal: { icon: Layers, gradient: "from-purple-500 to-fuchsia-600" },
}

export function ProjectManagementPage({ onViewEmployee, userRole }: ProjectManagementPageProps) {
  const { user } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [expandedProject, setExpandedProject] = useState<string | null>(null)
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "Planned",
    priority: "Medium",
    type: "Billable",
    budget: "",
    teamSize: "",
    manager: mockEmployees[0]?.id || "",
    startDate: "",
    endDate: "",
  })

  const visibleProjects = getProjectsByRole(user?.role || userRole || "employee", user?.id)

  const filteredProjects = visibleProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter
    const matchesType = typeFilter === "all" || project.type === typeFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesType
  })

  const canEdit = hasPermission(user?.role || userRole || "employee", "manage_projects")
  const canDelete = hasPermission(user?.role || userRole || "employee", "manage_projects")
  const canAdd = hasPermission(user?.role || userRole || "employee", "manage_projects")

  const handleAddProject = () => {
    setIsAddProjectOpen(false)
    setFormData({
      name: "",
      code: "",
      description: "",
      status: "Planned",
      priority: "Medium",
      type: "Billable",
      budget: "",
      teamSize: "",
      manager: mockEmployees[0]?.id || "",
      startDate: "",
      endDate: "",
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Projects</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {user?.role === "employee" ? "Your assigned projects" : "Manage all projects and resources"}
          </p>
        </div>
        {canAdd && (
          <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all border-0">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Project</DialogTitle>
                <DialogDescription>Create a new project and define skill requirements</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Mobile App Development"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-muted/30 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Project Code</Label>
                    <Input
                      id="code"
                      placeholder="e.g., PROJ-001"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="bg-muted/30 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Project description and objectives"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-24 bg-muted/30 border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                      <SelectTrigger className="bg-muted/30 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Planned">Planned</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v })}>
                      <SelectTrigger className="bg-muted/30 border-border">
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
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Project Type</Label>
                    <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                      <SelectTrigger className="bg-muted/30 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Billable">Billable</SelectItem>
                        <SelectItem value="Non-billable">Non-billable</SelectItem>
                        <SelectItem value="Internal">Internal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Project Manager</Label>
                    <Select value={formData.manager} onValueChange={(v) => setFormData({ ...formData, manager: v })}>
                      <SelectTrigger className="bg-muted/30 border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEmployees.slice(0, 5).map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="100000"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="bg-muted/30 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      type="number"
                      placeholder="5"
                      value={formData.teamSize}
                      onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                      className="bg-muted/30 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="bg-muted/30 border-border"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="bg-muted/30 border-border"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-border">
                  <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddProject} className="bg-gradient-primary text-white border-0">
                    Create Project
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card className="border-border bg-card p-6 card-hover">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            Search & Filter
          </h3>
          <div className="grid gap-3 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, code, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-muted/30 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-muted/30 border-border">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Planned">Planned</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="bg-muted/30 border-border">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-muted/30 border-border">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Billable">Billable</SelectItem>
                <SelectItem value="Non-billable">Non-billable</SelectItem>
                <SelectItem value="Internal">Internal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredProjects.map((project) => {
          const manager = getEmployeeById(project.manager)
          const isExpanded = expandedProject === project.id
          const typeConfig = projectTypeConfig[project.type] || projectTypeConfig.Billable
          const TypeIcon = typeConfig.icon
          const budgetUsed = Math.round((project.spent / project.budget) * 100)

          return (
            <Card
              key={project.id}
              className="border-border bg-card overflow-hidden card-hover group relative"
            >
              {/* Gradient accent bar */}
              <div className={`h-2 bg-gradient-to-r ${typeConfig.gradient}`} />
              
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  {/* Project Type Icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${typeConfig.gradient} rounded-xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                    <div className={`relative h-14 w-14 rounded-xl bg-gradient-to-br ${typeConfig.gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <TypeIcon className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide font-mono bg-muted/50 px-2 py-0.5 rounded">
                        {project.code}
                      </span>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                      <Badge variant="outline" className="text-xs border">
                        {project.type}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{project.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Edit/Delete Actions */}
                  {canEdit && (
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground hover:bg-primary/10"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {canDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">Manager</p>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => onViewEmployee?.(project.manager, "projects")}
                        className="text-primary p-0 h-auto font-semibold truncate max-w-full text-sm"
                      >
                        {manager?.name || "Unknown"}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-chart-3" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">Timeline</p>
                      <p className="text-sm font-semibold text-foreground truncate">
                        {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-chart-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground font-medium">Team Size</p>
                      <p className="text-sm font-semibold text-foreground">
                        {project.teamSize} members
                      </p>
                    </div>
                  </div>

                  {canEdit && (
                    <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                      <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-chart-3" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground font-medium">Budget Used</p>
                        <p className="text-sm font-semibold text-foreground">
                          {budgetUsed}% • ${(project.spent/1000).toFixed(0)}K
                        </p>
                        <Progress value={budgetUsed} className="h-1 mt-1" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Required Skills Section */}
                {project.requiredSkills && project.requiredSkills.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <button
                      onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                      className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-full justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Required Skills ({project.requiredSkills.length})
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 grid gap-2 md:grid-cols-2">
                        {project.requiredSkills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50"
                          >
                            <p className="font-medium text-foreground">{skill.name}</p>
                            <Badge className={getProficiencyColor(skill.proficiency)}>{skill.proficiency}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="border-border bg-card p-12 text-center card-hover">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">No projects found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
