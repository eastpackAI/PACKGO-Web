# PACKGO-Web

PACKGO 独立站的本地前端工程。首轮目标是建立可持续施工的 Next.js / React / TypeScript 框架，
并在同一内容、状态和 URL（网址）体系内提供 Spatial View（空间浏览）与 Standard View（标准浏览）。

## 本地运行

```bash
pnpm install
pnpm dev
```

默认访问 `http://localhost:3000`。

## 质量检查

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## 当前边界

本工程只有前端框架与占位内容；不连接真实后端、AI API、数据库、登录、报价、RFQ（询价请求）或外部部署。
