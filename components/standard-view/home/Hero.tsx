import { brand } from "@/config/standardHome";
import { HeroStory } from "./HeroStory";
import { PackyOpenButton } from "./StandardPackyControls";

/**
 * 首屏先回答三个客户问题：PACKGO 是什么、如何开始、能获得什么。
 * 层级（2026-09-24 Owner 意见）：
 * 1. 品牌行 PACKGO —— 品牌要有分量，单独一行；
 * 2. 主标题「包装全案定制工作台」—— 全页最大的一行，客户第一眼看的是什么；
 * 3. 副标题「连接中国印刷城龙港包装制造 · 在一个工作台推进你的项目」—— 略小一档；
 * Packy 作为工作台的引导入口保持可见；产品品类在后续栏目展示。
 */
const [headlineLead, headlineEm] = brand.headline.split("—").map((part) => part.trim());

export function Hero() {
  return (
    <section className="hero hero--centered" id="top">
      <div className="container hero__lead">
        <p className="hero__brand">{brand.name}</p>
        <h1 className="hero__title">
          <span className="hero__title-role">{brand.roleTitle}</span>
          <span className="hero__title-sub">
            <span className="hero__title-plain">{headlineLead}</span>
            <span className="hero__title-sep" aria-hidden="true">
              ·
            </span>
            <em className="hero__title-em">{headlineEm}</em>
          </span>
        </h1>
        <p className="hero__support">{brand.supportShort}</p>

        <div className="hero__actions">
          {/* 主入口走共享 Packy 会话（事件桥接到 ExperienceProvider），不新开第二套对话 */}
          <PackyOpenButton className="btn btn--primary btn--lg" label={brand.primaryCta} />
          <a className="btn btn--outline btn--lg" href="#platform">
            {brand.secondaryCta}
          </a>
        </div>

        <p className="hero__note">{brand.heroNote}</p>
      </div>

      <div className="container grid grid--3 capability-row" aria-label="PACKGO 工作台简介">
        {brand.firstAnswers.map((answer) => (
          <div key={answer.title} className="capability">
            <h2 className="capability__title">{answer.title}</h2>
            <p className="capability__body">{answer.body}</p>
          </div>
        ))}
      </div>

      <div className="container hero__wide">
        {/* 首屏不再放静态占位照片：用一段自动播放的动画把"想法 → 工作台 → 工厂车间"讲清楚 */}
        <HeroStory />
      </div>

    </section>
  );
}
