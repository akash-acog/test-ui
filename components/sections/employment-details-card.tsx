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

interface EmploymentDetailsCardProps {
  employee: Employee
  isEditing: boolean
}

export function EmploymentDetailsCard({ employee, isEditing }: EmploymentDetailsCardProps) {
  const joinDate = new Date(employee.joinDate)
  const currentYear = new Date().getFullYear()
  const yearOfJoining = joinDate.getFullYear()
  const currentExperience = currentYear - yearOfJoining

  return (
    <Card className="border-border bg-card p-6">
      <h2 className="mb-6 text-xl font-semibold text-foreground">Employment Details</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label className="text-sm font-medium text-muted-foreground">Employee Code</Label>
          <p className="mt-2 text-sm font-medium text-foreground">{employee.code}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Date of Joining</Label>
          <p className="mt-2 text-sm font-medium text-foreground">{joinDate.toLocaleDateString()}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Year of Joining</Label>
          <p className="mt-2 text-sm font-medium text-foreground">{yearOfJoining}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Designation</Label>
          <p className="mt-2 text-sm font-medium text-foreground">{employee.designation}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Department</Label>
          <p className="mt-2 text-sm font-medium text-foreground">{employee.department}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Workstream</Label>
          <p className="mt-2 text-sm font-medium text-foreground">Product Development</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Office Location</Label>
          <p className="mt-2 text-sm font-medium text-foreground">{employee.location}</p>
        </div>

        <div>
          <Label className="text-sm font-medium text-muted-foreground">Employee Type</Label>
          <p className="mt-2 text-sm font-medium text-foreground">{employee.type}</p>
        </div>
      </div>
    </Card>
  )
}
