"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle, Zap, Target, Award, TrendingUp, User } from "lucide-react"
import { useRole } from "@/lib/role-context"
import { mockEmployees, mockProjects, matchSkills } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"

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
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "Good":
        return "bg-primary/10 text-primary border-primary/20"
      case "Partial":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20"
      case "Poor":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "Expert":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      case "Advanced":
        return "bg-primary/10 text-primary border-primary/20"
      case "Intermediate":
        return "bg-chart-4/10 text-chart-4 border-chart-4/20"
      case "Beginner":
        return "bg-muted text-muted-foreground border-border"
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
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gradient">Skill Matching</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Analyze employee skills against project requirements to identify the best fit
        </p>
      </div>

      {/* Project Selector */}
      <Card className="border-border bg-card p-6 card-hover">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Select Project</h3>
          </div>
          <Select value={selectedProjectId} onValueChange={handleProjectSelect}>
            <SelectTrigger className="w-full bg-muted/30 border-border">
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
          <Card className="border-border bg-card overflow-hidden card-hover">
            <div className="h-2 bg-gradient-to-r from-primary to-primary/70" />
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">{selectedProject.name}</h2>
                <p className="text-sm text-muted-foreground mt-2">{selectedProject.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3 mb-6 pb-6 border-b border-border">
                <div className="bg-muted/30 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <Badge
                    className={
                      selectedProject.status === "Active"
                        ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {selectedProject.status}
                  </Badge>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground">Team Size</p>
                  <p className="text-lg font-semibold text-foreground mt-2">{selectedProject.teamSize} members</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <Badge
                    className={
                      selectedProject.priority === "High"
                        ? "bg-chart-1/10 text-chart-1 border-chart-1/20"
                        : "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {selectedProject.priority}
                  </Badge>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Required Skills</h4>
                </div>
                {selectedProject.requiredSkills && selectedProject.requiredSkills.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2">
                    {selectedProject.requiredSkills.map((skill, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                        <p className="font-medium text-foreground">{skill.name}</p>
                        <Badge className={getProficiencyColor(skill.proficiency)}>{skill.proficiency}</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No specific skill requirements defined</p>
                )}
              </div>
            </div>
          </Card>

          {/* Skill Matching Results */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Employee Fit Analysis</h3>
            </div>

            {matchResults.length > 0 ? (
              <div className="space-y-4">
                {matchResults.map((result, index) => {
                  const initials = result.employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                  const gradient = getGradientForIndex(index)

                  return (
                    <Card key={result.employee.id} className="border-border bg-card overflow-hidden card-hover">
                      {/* Gradient top bar */}
                      <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                      
                      <div className="p-6">
                        <div className="flex items-start gap-4 mb-6">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-xl opacity-20 blur-xl`} />
                            <div className={`relative h-14 w-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                              <span className="text-white font-bold text-lg">{initials}</span>
                            </div>
                          </div>

                          <div className="flex-1">
                            <h4 className="text-xl font-semibold text-foreground">{result.employee.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {result.employee.code} • {result.employee.designation} • {result.employee.department}
                            </p>
                          </div>

                          <div className="text-right">
                            <Badge className={`${getFitColor(result.fit)} text-lg py-2 px-4 mb-2`}>
                              {result.fit} Fit
                            </Badge>
                            <div className="flex items-center gap-2">
                              <div className="w-32">
                                <Progress value={result.matchPercentage} className="h-2" />
                              </div>
                              <span className="text-2xl font-bold text-foreground">{result.matchPercentage}%</span>
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
                                    className="flex items-center justify-between p-3 bg-chart-3/10 rounded-lg border border-chart-3/30"
                                  >
                                    <p className="text-sm font-medium text-foreground">{match.name}</p>
                                    <div className="flex gap-2">
                                      <Badge className="bg-chart-3/20 text-chart-3 text-xs border">
                                        {match.employeeProficiency}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">≥</span>
                                      <Badge className="bg-primary/20 text-primary text-xs border">
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
                                    className="flex items-center justify-between p-3 bg-chart-4/10 rounded-lg border border-chart-4/30"
                                  >
                                    <p className="text-sm font-medium text-foreground">{match.name}</p>
                                    <div className="flex gap-2">
                                      <Badge className="bg-chart-4/20 text-chart-4 text-xs border">
                                        {match.employeeProficiency}
                                      </Badge>
                                      <span className="text-xs text-muted-foreground">&lt;</span>
                                      <Badge className="bg-destructive/20 text-destructive text-xs border">
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
                                    className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg border border-destructive/30"
                                  >
                                    <p className="text-sm font-medium text-foreground">{gap}</p>
                                    <Badge className="bg-destructive/20 text-destructive text-xs border">Missing</Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Perfect match message */}
                          {result.matches.fullMatch.length > 0 &&
                            result.matches.partialMatch.length === 0 &&
                            result.matches.gap.length === 0 && (
                              <div className="p-4 bg-chart-3/10 rounded-lg border border-chart-3/30 text-center">
                                <Award className="h-8 w-8 text-chart-3 mx-auto mb-2" />
                                <p className="text-sm font-medium text-chart-3">
                                  Perfect skills match! All requirements met.
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <Card className="border-border bg-card p-12 text-center card-hover">
                <User className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Select a project to see skill matching results</p>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  )
}
