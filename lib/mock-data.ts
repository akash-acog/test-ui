export const mockEmployees = [
  {
    id: "1",
    code: "EMP001",
    name: "Sarah Anderson",
    email: "sarah.anderson@company.com",
    phone: "+1-555-0101",
    designation: "Senior Developer",
    department: "Engineering",
    location: "New York",
    type: "Full-time",
    status: "Active",
    joinDate: "2021-03-15",
    dob: "1995-06-20",
    gender: "Female",
    address: "123 Tech Street, New York, NY 10001",
    emergencyContact: "John Anderson, +1-555-0199",
    previousExperience: 6,
    college: "MIT",
    educationalStream: "Computer Science",
    bioData: "Senior developer with 6+ years of experience building scalable applications",
    githubUrl: "https://github.com/sarahtech",
    picture: "/professional-headshot.png",
    resume: "/resume-sarah.pdf",
    manager: "Michael Scott",
    workstream: "Platform Engineering",
    reportingTo: "Michael Scott",
    skills: [
      { name: "React", proficiency: "Expert" },
      { name: "TypeScript", proficiency: "Expert" },
      { name: "Node.js", proficiency: "Advanced" },
      { name: "AWS", proficiency: "Intermediate" },
      { name: "PostgreSQL", proficiency: "Advanced" },
    ],
    projects: ["1", "3"],
  },
  {
    id: "2",
    code: "EMP002",
    name: "John Mitchell",
    email: "john.mitchell@company.com",
    phone: "+1-555-0102",
    designation: "Product Manager",
    department: "Product",
    location: "San Francisco",
    type: "Full-time",
    status: "Active",
    joinDate: "2022-06-20",
    dob: "1992-08-15",
    gender: "Male",
    address: "456 Innovation Ave, San Francisco, CA 94105",
    emergencyContact: "Jane Mitchell, +1-555-0200",
    previousExperience: 8,
    college: "Stanford",
    educationalStream: "Business Administration",
    bioData: "Product leader focused on user-centric design and market strategy",
    githubUrl: "https://github.com/johnpm",
    picture: "/professional-headshot.png",
    resume: "/resume-john.pdf",
    manager: "Jennifer Lee",
    workstream: "Product Strategy",
    reportingTo: "Jennifer Lee",
    skills: [
      { name: "Product Strategy", proficiency: "Expert" },
      { name: "User Research", proficiency: "Advanced" },
      { name: "Analytics", proficiency: "Advanced" },
    ],
    projects: ["2"],
  },
  {
    id: "3",
    code: "EMP003",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@company.com",
    phone: "+1-555-0103",
    designation: "UX Designer",
    department: "Design",
    location: "Austin",
    type: "Full-time",
    status: "Active",
    joinDate: "2022-01-10",
    dob: "1998-03-25",
    gender: "Female",
    address: "789 Design Lane, Austin, TX 78701",
    emergencyContact: "Carlos Rodriguez, +1-555-0201",
    previousExperience: 4,
    college: "RISD",
    educationalStream: "Graphic Design",
    bioData: "Creative designer passionate about creating intuitive user experiences",
    githubUrl: "https://github.com/emmadesign",
    picture: "/professional-headshot.png",
    resume: "/resume-emma.pdf",
    manager: "Michael Scott",
    workstream: "Design Systems",
    reportingTo: "Michael Scott",
    skills: [
      { name: "Figma", proficiency: "Expert" },
      { name: "User Testing", proficiency: "Advanced" },
      { name: "Prototyping", proficiency: "Advanced" },
      { name: "Design Systems", proficiency: "Intermediate" },
      { name: "CSS", proficiency: "Intermediate" },
    ],
    projects: ["1", "2"],
  },
  {
    id: "4",
    code: "EMP004",
    name: "Alex Chen",
    email: "alex.chen@company.com",
    phone: "+1-555-0104",
    designation: "Junior Developer",
    department: "Engineering",
    location: "New York",
    type: "Full-time",
    status: "Active",
    joinDate: "2023-09-01",
    dob: "2001-11-12",
    gender: "Male",
    address: "321 Dev Drive, New York, NY 10002",
    emergencyContact: "Wei Chen, +1-555-0202",
    previousExperience: 1,
    college: "NYU",
    educationalStream: "Information Technology",
    bioData: "Junior developer eager to learn and grow in the tech industry",
    githubUrl: "https://github.com/alexdev",
    picture: "/professional-headshot.png",
    resume: "/resume-alex.pdf",
    manager: "Sarah Anderson",
    workstream: "Platform Engineering",
    reportingTo: "Sarah Anderson",
    skills: [
      { name: "JavaScript", proficiency: "Intermediate" },
      { name: "React", proficiency: "Intermediate" },
      { name: "Node.js", proficiency: "Beginner" },
      { name: "CSS", proficiency: "Beginner" },
    ],
    projects: ["1"],
  },
  {
    id: "5",
    code: "EMP005",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    phone: "+1-555-0105",
    designation: "HR Manager",
    department: "HR",
    location: "Boston",
    type: "Full-time",
    status: "Active",
    joinDate: "2021-11-15",
    dob: "1990-05-08",
    gender: "Female",
    address: "555 HR Plaza, Boston, MA 02101",
    emergencyContact: "Michael Thompson, +1-555-0203",
    previousExperience: 10,
    college: "Boston University",
    educationalStream: "Human Resources",
    bioData: "HR professional dedicated to building strong company culture",
    githubUrl: "",
    picture: "/professional-headshot.png",
    resume: "/resume-lisa.pdf",
    manager: "David Wilson",
    workstream: "People Operations",
    reportingTo: "David Wilson",
    skills: [
      { name: "Recruitment", proficiency: "Expert" },
      { name: "Employee Relations", proficiency: "Expert" },
      { name: "Compliance", proficiency: "Advanced" },
    ],
    projects: [],
  },
]

