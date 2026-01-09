"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, Plus, Search } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import { mockPerformanceRatings, mockEmployees, mockProjects, getEmployeeById } from "@/lib/mock-data"

const avatarGradients = ["from-indigo-500 to-purple-600", "from-pink-500 to-rose-600", "from-blue-500 to-cyan-600", "from-green-500 to-emerald-600", "from-orange-500 to-amber-600", "from-violet-500 to-fuchsia-600"]
const getGradientForIndex = (index: number) => avatarGradients[index % avatarGradients.length]

export function PerformanceRatingsPage() {
  const { user } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isAddingRating, setIsAddingRating] = useState(false)
  const [newRating, setNewRating] = useState({ employee: "", project: "", rating: 5, remarks: "" })

  const canCreate = hasPermission(user?.role || "employee", "manage_ratings")

  const ratingsWithDetails = mockPerformanceRatings.map((rating) => ({
    ...rating,
    employeeName: getEmployeeById(rating.employee)?.name || "Unknown",
    employeeCode: getEmployeeById(rating.employee)?.code || "",
    projectName: mockProjects.find((p) => p.id === rating.project)?.name || "Unknown",
    ratedByName: getEmployeeById(rating.ratedBy)?.name || "Unknown",
  }))

  const employeeAverageRatings = mockEmployees.map((emp) => {
    const empRatings = mockPerformanceRatings.filter((r) => r.employee === emp.id)
    const avgRating = empRatings.length > 0 ? (empRatings.reduce((sum, r) => sum + r.rating, 0) / empRatings.length).toFixed(2) : null
    return { employee: emp, avgRating: avgRating ? Number.parseFloat(avgRating) : null, totalRatings: empRatings.length }
  })

  const filteredRatings = ratingsWithDetails.filter((rating) => {
    const matchesSearch = rating.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || rating.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || rating.employeeCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || (filterType === "high" && rating.rating >= 4) || (filterType === "low" && rating.rating < 4)
    return matchesSearch && matchesFilter
  })

  const handleAddRating = () => {
    setIsAddingRating(false)
    setNewRating({ employee: "", project: "", rating: 5, remarks: "" })
  }

  const avgRating = mockPerformanceRatings.reduce((sum, r) => sum + r.rating, 0) / mockPerformanceRatings.length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Performance Ratings</h1>
          <p className="mt-2 text-sm text-muted-foreground">Track employee performance ratings from project managers</p>
        </div>
        {canCreate && (
          <Dialog open={isAddingRating} onOpenChange={setIsAddingRating}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-primary text-white shadow-lg border-0"><Plus className="h-4 w-4" />New Rating</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Performance Rating</DialogTitle>
                <DialogDescription>Rate an employee's performance on a completed project</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div><label className="text-sm font-medium">Employee</label><Select value={newRating.employee} onValueChange={(val) => setNewRating({ ...newRating, employee: val })}><SelectTrigger className="mt-2 bg-muted/30"><SelectValue placeholder="Select employee" /></SelectTrigger><SelectContent>{mockEmployees.map((emp) => (<SelectItem key={emp.id} value={emp.id}>{emp.name}</SelectItem>))}</SelectContent></Select></div>
                <div><label className="text-sm font-medium">Project</label><Select value={newRating.project} onValueChange={(val) => setNewRating({ ...newRating, project: val })}><SelectTrigger className="mt-2 bg-muted/30"><SelectValue placeholder="Select project" /></SelectTrigger><SelectContent>{mockProjects.filter((p) => p.status === "Completed").map((proj) => (<SelectItem key={proj.id} value={proj.id}>{proj.name}</SelectItem>))}</SelectContent></Select></div>
                <div><label className="text-sm font-medium">Rating</label><div className="flex gap-2 mt-2">{[1, 2, 3, 4, 5].map((star) => (<button key={star} onClick={() => setNewRating({ ...newRating, rating: star })} className={`p-2 rounded-lg transition ${newRating.rating >= star ? "bg-chart-4/30" : "bg-muted"}`}><Star className="h-5 w-5" fill={newRating.rating >= star ? "hsl(var(--chart-4))" : "none"} stroke={newRating.rating >= star ? "hsl(var(--chart-4))" : "currentColor"} /></button>))}</div></div>
                <div><label className="text-sm font-medium">Remarks</label><Textarea placeholder="Comments..." value={newRating.remarks} onChange={(e) => setNewRating({ ...newRating, remarks: e.target.value })} className="mt-2 bg-muted/30" rows={3} /></div>
                <div className="flex gap-3 justify-end pt-4 border-t"><Button variant="outline" onClick={() => setIsAddingRating(false)}>Cancel</Button><Button onClick={handleAddRating} className="bg-gradient-primary text-white border-0">Save</Button></div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/20"><p className="text-sm text-muted-foreground">Total Ratings</p><p className="text-3xl font-bold">{mockPerformanceRatings.length}</p></Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/20"><p className="text-sm text-muted-foreground">Rated Employees</p><p className="text-3xl font-bold">{employeeAverageRatings.filter((e) => e.avgRating !== null).length}</p></Card>
        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20"><p className="text-sm text-muted-foreground">Average Rating</p><p className="text-3xl font-bold text-chart-3">{avgRating.toFixed(2)}</p></Card>
        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-amber-600/10 border-orange-500/20"><p className="text-sm text-muted-foreground">Highest Rated</p><div className="flex items-center gap-1"><p className="text-3xl font-bold text-chart-3">5</p><Star className="h-6 w-6 fill-chart-3 text-chart-3" /></div></Card>
      </div>

      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2 relative"><Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by employee, code, or project..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-muted/30" /></div>
          <Select value={filterType} onValueChange={setFilterType}><SelectTrigger className="bg-muted/30"><SelectValue placeholder="Rating Filter" /></SelectTrigger><SelectContent><SelectItem value="all">All Ratings</SelectItem><SelectItem value="high">High (4+)</SelectItem><SelectItem value="low">Below 4</SelectItem></SelectContent></Select>
        </div>
      </Card>

      {/* Employee Summary Table */}
      <Card className="overflow-hidden">
        <div className="bg-muted/50 border-b p-3"><h3 className="font-semibold">Employee Performance Summary</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b">
              <tr className="text-left text-sm"><th className="p-3 font-semibold">Employee</th><th className="p-3 font-semibold">Department</th><th className="p-3 font-semibold">Avg Rating</th><th className="p-3 font-semibold">Total Ratings</th><th className="p-3 font-semibold">Performance</th></tr>
            </thead>
            <tbody>
              {employeeAverageRatings.filter((item) => item.avgRating !== null).sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0)).map((item, index) => {
                const initials = item.employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                const gradient = getGradientForIndex(index)
                const ratingColor = (item.avgRating || 0) >= 4.5 ? "text-chart-3" : (item.avgRating || 0) >= 3.5 ? "text-primary" : "text-chart-4"
                return (
                  <tr key={item.employee.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3"><div className="flex items-center gap-3"><div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm flex-shrink-0`}><span className="text-white font-bold text-sm">{initials}</span></div><div><p className="font-semibold text-sm">{item.employee.name}</p><p className="text-xs text-muted-foreground">{item.employee.code}</p></div></div></td>
                    <td className="p-3"><span className="text-sm">{item.employee.department}</span></td>
                    <td className="p-3"><div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4" fill={i < Math.round(item.avgRating || 0) ? "hsl(var(--chart-4))" : "none"} stroke={i < Math.round(item.avgRating || 0) ? "hsl(var(--chart-4))" : "currentColor"} />))}<span className={`ml-2 text-lg font-bold ${ratingColor}`}>{item.avgRating?.toFixed(1)}</span></div></td>
                    <td className="p-3"><Badge variant="outline">{item.totalRatings} ratings</Badge></td>
                    <td className="p-3"><Badge className={(item.avgRating || 0) >= 4.5 ? "bg-chart-3/10 text-chart-3" : (item.avgRating || 0) >= 3.5 ? "bg-primary/10 text-primary" : "bg-chart-4/10 text-chart-4"}>{(item.avgRating || 0) >= 4.5 ? "Excellent" : (item.avgRating || 0) >= 3.5 ? "Good" : "Average"}</Badge></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* All Ratings Table */}
      <Card className="overflow-hidden">
        <div className="bg-muted/50 border-b p-3"><h3 className="font-semibold">All Ratings ({filteredRatings.length})</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30 border-b">
              <tr className="text-left text-sm"><th className="p-3 font-semibold">Employee</th><th className="p-3 font-semibold">Project</th><th className="p-3 font-semibold">Rating</th><th className="p-3 font-semibold">Rated By</th><th className="p-3 font-semibold">Date</th><th className="p-3 font-semibold">Remarks</th></tr>
            </thead>
            <tbody>
              {filteredRatings.map((rating, index) => {
                const initials = rating.employeeName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                const gradient = getGradientForIndex(index)
                return (
                  <tr key={rating.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-3"><div className="flex items-center gap-3"><div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm flex-shrink-0`}><span className="text-white font-bold text-sm">{initials}</span></div><div><p className="font-semibold text-sm">{rating.employeeName}</p><p className="text-xs text-muted-foreground">{rating.employeeCode}</p></div></div></td>
                    <td className="p-3"><span className="text-sm">{rating.projectName}</span></td>
                    <td className="p-3"><div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className="h-4 w-4" fill={i < rating.rating ? "hsl(var(--chart-4))" : "none"} stroke={i < rating.rating ? "hsl(var(--chart-4))" : "currentColor"} />))}<span className="ml-2 text-lg font-bold">{rating.rating}/5</span></div></td>
                    <td className="p-3"><span className="text-sm">{rating.ratedByName}</span></td>
                    <td className="p-3"><span className="text-xs text-muted-foreground">{new Date(rating.ratedAt).toLocaleDateString()}</span></td>
                    <td className="p-3"><span className="text-xs text-muted-foreground max-w-xs truncate block">{rating.remarks || "-"}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredRatings.length === 0 && <Card className="p-12 text-center"><Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" /><p className="text-muted-foreground">No ratings found</p></Card>}
    </div>
  )
}
