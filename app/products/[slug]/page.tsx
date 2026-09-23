import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PackgoExperience } from "@/components/layout/PackgoExperience";
import { formats, productRoutes } from "@/config/standardHome";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/** 只生成四种已确认的主要包装形态；其余 slug 一律 404。 */
export const dynamicParams = false;

function getFormat(slug: string) {
  return formats.find((format) => format.id === slug);
}

export function generateStaticParams() {
  return Object.entries(productRoutes).map(([id]) => ({ slug: id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const format = getFormat(slug);
  if (!format) return {};

  return {
    title: format.title,
    description: format.summary,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const format = getFormat(slug);
  if (!format) notFound();

  return <PackgoExperience />;
}
