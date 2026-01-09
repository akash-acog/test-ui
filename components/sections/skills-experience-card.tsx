import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface SkillsExperienceCardProps {
  isEditing: boolean
}

export function SkillsExperienceCard({ isEditing }: SkillsExperienceCardProps) {
  const skills = ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"]
  const previousExperience = 5
  const currentExperience = 3

  return (
    <Card className="border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Skills & Experience</h2>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">Skillset</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label className="text-sm font-medium text-muted-foreground">Previous Experience</Label>
            <p className="mt-2 text-lg font-semibold text-foreground">{previousExperience} years</p>
          </div>

          <div>
            <Label className="text-sm font-medium text-muted-foreground">Current Experience in Company</Label>
            <p className="mt-2 text-lg font-semibold text-foreground">{currentExperience} years</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
