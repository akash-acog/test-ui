# Dark Mode Implementation Guide

## ✅ Completed Fixes

### 1. **Removed Duplicate Headings**
- **Issue**: Page routes had headings AND page components had duplicate headings
- **Fix**: Removed heading wrapper from route pages, kept only in component pages
- **Example**: `app/(dashboard)/dashboard/page.tsx` now renders components directly

### 2. **Fixed Header & Navigation**
- Centered role selector in header
- Replaced hardcoded colors with semantic tokens
- Added proper backdrop blur and transparency

### 3. **Chart Theming System**
- Created `lib/chart-theme.ts` with reusable utilities
- Theme-aware colors that adapt to dark/light mode
- Consistent tooltip, legend, and axis styling

### 4. **Admin Dashboard**
- Full dark mode support with proper chart colors
- Semantic color tokens throughout
- Theme-aware KPI cards

## 🎨 Color Token Reference

### Background & Foreground
```tsx
// ✅ CORRECT
bg-background     // Main background
bg-card          // Card backgrounds  
bg-muted         // Subtle backgrounds
text-foreground   // Primary text
text-muted-foreground  // Secondary text

// ❌ WRONG
bg-white dark:bg-slate-900
text-slate-900 dark:text-white
text-slate-600 dark:text-slate-400
```

### Interactive Elements
```tsx
// ✅ CORRECT
bg-primary text-primary-foreground  // Primary buttons
bg-secondary text-secondary-foreground  // Secondary buttons
border-border  // Borders
hover:bg-accent hover:text-accent-foreground  // Hover states

// ❌ WRONG
bg-blue-600 hover:bg-blue-700
border-gray-200 dark:border-gray-700
```

### Status Colors
```tsx
// ✅ CORRECT
text-destructive bg-destructive/10  // Errors/Danger
text-success bg-success/10  // Success states
text-warning bg-warning/10  // Warnings

// ❌ WRONG
text-red-600 bg-red-50
text-green-600 bg-green-50
```

### Chart Colors
```tsx
// ✅ CORRECT - Use chart-theme utility
import { getChartColors, getTooltipStyle } from '@/lib/chart-theme'
import { useTheme } from 'next-themes'

const { theme } = useTheme()
const isDark = theme === 'dark'
const colors = getChartColors(isDark)

<Line stroke={colors.primary} />
<Bar fill={colors.chart2} />
<Tooltip contentStyle={getTooltipStyle(isDark)} />
```

## 📋 Migration Checklist for Each Page

### Step 1: Remove Duplicate Headings
```tsx
// Before: app/(dashboard)/example/page.tsx
export default function ExamplePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Title</h1>
        <p className="text-slate-600">Description</p>
      </div>
      <ExamplePageComponent />
    </div>
  )
}

// After: app/(dashboard)/example/page.tsx
export default function ExamplePage() {
  return <ExamplePageComponent />
}
```

### Step 2: Replace Hardcoded Colors
```tsx
// Before
<h1 className="text-slate-900 dark:text-white">Title</h1>
<p className="text-slate-600 dark:text-slate-400">Text</p>
<Card className="bg-white border-gray-200">

// After
<h1 className="text-foreground">Title</h1>
<p className="text-muted-foreground">Text</p>
<Card className="bg-card border-border">
```

### Step 3: Fix Chart Colors
```tsx
// Before
<CartesianGrid strokeDasharray="3 3" />
<XAxis />
<Line stroke="#6366f1" />

// After
import { useTheme } from 'next-themes'
import { getChartColors, getTooltipStyle } from '@/lib/chart-theme'

const { theme } = useTheme()
const isDark = theme === 'dark'
const colors = getChartColors(isDark)

<CartesianGrid 
  strokeDasharray="3 3" 
  stroke={colors.border} 
  opacity={0.5} 
/>
<XAxis 
  stroke={colors.text}
  style={{ fontSize: '12px' }}
/>
<Line 
  stroke={colors.primary}
  strokeWidth={3}
  dot={{ fill: colors.primary, r: 5 }}
/>
<Tooltip contentStyle={getTooltipStyle(isDark)} />
```

### Step 4: Update Background Gradients
```tsx
// Before
<div className="bg-gradient-to-br from-blue-50 to-purple-50">

// After - Use semantic colors or remove gradients
<div className="bg-background">
// OR if gradient needed:
<div className="bg-gradient-to-br from-background to-muted">
```

## 🚀 Quick Fix Template

For any page component:

```tsx
"use client"

import { useTheme } from "next-themes"
import { getChartColors, getTooltipStyle } from "@/lib/chart-theme"
import { Card } from "@/components/ui/card"
// ... other imports

export function YourPageComponent() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const colors = getChartColors(isDark)

  return (
    <div className="space-y-8">
      {/* Header - Single heading, no duplicates */}
      <div>
        <h1 className="text-4xl font-bold text-foreground">Page Title</h1>
        <p className="mt-2 text-sm text-muted-foreground">Description</p>
      </div>

      {/* Content Cards */}
      <Card className="border-border bg-card p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Section</h2>
        <p className="text-muted-foreground">Content</p>
      </Card>

      {/* Charts */}
      <Card className="border-border bg-card p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={colors.border} 
              opacity={0.5} 
            />
            <XAxis 
              stroke={colors.text}
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke={colors.text}
              style={{ fontSize: '12px' }}
            />
            <Tooltip contentStyle={getTooltipStyle(isDark)} />
            <Line 
              stroke={colors.primary}
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
```

## 📝 Pages Needing Updates

All route pages in `app/(dashboard)/*/page.tsx` should:
1. Remove duplicate heading wrapper
2. Render component directly

All page components in `components/pages/*` should:
1. Use semantic color tokens (text-foreground, bg-card, etc.)
2. Use chart-theme utility for charts
3. Include proper dark mode color handling

### Priority Order:
1. ✅ dashboard/page.tsx - DONE
2. ✅ components/pages/admin-dashboard-page.tsx - DONE
3. 🔄 All other dashboard pages
4. 🔄 All other page components with charts
5. 🔄 All other page components

## 🎯 Testing Checklist

- [ ] Toggle between light/dark mode
- [ ] Check all text is readable in both modes
- [ ] Verify charts update colors when theme changes
- [ ] Check card backgrounds contrast properly
- [ ] Verify borders are visible but subtle
- [ ] Test hover states on interactive elements
- [ ] Check that no hardcoded colors remain

## 🆘 Common Issues

**Charts not updating on theme change?**
- Make sure component re-renders when theme changes
- Use `useTheme()` hook from next-themes
- Pass `isDark` to chart color functions

**Colors look washed out in dark mode?**
- Check opacity values
- Ensure using proper semantic tokens
- Verify CSS variables in app/globals.css

**Text not readable?**
- Use `text-foreground` for primary text
- Use `text-muted-foreground` for secondary text
- Never use absolute colors like `text-gray-500`
