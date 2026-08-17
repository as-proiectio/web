import React from "react";
import Image from "next/image";

export type AdProvider = "tradingview" | "seekingalpha" | "adsense" | "custom";
export type AdSlot = "top_leaderboard" | "content_inline" | "sidebar" | "bottom";

interface AdBannerProps {
  provider?: AdProvider;
  slot?: AdSlot;
  className?: string;
}

const TRADINGVIEW_AFFILIATE_URL =
  "https://kr.tradingview.com/alphasignals?aff_id=169847";

export default function AdBanner({
  provider = "tradingview",
  slot = "sidebar",
  className = "",
}: AdBannerProps) {
  if (provider === "tradingview") {
    if (slot === "sidebar" || slot === "bottom") {
      return (
        <aside
          aria-label="TradingView Partner Banner"
          className={`w-full flex flex-col gap-1.5 ${className}`}
        >
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-medium tracking-wider text-slate-400 dark:text-slate-500 uppercase">
              Partner
            </span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500">
              TradingView
            </span>
          </div>

          <a
            href={TRADINGVIEW_AFFILIATE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group block w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            title="TradingView - 실시간 금융 차트 플랫폼"
          >
            {/* Light Mode */}
            <Image
              src="/banners/tradingview/rectangle-light.jpg"
              alt="TradingView 실시간 금융 차트 플랫폼"
              width={300}
              height={250}
              className="w-full h-auto dark:hidden transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {/* Dark Mode */}
            <Image
              src="/banners/tradingview/rectangle-dark.jpg"
              alt="TradingView 실시간 금융 차트 플랫폼"
              width={300}
              height={250}
              className="w-full h-auto hidden dark:block transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>
        </aside>
      );
    }

    // Default Leaderboard slot (if explicitly requested)
    return (
      <aside
        aria-label="Sponsored Advertisement"
        className={`w-full my-4 flex flex-col items-center justify-center ${className}`}
      >
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="w-full flex justify-end mb-1 pr-1">
            <span className="text-[9px] tracking-wider text-slate-400 dark:text-slate-500 uppercase font-medium">
              Sponsored
            </span>
          </div>

          <a
            href={TRADINGVIEW_AFFILIATE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group block w-full overflow-hidden rounded-xl transition-all duration-200 hover:scale-[1.005] focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            title="TradingView - 전 세계 6천만 트레이더가 사용하는 실시간 차트"
          >
            <div className="hidden sm:block w-full">
              <Image
                src="/banners/tradingview/leaderboard-light.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={1456}
                height={180}
                className="w-full h-auto rounded-xl border border-slate-200/80 dark:border-slate-800/80 dark:hidden shadow-xs"
              />
              <Image
                src="/banners/tradingview/leaderboard-dark.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={1456}
                height={180}
                className="w-full h-auto rounded-xl border border-slate-200/80 dark:border-slate-800/80 hidden dark:block shadow-xs"
              />
            </div>

            <div className="block sm:hidden w-full flex justify-center">
              <Image
                src="/banners/tradingview/rectangle-light.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={300}
                height={250}
                className="w-full max-w-[320px] h-auto rounded-xl border border-slate-200/80 dark:border-slate-800/80 dark:hidden shadow-xs"
              />
              <Image
                src="/banners/tradingview/rectangle-dark.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={300}
                height={250}
                className="w-full max-w-[320px] h-auto rounded-xl border border-slate-200/80 dark:border-slate-800/80 hidden dark:block shadow-xs"
              />
            </div>
          </a>
        </div>
      </aside>
    );
  }

  return null;
}
