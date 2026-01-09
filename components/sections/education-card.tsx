import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface EducationCardProps {
  isEditing: boolean
}

export function EducationCard({ isEditing }: EducationCardProps) {
  return (
    <Card className="border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Education</h2>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">College</Label>
          <p className="mt-2 text-sm text-foreground">Massachusetts Institute of Technology</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Educational Stream</Label>
          <p className="mt-2 text-sm text-foreground">Computer Science</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Sort Category</Label>
          <p className="mt-2 text-sm text-foreground">Science & Technology</p>
        </div>
      </div>
    </Card>
  )
}
