import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

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

interface EmployeeProfileHeaderProps {
  employee: Employee
}

export function EmployeeProfileHeader({ employee }: EmployeeProfileHeaderProps) {
  return (
    <Card className="mb-8 border-border bg-card p-8">
      <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
        <Avatar className="h-24 w-24 md:h-32 md:w-32">
          <AvatarFallback className="bg-primary/20 text-2xl font-bold text-primary">{employee.avatar}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{employee.name}</h1>
          <p className="mt-1 text-lg text-muted-foreground">{employee.designation}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {employee.code}
            </Badge>
            <Badge variant="outline">{employee.type}</Badge>
            <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
              Active
            </Badge>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Department</p>
              <p className="font-semibold text-foreground">{employee.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-semibold text-foreground">{employee.location}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-semibold text-foreground">{employee.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
