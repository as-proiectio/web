import { isUsMarketHoliday } from "@/utils/us-market-holidays";

/**
 * Determines whether to display the fallback warning banner
 * based on US market operating hours (America/New_York).
 *
 * @param activeTab - Active tab: "alpha" or "premarket"
 * @param hasTodayReport - True if today's report already exists
 * @param now - Current Date instance (defaults to system time)
 * @returns boolean - True if fallback warning should be shown
 */
export function shouldShowFallbackWarning(
  activeTab: "alpha" | "premarket",
  hasTodayReport: boolean,
  now = new Date(),
): boolean {
  if (hasTodayReport) return false;

  // Check weekday in America/New_York time zone
  const nyDayName = now.toLocaleDateString("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
  });

  const isWeekend = nyDayName === "Saturday" || nyDayName === "Sunday";
  if (isWeekend) return false;

  if (isUsMarketHoliday(now)) return false;

  // Extract current time in America/New_York time zone (24-hour format)
  const nyTimeStr = now.toLocaleTimeString("en-US", {
    timeZone: "America/New_York",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  const [currentHour, currentMinute] = nyTimeStr.split(":").map(Number);
  const currentTimeVal = currentHour * 60 + currentMinute;

  if (activeTab === "alpha") {
    // 3 hours before regular market open (09:30 AM ET): 06:30 AM ET (390 minutes)
    const threshold = 6 * 60 + 30;
    return currentTimeVal >= threshold;
  } else {
    // 30 minutes before regular market open (09:30 AM ET): 09:00 AM ET (540 minutes)
    const threshold = 9 * 60;
    return currentTimeVal >= threshold;
  }
}
