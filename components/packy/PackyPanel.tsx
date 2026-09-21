"use client";

import { useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import { getIndustryById } from "@/config/industries";
import { useExperience } from "@/components/providers/ExperienceProvider";

const MIN_WIDTH = 280;
const MAX_WIDTH = 480;

export function PackyPanel() {
  const {
    packyState,
    setPackyState,
    selectedIndustry,
    viewMode,
    activeFocus,
    draft,
    setDraft,
    messages,
    sendMessage,
  } = useExperience();
  const [width, setWidth] = useState(336);
  const industry = getIndustryById(selectedIndustry);

  const resizeFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const startX = event.clientX;
    const startWidth = width;

    const onMove = (moveEvent: PointerEvent) => {
      const nextWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth + startX - moveEvent.clientX));
      setWidth(nextWidth);
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const resizeFromKeyboard = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    setWidth((current) => {
      const direction = event.key === "ArrowLeft" ? 16 : -16;
      return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, current + direction));
    });
  };

  const submitLocalMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!draft.trim()) return;
    sendMessage();
  };

  if (packyState === "collapsed") {
    return (
      <aside className="packy-panel is-collapsed" aria-label="Packy 包装助手">
        <button type="button" onClick={() => setPackyState("open")} aria-label="展开 Packy 面板">
          <strong>P</strong>
          <span>Packy</span>
        </button>
      </aside>
    );
  }

  return (
    <aside className="packy-panel" style={{ width }} aria-labelledby="packy-title">
      <div
        className="packy-resize-handle"
        role="separator"
        aria-label="调整 Packy 面板宽度"
        aria-orientation="vertical"
        aria-valuemin={MIN_WIDTH}
        aria-valuemax={MAX_WIDTH}
        aria-valuenow={width}
        tabIndex={0}
        onPointerDown={resizeFromPointer}
        onKeyDown={resizeFromKeyboard}
      />

      <header className="packy-header">
        <div>
          <span className="packy-orb" aria-hidden="true">P</span>
          <span>
            <strong id="packy-title">Packy</strong>
            <small>包装助手</small>
          </span>
        </div>
        <button type="button" onClick={() => setPackyState("collapsed")} aria-label="收起 Packy 面板">
          收起
        </button>
      </header>

      <div className="packy-context" aria-label="当前共享页面上下文">
        <span>共享上下文</span>
        <dl>
          <div><dt>视图</dt><dd>{viewMode === "spatial" ? "空间视图" : "标准视图"}</dd></div>
          <div><dt>行业</dt><dd>{industry.shortTitle}</dd></div>
          <div><dt>焦点</dt><dd>{activeFocus.detail}</dd></div>
        </dl>
      </div>

      <div className="packy-messages" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`message is-${message.role}`}>
            <span>{message.label}</span>
            <p>{message.body}</p>
          </article>
        ))}
      </div>

      <form className="packy-input" onSubmit={submitLocalMessage}>
        <label htmlFor="packy-message">询问当前页面内容</label>
        <div>
          <input
            id="packy-message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="输入本地演示消息……"
          />
          <button type="submit">发送</button>
        </div>
        <small>仅用于本地预览 · 未调用任何接口</small>
      </form>
    </aside>
  );
}
