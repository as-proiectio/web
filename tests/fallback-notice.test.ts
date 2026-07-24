import { describe, it, expect } from "vitest";
import { shouldShowFallbackWarning } from "../src/utils/fallback-warning";

describe("shouldShowFallbackWarning with America/New_York market time", () => {
  it("returns false if today's report already exists", () => {
    const result = shouldShowFallbackWarning("alpha", true);
    expect(result).toBe(false);
  });

  it("returns false on weekends in NY time", () => {
    // 2026-07-25 is Saturday
    const saturdayNy = new Date("2026-07-25T12:00:00-04:00");
    const result = shouldShowFallbackWarning("alpha", false, saturdayNy);
    expect(result).toBe(false);
  });

  it("triggers Alpha warning after 06:30 AM ET on weekdays", () => {
    // Friday 06:31 AM ET
    const fridayMorningAfterThreshold = new Date("2026-07-24T06:31:00-04:00");
    const resultAlpha = shouldShowFallbackWarning(
      "alpha",
      false,
      fridayMorningAfterThreshold,
    );
    expect(resultAlpha).toBe(true);

    // Friday 06:29 AM ET (before threshold)
    const fridayMorningBeforeThreshold = new Date("2026-07-24T06:29:00-04:00");
    const resultBefore = shouldShowFallbackWarning(
      "alpha",
      false,
      fridayMorningBeforeThreshold,
    );
    expect(resultBefore).toBe(false);
  });

  it("triggers Premarket warning after 09:00 AM ET on weekdays", () => {
    // Friday 09:01 AM ET
    const fridayPremarketAfter = new Date("2026-07-24T09:01:00-04:00");
    const resultPremarket = shouldShowFallbackWarning(
      "premarket",
      false,
      fridayPremarketAfter,
    );
    expect(resultPremarket).toBe(true);

    // Friday 08:59 AM ET (before threshold)
    const fridayPremarketBefore = new Date("2026-07-24T08:59:00-04:00");
    const resultBefore = shouldShowFallbackWarning(
      "premarket",
      false,
      fridayPremarketBefore,
    );
    expect(resultBefore).toBe(false);
  });
});
