"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Section } from "@/components/standard-view/home/Section";
import { PackyOpenButton } from "@/components/standard-view/home/StandardPackyControls";
import { WorkbenchSection } from "@/components/standard-view/home/WorkbenchSection";
import { industries as industryRoutes } from "@/config/industries";
import {
  about,
  brand,
  formatCapabilities,
  formats,
  generalShowroom,
  industries as showrooms,
  industryRoute,
  manufacturing,
  pages,
  platform,
  productRoutes,
  workbench,
  type ProductId,
} from "@/config/standardHome";

/**
 * 标准视图 · 独立内容页面
 *
 * 设计要点（与 AGENTS.md / 统一设计总纲一致）：
 * 1. **不是第二套网站**：沿用本站页头、双视图切换与 `.standard-home` 设计变量，
 *    不引入网站 2 的独立总导航或独立聊天会话。
 * 2. **正常网页结构**：每页有真正的 `h1`、`h2` 标题与 `next/link` 链接，
 *    正常 URL、浏览器返回、可访问性都成立。
 * 3. **内容只有一个来源**：全部来自 `config/standardHome.ts` 与共享
 *    `config/industries.ts`（只用其中的 id / route 做路径匹配）；
 *    本文件只做「分页表达」，不新增规格、案例或产线事实。
 * 4. **视觉作用域**：整页包在 `.standard-home .standard-detail` 内，
 *    独立页面样式只写在 `styles/standard-pages.css`（由 `app/globals.css` 统一汇入），
 *    空间视图零影响。
 */

/* ---------- 路径匹配 ---------- */

/** 部署子路径前缀（GitHub Pages 项目站点会带上 `/<仓库名>`）。 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** 统一路径：去掉部署子路径与结尾斜杠，便于按路径匹配路由。 */
function normalizePath(input?: string | null): string {
  let value = input && input.length > 0 ? input : "/";
  if (BASE_PATH && value.startsWith(BASE_PATH)) value = value.slice(BASE_PATH.length);
  if (!value.startsWith("/")) value = `/${value}`;
  const trimmed = value.replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : "/";
}

const productIds = Object.keys(productRoutes) as ProductId[];

function productIdFromPath(path: string): ProductId | undefined {
  return productIds.find((id) => productRoutes[id] === path);
}

/* ---------- 通用零件 ---------- */

interface Crumb {
  label: string;
  href?: string;
}

