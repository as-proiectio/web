"use client";

import React, { useState } from "react";

interface SupportProps {
  fairyLink?: string;
  contactEmail?: string;
}

const PARTNER_BENEFITS = [
  {
    icon: "🌐",
    title: "공식 파트너 노출",
    description:
      "웹사이트 파트너 섹션에 채널 로고와 바로가기 링크를 공식 등록해 드립니다.",
  },
  {
    icon: "📊",
    title: "리포트 인용 허용",
    description:
      "출처 표기 시 알파 시그널의 데이터와 분석 리포트를 채널에 자유롭게 인용 가능합니다.",
  },
  {
    icon: "🛠️",
    title: "업데이트 소식 공유",
    description:
      "신규 지표 추가 및 분석 알고리즘 고도화 작업 소식을 파트너에 먼저 공유합니다.",
  },
];

export default function Support({
  fairyLink = "https://fairy.hada.io/@alphasignals#support",
  contactEmail = "info@alphasignals.cloud",
}: SupportProps) {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-12 text-left">
      {/* Partnership Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            <span>🤝</span> 파트너십 & 채널 제휴
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            알파 시그널과 함께할 정보 채널을 찾습니다
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            텔레그램 채널, 블로그, 투자 커뮤니티 운영자님을 위한{" "}
            <strong>100% 무료 정보 공유 제휴</strong> 프로그램입니다.
            구독자분들께 시장 인사이트를 전달하고 함께 성장할 신생 파트너를
            환영합니다.
          </p>
        </div>

        {/* Partner Benefits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PARTNER_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5"
            >
              <div className="text-xl">{benefit.icon}</div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {benefit.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Partner Recruitment Banner */}
        <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border-2 border-dashed border-indigo-500/30 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              ✨ 1호 파트너 채널 모집 중
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              첫 번째 파트너 채널이 되어보세요!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              금전적 대가 없는 상호 정보 협업입니다. 부담 없이 제휴 문의를
              남겨주세요.
            </p>
          </div>

          <button
            onClick={handleCopyEmail}
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow cursor-pointer"
          >
            ✉️ {emailCopied ? "이메일 복사 완료!" : "제휴 문의하기 (이메일)"}
          </button>
        </div>
      </section>

      <hr className="w-full border-slate-200 dark:border-slate-800/80 my-2" />

      {/* Support Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <span>🌱</span> 지속가능한 개발 후원
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            투명한 데이터 서버 유지를 위한 후원
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            알파시그널은 투자자들이 불필요한 광고나 정보 왜곡 없이, 객관적인
            데이터와 AI 분석 모델이 추출한 핵심 시장 지표를 투명하게 볼 수
            있도록 돕습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Fairy 플랫폼을 통한 자유 후원
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              모든 소중한 후원금은 데이터 서버 유지 및 분석 시스템 고도화에 전액
              사용됩니다.
            </p>
          </div>

          <a
            href={fairyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm hover:shadow cursor-pointer"
          >
            🧚 Fairy에서 후원하기
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-1.5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>🌱</span> 왜 후원이 필요한가요?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              광고 수익에 의존하지 않고 객관적이고 청정한 시그널 분석 체계를
              다지기 위한 인프라 비용에 사용됩니다.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/80 flex flex-col gap-1.5">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>🎁</span> 어떤 혜택이 있나요?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              유료 장벽(페이월) 없이 모든 정보를 완전 개방 체제로 유지하며,
              지속적인 보고서 개선으로 보답합니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
