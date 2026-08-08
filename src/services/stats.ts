import { PipelineMetrics } from "@/types/stats";
import { getCachedSignalList } from "@/services/github";

const DEFAULT_CRAWLED_ARTICLES = 0;
const REPO = "as-proiectio/data";

export async function fetchPipelineMetrics(): Promise<PipelineMetrics> {
  const pat = process.env.GITHUB_PAT;

  // Try fetching signals_meta.json first if available
  if (pat) {
    try {
      const metaRes = await fetch(
        `https://api.github.com/repos/${REPO}/contents/signals_meta.json`,
        {
          headers: {
            Authorization: `token ${pat}`,
            Accept: "application/vnd.github.v3.raw",
          },
          next: { tags: ["signal"], revalidate: 60 },
        },
      );

      if (metaRes.ok) {
        const metaData = await metaRes.json();
        return {
          totalCrawledArticles: metaData.totalCrawledArticles || 0,
          todayCrawledArticles: metaData.todayCrawledArticles || 0,
          totalAnalyzedSignals: metaData.totalAnalyzedSignals || 0,
          todayAnalyzedSignals: metaData.todayAnalyzedSignals || 0,
          totalPublishedReports: metaData.totalPublishedReports || 0,
          todayPublishedReports: metaData.todayPublishedReports || 0,
          alphaReportsCount: metaData.alphaReportsCount || 0,
          premarketReportsCount: metaData.premarketReportsCount || 0,
          todayReadersCount: 0,
          activeBackersCount: 0,
          updatedAt: metaData.lastUpdated || new Date().toISOString(),
        };
      }
    } catch {
      // Fallback to dynamic list calculation
    }
  }

  let alphaReportsCount = 0;
  let premarketReportsCount = 0;
  let totalPublishedReports = 0;
  let totalAnalyzedSignals = 0;
  let todayAnalyzedSignals = 0;
  let todayPublishedReports = 0;

  try {
    const list = await getCachedSignalList();
    // Filter canonical language entries (ko) to prevent KO/EN translation duplicate counts
    const canonicalSignals = list.filter((s) => s.lang === "ko" || !s.lang);

    const alphaSignals = canonicalSignals.filter(
      (s) => s.category === "alpha_signal" || !s.category,
    );
    const premarketSignals = canonicalSignals.filter(
      (s) => s.category === "alpha_signal_premarket",
    );

    alphaReportsCount = alphaSignals.length;
    premarketReportsCount = premarketSignals.length;
    totalPublishedReports = alphaReportsCount + premarketReportsCount;

    // Dynamically calculate cumulative extracted signals from canonical KO report urlCounts
    totalAnalyzedSignals = canonicalSignals.reduce(
      (acc, s: any) => acc + (s.urlCount || s.httpsCount || s.signalCount || 0),
      0,
    );

    // Grab latest published report from EACH category (Regular Alpha Signal + Premarket)
    const latestAlpha = alphaSignals[0];
    const latestPremarket = premarketSignals[0];
    const todayReports = [latestAlpha, latestPremarket].filter(Boolean);

    todayPublishedReports = todayReports.length; // 1 Alpha + 1 Premarket = 2
    todayAnalyzedSignals = todayReports.reduce(
      (acc, s: any) => acc + (s.urlCount || s.httpsCount || s.signalCount || 0),
      0,
    );
  } catch (err) {
    console.warn("Failed to fetch signal list for metrics calculation:", err);
  }

  return {
    totalCrawledArticles: DEFAULT_CRAWLED_ARTICLES,
    todayCrawledArticles: 0,
    totalAnalyzedSignals,
    todayAnalyzedSignals,
    totalPublishedReports,
    todayPublishedReports,
    alphaReportsCount,
    premarketReportsCount,
    todayReadersCount: 0,
    activeBackersCount: 0,
    updatedAt: new Date().toISOString(),
  };
}
