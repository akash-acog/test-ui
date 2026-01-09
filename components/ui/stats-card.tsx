import { LucideIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
  }
  variant?: "default" | "primary" | "success" | "warning" | "danger"
  className?: string
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) {
  const variants = {
    default: "from-primary/5 to-transparent",
    primary: "from-primary/5 to-transparent",
    success: "from-chart-3/5 to-transparent",
    warning: "from-chart-4/5 to-transparent",
    danger: "from-destructive/5 to-transparent",
  }

  const iconVariants = {
    default: "bg-primary/10 text-primary",
    primary: "bg-primary/10 text-primary",
    success: "bg-chart-3/10 text-chart-3",
    warning: "bg-chart-4/10 text-chart-4",
    danger: "bg-destructive/10 text-destructive",
  }

  return (
    <Card className={cn("relative overflow-hidden group card-hover bg-card", className)}>
      {/* Subtle gradient accent */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-30 pointer-events-none",
        variants[variant]
      )} />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold text-foreground">{value}</h3>
              {trend && (
                <span className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  trend.value >= 0 
                    ? "bg-chart-3/10 text-chart-3" 
                    : "bg-destructive/10 text-destructive"
                )}>
                  {trend.value >= 0 ? "+" : ""}{trend.value}% {trend.label}
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          
          <div className={cn(
            "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
            iconVariants[variant]
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </Card>
  )
}
