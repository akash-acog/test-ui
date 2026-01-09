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
import { Star, Plus, Search } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { hasPermission } from "@/lib/role-config"
import { mockPerformanceRatings, mockEmployees, mockProjects, getEmployeeById } from "@/lib/mock-data"

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

  // Get all ratings with employee and project details
  const ratingsWithDetails = mockPerformanceRatings.map((rating) => ({
    ...rating,
    employeeName: getEmployeeById(rating.employee)?.name || "Unknown",
    employeeCode: getEmployeeById(rating.employee)?.code || "",
    projectName: mockProjects.find((p) => p.id === rating.project)?.name || "Unknown",
    ratedByName: getEmployeeById(rating.ratedBy)?.name || "Unknown",
  }))

  // Calculate average rating per employee
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
    if (rating >= 4.5) return "text-green-600"
    if (rating >= 3.5) return "text-blue-600"
    if (rating >= 2.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingBgColor = (rating: number) => {
    if (rating >= 4.5) return "bg-green-100"
    if (rating >= 3.5) return "bg-blue-100"
    if (rating >= 2.5) return "bg-yellow-100"
    return "bg-red-100"
  }

  const handleAddRating = () => {
    setIsAddingRating(false)
    setNewRating({ employee: "", project: "", rating: 5, remarks: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Performance Ratings</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Track and manage employee performance ratings from project managers
              </p>
            </div>
            {canCreate && (
              <Dialog open={isAddingRating} onOpenChange={setIsAddingRating}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
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
                        <SelectTrigger className="mt-2">
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
                        <SelectTrigger className="mt-2">
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
                            className={`p-2 rounded transition-colors ${newRating.rating >= star ? "bg-yellow-200" : "bg-gray-200"}`}
                          >
                            <Star className="h-6 w-6" fill={newRating.rating >= star ? "#fbbf24" : "none"} />
                          </button>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        1 = Poor, 2 = Fair, 3 = Good, 4 = Very Good, 5 = Excellent
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground">Remarks (Optional)</label>
                      <Textarea
                        placeholder="Add comments about the employee's performance..."
                        value={newRating.remarks}
                        onChange={(e) => setNewRating({ ...newRating, remarks: e.target.value })}
                        className="mt-2"
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-3 justify-end">
                      <Button variant="outline" onClick={() => setIsAddingRating(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddRating} className="bg-primary text-primary-foreground">
                        Save Rating
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Total Ratings</p>
            <p className="text-3xl font-bold text-foreground mt-2">{mockPerformanceRatings.length}</p>
          </Card>
          <Card className="border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Rated Employees</p>
            <p className="text-3xl font-bold text-foreground mt-2">
              {employeeAverageRatings.filter((e) => e.avgRating !== null).length}
            </p>
          </Card>
          <Card className="border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Average Rating</p>
            <p
              className={`text-3xl font-bold mt-2 ${getRatingColor(mockPerformanceRatings.reduce((sum, r) => sum + r.rating, 0) / mockPerformanceRatings.length)}`}
            >
              {(mockPerformanceRatings.reduce((sum, r) => sum + r.rating, 0) / mockPerformanceRatings.length).toFixed(
                2,
              )}
            </p>
          </Card>
          <Card className="border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">Highest Rated</p>
            <p className="text-3xl font-bold text-green-600 mt-2">5 ⭐</p>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6 border-border bg-card p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Filters & Search</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by employee name, code, or project..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Employee Performance Summary</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {employeeAverageRatings
              .filter((item) => item.avgRating !== null)
              .sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0))
              .map((item) => (
                <Card
                  key={item.employee.id}
                  className={`border-border bg-card p-4 ${getRatingBgColor(item.avgRating || 0)}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{item.employee.name}</p>
                      <p className="text-sm text-muted-foreground">{item.employee.code}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getRatingColor(item.avgRating || 0)}`}>
                        {item.avgRating?.toFixed(1)}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.totalRatings} ratings</p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Individual Ratings */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">All Ratings</h2>
          <div className="space-y-4">
            {filteredRatings.length > 0 ? (
              filteredRatings.map((rating) => (
                <Card key={rating.id} className="border-border bg-card p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">{rating.employeeName}</h3>
                        <Badge variant="outline">{rating.employeeCode}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rating.projectName}</p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-block rounded-lg p-3 ${getRatingBgColor(rating.rating)}`}>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < rating.rating ? "fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <p className={`text-lg font-bold mt-1 ${getRatingColor(rating.rating)}`}>{rating.rating}/5</p>
                      </div>
                    </div>
                  </div>

                  {rating.remarks && (
                    <div className="border-t border-border pt-4 mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Remarks from {rating.ratedByName}:</p>
                      <p className="text-foreground">{rating.remarks}</p>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground mt-4">
                    Rated on {new Date(rating.ratedAt).toLocaleDateString()}
                  </p>
                </Card>
              ))
            ) : (
              <Card className="border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">No ratings found matching your filters</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
