"use client";

import Link from "next/link";
import { industries } from "@/config/industries";
import { useExperience } from "@/components/providers/ExperienceProvider";

interface IndustryQuickNavProps {
  variant?: "spatial" | "standard";
}

export function IndustryQuickNav({ variant = "spatial" }: IndustryQuickNavProps) {
  const { selectedIndustry, setSelectedIndustry, focusIndustry } = useExperience();

  return (
    <nav className={`industry-quick-nav is-${variant}`} aria-label="行业快速导航">
      <span>按行业浏览</span>
      <div>
        {industries.map((industry) => (
          <Link
            key={industry.id}
            href={industry.route}
            className={selectedIndustry === industry.id ? "is-active" : undefined}
            aria-current={selectedIndustry === industry.id ? "page" : undefined}
            onClick={() => {
              setSelectedIndustry(industry.id);
              if (variant === "spatial") focusIndustry(industry.id);
            }}
          >
            {industry.shortTitle}
          </Link>
        ))}
      </div>
    </nav>
  );
}
