import { about, pages } from "@/config/standardHome";
import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      action={{ label: "查看关于页", href: pages.about }}
    >
      <div className="about">
        <div className="about__body">
          {about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="about__facts">
          {about.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
