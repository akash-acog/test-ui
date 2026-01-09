// Enhanced Mock Data with comprehensive stats and metrics

export const departments = [
  "Engineering",
  "Product",
  "Design",
  "HR",
  "Marketing",
  "Sales",
  "Finance",
  "Operations",
]

export const locations = [
  "New York",
  "San Francisco",
  "Austin",
  "Boston",
  "Seattle",
  "Remote",
  "London",
  "Bangalore",
]

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
      { name: "Docker", proficiency: "Advanced" },
      { name: "GraphQL", proficiency: "Intermediate" },
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
      { name: "Roadmap Planning", proficiency: "Expert" },
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
      { name: "Sketch", proficiency: "Advanced" },
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
      { name: "CSS", proficiency: "Intermediate" },
      { name: "Git", proficiency: "Intermediate" },
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
      { name: "Performance Management", proficiency: "Advanced" },
    ],
    projects: [],
  },
  {
    id: "6",
    code: "EMP006",
    name: "Michael Johnson",
    email: "michael.johnson@company.com",
    phone: "+1-555-0106",
    designation: "DevOps Engineer",
    department: "Engineering",
    location: "Seattle",
    type: "Full-time",
    status: "Active",
    joinDate: "2020-07-01",
    dob: "1993-04-10",
    gender: "Male",
    address: "888 Cloud Street, Seattle, WA 98101",
    emergencyContact: "Sarah Johnson, +1-555-0204",
    previousExperience: 7,
    college: "UC Berkeley",
    educationalStream: "Computer Engineering",
    bioData: "DevOps specialist with expertise in CI/CD and cloud infrastructure",
    githubUrl: "https://github.com/mjdevops",
    picture: "/professional-headshot.png",
    resume: "/resume-michael.pdf",
    manager: "Michael Scott",
    workstream: "Infrastructure",
    reportingTo: "Michael Scott",
    skills: [
      { name: "AWS", proficiency: "Expert" },
      { name: "Docker", proficiency: "Expert" },
      { name: "Kubernetes", proficiency: "Advanced" },
      { name: "Terraform", proficiency: "Advanced" },
      { name: "CI/CD", proficiency: "Expert" },
      { name: "Python", proficiency: "Intermediate" },
    ],
    projects: ["3", "4"],
  },
  {
    id: "7",
    code: "EMP007",
    name: "Priya Patel",
    email: "priya.patel@company.com",
    phone: "+1-555-0107",
    designation: "Data Scientist",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    status: "Active",
    joinDate: "2022-03-01",
    dob: "1996-09-18",
    gender: "Female",
    address: "Remote Worker",
    emergencyContact: "Raj Patel, +1-555-0205",
    previousExperience: 5,
    college: "Carnegie Mellon",
    educationalStream: "Data Science",
    bioData: "Data scientist specializing in ML and predictive analytics",
    githubUrl: "https://github.com/priyadata",
    picture: "/professional-headshot.png",
    resume: "/resume-priya.pdf",
    manager: "Michael Scott",
    workstream: "Data & Analytics",
    reportingTo: "Michael Scott",
    skills: [
      { name: "Python", proficiency: "Expert" },
      { name: "Machine Learning", proficiency: "Advanced" },
      { name: "TensorFlow", proficiency: "Intermediate" },
      { name: "SQL", proficiency: "Advanced" },
      { name: "Data Visualization", proficiency: "Advanced" },
    ],
    projects: ["5"],
  },
  {
    id: "8",
    code: "EMP008",
    name: "David Kim",
    email: "david.kim@company.com",
    phone: "+1-555-0108",
    designation: "Marketing Manager",
    department: "Marketing",
    location: "San Francisco",
    type: "Full-time",
    status: "Active",
    joinDate: "2021-05-20",
    dob: "1991-12-03",
    gender: "Male",
    address: "999 Market St, San Francisco, CA 94103",
    emergencyContact: "Jenny Kim, +1-555-0206",
    previousExperience: 9,
    college: "UCLA",
    educationalStream: "Marketing",
    bioData: "Marketing professional with expertise in digital campaigns",
    githubUrl: "",
    picture: "/professional-headshot.png",
    resume: "/resume-david.pdf",
    manager: "Jennifer Lee",
    workstream: "Growth Marketing",
    reportingTo: "Jennifer Lee",
    skills: [
      { name: "Digital Marketing", proficiency: "Expert" },
      { name: "SEO", proficiency: "Advanced" },
      { name: "Content Strategy", proficiency: "Advanced" },
      { name: "Analytics", proficiency: "Intermediate" },
    ],
    projects: [],
  },
  {
    id: "9",
    code: "EMP009",
    name: "Rachel Green",
    email: "rachel.green@company.com",
    phone: "+1-555-0109",
    designation: "QA Engineer",
    department: "Engineering",
    location: "Austin",
    type: "Full-time",
    status: "Active",
    joinDate: "2023-02-15",
    dob: "1999-07-22",
    gender: "Female",
    address: "777 Test Lane, Austin, TX 78702",
    emergencyContact: "Monica Green, +1-555-0207",
    previousExperience: 2,
    college: "UT Austin",
    educationalStream: "Software Engineering",
    bioData: "QA engineer focused on test automation and quality assurance",
    githubUrl: "https://github.com/rachelqa",
    picture: "/professional-headshot.png",
    resume: "/resume-rachel.pdf",
    manager: "Sarah Anderson",
    workstream: "Quality Engineering",
    reportingTo: "Sarah Anderson",
    skills: [
      { name: "Test Automation", proficiency: "Advanced" },
      { name: "Selenium", proficiency: "Intermediate" },
      { name: "JavaScript", proficiency: "Intermediate" },
      { name: "API Testing", proficiency: "Advanced" },
    ],
    projects: ["1", "2"],
  },
  {
    id: "10",
    code: "EMP010",
    name: "Tom Martinez",
    email: "tom.martinez@company.com",
    phone: "+1-555-0110",
    designation: "Backend Developer",
    department: "Engineering",
    location: "New York",
    type: "Contract",
    status: "Active",
    joinDate: "2023-10-01",
    dob: "1994-02-28",
    gender: "Male",
    address: "444 Backend Blvd, New York, NY 10003",
    emergencyContact: "Maria Martinez, +1-555-0208",
    previousExperience: 4,
    college: "Columbia",
    educationalStream: "Computer Science",
    bioData: "Backend specialist with focus on scalable microservices",
    githubUrl: "https://github.com/tombackend",
    picture: "/professional-headshot.png",
    resume: "/resume-tom.pdf",
    manager: "Sarah Anderson",
    workstream: "Backend Engineering",
    reportingTo: "Sarah Anderson",
    skills: [
      { name: "Node.js", proficiency: "Expert" },
      { name: "PostgreSQL", proficiency: "Advanced" },
      { name: "MongoDB", proficiency: "Advanced" },
      { name: "GraphQL", proficiency: "Advanced" },
      { name: "Redis", proficiency: "Intermediate" },
    ],
    projects: ["3"],
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
    spent: 82000,
    teamSize: 8,
    progress: 55,
    client: "Acme Corporation",
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
    status: "Active",
    priority: "Critical",
    type: "Billable",
    startDate: "2024-02-01",
    endDate: "2024-09-30",
    budget: 200000,
    spent: 45000,
    teamSize: 10,
    progress: 23,
    client: "TechStart Inc",
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
    spent: 95000,
    teamSize: 6,
    progress: 79,
    client: "Internal",
    requiredSkills: [
      { name: "Node.js", proficiency: "Advanced" },
      { name: "PostgreSQL", proficiency: "Advanced" },
      { name: "AWS", proficiency: "Intermediate" },
    ],
  },
  {
    id: "4",
    code: "PROJ004",
    name: "Cloud Migration",
    description: "Migration of legacy systems to AWS cloud infrastructure",
    manager: "6", // Michael Johnson
    status: "Planned",
    priority: "Medium",
    type: "Internal",
    startDate: "2024-03-01",
    endDate: "2024-12-31",
    budget: 180000,
    spent: 0,
    teamSize: 5,
    progress: 5,
    client: "Internal",
    requiredSkills: [
      { name: "AWS", proficiency: "Expert" },
      { name: "Docker", proficiency: "Advanced" },
      { name: "Kubernetes", proficiency: "Advanced" },
    ],
  },
  {
    id: "5",
    code: "PROJ005",
    name: "Analytics Platform",
    description: "Real-time analytics and reporting dashboard",
    manager: "7", // Priya Patel
    status: "Active",
    priority: "Medium",
    type: "Billable",
    startDate: "2024-01-01",
    endDate: "2024-07-31",
    budget: 130000,
    spent: 58000,
    teamSize: 4,
    progress: 45,
    client: "DataCorp Ltd",
    requiredSkills: [
      { name: "Python", proficiency: "Advanced" },
      { name: "SQL", proficiency: "Advanced" },
      { name: "Data Visualization", proficiency: "Intermediate" },
    ],
  },
  {
    id: "6",
    code: "PROJ006",
    name: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    manager: "1", // Sarah Anderson
    status: "Completed",
    priority: "Low",
    type: "Billable",
    startDate: "2023-06-01",
    endDate: "2023-12-31",
    budget: 250000,
    spent: 248000,
    teamSize: 12,
    progress: 100,
    client: "ShopFast Corp",
    requiredSkills: [
      { name: "React", proficiency: "Advanced" },
      { name: "Node.js", proficiency: "Advanced" },
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
  {
    id: "7",
    employee: "6",
    project: "3",
    allocationPercent: 50,
    startDate: "2023-11-01",
    endDate: null,
    billable: true,
    notes: "DevOps and infrastructure setup",
    createdBy: "admin",
    createdAt: "2023-10-25",
  },
  {
    id: "8",
    employee: "6",
    project: "4",
    allocationPercent: 40,
    startDate: "2024-03-01",
    endDate: null,
    billable: false,
    notes: "Lead cloud migration",
    createdBy: "admin",
    createdAt: "2024-02-20",
  },
  {
    id: "9",
    employee: "7",
    project: "5",
    allocationPercent: 90,
    startDate: "2024-01-01",
    endDate: null,
    billable: true,
    notes: "Lead data scientist",
    createdBy: "admin",
    createdAt: "2023-12-15",
  },
  {
    id: "10",
    employee: "9",
    project: "1",
    allocationPercent: 60,
    startDate: "2024-01-15",
    endDate: null,
    billable: true,
    notes: "QA testing and automation",
    createdBy: "admin",
    createdAt: "2024-01-10",
  },
  {
    id: "11",
    employee: "9",
    project: "2",
    allocationPercent: 30,
    startDate: "2024-02-01",
    endDate: null,
    billable: true,
    notes: "Mobile QA testing",
    createdBy: "admin",
    createdAt: "2024-01-25",
  },
  {
    id: "12",
    employee: "10",
    project: "3",
    allocationPercent: 100,
    startDate: "2023-11-01",
    endDate: null,
    billable: true,
    notes: "Backend API development",
    createdBy: "admin",
    createdAt: "2023-10-25",
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
  {
    id: "4",
    employee: "6",
    project: "3",
    rating: 5,
    remarks: "Outstanding DevOps expertise, project ahead of schedule",
    ratedBy: "1",
    ratedAt: "2024-01-05",
  },
  {
    id: "5",
    employee: "7",
    project: "5",
    rating: 5,
    remarks: "Exceptional data analysis and insights",
    ratedBy: "7",
    ratedAt: "2024-01-10",
  },
  {
    id: "6",
    employee: "9",
    project: "1",
    rating: 4,
    remarks: "Thorough QA processes, found critical bugs early",
    ratedBy: "1",
    ratedAt: "2024-01-08",
  },
  {
    id: "7",
    employee: "10",
    project: "3",
    rating: 4,
    remarks: "Solid backend work, good API design",
    ratedBy: "1",
    ratedAt: "2024-01-05",
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
  "Docker",
  "Kubernetes",
  "Terraform",
  "CI/CD",
  "Python",
  "Machine Learning",
  "TensorFlow",
  "SQL",
  "Data Visualization",
  "Digital Marketing",
  "SEO",
  "Content Strategy",
  "Test Automation",
  "Selenium",
  "API Testing",
  "MongoDB",
  "GraphQL",
  "Redis",
  "Git",
  "Sketch",
  "Performance Management",
  "Roadmap Planning",
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

// Analytics and Reporting Helpers
export const getDepartmentStats = () => {
  const stats = departments.map((dept) => {
    const employees = mockEmployees.filter((emp) => emp.department === dept)
    return {
      department: dept,
      count: employees.length,
      active: employees.filter((emp) => emp.status === "Active").length,
    }
  })
  return stats.filter((s) => s.count > 0)
}

export const getLocationStats = () => {
  const stats = locations.map((loc) => {
    const count = mockEmployees.filter((emp) => emp.location === loc).length
    return { location: loc, count }
  })
  return stats.filter((s) => s.count > 0)
}

export const getProjectStats = () => {
  return {
    total: mockProjects.length,
    active: mockProjects.filter((p) => p.status === "Active").length,
    completed: mockProjects.filter((p) => p.status === "Completed").length,
    planned: mockProjects.filter((p) => p.status === "Planned").length,
  }
}

export const getUtilizationStats = () => {
  const employees = mockEmployees.filter((emp) => emp.status === "Active")
  const utilizationData = employees.map((emp) => ({
    id: emp.id,
    name: emp.name,
    utilization: calculateEmployeeUtilization(emp.id),
    department: emp.department,
  }))

  const avgUtilization =
    utilizationData.reduce((sum, emp) => sum + emp.utilization, 0) / utilizationData.length

  return {
    average: Math.round(avgUtilization),
    overAllocated: utilizationData.filter((emp) => emp.utilization > 100).length,
    fullyAllocated: utilizationData.filter((emp) => emp.utilization === 100).length,
    partiallyAllocated: utilizationData.filter((emp) => emp.utilization > 0 && emp.utilization < 100).length,
    available: utilizationData.filter((emp) => emp.utilization === 0).length,
    data: utilizationData,
  }
}

export const getBudgetStats = () => {
  const totalBudget = mockProjects.reduce((sum, proj) => sum + proj.budget, 0)
  const totalSpent = mockProjects.reduce((sum, proj) => sum + (proj.spent || 0), 0)
  const activeBudget = mockProjects
    .filter((p) => p.status === "Active")
    .reduce((sum, proj) => sum + proj.budget, 0)
  const activeSpent = mockProjects
    .filter((p) => p.status === "Active")
    .reduce((sum, proj) => sum + (proj.spent || 0), 0)

  return {
    total: totalBudget,
    spent: totalSpent,
    remaining: totalBudget - totalSpent,
    utilizationPercent: Math.round((totalSpent / totalBudget) * 100),
    active: {
      budget: activeBudget,
      spent: activeSpent,
      remaining: activeBudget - activeSpent,
    },
  }
}

export const getSkillsDistribution = () => {
  const skillCounts: Record<string, { total: number; byLevel: Record<string, number> }> = {}

  mockEmployees.forEach((emp) => {
    emp.skills.forEach((skill) => {
      if (!skillCounts[skill.name]) {
        skillCounts[skill.name] = {
          total: 0,
          byLevel: { Beginner: 0, Intermediate: 0, Advanced: 0, Expert: 0 },
        }
      }
      skillCounts[skill.name].total++
      skillCounts[skill.name].byLevel[skill.proficiency]++
    })
  })

  return Object.entries(skillCounts)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
}

export const getMonthlyHiringTrend = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
  const currentYear = new Date().getFullYear()
  const trend = months.map((month, index) => {
    const hires = mockEmployees.filter((emp) => {
      const joinDate = new Date(emp.joinDate)
      return joinDate.getMonth() === index && joinDate.getFullYear() === currentYear - 1
    }).length
    return { month, hires }
  })
  return trend
}
