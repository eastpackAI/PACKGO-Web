import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PACKGO · 让包装与制造清晰可见",
    template: "%s · PACKGO",
  },
  description: "浏览 PACKGO 的包装形态、行业方案与材料制造内容。部分页面与 Packy 功能仍为本地演示。",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
