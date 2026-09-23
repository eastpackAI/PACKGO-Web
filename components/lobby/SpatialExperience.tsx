"use client";

import { ContextModules } from "@/components/lobby/ContextModules";
import { MainFocusView } from "@/components/lobby/MainFocusView";
import { PackyPresence } from "@/components/packy/PackyPresence";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { getIndustryById } from "@/config/industries";
import type { SpatialSpace } from "@/lib/types";

/**
 * Spatial View 母版（Spatial Experience master）。
 *
 * 只负责：空间环境 → 唯一 Main Focus → 周围 Context Modules → 主界面 Packy → 右侧对话抽屉。
 * Lobby 与 Showroom 复用同一套空间与焦点组件，只替换内容与状态。
 */
export function SpatialExperience() {
  const { actions, activeFocus, conversationPinned, conversationVisibility, currentSpace, selectedIndustry } =
    useExperience();
  const industry = getIndustryById(selectedIndustry);

  return (
    <section
      className="spatial-experience"
      data-space={currentSpace}
      data-drawer={conversationVisibility}
      data-pinned={conversationPinned ? "true" : "false"}
      aria-label="PACKGO 空间视图 · Packy 共享焦点界面"
    >
      <div className="lobby-status" aria-live="polite">
        <span className="lobby-status__tag">空间视图</span>
        <strong>{spaceTitle(currentSpace, industry.shortTitle)}</strong>
        <span className="lobby-status__focus">共享焦点 · {activeFocus.detail}</span>
        {currentSpace !== "lobby" && (
          <button type="button" onClick={() => actions.openLobby()}>
            ← 返回大厅
          </button>
        )}
      </div>

      <div className="lobby-hint" aria-hidden="true">
        <span>唯一主焦点</span>
        <span aria-hidden="true">/</span>
        <span>左右上下文模块</span>
        <span aria-hidden="true">/</span>
        <span>Packy 与你共享当前焦点</span>
      </div>

      <div className="spatial-scene">
        <SpaceEnvironment />
        <MainFocusView />
        <ContextModules />
      </div>

      <PackyPresence />
    </section>
  );
}

/**
 * Space Environment｜空间环境。
 * 复用现有第一人称工业大厅 CSS（hall / ceiling / floor），只做亮度与空间关系，不承载内容。
 */
function SpaceEnvironment() {
  return (
    <div className="lobby-hall" aria-hidden="true">
      <div className="hall-ceiling">
        <span className="ceil-truss" />
        <span className="ceil-light ceil-light--1" />
        <span className="ceil-light ceil-light--2" />
        <span className="ceil-light ceil-light--3" />
        <span className="ceil-far-glow" />
      </div>

      <div className="hall-wall hall-wall--left">
        <span className="wall-skin" />
        <span className="wall-rail" />
        <span className="wall-skirting" />
        <span className="wall-niche wall-niche--a" />
        <span className="wall-niche wall-niche--b" />
        <span className="wall-blade" />
      </div>

      <div className="hall-wall hall-wall--right">
        <span className="wall-skin" />
        <span className="wall-rail" />
        <span className="wall-skirting" />
        <span className="wall-niche wall-niche--a" />
        <span className="wall-sign">PACKGO · 包装系统</span>
      </div>

      <div className="hall-wall hall-wall--far">
        <span className="far-seam far-seam--a" />
        <span className="far-seam far-seam--b" />
        <span className="far-portal" />
        <span className="far-trim" />
      </div>

      <div className="hall-floor">
        <span className="floor-grid" />
        <span className="floor-lane" />
        <span className="floor-pool floor-pool--1" />
        <span className="floor-pool floor-pool--2" />
        <span className="floor-pool floor-pool--3" />
        <span className="floor-spill" />
        <span className="floor-decal">PACKGO 空间视图 · 共享焦点</span>
        <span className="floor-marker" />
      </div>
    </div>
  );
}

function spaceTitle(space: SpatialSpace, industryShortTitle: string): string {
  switch (space) {
    case "lobby":
      return "PACKGO 大厅 · 入口";
    case "showroom":
      return `${industryShortTitle}展厅`;
    case "product":
      return `${industryShortTitle} · 产品焦点`;
    default:
      return "项目空间入口";
  }
}
