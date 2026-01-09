import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Employee {
  id: number
  code: string
  name: string
  email: string
  designation: string
  department: string
  location: string
  type: string
  joinDate: string
  avatar: string
}

interface PersonalInfoCardProps {
  employee: Employee
  isEditing: boolean
}

export function PersonalInfoCard({ employee, isEditing }: PersonalInfoCardProps) {
  return (
    <Card className="border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Personal Information</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label className="text-sm font-medium text-foreground">Employee Name</Label>
          <p className="mt-2 text-sm text-foreground">{employee.name}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Email</Label>
          <p className="mt-2 text-sm text-foreground">{employee.email}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Gender</Label>
          <p className="mt-2 text-sm text-foreground">Female</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Date of Birth</Label>
          <p className="mt-2 text-sm text-foreground">March 15, 1990</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Age</Label>
          <p className="mt-2 text-sm text-foreground">34</p>
        </div>
      </div>
    </Card>
  )
}
