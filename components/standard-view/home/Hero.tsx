import Image from "next/image";
import Link from "next/link";
import { brand, formats, productRoutes } from "@/config/standardHome";
import { PackyOpenButton } from "./StandardPackyControls";

/**
 * 首屏（2026-09-24 借鉴 Cubit 首页的排版思路；文字与素材全部是 PACKGO 自己的）：
 * 1. 标题**居中**，并且**只把后半句染成强调色**（Cubit 的"只强调半句"）；
 * 2. 副标题压成一句，讲清"需求 → 报价 → 打样 → 排产"；
 * 3. **首屏就摆一张 Packy 卡**（对应 Cubit 首屏的 Consultant 卡）——
 *    不再把 AI 助手藏在右下角，让客户第一眼就看到"谁陪我做完"；
 * 4. 四类包装做成紧凑卡片，与 Packy 卡同排：一眼看全"能做什么 + 谁来做"。
 */
const [headlineLead, headlineEm] = brand.headline.split("—").map((part) => part.trim());

export function Hero() {
  return (
    <section className="hero hero--centered" id="top">
      <div className="container hero__lead">
        <p className="eyebrow">{brand.industryNote}</p>
        <h1 className="hero__title">
          <span>{headlineLead}</span>
          <em className="hero__title-em">{headlineEm}</em>
        </h1>
        <p className="hero__support">{brand.supportShort}</p>

        <div className="hero__actions">
          {/* 主入口走共享 Packy 会话（事件桥接到 ExperienceProvider），不新开第二套对话 */}
          <PackyOpenButton className="btn btn--primary btn--lg" label={brand.primaryCta} />
          <a className="btn btn--outline btn--lg" href="#formats">
            {brand.secondaryCta}
          </a>
        </div>

        <p className="hero__note">{brand.tagline}</p>
      </div>

      <div className="container hero__cards">
        {formats.map((item) => (
          <Link
            key={item.id}
            className="card mini-card"
            href={productRoutes[item.id]}
            aria-label={`${item.title}：查看产品页`}
          >
            <div className="mini-card__media">
              <Image
                src={item.image}
                alt={`${item.title} 示例`}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 1080px) 50vw, 20vw"
                className="mini-card__image"
              />
              <span className="mini-card__swatch" style={{ background: item.accent }} aria-hidden />
            </div>
            <h3 className="mini-card__title">{item.title}</h3>
            <p className="mini-card__latin">{item.latin}</p>
            <p className="mini-card__spec">{item.points.join(" · ")}</p>
            <span className="mini-card__enter">
              查看产品页
              <span aria-hidden>→</span>
            </span>
          </Link>
        ))}

        {/* Packy 卡：`data-packy-keep-open` 让它自己不被"点外收起"误关（见 ConversationDrawer） */}
        <div className="card mini-card mini-card--packy" data-packy-keep-open>
          <span className="mini-card__badge">本地演示 · 未接 AI</span>
          <h3 className="mini-card__title">Packy</h3>
          <p className="mini-card__latin">客户侧 AI 包装经理</p>
          <p className="mini-card__spec">选形态 · 定工艺 · 拿报价 · 打样 · 排产</p>
          <p className="mini-card__body">一次只问一两件事，先听懂你的产品，再带你看最短的那条路。</p>
          <PackyOpenButton className="btn btn--primary mini-card__cta" label="开始对话" />
        </div>
      </div>

      <div className="container hero__wide">
        <figure className="hero__media">
          <Image
            src={brand.heroImage.src}
            alt={brand.heroImage.alt}
            width={2016}
            height={1152}
            priority
            sizes="(max-width: 1080px) 100vw, 1360px"
            className="hero__image"
          />
          <figcaption className="media-note">{brand.heroImage.note}</figcaption>
        </figure>
      </div>

      <div className="container">
        <div className="hero__band" role="presentation">
          <div className="hero__band-items">
            <span>软包装袋</span>
            <span>彩盒与纸盒</span>
            <span>标签与贴纸</span>
            <span>无纺布袋 / 纸袋</span>
            <span>真实产线影像</span>
            <span>两级精准报价</span>
          </div>
        </div>
      </div>
    </section>
  );
}
