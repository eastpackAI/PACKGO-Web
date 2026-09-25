"use client";

import { useEffect, useRef, useState } from "react";
import { workbenchFlow } from "@/config/standardHome";
import { Section } from "./Section";

const SLOTS = [
  { x: 44, y: 96 },
  { x: 132, y: 96 },
  { x: 220, y: 96 },
  { x: 44, y: 124 },
  { x: 132, y: 124 },
  { x: 220, y: 124 },
];

/**
 * 首页「工作台六步」滚动段落。
 *
 * 照搬 Apple 官网重点段落的做法（2026-09-25 实测）：
 * **左边一屏钉住（`position: sticky`）+ 页面继续滚 → 用滚动位置驱动右边逐步点亮**。
 * 苹果用视频做这件事，我们先用一张会亮的示意图；等真实产线素材到位再换成视频。
 *
 * 交互与可访问性：
 * - 步骤列表是常规文档流，**不依赖脚本也能读**；脚本只负责"当前走到哪一步"的高亮。
 * - `prefers-reduced-motion` 下不做位移，只切换高亮。
 * - 钉住只在桌面宽度生效，窄屏（≤900px）退回普通纵向列表。
 */
export function WorkbenchFlow() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<Array<HTMLLIElement | null>>([]);
  const total = workbenchFlow.steps.length;

  useEffect(() => {
    const nodes = stepRefs.current.filter((node): node is HTMLLIElement => Boolean(node));
    if (!nodes.length) return;

    const updateActiveFromViewport = () => {
      const anchor = window.innerHeight * 0.48;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      nodes.forEach((node, index) => {
        const rect = node.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - anchor);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });

      setActive(closest);
    };

    updateActiveFromViewport();
    window.addEventListener("scroll", updateActiveFromViewport, { passive: true });
    window.addEventListener("resize", updateActiveFromViewport);

    return () => {
      window.removeEventListener("scroll", updateActiveFromViewport);
      window.removeEventListener("resize", updateActiveFromViewport);
    };
  }, []);

  const current = workbenchFlow.steps[active] ?? workbenchFlow.steps[0];
  const progress = Math.round(((active + 1) / total) * 100);

  return (
    <Section
      id="workbench-flow"
      eyebrow={workbenchFlow.eyebrow}
      title={workbenchFlow.title}
      summary={workbenchFlow.summary}
      tone="muted"
    >
      <div className="flow">
        <div className="flow__visual">
          <div className="flow__panel">
            <p className="flow__route">
              <span>客户</span>
              <i aria-hidden>→</i>
              <span className="is-here">PACKGO 工作台</span>
              <i aria-hidden>→</i>
              <span>中国印刷城 · 龙港工厂</span>
            </p>

            {/* 示意图：工作台 + 六个工位 + 传送带；当前这一步的工位高亮 */}
            <svg
              className="flow__drawing"
              viewBox="0 0 320 200"
              role="img"
              aria-label={`工作台示意图：当前进行到第 ${active + 1} 步「${current.title}」`}
            >
              <rect className="flow-draw__frame" x="24" y="16" width="272" height="132" rx="16" />
              <rect className="flow-draw__input" x="44" y="34" width="232" height="16" rx="8" />
              {/* 齿轮每走一步转 60°：画面里"机器在动"，但不做循环动画 */}
              <g className="flow-draw__gear" style={{ transform: `rotate(${active * 60}deg)` }}>
                <circle cx="76" cy="72" r="18" />
                <circle cx="76" cy="72" r="6" className="flow-draw__gear-core" />
                <path d="M76 48 v-8 M76 104 v8 M52 72 h-8 M100 72 h8 M59 55 l-6 -6 M93 89 l6 6 M59 89 l-6 6 M93 55 l6 -6" />
              </g>
              <path
                className="flow-draw__spark"
                d="M244 56 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 z"
              />
              {SLOTS.map((slot, index) => (
                <rect
                  key={`${slot.x}-${slot.y}`}
                  className={`flow-draw__slot${index === active ? " is-active" : ""}`}
                  x={slot.x}
                  y={slot.y}
                  width="56"
                  height="22"
                  rx="7"
                />
              ))}
              <rect className="flow-draw__belt" x="44" y="160" width="232" height="10" rx="5" />
              <circle className="flow-draw__roller" cx="64" cy="165" r="3" />
              <circle className="flow-draw__roller" cx="116" cy="165" r="3" />
              <circle className="flow-draw__roller" cx="168" cy="165" r="3" />
              <circle className="flow-draw__roller" cx="220" cy="165" r="3" />
            </svg>

            <ol className="flow__dots">
              {workbenchFlow.steps.map((step, index) => (
                <li key={step.no} className={index === active ? "is-active" : undefined}>
                  {step.no}
                </li>
              ))}
            </ol>

            <p className="flow__now" aria-live="polite">
              <strong>
                {current.no} {current.title}
              </strong>
              <span>{current.actor}</span>
            </p>

            <div
              className="flow__bar"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={active + 1}
              aria-label="工作台进度"
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <ol className="flow__steps">
          {workbenchFlow.steps.map((step, index) => (
            <li
              key={step.no}
              ref={(node) => {
                stepRefs.current[index] = node;
              }}
              data-step-index={index}
              className={`flow__step${index === active ? " is-active" : ""}`}
            >
              <p className="flow__step-no">{step.no}</p>
              <h3 className="flow__step-title">{step.title}</h3>
              <p className="flow__step-actor">
                <span aria-hidden>◎</span>
                {step.actor}
              </p>
              <p className="flow__step-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      <p className="footnote">{workbenchFlow.packyNote}</p>
      <p className="footnote footnote--dim">{workbenchFlow.liveNote}</p>
    </Section>
  );
}
