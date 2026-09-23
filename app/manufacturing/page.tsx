import type { Metadata } from "next";
import { PackgoExperience } from "@/components/layout/PackgoExperience";
import { manufacturing } from "@/config/standardHome";

export const metadata: Metadata = {
  title: manufacturing.eyebrow,
  description: manufacturing.summary,
};

export default function ManufacturingPage() {
  return <PackgoExperience />;
}

