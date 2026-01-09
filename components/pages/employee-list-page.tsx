"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, Edit2, Trash2, MapPin, Briefcase, Mail, Calendar } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import { getEmployeesByRole } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface EmployeeListPageProps {
  onViewEmployee?: (id: string, from: string) => void
  userRole?: string
}

// Beautiful gradient colors for avatars
const avatarGradients = [
  "from-indigo-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-blue-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-orange-500 to-amber-600",
  "from-violet-500 to-fuchsia-600",
  "from-teal-500 to-cyan-600",
  "from-red-500 to-pink-600",
]

const getGradientForIndex = (index: number) => {
  return avatarGradients[index % avatarGradients.length]
}

export function EmployeeListPage({ onViewEmployee, userRole }: EmployeeListPageProps) {
  const { user } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const visibleEmployees = getEmployeesByRole(user?.role || userRole || "employee", user?.id)

  const filteredEmployees = visibleEmployees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = departmentFilter === "all" || emp.department === departmentFilter
    const matchesLocation = locationFilter === "all" || emp.location === locationFilter
    const matchesType = typeFilter === "all" || emp.type === typeFilter

    return matchesSearch && matchesDept && matchesLocation && matchesType
  })

  const departments = Array.from(new Set(visibleEmployees.map((e) => e.department)))
  const locations = Array.from(new Set(visibleEmployees.map((e) => e.location)))
  const types = Array.from(new Set(visibleEmployees.map((e) => e.type)))

  const canEdit = hasPermission(user?.role || userRole || "employee", "edit_all_employees")
  const canDelete = hasPermission(user?.role || userRole || "employee", "delete_employees")
  const canAdd = hasPermission(user?.role || userRole || "employee", "edit_all_employees")

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Employees</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage and view employee information across your organization
          </p>
        </div>
        {canAdd && (
          <Button className="gap-2 bg-gradient-primary text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-0">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
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
                  placeholder="Search by name, code, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-muted/30 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="bg-muted/30 border-border">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="bg-muted/30 border-border">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="bg-muted/30 border-border">
                <SelectValue placeholder="Employee Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp, index) => {
          const initials = emp.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
          const gradient = getGradientForIndex(index)
          
          return (
            <Card
              key={emp.id}
              className="border-border bg-card overflow-hidden card-hover group relative"
            >
              {/* Gradient accent bar at top */}
              <div className={`h-2 bg-gradient-to-r ${gradient}`} />
              
              <div className="p-6 space-y-4">
                {/* Profile Section with Beautiful Avatar */}
                <div className="flex items-start gap-4">
                  {/* Gradient Avatar with Shadow */}
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                    <div className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <span className="text-white font-bold text-xl">{initials}</span>
                    </div>
                    {/* Status indicator */}
                    <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-card ${
                      emp.status === "Active" ? "bg-chart-3" : "bg-muted-foreground"
                    } shadow-sm`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">
                      {emp.name}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded inline-block mt-1">
                      {emp.code}
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{emp.designation}</p>
                      <p className="text-xs text-muted-foreground">{emp.department}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-foreground">{emp.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground truncate text-xs">{emp.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-xs">
                      Joined {new Date(emp.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                {/* Skills Preview */}
                {emp.skills && emp.skills.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">TOP SKILLS</p>
                    <div className="flex flex-wrap gap-1.5">
                      {emp.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
                          {skill.name}
                        </Badge>
                      ))}
                      {emp.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{emp.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="pt-3 flex gap-2 border-t border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => onViewEmployee?.(emp.id, "employees")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Profile
                  </Button>
                  {canEdit && (
                    <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:border-primary hover:text-primary">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                  {canDelete && (
                    <Button variant="outline" size="sm" className="hover:bg-destructive/10 hover:border-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="border-border bg-card p-12 text-center card-hover">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">No employees found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
