"use client"

import { Button } from "@/components/ui/button"
import { canAccessPage, ROLE_CONFIGURATIONS, type UserRole } from "@/lib/role-config"
import { Users, Briefcase, Activity, FileText, BarChart3, Settings, User, CheckSquare, Award, Zap } from "lucide-react"

interface NavigationProps {
  currentPage: string
  onNavigate: (page: string) => void
  userRole: UserRole
}

export function Navigation({ currentPage, onNavigate, userRole }: NavigationProps) {
  const allNavItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "employees", label: "Employees", icon: Users },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "allocations", label: "Allocations", icon: Activity },
    { id: "reporting", label: "Reports", icon: FileText },
    { id: "ratings", label: "Ratings", icon: Award },
    { id: "skill-matching", label: "Skill Matching", icon: Zap },
    { id: "profile", label: "Profile", icon: User },
    { id: "checklist", label: "Checklist", icon: CheckSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const navItems = allNavItems.filter((item) => canAccessPage(userRole, item.id))

  return (
    <aside className="w-64 h-screen border-r border-border bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 transition-all duration-300 fixed left-0 top-0 flex flex-col overflow-hidden">
      <div className="border-b border-sidebar-border bg-gradient-to-r from-sidebar-primary/10 to-transparent p-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">E</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EMS
            </h1>
          </div>
          <p className="text-xs font-medium text-sidebar-foreground/60 uppercase tracking-wide">
            {ROLE_CONFIGURATIONS[userRole].label}
          </p>
        </div>
      </div>

      <nav className="space-y-1 p-4 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="mr-3 h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Button>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border bg-gradient-to-t from-sidebar-accent/20 to-transparent p-4">
        <p className="text-xs text-sidebar-foreground/50">© 2025 Enterprise Suite</p>
      </div>
    </aside>
  )
}
