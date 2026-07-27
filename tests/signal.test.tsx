import { describe, it, expect, vi, beforeEach } from "vitest";
import SignalDetailPage from "../app/signal/[lang]/[type]/[date]/page";
import { notFound } from "next/navigation";
import { getCompiledSignal } from "../src/services/github";

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("notFound called");
  }),
}));

vi.mock("../src/services/github", () => ({
  getCompiledSignal: vi.fn(),
}));

describe("SignalDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call notFound if lang is invalid", async () => {
    const params = Promise.resolve({
      lang: "fr",
      type: "alpha",
      date: "20260714",
    });

    await expect(SignalDetailPage({ params })).rejects.toThrow(
      "notFound called",
    );
    expect(notFound).toHaveBeenCalled();
  });

  it("should call notFound if type is invalid", async () => {
    const params = Promise.resolve({
      lang: "ko",
      type: "beta",
      date: "20260714",
    });

    await expect(SignalDetailPage({ params })).rejects.toThrow(
      "notFound called",
    );
    expect(notFound).toHaveBeenCalled();
  });

  it("should call notFound if date format is invalid", async () => {
    const params = Promise.resolve({
      lang: "ko",
      type: "alpha",
      date: "2026-07-14",
    });

    await expect(SignalDetailPage({ params })).rejects.toThrow(
      "notFound called",
    );
    expect(notFound).toHaveBeenCalled();
  });

  it("should allow valid params and fetch markdown", async () => {
    vi.mocked(getCompiledSignal).mockResolvedValueOnce({
      content: <p>Content</p>,
      frontmatter: { title: "Test", date: "20260714", category: "alpha_signal", lang: "ko" },
    });
    const params = Promise.resolve({
      lang: "ko",
      type: "alpha",
      date: "20260714",
    });

    const result = await SignalDetailPage({ params });
    expect(result).toBeDefined();
    expect(getCompiledSignal).toHaveBeenCalledWith("ko", "alpha", "20260714");
    expect(notFound).not.toHaveBeenCalled();
  });
});
