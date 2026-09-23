import Link from "next/link";
import { pages, platform } from "@/config/standardHome";
import { Section } from "./Section";

export function PlatformSection() {
  return (
    <Section
      id="platform"
      eyebrow={platform.eyebrow}
      title={platform.title}
      summary={platform.summary}
      tone="ink"
      action={{ label: "查看平台页", href: pages.platform }}
    >
      <div className="grid grid--4 platform-grid">
        {platform.modules.map((m) => (
          <Link key={m.no} className="module module--link" href={pages.platform}>
            <span className="module__no">{m.no}</span>
            <h3 className="module__title">{m.title}</h3>
            <p className="module__body">{m.body}</p>
          </Link>
        ))}
      </div>
      <p className="platform__highlight">{platform.highlight}</p>
    </Section>
  );
}
