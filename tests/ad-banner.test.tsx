import React from "react";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import AdBanner from "../src/components/AdBanner";

describe("AdBanner component", () => {
  it("renders TradingView native partner card with correct affiliate link and SVGs", () => {
    const html = renderToStaticMarkup(
      <AdBanner provider="tradingview" variant="native" />,
    );

    expect(html).toContain("https://www.tradingview.com/chart/?aff_id=169847");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="sponsored noopener noreferrer"');
    expect(html).toContain("full-logo-black.svg");
    expect(html).toContain("full-logo-white.svg");
    expect(html).toContain("Partner");
  });

  it("renders compact image banner when variant is image", () => {
    const html = renderToStaticMarkup(
      <AdBanner provider="tradingview" variant="image" />,
    );

    expect(html).toContain("rectangle-light.jpg");
    expect(html).toContain("rectangle-dark.jpg");
  });
});
