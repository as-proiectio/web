import React from "react";
import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import PremiumDashboard, { NoticeData, SignalData } from "../src/components/PremiumDashboard";
import Analytics from "../src/components/Analytics";

interface NoticeFrontmatter {
  title?: string;
  date?: string;
}

function getSafeTime(dateStr: string | undefined): number {
  if (!dateStr) return 0;
  const time = new Date(dateStr).getTime();
  return isNaN(time) ? 0 : time;
}

export default async function Home() {
  const dirPath = path.join(process.cwd(), "content/notice");
  let files: string[] = [];
  try {
    files = await fs.readdir(dirPath);
  } catch (err) {
    console.warn("Failed to read notices directory:", err);
  }

  const mdxFiles = files.filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const notices: NoticeData[] = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(dirPath, file);
      const source = await fs.readFile(filePath, "utf-8");
      
      const { frontmatter } = await compileMDX<NoticeFrontmatter>({
        source,
        options: { parseFrontmatter: true }
      });

      return {
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || "",
      };
    })
  );

  // Sort notices by date descending
  notices.sort((a, b) => getSafeTime(b.date) - getSafeTime(a.date));

  // Define premium signals matching data in buddy-proiectio/data repo
  const signals: SignalData[] = [
    {
      lang: "ko",
      type: "alpha",
      date: "2026-07-14",
      title: "Alpha Signal - 2026년 7월 14일 (KO)",
      description: "오늘의 주요 주식 시장 변동성 지표 및 AI 모델 예측 분석 요약본입니다.",
      premiumOnly: true
    },
    {
      lang: "en",
      type: "alpha",
      date: "2026-07-14",
      title: "Alpha Signal - July 14, 2026 (EN)",
      description: "Daily market volatility metrics and predictive AI modeling indicators for international markets.",
      premiumOnly: true
    },
    {
      lang: "ko",
      type: "premarket",
      date: "2026-07-14",
      title: "Premarket Signal - 2026년 7월 14일 (KO)",
      description: "미국 및 국내 개장 직전 변동성과 외풍 요인 분석 시그널 보고서입니다.",
      premiumOnly: true
    },
    {
      lang: "en",
      type: "premarket",
      date: "2026-07-14",
      title: "Premarket Signal - July 14, 2026 (EN)",
      description: "Premarket indicators and international stock prediction summaries before standard trading hours.",
      premiumOnly: true
    },
    {
      lang: "ko",
      type: "alpha",
      date: "2026-07-13",
      title: "Alpha Signal - 2026년 7월 13일 (KO)",
      description: "주요 섹터 순환매 시그널 분석 및 모델 예측 지표입니다.",
      premiumOnly: true
    },
    {
      lang: "en",
      type: "alpha",
      date: "2026-07-13",
      title: "Alpha Signal - July 13, 2026 (EN)",
      description: "AI predictive highlights and sector rotations overview for July 13, 2026.",
      premiumOnly: true
    }
  ];

  return (
    <>
      <Analytics gaId="G-BUDDYPREM" />
      <PremiumDashboard notices={notices} initialSignals={signals} />
    </>
  );
}
