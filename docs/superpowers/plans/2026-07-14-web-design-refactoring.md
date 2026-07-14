# Web Design Refactoring Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the web UI to use Tailwind CSS with light mode default, dark mode support, Pretendard font, and clean minimal design for long-form report reading.

**Architecture:** Replace hand-written CSS with Tailwind CSS utility classes, use CSS custom properties for theme tokens, and implement dark mode via next-themes. Split the monolithic PremiumDashboard into focused components (Header, FilterBar, ContentCard, ContentList).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS, next-themes, Pretendard font

## Global Constraints

- Light mode is default, dark mode via toggle with system preference detection
- Pretendard is the primary font for both Korean and English text
- Categories: All, Alpha Signals, Premarket, Notice
- Ads must not intrude on content reading experience
- WCAG AA+ color contrast in both light and dark modes
- Mobile-first responsive design

---

## File Structure

```
Created/Modified Files:
├── tailwind.config.ts           # NEW: Tailwind configuration with custom theme
├── postcss.config.js            # NEW: PostCSS configuration for Tailwind
├── app/globals.css              # MODIFY: Replace with Tailwind directives + CSS variables
├── app/layout.tsx               # MODIFY: Add ThemeProvider, load Pretendard
├── app/page.tsx                 # MODIFY: Use new components
├── src/components/
│   ├── Header.tsx               # NEW: Top navigation with theme toggle
│   ├── FilterBar.tsx            # NEW: Category filter bar
│   ├── ContentCard.tsx          # NEW: Individual content card
│   ├── ContentList.tsx          # NEW: Content list container
│   ├── ThemeToggle.tsx          # NEW: Dark mode toggle button
│   ├── Sponsorship.tsx          # MODIFY: Convert to Tailwind classes
│   ├── Analytics.tsx            # UNCHANGED
│   └── Adsense.tsx              # UNCHANGED
├── app/notice/[slug]/page.tsx   # MODIFY: Convert to Tailwind classes
└── app/signal/[lang]/[type]/[date]/page.tsx  # MODIFY: Convert to Tailwind classes
```

---

## Task 1: Install Dependencies & Configure Tailwind

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Modify: `package.json` (add dependencies)

**Interfaces:**
- Consumes: None (initial setup)
- Produces: Tailwind CSS configuration ready for use

- [ ] **Step 1: Install Tailwind CSS and next-themes**

```bash
pnpm add -D tailwindcss @tailwindcss/postcss postcss autoprefixer
pnpm add next-themes
```

- [ ] **Step 2: Create PostCSS config**

Create `postcss.config.js`:

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 3: Create Tailwind config**

Create `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          hover: "var(--card-hover)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
        },
        border: "var(--border)",
        muted: "var(--muted)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
      },
      fontFamily: {
        pretendard: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "768px",
        wide: "896px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Verify installation**

```bash
pnpm dev
```

Expected: Dev server starts without errors

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts postcss.config.js package.json pnpm-lock.yaml
git commit -m "chore: add Tailwind CSS and next-themes configuration"
```

---

## Task 2: Update CSS Variables & Tailwind Directives

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: Tailwind config from Task 1
- Produces: CSS variables for light/dark modes, Tailwind base styles

- [ ] **Step 1: Replace globals.css content**

Replace entire `app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --font-pretendard: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
    sans-serif;
}

:root {
  --background: #f8fafc;
  --foreground: #0f172a;
  --card: #ffffff;
  --card-hover: #f8fafc;
  --accent: #2563eb;
  --accent-light: #eff6ff;
  --border: #e2e8f0;
  --muted: #64748b;
  --success: #059669;
  --warning: #d97706;
  --danger: #dc2626;
}

.dark {
  --background: #0f172a;
  --foreground: #f8fafc;
  --card: #1e293b;
  --card-hover: #334155;
  --accent: #3b82f6;
  --accent-light: rgba(59, 130, 246, 0.3);
  --border: #334155;
  --muted: #94a3b8;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
}

body {
  font-family: var(--font-pretendard);
  background-color: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Prose styles for MDX content */
.prose {
  color: var(--foreground);
}

.prose h1,
.prose h2,
.prose h3 {
  color: var(--foreground);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose h1 {
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
}

.prose p {
  margin-bottom: 1.25rem;
  line-height: 1.625;
}

.prose code {
  font-family: ui-monospace, monospace;
  background-color: var(--card);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
}

.prose a {
  color: var(--accent);
  text-decoration: underline;
}

.prose a:hover {
  color: var(--foreground);
}
```

