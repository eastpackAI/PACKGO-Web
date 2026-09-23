"use client";

/**
 * 标准视图 · Packy 入口（唯一入口）
 *
 * 标准视图首页与工作台里的所有 Packy 动作都走这里：只派发浏览器事件，
 * 由共享 `ExperienceProvider`（体验提供器）侧接桥到**同一个** Packy 会话。
 *
 * 为什么这样做：
 * - 网站 2 自带的 `PackyDrawer` 是一套独立会话与本地关键词回复，直接搬过来会产生
 *   「一个站点两个 Packy」的事实冲突；这里只保留入口，不保留第二套会话。
 * - 真正的回复与状态由主站共享会话负责，本文件不写任何关键词假回复、不调用 AI API。
 */

export const PACKY_OPEN_EVENT = "packy:open";
export const PACKY_ASK_EVENT = "packy:ask";
export const PACKY_NOTE_EVENT = "packy:note";

type PackyAskDetail = { text: string };
type PackyNoteDetail = { text: string };

function dispatchPackyEvent<T>(name: string, detail?: T) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(detail === undefined ? new CustomEvent(name) : new CustomEvent<T>(name, { detail }));
}

/** 打开共享的 Packy 会话（不跳转页面）。 */
export function PackyOpenButton({
  label,
  className = "btn btn--primary",
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      data-packy-keep-open
      onClick={() => dispatchPackyEvent(PACKY_OPEN_EVENT)}
    >
      {label}
    </button>
  );
}

/** 直接把一个问题送进共享的 Packy 会话（页面上的「问 Packy」都用这个）。 */
export function askPacky(text: string) {
  const value = text.trim();
  if (!value) return;
  dispatchPackyEvent<PackyAskDetail>(PACKY_ASK_EVENT, { text: value });
}

/** 只记一条观察，不产生回复（例如「客户选了 10,000 档」）。 */
export function noteToPacky(text: string) {
  const value = text.trim();
  if (!value) return;
  dispatchPackyEvent<PackyNoteDetail>(PACKY_NOTE_EVENT, { text: value });
}
