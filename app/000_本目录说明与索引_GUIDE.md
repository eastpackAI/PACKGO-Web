# app 目录说明与索引

> 📤 **对外快照机制（自动校验，勿删）**：本目录的对外现状投影走「系统快照」——机制正本在交互中心
> `050_交互_INTERACTION/007_云地交互与信箱/系统快照机制_v1.md`，本机同步副本
> `docs/system-snapshot-mechanism.md`，生成命令 `./tools/aiw-snapshot`；
> 本句由 `./tools/check-guides` 强制校验，删掉即审计失败。

本目录只保存 Next.js App Router（应用路由）的页面入口、全局布局与路由级元数据。

- 根路由 `/`：首页大厅与双视图入口。
- `solutions/`：行业解决方案的可深链路由，继续由双视图共用。
- `products/`：主要产品形态的可深链路由。
- `manufacturing/`、`platform/`、`about/`、`workspace/`：网站 2 内容拆分后的标准视图页面；空间视图仍复用主体验外壳。
- 全局样式只从 `app/globals.css` 汇入，具体变量与规则维护在 `styles/`。
- 不在路由文件里复制行业内容或页面状态，统一引用 `config/` 与共享体验组件。
