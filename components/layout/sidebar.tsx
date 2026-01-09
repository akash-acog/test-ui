"use client"

import { usePathname, useRouter } from "next/navigation"
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

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
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
        "fixed left-0 top-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-50 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo & Toggle */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">EM</span>
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">EMS</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className={cn(
            "p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors",
            collapsed && "mx-auto"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <button
                key={item.name}
                onClick={() => router.push(item.href)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
                  )}
                />
                {!collapsed && <span className="font-medium truncate">{item.name}</span>}
              </button>
            )
          })}
        </div>
      </nav>

      {/* User Info */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{user.name.substring(0, 2).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
