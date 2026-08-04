export interface PipelineMetrics {
  totalCrawledArticles: number;
  totalAnalyzedSignals: number;
  totalPublishedReports: number;
  todayCrawledArticles: number;
  todayAnalyzedSignals: number;
  todayReadersCount: number;
  activeBackersCount: number;
  updatedAt: string;
}

export interface Supporter {
  id: string;
  name: string;
  amountText: string;
  message: string;
  timeAgo: string;
}
