export function getChartColors(isDark: boolean) {
  return {
    // Primary chart colors
    primary: isDark ? "hsl(263.4 70% 50.4%)" : "hsl(262.1 83.3% 57.8%)",
    chart1: isDark ? "hsl(263.4 70% 50.4%)" : "hsl(262.1 83.3% 57.8%)",
    chart2: isDark ? "hsl(280 65% 60%)" : "hsl(263.4 70% 50.4%)",
    chart3: isDark ? "hsl(291 47.1% 50.8%)" : "hsl(280 60% 55%)",
    chart4: isDark ? "hsl(300 76.2% 72.2%)" : "hsl(291 47.1% 50.8%)",
    chart5: isDark ? "hsl(340 75.4% 66.7%)" : "hsl(300 76.2% 72.2%)",
    
    // UI colors
    border: isDark ? "hsl(217.2 32.6% 17.5%)" : "hsl(214.3 31.8% 91.4%)",
    text: isDark ? "hsl(215 20.2% 65.1%)" : "hsl(215.4 16.3% 46.9%)",
    foreground: isDark ? "hsl(210 40% 98%)" : "hsl(222.2 84% 4.9%)",
    cardBg: isDark ? "hsl(222.2 84% 4.9%)" : "hsl(0 0% 100%)",
    
    // Status colors
    success: isDark ? "hsl(142.1 70.6% 45.3%)" : "hsl(142.1 76.2% 36.3%)",
    warning: isDark ? "hsl(32.1 95% 60%)" : "hsl(32.1 94.6% 50%)",
    destructive: isDark ? "hsl(0 62.8% 30.6%)" : "hsl(0 84.2% 60.2%)",
  }
}

export function getTooltipStyle(isDark: boolean) {
  const colors = getChartColors(isDark)
  return {
    backgroundColor: colors.cardBg,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    color: colors.foreground,
    padding: '8px 12px',
    boxShadow: isDark 
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  }
}

export function getLegendStyle(isDark: boolean) {
  const colors = getChartColors(isDark)
  return {
    color: colors.text,
    fontSize: '12px',
  }
}

export function getAxisStyle(isDark: boolean) {
  const colors = getChartColors(isDark)
  return {
    fontSize: '12px',
    fill: colors.text,
  }
}
