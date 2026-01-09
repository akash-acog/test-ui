"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Bell, Lock, Palette, FileText } from "lucide-react"

export function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    dataRetention: "90",
  })

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Page Header */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="mx-auto w-full px-6 py-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage system preferences and configurations</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl w-full px-6 py-8">
          <div className="space-y-6">
            {/* Notifications Settings */}
            <Card className="border-border/50 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                    <p className="text-sm text-muted-foreground">Manage notification preferences</p>
                  </div>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
                />
              </div>
            </Card>

            {/* Appearance Settings */}
            <Card className="border-border/50 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Palette className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Appearance</h3>
                  <p className="text-sm text-muted-foreground">Customize how the application looks</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Theme</label>
                    <Select defaultValue="auto">
                      <SelectTrigger className="border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Language</label>
                    <Select defaultValue="en">
                      <SelectTrigger className="border-border/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Data Settings */}
            <Card className="border-border/50 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 rounded-lg bg-chart-3/10">
                  <FileText className="h-6 w-6 text-chart-3" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
                  <p className="text-sm text-muted-foreground">Configure data retention and privacy</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Data Retention Period</label>
                  <Select defaultValue={settings.dataRetention}>
                    <SelectTrigger className="border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                      <SelectItem value="180">180 Days</SelectItem>
                      <SelectItem value="365">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Security Settings */}
            <Card className="border-border/50 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Lock className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Security</h3>
                  <p className="text-sm text-muted-foreground">Manage security and privacy options</p>
                </div>
              </div>
              <Button className="bg-primary">Change Password</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
