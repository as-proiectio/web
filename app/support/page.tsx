import React from "react";
import Support from "@/components/Support";

export const metadata = {
  title: "제휴/후원",
  description:
    "Alpha Signals의 파트너십 제휴 및 후원 안내입니다. 텔레그램 채널 운영자 제휴 및 무료 투자 분석 지원을 환영합니다.",
};

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
          Alpha Signals 제휴/후원
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
          정보 파트너십으로 함께 성장하고, 투명하고 객관적인 지표 제공을 지지합니다.
        </p>
      </header>

      <Support />
    </div>
  );
}
