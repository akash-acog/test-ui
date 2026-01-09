"use client"

import { useEffect, useState, Suspense } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useRole } from "@/lib/role-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { canAccessPage } from "@/lib/role-config"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useRole()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push("/")
      return
    }

    const page = pathname.split("/")[1] || "dashboard"
    if (!canAccessPage(user.role, page)) {
      router.push("/dashboard")
    }
  }, [user, pathname, router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* REMOVED all background decorations - completely clean background */}
      
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <Header />
        <main className="relative z-10 p-6 lg:p-8 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={
              <div className="space-y-6 animate-pulse">
                <div className="h-8 w-48 bg-muted rounded-lg"></div>
                <div className="h-64 bg-card rounded-xl"></div>
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}
