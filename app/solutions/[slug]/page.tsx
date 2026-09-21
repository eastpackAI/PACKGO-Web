import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackgoExperience } from "@/components/layout/PackgoExperience";
import { getIndustryBySlug, industries } from "@/config/industries";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return {
    title: industry.title,
    description: industry.shortDescription,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return <PackgoExperience initialIndustry={industry.id} initialLobbyState="cabinet-focus" />;
}
