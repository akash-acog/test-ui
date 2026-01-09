// Define role-based access control configuration
export type UserRole = "admin" | "hr" | "manager" | "employee"

export interface RoleConfig {
  label: string
  description: string
  permissions: string[]
  allowedPages: string[]
  dashboardType: "admin" | "hr" | "manager" | "employee"
}

export const ROLE_CONFIGURATIONS: Record<UserRole, RoleConfig> = {
  admin: {
    label: "Admin",
    description: "Full system access",
    permissions: [
      "view_all_employees",
      "edit_all_employees",
      "delete_employees",
      "manage_users",
      "manage_roles",
      "view_reports",
      "manage_projects",
      "manage_allocations",
      "manage_ratings",
      "system_settings",
      "audit_logs",
    ],
    allowedPages: [
      "dashboard",
      "employees",
      "employee-detail",
      "projects",
      "allocations",
      "reporting",
      "ratings",
      "skill-matching",
      "profile",
      "checklist",
      "settings",
    ],
    dashboardType: "admin",
  },
  hr: {
    label: "HR",
    description: "Employee lifecycle management",
    permissions: [
      "view_all_employees",
      "edit_employee_personal",
      "view_projects",
      "view_allocations",
      "view_ratings",
      "generate_reports",
      "manage_departments",
      "manage_locations",
    ],
    allowedPages: [
      "dashboard",
      "employees",
      "employee-detail",
      "reporting",
      "ratings",
      "skill-matching",
      "profile",
      "checklist",
      "settings",
    ],
    dashboardType: "hr",
  },
  manager: {
    label: "Manager",
    description: "Project and resource management",
    permissions: [
      "view_all_employees",
      "view_employee_skills",
      "manage_projects",
      "manage_allocations",
      "manage_ratings",
      "generate_reports",
      "resolve_conflicts",
    ],
    allowedPages: [
      "dashboard",
      "employees",
      "employee-detail",
      "projects",
      "allocations",
      "reporting",
      "ratings",
      "skill-matching",
      "profile",
      "checklist",
      "settings",
    ],
    dashboardType: "manager",
  },
  employee: {
    label: "Employee",
    description: "Self-service access",
    permissions: [
      "view_own_profile",
      "edit_own_profile",
      "upload_documents",
      "view_own_projects",
      "view_own_checklist",
      "view_own_ratings",
    ],
    allowedPages: ["dashboard", "employee-detail", "projects", "profile", "checklist", "settings"],
    dashboardType: "employee",
  },
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_CONFIGURATIONS[role].permissions.includes(permission)
}

export function canAccessPage(role: UserRole, page: string): boolean {
  return ROLE_CONFIGURATIONS[role].allowedPages.includes(page)
}
