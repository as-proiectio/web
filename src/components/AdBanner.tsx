import React from "react";
import Image from "next/image";

export type AdProvider = "tradingview" | "seekingalpha" | "adsense" | "custom";
export type AdSlot = "top_leaderboard" | "content_inline" | "sidebar";

interface AdBannerProps {
  provider?: AdProvider;
  slot?: AdSlot;
  className?: string;
}

const TRADINGVIEW_AFFILIATE_URL =
  "https://kr.tradingview.com/alphasignals?aff_id=169847";

export default function AdBanner({
  provider = "tradingview",
  slot = "top_leaderboard",
  className = "",
}: AdBannerProps) {
  if (provider === "tradingview") {
    return (
      <aside
        aria-label="Sponsored Advertisement"
        className={`w-full my-6 flex flex-col items-center justify-center ${className}`}
      >
        <div className="w-full max-w-4xl flex flex-col items-center">
          <div className="w-full flex justify-end mb-1 pr-1">
            <span className="text-[10px] tracking-wider text-neutral-600 dark:text-neutral-500 uppercase font-medium">
              Sponsored
            </span>
          </div>

          <a
            href={TRADINGVIEW_AFFILIATE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group block w-full overflow-hidden rounded-xl transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            title="TradingView - 전 세계 6천만 트레이더가 사용하는 실시간 차트"
          >
            {/* Desktop / Tablet Leaderboard (1456x180 aspect ratio) */}
            <div className="hidden sm:block w-full">
              {/* Light Mode */}
              <Image
                src="/banners/tradingview/leaderboard-light.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={1456}
                height={180}
                className="w-full h-auto rounded-xl border border-neutral-200 dark:hidden shadow-xs"
                priority={slot === "top_leaderboard"}
              />
              {/* Dark Mode */}
              <Image
                src="/banners/tradingview/leaderboard-dark.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={1456}
                height={180}
                className="w-full h-auto rounded-xl border border-neutral-800 hidden dark:block shadow-xs"
                priority={slot === "top_leaderboard"}
              />
            </div>

            {/* Mobile Rectangle (300x250 aspect ratio) */}
            <div className="block sm:hidden w-full flex justify-center">
              {/* Light Mode */}
              <Image
                src="/banners/tradingview/rectangle-light.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={300}
                height={250}
                className="w-full max-w-[320px] h-auto rounded-xl border border-neutral-200 dark:hidden shadow-xs"
                priority={slot === "top_leaderboard"}
              />
              {/* Dark Mode */}
              <Image
                src="/banners/tradingview/rectangle-dark.jpg"
                alt="TradingView 실시간 금융 차트 플랫폼"
                width={300}
                height={250}
                className="w-full max-w-[320px] h-auto rounded-xl border border-neutral-800 hidden dark:block shadow-xs"
                priority={slot === "top_leaderboard"}
              />
            </div>
          </a>
        </div>
      </aside>
    );
  }

  // Placeholder fallback for future custom sponsors / Seeking Alpha / AdSense
  return null;
}
