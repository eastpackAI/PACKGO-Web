import Link from "next/link";
import { categories, categoryRoutes, productRoutes } from "@/config/standardHome";
import { Section } from "./Section";

export function CategoryGrid() {
  return (
    <Section
      id="categories"
      eyebrow="产品品类"
      title="按品类直接找"
      summary="已经能做的品类在这里；能力范围逐步开放，未开放的不写成已具备。"
      tone="muted"
    >
      <ul className="category-grid">
        {categories.map((c) => {
          const productId = categoryRoutes[c];
          return (
            <li key={c}>
              {productId ? (
                <Link className="category-item category-item--link" href={productRoutes[productId]}>
                  <span className="category-item__name">{c}</span>
                  <span className="category-item__arrow" aria-hidden>
                    →
                  </span>
                </Link>
              ) : (
                /* 没有对应独立页面的品类保持纯文本，不做成看起来能点的样式 */
                <span className="category-item category-item--static">
                  <span className="category-item__name">{c}</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
