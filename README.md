# PACKGO-Web

PACKGO 独立站的本地前端工程。首轮目标是建立可持续施工的 Next.js / React / TypeScript 框架，
并在同一内容、状态和 URL（网址）体系内提供 Spatial View（空间浏览）与 Standard View（标准浏览）。

## 本地运行

```bash
pnpm install
pnpm dev
```

默认访问 `http://localhost:3000`。

## 在线预览（云地审核通道）

**固定预览网址：** https://eastpackai.github.io/PACKGO-Web/

这个网址给 Owner 和云端 ChatGPT 用来审核当前版本，**不需要本机开着服务**。

链路（已跑通）：

```text
本地改代码 → lint / typecheck / build
   → git commit → git push develop
   → GitHub Actions 自动构建（含静态导出）
   → 自动发布到 GitHub Pages
   → 网址自动更新为最新版本
```

| 项 | 值 |
|---|---|
| 代码仓库（私有变公开） | https://github.com/eastpackAI/PACKGO-Web |
| 分支 | `main` = 正式基线；`develop` = 预览（自动发布监听此分支） |
| 自动发布配置 | `.github/workflows/deploy-pages.yml` |
| 本地手动生成预览包 | `STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/PACKGO-Web pnpm build:static` |

> 说明：GitHub Pages 的项目站点部署在子路径 `/<仓库名>/` 下，所以静态导出必须带
> `NEXT_PUBLIC_BASE_PATH`；CI 里已自动传入，不用手写。

## 质量检查

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## 当前边界

本工程只有前端框架与占位内容；不连接真实后端、AI API、数据库、登录、报价、RFQ（询价请求）或外部部署。
