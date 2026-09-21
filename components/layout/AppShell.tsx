"use client";

import { SpatialExperience } from "@/components/lobby/SpatialExperience";
import { PackyPanel } from "@/components/packy/PackyPanel";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { StandardJourneyView } from "@/components/standard-view/StandardJourneyView";
import { SiteHeader } from "@/components/layout/SiteHeader";

export function AppShell() {
  const { viewMode, packyState, currentSpace } = useExperience();

  return (
    <div className={`app-shell view-${viewMode} packy-${packyState}`} data-space={currentSpace}>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <SiteHeader />
      <div className="app-body">
        <main id="main-content" className="main-experience" tabIndex={-1}>
          {viewMode === "spatial" ? <SpatialExperience /> : <StandardJourneyView />}
        </main>
        {viewMode === "standard" && <PackyPanel />}
      </div>
    </div>
  );
}
