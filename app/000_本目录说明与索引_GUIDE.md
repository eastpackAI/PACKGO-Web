# app 目录说明与索引

本目录只保存 Next.js App Router（应用路由）的页面入口、全局布局与路由级元数据。

- 根路由 `/`：首页大厅与双视图入口。
- `solutions/`：行业解决方案的可深链路由，继续由双视图共用。
- `products/`：主要产品形态的可深链路由。
- `manufacturing/`、`platform/`、`about/`、`workspace/`：网站 2 内容拆分后的标准视图页面；空间视图仍复用主体验外壳。
- 全局样式只从 `app/globals.css` 汇入，具体变量与规则维护在 `styles/`。
- 不在路由文件里复制行业内容或页面状态，统一引用 `config/` 与共享体验组件。
