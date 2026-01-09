"use client"

import { useState, useRef, useEffect } from "react"
import { useRole } from "@/lib/role-context"
import { ROLE_CONFIGURATIONS, type UserRole } from "@/lib/role-config"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

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
    <div className="fixed top-4 right-4 z-40">
      <div ref={dropdownRef} className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="gap-2 capitalize shadow-md hover:shadow-lg transition-shadow"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-primary" />
          {user?.role}
          <ChevronDown className="h-4 w-4" />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg p-2">
            <div className="mb-2 px-3 py-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase">Switch Role</p>
            </div>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => {
                  switchRole(role)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  user?.role === role ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                <div className="capitalize">{role}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{ROLE_CONFIGURATIONS[role].description}</div>
              </button>
            ))}
            <div className="border-t border-border mt-2 pt-2">
              <div className="px-3 py-2 text-xs text-muted-foreground">
                <p className="font-medium">{user?.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