export const mockProjects = [
  {
    id: "1",
    code: "PROJ001",
    name: "Customer Portal Redesign",
    description: "Complete redesign of the customer-facing portal with modern UI/UX",
    manager: "1", // Sarah Anderson
    status: "Active",
    priority: "High",
    type: "Billable",
    startDate: "2024-01-15",
    endDate: "2024-06-30",
    budget: 150000,
    teamSize: 8,
    requiredSkills: [
      { name: "React", proficiency: "Advanced" },
      { name: "TypeScript", proficiency: "Advanced" },
      { name: "Figma", proficiency: "Advanced" },
      { name: "User Testing", proficiency: "Intermediate" },
    ],
  },
  {
    id: "2",
    code: "PROJ002",
    name: "Mobile App Development",
    description: "Native mobile app for iOS and Android platforms",
    manager: "2", // John Mitchell
    status: "Planned",
    priority: "Medium",
    type: "Billable",
    startDate: "2024-02-01",
    endDate: "2024-09-30",
    budget: 200000,
    teamSize: 10,
    requiredSkills: [
      { name: "React", proficiency: "Advanced" },
      { name: "Product Strategy", proficiency: "Intermediate" },
    ],
  },
  {
    id: "3",
    code: "PROJ003",
    name: "API Integration Hub",
    description: "Centralized API management and integration platform",
    manager: "1", // Sarah Anderson
    status: "Active",
    priority: "High",
    type: "Internal",
    startDate: "2023-11-01",
    endDate: "2024-05-31",
    budget: 120000,
    teamSize: 6,
    requiredSkills: [
      { name: "Node.js", proficiency: "Advanced" },
      { name: "PostgreSQL", proficiency: "Advanced" },
      { name: "AWS", proficiency: "Intermediate" },
    ],
  },
]

export const mockAllocations = [
  {
    id: "1",
    employee: "1",
    project: "1",
    allocationPercent: 60,
    startDate: "2024-01-15",
    endDate: null,
    billable: true,
    notes: "Lead developer for frontend team",
    createdBy: "admin",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    employee: "1",
    project: "3",
    allocationPercent: 30,
    startDate: "2024-01-15",
    endDate: null,
    billable: true,
    notes: "Architecture and backend design",
    createdBy: "admin",
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    employee: "3",
    project: "1",
    allocationPercent: 50,
    startDate: "2024-01-15",
    endDate: null,
    billable: true,
    notes: "Lead UX designer",
    createdBy: "admin",
    createdAt: "2024-01-10",
  },
  {
    id: "4",
    employee: "3",
    project: "2",
    allocationPercent: 40,
    startDate: "2024-02-01",
    endDate: null,
    billable: true,
    notes: "Mobile UI/UX design",
    createdBy: "admin",
    createdAt: "2024-01-15",
  },
  {
    id: "5",
    employee: "4",
    project: "1",
    allocationPercent: 80,
    startDate: "2024-01-15",
    endDate: null,
    billable: true,
    notes: "Junior developer on frontend",
    createdBy: "admin",
    createdAt: "2024-01-10",
  },
  {
    id: "6",
    employee: "2",
    project: "2",
    allocationPercent: 100,
    startDate: "2024-02-01",
    endDate: null,
    billable: true,
    notes: "Project owner and PM",
    createdBy: "admin",
    createdAt: "2024-01-15",
  },
]

