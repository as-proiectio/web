"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-wide mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-slate-900 dark:text-slate-50">
          AlphaSignal
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
