import { AboutSection } from "./home/AboutSection";
import { CategoryGrid } from "./home/CategoryGrid";
import { Footer } from "./home/Footer";
import { FormatGrid } from "./home/FormatGrid";
import { Hero } from "./home/Hero";
import { IndustrySolutions } from "./home/IndustrySolutions";
import { ManufacturingSection } from "./home/ManufacturingSection";
import { PackySection } from "./home/PackySection";
import { PlatformSection } from "./home/PlatformSection";
import { ScrollReveal } from "./home/ScrollReveal";
import { WorkbenchFlow } from "./home/WorkbenchFlow";
import { WorkbenchSection } from "./home/WorkbenchSection";

/**
 * 标准视图 · 首页内容（总览）
 *
 * 这一块承接 **PACKGO 网站 2**（Cubit 风格的新官网首页）最新的视觉与栏目节奏，
 * 作为主站「标准视图」的首页总览呈现。
 *
 * 重要：
 * 1. 首页是**总览**：行业 / 产品形态卡用 `next/link` 指到独立页面
 *    （`/solutions/<行业>`、`/products/<形态>`），制造 / 平台 / 关于 / 工作台各自有入口，
 *    不出现「看着能点、其实没有链接」的卡片或箭头；
 * 2. 整块内容包在 `.standard-home` 容器里——网站 2 的样式全部圈定在这个作用域内
 *    （`styles/standard-home.css`），**不会泄漏到空间视图**；
 * 3. 文案只在 `config/standardHome.ts` 里改；
 * 4. 页头用主站自己的（带视图切换），这里不含网站 2 的页头；
 * 5. Packy 只有一套会话：首页所有入口都派发 `packy:*` 事件，由共享体验提供器接桥。
 */
export function StandardHomeView() {
  return (
    <div className="standard-home">
      <Hero />
      <PackySection />
      <PlatformSection />
      <ManufacturingSection />
      <WorkbenchFlow />
      <WorkbenchSection />
      <IndustrySolutions />
      <FormatGrid />
      <CategoryGrid />
      <AboutSection />
      <Footer />
      <ScrollReveal />
    </div>
  );
}
