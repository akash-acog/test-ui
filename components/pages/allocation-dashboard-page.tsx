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

const avatarGradients = [
  "from-indigo-500 to-purple-600",
  "from-pink-500 to-rose-600",
  "from-blue-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-orange-500 to-amber-600",
  "from-violet-500 to-fuchsia-600",
]

const getGradientForIndex = (index: number) => avatarGradients[index % avatarGradients.length]

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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Resource Allocation</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track employee utilization and manage project allocations
          </p>
        </div>
        {canCreate && (
          <Dialog open={isAddAllocationOpen} onOpenChange={setIsAddAllocationOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-primary text-white shadow-lg border-0">
                <Plus className="h-4 w-4" />
                New Allocation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Allocate Resource to Project</DialogTitle>
                <DialogDescription>Assign an employee to a project with specific allocation details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Employee</Label>
                    <Select value={allocationForm.employee} onValueChange={(v) => setAllocationForm({ ...allocationForm, employee: v })}>
                      <SelectTrigger className="bg-muted/30"><SelectValue placeholder="Choose employee" /></SelectTrigger>
                      <SelectContent>
                        {mockEmployees.map((emp) => (<SelectItem key={emp.id} value={emp.id}>{emp.name} ({emp.code})</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select value={allocationForm.project} onValueChange={(v) => setAllocationForm({ ...allocationForm, project: v })}>
                      <SelectTrigger className="bg-muted/30"><SelectValue placeholder="Choose project" /></SelectTrigger>
                      <SelectContent>
                        {mockProjects.map((proj) => (<SelectItem key={proj.id} value={proj.id}>{proj.name} ({proj.code})</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Allocation % (Max: {selectedEmployeeAvailability}%)</Label>
                  <input type="range" min="0" max={selectedEmployeeAvailability} value={allocationForm.allocationPercent} onChange={(e) => setAllocationForm({ ...allocationForm, allocationPercent: e.target.value })} className="w-full" />
                  <div className="flex justify-between"><span className="text-sm">Selected: <strong>{allocationForm.allocationPercent}%</strong></span><span className="text-xs text-muted-foreground">Max: {selectedEmployeeAvailability}%</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={allocationForm.startDate} onChange={(e) => setAllocationForm({ ...allocationForm, startDate: e.target.value })} className="bg-muted/30" /></div>
                  <div className="space-y-2"><Label>End Date</Label><Input type="date" value={allocationForm.endDate} onChange={(e) => setAllocationForm({ ...allocationForm, endDate: e.target.value })} className="bg-muted/30" /></div>
                </div>
                <div className="flex items-center gap-2"><input type="checkbox" id="billable" checked={allocationForm.billable} onChange={(e) => setAllocationForm({ ...allocationForm, billable: e.target.checked })} /><Label htmlFor="billable">Billable Work</Label></div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setIsAddAllocationOpen(false)}>Cancel</Button>
                  <Button onClick={handleAllocateResource} className="bg-gradient-primary text-white border-0">Create</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {overallocatedEmployees.length > 0 && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive font-medium">
            {overallocatedEmployees.length} employee(s) over-allocated (&gt;100% utilization)
          </AlertDescription>
        </Alert>
      )}

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-muted/30" />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="bg-muted/30"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-muted/30"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Partial">Partial</SelectItem>
              <SelectItem value="Fully Allocated">Fully Allocated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Compact table view */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr className="text-left text-sm">
                <th className="p-3 font-semibold">Employee</th>
                <th className="p-3 font-semibold">Department</th>
                <th className="p-3 font-semibold">Utilization</th>
                <th className="p-3 font-semibold">Available</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Active Allocations</th>
              </tr>
            </thead>
            <tbody>
              {filteredAllocations.map((item, index) => {
                const isOverallocated = item.utilization > 100
                const initials = item.employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                const gradient = getGradientForIndex(index)

                return (
                  <tr key={item.employee.id} className={`border-b hover:bg-muted/30 transition-colors ${isOverallocated ? "bg-destructive/5" : ""}`}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm flex-shrink-0`}>
                          <span className="text-white font-bold text-sm">{initials}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{item.employee.name}</p>
                          <p className="text-xs text-muted-foreground">{item.employee.code} • {item.employee.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3"><span className="text-sm">{item.employee.department}</span></td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Progress value={Math.min(item.utilization, 100)} className="h-2 w-24" />
                          <span className={`text-sm font-bold ${isOverallocated ? "text-destructive" : "text-foreground"}`}>{item.utilization}%</span>
                        </div>
                        {isOverallocated && <p className="text-xs text-destructive">+{item.utilization - 100}% over</p>}
                      </div>
                    </td>
                    <td className="p-3"><span className={`text-sm font-bold ${item.availabilityPercentage === 0 ? "text-chart-4" : "text-chart-3"}`}>{item.availabilityPercentage}%</span></td>
                    <td className="p-3">
                      <Badge className={item.availabilityStatus === "Free" ? "bg-chart-3/10 text-chart-3" : item.availabilityStatus === "Fully Allocated" ? "bg-chart-4/10 text-chart-4" : "bg-primary/10 text-primary"}>
                        {item.availabilityStatus}
                      </Badge>
                    </td>
                    <td className="p-3">
                      {item.allocations.length > 0 ? (
                        <div className="space-y-1">
                          {item.allocations.map((alloc) => (
                            <div key={alloc.id} className="flex items-center justify-between gap-2 text-xs bg-muted/30 px-2 py-1 rounded">
                              <span className="truncate max-w-[150px]">{alloc.project?.name}</span>
                              <Badge variant="outline" className="text-xs">{alloc.allocationPercent}%</Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">No allocations</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredAllocations.length === 0 && (
        <Card className="p-12 text-center">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">No allocations found</p>
        </Card>
      )}
    </div>
  )
}
