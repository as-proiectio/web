import React from "react";
import Image from "next/image";

export type AdProvider = "tradingview" | "seekingalpha" | "adsense" | "custom";
export type AdSlot = "top_leaderboard" | "content_inline" | "sidebar" | "bottom";

interface AdBannerProps {
  provider?: AdProvider;
  slot?: AdSlot;
  variant?: "native" | "image";
  className?: string;
}

const TRADINGVIEW_AFFILIATE_URL =
  "https://www.tradingview.com/chart/?aff_id=169847&utm_source=creative&utm_lang=KR";

export default function AdBanner({
  provider = "tradingview",
  slot = "sidebar",
  variant = "native",
  className = "",
}: AdBannerProps) {
  if (provider === "tradingview") {
    if (variant === "native") {
      return (
        <aside
          aria-label="TradingView Partner Card"
          className={`w-full ${className}`}
        >
          <a
            href={TRADINGVIEW_AFFILIATE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group block p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 hover:bg-slate-100/70 dark:bg-slate-900/60 dark:hover:bg-slate-800/60 transition-all duration-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            title="TradingView - 실시간 금융 차트 및 기술적 분석 플랫폼"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              {/* TradingView Official Vector Logo */}
              <div className="relative h-4 w-24">
                <Image
                  src="/logos/tradingview/full-logo-black.svg"
                  alt="TradingView"
                  fill
                  className="object-contain object-left dark:hidden"
                  unoptimized
                />
                <Image
                  src="/logos/tradingview/full-logo-white.svg"
                  alt="TradingView"
                  fill
                  className="object-contain object-left hidden dark:block"
                  unoptimized
                />
              </div>
              <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800">
                Partner
              </span>
            </div>

            <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-2.5">
              전 세계 6,000만 트레이더가 사용하는 실시간 차트 & 종목 스크리너
            </p>

            <div className="flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
              <span>실시간 차트 열기</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </div>
          </a>
        </aside>
      );
    }

    // Compact image fallback
    return (
      <aside
        aria-label="TradingView Banner"
        className={`w-full flex justify-center ${className}`}
      >
        <a
          href={TRADINGVIEW_AFFILIATE_URL}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="group block overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/80 transition-all hover:scale-[1.01] shadow-xs"
        >
          <Image
            src="/banners/tradingview/rectangle-light.jpg"
            alt="TradingView"
            width={250}
            height={250}
            className="w-auto h-auto max-w-[250px] dark:hidden"
          />
          <Image
            src="/banners/tradingview/rectangle-dark.jpg"
            alt="TradingView"
            width={250}
            height={250}
            className="w-auto h-auto max-w-[250px] hidden dark:block"
          />
        </a>
      </aside>
    );
  }

  return null;
}
