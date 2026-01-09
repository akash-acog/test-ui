import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { FileText, Upload, Download } from "lucide-react"

interface DocumentsCardProps {
  isEditing: boolean
}

export function DocumentsCard({ isEditing }: DocumentsCardProps) {
  const resume = {
    name: "Sarah_Anderson_Resume.pdf",
    size: "245 KB",
    uploadedAt: "2024-01-15",
  }

  return (
    <Card className="border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Documents</h2>

      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">Resume / CV</Label>
          {resume ? (
            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{resume.name}</p>
                  <p className="text-xs text-muted-foreground">{resume.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="mt-3 w-full gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Upload Resume
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
