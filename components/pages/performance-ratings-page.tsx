"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, Plus, Search, Award, TrendingUp, BarChart3, Users, User, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import { mockPerformanceRatings, mockEmployees, mockProjects, getEmployeeById } from "@/lib/mock-data"

const avatarGradients = ["from-indigo-500 to-purple-600", "from-pink-500 to-rose-600", "from-blue-500 to-cyan-600", "from-green-500 to-emerald-600", "from-orange-500 to-amber-600", "from-violet-500 to-fuchsia-600"]
const getGradientForIndex = (index: number) => avatarGradients[index % avatarGradients.length]

export function PerformanceRatingsPage() {
  const { user } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [expandedEmployee, setExpandedEmployee] = useState<string | null>(null)
  const [isAddingRating, setIsAddingRating] = useState(false)
  const [newRating, setNewRating] = useState({ employee: "", project: "", rating: 5, remarks: "" })

  const canCreate = hasPermission(user?.role || "employee", "manage_ratings")

  const employeeRatingsMap = mockEmployees.map((emp) => {
    const empRatings = mockPerformanceRatings.filter((r) => r.employee === emp.id)
    const avgRating = empRatings.length > 0 ? empRatings.reduce((sum, r) => sum + r.rating, 0) / empRatings.length : null
    
    const ratingsWithDetails = empRatings.map((rating) => ({
      ...rating,
      projectName: mockProjects.find((p) => p.id === rating.project)?.name || "Unknown",
      ratedByName: getEmployeeById(rating.ratedBy)?.name || "Unknown",
    }))

    return {
      employee: emp,
      avgRating: avgRating,
      totalRatings: empRatings.length,
      ratings: ratingsWithDetails,
    }
  })

  const filteredEmployees = employeeRatingsMap.filter((item) => {
    if (item.totalRatings === 0) return false
    const matchesSearch = item.employee.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.employee.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || (filterType === "high" && (item.avgRating || 0) >= 4) || (filterType === "low" && (item.avgRating || 0) < 4)
    return matchesSearch && matchesFilter
  }).sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))

  const handleAddRating = () => {
    setIsAddingRating(false)
    setNewRating({ employee: "", project: "", rating: 5, remarks: "" })
  }

  const avgRating = mockPerformanceRatings.reduce((sum, r) => sum + r.rating, 0) / mockPerformanceRatings.length

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-chart-3"
    if (rating >= 3.5) return "text-primary"
    if (rating >= 2.5) return "text-chart-4"
    return "text-destructive"
  }

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return "from-green-500 to-emerald-600"
    if (rating >= 3.5) return "from-blue-500 to-cyan-600"
    if (rating >= 2.5) return "from-orange-500 to-amber-600"
    return "from-red-500 to-pink-600"
  }

  const getPerformanceLevel = (rating: number) => {
    if (rating >= 4.5) return "Excellent"
    if (rating >= 3.5) return "Good"
    if (rating >= 2.5) return "Average"
    return "Needs Improvement"
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div><h1 className="text-4xl font-bold text-gradient">Performance Ratings</h1><p className="mt-2 text-sm text-muted-foreground">Track employee performance ratings from project managers</p></div>
        {canCreate && (
          <Dialog open={isAddingRating} onOpenChange={setIsAddingRating}>
            <DialogTrigger asChild><Button className="gap-2 bg-gradient-primary text-white shadow-lg border-0"><Plus className="h-4 w-4" />New Rating</Button></DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader><DialogTitle>Add Performance Rating</DialogTitle><DialogDescription>Rate an employee's performance on a completed project</DialogDescription></DialogHeader>
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
        <Card className="p-4 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 border-indigo-500/20"><div className="flex items-center gap-3"><BarChart3 className="h-8 w-8 text-primary" /><div><p className="text-sm text-muted-foreground">Total Ratings</p><p className="text-3xl font-bold">{mockPerformanceRatings.length}</p></div></div></Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-500/20"><div className="flex items-center gap-3"><Users className="h-8 w-8 text-chart-3" /><div><p className="text-sm text-muted-foreground">Rated Employees</p><p className="text-3xl font-bold">{employeeRatingsMap.filter((e) => e.totalRatings > 0).length}</p></div></div></Card>
        <Card className="p-4 bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20"><div className="flex items-center gap-3"><TrendingUp className="h-8 w-8 text-chart-3" /><div><p className="text-sm text-muted-foreground">Average Rating</p><p className={`text-3xl font-bold ${getRatingColor(avgRating)}`}>{avgRating.toFixed(2)}</p></div></div></Card>
        <Card className="p-4 bg-gradient-to-br from-orange-500/10 to-amber-600/10 border-orange-500/20"><div className="flex items-center gap-3"><Award className="h-8 w-8 text-chart-4" /><div><p className="text-sm text-muted-foreground">Highest Rated</p><div className="flex items-center gap-1"><p className="text-3xl font-bold text-chart-3">5</p><Star className="h-6 w-6 fill-chart-3 text-chart-3" /></div></div></div></Card>
      </div>

      <Card className="border-border bg-card p-6 card-hover">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2"><Search className="h-4 w-4 text-primary" />Search & Filter</h3>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-2 relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search by employee or code..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-9 bg-muted/30" /></div>
            <Select value={filterType} onValueChange={setFilterType}><SelectTrigger className="bg-muted/30"><SelectValue placeholder="Filter" /></SelectTrigger><SelectContent><SelectItem value="all">All Ratings</SelectItem><SelectItem value="high">High (4+)</SelectItem><SelectItem value="low">Below 4</SelectItem></SelectContent></Select>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((item, index) => {
          const initials = item.employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
          const gradient = getGradientForIndex(index)
          const ratingGradient = getRatingBgColor(item.avgRating || 0)
          const isExpanded = expandedEmployee === item.employee.id

          return (
            <Card key={item.employee.id} className="border-border bg-card overflow-hidden card-hover group relative">
              <div className={`h-2 bg-gradient-to-r ${gradient}`} />
              
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${ratingGradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} />
                    <div className={`relative h-16 w-16 rounded-2xl bg-gradient-to-br ${ratingGradient} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <div className="text-center"><div className="flex items-center justify-center gap-0.5"><Star className="h-4 w-4 fill-white text-white" /></div><span className="text-white font-bold text-xl">{item.avgRating?.toFixed(1)}</span></div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground truncate group-hover:text-primary transition-colors">{item.employee.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded inline-block mt-1">{item.employee.code}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 text-sm"><User className="h-4 w-4 text-primary flex-shrink-0" /><div className="flex-1 min-w-0"><p className="font-semibold text-foreground truncate">{item.employee.designation}</p><p className="text-xs text-muted-foreground">{item.employee.department}</p></div></div>
                  <div className="flex items-center gap-2 text-sm"><Award className="h-4 w-4 text-primary flex-shrink-0" /><div className="flex-1"><p className="text-foreground">Performance: <Badge className={getRatingColor(item.avgRating || 0) + " ml-1"}>{getPerformanceLevel(item.avgRating || 0)}</Badge></p></div></div>
                  <div className="flex items-center gap-2 text-sm"><BarChart3 className="h-4 w-4 text-primary flex-shrink-0" /><span className="text-muted-foreground text-xs">{item.totalRatings} {item.totalRatings === 1 ? 'rating' : 'ratings'} received</span></div>
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (<Star key={i} className="h-5 w-5" fill={i < Math.round(item.avgRating || 0) ? "hsl(var(--chart-4))" : "none"} stroke={i < Math.round(item.avgRating || 0) ? "hsl(var(--chart-4))" : "currentColor"} />))}
                  </div>
                  <p className="text-center text-sm font-bold">{item.avgRating?.toFixed(2)} / 5.00</p>
                </div>

                {item.ratings.length > 0 && (
                  <div className="pt-3 border-t border-border">
                    <button onClick={() => setExpandedEmployee(isExpanded ? null : item.employee.id)} className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors w-full justify-between">
                      <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />All Ratings ({item.ratings.length})</div>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 space-y-2">
                        {item.ratings.map((rating) => (
                          <div key={rating.id} className="p-3 bg-muted/30 rounded-lg space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-foreground">{rating.projectName}</p>
                              <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => (<Star key={i} className="h-3 w-3" fill={i < rating.rating ? "hsl(var(--chart-4))" : "none"} stroke="currentColor" />))}</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Rated by {rating.ratedByName} on {new Date(rating.ratedAt).toLocaleDateString()}</p>
                            {rating.remarks && <p className="text-xs text-foreground mt-2 italic">"{rating.remarks}"</p>}
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

      {filteredEmployees.length === 0 && <Card className="p-12 text-center card-hover"><Search className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" /><p className="text-muted-foreground">No ratings found</p></Card>}
    </div>
  )
}
