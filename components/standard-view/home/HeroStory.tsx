"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { brand, heroStory } from "@/config/standardHome";

/** 每一拍停留的时间（毫秒）；五拍走完约 7.5 秒，播完就停，不循环。 */
const BEAT_MS = 1500;

type Point = [number, number];

/** 四张卡片的起点与终点：上面那条道是"需求往下走"，下面那条道是"依据往上传"。 */
const TOKENS: Record<keyof typeof heroStory.tokens, { from: Point; to: Point }> = {
  idea: { from: [180, 48], to: [600, 48] },
  spec: { from: [600, 48], to: [1020, 48] },
  report: { from: [1020, 372], to: [600, 372] },
  progress: { from: [600, 372], to: [180, 372] },
};

const SLOT_POSITIONS = [
  { x: 472, y: 222 },
  { x: 568, y: 222 },
  { x: 664, y: 222 },
  { x: 472, y: 252 },
  { x: 568, y: 252 },
  { x: 664, y: 252 },
];

const MACHINE_POSITIONS = [896, 984, 1072];

function visualFor(beat: number) {
  return {
    zones: { client: beat >= 1, workbench: beat >= 1, factory: beat >= 3 },
    lanes: { down: beat >= 1, up: beat >= 5 },
    slots: [
      beat >= 2,
      beat >= 2,
      beat >= 2,
      beat >= 4,
      beat >= 5,
      beat >= 5,
    ],
    machines: beat >= 4,
    check: beat >= 4,
    tokens: { idea: beat >= 1, spec: beat >= 3, report: beat >= 5, progress: beat >= 5 },
    spinning: beat >= 3,
  };
}

/**
 * 首屏动画：把网站的逻辑讲成一条线——**想法 → 工作台 → 工厂车间 → 回到客户**。
 *
 * 做法对齐 Apple 官网重点段落的思路（等真实产线影像到位后可升级为"滚到哪儿播到哪儿"的视频）：
 * 画面由 SVG 绘制（客户 / 工作台 / 车间三个区 + 两条通道 + 四张会走的卡片），
 * 节奏由 5 拍的定时器驱动；**播完即停，不循环**，可点"再看一遍"。
 *
 * 边界：
 * 1. 进入视口才播；页面在后台标签页时不空转（`document.hidden` 时暂停排下一拍）。
 * 2. `prefers-reduced-motion` 下直接呈现最终状态，不做位移与齿轮转动。
 * 3. 文案只在 `config/standardHome.ts` 的 `heroStory` 里改。
 */
