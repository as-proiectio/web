"use client";

import React, { useState } from "react";
import { getSupportersList } from "@/services/stats";

interface SupportProps {
  fairyLink?: string;
  bmcLink?: string;
  contactEmail?: string;
}

const BANK_ACCOUNT = {
  bank: "카카오뱅크",
  account: "3333-XX-XXXXXXX",
  holder: "권태훈 (Alpha Signals)",
};

export default function Support({
  fairyLink = "https://fairy.hada.io/@alphasignals#support",
  bmcLink = "https://buymeacoffee.com",
  contactEmail = "info@alphasignals.cloud",
}: SupportProps) {
  const [emailCopied, setEmailCopied] = useState(false);
  const [accountCopied, setAccountCopied] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"kakao" | "bmc" | "fairy">("kakao");

  const supporters = getSupportersList();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

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
    <div className="max-w-3xl mx-auto flex flex-col gap-12 text-left">
      {/* Supporter Feed Ticker */}
      <section className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900/90 to-slate-900 text-white shadow-sm flex flex-col gap-3 border border-indigo-800/50">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
            <span>☕️</span> 이번 달 독자 응원 릴레이
          </span>
          <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
            {supporters.length * 6}+ 명의 독자 참여 중
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {supporters.map((sup) => (
            <div
              key={sup.id}
              className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex flex-col gap-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-100">{sup.name}</span>
                <span className="text-[10px] text-amber-400 font-mono">{sup.amountText}</span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                &ldquo;{sup.message}&rdquo;
              </p>
              <span className="text-[9px] text-slate-400 self-end mt-1">{sup.timeAgo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Multi-Payment Sponsorship Section */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <span>🌱</span> 지속가능한 데이터 서버 후원
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            후원 플랫폼 선택 및 지원 안내
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            원하시는 결제 수단 및 플랫폼을 통해 인프라 유지와 분석 알고리즘 고도화를 후원하실 수 있습니다.
          </p>
        </div>

        {/* Payment Selector Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => setSelectedMethod("kakao")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedMethod === "kakao"
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <span>🟡</span> 카카오페이 / 토스 (국내 1초 송금)
          </button>
          <button
            onClick={() => setSelectedMethod("bmc")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedMethod === "bmc"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <span>☕️</span> Buy Me a Coffee (해외/카드)
          </button>
          <button
            onClick={() => setSelectedMethod("fairy")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedMethod === "fairy"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            <span>🧚</span> Fairy (hada.io)
          </button>
        </div>

        {/* Active Payment Detail Panel */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
          {selectedMethod === "kakao" && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                  국내 독자를 위한 1초 간편 송금 (수수료 0원)
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  카카오뱅크 / 토스 계좌 송금
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  별도의 카드 등록 절차 없이 카카오페이 또는 토스 앱에서 입금하실 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
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
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shrink-0 cursor-pointer"
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
                  해외 신용카드 및 글로벌 정산 지원
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Buy Me a Coffee 후원
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visa, Mastercard 등 비인증 글로벌 카드로 자유롭게 1회성 또는 정기 후원을 진행합니다.
                </p>
              </div>
              <a
                href={bmcLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                ☕️ Buy Me a Coffee 가기
              </a>
            </div>
          )}

          {selectedMethod === "fairy" && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  Geek & IT 커뮤니티 친화 후원
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Fairy (hada.io) 전용 후원
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  하다 커뮤니티 기반의 알파시그널 전용 후원 페이지입니다.
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

      <hr className="w-full border-slate-200 dark:border-slate-800/80 my-2" />

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
            텔레그램 채널, 블로그, 투자 커뮤니티 운영자님을 위한 <strong>100% 무료 정보 공유 제휴</strong> 프로그램입니다.
          </p>
        </div>

        <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl border-2 border-dashed border-indigo-500/30 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              ✨ 파트너 채널 상시 모집 중
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              알파 시그널 정보 파트너가 되어보세요!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              금전적 대가 없는 상호 정보 협업입니다. 부담 없이 문의해 주세요.
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
    </div>
  );
}
