import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  icons: { icon: `${basePath}/icon.svg` },
  title: {
    default: "PACKGO · 连接中国印刷城龙港制造的包装项目工作台",
    template: "%s · PACKGO",
  },
  description:
    "PACKGO 是连接中国印刷城龙港包装制造能力的包装全案定制工作台。Packy 协助梳理需求，PACKGO 对接工厂；正式订单与生产进度功能目前为演示预览。",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
