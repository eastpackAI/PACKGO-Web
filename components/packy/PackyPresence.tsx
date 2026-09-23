"use client";

import { useState, type FormEvent } from "react";
import { packyDemoActions } from "@/config/spatial";
import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Packy Presence｜主界面 Packy。
 * 轻量常驻条：当前焦点说明、Agent 状态、共享输入，以及证明 Packy 调用同一 Action Layer 的本地演示按钮。
 * 不调用任何 AI API。
 */
export function PackyPresence() {
  const {
    actions,
    activeFocus,
    conversationVisibility,
    dispatchAction,
    draft,
    lastAction,
    messages,
    sendMessage,
    setDraft,
  } = useExperience();
  const [localNotice, setLocalNotice] = useState("");

  const presenceDemos = packyDemoActions.filter((demo) => demo.showInPresence);
  const latestMessage = messages[messages.length - 1];

  const submitLocalDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) {
      setLocalNotice("输入内容为空，没有发送消息，也没有调用 AI。 ");
      return;
    }
    sendMessage();
    setLocalNotice("已加入当前本地对话。本演示未调用 AI，也不会自动生成回复。");
    if (conversationVisibility !== "open") actions.openConversation();
  };

  // `data-packy-keep-open`：Packy 自己的常驻条不算"面板以外"，
  // 在未固定状态下点它不该把刚打开的完整对话收起（2026-09-23）。
  return (
    <section className="packy-presence" data-packy-keep-open aria-label="Packy · 共享焦点包装助手">
      <div className="packy-presence__identity">
        <span className="packy-orb" aria-hidden="true">
          P
        </span>
        <span className="packy-presence__name">
          <strong>Packy</strong>
          <small>本地预览 · 未接入 AI</small>
        </span>
        <span className="packy-presence__agent" role="status">
          {lastAction ? "页面操作已同步" : "演示助手 · 等待你的操作"}
        </span>
      </div>

      <p className="packy-presence__focus" aria-live="polite">
        <span>共享焦点 · {activeFocus.detail}</span>
        <small>{latestMessage ? latestMessage.body : activeFocus.placeholder}</small>
      </p>

      <form className="packy-presence__input" onSubmit={submitLocalDraft}>
        <label htmlFor="packy-presence-draft">共享输入</label>
        <div>
          <input
            id="packy-presence-draft"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="输入你想了解的包装问题……"
          />
          <button type="submit">发送</button>
        </div>
        <small>
          {localNotice || "本地演示 · 与完整对话共用同一输入和对话记录"}
        </small>
      </form>

      <div className="packy-presence__actions">
        <span>本地演示操作 · 与页面点击共用同一动作层</span>
        <div role="group" aria-label="Packy 本地演示操作">
          {presenceDemos.map((demo) => (
            <button
              key={demo.id}
              type="button"
              title={demo.description}
              onClick={() => dispatchAction(demo.action, demo.argument, "packy-demo")}
            >
              {demo.label}
            </button>
          ))}
          <button type="button" className="is-quiet" onClick={() => actions.openConversation()}>
            完整对话
          </button>
        </div>
      </div>
    </section>
  );
}
