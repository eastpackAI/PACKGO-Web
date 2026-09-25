"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { getIndustryById } from "@/config/industries";
import { packyDemoActions } from "@/config/spatial";
import { useExperience } from "@/components/providers/ExperienceProvider";

/**
 * Conversation Drawer｜右侧完整对话抽屉。
 * 默认隐藏，可展开、关闭、固定；与主界面 Packy 共用同一个 session / draft / message thread / context。
 * 只做本地占位交互，不调用 AI API。
 */
export function ConversationDrawer() {
  const {
    actions,
    activeDetail,
    activeFocus,
    conversationPinned,
    conversationVisibility,
    currentSpace,
    dispatchAction,
    draft,
    lastAction,
    messages,
    selectedIndustry,
    sendMessage,
    setDraft,
  } = useExperience();

  const isOpen = conversationVisibility === "open";
  const industry = getIndustryById(selectedIndustry);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      const active = document.activeElement;
      returnFocusRef.current = active instanceof HTMLElement ? active : null;
      /*
       * 抽屉从 hidden 变成 visible 之前，浏览器不接受对该面板里输入框的 focus
       * （实测：面板打开后输入框存在，但焦点仍留在触发按钮上）。
       * 因此等滑入过渡结束再聚焦；超时兜底保证过渡被中断时也能聚焦。
       */
      const drawer = drawerRef.current;
      let cancelled = false;
      const focusInput = () => {
        if (!cancelled) inputRef.current?.focus();
      };
      const onTransitionEnd = (event: TransitionEvent) => {
        if (event.target === drawer) focusInput();
      };
      drawer?.addEventListener("transitionend", onTransitionEnd);
      const fallback = window.setTimeout(focusInput, 600);
      return () => {
        cancelled = true;
        window.clearTimeout(fallback);
        drawer?.removeEventListener("transitionend", onTransitionEnd);
      };
    }

    returnFocusRef.current?.focus();
    returnFocusRef.current = null;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") actions.closeConversation();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [actions, isOpen]);

  /**
   * 未固定时：点击面板以外任何地方都收起（恢复原设计）。
   * 三种情况不算"外面"：
   * 1. 点击落在抽屉面板内部；
   * 2. 点击落在 Packy 自己的页面控件上（"和 Packy 聊聊""问 Packy""打开完整对话"、底部常驻条等，
   *    统一用 `data-packy-keep-open` 标记）—— 这些控件本来就会驱动 Packy，点它们顺手把面板关掉是反效果；
   * 3. 已固定（`固定` 按钮按下）时，点外部不收起，面板留在原地。
   */
  useEffect(() => {
    if (!isOpen || conversationPinned) return;

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (drawerRef.current?.contains(target)) return;
      if (target.closest("[data-packy-keep-open]")) return;
      actions.closeConversation();
    };

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [actions, conversationPinned, isOpen]);

  const submitLocalDraft = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    sendMessage();
  };

  return (
    <aside
      ref={drawerRef}
      className={`conversation-drawer${isOpen ? " is-open" : ""}${
        conversationPinned ? " is-pinned" : ""
      }`}
      aria-label="Packy 完整对话"
      aria-hidden={!isOpen}
    >
      {isOpen && (
        <div className="conversation-drawer__inner">
          <header className="conversation-drawer__header">
            <div className="conversation-drawer__title">
              <span className="packy-orb" aria-hidden="true">
                P
              </span>
              <span>
                <strong>Packy 完整对话</strong>
                <small>与主界面共用会话、输入、消息和上下文</small>
              </span>
            </div>
            <div className="conversation-drawer__controls">
              <button
                type="button"
                aria-pressed={conversationPinned}
                onClick={() => actions.pinConversation()}
              >
                {conversationPinned ? "已固定" : "固定"}
              </button>
              <button type="button" onClick={() => actions.closeConversation()}>
                关闭
              </button>
            </div>
          </header>

          <dl className="conversation-drawer__context" aria-label="共享上下文">
            <div>
              <dt>空间</dt>
              <dd>{currentSpace === "lobby" ? "大厅" : currentSpace === "showroom" ? "展厅" : currentSpace === "product" ? "产品焦点" : "项目空间"}</dd>
            </div>
            <div>
              <dt>行业</dt>
              <dd>{industry.shortTitle}</dd>
            </div>
            <div>
              <dt>焦点</dt>
              <dd>{activeFocus.detail}</dd>
            </div>
            <div>
              <dt>内容层级</dt>
              <dd>{activeDetail ?? "概览"}</dd>
            </div>
            <div>
              <dt>最近操作</dt>
              <dd>{lastAction ? "已同步页面操作" : "暂无"}</dd>
            </div>
          </dl>

          <div className="conversation-drawer__messages" role="log" aria-live="polite">
            {messages.map((message) => (
              <article key={message.id} className={`message is-${message.role}`}>
                <span>{message.label}</span>
                <p>{message.body}</p>
              </article>
            ))}
          </div>

          <div className="conversation-drawer__demos">
            <span>本地演示操作 · 与页面点击共用同一动作层</span>
            <div role="group" aria-label="Packy 本地演示操作">
              {packyDemoActions.map((demo) => (
                <button
                  key={demo.id}
                  type="button"
                  title={demo.description}
                  onClick={() => dispatchAction(demo.action, demo.argument, "packy-demo")}
                >
                  {demo.label}
                </button>
              ))}
            </div>
          </div>

          <form className="conversation-drawer__input" onSubmit={submitLocalDraft}>
            <label htmlFor="packy-drawer-draft">共享输入</label>
            <div>
              <input
                id="packy-drawer-draft"
                ref={inputRef}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="输入你想了解的包装问题……"
              />
              <button type="submit">发送</button>
            </div>
            <small>仅用于本地预览 · 未调用 AI，也不会自动生成回复</small>
          </form>
        </div>
      )}
    </aside>
  );
}
