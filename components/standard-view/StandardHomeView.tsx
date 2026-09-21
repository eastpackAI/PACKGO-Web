import { AboutSection } from "./home/AboutSection";
import { CategoryGrid } from "./home/CategoryGrid";
import { Footer } from "./home/Footer";
import { FormatGrid } from "./home/FormatGrid";
import { Hero } from "./home/Hero";
import { IndustrySolutions } from "./home/IndustrySolutions";
import { ManufacturingSection } from "./home/ManufacturingSection";
import { PackySection } from "./home/PackySection";
import { PlatformSection } from "./home/PlatformSection";

/**
 * 标准视图 · 首页内容
 *
 * 这一块来自 **PACKGO 网站 2**（Cubit 风格的新官网首页），现在作为网站 1
 * 「标准视图」在首页呈现。
 *
 * 重要：
 * 1. 整块内容包在 `.standard-home` 容器里——网站 2 的样式全部圈定在这个作用域内
 *    （`styles/standard-home.css`），**不会泄漏到空间视图**；
 * 2. 文案只在 `config/standardHome.ts` 里改；
 * 3. 页头用网站 1 自己的（带视图切换），这里不含网站 2 的页头。
 */
export function StandardHomeView() {
  return (
    <div className="standard-home">
      <Hero />
      <FormatGrid />
      <PackySection />
      <ManufacturingSection />
      <PlatformSection />
      <IndustrySolutions />
      <CategoryGrid />
      <AboutSection />
      <Footer />
    </div>
  );
}