export const mockPerformanceRatings = [
  {
    id: "1",
    employee: "1",
    project: "1",
    rating: 5,
    remarks: "Excellent technical leadership and mentoring",
    ratedBy: "1",
    ratedAt: "2023-12-01",
  },
  {
    id: "2",
    employee: "3",
    project: "1",
    rating: 4,
    remarks: "Great design skills, could improve communication",
    ratedBy: "1",
    ratedAt: "2023-12-01",
  },
  {
    id: "3",
    employee: "4",
    project: "1",
    rating: 4,
    remarks: "Shows great potential, quick learner",
    ratedBy: "1",
    ratedAt: "2023-11-15",
  },
]

export const skillTaxonomy = [
  "React",
  "TypeScript",
  "Node.js",
  "AWS",
  "PostgreSQL",
  "Figma",
  "User Testing",
  "Prototyping",
  "Design Systems",
  "CSS",
  "JavaScript",
  "Product Strategy",
  "User Research",
  "Analytics",
  "Recruitment",
  "Employee Relations",
  "Compliance",
]

export const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

export const getEmployeeById = (id: string) => mockEmployees.find((emp) => emp.id === id)

export const getEmployeesByRole = (role: string, currentUserId?: string) => {
  if (role === "employee" && currentUserId) {
    return [mockEmployees.find((emp) => emp.id === currentUserId)].filter(Boolean)
  }
  if (role === "manager") {
    return mockEmployees
  }
  return mockEmployees
}

export const getProjectsByRole = (role: string, currentUserId?: string) => {
  if (role === "employee" && currentUserId) {
    return mockProjects.filter((proj) => {
      const allocations = mockAllocations.filter(
        (a) => a.employee === currentUserId && a.project === proj.id && !a.endDate,
      )
      return allocations.length > 0
    })
  }
  return mockProjects
}

export const calculateEmployeeUtilization = (employeeId: string): number => {
  const today = new Date()
  const allocations = mockAllocations.filter((a) => {
    const startDate = new Date(a.startDate)
    const endDate = a.endDate ? new Date(a.endDate) : null
    return a.employee === employeeId && startDate <= today && (!endDate || endDate >= today)
  })

  const totalUtilization = allocations.reduce((sum, alloc) => sum + alloc.allocationPercent, 0)
  return Math.min(totalUtilization, 100)
}

export const getEmployeeAvailabilityPercentage = (employeeId: string): number => {
  const utilization = calculateEmployeeUtilization(employeeId)
  return Math.max(0, 100 - utilization)
}

export const getEmployeeAvailability = (employeeId: string) => {
  const utilization = calculateEmployeeUtilization(employeeId)
  const availability = 100 - utilization

  if (availability === 100) return "Free"
  if (availability === 0) return "Fully Allocated"
  return "Partial"
}

export const matchSkills = (
  employeeSkills: { name: string; proficiency: string }[],
  requiredSkills: { name: string; proficiency: string }[],
) => {
  const proficiencyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 }

  const matches = {
    fullMatch: [] as { name: string; employeeProficiency: string; requiredProficiency: string }[],
    partialMatch: [] as { name: string; employeeProficiency: string; requiredProficiency: string }[],
    gap: [] as string[],
  }

  requiredSkills.forEach((required) => {
    const employeeSkill = employeeSkills.find((s) => s.name === required.name)

    if (!employeeSkill) {
      matches.gap.push(required.name)
    } else {
      const empLevel = proficiencyOrder[employeeSkill.proficiency as keyof typeof proficiencyOrder] || 0
      const reqLevel = proficiencyOrder[required.proficiency as keyof typeof proficiencyOrder] || 0

      if (empLevel >= reqLevel) {
        matches.fullMatch.push({
          name: required.name,
          employeeProficiency: employeeSkill.proficiency,
          requiredProficiency: required.proficiency,
        })
      } else {
        matches.partialMatch.push({
          name: required.name,
          employeeProficiency: employeeSkill.proficiency,
          requiredProficiency: required.proficiency,
        })
      }
    }
  })

  return matches
}

export const getEmployeeAllocations = (employeeId: string) => {
  return mockAllocations
    .filter((a) => a.employee === employeeId)
    .map((a) => ({
      ...a,
      projectName: mockProjects.find((p) => p.id === a.project)?.name || "Unknown",
    }))
}
