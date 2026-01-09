export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>

      {/* Content skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-lg p-6 space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
