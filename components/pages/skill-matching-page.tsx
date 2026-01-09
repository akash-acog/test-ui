"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Zap } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { mockEmployees, mockProjects, matchSkills } from "@/lib/mock-data"

export function SkillMatchingPage() {
  const { user } = useRole()
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  const [matchResults, setMatchResults] = useState<any[]>([])

  const handleProjectSelect = (projectId: string) => {
    setSelectedProjectId(projectId)

    if (!projectId) {
      setMatchResults([])
      return
    }

    const project = mockProjects.find((p) => p.id === projectId)
    if (!project) return

    // Calculate skill matches for all employees against this project
    const results = mockEmployees.map((employee) => {
      const matches = matchSkills(employee.skills, project.requiredSkills || [])
      const matchPercentage =
        project.requiredSkills && project.requiredSkills.length > 0
          ? Math.round(
              ((matches.fullMatch.length /
                (matches.fullMatch.length + matches.partialMatch.length + matches.gap.length)) *
                100) as number,
            )
          : 0

      return {
        employee,
        matches,
        matchPercentage,
        fit:
          matchPercentage === 100
            ? "Perfect"
            : matchPercentage >= 75
              ? "Good"
              : matchPercentage >= 50
                ? "Partial"
                : "Poor",
      }
    })

    // Sort by match percentage descending
    setMatchResults(results.sort((a, b) => b.matchPercentage - a.matchPercentage))
  }

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId)

  const getFitColor = (fit: string) => {
    switch (fit) {
      case "Perfect":
        return "bg-green-100 text-green-800"
      case "Good":
        return "bg-blue-100 text-blue-800"
      case "Partial":
        return "bg-yellow-100 text-yellow-800"
      case "Poor":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Expert":
        return "bg-green-100 text-green-800"
      case "Advanced":
        return "bg-blue-100 text-blue-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Beginner":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Skill Matching</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Analyze employee skills against project requirements to identify the best fit
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Project Selector */}
        <Card className="mb-8 border-border bg-card p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Select Project</h3>
            <Select value={selectedProjectId} onValueChange={handleProjectSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a project to analyze..." />
              </SelectTrigger>
              <SelectContent>
                {mockProjects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.code} - {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {selectedProject && (
          <>
            {/* Project Details */}
            <Card className="mb-8 border-border bg-card p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">{selectedProject.name}</h2>
                <p className="text-sm text-muted-foreground mt-2">{selectedProject.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    className={
                      selectedProject.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                    }
                    className="mt-2"
                  >
                    {selectedProject.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="text-lg font-semibold text-foreground mt-2">{selectedProject.teamSize} members</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge
                    className={
                      selectedProject.priority === "High"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-blue-100 text-blue-800"
                    }
                    className="mt-2"
                  >
                    {selectedProject.priority}
                  </Badge>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <h4 className="font-semibold text-foreground mb-4">Required Skills</h4>
                {selectedProject.requiredSkills && selectedProject.requiredSkills.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {selectedProject.requiredSkills.map((skill, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <p className="font-medium text-foreground">{skill.name}</p>
                        <Badge className={getProficiencyColor(skill.proficiency)}>{skill.proficiency}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No specific skill requirements defined</p>
                )}
              </div>
            </Card>

            {/* Skill Matching Results */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Employee Fit Analysis</h3>

              {matchResults.length > 0 ? (
                <div className="space-y-4">
                  {matchResults.map((result) => (
                    <Card key={result.employee.id} className="border-border bg-card p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h4 className="text-xl font-semibold text-foreground">{result.employee.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {result.employee.code} • {result.employee.designation} • {result.employee.department}
                          </p>
                        </div>

                        <div className="text-right">
                          <Badge className={getFitColor(result.fit)} className="text-lg py-2 px-4">
                            {result.fit} Fit ({result.matchPercentage}%)
                          </Badge>
                          <div className="mt-3 w-48 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                              className={`h-full ${
                                result.matchPercentage >= 75
                                  ? "bg-green-500"
                                  : result.matchPercentage >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${result.matchPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Skill Breakdown */}
                      <div className="space-y-4">
                        {/* Full Matches */}
                        {result.matches.fullMatch.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                              <h5 className="font-semibold text-foreground">
                                Full Matches ({result.matches.fullMatch.length})
                              </h5>
                            </div>
                            <div className="grid gap-2 md:grid-cols-2 ml-7">
                              {result.matches.fullMatch.map((match) => (
                                <div
                                  key={match.name}
                                  className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200"
                                >
                                  <p className="text-sm font-medium text-foreground">{match.name}</p>
                                  <div className="flex gap-2">
                                    <Badge className="bg-green-100 text-green-800 text-xs">
                                      {match.employeeProficiency}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">≥</span>
                                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                                      {match.requiredProficiency}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Partial Matches */}
                        {result.matches.partialMatch.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <AlertCircle className="h-5 w-5 text-yellow-600" />
                              <h5 className="font-semibold text-foreground">
                                Partial Matches ({result.matches.partialMatch.length})
                              </h5>
                            </div>
                            <div className="grid gap-2 md:grid-cols-2 ml-7">
                              {result.matches.partialMatch.map((match) => (
                                <div
                                  key={match.name}
                                  className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200"
                                >
                                  <p className="text-sm font-medium text-foreground">{match.name}</p>
                                  <div className="flex gap-2">
                                    <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                      {match.employeeProficiency}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">&lt;</span>
                                    <Badge className="bg-red-100 text-red-800 text-xs">
                                      {match.requiredProficiency}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Skill Gaps */}
                        {result.matches.gap.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Zap className="h-5 w-5 text-red-600" />
                              <h5 className="font-semibold text-foreground">
                                Skill Gaps ({result.matches.gap.length})
                              </h5>
                            </div>
                            <div className="grid gap-2 md:grid-cols-2 ml-7">
                              {result.matches.gap.map((gap) => (
                                <div
                                  key={gap}
                                  className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200"
                                >
                                  <p className="text-sm font-medium text-foreground">{gap}</p>
                                  <Badge className="bg-red-100 text-red-800 text-xs">Missing</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* No gaps message */}
                        {result.matches.fullMatch.length > 0 &&
                          result.matches.partialMatch.length === 0 &&
                          result.matches.gap.length === 0 && (
                            <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
                              <p className="text-sm font-medium text-green-800">
                                Perfect skills match! All requirements met.
                              </p>
                            </div>
                          )}
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="border-border bg-card p-12 text-center">
                  <p className="text-muted-foreground">Select a project to see skill matching results</p>
                </Card>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
