"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, AlertCircle, Users, TrendingUp, Target, Briefcase, ChevronDown, ChevronUp } from "lucide-react"
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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Free: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    Partial: "bg-primary/10 text-primary border-primary/20",
    "Fully Allocated": "bg-chart-4/10 text-chart-4 border-chart-4/20",
  }
  return colors[status] || "bg-muted text-muted-foreground"
}

export function AllocationDashboardPage({ onViewEmployee, userRole }: AllocationDashboardPageProps) {
  const { user } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null)
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
    setAllocationForm({ employee: "", project: "", allocationPercent: "50", startDate: "", endDate: "", billable: true, notes: "" })
  }

  const selectedEmployee = mockEmployees.find((e) => e.id === allocationForm.employee)
  const selectedEmployeeAvailability = selectedEmployee ? getEmployeeAvailabilityPercentage(selectedEmployee.id) : 0

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Resource Allocation</h1>
          <p className="mt-2 text-sm text-muted-foreground">Track employee utilization and manage project allocations</p>
        </div>
        {canCreate && (
          <Dialog open={isAddAllocationOpen} onOpenChange={setIsAddAllocationOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-primary text-white shadow-lg border-0"><Plus className="h-4 w-4" />New Allocation</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>Allocate Resource to Project</DialogTitle><DialogDescription>Assign an employee to a project with specific allocation details</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Employee</Label><Select value={allocationForm.employee} onValueChange={(v) => setAllocationForm({ ...allocationForm, employee: v })}><SelectTrigger className="bg-muted/30"><SelectValue placeholder="Choose employee" /></SelectTrigger><SelectContent>{mockEmployees.map((emp) => (<SelectItem key={emp.id} value={emp.id}>{emp.name} ({emp.code})</SelectItem>))}</SelectContent></Select></div>
                  <div className="space-y-2"><Label>Project</Label><Select value={allocationForm.project} onValueChange={(v) => setAllocationForm({ ...allocationForm, project: v })}><SelectTrigger className="bg-muted/30"><SelectValue placeholder="Choose project" /></SelectTrigger><SelectContent>{mockProjects.map((proj) => (<SelectItem key={proj.id} value={proj.id}>{proj.name} ({proj.code})</SelectItem>))}</SelectContent></Select></div>
                </div>
                <div className="space-y-2"><Label>Allocation % (Max: {selectedEmployeeAvailability}%)</Label><input type="range" min="0" max={selectedEmployeeAvailability} value={allocationForm.allocationPercent} onChange={(e) => setAllocationForm({ ...allocationForm, allocationPercent: e.target.value })} className="w-full" /><div className="flex justify-between"><span className="text-sm">Selected: <strong>{allocationForm.allocationPercent}%</strong></span><span className="text-xs text-muted-foreground">Max: {selectedEmployeeAvailability}%</span></div></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Start Date</Label><Input type="date" value={allocationForm.startDate} onChange={(e) => setAllocationForm({ ...allocationForm, startDate: e.target.value })} className="bg-muted/30" /></div>
                  <div className="space-y-2"><Label>End Date</Label><Input type="date" value={allocationForm.endDate} onChange={(e) => setAllocationForm({ ...allocationForm, endDate: e.target.value })} className="bg-muted/30" /></div>
                </div>
                <div className="flex items-center gap-2"><input type="checkbox" id="billable" checked={allocationForm.billable} onChange={(e) => setAllocationForm({ ...allocationForm, billable: e.target.checked })} /><Label htmlFor="billable">Billable Work</Label></div>
                <div className="flex justify-end gap-2 pt-4 border-t"><Button variant="outline" onClick={() => setIsAddAllocationOpen(false)}>Cancel</Button><Button onClick={handleAllocateResource} className="bg-gradient-primary text-white border-0">Create</Button></div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {overallocatedEmployees.length > 0 && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertCircle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive font-medium">{overallocatedEmployees.length} employee(s) over-allocated (&gt;100% utilization)</AlertDescription>
        </Alert>
      )}

      <Card className="border-border bg-card p-6 card-hover">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2"><Search className="h-4 w-4 text-primary" />Search & Filter</h3>
          <div className="grid gap-3 md:grid-cols-4">
            <div className="md:col-span-2 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-muted/30 border-border" /></div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}><SelectTrigger className="bg-muted/30"><SelectValue placeholder="Department" /></SelectTrigger><SelectContent><SelectItem value="all">All Departments</SelectItem>{departments.map((dept) => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}</SelectContent></Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}><SelectTrigger className="bg-muted/30"><SelectValue placeholder="Status" /></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Free">Free</SelectItem><SelectItem value="Partial">Partial</SelectItem><SelectItem value="Fully Allocated">Fully Allocated</SelectItem></SelectContent></Select>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredAllocations.map((item, index) => {
          const isOverallocated = item.utilization > 100
          const initials = item.employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
          const gradient = getGradientForIndex(index)
          const isExpanded = expandedEmployee === item.employee.id

          return (
            <Card key={item.employee.id} className="border-border bg-card overflow-hidden card-hover group relative">
              <div className={`h-2 bg-gradient-to-r ${gradient}`} />
              
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                    <div className={`relative h-14 w-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <span className="text-white font-bold text-lg">{initials}</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide font-mono bg-muted/50 px-2 py-0.5 rounded">{item.employee.code}</span>
                      <Badge className={getStatusColor(item.availabilityStatus)}>{item.availabilityStatus}</Badge>
                      {isOverallocated && <Badge variant="destructive">Over-allocated</Badge>}
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{item.employee.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.employee.designation} • {item.employee.department}</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><TrendingUp className="h-5 w-5 text-primary" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground font-medium">Utilization</p>
                      <div className="flex items-center gap-2 mt-1"><Progress value={Math.min(item.utilization, 100)} className="h-2 flex-1" /><span className={`text-sm font-bold ${isOverallocated ? "text-destructive" : "text-foreground"}`}>{item.utilization}%</span></div>
                      {isOverallocated && <p className="text-xs text-destructive mt-1">+{item.utilization - 100}% over</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0"><Target className="h-5 w-5 text-chart-3" /></div>
                    <div className="min-w-0"><p className="text-xs text-muted-foreground font-medium">Availability</p><p className={`text-sm font-semibold ${item.availabilityPercentage === 0 ? "text-chart-4" : "text-chart-3"}`}>{item.availabilityPercentage}%</p></div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0"><Briefcase className="h-5 w-5 text-chart-4" /></div>
                    <div className="min-w-0"><p className="text-xs text-muted-foreground font-medium">Active Projects</p><p className="text-sm font-semibold text-foreground">{item.allocations.length}</p></div>
                  </div>

                  <div className="flex items-center gap-3 bg-muted/30 p-3 rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"><Users className="h-5 w-5 text-primary" /></div>
                    <div className="min-w-0"><p className="text-xs text-muted-foreground font-medium">Department</p><p className="text-sm font-semibold text-foreground truncate">{item.employee.department}</p></div>
                  </div>
                </div>

                {item.allocations.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <button onClick={() => setExpandedEmployee(isExpanded ? null : item.employee.id)} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-full justify-between">
                      <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" />Current Allocations ({item.allocations.length})</div>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-4 grid gap-2 md:grid-cols-2">
                        {item.allocations.map((alloc) => (
                          <div key={alloc.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                            <div className="flex-1 min-w-0"><p className="font-medium text-foreground truncate">{alloc.project?.name}</p><p className="text-xs text-muted-foreground">{alloc.notes || "No notes"}</p></div>
                            <div className="ml-3 text-right flex-shrink-0"><p className="text-xl font-bold text-foreground">{alloc.allocationPercent}%</p><Badge variant={alloc.billable ? "default" : "secondary"} className="text-xs mt-1">{alloc.billable ? "Billable" : "Non-billable"}</Badge></div>
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

      {filteredAllocations.length === 0 && (
        <Card className="border-border bg-card p-12 text-center card-hover">
          <div className="flex flex-col items-center gap-4"><div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center"><Search className="h-8 w-8 text-muted-foreground" /></div><div><p className="font-semibold text-foreground mb-1">No allocations found</p><p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p></div></div>
        </Card>
      )}
    </div>
  )
}
