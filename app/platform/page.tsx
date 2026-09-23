import type { Metadata } from "next";
import { PackgoExperience } from "@/components/layout/PackgoExperience";
import { platform } from "@/config/standardHome";

export const metadata: Metadata = {
  title: platform.eyebrow,
  description: platform.summary,
};

export default function PlatformPage() {
  return <PackgoExperience />;
}

