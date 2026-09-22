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

**首选固定预览网址：** https://paleturquoise-rail-229107.hostingersite.com/

**备用静态预览网址：** https://eastpackai.github.io/PACKGO-Web/

这个网址给 Owner 和云端 ChatGPT 用来审核当前版本，**不需要本机开着服务**。

链路（已跑通）：

```text
本地改代码 → lint / typecheck / build
   → git commit → git push develop
   → Hostinger 从 develop 自动构建 Next.js 站点
   → 首选固定网址自动更新（首页与 /solutions/... 深链）
   → GitHub Actions 同时静态导出并发布到备用 GitHub Pages
```

| 项 | 值 |
|---|---|
| 代码仓库（私有变公开） | https://github.com/eastpackAI/PACKGO-Web |
| 分支 | `main` = 正式基线；`develop` = 预览（两个托管通道均监听此分支） |
| Hostinger 构建设置 | Next.js、Node 22.x、`npm` 安装、`npm run build`、输出 `.next`；自动部署开启 |
| 自动发布配置 | `.github/workflows/deploy-pages.yml` |
| 本地手动生成预览包 | `STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/PACKGO-Web pnpm build:static` |

> 说明：GitHub Pages 的项目站点部署在子路径 `/<仓库名>/` 下，所以静态导出必须带
> `NEXT_PUBLIC_BASE_PATH`；CI 里已自动传入，不用手写。

> 防呆门禁：发布流程在静态导出后会校验 `out/index.html` 里的资源地址是否带 `/<仓库名>/_next/` 前缀，
> 不带就让发布失败 —— 这条是踩过坑加的，**不要删**。

发布与排障的完整步骤（含首次接通仓库、线上没样式、资源 404 的排查顺序）见技能
`packgo-web-publish`（`~/.codex/skills/packgo-web-publish/SKILL.md`）。

## 质量检查

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## 当前边界

本工程只有前端框架与占位内容；不连接真实后端、AI API、数据库、登录、报价、RFQ（询价请求）。
**已发布到公网预览（Hostinger 首选、GitHub Pages 备用，见上）**：授权范围只限网站工程本身，工作区其他内容不对外公开。
不要绑定或修改 `eastpacksolutions.com` 及其 DNS。
