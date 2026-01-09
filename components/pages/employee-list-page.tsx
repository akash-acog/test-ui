"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, Edit2, Trash2 } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import { getEmployeesByRole } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"

interface EmployeeListPageProps {
  onViewEmployee?: (id: string, from: string) => void
  userRole?: string
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Employees</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Manage and view employee information across your organization
          </p>
        </div>
        {canAdd && (
          <Button className="gap-2 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        )}
      </div>

      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
            Search & Filter
          </h3>
          <div className="grid gap-3 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, code, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg"
                />
              </div>
            </div>

            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg">
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
              <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg">
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
              <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg">
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((emp) => (
          <Card
            key={emp.id}
            className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold text-sm">
                    {emp.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{emp.name}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{emp.code}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {emp.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Designation</span>
                  <span className="font-medium text-slate-900 dark:text-white">{emp.designation}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Department</span>
                  <span className="font-medium text-slate-900 dark:text-white">{emp.department}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Location</span>
                  <span className="font-medium text-slate-900 dark:text-white">{emp.location}</span>
                </div>
              </div>

              <div className="pt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewEmployee?.(emp.id, "employees")}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                {canEdit && (
                  <Button variant="ghost" size="sm">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                )}
                {canDelete && (
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <p className="text-slate-600 dark:text-slate-400">No employees found matching your filters</p>
        </Card>
      )}
    </div>
  )
}
