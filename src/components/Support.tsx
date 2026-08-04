"use client";

import React, { useState } from "react";

interface SupportProps {
  fairyLink?: string;
  bmcLink?: string;
}

const BANK_ACCOUNT = {
  bank: "카카오뱅크",
  account: "3333-XX-XXXXXXX",
  holder: "권태훈 (Alpha Signals)",
};

export default function Support({
  fairyLink = "https://fairy.hada.io/@alphasignals#support",
  bmcLink = "https://buymeacoffee.com",
}: SupportProps) {
  const [accountCopied, setAccountCopied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"kakao" | "bmc" | "fairy">("kakao");

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(`${BANK_ACCOUNT.bank} ${BANK_ACCOUNT.account}`);
      setAccountCopied(true);
      setTimeout(() => setAccountCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy account:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-10 text-left">
      {/* Intro Header */}
      <section className="flex flex-col gap-3">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
          <span>🌱</span> 독립 리포트 인프라 후원
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight">
          Alpha Signals 후원 안내
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          알파 시그널은 투자자들이 데이터 왜곡 없이 객관적인 AI 분석 모델이 추출한 핵심 지표를 원본 그대로 볼 수 있도록 돕습니다. 소중한 후원금은 데이터 서버 유지 및 자동화 분석 엔진 고도화에 전액 사용됩니다.
        </p>
      </section>

      {/* Multi-Payment Options */}
      <section className="flex flex-col gap-6">
        {/* Method Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setSelectedMethod("kakao")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedMethod === "kakao"
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <span>🟡</span> 계좌 송금 (카카오/토스)
          </button>
          <button
            onClick={() => setSelectedMethod("bmc")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedMethod === "bmc"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <span>☕️</span> Buy Me a Coffee (해외/카드)
          </button>
          <button
            onClick={() => setSelectedMethod("fairy")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              selectedMethod === "fairy"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <span>🧚</span> Fairy (hada.io)
          </button>
        </div>

        {/* Selected Method Details */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
          {selectedMethod === "kakao" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  국내 독자를 위한 1초 간편 송금
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  카카오뱅크 / 토스 계좌 입금
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  카카오페이 또는 토스 앱에서 계좌 수수료 없이 간편하게 후원하실 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {BANK_ACCOUNT.bank} <span className="font-mono text-indigo-600 dark:text-indigo-400 ml-1">{BANK_ACCOUNT.account}</span>
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    예금주: {BANK_ACCOUNT.holder}
                  </span>
                </div>
                <button
                  onClick={handleCopyAccount}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
                >
                  {accountCopied ? "계좌번호 복사 완료!" : "계좌번호 복사"}
                </button>
              </div>
            </div>
          )}

          {selectedMethod === "bmc" && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  해외 신용카드 및 글로벌 후원
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Buy Me a Coffee
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Visa, Mastercard 등 글로벌 카드로 1회성 커피 후원이나 정기 후원을 진행하실 수 있습니다.
                </p>
              </div>
              <a
                href={bmcLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm"
              >
                ☕️ Buy Me a Coffee 가기
              </a>
            </div>
          )}

          {selectedMethod === "fairy" && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  IT & 커뮤니티 전용 후원
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Fairy (hada.io)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  하다(hada.io) 커뮤니티 기반의 알파시그널 전용 후원 페이지입니다.
                </p>
              </div>
              <a
                href={fairyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                🧚 Fairy에서 후원하기
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Trust & Principles */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 bg-white dark:bg-slate-900">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span>🌱</span> 데이터 보존 및 서버 유지
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            전해주신 후원금은 AI 파이프라인 가동 및 데이터 아카이브 인프라 비용으로 투명하게 전액 사용됩니다.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col gap-1.5 bg-white dark:bg-slate-900">
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <span>🎁</span> 완전 개방 아카이브 유지
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            모든 분석 리포트는 유료 페이월 없이 누구나 무료로 열람하실 수 있도록 완전 개방 체제를 유지합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
