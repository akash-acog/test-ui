"use client"

import { useState, useRef, useEffect } from "react"
import { useRole } from "@/lib/role-context"
import { ROLE_CONFIGURATIONS, type UserRole } from "@/lib/role-config"
import { Button } from "@/components/ui/button"
import { ChevronDown, User } from "lucide-react"

export function RoleSelector() {
  const { user, switchRole } = useRole()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const roles = (Object.keys(ROLE_CONFIGURATIONS) as UserRole[]).sort()

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 capitalize bg-background hover:bg-accent border-border shadow-sm transition-all"
      >
        <User className="h-4 w-4 text-primary" />
        <span className="font-medium text-foreground">{user?.role}</span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 rounded-lg border border-border bg-popover shadow-lg z-50">
          <div className="p-3">
            <div className="mb-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Switch Role</p>
            </div>
            
            <div className="space-y-1">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                    user?.role === role
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      user?.role === role ? "bg-primary-foreground" : "bg-primary"
                    }`} />
                    <span className="capitalize">{role}</span>
                  </div>
                  <div className="text-xs mt-1 opacity-80">
                    {ROLE_CONFIGURATIONS[role].description}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="border-t border-border mt-3 pt-3">
              <div className="px-3 py-1">
                <p className="text-xs font-medium text-muted-foreground">
                  Current User
                </p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {user?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
