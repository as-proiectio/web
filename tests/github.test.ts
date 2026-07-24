import { describe, it, expect, vi } from "vitest";
import { fetchSignalMarkdown } from "../src/services/github";

describe("GitHub Service Test", () => {
  it("should fail when token is invalid or file missing", async () => {
    await expect(
      fetchSignalMarkdown("ko", "alpha", "20260714"),
    ).rejects.toThrow();
  });

  it("should fetch markdown file using 8-digit date string (YYYYMMDD)", async () => {
    process.env.GITHUB_PAT = "mock_pat";
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response("# Test Content", { status: 200 }));

    const result = await fetchSignalMarkdown("ko", "alpha", "20260724");
    expect(result).toBe("# Test Content");
    expect(fetchSpy).toHaveBeenCalledWith(
      expect.stringContaining("alpha_signal_20260724_ko.md"),
      expect.anything(),
    );

    fetchSpy.mockRestore();
    delete process.env.GITHUB_PAT;
  });
});
