"use client"

import { Bell, Search, Sun, Moon, Sparkles } from "lucide-react"
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
    <header className="h-16 border-b border-border bg-background sticky top-0 z-40 shadow-sm">
      <div className="h-full px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Search - Left */}
        <div className="flex-1 max-w-md">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="search"
              placeholder="Search employees, projects..."
              className="pl-10 bg-muted/30 border-border/50 focus:bg-card focus:border-primary/50 transition-all duration-200 rounded-xl"
            />
          </div>
        </div>

        {/* Role Selector - Center */}
        <div className="flex-shrink-0">
          <RoleSelector />
        </div>

        {/* Actions - Right */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              )}
            </Button>
          )}

          {/* Notifications */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-xl relative hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-200" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full animate-pulse" />
          </Button>
        </div>
      </div>
    </header>
  )
}
