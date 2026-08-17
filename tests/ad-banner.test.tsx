import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import AdBanner from "../src/components/AdBanner";

describe("AdBanner component", () => {
  it("renders TradingView native banner with correct affiliate link and rel for sidebar slot", () => {
    const html = renderToStaticMarkup(
      <AdBanner provider="tradingview" slot="sidebar" />,
    );

    expect(html).toContain(
      'href="https://kr.tradingview.com/alphasignals?aff_id=169847"',
    );
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).toContain("rectangle-light.jpg");
    expect(html).toContain("rectangle-dark.jpg");
  });

  it("renders both dark and light mode banner images for leaderboard slot", () => {
    const html = renderToStaticMarkup(
      <AdBanner provider="tradingview" slot="top_leaderboard" />,
    );

    expect(html).toContain("leaderboard-light.jpg");
    expect(html).toContain("leaderboard-dark.jpg");
  });
});
