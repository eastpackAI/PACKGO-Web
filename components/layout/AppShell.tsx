"use client";

import { usePathname } from "next/navigation";
import { SpatialExperience } from "@/components/lobby/SpatialExperience";
import { ConversationDrawer } from "@/components/packy/ConversationDrawer";
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
      <StandardPackyBridge />
      <SiteHeader />
      <div className="app-body">
        <main id="main-content" className="main-experience" tabIndex={-1}>
          {viewMode === "spatial" ? <SpatialExperience /> : standardContent}
        </main>
      </div>
      <ConversationDrawer />
    </div>
  );
}
