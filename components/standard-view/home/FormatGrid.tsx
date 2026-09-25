import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { formatCapabilities, formats, productRoutes } from "@/config/standardHome";
import { Section } from "./Section";

export function FormatGrid() {
  return (
    <Section
      id="formats"
      eyebrow="主要包装形态"
      title="先看形态，再谈细节"
      summary="四种最常见的包装形态；每一条都能往下走到材料、结构、工艺与真实设备。"
    >
      <div className="grid grid--4">
        {formats.map((item, index) => (
          <Link
            key={item.id}
            className="card format-card format-card--link"
            href={productRoutes[item.id]}
            aria-label={`${item.title}：查看产品页`}
            data-reveal
            style={{ "--reveal-delay": index } as CSSProperties}
          >
            <div className="format-card__media">
              <Image
                src={item.image}
                alt={`${item.title} 示例`}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 1080px) 50vw, 25vw"
                className="format-card__image"
              />
              <span className="format-card__swatch" style={{ background: item.accent }} aria-hidden />
              {/* 徽标：借 Cubit 产品卡的"角标"信息位，但只写我们自己能兑现的事实 */}
              <span className="format-card__badge">{item.badge}</span>
            </div>
            <h3 className="card__title">{item.title}</h3>
            <p className="card__latin">{item.latin}</p>
            {/* 规格小字：原来这里是三条 tick 列表，改成一行"规格关键词"，
                信息密度更高、卡片更干净（借鉴 Cubit 产品卡的小字规格行） */}
            <p className="card__spec">{item.points.join(" · ")}</p>
            <p className="card__body">{item.summary}</p>
            <span className="card__enter">
              查看产品页
              <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid--3 capability-row">
        {formatCapabilities.map((c) => (
          <div key={c.title} className="capability">
            <h4 className="capability__title">{c.title}</h4>
            <p className="capability__body">{c.note}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
