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

    setMatchResults(results.sort((a, b) => b.matchPercentage - a.matchPercentage))
  }

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId)

  const getFitColor = (fit: string) => {
    switch (fit) {
      case "Perfect":
        return "bg-chart-3/10 text-chart-3 dark:bg-chart-3/20"
      case "Good":
        return "bg-primary/10 text-primary dark:bg-primary/20"
      case "Partial":
        return "bg-chart-4/10 text-chart-4 dark:bg-chart-4/20"
      case "Poor":
        return "bg-destructive/10 text-destructive dark:bg-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Expert":
        return "bg-chart-3/10 text-chart-3 dark:bg-chart-3/20"
      case "Advanced":
        return "bg-primary/10 text-primary dark:bg-primary/20"
      case "Intermediate":
        return "bg-chart-4/10 text-chart-4 dark:bg-chart-4/20"
      case "Beginner":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 75) return "bg-chart-3"
    if (percentage >= 50) return "bg-chart-4"
    return "bg-destructive"
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Skill Matching</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Analyze employee skills against project requirements to identify the best fit
        </p>
      </div>

      {/* Project Selector */}
      <Card className="border-border bg-card p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Select Project</h3>
          <Select value={selectedProjectId} onValueChange={handleProjectSelect}>
            <SelectTrigger className="w-full bg-muted/50 border-border">
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
          <Card className="border-border bg-card p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">{selectedProject.name}</h2>
              <p className="text-sm text-muted-foreground mt-2">{selectedProject.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge
                  className={
                    selectedProject.status === "Active"
                      ? "bg-chart-3/10 text-chart-3 dark:bg-chart-3/20"
                      : "bg-primary/10 text-primary dark:bg-primary/20"
                  }
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
                      ? "bg-chart-1/10 text-chart-1 dark:bg-chart-1/20"
                      : "bg-primary/10 text-primary dark:bg-primary/20"
                  }
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
                        <Badge className={`${getFitColor(result.fit)} text-lg py-2 px-4`}>
                          {result.fit} Fit ({result.matchPercentage}%)
                        </Badge>
                        <div className="mt-3 w-48 bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full ${getProgressBarColor(result.matchPercentage)}`}
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
                            <CheckCircle className="h-5 w-5 text-chart-3" />
                            <h5 className="font-semibold text-foreground">
                              Full Matches ({result.matches.fullMatch.length})
                            </h5>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2 ml-7">
                            {result.matches.fullMatch.map((match) => (
                              <div
                                key={match.name}
                                className="flex items-center justify-between p-2 bg-chart-3/10 rounded border border-chart-3/30"
                              >
                                <p className="text-sm font-medium text-foreground">{match.name}</p>
                                <div className="flex gap-2">
                                  <Badge className="bg-chart-3/20 text-chart-3 text-xs">
                                    {match.employeeProficiency}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">≥</span>
                                  <Badge className="bg-primary/20 text-primary text-xs">
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
                            <AlertCircle className="h-5 w-5 text-chart-4" />
                            <h5 className="font-semibold text-foreground">
                              Partial Matches ({result.matches.partialMatch.length})
                            </h5>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2 ml-7">
                            {result.matches.partialMatch.map((match) => (
                              <div
                                key={match.name}
                                className="flex items-center justify-between p-2 bg-chart-4/10 rounded border border-chart-4/30"
                              >
                                <p className="text-sm font-medium text-foreground">{match.name}</p>
                                <div className="flex gap-2">
                                  <Badge className="bg-chart-4/20 text-chart-4 text-xs">
                                    {match.employeeProficiency}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">&lt;</span>
                                  <Badge className="bg-destructive/20 text-destructive text-xs">
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
                            <Zap className="h-5 w-5 text-destructive" />
                            <h5 className="font-semibold text-foreground">
                              Skill Gaps ({result.matches.gap.length})
                            </h5>
                          </div>
                          <div className="grid gap-2 md:grid-cols-2 ml-7">
                            {result.matches.gap.map((gap) => (
                              <div
                                key={gap}
                                className="flex items-center justify-between p-2 bg-destructive/10 rounded border border-destructive/30"
                              >
                                <p className="text-sm font-medium text-foreground">{gap}</p>
                                <Badge className="bg-destructive/20 text-destructive text-xs">Missing</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No gaps message */}
                      {result.matches.fullMatch.length > 0 &&
                        result.matches.partialMatch.length === 0 &&
                        result.matches.gap.length === 0 && (
                          <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/30 text-center">
                            <p className="text-sm font-medium text-chart-3">
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
  )
}
