import React from "react";
import Support from "@/components/Support";

export const metadata = {
  title: "후원 안내",
  description:
    "Alpha Signals의 후원 안내입니다. 객관적이고 청정한 AI 투자 시그널 분석 데이터 인프라 유지를 지원합니다.",
};

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Support />
    </div>
  );
}
