"use client";

import React, { useEffect, useState } from "react";

interface ReaderCounterProps {
  initialCount?: number;
}

export default function ReaderCounter({
  initialCount = 420,
}: ReaderCounterProps) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    // Record view hit once on mount
    fetch("/api/analytics/view", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data?.todayViewsCount) {
          setCount(data.todayViewsCount);
        }
      })
      .catch(() => {
        // Fallback to initial count
      });
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 text-xs font-medium">
      <span className="animate-pulse">👁️</span>
      <span>
        오늘 <strong>{count.toLocaleString()}명</strong>의 독자가 이 리포트를
        조회했습니다
      </span>
    </div>
  );
}
