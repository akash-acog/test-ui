export default function EmployeesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-4 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>

      {/* Search and filters */}
      <div className="flex gap-4">
        <div className="h-10 flex-1 bg-slate-200 dark:bg-slate-800 rounded"></div>
        <div className="h-10 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
      </div>

      {/* Table skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="p-4 border-b border-slate-200 dark:border-slate-800 last:border-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="h-3 w-64 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
              <div className="h-8 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
