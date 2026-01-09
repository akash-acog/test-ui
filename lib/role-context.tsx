"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { UserRole } from "./role-config"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
}

interface RoleContextType {
  user: User | null
  setUser: (user: User) => void
  switchRole: (role: UserRole) => void
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "user-1",
    name: "Demo User",
    email: "demo@company.com",
    role: "employee",
    avatar: "DU",
  })

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role })
    }
  }

  return <RoleContext.Provider value={{ user, setUser, switchRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error("useRole must be used within RoleProvider")
  }
  return context
}
