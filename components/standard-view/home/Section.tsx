import Link from "next/link";
import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  summary?: string;
  children: ReactNode;
  tone?: "default" | "muted" | "ink";
  /**
   * 版块右上角的站内入口。
   * 首页是总览，每个栏目都要能走到对应独立页面；没有对应页面时不要传这个参数，
   * 避免出现「看着能点、其实没有链接」的样式。
   */
  action?: { label: string; href: string };
}

/**
 * 统一的版块容器：眉标 + 标题 + 一句话说明 + 内容。
 * 版块节奏（留白、字号、栅格）是全站一致性的基础。
 */
export function Section({
  id,
  eyebrow,
  title,
  summary,
  children,
  tone = "default",
  action,
}: SectionProps) {
  return (
    <section id={id} className={`section section--${tone}`}>
      <div className="container">
        {(eyebrow || title) && (
          <header className="section__head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="section__title">{title}</h2>}
            {summary && <p className="section__summary">{summary}</p>}
            {action && (
              <p className="section__action">
                <Link className="section__action-link" href={action.href}>
                  {action.label}
                  <span className="section__action-arrow" aria-hidden>
                    →
                  </span>
                </Link>
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
