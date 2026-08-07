import React from "react";
import { PipelineMetrics } from "@/types/stats";

interface ArchiveMetricDashboardProps {
  metrics: PipelineMetrics;
}

export default function ArchiveMetricDashboard({
  metrics,
}: ArchiveMetricDashboardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
      {/* Total Crawled Articles */}
      <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-1.5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            📰 누적 수집 기사
          </span>
          <span className="inline-flex items-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            ▲ +{metrics.todayCrawledArticles.toLocaleString()}
          </span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          {metrics.totalCrawledArticles.toLocaleString()}
        </span>
      </div>

      {/* Total Analyzed Signals */}
      <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-1.5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            🔍 AI 분석 시그널
          </span>
          <span className="inline-flex items-center text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
            ▲ +{metrics.todayAnalyzedSignals.toLocaleString()}
          </span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight">
          {metrics.totalAnalyzedSignals.toLocaleString()}
        </span>
      </div>

      {/* Total Published Reports */}
      <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-1.5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            📑 발행 리포트
          </span>
          <span className="inline-flex items-center text-[10px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
            ▲ +{metrics.todayPublishedReports.toLocaleString()}
          </span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
          {metrics.totalPublishedReports.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
