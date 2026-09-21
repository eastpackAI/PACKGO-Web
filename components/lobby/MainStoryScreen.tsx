"use client";

import { AnimatePresence, motion } from "motion/react";
import { storyChapters } from "@/config/story";
import { useExperience } from "@/components/providers/ExperienceProvider";

export function MainStoryScreen() {
  const {
    mainScreenChapter,
    setMainScreenChapter,
    lobbyState,
    prefersReducedMotion,
  } = useExperience();
  const chapter = storyChapters.find((item) => item.id === mainScreenChapter) ?? storyChapters[0];

  return (
    <div className="screen-mount">
      <motion.section
        id="story"
        className={`main-story-screen ${lobbyState !== "default" ? "is-background" : ""}`}
        aria-labelledby="story-title"
        animate={
          prefersReducedMotion
            ? undefined
            : { scale: lobbyState === "default" ? 1 : 0.965, opacity: lobbyState === "default" ? 1 : 0.55 }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="screen-halo" aria-hidden="true" />

        <div className="led-frame">
          <div className="led-bezel" aria-hidden="true">
            <span className="led-bezel__tag">PACKGO 主叙事屏</span>
            <span className="led-bezel__status">
              <i />
              PACKGO 制造网络 · 内容占位
            </span>
          </div>

          <div className="led-surface">
            <div className="led-scene" aria-hidden="true">
              <span className="led-scene__glow" />
              <span className="led-scene__grid" />
              <span className="led-scene__conveyor" />
              <span className="led-scene__unit led-scene__unit--1" />
              <span className="led-scene__unit led-scene__unit--2" />
              <span className="led-scene__unit led-scene__unit--3" />
              <span className="led-scene__flare" />
            </div>
            <span className="led-scan" aria-hidden="true" />

            <div className="led-copy">
              <span className="eyebrow">PACKGO · 数字包装展厅</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={chapter.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.28 }}
                >
                  <h1 id="story-title">{chapter.title}</h1>
                  <p>{chapter.summary}</p>
                  {chapter.id === "intro" && (
                    <button
                      className="story-action"
                      type="button"
                      onClick={() => setMainScreenChapter("how-it-works")}
                    >
                      了解 PACKGO <span aria-hidden="true">↗</span>
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="chapter-selector" aria-label="PACKGO 主叙事章节">
            {storyChapters.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={item.id === mainScreenChapter ? "is-active" : undefined}
                aria-pressed={item.id === mainScreenChapter}
                onClick={() => setMainScreenChapter(item.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.id === "intro" ? "PACKGO" : item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
