import Link from "next/link";
import { ViewModeSwitch } from "@/components/layout/ViewModeSwitch";
import { PackyOpenButton } from "@/components/standard-view/home/StandardPackyControls";

/**
 * 主站主导航（Owner 2026-09-23 要求把网站 2 的页头导航做进双视图主站）。
 *
 * 目标与网站 2 的信息架构一致，但**全部指向主站自己的路由/锚点**，不复制网站 2 的工程：
 * - 解决方案 / 产品品类 → 首页对应章节锚点（首页已有 #solutions、#categories；
 *   从其它页面点击会先回首页再定位）；
 * - Packy 工作台 / 材料与工艺 / 为什么选我们 / 关于 PACKGO → 主站已有的独立页面。
 */
const primaryNav = [
  { label: "解决方案", href: "/#solutions" },
  { label: "产品品类", href: "/#categories" },
  { label: "Packy 工作台", href: "/workspace" },
  { label: "材料与工艺", href: "/manufacturing" },
  { label: "为什么选我们", href: "/platform" },
  { label: "关于 PACKGO", href: "/about" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="PACKGO 首页">
        <span className="brand-mark" aria-hidden="true">P</span>
        <span>
          <strong>PACKGO</strong>
          <small>包装全案定制工作台</small>
        </span>
      </Link>

      <nav className="primary-nav" aria-label="主导航">
        {primaryNav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <span className="header-tagline">连接中国印刷城龙港制造 · 管理包装项目</span>
        <PackyOpenButton className="header-packy" label="和 Packy 聊聊" />
        <ViewModeSwitch />
        <span className="future-link" aria-disabled="true" title="当前框架阶段暂未开放">登录</span>
      </div>
    </header>
  );
}
