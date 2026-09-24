"use client";

import { usePathname } from "next/navigation";
import { SpatialExperience } from "@/components/lobby/SpatialExperience";
import { ConversationDrawer } from "@/components/packy/ConversationDrawer";
import { PackyLauncher } from "@/components/packy/PackyLauncher";
import { StandardPackyBridge } from "@/components/packy/StandardPackyBridge";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { StandardHomeView } from "@/components/standard-view/StandardHomeView";
import { StandardDetailView } from "@/components/standard-view/StandardDetailView";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function AppShell() {
  const { viewMode, packyState, currentSpace, conversationVisibility } = useExperience();
  const pathname = usePathname();
  const conversationOpen = conversationVisibility === "open";

  const isHome = pathname === "/";
  const standardContent = isHome
    ? <StandardHomeView />
    : <StandardDetailView pathname={pathname} />;

  return (
    <div
      className={`app-shell view-${viewMode} packy-${packyState}${
        conversationOpen ? " conversation-open" : ""
      }`}
      data-space={currentSpace}
    >
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      {/* 固定背景层（三层：底色 + 极淡色块图案 + 细网格）。内容在它上面滚动，
          背景**不随滚动移动** —— Owner 2026-09-24 指出：参考站的网格是钉住的。 */}
      <div className="page-backdrop" aria-hidden="true" />
      <StandardPackyBridge />
      <SiteHeader />
      <div className="app-body">
        <main id="main-content" className="main-experience" tabIndex={-1}>
          {viewMode === "spatial" ? <SpatialExperience /> : standardContent}
        </main>
      </div>
      {/* 右下角常驻 Packy 入口（标准视图显示，空间视图用 CSS 隐去） */}
      <PackyLauncher />
      <ConversationDrawer />
    </div>
  );
}
