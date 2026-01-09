"use client"

import { Bell, Search, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { RoleSelector } from "@/components/layout/role-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 glass sticky top-0 z-40">
      <div className="h-full px-6 lg:px-8 flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search employees, projects..."
              className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </Button>
          )}

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="rounded-full relative">
            <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>

          {/* Role Selector */}
          <RoleSelector />
        </div>
      </div>
    </header>
  )
}
