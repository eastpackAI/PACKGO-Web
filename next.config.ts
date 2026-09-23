import type { NextConfig } from "next";

/**
 * 静态导出开关（用于 GitHub Pages 在线预览）。
 *
 * - 平时 `npm run dev` 与 `npm run build` **完全不受影响**；
 * - 只有 `npm run build:static`（内部设 STATIC_EXPORT=1）才走静态导出，产出 `out/`；
 * - GitHub Pages 的「项目站点」部署在子路径下（`/<仓库名>/`），所以导出时必须带上
 *   basePath，否则 `/_next/...` 资源会 404。CI 里通过 NEXT_PUBLIC_BASE_PATH 传入。
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        basePath: basePath || undefined,
        // 静态导出没有 Node 进程，next/image 的按需优化必须关掉
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
