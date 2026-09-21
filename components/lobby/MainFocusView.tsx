"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { getIndustryById } from "@/config/industries";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { spaceDisplayName } from "@/config/spatial";
import type { IndustryId, SpatialActionId, SpatialFocusKind } from "@/lib/types";

interface FocusCallToAction {
  label: string;
  action: SpatialActionId;
  argument?: string;
  quiet?: boolean;
}

/**
 * Main Focus View｜主焦点窗口。
 * 当前客户与 Packy 共同关注的内容只出现在这里；全页只有一个 h1。
 */
export function MainFocusView() {
  const {
    activeFocus,
    activeDetail,
    activeMediaId,
    currentSpace,
    dispatchAction,
    lastAction,
    prefersReducedMotion,
    selectedIndustry,
  } = useExperience();

  const industry = getIndustryById(selectedIndustry);
  const ctaList = buildCallToActions(activeFocus.kind, industry.id);
  const focusMotion = prefersReducedMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 }, exit: undefined }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      };

  return (
    <section className="main-focus-view" aria-labelledby="main-focus-title" data-space={currentSpace}>
      <div className="main-focus-frame">
        <div className="main-focus-bezel" aria-hidden="true">
          <span className="main-focus-bezel__tag">主焦点窗口 · 当前共同查看</span>
          <span className="main-focus-bezel__status">
            <i />
            与 Packy 共享 · {spaceDisplayName(currentSpace)}
          </span>
        </div>

        <div className="main-focus-surface">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeFocus.id}
              className="main-focus-body"
              transition={{ duration: prefersReducedMotion ? 0 : 0.32 }}
              {...focusMotion}
            >
              <div className="main-focus-copy">
                <span className="eyebrow">{activeFocus.eyebrow}</span>
                <h1 id="main-focus-title">{activeFocus.title}</h1>
                <p className="main-focus-summary">{activeFocus.summary}</p>

                <dl className="main-focus-facts">
                  {activeFocus.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt>{fact.label}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="main-focus-actions">
                  {ctaList.map((cta) => (
                    <button
                      key={`${cta.action}-${cta.argument ?? "default"}`}
                      type="button"
                      className={cta.quiet ? "is-quiet" : undefined}
                      onClick={() => dispatchAction(cta.action, cta.argument)}
                    >
                      {cta.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="main-focus-side">
                <div
                  className="main-focus-media"
                  data-media-id={activeMediaId ?? undefined}
                  data-state={activeFocus.imageSrc || activeMediaId ? "loaded" : "idle"}
                >
                  <span className="main-focus-media__label">
                    {activeMediaId ? activeFocus.mediaLabel ?? "媒体占位" : "媒体展示区"}
                  </span>
                  <span
                    className={`main-focus-media__screen${activeFocus.imageSrc ? " has-image" : ""}`}
                  >
                    {activeFocus.imageSrc ? (
                      <Image
                        src={activeFocus.imageSrc}
                        alt={activeFocus.imageAlt ?? "PACKGO 包装效果预览"}
                        fill
                        sizes="(max-width: 900px) 100vw, 34vw"
                        priority={activeFocus.kind === "platform"}
                      />
                    ) : (
                      <>
                        <i />
                        <i />
                        <i />
                      </>
                    )}
                  </span>
                  <small>
                    {activeFocus.imageSrc
                      ? "包装效果预览 · 临时素材"
                      : activeMediaId
                        ? "媒体占位区 · 暂未接入视频"
                        : "内容占位区 · 后续由 Packy 调出媒体"}
                  </small>
                </div>

                <p className="main-focus-placeholder">{activeFocus.placeholder}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="main-focus-chips" aria-live="polite">
            <span className="chip">焦点 · {activeFocus.detail}</span>
            <span className="chip">当前层级 · {activeDetail ?? "概览"}</span>
            <span className="chip">
              Packy 操作 · {lastAction ? "已响应页面操作" : "等待你的操作"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildCallToActions(kind: SpatialFocusKind, industryId: IndustryId): FocusCallToAction[] {
  switch (kind) {
    case "platform":
      return [
        { label: "进入行业展厅", action: "openShowroom", argument: industryId },
        { label: "打开完整对话", action: "openConversation", quiet: true },
      ];
    case "solution":
      return [
        { label: "查看材料", action: "showMaterials" },
        { label: "查看生产制造", action: "showManufacturing" },
        { label: "返回大厅", action: "openLobby", quiet: true },
      ];
    case "product":
      return [
        { label: "材料与结构", action: "showMaterials" },
        { label: "生产制造", action: "showManufacturing" },
        { label: "返回", action: "goBack", quiet: true },
      ];
    case "materials":
      return [
        { label: "印刷与工艺", action: "showManufacturing", argument: "printing" },
        { label: "生产制造", action: "showManufacturing" },
        { label: "返回", action: "goBack", quiet: true },
      ];
    case "printing":
    case "manufacturing":
      return [
        { label: "播放生产内容", action: "playMedia", argument: "manufacturing-line" },
        { label: "返回", action: "goBack", quiet: true },
      ];
    default:
      return [
        { label: "返回大厅", action: "openLobby" },
        { label: "返回", action: "goBack", quiet: true },
      ];
  }
}
