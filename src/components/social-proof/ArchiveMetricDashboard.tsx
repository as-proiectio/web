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
      <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-1 shadow-xs">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          📰 누적 수집 기사
        </span>
        <span className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 dark:text-slate-50">
          {metrics.totalCrawledArticles.toLocaleString()}
          <span className="text-xs font-normal text-slate-500 ml-1">건</span>
        </span>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-1 shadow-xs">
        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          🔍 AI 분석 시그널
        </span>
        <span className="text-xl sm:text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
          {metrics.totalAnalyzedSignals.toLocaleString()}
          <span className="text-xs font-normal text-slate-500 ml-1">개</span>
        </span>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-1 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            📑 발행 리포트
          </span>
          {metrics.alphaReportsCount > 0 && (
            <span className="text-[10px] text-slate-400 font-mono">
              Alpha {metrics.alphaReportsCount} · Premarket {metrics.premarketReportsCount}
            </span>
          )}
        </div>
        <span className="text-xl sm:text-2xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
          {metrics.totalPublishedReports.toLocaleString()}
          <span className="text-xs font-normal text-slate-500 ml-1">건</span>
        </span>
      </div>
    </div>
  );
}