function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="detail-crumbs" aria-label="当前位置">
      {items.map((item, index) => (
        <span key={`${item.label}-${index}`}>
          {index > 0 ? (
            <span className="detail-crumbs__sep" aria-hidden>
              /
            </span>
          ) : null}
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function DetailLink({
  href,
  title,
  latin,
  body,
  enter,
}: {
  href: string;
  title: string;
  latin?: string;
  body?: string;
  enter: string;
}) {
  return (
    <Link className="detail-link" href={href}>
      <span className="detail-link__title">{title}</span>
      {latin ? <span className="detail-link__latin">{latin}</span> : null}
      {body ? <span className="detail-link__body">{body}</span> : null}
      <span className="detail-link__enter">
        {enter}
        <span aria-hidden>→</span>
      </span>
    </Link>
  );
}

function DetailFoot() {
  return (
    <footer className="detail-foot">
      <div className="container detail-foot__row">
        <Link className="btn btn--outline" href="/">
          回到首页
        </Link>
        <span className="detail-foot__note">
          {brand.name} · {brand.tagline}
        </span>
      </div>
    </footer>
  );
}

interface DetailShellProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  latin?: string;
  summary?: string;
  media?: ReactNode;
  children?: ReactNode;
}

/**
 * 独立页面的统一外壳：面包屑 + 主标题 + 说明 + 主入口 + 正文 + 返回条。
 * 主入口与首页一致，走共享 Packy 会话（不新开第二套对话）。
 */
function DetailShell({ crumbs, eyebrow, title, latin, summary, media, children }: DetailShellProps) {
  return (
    <div className="standard-home standard-detail">
      <header className="detail-hero">
        <div
          className={`container detail-hero__inner${media ? "" : " detail-hero__inner--text"}`}
        >
          <div className="detail-hero__text">
            <Crumbs items={crumbs} />
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1 className="detail-hero__title">{title}</h1>
            {latin ? <p className="detail-hero__latin">{latin}</p> : null}
            {summary ? <p className="detail-hero__summary">{summary}</p> : null}
            <p className="detail-hero__context">{brand.detailIntro}</p>
            <div className="detail-hero__actions">
              <PackyOpenButton className="btn btn--primary btn--lg" label={brand.primaryCta} />
              <Link className="btn btn--outline btn--lg" href="/">
                回到首页
              </Link>
            </div>
          </div>

          {media ? <figure className="detail-hero__media">{media}</figure> : null}
        </div>
      </header>

      {children}

      <DetailFoot />
    </div>
  );
}

/* ---------- 行业展厅页（/solutions/<industry>） ---------- */

function IndustryDetail({ industryId }: { industryId: string }) {
  const showroom = showrooms.find((item) => item.id === industryId);
  if (!showroom) return <UnknownDetail path={`/solutions/${industryId}-packaging`} />;

  const others = showrooms.filter((item) => item.id !== showroom.id);

  return (
    <DetailShell
      crumbs={[
        { label: "首页", href: "/" },
        { label: "行业解决方案展厅", href: "/#solutions" },
        { label: showroom.title },
      ]}
      eyebrow="行业解决方案展厅"
      title={showroom.title}
      latin={showroom.latin}
      summary={showroom.summary}
    >
      <Section eyebrow="展厅内容" title="这个展厅里包含什么">
        <div className="detail-panel">
          <ul className="tick-list">
            {showroom.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="相关页面" title="可以往下走的包装形态" tone="muted">
        <div className="detail-links detail-links--4">
          {formats.map((format) => (
            <DetailLink
              key={format.id}
              href={productRoutes[format.id]}
              title={format.title}
              latin={format.latin}
              body={format.summary}
              enter="查看产品页"
            />
          ))}
        </div>
      </Section>

      <Section
        eyebrow="通用展厅"
        title={generalShowroom.title}
        summary={generalShowroom.summary}
      >
        <div className="detail-panel">
          <ul className="chip-list">
            {generalShowroom.groups.map((group) => (
              <li key={group}>{group}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="继续浏览" title="其他行业展厅" tone="muted">
        <div className="detail-links detail-links--3">
          {others.map((item) => (
            <DetailLink
              key={item.id}
              href={industryRoute(item.id)}
              title={item.title}
              latin={item.latin}
              body={item.summary}
              enter="进入展厅"
            />
          ))}
        </div>
      </Section>
    </DetailShell>
  );
}

/* ---------- 产品形态页（/products/<id>） ---------- */

function ProductDetail({ productId }: { productId: ProductId }) {
  const format = formats.find((item) => item.id === productId);
  if (!format) return <UnknownDetail path={productRoutes[productId]} />;

  const others = formats.filter((item) => item.id !== format.id);

  return (
    <DetailShell
      crumbs={[
        { label: "首页", href: "/" },
        { label: "主要包装形态", href: "/#formats" },
        { label: format.title },
      ]}
      eyebrow="主要包装形态"
      title={format.title}
      latin={format.latin}
      summary={format.summary}
      media={
        <Image
          src={format.image}
          alt={`${format.title}示例`}
          width={1536}
          height={1536}
          sizes="(max-width: 900px) 100vw, 46vw"
          className="detail-hero__image"
        />
      }
    >
      <Section eyebrow="这个形态" title="常见方向">
        <div className="detail-panel">
          <ul className="tick-list">
            {format.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section eyebrow="配套能力" title="往下走的三个环节" tone="muted">
        <div className="grid grid--3 capability-row">
          {formatCapabilities.map((item) => (
            <div key={item.title} className="capability">
              <h3 className="capability__title">{item.title}</h3>
              <p className="capability__body">{item.note}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="相关页面" title="同一项目里的其他形态">
        <div className="detail-links detail-links--3">
          {others.map((item) => (
            <DetailLink
              key={item.id}
              href={productRoutes[item.id]}
              title={item.title}
              latin={item.latin}
              body={item.summary}
              enter="查看产品页"
            />
          ))}
        </div>
      </Section>

      <Section eyebrow="应用行业" title="按行业进厅" tone="muted">
        <div className="detail-links detail-links--4">
          {showrooms.map((item) => (
            <DetailLink
              key={item.id}
              href={industryRoute(item.id)}
              title={item.title}
              latin={item.latin}
              body={item.summary}
              enter="进入展厅"
            />
          ))}
        </div>
      </Section>
    </DetailShell>
  );
}

/* ---------- 真实制造页（/manufacturing） ---------- */

function ManufacturingDetail() {
  return (
    <DetailShell
      crumbs={[{ label: "首页", href: "/" }, { label: manufacturing.title }]}
      eyebrow={manufacturing.eyebrow}
      title={manufacturing.title}
      summary={manufacturing.summary}
    >
      <Section>
        <figure className="wide-media">
          <Image
            src={manufacturing.image.src}
            alt={manufacturing.image.alt}
            width={2016}
            height={1152}
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="wide-media__image"
          />
          <figcaption className="media-note">{manufacturing.image.note}</figcaption>
        </figure>

        <div className="grid grid--4">
          {manufacturing.pillars.map((pillar) => (
            <article key={pillar.title} className="card">
              <h2 className="card__title">{pillar.title}</h2>
              <p className="card__body">{pillar.body}</p>
            </article>
          ))}
        </div>

        <p className="footnote">{manufacturing.footnote}</p>
      </Section>

      <Section eyebrow="相关内容" title="继续了解" tone="muted">
        <div className="detail-links detail-links--2">
          <DetailLink
            href={pages.platform}
            title={platform.title}
            latin={platform.eyebrow}
            body={platform.summary}
            enter="查看平台页"
          />
          <DetailLink
            href={pages.about}
            title={about.title}
            latin={about.eyebrow}
            body={about.body[0]}
            enter="查看关于页"
          />
        </div>
      </Section>
    </DetailShell>
  );
}

/* ---------- 平台能力页（/platform） ---------- */

function PlatformDetail() {
  return (
    <DetailShell
      crumbs={[{ label: "首页", href: "/" }, { label: platform.title }]}
      eyebrow={platform.eyebrow}
      title={platform.title}
      summary={platform.summary}
    >
      <Section tone="ink">
        <div className="grid grid--4 platform-grid">
          {platform.modules.map((module) => (
            <article key={module.no} className="module">
              <span className="module__no">{module.no}</span>
              <h2 className="module__title">{module.title}</h2>
              <p className="module__body">{module.body}</p>
            </article>
          ))}
        </div>
        <p className="platform__highlight">{platform.highlight}</p>
      </Section>

      <Section eyebrow="相关内容" title="继续了解">
        <div className="detail-links detail-links--2">
          <DetailLink
            href={pages.manufacturing}
            title={manufacturing.title}
            latin={manufacturing.eyebrow}
            body={manufacturing.summary}
            enter="查看制造页"
          />
          <DetailLink
            href={pages.about}
            title={about.title}
            latin={about.eyebrow}
            body={about.body[0]}
            enter="查看关于页"
          />
        </div>
      </Section>
    </DetailShell>
  );
}

/* ---------- 关于页（/about） ---------- */

function AboutDetail() {
  return (
    <DetailShell
      crumbs={[{ label: "首页", href: "/" }, { label: about.eyebrow }]}
      eyebrow={about.eyebrow}
      title={about.title}
    >
      <Section>
        <div className="about">
          <div className="about__body">
            {about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="about__facts">
            {about.facts.map((fact) => (
              <div key={fact.k}>
                <dt>{fact.k}</dt>
                <dd>{fact.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section eyebrow="相关内容" title="继续了解" tone="muted">
        <div className="detail-links detail-links--3">
          <DetailLink
            href={pages.manufacturing}
            title={manufacturing.title}
            latin={manufacturing.eyebrow}
            body={manufacturing.summary}
            enter="查看制造页"
          />
          <DetailLink
            href={pages.platform}
            title={platform.title}
            latin={platform.eyebrow}
            body={platform.summary}
            enter="查看平台页"
          />
          <DetailLink
            href={pages.workspace}
            title={workbench.title}
            latin={workbench.eyebrow}
            body={workbench.summary}
            enter="打开工作台"
          />
        </div>
      </Section>
    </DetailShell>
  );
}

/* ---------- Packy 工作台页（/workspace） ---------- */

function WorkspaceDetail() {
  return (
    <div className="standard-home standard-detail">
      <div className="container detail-crumbs-bar">
        <Crumbs items={[{ label: "首页", href: "/" }, { label: workbench.eyebrow }]} />
      </div>

      {/*
        工作台正文由 `WorkbenchSection` 呈现（它自带眉标 + 标题 + 说明，避免重复）。
        这里保留本页唯一的 h1：HTML 结构与读屏都有正常的页面标题。
      */}
      <h1 className="sr-only">{workbench.title}</h1>

      <WorkbenchSection showWorkspaceLink={false} />

      <DetailFoot />
    </div>
  );
}

/* ---------- 兜底：没有对应内容的地址 ---------- */

function UnknownDetail({ path }: { path: string }) {
  return (
    <DetailShell
      crumbs={[{ label: "首页", href: "/" }]}
      eyebrow="标准视图"
      title="这个地址还没有对应内容"
      summary={`当前地址 ${path} 还没有对应的标准视图页面。可以先回到首页，或从下面这些页面继续浏览。`}
    >
      <Section>
        <div className="detail-links detail-links--2">
          <DetailLink
            href="/"
            title={brand.wordmark}
            latin={brand.industryNote}
            body={brand.support}
            enter="回到首页"
          />
          <DetailLink
            href={pages.workspace}
            title={workbench.title}
            latin={workbench.eyebrow}
            body={workbench.summary}
            enter="打开工作台"
          />
        </div>
      </Section>
    </DetailShell>
  );
}

/* ---------- 对外入口 ---------- */

interface StandardDetailViewProps {
  /**
   * 当前路径（通常由 `AppShell` 传入 `usePathname()` 的结果）。
   * 不传时组件自己读取路径，便于单独挂载。
   */
  pathname?: string;
}

export function StandardDetailView({ pathname }: StandardDetailViewProps = {}) {
  const currentPathname = usePathname();
  const path = normalizePath(pathname ?? currentPathname);

  if (path === pages.manufacturing) return <ManufacturingDetail />;
  if (path === pages.platform) return <PlatformDetail />;
  if (path === pages.about) return <AboutDetail />;
  if (path === pages.workspace) return <WorkspaceDetail />;

  const industry = industryRoutes.find((item) => item.route === path);
  if (industry) return <IndustryDetail industryId={industry.id} />;

  const productId = productIdFromPath(path);
  if (productId) return <ProductDetail productId={productId} />;

  return <UnknownDetail path={path} />;
}
