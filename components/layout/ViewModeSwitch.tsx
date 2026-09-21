"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";

export function ViewModeSwitch() {
  const { viewMode, setViewMode } = useExperience();

  return (
    <div className="view-mode-switch" role="group" aria-label="选择浏览方式">
      <button
        type="button"
        className={viewMode === "spatial" ? "is-active" : undefined}
        aria-pressed={viewMode === "spatial"}
        onClick={() => setViewMode("spatial")}
      >
        <span>空间视图</span>
        <small>展厅</small>
      </button>
      <button
        type="button"
        className={viewMode === "standard" ? "is-active" : undefined}
        aria-pressed={viewMode === "standard"}
        onClick={() => setViewMode("standard")}
      >
        <span>标准视图</span>
        <small>浏览路径</small>
      </button>
    </div>
  );
}
