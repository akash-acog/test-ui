"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Circle } from "lucide-react"
import type { UserRole } from "@/lib/role-config"

interface ChecklistTask {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "high" | "medium" | "low"
  dueDate: string
  assignedTo?: string
  category: string
}

interface ChecklistPageProps {
  userRole: UserRole
}

const SAMPLE_CHECKLISTS = {
  employee: [
    {
      id: "1",
      title: "Complete onboarding documents",
      description: "Submit all required forms and documentation",
      completed: true,
      priority: "high" as const,
      dueDate: "2024-01-15",
      category: "Onboarding",
    },
    {
      id: "2",
      title: "Set up development environment",
      description: "Install and configure all required tools",
      completed: true,
      priority: "high" as const,
      dueDate: "2024-01-16",
      category: "Setup",
    },
    {
      id: "3",
      title: "Review company policies",
      description: "Read and acknowledge all company policies",
      completed: false,
      priority: "medium" as const,
      dueDate: "2024-01-20",
      category: "Training",
    },
    {
      id: "4",
      title: "Team introduction meeting",
      description: "Meet with your team and manager",
      completed: false,
      priority: "medium" as const,
      dueDate: "2024-01-18",
      category: "Meeting",
    },
  ],
  manager: [
    {
      id: "1",
      title: "Review team performance",
      description: "Conduct quarterly performance reviews",
      completed: false,
      priority: "high" as const,
      dueDate: "2024-01-25",
      assignedTo: "Team",
      category: "Performance",
    },
    {
      id: "2",
      title: "Approve project budget",
      description: "Review and approve Q1 project budget",
      completed: false,
      priority: "high" as const,
      dueDate: "2024-01-20",
      category: "Planning",
    },
    {
      id: "3",
      title: "Resource allocation review",
      description: "Review team resource allocation and optimization",
      completed: true,
      priority: "medium" as const,
      dueDate: "2024-01-19",
      category: "Resources",
    },
  ],
  admin: [
    {
      id: "1",
      title: "System security audit",
      description: "Conduct comprehensive security audit",
      completed: false,
      priority: "high" as const,
      dueDate: "2024-01-22",
      category: "Security",
    },
    {
      id: "2",
      title: "Database backup verification",
      description: "Verify all backup procedures are working",
      completed: true,
      priority: "high" as const,
      dueDate: "2024-01-18",
      category: "Maintenance",
    },
    {
      id: "3",
      title: "User access review",
      description: "Review and update user access permissions",
      completed: false,
      priority: "medium" as const,
      dueDate: "2024-01-21",
      category: "Admin",
    },
  ],
  hr: [
    {
      id: "1",
      title: "Update employee records",
      description: "Ensure all employee information is current",
      completed: true,
      priority: "high" as const,
      dueDate: "2024-01-15",
      category: "Records",
    },
    {
      id: "2",
      title: "Process payroll",
      description: "Complete monthly payroll processing",
      completed: false,
      priority: "high" as const,
      dueDate: "2024-01-18",
      category: "Payroll",
    },
    {
      id: "3",
      title: "Conduct recruitment",
      description: "Review and interview candidates",
      completed: false,
      priority: "medium" as const,
      dueDate: "2024-01-25",
      category: "Recruitment",
    },
  ],
}

export function ChecklistPage({ userRole }: ChecklistPageProps) {
  const defaultChecklists = SAMPLE_CHECKLISTS[userRole as keyof typeof SAMPLE_CHECKLISTS] || SAMPLE_CHECKLISTS.employee
  const [checklists, setChecklists] = useState<ChecklistTask[]>(defaultChecklists)
  const [filterPriority, setFilterPriority] = useState<string>("all")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const toggleTask = (id: string) => {
    setChecklists((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setChecklists((prev) => prev.filter((task) => task.id !== id))
  }

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: ChecklistTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        description: "",
        completed: false,
        priority: "medium",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        category: "General",
      }
      setChecklists((prev) => [newTask, ...prev])
      setNewTaskTitle("")
    }
  }

  const filteredChecklists = checklists.filter((task) => {
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    const matchesCategory = filterCategory === "all" || task.category === filterCategory
    return matchesPriority && matchesCategory
  })

  const completedCount = filteredChecklists.filter((t) => t.completed).length
  const totalCount = filteredChecklists.length
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  const categories = Array.from(new Set(checklists.map((t) => t.category)))
  const priorities = ["high", "medium", "low"]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-foreground mb-2">Task Checklist</h1>
          <p className="text-primary-foreground/80">Manage and track your tasks and deliverables</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8 space-y-6">
        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm font-bold">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {completedCount} of {totalCount} tasks completed
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Task */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTask()}
              />
              <Button onClick={addTask} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <div className="flex gap-2">
                  <Button
                    variant={filterPriority === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterPriority("all")}
                  >
                    All
                  </Button>
                  {priorities.map((p) => (
                    <Button
                      key={p}
                      variant={filterPriority === p ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterPriority(p)}
                      className="capitalize"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant={filterCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterCategory("all")}
                  >
                    All
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat}
                      variant={filterCategory === cat ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-3">
          {filteredChecklists.length > 0 ? (
            filteredChecklists.map((task) => (
              <Card key={task.id} className={task.completed ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox checked={task.completed} onChange={() => toggleTask(task.id)} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`font-semibold ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </h3>
                        <Badge variant={getPriorityColor(task.priority)} className="capitalize">
                          {task.priority}
                        </Badge>
                        <Badge variant="outline">{task.category}</Badge>
                      </div>
                      {task.description && <p className="text-sm text-muted-foreground mb-2">{task.description}</p>}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        {task.assignedTo && <span>Assigned to: {task.assignedTo}</span>}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Circle className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <p className="text-muted-foreground">No tasks match your filters</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
