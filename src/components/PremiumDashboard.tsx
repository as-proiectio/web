'use client';

import React, { useState } from "react";
import Link from "next/link";
import Sponsorship from "./Sponsorship";
import Adsense from "./Adsense";

export interface NoticeData {
  slug: string;
  title: string;
  date: string;
}

export interface SignalData {
  lang: 'ko' | 'en';
  type: 'alpha' | 'premarket';
  date: string;
  title: string;
  description: string;
  premiumOnly: boolean;
}

interface PremiumDashboardProps {
  notices: NoticeData[];
  initialSignals: SignalData[];
}

export default function PremiumDashboard({ notices, initialSignals }: PremiumDashboardProps) {
  const [activeTab, setActiveTab] = useState<'notice' | 'alpha' | 'premarket'>('alpha');
  const [langFilter, setLangFilter] = useState<'all' | 'ko' | 'en'>('all');

  const filteredNotices = notices;
  
  const filteredSignals = initialSignals.filter(signal => {
    if (signal.type !== activeTab) return false;
    if (langFilter !== 'all' && signal.lang !== langFilter) return false;
    return true;
  });

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("ko-KR", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="container">
      {/* Header section with Premium design */}
      <header style={{ textAlign: "center", marginBottom: "3rem", position: "relative" }}>
        <div style={{
          position: "absolute",
          top: "-50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          zIndex: -1
        }} />
        <span className="badge badge-premium" style={{ marginBottom: "1rem" }}>
          PREMIUM MEMBERSHIP
        </span>
        <h1 className="premium-title" style={{ fontSize: "3.25rem", lineHeight: "1.2", marginBottom: "1rem" }}>
          Buddy Premium Content
        </h1>
        <p style={{ color: "hsl(var(--muted))", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}>
          인공지능 분석 모델이 포착한 마켓 알파 시그널과 정밀 분석 데이터를 네이버 프리미엄 콘텐츠 레이아웃으로 실시간 확인하세요.
        </p>
      </header>

      {/* Tabs Switcher */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === 'alpha' ? 'active' : ''}`}
          onClick={() => setActiveTab('alpha')}
        >
          📈 Alpha Signals
        </button>
        <button 
          className={`tab-btn ${activeTab === 'premarket' ? 'active' : ''}`}
          onClick={() => setActiveTab('premarket')}
        >
          🔔 Premarket Signals
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notice' ? 'active' : ''}`}
          onClick={() => setActiveTab('notice')}
        >
          📢 공지사항
        </button>
      </div>

      {/* Categories Filter (Only show for Signals) */}
      {activeTab !== 'notice' && (
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", color: "hsl(var(--muted))", marginRight: "0.5rem" }}>Language:</span>
          <button 
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 500,
              backgroundColor: langFilter === 'all' ? 'hsl(var(--accent) / 0.2)' : 'transparent',
              color: langFilter === 'all' ? 'hsl(var(--foreground))' : 'hsl(var(--muted))',
              border: `1px solid ${langFilter === 'all' ? 'hsl(var(--accent) / 0.4)' : 'hsl(var(--border))'}`,
              transition: "all var(--transition-fast)"
            }}
            onClick={() => setLangFilter('all')}
          >
            All
          </button>
          <button 
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 500,
              backgroundColor: langFilter === 'ko' ? 'hsl(var(--accent) / 0.2)' : 'transparent',
              color: langFilter === 'ko' ? 'hsl(var(--foreground))' : 'hsl(var(--muted))',
              border: `1px solid ${langFilter === 'ko' ? 'hsl(var(--accent) / 0.4)' : 'hsl(var(--border))'}`,
              transition: "all var(--transition-fast)"
            }}
            onClick={() => setLangFilter('ko')}
          >
            한국어 (KO)
          </button>
          <button 
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 500,
              backgroundColor: langFilter === 'en' ? 'hsl(var(--accent) / 0.2)' : 'transparent',
              color: langFilter === 'en' ? 'hsl(var(--foreground))' : 'hsl(var(--muted))',
              border: `1px solid ${langFilter === 'en' ? 'hsl(var(--accent) / 0.4)' : 'hsl(var(--border))'}`,
              transition: "all var(--transition-fast)"
            }}
            onClick={() => setLangFilter('en')}
          >
            English (EN)
          </button>
        </div>
      )}

      {/* Grid Layout for Cards */}
      <div className="grid-layout">
        {activeTab === 'notice' ? (
          filteredNotices.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "hsl(var(--muted))" }}>
              등록된 공지사항이 없습니다.
            </div>
          ) : (
            filteredNotices.map((notice) => (
              <Link href={`/notice/${notice.slug}`} key={notice.slug} className="premium-card">
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span className="badge badge-notice">Notice</span>
                    <span style={{ fontSize: "0.8rem", color: "hsl(var(--muted))" }}>
                      {formatDate(notice.date)}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "hsl(var(--foreground))" }}>
                    {notice.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted))" }}>
                    Buddy 서비스 공지사항 및 업데이트 상세 안내를 확인하세요.
                  </p>
                </div>
                <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "0.85rem", color: "hsl(var(--accent))", fontWeight: 600 }}>
                    자세히 보기 &rarr;
                  </span>
                </div>
              </Link>
            ))
          )
        ) : (
          filteredSignals.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "hsl(var(--muted))" }}>
              선택한 카테고리의 시그널 데이터가 없습니다.
            </div>
          ) : (
            filteredSignals.map((signal, index) => (
              <Link 
                href={`/signal/${signal.lang}/${signal.type}/${signal.date.replace(/-/g, "")}`} 
                key={index} 
                className="premium-card"
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <span className="badge badge-premium">
                      {signal.type.toUpperCase()} ({signal.lang.toUpperCase()})
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "hsl(var(--muted))" }}>
                      {formatDate(signal.date)}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem", color: "hsl(var(--foreground))" }}>
                    {signal.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "hsl(var(--muted))", marginBottom: "1rem" }}>
                    {signal.description}
                  </p>
                </div>
                <div>
                  <div style={{ 
                    borderTop: "1px solid hsl(var(--border))", 
                    paddingTop: "1rem", 
                    marginTop: "1rem", 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center" 
                  }}>
                    {signal.premiumOnly && (
                      <span style={{ fontSize: "0.75rem", color: "hsl(var(--accent))", fontWeight: 600 }}>
                        🔒 Premium Lock
                      </span>
                    )}
                    <span style={{ fontSize: "0.85rem", color: "hsl(var(--accent))", fontWeight: 600 }}>
                      시그널 분석 &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )
        )}
      </div>

      {/* Adsense Integration */}
      <Adsense slot="9876543210" />

      {/* Sponsorship Integration */}
      <Sponsorship />
    </div>
  );
}