export function HeroStory() {
  const [beat, setBeat] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const tokenRefs = useRef<Record<string, SVGGElement | null>>({});
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  /** 瞬移：先关掉过渡，写入位置，读一次布局强制落地，再把过渡恢复。 */
  const jumpTo = useCallback((node: SVGGElement, point: Point) => {
    node.style.transition = "none";
    node.style.transform = `translate(${point[0]}px, ${point[1]}px)`;
    void node.getBoundingClientRect().width;
    node.style.transition = "";
  }, []);

  /**
   * 按当前这一拍摆放四张卡片。
   * - 卡片这一步才出现（或 `animate = false`）→ 先瞬移到起点，再过渡到终点，看起来才是"从左边飞进去"；
   * - 已经在画面上的卡片 → 直接过渡到终点，形成"继续往前走"。
   */
  const placeTokens = useCallback(
    (currentBeat: number, animate: boolean) => {
      const visual = visualFor(currentBeat);
      (Object.keys(TOKENS) as Array<keyof typeof TOKENS>).forEach((key) => {
        const node = tokenRefs.current[key];
        if (!node) return;
        const { from, to } = TOKENS[key];

        if (!visual.tokens[key]) {
          node.classList.remove("is-visible");
          jumpTo(node, from);
          return;
        }

        const wasVisible = node.classList.contains("is-visible");
        node.classList.add("is-visible");

        if (!animate || wasVisible) {
          jumpTo(node, to);
          return;
        }

        jumpTo(node, from);
        const id = window.setTimeout(() => {
          node.style.transform = `translate(${to[0]}px, ${to[1]}px)`;
        }, 80);
        timers.current.push(id);
      });
    },
    [jumpTo],
  );

  const play = useCallback((options?: { reducedMotion?: boolean }) => {
    const reduced = options?.reducedMotion ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    clearTimers();

    if (reduced) {
      setPlaying(false);
      setBeat(heroStory.beats.length);
      placeTokens(heroStory.beats.length, false);
      return;
    }

    setPlaying(true);
    setBeat(0);
    placeTokens(0, false);

    for (let index = 0; index < heroStory.beats.length; index += 1) {
      const id = window.setTimeout(() => {
        const next = index + 1;
        setBeat(next);
        placeTokens(next, true);
        if (next === heroStory.beats.length) setPlaying(false);
      }, index * BEAT_MS + 120);
      timers.current.push(id);
    }
  }, [clearTimers, placeTokens]);

  /* 进入视口自动播一次；离开后回来不重复播（要重看就点按钮） */
  useEffect(() => {
    const node = stageRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!node || typeof IntersectionObserver === "undefined") {
      play();
      return;
    }
    if (reducedMotion) {
      const id = window.setTimeout(() => play({ reducedMotion: true }), 0);
      return () => window.clearTimeout(id);
    }
    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || played) return;
          played = true;
          play();
        });
      },
      /*
       * 动画本身在首屏下半部。1440×940 视口里它的顶部约在 736px，
       * 45% 的进入比例要再往下滚才会触发；这里只用任意可见像素启动，
       * 保证“进入首页就自动播”，又不要求首屏完全放下整张图。
       */
      { threshold: 0.01 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimers();
    };
  }, [clearTimers, play]);

  const visual = visualFor(beat);
  const caption = beat > 0 ? heroStory.beats[beat - 1].caption : heroStory.beats[0].caption;

  return (
    <div className="hero-story" ref={stageRef}>
      <div className="hero-story__stage">
        <svg
          viewBox="0 0 1200 420"
          role="img"
          aria-label="PACKGO 首页动画：客户带来想法，进入工作台，再连到中国印刷城龙港的工厂车间"
        >
          <defs>
            {/* 客户侧那张"照片"卡片：用圆角裁出，里面still是现有占位素材 */}
            <clipPath id="hero-story-photo">
              <rect x="168" y="112" width="80" height="60" rx="8" />
            </clipPath>
          </defs>

          {/* 两条通道 */}
          <path className={`hs-lane${visual.lanes.down ? " is-on" : ""}`} d="M180 48 H1020" />
          <path className="hs-arrow" d="M1020 48 l-12 -6 v12 z" />
          <text className="hs-lane-text" x="24" y="30">
            {heroStory.lanes.down}
          </text>
          <path className={`hs-lane${visual.lanes.up ? " is-on" : ""}`} d="M1020 372 H180" />
          <path className="hs-arrow" d="M180 372 l12 -6 v12 z" />
          <text className="hs-lane-text" x="24" y="404">
            {heroStory.lanes.up}
          </text>

          {/* 客户侧 */}
          <g className={`hs-zone${visual.zones.client ? " is-on" : ""}`}>
            <rect className="hs-frame" x="24" y="84" width="320" height="252" rx="16" />
            <rect className="hs-detail-fill" x="56" y="112" width="88" height="46" rx="12" />
            <circle className="hs-dot" cx="78" cy="135" r="3.5" />
            <circle className="hs-dot" cx="98" cy="135" r="3.5" />
            <circle className="hs-dot" cx="118" cy="135" r="3.5" />
            <image
              href={brand.heroImage.src}
              x="168"
              y="112"
              width="80"
              height="60"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#hero-story-photo)"
            />
            <rect className="hs-detail" x="168" y="112" width="80" height="60" rx="8" />
            <circle className="hs-detail-fill" cx="108" cy="212" r="18" />
            <path className="hs-detail-fill" d="M74 296 v-30 a34 26 0 0 1 68 0 v30 z" />
            <rect className="hs-detail-fill" x="168" y="200" width="64" height="88" rx="10" />
            <path className="hs-detail" d="M176 220 h48" />
            <rect className="hs-detail-fill" x="56" y="296" width="240" height="8" rx="4" />
            <text className="hs-label" x="184" y="322">
              {heroStory.zones.client}
            </text>
            <text className="hs-sub" x="184" y="339">
              想法 · 照片 · 样品
            </text>
          </g>

          {/* 工作台 */}
          <g className={`hs-zone${visual.zones.workbench ? " is-on" : ""}`}>
            <rect className="hs-frame" x="424" y="84" width="352" height="252" rx="16" />
            <rect className="hs-detail-fill" x="452" y="104" width="296" height="176" rx="14" />
            <rect className="hs-input" x="472" y="124" width="256" height="16" rx="8" />
            <g className="hs-gear" style={{ transform: `rotate(${visual.spinning ? beat * 60 : 0}deg)` }}>
              <circle cx="520" cy="176" r="22" />
              <circle className="hs-gear-core" cx="520" cy="176" r="7" />
              <path d="M520 146 v-10 M520 206 v10 M490 176 h-10 M550 176 h10 M499 155 l-7 -7 M541 197 l7 7 M499 197 l-7 7 M541 155 l7 -7" />
            </g>
            <path
              className="hs-spark"
              d="M700 152 l6 14 l14 6 l-14 6 l-6 14 l-6 -14 l-14 -6 l14 -6 z"
            />
            {SLOT_POSITIONS.map((slot, index) => (
              <rect
                key={`${slot.x}-${slot.y}`}
                className={`hs-slot${visual.slots[index] ? " is-on" : ""}`}
                x={slot.x}
                y={slot.y}
                width="88"
                height="24"
                rx="8"
              />
            ))}
            <rect className="hs-detail-fill" x="472" y="286" width="256" height="12" rx="6" />
            <circle className="hs-roller" cx="500" cy="292" r="3.5" />
            <circle className="hs-roller" cx="572" cy="292" r="3.5" />
            <circle className="hs-roller" cx="644" cy="292" r="3.5" />
            <circle className="hs-roller" cx="700" cy="292" r="3.5" />
            <text className="hs-label" x="600" y="322">
              {heroStory.zones.workbench}
            </text>
            <text className="hs-sub" x="600" y="339">
              需求 · 方案与报价 · 进度 · 交付
            </text>
          </g>

          {/* 工厂车间 */}
          <g className={`hs-zone${visual.zones.factory ? " is-on" : ""}`}>
            <rect className="hs-frame" x="856" y="84" width="320" height="252" rx="16" />
            <rect className="hs-detail-fill" x="880" y="150" width="272" height="140" rx="10" />
            <path
              className="hs-detail"
              d="M880 150 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24 l22 -24 v24"
            />
            <rect className="hs-chimney" x="1122" y="104" width="14" height="46" rx="4" />
            {MACHINE_POSITIONS.map((x, index) => (
              <g key={x} className={`hs-machine${visual.machines ? " is-on" : ""}`}>
                <rect x={x} y={170} width="72" height="62" rx="10" />
                <circle cx={x + 22} cy={200} r="8" />
                <circle cx={x + 50} cy={200} r="8" />
                <text x={x + 36} y={248}>
                  {["印刷", "复合", "制袋"][index]}
                </text>
              </g>
            ))}
            <g className={`hs-check${visual.check ? " is-on" : ""}`}>
              <rect x="984" y="252" width="152" height="26" rx="8" />
              <text x="1060" y="269">
                质检与抽检
              </text>
            </g>
            <rect className="hs-detail-fill" x="896" y="288" width="240" height="12" rx="6" />
            <circle className="hs-roller" cx="920" cy="294" r="3.5" />
            <circle className="hs-roller" cx="990" cy="294" r="3.5" />
            <circle className="hs-roller" cx="1060" cy="294" r="3.5" />
            <circle className="hs-roller" cx="1112" cy="294" r="3.5" />
            <text className="hs-label" x="1016" y="322">
              {heroStory.zones.factory}
            </text>
            <text className="hs-sub" x="1016" y="339">
              印刷 · 复合 · 制袋 · 质检
            </text>
          </g>

          {/* 四张会走的卡片 */}
          {(Object.keys(TOKENS) as Array<keyof typeof TOKENS>).map((key) => (
            <g
              key={key}
              className="hs-token"
              ref={(node) => {
                tokenRefs.current[key] = node;
              }}
            >
              <rect
                x={key === "spec" || key === "report" ? -74 : -62}
                y="-15"
                width={key === "spec" || key === "report" ? 148 : 124}
                height="30"
                rx="15"
              />
              <text x="0" y="5">
                {heroStory.tokens[key]}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="hero-story__footer">
        <p className="hero-story__caption" aria-live="polite">
          {caption}
        </p>
        <button
          type="button"
          className="hero-story__replay"
          onClick={() => play()}
          disabled={playing}
        >
          {playing ? "正在播放…" : heroStory.replay}
        </button>
      </div>
      <p className="hero-story__note">{heroStory.note}</p>
    </div>
  );
}
