import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

interface BioLinksCardProps {
  isEditing: boolean
}

export function BioLinksCard({ isEditing }: BioLinksCardProps) {
  return (
    <Card className="border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Bio & Professional Links</h2>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized
            in React and Node.js ecosystems. Love mentoring junior developers and contributing to open-source projects.
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">GitHub</Label>
          <Button variant="outline" className="mt-2 gap-2 text-sm h-9 bg-transparent" asChild>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              github.com/sarahander
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}
