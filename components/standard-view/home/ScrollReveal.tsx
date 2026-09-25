"use client";

import { useEffect } from "react";

/**
 * 逐条浮现（Apple 官网 "StaggeredFadeIn" 那一招，2026-09-25 实测其页面后照搬思路）。
 *
 * 做法：元素标 `data-reveal`，需要错开时再给 `--reveal-delay: 0/1/2…`；
 * 进入视口后加 `.is-revealed`，由 CSS 完成「透明 + 下移 → 可见」的过渡。
 *
 * 边界：
 * 1. **不靠 JS 也看得见**——隐藏样式挂在 `.standard-home.js-reveal` 作用域下，
 *    这个类由本组件挂上；脚本没跑起来时内容照常显示（不会白屏）。
 * 2. 尊重 `prefers-reduced-motion`：直接显示，不做位移。
 * 3. 只在标准视图首页挂一次（`StandardHomeView` 里），不碰空间视图。
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".standard-home");
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!nodes.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((node) => node.classList.add("is-revealed"));
      return;
    }

    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      /* 视口底部留 12% 余量：元素露头一点就开始浮现，不会等到完全进来才动 */
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
