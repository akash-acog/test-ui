"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRole } from "@/lib/role-context"
import { canAccessPage } from "@/lib/role-config"
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  PieChart,
  FileText,
  Star,
  Target,
  User,
  CheckSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { memo } from "react"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export const Sidebar = memo(function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { user } = useRole()

  if (!user) return null

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, page: "dashboard" },
    { name: "Employees", href: "/employees", icon: Users, page: "employees" },
    { name: "Projects", href: "/projects", icon: FolderKanban, page: "projects" },
    { name: "Allocations", href: "/allocations", icon: PieChart, page: "allocations" },
    { name: "Reporting", href: "/reporting", icon: FileText, page: "reporting" },
    { name: "Ratings", href: "/ratings", icon: Star, page: "ratings" },
    { name: "Skill Matching", href: "/skill-matching", icon: Target, page: "skill-matching" },
    { name: "Profile", href: "/profile", icon: User, page: "profile" },
    { name: "Checklist", href: "/checklist", icon: CheckSquare, page: "checklist" },
    { name: "Settings", href: "/settings", icon: Settings, page: "settings" },
  ]

  const filteredNavigation = navigation.filter((item) => canAccessPage(user.role, item.page))

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-50 flex flex-col shadow-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-lg opacity-75 blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">EM</span>
              </div>
            </div>
            <span className="font-bold text-foreground text-lg tracking-tight">EMS</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "p-2 rounded-lg hover:bg-primary/10 transition-all duration-200 group",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
        <div className="space-y-1">
          {filteredNavigation.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  "animate-slide-in",
                  isActive
                    ? "bg-gradient-primary text-white shadow-lg glow-primary"
                    : "text-foreground hover:bg-primary/5 hover:text-primary"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                )}
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                  )}
                />
                {!collapsed && (
                  <span className={cn(
                    "font-medium truncate transition-all",
                    isActive ? "text-white" : "text-foreground"
                  )}>
                    {item.name}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-muted hover:bg-muted/80 transition-all duration-200 cursor-pointer group">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-75 blur-sm group-hover:blur-md transition-all"></div>
              <div className="relative w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-sm">
                  {user.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {user.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
