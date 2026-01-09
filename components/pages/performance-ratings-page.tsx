"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, Plus, Search, Award, TrendingUp, BarChart3, Users } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import { mockPerformanceRatings, mockEmployees, mockProjects, getEmployeeById } from "@/lib/mock-data"

// Avatar gradients
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

export function PerformanceRatingsPage() {
  const { user } = useRole()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isAddingRating, setIsAddingRating] = useState(false)
  const [newRating, setNewRating] = useState({
    employee: "",
    project: "",
    rating: 5,
    remarks: "",
  })

  const canCreate = hasPermission(user?.role || "employee", "manage_ratings")
  const canView = hasPermission(user?.role || "employee", "view_ratings")

  const ratingsWithDetails = mockPerformanceRatings.map((rating) => ({
    ...rating,
    employeeName: getEmployeeById(rating.employee)?.name || "Unknown",
    employeeCode: getEmployeeById(rating.employee)?.code || "",
    projectName: mockProjects.find((p) => p.id === rating.project)?.name || "Unknown",
    ratedByName: getEmployeeById(rating.ratedBy)?.name || "Unknown",
  }))

  const employeeAverageRatings = mockEmployees.map((emp) => {
    const empRatings = mockPerformanceRatings.filter((r) => r.employee === emp.id)
    const avgRating =
      empRatings.length > 0 ? (empRatings.reduce((sum, r) => sum + r.rating, 0) / empRatings.length).toFixed(2) : null

    return {
      employee: emp,
      avgRating: avgRating ? Number.parseFloat(avgRating) : null,
      totalRatings: empRatings.length,
    }
  })

  const filteredRatings = ratingsWithDetails.filter((rating) => {
    const matchesSearch =
      rating.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rating.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rating.employeeCode.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === "all" ||
      (filterType === "high" && rating.rating >= 4) ||
      (filterType === "low" && rating.rating < 4)

    return matchesSearch && matchesFilter
  })

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return "text-chart-3"
    if (rating >= 3.5) return "text-primary"
    if (rating >= 2.5) return "text-chart-4"
    return "text-destructive"
  }

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return "bg-chart-3/10 border-chart-3/20"
    if (rating >= 3.5) return "bg-primary/10 border-primary/20"
    if (rating >= 2.5) return "bg-chart-4/10 border-chart-4/20"
    return "bg-destructive/10 border-destructive/20"
  }

  const handleAddRating = () => {
    setIsAddingRating(false)
    setNewRating({ employee: "", project: "", rating: 5, remarks: "" })
  }

  const avgRating = mockPerformanceRatings.reduce((sum, r) => sum + r.rating, 0) / mockPerformanceRatings.length

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gradient">Performance Ratings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track and manage employee performance ratings from project managers
          </p>
        </div>
        {canCreate && (
          <Dialog open={isAddingRating} onOpenChange={setIsAddingRating}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-primary text-white shadow-lg hover:shadow-xl transition-all border-0">
                <Plus className="h-4 w-4" />
                New Rating
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Performance Rating</DialogTitle>
                <DialogDescription>Rate an employee's performance on a completed project</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Employee</label>
                  <Select
                    value={newRating.employee}
                    onValueChange={(val) => setNewRating({ ...newRating, employee: val })}
                  >
                    <SelectTrigger className="mt-2 bg-muted/30 border-border">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmployees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Project</label>
                  <Select
                    value={newRating.project}
                    onValueChange={(val) => setNewRating({ ...newRating, project: val })}
                  >
                    <SelectTrigger className="mt-2 bg-muted/30 border-border">
                      <SelectValue placeholder="Select completed project" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProjects
                        .filter((p) => p.status === "Completed")
                        .map((proj) => (
                          <SelectItem key={proj.id} value={proj.id}>
                            {proj.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Rating (1-5)</label>
                  <div className="flex gap-2 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setNewRating({ ...newRating, rating: star })}
                        className={`p-3 rounded-lg transition-all ${
                          newRating.rating >= star 
                            ? "bg-chart-4/30 scale-110 shadow-lg" 
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        <Star 
                          className="h-6 w-6" 
                          fill={newRating.rating >= star ? "hsl(var(--chart-4))" : "none"} 
                          stroke={newRating.rating >= star ? "hsl(var(--chart-4))" : "currentColor"} 
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Remarks (Optional)</label>
                  <Textarea
                    placeholder="Add comments about the employee's performance..."
                    value={newRating.remarks}
                    onChange={(e) => setNewRating({ ...newRating, remarks: e.target.value })}
                    className="mt-2 bg-muted/30 border-border"
                    rows={4}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-border">
                  <Button variant="outline" onClick={() => setIsAddingRating(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddRating} className="bg-gradient-primary text-white border-0">
                    Save Rating
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card p-6 card-hover overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-lg mb-4" />
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Ratings</p>
              <p className="text-3xl font-bold text-foreground">{mockPerformanceRatings.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="border-border bg-card p-6 card-hover overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-t-lg mb-4" />
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rated Employees</p>
              <p className="text-3xl font-bold text-foreground">
                {employeeAverageRatings.filter((e) => e.avgRating !== null).length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="border-border bg-card p-6 card-hover overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-lg mb-4" />
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-chart-4" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <p className={`text-3xl font-bold ${getRatingColor(avgRating)}`}>
                {avgRating.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="border-border bg-card p-6 card-hover overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-t-lg mb-4" />
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
              <Award className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Highest Rated</p>
              <div className="flex items-center gap-1 mt-1">
                <p className="text-3xl font-bold text-chart-3">5</p>
                <Star className="h-6 w-6 fill-chart-3 text-chart-3" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card p-6 card-hover">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Filters & Search</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by employee name, code, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-muted/30 border-border focus:border-primary transition-colors"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-muted/30 border-border">
                <SelectValue placeholder="Rating Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="high">High (4+)</SelectItem>
                <SelectItem value="low">Below Average (&lt;4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Employee Average Ratings */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Award className="h-6 w-6 text-primary" />
          Employee Performance Summary
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employeeAverageRatings
            .filter((item) => item.avgRating !== null)
            .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
            .map((item, index) => {
              const initials = item.employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
              const gradient = getGradientForIndex(index)

              return (
                <Card
                  key={item.employee.id}
                  className={`border p-4 card-hover overflow-hidden ${getRatingBgColor(item.avgRating || 0)}`}
                >
                  <div className={`h-1 bg-gradient-to-r ${gradient} rounded-t-lg -m-4 mb-4`} />
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg opacity-20 blur-lg`} />
                      <div className={`relative h-12 w-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold text-sm">{initials}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.employee.name}</p>
                      <p className="text-sm text-muted-foreground">{item.employee.code}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-3xl font-bold ${getRatingColor(item.avgRating || 0)}`}>
                        {item.avgRating?.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.totalRatings} ratings</p>
                    </div>
                  </div>
                </Card>
              )
            })}
        </div>
      </div>

      {/* Individual Ratings */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Star className="h-6 w-6 text-primary" />
          All Ratings
        </h2>
        <div className="space-y-4">
          {filteredRatings.length > 0 ? (
            filteredRatings.map((rating, index) => {
              const gradient = getGradientForIndex(index)
              const initials = rating.employeeName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()

              return (
                <Card key={rating.id} className="border-border bg-card overflow-hidden card-hover">
                  <div className={`h-1.5 bg-gradient-to-r ${gradient}`} />
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-lg opacity-20 blur-lg`} />
                        <div className={`relative h-12 w-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                          <span className="text-white font-bold">{initials}</span>
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">{rating.employeeName}</h3>
                          <Badge variant="outline">{rating.employeeCode}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{rating.projectName}</p>
                      </div>

                      <div className="text-right">
                        <div className={`inline-block rounded-xl p-4 border ${getRatingBgColor(rating.rating)}`}>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5"
                                fill={i < rating.rating ? "hsl(var(--chart-4))" : "none"}
                                stroke={i < rating.rating ? "hsl(var(--chart-4))" : "currentColor"}
                              />
                            ))}
                          </div>
                          <p className={`text-2xl font-bold text-center ${getRatingColor(rating.rating)}`}>{rating.rating}/5</p>
                        </div>
                      </div>
                    </div>

                    {rating.remarks && (
                      <div className="border-t border-border pt-4 mt-4">
                        <p className="text-sm text-muted-foreground mb-2">Remarks from {rating.ratedByName}:</p>
                        <p className="text-foreground bg-muted/30 p-3 rounded-lg">{rating.remarks}</p>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-4">
                      Rated on {new Date(rating.ratedAt).toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              )
            })
          ) : (
            <Card className="border-border bg-card p-12 text-center card-hover">
              <div className="flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">No ratings found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
