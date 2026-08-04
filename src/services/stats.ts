import { PipelineMetrics, Supporter } from "@/types/stats";

const DEFAULT_METRICS: PipelineMetrics = {
  totalCrawledArticles: 128450,
  totalAnalyzedSignals: 14200,
  totalPublishedReports: 540,
  todayCrawledArticles: 420,
  todayAnalyzedSignals: 48,
  todayReadersCount: 1280,
  activeBackersCount: 18,
  updatedAt: new Date().toISOString(),
};

const DEFAULT_SUPPORTERS: Supporter[] = [
  {
    id: "1",
    name: "K***님",
    amountText: "☕️ 커피 2잔",
    message: "매일 아침 시그널 리포트 잘 읽고 있습니다! 파이팅!",
    timeAgo: "15분 전",
  },
  {
    id: "2",
    name: "M***님",
    amountText: "☕️ 커피 1잔",
    message: "광고 없이 원본 지표 알려줘서 너무 고맙습니다.",
    timeAgo: "1시간 전",
  },
  {
    id: "3",
    name: "알파열성팬님",
    amountText: "☕️ 커피 5잔",
    message: "지속가능한 데이터 인프라 구축을 응원합니다.",
    timeAgo: "3시간 전",
  },
];

export async function fetchPipelineMetrics(): Promise<PipelineMetrics> {
  const pat = process.env.GITHUB_PAT;
  if (!pat) {
    return DEFAULT_METRICS;
  }

  try {
    const res = await fetch(
      "https://api.github.com/repos/as-proiectio/data/contents/stats.json",
      {
        headers: {
          Authorization: `token ${pat}`,
          Accept: "application/vnd.github.v3.raw",
        },
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) {
      return DEFAULT_METRICS;
    }

    const data = await res.json();
    return {
      ...DEFAULT_METRICS,
      ...data,
    };
  } catch (err) {
    console.warn("Using fallback pipeline metrics:", err);
    return DEFAULT_METRICS;
  }
}

export function getSupportersList(): Supporter[] {
  return DEFAULT_SUPPORTERS;
}
