import type { Metadata } from "next";
import { PackgoExperience } from "@/components/layout/PackgoExperience";
import { about } from "@/config/standardHome";

export const metadata: Metadata = {
  title: about.eyebrow,
  description: about.title,
};

export default function AboutPage() {
  return <PackgoExperience />;
}

