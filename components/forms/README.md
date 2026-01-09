# Forms Documentation

Comprehensive forms for the Employee Management System.

## Available Forms

### 1. Add Employee Form
**File:** `add-employee-form.tsx`

#### Features
- **5-Step Wizard** with progress indicator
- **Comprehensive validation** at each step
- **Auto-generated Employee Code**
- **Skills management** with proficiency levels
- **File upload placeholders** for picture and resume

#### Form Steps
1. **Basic Information** - Code, Name, Email, DOJ, Type, Status
2. **Employment Details** - Department, Designation, Location, Workstream, Manager
3. **Personal Information** - DOB, Gender, Phone, Address, Emergency Contact
4. **Education & Experience** - Previous Experience, College, Educational Stream
5. **Professional Details** - Bio, GitHub URL, Picture, Resume, Skills

#### Required Fields
- Name, Email, Date of Joining
- Department, Designation, Location
- Date of Birth, Gender, Phone

#### Usage Example
```tsx
import { AddEmployeeForm } from "@/components/forms/add-employee-form"

function EmployeeManagementPage() {
  const handleSubmit = (data: any) => {
    console.log("New employee:", data)
    // Call your API to create employee
    // POST /api/employees
  }

  const handleCancel = () => {
    // Navigate back or close modal
  }

  return (
    <AddEmployeeForm 
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
```

#### Data Structure
```typescript
{
  // Basic Information
  code: string              // Auto-generated: EMP001, EMP002, etc.
  name: string              // Required
  email: string             // Required, validated format
  joinDate: string          // Required, ISO date format
  type: "Full Time" | "Intern"
  status: "Active" | "Inactive"

  // Employment Details
  department: string        // Required
  designation: string       // Required
  location: string          // Required
  workstream: string        // Optional
  manager: string           // Employee ID of manager

  // Personal Information
  dob: string              // Required, ISO date format
  gender: string           // Required
  phone: string            // Required
  address: string          // Optional
  emergencyContact: string // Optional

  // Education & Experience
  previousExperience: string  // Years
  college: string            // Optional
  educationalStream: string  // Optional

  // Professional
  bio: string              // Optional
  githubUrl: string        // Optional, URL format
  pictureUrl: string       // Optional, URL format
  resumeUrl: string        // Optional, URL format

  // Skills
  skills: [
    {
      name: string
      proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    }
  ]
}
```

---

### 2. Add Project Form
**File:** `add-project-form.tsx`

#### Features
- **Single-page comprehensive form**
- **Real-time validation**
- **Auto-generated Project Code**
- **Required Skills management** with proficiency levels
- **Budget tracking setup**
- **Project summary preview**

#### Sections
1. **Basic Information** - Code, Name, Description
2. **Classification** - Status, Priority, Type
3. **Timeline & Budget** - Start Date, End Date, Budget, Team Size
4. **Team Management** - Project Manager selection
5. **Required Skills** - Skill requirements with proficiency

#### Required Fields
- Name, Description
- Start Date, Budget
- Project Manager

#### Usage Example
```tsx
import { AddProjectForm } from "@/components/forms/add-project-form"

function ProjectManagementPage() {
  const handleSubmit = (data: any) => {
    console.log("New project:", data)
    // Call your API to create project
    // POST /api/projects
  }

  const handleCancel = () => {
    // Navigate back or close modal
  }

  return (
    <AddProjectForm 
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  )
}
```

#### Data Structure
```typescript
{
  code: string              // Auto-generated: PRJ001, PRJ002, etc.
  name: string              // Required
  description: string       // Required
  status: "Planned" | "Active" | "Completed"
  priority: "Low" | "Medium" | "High" | "Critical"
  type: "Billable" | "Non-billable" | "Internal"
  startDate: string         // Required, ISO date format
  endDate: string           // Optional, ISO date format
  manager: string           // Required, Employee ID
  budget: number            // Required, in USD
  spent: number             // Auto-set to 0
  teamSize: number          // Expected team size
  requiredSkills: [
    {
      name: string
      proficiency: "Beginner" | "Intermediate" | "Advanced" | "Expert"
    }
  ]
}
```

---

## Integration Guide

### Step 1: Import the Form
```tsx
import { AddEmployeeForm } from "@/components/forms/add-employee-form"
import { AddProjectForm } from "@/components/forms/add-project-form"
```

### Step 2: Create Modal or Page
You can use these forms in:
- **Dialog/Modal** - For quick creation
- **Full Page** - For detailed data entry

#### Example with Dialog
```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AddEmployeeForm } from "@/components/forms/add-employee-form"

function EmployeePage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add Employee</Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <AddEmployeeForm 
            onSubmit={(data) => {
              // Save employee
              setIsOpen(false)
            }}
            onCancel={() => setIsOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
```

### Step 3: Handle API Calls
```typescript
const handleEmployeeSubmit = async (data: any) => {
  try {
    const response = await fetch('/api/employees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    if (response.ok) {
      // Success - refresh list, show toast, etc.
      toast.success('Employee created successfully')
    } else {
      // Handle error
      toast.error('Failed to create employee')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}
```

---

## Validation Rules

### Employee Form
- **Email**: Must be valid email format
- **Phone**: Required format (can be customized)
- **Date of Birth**: Must be in the past
- **Join Date**: Can be past or future
- **Skills**: At least one skill recommended (not enforced)

### Project Form
- **End Date**: Must be after Start Date (if provided)
- **Budget**: Must be positive number
- **Manager**: Must select from available managers
- **Required Skills**: Optional but recommended for skill matching

---

## Customization

### Add Custom Fields
You can extend the forms by:
1. Adding new fields to `formData` state
2. Adding corresponding UI elements
3. Updating validation logic

### Modify Options
Change dropdown options by editing these arrays:
- `departments`
- `designations`
- `locations`
- `workstreams`
- `skillsList`

### Custom Styling
Forms use Tailwind classes and shadcn/ui components. Customize:
- Colors via theme variables
- Spacing and layout via Tailwind utilities
- Component variants via shadcn/ui props

---

## File Upload Implementation

The forms include placeholders for file uploads (profile picture, resume). To implement:

```tsx
const handleFileUpload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })
  
  const { url } = await response.json()
  return url
}

// Update form to use this
<Input 
  type="file" 
  onChange={async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = await handleFileUpload(file)
      setFormData({ ...formData, pictureUrl: url })
    }
  }}
/>
```

---

## Error Handling

Forms include built-in validation with error messages. Extend error handling:

```typescript
const [errors, setErrors] = useState<Record<string, string>>({})

// Add custom validation
if (formData.phone && !isValidPhoneNumber(formData.phone)) {
  newErrors.phone = "Invalid phone number format"
}

// Display errors
{errors.fieldName && (
  <p className="text-xs text-destructive mt-1">{errors.fieldName}</p>
)}
```

---

## Accessibility

- All form inputs have associated labels
- Error messages are announced to screen readers
- Keyboard navigation fully supported
- Focus management in multi-step wizard
- ARIA attributes on interactive elements

---

## Next Steps

1. **Connect to Backend API** - Replace console.log with actual API calls
2. **Add Toast Notifications** - Show success/error messages
3. **Implement File Uploads** - Add storage service integration
4. **Add Edit Forms** - Create similar forms for updating records
5. **Add Confirmation Dialogs** - Before submission or cancellation

---

## Support

For issues or questions:
- Check form validation logic in source files
- Review mock data structure in `lib/mock-data.ts`
- Test with browser dev tools for API integration
