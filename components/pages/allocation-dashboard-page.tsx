"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import {
  mockEmployees,
  mockProjects,
  mockAllocations,
  calculateEmployeeUtilization,
  getEmployeeAvailability,
  getEmployeeAvailabilityPercentage,
} from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface AllocationDashboardPageProps {
  onViewEmployee?: (id: string, from: string) => void
  userRole?: string
}

export function AllocationDashboardPage({ onViewEmployee, userRole }: AllocationDashboardPageProps) {
  const { user } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isAddAllocationOpen, setIsAddAllocationOpen] = useState(false)
  const [allocationForm, setAllocationForm] = useState({
    employee: "",
    project: "",
    allocationPercent: "50",
    startDate: "",
    endDate: "",
    billable: true,
    notes: "",
  })

  const employeeAllocations = mockEmployees.map((employee) => {
    const utilization = calculateEmployeeUtilization(employee.id)
    const availability = getEmployeeAvailability(employee.id)
    const availabilityPercentage = getEmployeeAvailabilityPercentage(employee.id)

    const today = new Date()
    const activeAllocations = mockAllocations.filter((a) => {
      const startDate = new Date(a.startDate)
      const endDate = a.endDate ? new Date(a.endDate) : null
      return a.employee === employee.id && startDate <= today && (!endDate || endDate >= today)
    })

    return {
      employee,
      utilization,
      availability,
      availabilityPercentage,
      availabilityStatus: availability,
      allocations: activeAllocations.map((alloc) => ({
        ...alloc,
        project: mockProjects.find((p) => p.id === alloc.project),
      })),
    }
  })

  const filteredAllocations = employeeAllocations.filter((item) => {
    const matchesSearch = item.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDept = departmentFilter === "all" || item.employee.department === departmentFilter
    const matchesStatus = statusFilter === "all" || item.availabilityStatus === statusFilter

    return matchesSearch && matchesDept && matchesStatus
  })

  const overallocatedEmployees = employeeAllocations.filter((item) => item.utilization > 100)

  const getStatusColor = (availability: string) => {
    const colors: Record<string, string> = {
      Free: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
      Partial: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
      "Fully Allocated": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    }
    return colors[availability] || "bg-slate-100 text-slate-800"
  }

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 100) return "bg-red-500"
    if (utilization === 100) return "bg-orange-500"
    if (utilization >= 50) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const canCreate = hasPermission(user?.role || userRole || "employee", "manage_allocations")
  const departments = Array.from(new Set(mockEmployees.map((e) => e.department)))

  const handleAllocateResource = () => {
    setIsAddAllocationOpen(false)
    setAllocationForm({
      employee: "",
      project: "",
      allocationPercent: "50",
      startDate: "",
      endDate: "",
      billable: true,
      notes: "",
    })
  }

  const selectedEmployee = mockEmployees.find((e) => e.id === allocationForm.employee)
  const selectedEmployeeAvailability = selectedEmployee ? getEmployeeAvailabilityPercentage(selectedEmployee.id) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Resource Allocation</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Track employee utilization and manage project allocations
          </p>
        </div>
        {canCreate && (
          <Dialog open={isAddAllocationOpen} onOpenChange={setIsAddAllocationOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <Plus className="h-4 w-4" />
                New Allocation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Allocate Resource to Project</DialogTitle>
                <DialogDescription>Assign an employee to a project with specific allocation details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Employee</Label>
                    <Select
                      value={allocationForm.employee}
                      onValueChange={(v) => setAllocationForm({ ...allocationForm, employee: v })}
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Choose employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockEmployees.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.name} ({emp.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Project</Label>
                    <Select
                      value={allocationForm.project}
                      onValueChange={(v) => setAllocationForm({ ...allocationForm, project: v })}
                    >
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Choose project" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockProjects.map((proj) => (
                          <SelectItem key={proj.id} value={proj.id}>
                            {proj.name} ({proj.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Allocation % (Max: {selectedEmployeeAvailability}% available)</Label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max={selectedEmployeeAvailability}
                      value={allocationForm.allocationPercent}
                      onChange={(e) => setAllocationForm({ ...allocationForm, allocationPercent: e.target.value })}
                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Selected:{" "}
                        <span className="font-bold text-slate-900 dark:text-white">
                          {allocationForm.allocationPercent}%
                        </span>
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-500">
                        Max available: {selectedEmployeeAvailability}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={allocationForm.startDate}
                      onChange={(e) => setAllocationForm({ ...allocationForm, startDate: e.target.value })}
                      className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={allocationForm.endDate}
                      onChange={(e) => setAllocationForm({ ...allocationForm, endDate: e.target.value })}
                      className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="billable"
                      checked={allocationForm.billable}
                      onChange={(e) => setAllocationForm({ ...allocationForm, billable: e.target.checked })}
                      className="rounded border border-slate-300 dark:border-slate-600"
                    />
                    <Label htmlFor="billable" className="cursor-pointer font-medium">
                      Billable Work
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input
                    id="notes"
                    placeholder="Add any specific notes about this allocation"
                    value={allocationForm.notes}
                    onChange={(e) => setAllocationForm({ ...allocationForm, notes: e.target.value })}
                    className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <Button variant="outline" onClick={() => setIsAddAllocationOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAllocateResource}
                    className="bg-gradient-to-r from-primary to-accent text-white"
                  >
                    Create Allocation
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {overallocatedEmployees.length > 0 && (
        <Alert className="border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/20">
          <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
          <AlertDescription className="text-red-800 dark:text-red-300 font-medium">
            {overallocatedEmployees.length} employee(s) with over-allocation conflicts exceeding 100% utilization
          </AlertDescription>
        </Alert>
      )}

      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wide">
            Search & Filter
          </h3>
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by employee name..."
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
                <SelectItem value="Fully Allocated">Fully Allocated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredAllocations.map((item) => {
          const isOverallocated = item.utilization > 100

          return (
            <Card
              key={item.employee.id}
              className={`border transition-all duration-300 ${
                isOverallocated
                  ? "border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              } p-6 hover:shadow-lg hover:-translate-y-1`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.employee.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {item.employee.code} • {item.employee.designation} • {item.employee.department}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(item.availabilityStatus)}>{item.availabilityStatus}</Badge>
                    {isOverallocated && (
                      <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
                        Over-allocated
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                        Utilization
                      </span>
                      <span
                        className={`text-sm font-bold ${isOverallocated ? "text-red-600 dark:text-red-400" : "text-slate-900 dark:text-white"}`}
                      >
                        {item.utilization}%
                      </span>
                    </div>
                    <Progress
                      value={Math.min(item.utilization, 100)}
                      className={`h-2 ${getUtilizationColor(item.utilization)}`}
                    />
                    {isOverallocated && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-2 font-medium">
                        Exceeds by {item.utilization - 100}%
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Availability
                    </p>
                    <p
                      className={`text-lg font-bold ${item.availabilityPercentage === 0 ? "text-orange-600 dark:text-orange-400" : item.availabilityPercentage >= 50 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}
                    >
                      {item.availabilityPercentage}%
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                      Active Projects
                    </p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.allocations.length}</p>
                  </div>
                </div>

                {item.allocations.length > 0 ? (
                  <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Current Allocations</h4>
                    {item.allocations.map((alloc) => (
                      <div
                        key={alloc.id}
                        className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-800 p-4"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">{alloc.project?.name}</p>
                          {alloc.notes && (
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{alloc.notes}</p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-bold text-lg text-slate-900 dark:text-white">{alloc.allocationPercent}%</p>
                          <Badge variant={alloc.billable ? "default" : "secondary"} className="text-xs mt-2">
                            {alloc.billable ? "Billable" : "Non-billable"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 text-center py-4">No active allocations</p>
                  </div>
                )}
              </div>
            </Card>
          )
        })}
      </div>

      {filteredAllocations.length === 0 && (
        <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
          <p className="text-slate-600 dark:text-slate-400">No allocations found matching your filters</p>
        </Card>
      )}
    </div>
  )
}
