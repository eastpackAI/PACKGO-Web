import Image from "next/image";
import Link from "next/link";
import { manufacturing, pages } from "@/config/standardHome";
import { Section } from "./Section";

export function ManufacturingSection() {
  return (
    <Section
      id="manufacturing"
      eyebrow={manufacturing.eyebrow}
      title={manufacturing.title}
      summary={manufacturing.summary}
      action={{ label: "查看制造与材料页", href: pages.manufacturing }}
    >
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
        {manufacturing.pillars.map((p) => (
          <Link key={p.title} className="card pillar-card" href={pages.manufacturing}>
            <h3 className="card__title">{p.title}</h3>
            <p className="card__body">{p.body}</p>
            <span className="card__enter">
              在制造页展开
              <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
      <p className="footnote">{manufacturing.footnote}</p>
    </Section>
  );
}
