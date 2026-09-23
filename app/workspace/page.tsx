import type { Metadata } from "next";
import { PackgoExperience } from "@/components/layout/PackgoExperience";
import { workbench } from "@/config/standardHome";

export const metadata: Metadata = {
  title: workbench.eyebrow,
  description: workbench.summary,
};

export default function WorkspacePage() {
  return <PackgoExperience />;
}
