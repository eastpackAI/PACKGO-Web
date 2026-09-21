"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { getIndustryById } from "@/config/industries";
import { getLobbyModules, getShowroomModules } from "@/config/spatial";
import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Context Modules｜上下文模块。
 * 主焦点周围保持左右 / 远近 / 透视关系的弱化模块；进入焦点的模块前移，其余弱化。
 */
export function ContextModules() {
  const {
    currentSpace,
    selectedIndustry,
    selectedObjectId,
    activeFocus,
    dispatchAction,
    prefersReducedMotion,
  } = useExperience();

  const industry = getIndustryById(selectedIndustry);
  const modules = currentSpace === "lobby" ? getLobbyModules(industry) : getShowroomModules(industry);
  const hasSelection = activeFocus.kind !== "platform";

  return (
    <div className="context-modules" data-space={currentSpace}>
      <p className="context-modules__hint">
        上下文模块 · 点击查看，也可以直接问 Packy
      </p>

      <ul className="context-modules__list" aria-label="上下文模块">
        {modules.map((module, position) => {
          const isActive = module.id === selectedObjectId;
          const isWeakened = hasSelection && !isActive;

          return (
            <li
              key={module.id}
              className="context-module-slot"
              data-side={module.side}
              data-depth={module.depth}
              data-active={isActive ? "true" : "false"}
              style={{ "--module-slot": module.index } as CSSProperties}
            >
              <motion.button
                type="button"
                className={`context-module${isActive ? " is-active" : ""}${
                  isWeakened ? " is-weakened" : ""
                }`}
                aria-pressed={isActive}
                onClick={() => dispatchAction(module.action, module.argument)}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: isActive ? -6 : 0,
                        opacity: isWeakened ? 0.5 : 1,
                      }
                }
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                {module.imageSrc && (
                  <span className="context-module__visual">
                    <Image
                      src={module.imageSrc}
                      alt={module.imageAlt ?? `${module.label}包装效果预览`}
                      fill
                      sizes="(max-width: 900px) 42vw, 188px"
                    />
                  </span>
                )}
                <span className="context-module__index" aria-hidden="true">
                  {String(position + 1).padStart(2, "0")}
                </span>
                <strong>{module.label}</strong>
                <small>{module.caption}</small>
                <span className="context-module__state" aria-hidden="true">
                  {isActive ? "正在查看" : "打开"}
                </span>
              </motion.button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
