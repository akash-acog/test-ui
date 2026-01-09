"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, X, Award } from "lucide-react"
import { mockEmployees, mockProjects, matchSkills } from "@/lib/mock-data"
import { Progress } from "@/components/ui/progress"

const avatarGradients = ["from-indigo-500 to-purple-600", "from-pink-500 to-rose-600", "from-blue-500 to-cyan-600", "from-green-500 to-emerald-600", "from-orange-500 to-amber-600", "from-violet-500 to-fuchsia-600"]
const getGradientForIndex = (index: number) => avatarGradients[index % avatarGradients.length]

export function SkillMatchingPage() {
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
      const matchPercentage = project.requiredSkills && project.requiredSkills.length > 0 ? Math.round(((matches.fullMatch.length / (matches.fullMatch.length + matches.partialMatch.length + matches.gap.length)) * 100) as number) : 0
      return { employee, matches, matchPercentage, fit: matchPercentage === 100 ? "Perfect" : matchPercentage >= 75 ? "Good" : matchPercentage >= 50 ? "Partial" : "Poor" }
    })
    setMatchResults(results.sort((a, b) => b.matchPercentage - a.matchPercentage))
  }

  const selectedProject = mockProjects.find((p) => p.id === selectedProjectId)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-gradient">Skill Matching</h1>
        <p className="mt-2 text-sm text-muted-foreground">Analyze employee skills against project requirements</p>
      </div>

      <Card className="p-4">
        <Select value={selectedProjectId} onValueChange={handleProjectSelect}>
          <SelectTrigger className="bg-muted/30"><SelectValue placeholder="Select a project to analyze..." /></SelectTrigger>
          <SelectContent>
            {mockProjects.map((project) => (<SelectItem key={project.id} value={project.id}>{project.code} - {project.name}</SelectItem>))}
          </SelectContent>
        </Select>
      </Card>

      {selectedProject && (
        <>
          <Card className="p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xl font-bold mb-2">{selectedProject.name}</h2>
                <p className="text-sm text-muted-foreground mb-3">{selectedProject.description}</p>
                <div className="flex gap-2">
                  <Badge>{selectedProject.status}</Badge>
                  <Badge variant="outline">{selectedProject.priority}</Badge>
                  <Badge variant="outline">{selectedProject.teamSize} members</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-sm">Required Skills ({selectedProject.requiredSkills?.length || 0})</h4>
                {selectedProject.requiredSkills && selectedProject.requiredSkills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.requiredSkills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{skill.name} ({skill.proficiency})</Badge>
                    ))}
                  </div>
                ) : (<p className="text-sm text-muted-foreground">No requirements</p>)}
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr className="text-left text-sm">
                    <th className="p-3 font-semibold">Employee</th>
                    <th className="p-3 font-semibold">Match</th>
                    <th className="p-3 font-semibold w-48">Skills Breakdown</th>
                    <th className="p-3 font-semibold">Full Matches</th>
                    <th className="p-3 font-semibold">Partial</th>
                    <th className="p-3 font-semibold">Gaps</th>
                  </tr>
                </thead>
                <tbody>
                  {matchResults.map((result, index) => {
                    const initials = result.employee.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                    const gradient = getGradientForIndex(index)
                    const fitColor = result.fit === "Perfect" ? "bg-chart-3/10 text-chart-3" : result.fit === "Good" ? "bg-primary/10 text-primary" : result.fit === "Partial" ? "bg-chart-4/10 text-chart-4" : "bg-destructive/10 text-destructive"

                    return (
                      <tr key={result.employee.id} className="border-b hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm flex-shrink-0`}>
                              <span className="text-white font-bold text-sm">{initials}</span>
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{result.employee.name}</p>
                              <p className="text-xs text-muted-foreground">{result.employee.designation}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="space-y-1">
                            <Badge className={fitColor}>{result.fit}</Badge>
                            <div className="flex items-center gap-2">
                              <Progress value={result.matchPercentage} className="h-2 w-20" />
                              <span className="text-sm font-bold">{result.matchPercentage}%</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex gap-3 text-xs">
                            <div className="flex items-center gap-1 text-chart-3"><CheckCircle className="h-3 w-3" /><span>{result.matches.fullMatch.length}</span></div>
                            <div className="flex items-center gap-1 text-chart-4"><span>~</span><span>{result.matches.partialMatch.length}</span></div>
                            <div className="flex items-center gap-1 text-destructive"><X className="h-3 w-3" /><span>{result.matches.gap.length}</span></div>
                          </div>
                        </td>
                        <td className="p-3">
                          {result.matches.fullMatch.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {result.matches.fullMatch.slice(0, 3).map((m, i) => (<Badge key={i} variant="outline" className="text-xs bg-chart-3/10 text-chart-3">{m.name}</Badge>))}
                              {result.matches.fullMatch.length > 3 && <span className="text-xs text-muted-foreground">+{result.matches.fullMatch.length - 3}</span>}
                            </div>
                          ) : (<span className="text-xs text-muted-foreground">-</span>)}
                        </td>
                        <td className="p-3">
                          {result.matches.partialMatch.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {result.matches.partialMatch.slice(0, 2).map((m, i) => (<Badge key={i} variant="outline" className="text-xs bg-chart-4/10 text-chart-4">{m.name}</Badge>))}
                              {result.matches.partialMatch.length > 2 && <span className="text-xs text-muted-foreground">+{result.matches.partialMatch.length - 2}</span>}
                            </div>
                          ) : (<span className="text-xs text-muted-foreground">-</span>)}
                        </td>
                        <td className="p-3">
                          {result.matches.gap.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {result.matches.gap.slice(0, 2).map((g, i) => (<Badge key={i} variant="outline" className="text-xs bg-destructive/10 text-destructive">{g}</Badge>))}
                              {result.matches.gap.length > 2 && <span className="text-xs text-muted-foreground">+{result.matches.gap.length - 2}</span>}
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-chart-3"><Award className="h-3 w-3" /><span className="text-xs">Perfect</span></div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
