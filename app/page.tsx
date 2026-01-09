"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRole } from "@/lib/role-context"
import { ArrowRight, Users, FolderKanban, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const { user } = useRole()

  useEffect(() => {
    if (user) {
      // Redirect to role-based dashboard
      router.push("/dashboard")
    }
  }, [user, router])

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-muted">
        <div className="text-center space-y-6 p-8 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-gradient">
              Employee Management
            </h1>
            <p className="text-xl text-muted-foreground">Loading your dashboard...</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-muted">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-5xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Hero section */}
          <div className="space-y-6">
            <div className="inline-block">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Enterprise Resource Management
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="text-gradient">Employee Management</span>
              <br />
              <span className="text-foreground">Made Simple</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Streamline your workforce operations with our comprehensive employee management system.
              Track projects, allocations, and performance all in one place.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-primary/50 text-white"
                onClick={() => router.push("/dashboard")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Demo
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Employee Management</h3>
              <p className="text-muted-foreground text-sm">
                Comprehensive employee profiles with skills, allocations, and performance tracking.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FolderKanban className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Project Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Manage projects, timelines, and team assignments with real-time updates.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Resource Allocation</h3>
              <p className="text-muted-foreground text-sm">
                Optimize resource utilization with intelligent allocation and analytics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
