"use client";

import React from "react";
import Link from "next/link";
import { PipelineMetrics } from "@/types/stats";

interface LivePulseBarProps {
  metrics: PipelineMetrics;
}

export default function LivePulseBar({ metrics }: LivePulseBarProps) {
  return (
    <div className="w-full bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-2 px-4 flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-mono font-bold text-emerald-400 tracking-tight text-[11px]">
          ENGINE LIVE
        </span>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-300 font-mono shrink-0">
        <span className="whitespace-nowrap">
          📰 오늘 수집:{" "}
          <strong className="text-white font-bold">
            {metrics.todayCrawledArticles.toLocaleString()}
          </strong>
          건
        </span>
        <span className="text-slate-700">|</span>
        <span className="whitespace-nowrap">
          🔍 분석 시그널:{" "}
          <strong className="text-indigo-300 font-bold">
            {metrics.todayAnalyzedSignals.toLocaleString()}
          </strong>
          개
        </span>
        <span className="text-slate-700">|</span>
        <span className="whitespace-nowrap">
          👀 오늘 열람:{" "}
          <strong className="text-emerald-300 font-bold">
            {metrics.todayReadersCount.toLocaleString()}
          </strong>
          명
        </span>
        <span className="hidden md:inline text-slate-700">|</span>
        <span className="hidden md:inline whitespace-nowrap text-amber-300 font-medium">
          ☕️ {metrics.activeBackersCount}명의 독자 응원 중
        </span>
      </div>

      <Link
        href="/support"
        className="shrink-0 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-white transition-colors bg-indigo-950/60 hover:bg-indigo-900/80 px-2.5 py-1 rounded-md border border-indigo-700/50"
      >
        <span>☕️ 후원 안내</span>
        <span className="text-[10px]">→</span>
      </Link>
    </div>
  );
}
