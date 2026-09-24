"use client";

import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Packy 常驻入口（右下角）。
 *
 * 2026-09-24 Owner 要求：右下角要有一个像 Cubit "Chat with Cubit" 那样**常驻**的 Packy 入口，
 * 客户在任何一页都能一眼看到"有人陪着"，不用先去页头找按钮。
 *
 * 三条约束：
 * 1. 打开的是**同一个**共享 Packy 会话（走 ExperienceProvider 的 openConversation），
 *    不新开第二套对话、不复制第二份消息；
 * 2. 完整对话面板打开（或已固定）时**自动隐藏**，不跟面板叠在一起；
 * 3. 带 `data-packy-keep-open`，不会被"未固定时点面板外即收起"的逻辑误关
 *    （见 `ConversationDrawer` 的点外收起实现）。
 *
 * 空间视图不显示它 —— 那边已经有自己的 Packy 常驻条（`PackyPresence`）。
 */
export function PackyLauncher() {
  const { actions, conversationVisibility } = useExperience();
  const isOpen = conversationVisibility === "open";

  return (
    <button
      type="button"
      className={`packy-launcher${isOpen ? " is-open" : ""}`}
      data-packy-keep-open
      onClick={actions.openConversation}
      aria-label="和 Packy 聊聊（打开完整对话）"
    >
      <span className="packy-launcher__orb" aria-hidden="true">P</span>
      <span className="packy-launcher__label">和 Packy 聊聊</span>
      <span className="packy-launcher__dot" aria-hidden="true" />
    </button>
  );
}
