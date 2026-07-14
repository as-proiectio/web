"use client";

import React from "react";
import FilterBar from "./FilterBar";
import ContentList from "./ContentList";
import { ContentItem } from "./ContentCard";

export default function FilterBarClient({
  allItems,
  notices,
  signals,
}: {
  allItems: ContentItem[];
  notices: ContentItem[];
  signals: ContentItem[];
}) {
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
