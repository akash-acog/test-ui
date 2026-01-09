"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useRole } from "@/lib/role-context"

export default function Home() {
  const router = useRouter()
  const { user } = useRole()

  useEffect(() => {
    if (user) {
      // Redirect to role-based dashboard
      router.push("/dashboard")
    }
  }, [user, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Employee Management
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">Enterprise Resource Management System</p>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-pink-600 dark:bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
