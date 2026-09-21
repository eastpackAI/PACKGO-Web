"use client";

import { usePathname } from "next/navigation";
import { SpatialExperience } from "@/components/lobby/SpatialExperience";
import { PackyPanel } from "@/components/packy/PackyPanel";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { StandardHomeView } from "@/components/standard-view/StandardHomeView";
import { StandardJourneyView } from "@/components/standard-view/StandardJourneyView";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function AppShell() {
  const { viewMode, packyState, currentSpace } = useExperience();
  const pathname = usePathname();

  /**
   * 标准视图的内容按路由分两种：
   * - 首页（`/`）：新的官网首页（PACKGO 网站 2 的内容，Cubit 风格版式）
   * - 行业深链（`/solutions/...`）：保留原来的行业浏览路径
   */
  const isHome = pathname === "/";
  const standardContent = isHome ? <StandardHomeView /> : <StandardJourneyView />;
  /**
   * 首页的标准视图展示的是「新官网首页」——它整页通栏、并且自带 Packy 专区，
   * 因此不再叠加右侧常驻的 Packy 面板（否则会把整页挤成窄栏）。
   * 空间视图与行业深链仍保留原来的 Packy 面板。
   */
  const showPackyPanel = viewMode === "standard" && !isHome;

  return (
    <div className={`app-shell view-${viewMode} packy-${packyState}`} data-space={currentSpace}>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <SiteHeader />
      <div className="app-body">
        <main id="main-content" className="main-experience" tabIndex={-1}>
          {viewMode === "spatial" ? <SpatialExperience /> : standardContent}
        </main>
        {showPackyPanel && <PackyPanel />}
      </div>
    </div>
  );
}
