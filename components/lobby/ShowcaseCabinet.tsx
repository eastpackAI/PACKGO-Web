"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { getIndustryLobbyPlacement } from "@/config/industries";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { IndustryConfig } from "@/lib/types";

interface ShowcaseCabinetProps {
  industry: IndustryConfig;
  index: number;
}

export function ShowcaseCabinet({ industry, index }: ShowcaseCabinetProps) {
  const router = useRouter();
  const { selectedIndustry, lobbyState, focusIndustry, prefersReducedMotion } = useExperience();
  const placement = getIndustryLobbyPlacement(industry.id);
  const isFocused = selectedIndustry === industry.id && lobbyState === "cabinet-focus";
  const isDimmed = lobbyState === "cabinet-focus" && !isFocused;

  const focusCabinet = () => {
    focusIndustry(industry.id);
    router.push(industry.route);
  };

  return (
    <div
      className={`cabinet-slot cabinet-slot--${placement.wall} cabinet-slot--${placement.wall}-${placement.depth}`}
      style={{ "--cabinet-accent": placement.accent } as React.CSSProperties}
    >
      <motion.article
        className={`showcase-cabinet${isFocused ? " is-focused" : ""}${isDimmed ? " is-dimmed" : ""}`}
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: isFocused ? -4 : 0,
                scale: isFocused ? 1.03 : isDimmed ? 0.98 : 1,
                opacity: isDimmed ? 0.4 : 1,
              }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-labelledby={`${industry.id}-cabinet-title`}
      >
        <button type="button" className="cabinet-case" data-display={placement.display} onClick={focusCabinet}>
          <span className="cabinet-cap" aria-hidden="true">
            <span className="cabinet-index">0{index + 1}</span>
            <span className="cabinet-cap-line" />
          </span>

          <span className="cabinet-glass" aria-hidden="true">
            <span className="cabinet-spot" />
            <span className="cabinet-shelf" />
            <span className="cabinet-product">
              <i />
              <i />
              <i />
            </span>
            <span className="cabinet-sheen" />
          </span>

          <span className="cabinet-plinth">
            <span className="cabinet-copy">
              <span className="cabinet-label">{placement.spaceLabel}</span>
              <strong id={`${industry.id}-cabinet-title`}>{industry.shortTitle}</strong>
              <small>{industry.showcaseProducts[0]}</small>
            </span>
            <span className="cabinet-enter" aria-hidden="true">
              {isFocused ? "正在查看" : "进入"} ↗
            </span>
          </span>
        </button>
      </motion.article>
      <span className="cabinet-cast" aria-hidden="true" />
    </div>
  );
}