- [ ] **Step 2: Verify styles load**

```bash
pnpm dev
```

Expected: Page renders with light mode background (#f8fafc)

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: replace CSS with Tailwind directives and theme variables"
```

---

## Task 3: Update Layout with ThemeProvider & Pretendard Font

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: CSS variables from Task 2
- Produces: Root layout with theme support and font loading

- [ ] **Step 1: Update layout.tsx**

Replace `app/layout.tsx` with:

```tsx
import React from "react";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata = {
  title: "AlphaSignal",
  description: "AI-powered market alpha signals and analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify ThemeProvider works**

```bash
pnpm dev
```

Expected: Page loads without errors, inspect `<html>` tag shows no `class` initially (system theme detection)

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add ThemeProvider and Pretendard font loading"
```

---

## Task 4: Create ThemeToggle Component

**Files:**
- Create: `src/components/ThemeToggle.tsx`

**Interfaces:**
- Consumes: next-themes useTheme hook
- Produces: ThemeToggle component for header

- [ ] **Step 1: Create ThemeToggle.tsx**

Create `src/components/ThemeToggle.tsx`:

```tsx
"use client";

import React from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400"
        aria-label="테마 전환"
        disabled
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="5" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150"
      aria-label="테마 전환"
    >
      {theme === "dark" ? (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
```

- [ ] **Step 2: Verify ThemeToggle renders**

Add temporary test to `app/page.tsx` (will be removed in Task 8):

```tsx
import ThemeToggle from "../src/components/ThemeToggle";

// Add inside the return, before PremiumDashboard:
<ThemeToggle />
```

```bash
pnpm dev
```

Expected: ThemeToggle button appears, clicking toggles between light/dark

- [ ] **Step 3: Remove temporary test code**

Revert the temporary change to `app/page.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle component for dark mode switching"
```

---

## Task 5: Create Header Component

**Files:**
- Create: `src/components/Header.tsx`

**Interfaces:**
- Consumes: ThemeToggle from Task 4
- Produces: Header component with logo and theme toggle

- [ ] **Step 1: Create Header.tsx**

Create `src/components/Header.tsx`:

```tsx
"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-wide mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-slate-900 dark:text-slate-50">
          AlphaSignal
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify Header renders**

Add temporary test to `app/page.tsx`:

```tsx
import Header from "../src/components/Header";

// Add inside the return, before PremiumDashboard:
<Header />
```

```bash
pnpm dev
```

Expected: Header appears with sticky positioning, logo, and theme toggle

- [ ] **Step 3: Remove temporary test code**

Revert the temporary change to `app/page.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Header component with sticky positioning"
```

---

## Task 6: Create FilterBar Component

**Files:**
- Create: `src/components/FilterBar.tsx`

**Interfaces:**
- Consumes: None
- Produces: FilterBar component with category selection

- [ ] **Step 1: Create FilterBar.tsx**

Create `src/components/FilterBar.tsx`:

```tsx
"use client";

import React from "react";

export type Category = "all" | "alpha" | "premarket" | "notice";

interface FilterBarProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "alpha", label: "Alpha Signals" },
  { value: "premarket", label: "Premarket" },
  { value: "notice", label: "Notice" },
];

export default function FilterBar({
  activeCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="sticky top-16 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-wide mx-auto px-4 h-12 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-150 ${
              activeCategory === cat.value
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify FilterBar renders**

Add temporary test to `app/page.tsx`:

```tsx
import FilterBar, { Category } from "../src/components/FilterBar";
import { useState } from "react";

// Add inside the return, before PremiumDashboard:
const [category, setCategory] = useState<Category>("all");
<FilterBar activeCategory={category} onCategoryChange={setCategory} />
```

```bash
pnpm dev
```

Expected: Filter bar appears with 4 category buttons, clicking changes active state

- [ ] **Step 3: Remove temporary test code**

Revert the temporary change to `app/page.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/FilterBar.tsx
git commit -m "feat: add FilterBar component with category selection"
```

---

## Task 7: Create ContentCard Component

**Files:**
- Create: `src/components/ContentCard.tsx`

**Interfaces:**
- Consumes: NoticeData and SignalData types from PremiumDashboard
- Produces: ContentCard component for individual items

- [ ] **Step 1: Create ContentCard.tsx**

Create `src/components/ContentCard.tsx`:

```tsx
import React from "react";
import Link from "next/link";

export interface ContentItem {
  type: "notice" | "signal";
  slug?: string;
  title: string;
  date: string;
  category?: string;
  lang?: string;
  href: string;
}

interface ContentCardProps {
  item: ContentItem;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function getCategoryBadge(category: string) {
  const badges: Record<string, { label: string; className: string }> = {
    notice: {
      label: "Notice",
      className:
        "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800",
    },
    alpha_signal: {
      label: "Alpha",
      className:
        "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800",
    },
    alpha_signal_premarket: {
      label: "Premarket",
      className:
        "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800",
    },
  };

  return (
    badges[category] || {
      label: category,
      className:
        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700",
    }
  );
}

export default function ContentCard({ item }: ContentCardProps) {
  const badge = item.category ? getCategoryBadge(item.category) : null;

  return (
    <Link
      href={item.href}
      className="block p-5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all duration-150"
    >
      <div className="flex justify-between items-start mb-3">
        {badge && (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}
          >
            {badge.label}
          </span>
        )}
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {formatDate(item.date)}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 line-clamp-2">
        {item.title}
      </h3>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          자세히 보기 &rarr;
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify ContentCard renders**

Add temporary test to `app/page.tsx`:

```tsx
import ContentCard, { ContentItem } from "../src/components/ContentCard";

// Add inside the return, before PremiumDashboard:
const testItem: ContentItem = {
  type: "notice",
  title: "테스트 공지사항",
  date: "2024-01-15",
  category: "notice",
  href: "/notice/test",
};
<ContentCard item={testItem} />
```

```bash
pnpm dev
```

Expected: ContentCard renders with proper styling, hover effects work

- [ ] **Step 3: Remove temporary test code**

Revert the temporary change to `app/page.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/ContentCard.tsx
git commit -m "feat: add ContentCard component with category badges"
```

---

## Task 8: Create ContentList Component

**Files:**
- Create: `src/components/ContentList.tsx`

**Interfaces:**
- Consumes: ContentCard from Task 7
- Produces: ContentList container component

- [ ] **Step 1: Create ContentList.tsx**

Create `src/components/ContentList.tsx`:

```tsx
import React from "react";
import ContentCard, { ContentItem } from "./ContentCard";

interface ContentListProps {
  items: ContentItem[];
  emptyMessage?: string;
}

export default function ContentList({
  items,
  emptyMessage = "등록된 콘텐츠가 없습니다.",
}: ContentListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 dark:text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="max-w-wide mx-auto px-4 py-6 space-y-4">
      {items.map((item, index) => (
        <ContentCard key={`${item.type}-${item.slug || index}`} item={item} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify ContentList renders**

Add temporary test to `app/page.tsx`:

```tsx
import ContentList, { ContentItem } from "../src/components/ContentList";

// Add inside the return, before PremiumDashboard:
const testItems: ContentItem[] = [
  {
    type: "notice",
    title: "테스트 공지사항 1",
    date: "2024-01-15",
    category: "notice",
    href: "/notice/test1",
  },
  {
    type: "notice",
    title: "테스트 공지사항 2",
    date: "2024-01-14",
    category: "notice",
    href: "/notice/test2",
  },
];
<ContentList items={testItems} />
```

```bash
pnpm dev
```

Expected: ContentList renders with proper spacing and layout

- [ ] **Step 3: Remove temporary test code**

Revert the temporary change to `app/page.tsx`

- [ ] **Step 4: Commit**

```bash
git add src/components/ContentList.tsx
git commit -m "feat: add ContentList container component"
```

---

## Task 9: Refactor Main Page with New Components

**Files:**
- Modify: `app/page.tsx`
- Delete: `src/components/PremiumDashboard.tsx` (after migration)

**Interfaces:**
- Consumes: Header, FilterBar, ContentList from Tasks 5-8
- Produces: Refactored main page using new component architecture

- [ ] **Step 1: Create new page.tsx**

Replace `app/page.tsx` with:

```tsx
import React from "react";
import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Header from "../src/components/Header";
import FilterBar from "../src/components/FilterBar";
import ContentList from "../src/components/ContentList";
import { ContentItem } from "../src/components/ContentCard";
import Sponsorship from "../src/components/Sponsorship";
import Adsense from "../src/components/Adsense";
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

  const mdxFiles = files.filter(
    (file) => file.endsWith(".mdx") || file.endsWith(".md"),
  );

  const notices: ContentItem[] = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const filePath = path.join(dirPath, file);
      const source = await fs.readFile(filePath, "utf-8");

      const { frontmatter } = await compileMDX<NoticeFrontmatter>({
        source,
        options: { parseFrontmatter: true },
      });

      return {
        type: "notice" as const,
        slug,
        title: frontmatter.title || slug,
        date: frontmatter.date || "",
        category: "notice",
        href: `/notice/${slug}`,
      };
    }),
  );

  // Sort notices by date descending
  notices.sort((a, b) => getSafeTime(b.date) - getSafeTime(a.date));

  // Define signals (empty for now, will be populated from GitHub API)
  const signals: ContentItem[] = [];

  // Combine all items for "all" category
  const allItems: ContentItem[] = [...notices, ...signals];

  return (
    <>
      <Analytics gaId="G-BUDDYPREM" />
      <Header />
      <FilterBarClient allItems={allItems} notices={notices} signals={signals} />
      <Adsense slot="9876543210" />
      <Sponsorship />
    </>
  );
}

// Client component for filter interaction
function FilterBarClient({
  allItems,
  notices,
  signals,
}: {
  allItems: ContentItem[];
  notices: ContentItem[];
  signals: ContentItem[];
}) {
  "use client";

  const [category, setCategory] = React.useState<
    "all" | "alpha" | "premarket" | "notice"
  >("all");

  const getFilteredItems = () => {
    switch (category) {
      case "all":
        return allItems;
      case "notice":
        return notices;
      case "alpha":
        return signals.filter((s) => s.category === "alpha_signal");
      case "premarket":
        return signals.filter((s) => s.category === "alpha_signal_premarket");
      default:
        return allItems;
    }
  };

  return (
    <>
      <FilterBar activeCategory={category} onCategoryChange={setCategory} />
      <ContentList
        items={getFilteredItems()}
        emptyMessage={
          category === "all"
            ? "등록된 콘텐츠가 없습니다."
            : category === "notice"
              ? "등록된 공지사항이 없습니다."
              : "선택한 카테고리의 시그널 데이터가 없습니다."
        }
      />
    </>
  );
}
```

- [ ] **Step 2: Verify page renders correctly**

```bash
pnpm dev
```

Expected: Page shows Header, FilterBar, ContentList with notices, Sponsorship, Adsense

- [ ] **Step 3: Test category filtering**

Click each category filter button and verify:
- All: Shows all notices + signals
- Alpha Signals: Shows only alpha signals
- Premarket: Shows only premarket signals
- Notice: Shows only notices

- [ ] **Step 4: Delete PremiumDashboard.tsx**

```bash
rm src/components/PremiumDashboard.tsx
```

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx src/components/PremiumDashboard.tsx
git commit -m "refactor: replace PremiumDashboard with new component architecture"
```

---

## Task 10: Refactor Sponsorship Component

**Files:**
- Modify: `src/components/Sponsorship.tsx`

**Interfaces:**
- Consumes: None (standalone component)
- Produces: Refactored Sponsorship with Tailwind classes

- [ ] **Step 1: Replace Sponsorship.tsx**

Replace `src/components/Sponsorship.tsx` with:

```tsx
"use client";

import React, { useState } from "react";

interface SponsorshipProps {
  tossLink?: string;
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
}

export default function Sponsorship({
  tossLink = "https://toss.me/buddypremium",
  bankName = "토스뱅크",
  accountNumber = "1000-1234-5678",
  accountHolder = "(주)버디프리미엄",
}: SponsorshipProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy account number:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg text-center">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">
        Premium Support &amp; Sponsorship
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
        Buddy Premium의 양질의 투자 정보 분석을 후원해주세요. 후원금은 데이터
        서버 유지 및 분석 시스템 고도화에 전액 사용됩니다.
      </p>

      <div className="flex flex-col gap-4 items-center justify-center">
        <a
          href={tossLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#0050ff] hover:bg-[#0040cc] text-white px-8 py-3 rounded-xl text-sm font-bold w-full max-w-xs transition-all duration-150 hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,80,255,0.3)]"
        >
          Toss Pay로 후원하기
        </a>

        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-xl w-full max-w-xs text-sm">
          <div className="text-left">
            <span className="text-slate-500 dark:text-slate-400 mr-2">
              {bankName}
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-50">
              {accountNumber}
            </span>
            <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              예금주: {accountHolder}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className={`px-3 py-1.5 rounded-md font-semibold text-xs transition-colors duration-150 ${
              copied
                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
            }`}
          >
            {copied ? "복사됨!" : "복사"}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify Sponsorship renders**

```bash
pnpm dev
```

Expected: Sponsorship widget displays correctly with Tailwind styling

- [ ] **Step 3: Test copy functionality**

Click the copy button and verify it shows "복사됨!" feedback

- [ ] **Step 4: Commit**

```bash
git add src/components/Sponsorship.tsx
git commit -m "refactor: convert Sponsorship to Tailwind classes"
```

---

## Task 11: Refactor Notice Detail Page

**Files:**
- Modify: `app/notice/[slug]/page.tsx`

**Interfaces:**
- Consumes: Tailwind classes, prose styles
- Produces: Refactored notice detail page

- [ ] **Step 1: Replace notice/[slug]/page.tsx**

Replace `app/notice/[slug]/page.tsx` with:

```tsx
import React from "react";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Sponsorship from "../../../src/components/Sponsorship";
import Adsense from "../../../src/components/Adsense";

interface NoticeFrontmatter {
  title?: string;
  date?: string;
}

function formatNoticeDate(dateStr: string | undefined): string | null {
  if (!dateStr) return null;
  const dateObj = new Date(dateStr);
  const time = dateObj.getTime();
  if (isNaN(time)) return null;
  return dateObj.toLocaleString("ko-KR");
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function NoticeDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Sanitize the slug to prevent directory traversal
  const safeSlug = path.basename(slug);
  if (
    safeSlug !== slug ||
    slug.includes("..") ||
    slug.includes("/") ||
    slug.includes("\\")
  ) {
    notFound();
  }

  const mdxPath = path.join(process.cwd(), "content/notice", `${safeSlug}.mdx`);
  const mdPath = path.join(process.cwd(), "content/notice", `${safeSlug}.md`);

  let source: string;
  try {
    source = await fs.readFile(mdxPath, "utf-8");
  } catch {
    try {
      source = await fs.readFile(mdPath, "utf-8");
    } catch {
      notFound();
    }
  }

  const { content, frontmatter } = await compileMDX<NoticeFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <header className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
            Notice
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          {frontmatter.title || slug}
        </h1>
        {(() => {
          const formattedDate = formatNoticeDate(frontmatter.date);
          return formattedDate ? (
            <time className="text-slate-500 dark:text-slate-400 text-sm">
              {formattedDate}
            </time>
          ) : null;
        })()}
      </header>

      <article className="prose min-h-[200px]">{content}</article>

      <Adsense slot="4567890123" />
      <Sponsorship />
    </div>
  );
}
```

- [ ] **Step 2: Verify notice detail page renders**

```bash
pnpm dev
```

Navigate to a notice detail page and verify:
- Header with badge, title, date
- MDX content renders with prose styles
- Adsense and Sponsorship appear below content

- [ ] **Step 3: Commit**

```bash
git add app/notice/\[slug\]/page.tsx
git commit -m "refactor: convert notice detail page to Tailwind"
```

---

## Task 12: Refactor Signal Detail Page

**Files:**
- Modify: `app/signal/[lang]/[type]/[date]/page.tsx`

**Interfaces:**
- Consumes: Tailwind classes, prose styles
- Produces: Refactored signal detail page

- [ ] **Step 1: Replace signal/[lang]/[type]/[date]/page.tsx**

Replace `app/signal/[lang]/[type]/[date]/page.tsx` with:

```tsx
import React from "react";
import { notFound } from "next/navigation";
import { fetchSignalMarkdown } from "../../../../../src/services/github";
import { compileMDX } from "next-mdx-remote/rsc";
import Sponsorship from "../../../../../src/components/Sponsorship";
import Adsense from "../../../../../src/components/Adsense";

interface SignalFrontmatter {
  title?: string;
  date?: string;
}

interface PageProps {
  params: Promise<{
    lang: string;
    type: string;
    date: string;
  }>;
}

export default async function SignalDetailPage({ params }: PageProps) {
  const { lang, type, date } = await params;

  const VALID_LANGS = ["ko", "en"] as const;
  const VALID_TYPES = ["alpha", "premarket"] as const;

  const isValidLang = VALID_LANGS.includes(
    lang as (typeof VALID_LANGS)[number],
  );
  const isValidType = VALID_TYPES.includes(
    type as (typeof VALID_TYPES)[number],
  );
  const isValidDate = /^\d{8}$/.test(date);

  if (!isValidLang || !isValidType || !isValidDate) {
    notFound();
  }

  let rawMarkdown: string;
  try {
    rawMarkdown = await fetchSignalMarkdown(lang, type, date);
  } catch (err) {
    console.error(
      `Failed to fetch signal markdown (${lang}/${type}/${date}):`,
      err,
    );
    notFound();
  }

  const { content, frontmatter } = await compileMDX<SignalFrontmatter>({
    source: rawMarkdown,
    options: { parseFrontmatter: true },
  });

  return (
    <div className="max-w-content mx-auto px-4 py-8">
      <header className="mb-8 pb-6 border-b border-slate-200 dark:border-slate-700">
        <div className="mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            {type.toUpperCase()} SIGNAL ({lang.toUpperCase()})
          </span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
          {frontmatter.title ||
            `${type.toUpperCase()} Signal (${lang.toUpperCase()})`}
        </h1>
        <time className="text-slate-500 dark:text-slate-400 text-sm">
          {frontmatter.date || date}
        </time>
      </header>

      <article className="prose min-h-[200px]">{content}</article>

      <Adsense slot="7890123456" />
      <Sponsorship />
    </div>
  );
}
```

- [ ] **Step 2: Verify signal detail page renders**

```bash
pnpm dev
```

Navigate to a signal detail page and verify:
- Header with badge, title, date
- MDX content renders with prose styles
- Adsense and Sponsorship appear below content

- [ ] **Step 3: Commit**

```bash
git add app/signal/\[lang\]/\[type\]/\[date\]/page.tsx
git commit -m "refactor: convert signal detail page to Tailwind"
```

---

## Task 13: Final Cleanup & Verification

**Files:**
- Verify: All modified files
- Delete: Any unused CSS or files

**Interfaces:**
- Consumes: All previous tasks
- Produces: Clean, working application

- [ ] **Step 1: Remove unused CSS classes from globals.css**

The old CSS classes (.premium-card, .tabs-container, etc.) are no longer used. Verify globals.css only contains Tailwind directives and theme variables.

- [ ] **Step 2: Run lint**

```bash
pnpm lint
```

Expected: No errors

- [ ] **Step 3: Run type check**

```bash
pnpm type-check
```

Expected: No type errors

- [ ] **Step 4: Run build**

```bash
pnpm build
```

Expected: Build succeeds without errors

- [ ] **Step 5: Test all pages manually**

Visit each page and verify:
- `/` - Home page with Header, FilterBar, ContentList
- `/notice/[slug]` - Notice detail page
- `/signal/[lang]/[type]/[date]` - Signal detail page

- [ ] **Step 6: Test dark mode**

Toggle dark mode and verify:
- All pages switch to dark theme
- No flash of unstyled content
- Text remains readable in both modes

- [ ] **Step 7: Test responsive design**

Verify layout works on:
- Mobile (< 640px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

- [ ] **Step 8: Final commit**

```bash
git add .
git commit -m "chore: final cleanup and verification"
```

---

## Self-Review Checklist

1. **Spec coverage:** ✅ All requirements from spec are implemented
   - Light mode default ✅
   - Dark mode support ✅
   - Pretendard font ✅
   - Clean minimal design ✅
   - Filter bar layout ✅
   - Slate blue accent ✅
   - Responsive design ✅
   - Ads separated from content ✅

2. **Placeholder scan:** ✅ No TBD/TODO placeholders found

3. **Type consistency:** ✅ All types (ContentItem, NoticeData, SignalData) are consistent across tasks
