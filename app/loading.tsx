export default function Loading() {
  return (
    <div className="max-w-300 mx-auto px-6 py-8 animate-pulse">
      <div className="flex flex-col gap-6">
        <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-lg w-full max-w-xs mb-4"></div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-2"></div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-xl p-6 sm:p-8 space-y-4 min-h-75">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
          </div>
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
