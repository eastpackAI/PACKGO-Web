"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ExperienceProvider } from "@/components/providers/ExperienceProvider";
import type { IndustryId, LobbyState } from "@/lib/types";

interface PackgoExperienceProps {
  initialIndustry?: IndustryId;
  initialLobbyState?: LobbyState;
}

export function PackgoExperience({ initialIndustry, initialLobbyState }: PackgoExperienceProps) {
  return (
    <ExperienceProvider initialIndustry={initialIndustry} initialLobbyState={initialLobbyState}>
      <AppShell />
    </ExperienceProvider>
  );
}
