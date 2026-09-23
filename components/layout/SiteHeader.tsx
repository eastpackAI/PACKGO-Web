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
        <Link href="/solutions/coffee-packaging">解决方案</Link>
        <Link href="/products/flexible">产品品类</Link>
        <Link href="/manufacturing">材料与制造</Link>
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
