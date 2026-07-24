"use client";

import React, { useEffect, useState } from "react";
import { formatSignalDate } from "@/utils/format-date";
import { shouldShowFallbackWarning } from "@/utils/fallback-warning";

interface FallbackNoticeProps {
  isRollback?: boolean;
  currentSignalDate?: string;
  activeTab: "alpha" | "premarket";
  hasTodayReport: boolean;
}

export default function FallbackNotice({
  isRollback = false,
  currentSignalDate,
  activeTab,
  hasTodayReport,
}: FallbackNoticeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldShow =
    isRollback || shouldShowFallbackWarning(activeTab, hasTodayReport);

  if (!mounted || !shouldShow || !currentSignalDate) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 text-xs py-3 px-4 rounded-lg border border-blue-200/50 dark:border-blue-900/50 flex items-center gap-2">
      <span>💡</span>
      <span>
        오늘 자 리포트가 아직 준비되지 않아, 가장 최신 리포트(
        {formatSignalDate(currentSignalDate)})를 표시합니다.
      </span>
    </div>
  );
}
