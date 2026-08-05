"use client";

import React, { useState } from "react";

const TOSS_BANK_ACCOUNT = {
  bank: "토스뱅크",
  account: "1000-0018-4210",
  holder: "권태훈",
};

export default function Support() {
  const [accountCopied, setAccountCopied] = useState(false);

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(
        `${TOSS_BANK_ACCOUNT.bank} ${TOSS_BANK_ACCOUNT.account}`,
      );
      setAccountCopied(true);
      setTimeout(() => setAccountCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy account:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-8 text-left">
      {/* Intro Section */}
      <section className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold">
          <span>🌱</span> 독립 데이터 인프라 후원
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Alpha Signals 후원 안내
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          알파 시그널은 불필요한 광고나 정보 왜곡 없이, 객관적인 AI 분석 모델이
          추출한 핵심 지표를 투자자에게 투명하게 제공합니다. 소중한 후원금은
          자동화 데이터 수집 서버 유지 및 분석 엔진 고도화에 전액 사용됩니다.
        </p>
      </section>

      {/* Single Direct Toss Bank Account Card */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-6 shadow-xs">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            DIRECT SPONSORSHIP
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            토스뱅크 직접 계좌 후원
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            토스, 카카오페이 또는 시중 은행 앱에서 수수료 없이 간편하게
            입금하실 수 있습니다.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {TOSS_BANK_ACCOUNT.bank}
              </span>
              <span className="text-base font-extrabold font-mono text-blue-600 dark:text-blue-400 tracking-wide">
                {TOSS_BANK_ACCOUNT.account}
              </span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              예금주: {TOSS_BANK_ACCOUNT.holder}
            </span>
          </div>

          <button
            onClick={handleCopyAccount}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
          >
            {accountCopied ? "계좌번호 복사 완료!" : "계좌번호 복사"}
          </button>
        </div>
      </section>

      {/* Trust & Principles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 bg-white dark:bg-slate-900/60">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span>🌱</span> 데이터 서버 및 인프라 유지
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            후원금은 24시간 가동되는 AI 파이프라인과 글로벌 서버 유지비로 투명하게 전액 사용됩니다.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 bg-white dark:bg-slate-900/60">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span>🎁</span> 완전 개방 아카이브
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            모든 분석 리포트는 유료 페이월 없이 누구나 자유롭게 열람하실 수 있도록 개방 체제를 유지합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
