import Link from "next/link";
import { ViewModeSwitch } from "@/components/layout/ViewModeSwitch";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="PACKGO 首页">
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>PACKGO</strong>
          <small>让包装与制造清晰可见</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="主导航">
        <Link href="/solutions/coffee-packaging">包装方案</Link>
        <Link href="/#story">PACKGO 如何运作</Link>
        <Link href="/solutions/cosmetics-packaging">应用行业</Link>
      </nav>

      <div className="header-actions">
        <ViewModeSwitch />
        <span className="future-link" aria-disabled="true" title="当前框架阶段暂未开放">
          登录 · 后续开放
        </span>
      </div>
    </header>
  );
}
