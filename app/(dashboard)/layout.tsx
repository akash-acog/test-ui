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
      {/* Very subtle decorative background elements */}
      <div className="fixed inset-0 bg-mesh-gradient opacity-10 pointer-events-none"></div>
      <div className="fixed inset-0 bg-dot-pattern opacity-20 pointer-events-none"></div>
      
      {/* Animated blobs - extremely subtle */}
      <div className="fixed top-0 -left-4 w-72 h-72 bg-primary/3 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="fixed top-0 -right-4 w-72 h-72 bg-purple-300/3 dark:bg-purple-500/3 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed -bottom-8 left-20 w-72 h-72 bg-indigo-300/3 dark:bg-indigo-500/3 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>
      
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
